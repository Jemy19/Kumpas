const express = require('express');
const dotenv = require('dotenv').config();
const cors = require("cors");
const mongoose = require("mongoose");
const { GridFsStorage } = require("multer-gridfs-storage");
const multer = require("multer");
const { GridFSBucket } = require('mongodb');
const cookieParser = require('cookie-parser');
const User = require('./models/user');
const { hashPassword } = require('./helpers/auth');

const app = express();

mongoose.connect(process.env.MONGO_URL)
.then(() => {
  console.log('Database Connected');
  seedSuperAdmin(); 
  const conn = mongoose.connection;
  const gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads"
  });

  // Define middleware
  app.use(cors({
    credentials: true,
    origin: ["https://kumpas-pmok.vercel.app"]
  }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: false }));

  const storage = new GridFsStorage({
    url: process.env.MONGO_URL,
    file: (req, file) => {
      return {
        filename: file.originalname,
        bucketName: 'uploads'
      };
    }
  });

  const upload = multer({ storage });

  // Original route names
  app.post("/upload", upload.single("file"), async (req, res) => {
    try {
      const { filename } = req.file;
      res.status(201).send({ filename });
    } catch (err) {
      console.error("Error uploading video:", err);
      res.status(500).send("Upload failed");
    }
  });

  app.get("/videos", async (req, res) => {
    try {
      const files = await gfs.find().toArray();
      const filenames = files.map(file => file.filename);
      res.status(200).send(filenames);
    } catch (err) {
      console.error("Error getting video list:", err);
      res.status(500).send("Error getting video list");
    }
  });

  app.get("/videos/:filename", async (req, res) => {
    try {
      const filename = req.params.filename;
      const videoStream = gfs.openDownloadStreamByName(filename);

      // Set appropriate headers for video streaming
      res.setHeader("Content-Type", "video/mp4"); // Adjust content type based on video format
      res.setHeader("Accept-Ranges", "bytes"); // Allow for partial requests (optional)

      videoStream.pipe(res);
    } catch (err) {
      console.error("Error streaming video:", err);
      res.status(500).send("Error streaming video");
    }
  });

  app.delete("/delvideo/:filename", async (req, res) => {
    try {
      const filename = req.params.filename;
      const file = await gfs.find({ filename }).toArray();
      console.log('Received delete request for vid file:', file);
      if (!file || file.length === 0) {
        res.status(404).send(`File not found: ${filename}`);
        return;
      }
      await gfs.delete(file[0]._id);
      res.status(204).send(`File deleted: ${filename}`);
    } catch (err) {
      console.error("Error deleting file:", err);
      res.status(500).send("Error deleting file");
    }
  });

  // Use routes
  app.use('/', require('./routes/authRoutes'));
  app.use('/admin', require('./routes/adminRoutes'));

  const serverless = require('serverless-http');
  module.exports.handler = serverless(app);
})
.catch((err) => console.log('Database not Connected', err));

const seedSuperAdmin = async () => {
  try {
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
