const router = require('express').Router()
const authController = require('../controllers/authController')
const { stringReq, numberReq, string } = require('../middlewares/joiSchema')
const validateDTO = require('../middlewares/validation')
const Joi = require("joi")

router.post(
  '/register', 
  validateDTO(
    Joi.object({ 
      password: stringReq,
      name: stringReq,
      phone: numberReq,
      roleCode: string
    })
  ), 
  authController.register
)

router.post(
  '/signIn', 
  validateDTO(
    Joi.object({ 
      phone: numberReq,
      password: stringReq
    })
  ), 
  authController.signIn
) 

module.exports = router