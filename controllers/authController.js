// controller actions
const User = require('../models/User')

const signup_get = (req, res)=> {
    res.render('signup')
}

const login_get = (req, res)=> {
    res.render('login')
}

const signup_post = (req, res)=> {
    try {

    }
    catch(error){
        console.log(error)
    }
}

const login_post = (req, res)=> {
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