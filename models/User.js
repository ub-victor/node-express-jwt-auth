const mongoose = require('mongoose');
const {isEmail} = require('validator');// Import the isEmail function from the validator library to validate email addresses

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email'] // Use the isEmail function from the validator library to validate the email format
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minLength: [6, 'Minimum password length is 6 characters']
    }
});


const User = mongoose.model('user', userSchema);

module.exports = User;