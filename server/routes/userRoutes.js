const router = require('express').Router()
const userController = require('../controllers/userController')
const { verifyToken } = require('../middlewares/verifyToken')

router.get(
  '/current', 
  verifyToken,
  userController.getUserCurrent
) 

router.get(
  '/roles', 
  userController.getRoles
) 

module.exports = router