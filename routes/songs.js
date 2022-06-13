const { verifyToken, isAdmin } = require('../middleware/middleware');
const addSong = require('../controllers/addsong');
const { add } = require('nodemon/lib/rules');
const router = require('express').Router();


router.post('/addSong', isAdmin, addSong.addSong);
router.put('/update/:id', isAdmin, addSong.updateSong);
router.delete('/delete/:id', isAdmin, addSong.deleteSong);
router.get('/song/:id', verifyToken, addSong.getsong);
router.get('/allSong', verifyToken, addSong.getAllSongs);


module.exports = router