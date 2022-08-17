const async = require('hbs/lib/async');
const jwt = require('jsonwebtoken');
const Register = require('../models/registers');


const auth = async (req, res, next) => {
    try{
        const token = req.cookies.loginToken;
        // console.log('token: ',token);
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(verifyUser);

        const user = await Register.findOne({_id:verifyUser._id})
        // console.log(user);
        // console.log(user.firstname);
        req.token = token;
        req.user = user;

        next();
    }catch(e){
        console.log('Error: IN Auth function\n',e);
        res.status(401).send(e);
    }
}

module.exports = auth;
