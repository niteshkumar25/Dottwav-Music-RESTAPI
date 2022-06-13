const PlayList = require('../models/playlist');
const Songs = require('../models/addsongs');

const searching = async(req,res)=>{
    const search = req.query.search;
    console.log(search);
	if (search !== "") {
		const songs = await Songs.find({
			title: { $regex: search, $options: "i" },
		}).limit(10);
		const playlists = await PlayList.find({
			title: { $regex: search, $options: "i" },
		}).limit(10);
		const result = { songs, playlists };
		res.status(200).send(result);
	} else {
		res.status(200).send({});
	}
}

module.exports = searching;