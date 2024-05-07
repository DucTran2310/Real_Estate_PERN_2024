const propertyTypeService = require('../services/propertyTypeService')

const createNewPropertyType = async function (req, res) {
  const response = await propertyTypeService.createNewPropertyTypeServices(req, res)

  return response
}

const getPropertyTypes = async function (req, res) {
  const response = await propertyTypeService.getPropertyTypesServices(req, res)

  return response
}

const updatePropertyType = async function (req, res, next) {
  const response = await propertyTypeService.updatePropertyTypesServices(req, res, next)

  return response
}

const deletePropertyType = async function (req, res, next) {
  const response = await propertyTypeService.removePropertyTypesServices(req, res, next)

  return response
}

module.exports = {
  createNewPropertyType,
  getPropertyTypes,
  updatePropertyType,
  deletePropertyType
}
