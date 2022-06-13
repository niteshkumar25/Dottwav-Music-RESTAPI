const playlist = require('../models/playlist');
const userModel = require('../models/user');
const Songs = require('../models/addsongs');



const PLAYLIST = {
    createPlaylist: async (req, res) => {
        const user = await userModel.findById(req.body.userId);
        console.log(user);
        const playList = await playlist({ ...req.body, user: user._id }).save();
        user.playlists.push(playList._id);
        await user.save();

        res.status(201).send({ data: playList });
    },

    updatePlaylist: async (req, res) => {
        const PlayList = await playlist.findById(req.params.id)
        if (!PlayList) return res.status(404).send({ message: "Playlist not found" });
        const user = await userModel.findById(req.body.userId);
        console.log(user);
        if (!user._id.equals(PlayList.userId))
            return res.status(403).send({ message: "User don't have access to edit!" });
        PlayList.title = req.body.title;
        PlayList.desc = req.body.desc;
        PlayList.img = req.body.img;
        await PlayList.save();

        res.status(200).send({ message: "Updated successfully" });
    },

    // add song to playlist
    songAdd: async (req, res) => {
        const user = await userModel.findById(req.body.userId);
        const PlayList = await playlist.findById(req.params.id);
        if (!user._id.equals(PlayList.userId))
            return res.status(403).send({ message: "User don't have access to add!" });

        if (PlayList.songs.indexOf(req.body.SongId) === -1) {
            PlayList.songs.push(req.body.SongId);

        }
        await PlayList.save();
        res.status(200).send({ data: playlist, message: "Added to playlist" });
    },

    //Remove Song
    removeSong: async (req, res) => {
        const user = await userModel.findById(req.body.userId);
        const PlayList = await playlist.findById(req.params.id);
        console.log(PlayList);

        if (!user._id.equals(PlayList.userId))
            return res.status(403).send({ message: "User don't have access to Remove!" });

        const index = PlayList.songs.indexOf(req.body.songId);
        PlayList.songs.splice(index, 1);
        await PlayList.save();
        res.status(200).send({ data: playlist, message: "Removed from playlist" });
    },


//user get Playlist
    getUsersPlaylist: async (req, res) => {
        const user = await userModel.findById(req.body.userId);
        const playlists = await playlist.find({ _id: user.playlists });
        res.status(200).send({ data: playlists });
    },


    // delete playlist by id
    DeletePlayList: async (req, res) => {
        const user = await userModel.findById(req.body.userId);
        const PlayList = await playlist.findById(req.params.id);
        if (!user._id.equals(PlayList.userId))
            return res.status(403).send({ message: "User don't have access to delete!" });
        const index = user.playlists.indexOf(req.params.id);
        user.playlists.splice(index, 1);
        await user.save();
        await PlayList.remove();
        res.status(200).send({ message: "Removed from library" });
    },

    //Admin show all playlists
    allPlaylist: async (req, res) => {
        const playlists = await playlist.find();
        res.status(200).send({ data: playlists });
    }


}









module.exports = PLAYLIST;