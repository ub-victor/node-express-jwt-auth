// controller actions
const User = require('../models/User');


// handle errors
const handleErrors = (err)=>{ 
    console.log(err.message, err.code); // this log outs the error message and code to the console for debugging purposes
    let errors = {email: '', password: ''}; // initialize an errors object with empty strings for email and password to store any error messages related to these fields

    // duplicate email error
    /**
     * This block checks if the error code is 11000, which is a common code for duplicate key errors in MongoDB. If this error occurs, it means that the email being registered already exists in the database. The code then sets the email property of the errors object to a message indicating that the email is already registered and returns the errors object. This allows the application to inform the user about the specific issue with their registration attempt.
     */
    if(err.code === 11000){
        errors.email = 'That email is already registered';
        return errors;
    }

    // validation errors
    if (err.message.includes('user validation failed')){
        Object.values(err.error).forEach(({properties})=>{
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

const signup_get = (req, res)=> {
    res.render('signup')
}

const login_get = (req, res)=> {
    res.render('login')
}

const signup_post = async (req, res)=> {
    const {email, password} = req.body;
    try {
        if(!email || !password){
            return res.status(400).send("email and password are required")            
        }
        const user =  await User.create({email, password});
        res.status(201).json(user);
    }
    catch(error){
        console.log(error)
        res.status(400).send('error, user not created')
    }
}

const login_post = async (req, res)=> {
    const{email, password} = req.body;
    console.log(email, password);
    res.send('signup');
    
}

module.exports = {
    signup_get,
    login_get,
    signup_post,
    login_post
}