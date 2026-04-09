const {Router} = require('express');
const {signup_get, login_get, signup_post, login_post} = require('../controllers/authController')

const router = Router();

router.get('/signup', (signup_get));
router.post('/signup', (signup_post));
router.get('/login', (login_get));
router.post('/login',(login_post));

module.exports= router;