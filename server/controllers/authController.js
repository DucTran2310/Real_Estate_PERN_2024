const authServices = require('../services/authServices')

const register = async function (req, res) {
  const response = await authServices.registerUser(req, res)

  return response
}


module.exports = {
  register
}
