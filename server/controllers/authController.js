const User = require('../models/user')

const test = (req, res) => {
    res.json('test is working')
}

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
        const user  = await User.create ({
            name, email, password
        })
        return res.json(user)
    } catch (error) {
        console.log(error)
    }
}
module.exports =  {
    test,
    registerUser
}