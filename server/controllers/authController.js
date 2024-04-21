const authServices = require('../services/authServices')

const register = async function (req, res) {
  const response = await authServices.registerUser(req, res)

  return response
}

const signIn = async function (req, res, next) {
  const response = await authServices.signIn(req, res, next)

  return response
}


module.exports = {
  register,
  signIn
}
