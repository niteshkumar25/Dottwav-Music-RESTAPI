const mongoose = require('mongoose');

userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    playlists: { type: [String], default: [] },
    isAdmin: { type: Boolean, default: false },

},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('users', userSchema);
