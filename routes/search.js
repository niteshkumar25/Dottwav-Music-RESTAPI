const router = require('express').Router();
const searching = require('../controllers/search');
const {isAdmin,verifyToken} = require('../middleware/middleware')

//Search
router.get('/searching/', verifyToken, searching);



module.exports = router