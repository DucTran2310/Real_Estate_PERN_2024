const insertServices = require('../services/insertServices.js')

const insertRoles = async function (req, res) {
  const response = await insertServices.initRolesService(req, res)

  return response
}

module.exports = {
  insertRoles
}
