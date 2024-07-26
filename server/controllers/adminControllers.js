const User = require('../models/user');
const { hashPassword, comparePassword} = require('../helpers/auth')
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
      return res.json(user)
  } catch (error) {
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
    res.status(200).send(admin);
  } catch (error) {
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
    res.json(updatedWord);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'An error occurred while updating admin Account',
    });
  }
};