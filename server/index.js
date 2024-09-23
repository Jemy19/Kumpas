const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { hashPassword } = require('./helpers/auth');
const User = require('./models/user');

const app = express();

// Middleware
app.use(cors({
  credentials: true,
  origin: process.env.CORS_ORIGIN || '*',
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', require('./routes/authRoutes'));
app.use('/admin', require('./routes/adminRoutes'));
// Add this line near the top of your index.js
app.use('/api/videos', require('./api/videos'));

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Database connection function
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGO_URL);
  console.log('Database Connected');
};

// Super Admin seeding function
const seedSuperAdmin = async () => {
  try {
    await connectDB();
    const existingUser = await User.findOne({ name: process.env.SUPERADMIN_USERNAME });
    if (existingUser) {
      console.log('Super Admin already exists');
    } else {
      console.log('Creating Super Admin...');
      const hashedPassword = await hashPassword(process.env.SUPERADMIN_PASSWORD);
      const superAdmin = new User({
        name: process.env.SUPERADMIN_USERNAME,
        email: process.env.SUPERADMIN_EMAIL,
        password: hashedPassword,
        role: 'super_admin'
      });
      await superAdmin.save();
      console.log('Super Admin created');
    }
  } catch (error) {
    console.error('Error creating Super Admin:', error);
  }
};

// Seed Super Admin on startup
seedSuperAdmin();

// Wrap the Express app for serverless use
const serverless = async (req, res) => {
  await connectDB();
  return app(req, res);
};

module.exports = serverless;