const router = require('express').Router()
const authController = require('../controllers/authController')
const { stringReq, numberReq } = require('../middlewares/joiSchema')
const validateDTO = require('../middlewares/validation')
const Joi = require("joi")

router.post(
  '/register', 
  validateDTO(
    Joi.object({ 
      password: stringReq,
      name: stringReq,
      phone: numberReq
    })
  ), 
  authController.register
) 

module.exports = router