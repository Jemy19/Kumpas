const User = require('../models/user')
const Word = require('../models/signs')
const { hashPassword, comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('test is working')
}
// register
const registerUser = async (req, res) => {
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
        });
        return res.json(user)
    } catch (error) {
        console.log(error)
    }
};

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
    if(match) {
        jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
            if(err) throw err;
            res.cookie('token', token).json(user)
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

const logoutUser = (req, res) => {
    res.cookie('token', '', { maxAge: 1 }).json('Logged out');
};

const addWord = async (req, res) => {
    try {
      const {title, category, video} = req.body;
      if (!title){
          return res.json({
            error: 'Title is required'
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
          category,
          video,
        });
        return res.json(word);
    } catch (error) {
      console.log(error)
    }
  }
  

module.exports =  {
    test,
    registerUser,
    loginUser,
    getProfile,
    logoutUser,
    addWord
}