const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


//User Update
const admin = {
    getAllUser: async (req, res) => {
        const query = req.query.name;
        try {
            const user = query
                ? await userModel.find({ isAdmin: false }).sort({ _id: -1 }).limit(3).select('-password')
                : await userModel.find().count();
            res.status(200).json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    //admin delete user
    deleteUser: async (req, res) => {
        try {
            await userModel.findByIdAndDelete(req.params.id);
            res.status(401).json("User is delete")

        } catch (err) {
            res.status(500).json(err);
        }
    }


}
module.exports = admin;