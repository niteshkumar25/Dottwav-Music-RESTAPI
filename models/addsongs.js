const mongoose = require('mongoose');

addSong = new mongoose.Schema({
   title: { type: String, required: true, unique: true },
   desc: { type: String, required: true },
   size: { type: String, required: true },
   artist: { type: String, required: true },
   img: { type: String, required: true },
   duration: { type: String, required: true },
   Geners: { type: String, required: true },
});



module.exports = mongoose.model('songs', addSong);