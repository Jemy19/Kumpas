const User = require('../models/user');
const Log = require('../models/log'); 
const { hashPassword, comparePassword} = require('../helpers/auth')
const logger = require('../config/logger');
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
      if (!password || password.length < 6){
          return res.json({
              error: 'Password is require and should be 6 char long'
          })
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
      const adminId = req.user._id
      const adminUsername = req.user.name
 
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
    res.status(200).send(admins);
  } catch (error) {
    res.status(400).send(error);
  }
};
 
// Controller to delete an admin
exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await User.findByIdAndDelete(req.params.id);
    if (!admin) {
      return res.json({
        error: 'Admin not found'
    })
    }
    await Log.create({
      level: 'info',
      message: `Delete Admin Account: ${admin.name}`,
      adminId: req.user._id,
      adminName: req.user.name
    });
    res.status(200).send(admin);
  } catch (error) {
    await Log.create({
      level: 'info',
      message: `Error Deleting Admin Account: ${admin.name}`,
      adminId: req.user._id,
      adminName: req.user.name
    });
    res.status(400).send(error);
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
    res.json({ logs });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching logs' });
  }
};

exports.getfeedback = async (req, res) => {
  try {
    // Accessing the MongoDB collection directly
    const feedbacks = await mongoose.connection.db.collection('feedbacks').find().toArray();
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

