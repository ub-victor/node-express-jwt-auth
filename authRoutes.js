const {Router} = require('express');
const {signup_get, login_get, signup_post, login_post} = require('./controllers/authController')

const router = Router();

router.get('/signup', ()=> {});
router.post('/signup', ()=> {});
router.get('/login', ()=> {});
router.post('/login', ()=> {});

module.exports= router;