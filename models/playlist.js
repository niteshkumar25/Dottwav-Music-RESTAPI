const mongoose = require('mongoose');


PlaylistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    // userId: {
    //     type: String,
    //     required: true,

    // },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    songs: { type: Array, default: [] },

    desc: { type: String, max: 100 },
    img: { type: String }
})

module.exports = mongoose.model('playlist', PlaylistSchema);