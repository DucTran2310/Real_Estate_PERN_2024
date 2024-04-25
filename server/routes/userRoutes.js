const router = require('express').Router()
const userController = require('../controllers/userController')
const { verifyToken } = require('../middlewares/verifyToken')

router.get(
  '/current', 
  verifyToken,
  userController.getUserCurrent
) 

module.exports = router