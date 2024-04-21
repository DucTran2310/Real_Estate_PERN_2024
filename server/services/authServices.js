const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const db = require('../models/index')
const { where } = require('sequelize')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { throwErrorWithStatus } = require('../middlewares/errorHandler')

// async function registerUser(userData) 
const registerUser = asyncHandler(async (req, res) => {
  // password, phone, name, role = [USER, AGENT, ADMIN]
  // client = urlencoded || formdata => req.body
  // client = params (?=adstar) => req.query
  // client api/user/:id => req.params

  const { password, phone, name, role } = req.body

  //handle logic
  const response = await db.User.findOrCreate({
    where: { phone: phone },
    defaults: req.body
  })

  return res.json({
    error: response[1] ? false : true,
    success: response[1],
    toastMessage: response[1]
      ? "Your account is created"
      : "PhoneNumber already had exist",
  });
})

const signIn = asyncHandler(async (req, res, next) => {
  const { phone, password } = req.body;
  const user = await db.User.findOne({
    where: { phone },
  });
  if (!user)
    return throwErrorWithStatus(
      401,
      "User with that phone have not register",
      res,
      next
    );
  const isMatchingPassword = bcrypt.compareSync(password, user.password);
  if (!isMatchingPassword)
    return throwErrorWithStatus(401, "Password is wrong", res, next);
  const token = jwt.sign(
    {
      uid: user.id,
      roleCode: user.roleCode,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );
  return res.json({
    error: false,
    success: true,
    toastMessage: "Sign In is successfully",
    accessToken: token
  });
});


module.exports = {
  registerUser,
  signIn
}
