const User = require('../models/user')
const asyncHandler = require('express-async-handler')

// async function registerUser(userData) 
const registerUser = asyncHandler(async (req, res) => {
  // password, phone, name, role = [USER, AGENT]
  // client = urlencoded || formdata => req.body
  // client = params (?=adstar) => req.query
  // client api/user/:id => req.params

  const { password, phone, name, role } = req.body

  //handle logic

  return res.json({
    error: false,
    success: true,
    toastMessage: 'Register successfully',
    data: { password, phone, name, role }
  })
})


module.exports = {
  registerUser
}
