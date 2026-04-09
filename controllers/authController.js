// controller actions

const signup_get = (req, res)=> {
    res.render('signup')
}

const login_get = (req, res)=> {
    res.render('login')
}

const signup_post = (req, res)=> {
    res.send('signup')
}

const login_post = (req, res)=> {
    console.log(req.body);
    res.send('signup')
    
}

module.exports = {
    signup_get,
    login_get,
    signup_post,
    login_post
}