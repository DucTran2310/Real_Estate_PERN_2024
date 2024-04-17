const Joi = require('joi')

const string = Joi.string().allow(null, "")
const stringReq = Joi.string().required()
const number = Joi.number().allow(null, "")
const numberReq = Joi.number().required()
const array = Joi.array().allow(null, "")
const arrayReq = Joi.array().required()

module.exports = {
  string,
  stringReq,
  number,
  numberReq,
  array,
  arrayReq
}
