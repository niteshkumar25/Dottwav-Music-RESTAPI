const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

const verifyToken = async (req, res, next) => {
  let token
  const { authorization } = req.headers
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      // Get Token from header
      token = authorization.split(' ')[1]

      // Verify Token
      const { userId } = jwt.verify(token, process.env.TOKEN_SECRET)
    

      // Get User from Token
      req.user = await userModel.findById(userId).select('-password')
    

      next()
    } catch (error) {
      console.log(error)
      res.status(401).json({ "status": "failed", "message": "Unauthorized User" })
    }
  }
  if (!token) {
    res.status(401).json({ "status": "failed", "message": "Unauthorized User, No Token" })
  }


}


const isAdmin = async (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("Your not allowed to do that")
    }
  });



}










module.exports = { verifyToken, isAdmin };
