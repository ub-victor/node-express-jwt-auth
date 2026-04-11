// controller actions
const User = require('../models/User');


// handle errors
const handleErrors = (err)=>{
    console.log(err.message, err.code)
    let errors = {email: '', password: ''};

    // duplicate email error
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