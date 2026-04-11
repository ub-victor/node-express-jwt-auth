// controller actions
const User = require('../models/User');


// handle errors
const handleErrors = (err)=>{ 
    console.log(err.message, err.code); // this log outs the error message and code to the console for debugging purposes
    let errors = {email: '', password: ''}; // initialize an errors object with empty strings for email and password to store any error messages related to these fields

    // duplicate email error
    /**
     * This block checks if the error code is 11000,
     * which is a common code for duplicate key errors in MongoDB.
     *  If this error occurs, it means that the email being registered
     *  already exists in the database. The code then sets the email property
     *  of the errors object to a message indicating that the email
     *  is already registered and returns the errors object. 
     * This allows the application to inform the user about
     *  the specific issue with their registration attempt.
     * which mean in the empty error object, the email field will be populated with the message 'That email is already registered' if a duplicate email error occurs but the password field remains empty.
     */
    if(err.code === 11000){
        errors.email = 'That email is already registered';
        return errors;
    }

    // validation errors
    /**
     * This block checks if the error message includes the string 'user validation failed',
     * which indicates that there were validation errors when trying to create a user.
     * If this condition is true, it iterates over the values of the err.error object,
     * which contains details about the validation errors. For each error, it extracts
     * the properties of the error and assigns the corresponding error message to the
     * appropriate field in the errors object based on the path property. Finally, it
     * returns the errors object, which now contains specific error messages for each
     * field that failed validation. This allows the application to provide detailed
     * feedback to the user about what went wrong during the registration process.
     */
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