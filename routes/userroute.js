const router = require('express').Router();
const userCntrl = require('../controllers/auth');
const { verifyToken, isAdmin } = require('../middleware/middleware');

//User Login
router.post('/register', userCntrl.Register);
router.post('/login', userCntrl.Login);


//Private 
router.put('/update', verifyToken, userCntrl.updateUser);
router.get('/:id', verifyToken, userCntrl.getUser);




module.exports = router;