const userServices = require('../services/userServices')

const getUserCurrent = async function (req, res) {
  const response = await userServices.getUserCurrentServices(req, res)

  return response
}

module.exports = {
  getUserCurrent
}
