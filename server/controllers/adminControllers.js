const User = require('../models/user');

// Controller to create a new admin
exports.createAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = new User({ username, password, role: 'admin' });
    await admin.save();
    res.status(201).send(admin);
  } catch (error) {
    res.status(400).send(error);
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
      return res.status(404).send('Admin not found');
    }
    res.status(200).send(admin);
  } catch (error) {
    res.status(400).send(error);
  }
};
