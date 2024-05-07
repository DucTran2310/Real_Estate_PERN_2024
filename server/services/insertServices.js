const asyncHandler = require('express-async-handler')
const db = require('../models/index')
const { throwErrorWithStatus } = require('../middlewares/errorHandler');
const { roles } = require('../utils/constants');

const initRolesService = asyncHandler(async (req, res) => {

  const response = await db.Role.bulkCreate(roles);

  return res.json({
    success: Boolean(response),
    toastMessage: response ? "Inserted successfully" : "Something went wrong",
  })
  
})

module.exports = {
  initRolesService
}
