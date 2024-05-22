const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const db = require('../models/index')
const { where } = require('sequelize')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { throwErrorWithStatus } = require('../middlewares/errorHandler')

const getUserCurrentServices = asyncHandler(async (req, res) => {

  const { uid } = req.user
  let response = await db.User.findByPk(uid, {
    nest: false,
    attributes: {
      exclude: ["password"]
    },
    include: [
      {
        model: db.User_Role, 
        attributes: ["roleCode"],
        as: "userRoles",
        include: [
          {
            model: db.Role,
            as: "value",
            attributes: ["value"],
            nest: false
          }
        ]
      }
    ]
  })

  return res.json({
    success: Boolean(response),
    toastMessage: response ? "Get info user successfully" : "Cannot get user",
    currentUser: response
  })

})

const getRolesServices = asyncHandler(async (req, res) => {

  const response = await db.Role.findAll({
    attributes: ['code', 'value']
  })

  return res.json({
    success: Boolean(response),
    toastMessage: response ? "Get roles successfully" : "Cannot get roles",
    listRoles: response
  })

})

module.exports = {
  getUserCurrentServices,
  getRolesServices
}
