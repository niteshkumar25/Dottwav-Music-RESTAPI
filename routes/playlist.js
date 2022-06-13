const PLAYLIST = require('../controllers/playlist');
const { verifyToken, isAdmin } = require('../middleware/middleware');
const router = require('express').Router();

//Add playlist
// router.get('/:id', PLAYLIST.getlist);
router.post('/add', verifyToken, PLAYLIST.createPlaylist);
router.put('/:id', verifyToken, PLAYLIST.updatePlaylist);
router.put('/addsong/:id', verifyToken, PLAYLIST.songAdd);
router.put('/remove/:id', verifyToken, PLAYLIST.removeSong);


//get users playlist
router.get('/all', verifyToken, PLAYLIST.getUsersPlaylist);

//Delete Playlist 
router.delete('/delete/:id', verifyToken, PLAYLIST.DeletePlayList);

//Admin Show All Playlist
router.get('/AllList', isAdmin, PLAYLIST.allPlaylist);





module.exports = router;

