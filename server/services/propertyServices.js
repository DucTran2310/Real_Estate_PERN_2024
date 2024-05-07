const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const db = require('../models/index')
const { where } = require('sequelize')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { throwErrorWithStatus } = require('../middlewares/errorHandler')

const getUserCurrentServices = asyncHandler(async (req, res) => {

  const {uid} = req.user
  const response = await db.User.findByPk(uid, {
    attributes: {
      exclude: ["password"]
    }
  })

  return res.json({
    success: Boolean(response),
    toastMessage: response ? "Get info user successfully" : "Cannot get user",
    currentUser: response
  })
  
})

module.exports = {
  getUserCurrentServices
}
