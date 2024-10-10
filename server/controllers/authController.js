const User = require('../models/user')
const Word = require('../models/signs')
const MobUser = require('../models/mobusers')
const Updates = require('../models/updates')
const { hashPassword, comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Log = require('../models/log'); 
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const test = (req, res) => {
    res.json('test is working')
}

//login  
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password input
    if (!email || !password) {
      return res.json({ error: 'Email and password are required' });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: 'No user found with this email' });
    }

    // Compare the provided password with the stored hashed password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({ error: 'Password does not match' });
    }

    // Check if the user has the right role (super_admin or admin)
    if (user.role === 'super_admin' || user.role === 'admin') {
      jwt.sign(
        { email: user.email, id: user._id, name: user.name, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) {
            console.error('JWT sign error:', err);
            return res.status(500).json({ error: 'Token generation failed' });
          }
          res.cookie('token', token, {
            httpOnly: true,// Enable in production (HTTPS)
            sameSite: 'None', // Allows cross-domain cookies
            secure: true 
          });
          res.json({ ...user.toObject(), token }); // Send response with user data and token
        }
      );  
      await Log.create({
        level: 'info',
        message: `Logged in successfully`,
        adminId: user._id,  
        adminName: user.name
      });    
    } else {
      return res.json({ error: 'Unauthorized access' });
    }
  } catch (error) {
      console.error('Login error:', error);
    return res.json({ error: 'Internal server error' });
  }
};


const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
      jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
          if (err) {
              return res.status(401).json({ error: 'Session expired, please log in again' });
          }
          res.json(user);
      });
  } else {
      res.status(401).json({ error: 'No token provided, please log in' });
  }
};


const getWords = async (req, res) => {
  try {
      const words = await Word.find();

      // Format createdAt and updatedAt fields for each word
      const formattedWords = words.map((word) => ({
          ...word._doc,
          createdAt: word.createdAt ? new Date(word.createdAt).toLocaleString() : null, // Format createdAt
          updatedAt: word.updatedAt ? new Date(word.updatedAt).toLocaleString() : null, // Format updatedAt
      }));

      res.json(formattedWords);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


const logoutUser = async (req, res) => {
  res.cookie('token', '', { 
      maxAge: 1, 
      httpOnly: true,  // Same as when the token was set
      secure: true,    // Ensure this matches (for HTTPS)
      sameSite: 'None', // Match sameSite policy
      path: '/'        // Ensure the path is correct
  });
  await Log.create({
    level: 'info',
    message: `Logged out successfully`,
    adminId: req.user._id, 
    adminName: req.user.name
  });
  res.json('Logged out');
};


const addWord = async (req, res) => {
    try {
        const {title, description, category, video} = req.body;
        if (!title){
            return res.json({
            error: 'Title is required'
            })
        }
        if (!description) {
            return res.json({
                error: 'Description is Required'
            })
            }
        if (!category) {
            return res.json({
            error: 'no category chosen'
            })
        }
        if (!video) {
            return res.json({
            error: 'missing video'
            })
        }

        const word = await Word.create ({
            title,
            description,
            category,
            video,
        });
        await Log.create({
          level: 'info',
          message: `added a new sign language word: ${word.title}`,
          adminId: req.user._id, 
          adminName: req.user.name
        });
        return res.json(word);
    } catch (error) {
        console.log(error)
    }
}
  
const deleteWordDoc = async (req, res) => {
    const { id } = req.params;
    try {
      const word = await Word.findById(id);
        const result = await Word.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            return res.json({
                error: 'word not found'
            })
        }
        await Log.create({
          level: 'info',
          message: `deleted sign language word: ${word.title}`,
          adminId: req.user._id, 
          adminName: req.user.name
        });
        res.json({
            message: 'Word deleted successfully'
        });
    } catch (error) {
      await Log.create({
        level: 'error',
        message: `Error Deleting word`,
        adminId: req.user._id,  
        adminName: req.user.name
      });
        res.json({
            error: 'An error occurred while deleting the word'
        });
    }
};

const updateWordDoc = async (req, res) => {
    const { id } = req.params;
    const { title, description, category, video } = req.body;
    console.log('Received update request for id:', id); 
    try {
      const word = await Word.findById(id);
      if (!word) {
        return res.status(404).json({
          error: 'Word not found',
        });
      }
  
      word.title = title || word.title;
      word.description = description || word.description;
      word.category = category || word.category;
      word.video = video || word.video;
  
      const updatedWord = await word.save();

      await Log.create({
        level: 'info',
        message: `Word update Successfully: ${word.title}`,
        adminId: req.user._id, 
        adminName: req.user.name
      });
      res.json(updatedWord);
    } catch (error) {
      await Log.create({
        level: 'error',
        message: `Error Updating Signlanguage Word`,
        adminId: req.user._id,  
        adminName: req.user.name
      });
      res.status(500).json({
        error: 'An error occurred while updating the word',
      });
    }
};
  
const getUsers = async (req, res) => {
try {
    // Accessing the MongoDB collection directly
    const users = await mongoose.connection.db.collection('mobileusers').find().toArray();
    const formattedUsers = users.map((user) => ({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt.toLocaleString(), // Format createdAt
      updatedAt: user.updatedAt.toLocaleString(), // Format updatedAt
    }));
    res.json(formattedUsers);
} catch (error) {
    res.status(500).json({ message: error.message });
}
};

const getTotalCounts = async (req, res) => {
  try {
    // Count total users in 'mobileusers' collection
    const totalUsers = await mongoose.connection.db.collection('mobileusers').countDocuments();

    // Count total sign language words in 'signs' collection
    const totalWords = await Word.countDocuments();

    // Count total feedbacks in 'feedbacks' collection
    const totalFeedbacks = await mongoose.connection.db.collection('feedbacks').countDocuments();

    const totalFrequency = await Word.aggregate([
      {
        $group: {
          _id: null,
          totalFrequency: { $sum: "$frequency" }
        }
      }
    ]);

    // Send the total counts in the response
    res.json({
      totalUsers,
      totalWords,
      totalFeedbacks,
      totalFrequency: totalFrequency[0]?.totalFrequency || 0
    });
  } catch (error) {
    console.error('Error retrieving counts:', error);
    res.status(500).json({ error: 'Error retrieving total counts' });
  }
};

const getWordsSortedByUsage = async (req, res) => {
  try {
    // Find all words sorted by frequency in descending order (most used first)
    const wordsDescending = await Word.find().sort({ frequency: -1 });

    // Find all words sorted by frequency in ascending order (least used first)
    const wordsAscending = await Word.find().sort({ frequency: 1 });

    // Send both lists in the response
    res.json({
      wordsDescending,
      wordsAscending
    });
  } catch (error) {
    console.error('Error retrieving words:', error);
    res.status(500).json({ error: 'Error retrieving words' });
  }
};

const createMobUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email
    if (!email) {
      return res.json({ error: 'Email is required' });
    }

    // Validate password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password || !passwordRegex.test(password)) {
      return res.json({
        error: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
      });
    }

    console.log('Checking for existing user with email:', email);
    const existingUser = await MobUser.findOne({ email });
    console.log('Existing user found:', existingUser);
    // Check if email is already taken
    if (existingUser) {
      return res.json({ error: 'Email is already taken' });
    }
    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the new mobile user
    const user = await MobUser.create({
      email,
      password: hashedPassword,
      // Username will be generated automatically from email in the pre-save hook
      role: 'user' // Role is fixed as 'user'
    });

    // Log the creation of the new user
    await Log.create({
      level: 'info',
      message: `Added a new User Account: ${user.email}`,
      adminId: req.user._id,  // Assuming this is a protected route and req.user contains the admin details
      adminName: req.user.name
    });

    return res.json(user);
  } catch (error) {
    // Log the error
    await Log.create({
      level: 'error',
      message: `Error adding a new User Account`,
      adminId: req.user._id,  // Assuming this is a protected route and req.user contains the admin details
      adminName: req.user.name
    });

    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

const deleteMobUser = async (req, res) => {
  try {
    const MobileUser = await MobUser.findByIdAndDelete(req.params.id);
    if (!MobileUser) {
      return res.json({
        error: 'User not found'
      });
    }
    
    // Access the collection directly and delete documents where userId matches
    await mongoose.connection.collection('favorites').deleteMany({ userId: MobileUser.email });

    // Log the deletion of the user
    await Log.create({
      level: 'info',
      message: `Deleted Admin Account: ${MobileUser.username}`,
      adminId: req.user._id,
      adminName: req.user.name
    });

    res.status(200).send({ success: true });
  } catch (error) {
    const userid = req.params.id;

    // Log the error if something goes wrong
    await Log.create({
      level: 'error',
      message: `Error Deleting Admin Account: ${userid}`,
      adminId: req.user._id,
      adminName: req.user.name
    });

    res.status(400).send({ error: error.message });
  }
};

const updateMobUser = async (req, res) => {
  const { id } = req.params;
  const {email, password } = req.body;
  console.log('Received update request for name:', email);
  try {
    const mobUser = await MobUser.findById(id); // Changed from User to MobUser
    if (!mobUser) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    // Update name and email if provided
    mobUser.email = email || mobUser.email;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password || !passwordRegex.test(password)) {
      return res.json({
        error: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
      });
    }
    // Check and update password
    if (password) {
      const isSamePassword = await comparePassword(password, mobUser.password);
      console.log(isSamePassword);
      if (isSamePassword) {
        return res.json({
          error: 'New password cannot be the same as the current password'
        });
      }
      const hashedPassword = await hashPassword(password);
      mobUser.password = hashedPassword;
    }

    // Save updated user
    const updatedMobUser = await mobUser.save();
    await Log.create({
      level: 'info',
      message: `Updated MobUser Account: ${mobUser.username}`,
      adminId: req.user._id,
      adminName: req.user.name
    });
    res.json(updatedMobUser);
  } catch (error) {
    const userid = req.params.id;
    await Log.create({
      level: 'error',  // Fixed typo from 'info' to 'error'
      message: `Error Updating MobUser Account: ${userid}`,
      adminId: req.user._id,
      adminName: req.user.name
    });
    res.status(500).json({
      error: 'An error occurred while updating MobUser account',
    });
  }
};

const adminLogs = async (req, res) => {
  try {
    // Fetch only logs related to the logged-in admin
    const logs = await Log.find({ adminId: req.user._id }).sort({ timestamp: -1 });

    if (logs.length === 0) {
      return res.status(404).json({ message: 'No logs found for this admin.' });
    }

    // Format the timestamp for each log
    const formattedLogs = logs.map((log) => ({
      ...log._doc, // Spread other log fields (from Mongoose document)
      timestamp: log.timestamp ? new Date(log.timestamp).toLocaleString() : null, // Format timestamp
    }));

    res.json({ logs: formattedLogs });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching logs' });
  }
};


const getFeedbackForAdmin = async (req, res) => {
  try {
    // Accessing the MongoDB collection directly
    const feedbacks = await mongoose.connection.db.collection('feedbacks').find().toArray();

    // Remove email field to anonymize feedback
    const anonymousFeedbacks = feedbacks.map(({ email, createdAt, ...rest }) => ({
      ...rest,
      createdAt: createdAt ? new Date(createdAt).toLocaleString() : null // Format createdAt if it exists
    }));

    res.json(anonymousFeedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addupdate = async (req, res) => {
  try {
      const {title, description, link} = req.body;
      if (!title){
          return res.json({
          error: 'Title is required'
          })
      }
      if (!description) {
          return res.json({
              error: 'Description is Required'
          })
      }
      if (!link) {
        return res.json({
            error: 'link is Required'
        })
      }

      const updates = await Updates.create ({
          title,
          description,
          link
      });
      await Log.create({
        level: 'info',
        message: `Created new update log: ${updates.title}`,
        adminId: req.user._id, 
        adminName: req.user.name
      });
      return res.json(updates);
  } catch (error) {
      console.log(error)
  }
};

const getUpdates = async (req, res) => {
  try {
      const updates = await Updates.find();
      const formattedUpdates = updates.map((update) => ({
        _id: update._id,
        title: update.title,
        description: update.description,
        link: update.link,
        createdAt: update.createdAt.toLocaleString(), // Format createdAt
      }));
  
      res.json(formattedUpdates);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

const deleteUpdate = async (req, res) => {
  const { id } = req.params;
  try {
    const updates = await Updates.findById(id);
      const result = await Updates.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
          return res.json({
              error: 'update log not found'
          })
      }
      await Log.create({
        level: 'info',
        message: `deleted update log: ${updates.title}`,
        adminId: req.user._id, 
        adminName: req.user.name
      });
      res.json({
          message: 'Word deleted successfully'
      });
  } catch (error) {
    await Log.create({
      level: 'error',
      message: `Error Deleting update log`,
      adminId: req.user._id,  
      adminName: req.user.name
    });
      res.json({
          error: 'An error occurred while deleting the update log'
      });
  }
};

const forgotpassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Check if a reset request has been made recently
  if (user.resetPasswordExpires && Date.now() < user.resetPasswordExpires) {
    return res.status(429).json({ message: 'A password reset email has already been sent. Please wait before trying again.' });
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
  await user.save();

  // Send reset link via email
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const resetURL = `https://ekumpas.vercel.app/ResetPassword/${resetToken}`;
  
  const mailOptions = {
    to: user.email,
    from: process.env.EMAIL,
    subject: 'Password Reset',
    text: `You are receiving this because you requested a password reset. Please click on the link to reset your password: ${resetURL}`,
  };
  
  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error sending email' });
    }
    res.json({ message: 'Email sent successfully' });
  });
};


const resetpassword = async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
    }

    const { password } = req.body;
    
    // Validate the new password sent in the request body
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password || !passwordRegex.test(password)) {
      return res.status(400).json({
        error: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
      });
    }

    // Hash the new password before saving
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while resetting the password' });
  }
};

const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params; // Get the feedback ID from the request params

    // Ensure that the id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid feedback ID' });
    }

    // Delete the feedback from the collection
    const result = await mongoose.connection.db.collection('feedbacks').deleteOne({ _id: new mongoose.Types.ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    // Log the deletion of the user
    await Log.create({
      level: 'info',
      message: `Deleted feedback: ${id}`,
      adminId: req.user._id,
      adminName: req.user.name
    });
    res.status(200).send({ success: true });
  } catch (error) {
    // Log the error if something goes wrong
    await Log.create({
      level: 'error',
      message: `Error feedback`,
      adminId: req.user._id,
      adminName: req.user.name
    });

    res.status(400).send({ error: error.message });
  }
};

module.exports =  {
    test,
    loginUser,
    getProfile,
    logoutUser,
    addWord,
    getWords,
    deleteWordDoc,
    updateWordDoc,
    getUsers,
    getTotalCounts,
    getWordsSortedByUsage,
    createMobUser,
    deleteMobUser,
    updateMobUser,
    adminLogs,
    getFeedbackForAdmin,
    addupdate,
    getUpdates,
    deleteUpdate,
    forgotpassword,
    resetpassword,
    deleteFeedback
}