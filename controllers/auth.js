const User = require('../models/user')
const shortId = require('shortid')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

exports.signup = (req, res) => {
    User.findOne({email: req.body.email}).exec((err, user) => {
        if(user){
            return res.status(400).json({
            
                error: 'Email has been taken'    
            })
        }
        const { name, email, password } = req.body;
        let username = shortId.generate();
        let profile = `${process.env.CLIENT_URL}/profile/${username}`;
        let newUser = new User({username, name, email, password, profile});
        newUser.save((err, success) => {
            if(err){
                return res.status(400).json({
                    error: err
                })
            }else{
                res.json({
                    message: "Signup successfully, please signin"
                })
            }
        })
    })
};

exports.signin = (req, res) => {
    //check if exist
    const {email, password} = req.body;
    User.findOne({email}).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: `User with email ${email} does not exist, please signup first` 
            })
        }
        //authenticate
        if(!user.authenticate(password)){
            return res.status(400).json({
                error: "Incorrect, please check email or password!"
            })
        }
        //generate a token and send to client
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '3d'})
        res.cookie('token', token, {expiresIn: '3d'})
        const {_id, username, email, name, role} = user
        return res.json({
            token: token,
            user: {_id, username, email, name, role}
        })
    });  
};

exports.signout = (req, res) => {
    res.clearCookie('token');
    res.json({
        message: 'signout success'
    })
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET
})










