const User = require('../models/user');
const Log = require('../models/log'); 
const { hashPassword, comparePassword} = require('../helpers/auth')
const mongoose = require('mongoose');


// Controller to create a new admin
 
exports.createAdmin = async (req, res) => {
  try {
      const {name, email, password} = req.body;
      if (!name){
          return res.json({
              error: 'name is requred'
          })
      }
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!password || !passwordRegex.test(password)) {
        return res.json({
          error: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
        });
      }
      const exist = await User.findOne({email})
      if(exist){
          return res.json({
              error: 'email is already taken'
          })
      }
 
      const hashedPassword = await hashPassword(password)
 
      const user  = await User.create ({
          name,
          email,
          password: hashedPassword,
          role: 'admin'
      });

      await Log.create({
        level: 'info',
        message: `Added a new Admin Account: ${user.name}`,
        adminId: req.user._id,
        adminName: req.user.name
      });
      return res.json(user)
  } catch (error) {
      await Log.create({
        level: 'Error',
        message: `Added a new Admin Account`,
        adminId: req.user._id,
        adminName: req.user.name
      });
      console.log(error)
  }
};
 
// Controller to get all admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: 'admin' });

    // Format both createdAt and updatedAt fields for each admin
    const formattedAdmins = admins.map((admin) => ({
      ...admin._doc,
      createdAt: admin.createdAt ? new Date(admin.createdAt).toLocaleString() : null, // Format createdAt
      updatedAt: admin.updatedAt ? new Date(admin.updatedAt).toLocaleString() : null, // Format updatedAt
    }));

    res.status(200).send(formattedAdmins);
  } catch (error) {
    res.status(400).send(error);
  }
};

 
// Controller to delete an admin
exports.deleteAdmin = async (req, res) => {
  try {
    const { status } = req.body;

    // Validate that status is either 'active' or 'deactivated'
    if (status !== 'active' && status !== 'deactivated') {
      return res.status(400).json({ error: 'Invalid status' });
    }

    // Find and update the admin's status
    const admin = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true } // Return the updated document
    );

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Create a log entry for deactivation
    await Log.create({
      level: 'info',
      message: `Deactivated Admin Account: ${admin.name}`,
      adminId: req.user._id,
      adminName: req.user.name
    });

    // Respond with the updated admin data
    res.status(200).json({ success: true, admin });
  } catch (error) {
    // Create a log entry for any error during the deactivation process
    await Log.create({
      level: 'info',
      message: `Error Deactivating Admin Account: ${admin ? admin.name : 'Unknown'}`,
      adminId: req.user._id,
      adminName: req.user.name
    });

    // Send the error response
    console.error('Error updating admin status:', error);
    res.status(400).json({ error: 'Error updating account status' });
  }
};
exports.updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  console.log('Received update request for name:', name);
  try {
    const admin = await User.findById(id);
    if (!admin) {
      return res.status(404).json({
        error: 'Word not found',
      });
    }
 
    admin.name = name || admin.name;
    admin.email = email || admin.email;

    if (password) {
      const isSamePassword = await comparePassword(password, admin.password);
      console.log(isSamePassword);
      if (isSamePassword) {
        return res.json({
          error: 'New password cannot be the same as the current password'
        });
      }
      const hashedPassword = await hashPassword(password);
      admin.password = hashedPassword;
    }
 
    const updatedWord = await admin.save();
    await Log.create({
      level: 'info',
      message: `Update new Admin Account: ${admin.name}`,
      adminId: req.user._id,
      adminName: req.user.name
    });
    res.json(updatedWord);
  } catch (error) {
    console.log(error);
    await Log.create({
      level: 'info',
      message: `Errpr Updating new Admin Account: ${admin.name}`,
      adminId: req.user._id,
      adminName: req.user.name
    });
    res.status(500).json({
      error: 'An error occurred while updating admin Account',
    });
  }
};
 
exports.logs = async (req, res) => {
  try {
    const logs = await Log.find().sort({ timestamp: -1 }); // Get logs and sort by most recent

    // Format the timestamp for each log
    const formattedLogs = logs.map((log) => ({
      ...log._doc,
      timestamp: log.timestamp ? new Date(log.timestamp).toLocaleString() : null, // Format timestamp
    }));

    res.json({ logs: formattedLogs });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching logs' });
  }
};


exports.getfeedback = async (req, res) => {
  try {
    // Accessing the MongoDB collection directly
    const feedbacks = await mongoose.connection.db.collection('feedbacks').find().toArray();

    // Format the createdAt field for each feedback
    const formattedFeedbacks = feedbacks.map((feedback) => ({
      ...feedback,
      createdAt: feedback.createdAt ? new Date(feedback.createdAt).toLocaleString() : null, // Format createdAt
    }));

    res.json(formattedFeedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

