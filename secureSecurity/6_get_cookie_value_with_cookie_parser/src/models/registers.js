const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const async = require('hbs/lib/async');
// const res = require('express/lib/response');
// const bcrypt = require('bcryptjs/dist/bcrypt');

const employeeSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        min: 3
    },
    lastname: {
        type: String,
        required: true,
        min: 3
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    repassword: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    textarea: {
        type: String,
        max: 500,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

employeeSchema.methods.generateAuthToken = async function(){
    try{
        // console.log(this._id);  create automatically id of given string
                                                  //use toString() because this._id return object type of id
        const token = await jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY);   //without await also work
        this.tokens = this.tokens.concat({token:token});  //same as:  this.tokens[0].token = token;
        await this.save();
        return token;
    }catch(e){
        res.send('Error In generatetoken Part\n',e);
        console.log('Error In generatetoken Part\n',e)
    }
};

// converting password into hash
// employeeSchema.pre('save', async function(next){
//     if(this.isModified('password')){
//         console.log(`the current password is ${this.password}`);
//         this.password = await bcrypt.hash(this.password, 10);
//         console.log(`the current password is ${this.password}`);

//         this.confirmpassword = undefined;
//     }
//     next();
// })


// now we need to create a collections

const Register = new mongoose.model('Register', employeeSchema);

module.exports = Register;