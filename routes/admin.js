const router = require('express').Router();
const admin = require('../controllers/Admin');
const { verifyToken, isAdmin } = require('../middleware/middleware')

router.get('/users', isAdmin, admin.getAllUser);
router.delete('/users/:id', isAdmin, admin.deleteUser);



module.exports = router;