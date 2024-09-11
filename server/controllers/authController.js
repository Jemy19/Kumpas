const User = require('../models/user')
const Word = require('../models/signs')
const MobUser = require('../models/mobusers')
const { hashPassword, comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Log = require('../models/log'); 

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
          res.cookie('token', token).json({ ...user.toObject(), token });
        }
      );
    } else {
      return res.json({ error: 'Unauthorized access' });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.json({ error: 'Internal server error' });
  }
};


const getProfile = (req, res) => {
    const {token} = req.cookies
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) throw err;
            res.json(user)
        })
    } else {
        res.json(null)
    }
}

const getWords = async (req, res) => {
    try {
        const words = await Word.find();
        res.json(words);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const logoutUser = (req, res) => {
    res.cookie('token', '', { maxAge: 1 }).json('Logged out');
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
        return res.json(word);
    } catch (error) {
        console.log(error)
    }
}
  
const deleteWordDoc = async (req, res) => {
    const { id } = req.params;
    console.log('Received delete request for id:', id); 
    try {
        const result = await Word.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            return res.json({
                error: 'word not found'
            })
        }
        res.json({
            message: 'Word deleted successfully'
        });
    } catch (error) {
        console.log(error);
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
      res.json(updatedWord);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'An error occurred while updating the word',
      });
    }
};
  
const getUsers = async (req, res) => {
try {
    // Accessing the MongoDB collection directly
    const users = await mongoose.connection.db.collection('mobileusers').find().toArray();
    res.json(users);
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
    if (!password || password.length < 6) {
      return res.json({ error: 'Password is required and should be at least 6 characters long' });
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
    })
    }
    await Log.create({
      level: 'info',
      message: `Delete Admin Account: ${MobileUser.username}`,
      adminId: req.user._id,
      adminName: req.user.name
    });
    res.status(200).send(admin);
  } catch (error) {
    const userid = req.params.id;
    await Log.create({
      level: 'error',
      message: `Error Deleting Admin Account: ${userid.name}`,
      adminId: req.user._id,
      adminName: req.user.name
    });
    res.status(400).send(error);
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
    deleteMobUser
}