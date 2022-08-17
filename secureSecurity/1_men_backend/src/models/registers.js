const mongoose = require('mongoose');

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
        type: Number,
        required: true,
    },
    repassword: {
        type: Number,
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
    }
})

// now we need to create a collections

const Register = new mongoose.model('Register', employeeSchema);

module.exports = Register;