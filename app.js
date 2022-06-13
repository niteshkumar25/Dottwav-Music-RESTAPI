const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors')
require('./dbconnect/dbcoonect');
const userRoute = require('./routes/userroute');
const AdminRoute = require('./routes/admin');
const Songs = require('./routes/songs');
const Playlist = require('./routes/playlist');
const search = require('./routes/search');

const app = express();

const PORT = process.env.PORT;

//Middleware 
app.use(express.json());
app.use(cors());

//Routes
app.use('/api/user', userRoute);
app.use('/api/admin', AdminRoute);
app.use('/api/songs', Songs);
app.use('/api/user/playlist', Playlist);
app.use('/api/', search);


//Listen
app.listen(PORT, () => {
    console.log("Sever is running on ", PORT);
})
