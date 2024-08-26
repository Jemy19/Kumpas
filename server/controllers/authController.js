const User = require('../models/user')
const Word = require('../models/signs')
const { hashPassword, comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const test = (req, res) => {
    res.json('test is working')
}

//login  
const loginUser = async(req, res) => {
 try {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user) {
        return res.json({
            error: 'No user Found'
        })
    }

    const match = await comparePassword(password, user.password)
    if(match && user.role === 'super_admin'|| user.role === 'admin') {
        jwt.sign({email: user.email, id: user._id, name: user.name, role: user.role }, process.env.JWT_SECRET, {}, (err, token) => {
            if(err) throw err;
            res.cookie('token', token).json({ ...user.toObject(), token });
            
        })
    } 
    if(!match) {
        res.json({
            error: 'Password do not match'
        })
    }
 } catch (error) {
    console.log(error)
 }
}

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
module.exports =  {
    test,
    loginUser,
    getProfile,
    logoutUser,
    addWord,
    getWords,
    deleteWordDoc,
    updateWordDoc,
    getUsers
}