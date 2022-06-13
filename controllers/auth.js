const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userCntrl = {
    Register: async (req, res) => {
        try {
            const { username, email, password, isAdmin } = req.body;

            const hashpassword = await bcrypt.hash(password, 10)

            const user = new UserModel({
                username: username,
                email: email,
                password: hashpassword,
                isAdmin: isAdmin
            });
            await user.save();

            res.status(200).json({ msg: "Your register", "user": user })

        } catch (err) {
            res.status(500).json(err);

        }


    },
    Login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await UserModel.findOne({ email: email })
            if (!user) res.status(403).json({ msg: "Invalid Details" })
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(403).json({ msg: "Invalid Details" });
            }
            else {
                const token = await jwt.sign({
                    userId: user._id,
                    isAdmin: user.isAdmin
                }, process.env.TOKEN_SECRET, { expiresIn: '1d' })
                res.status(200).json({ msg: "Your login", "Token": token })
            }
        } catch (err) {
            console.log(err);

        }
    },
    updateUser: async (req, res) => {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        try {
            const updateUser = await UserModel.findByIdAndUpdate(req.user._id, {
                $set: req.body
            }, { new: true })
            res.status(200).json(updateUser);
        } catch (err) {
            res.status(500).json(err);

        }
    },


    getUser: async (req, res) => {
        const user = await UserModel.findById(req.params.id);
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.json("err")
        }
    }

}




module.exports = userCntrl;