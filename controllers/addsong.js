// const addsongs = require('../models/addsongs');
const addSong = require('../models/addsongs');

//bhai title unqiue save hoga usko change kar hojyga
const Songs = {
    addSong: async (req, res) => {
        const newSong = await new addSong(req.body);
        try {
            const SavedSong = await newSong.save();
            res.status(200).json(SavedSong);
        } catch (err) {
            res.status(500).json(err)

        }

    },

    updateSong: async (req, res) => {
        try {
            const song = await addSong.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true })

            res.status(200).json(song);
        } catch (err) {
            res.status(500).json(err);

        }
    },

    deleteSong: async (req, res) => {
        try {
            await addSong.findByIdAndDelete(req.params.id);
            res.status(200).json("Song has been Delete......")

        } catch (err) {
            res.status(500).json(err);
        }
    },


    getsong: async (req, res) => {
        try {
            const song = await addSong.findById(req.params.id);

            res.status(200).json(song);
        } catch (err) {
            res.status(500).json(err)

        }
        ;

    },

    getAllSongs: async (req, res) => {
        try {
            const Songs = await addSong.find();
            res.status(200).json(Songs);

        } catch (err) {
            res.status(500).json(err)

        }


    }

}


module.exports = Songs;