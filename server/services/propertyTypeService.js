const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const db = require('../models/index')
const { where } = require('sequelize')
const jwt = require("jsonwebtoken")
const Sequelize = require('sequelize')
const bcrypt = require("bcrypt")
const { throwErrorWithStatus } = require('../middlewares/errorHandler')

const createNewPropertyTypeServices = asyncHandler(async (req, res) => {

  const { name } = req.body

  const response = await db.PropertyType.findOrCreate({
    where: { name },
    defaults: req.body,
  })

  return res.json({
    error: !response[1],
    success: response[1],
    toastMessage: response[1] ? "Created successfully" : "Name property duplicated",
    propertyType: response[0],
  })

})

const getPropertyTypesServices = asyncHandler(async (req, res) => {
  const { limit, page, fields, name, sort, ...query } = req.query;

  const options = {}
  //limit fields
  if (fields) {
    const attributes = fields.split(",");
    const isExcluded = attributes.some((el) => el.startsWith("-"));
    if (isExcluded)
      options.attributes = {
        exclude: attributes.map((el) => el.replace("-", "")),
      }
    else options.attributes = attributes
  }

  //Filter by client queries
  if (name)
    query.name = Sequelize.where(
      Sequelize.fn("LOWER", Sequelize.col("name")),
      "LIKE",
      `%${name.toLocaleLowerCase()}%`
    )

  //Sort
  // order = [[createdAt, ASC], [name, DESC]]
  // [createdAt, -name]
  if (sort) {
    const order = sort
      .split(",")
      .map((el) =>
        el.startsWith("-") ? [el.replace("-", ""), "DESC"] : [el, "ASC"]
      );

    options.order = order;
  }

  if (!limit) {

    const response = await db.PropertyType.findAll({
      where: query,
      ...options
    })

    return res.json({
      error: response.length > 0 ? false : true,
      success: response.length > 0 ? true : false,
      toastMessage: response.length > 0 ? "Got all propertyTypes successfully" : "Cannot get propertyType",
      propertyTypes: response
    })
  }

  //Pagination
  const prevPage = page - 1 > 0 ? page - 1 : 1;
  const offset = (prevPage - 1) * limit;
  if (offset) options.offset = offset;
  options.limit = +limit;

  const response = await db.PropertyType.findAndCountAll({
    where: query,
    ...options,
  });
  return res.json({
    success: response.length > 0,
    toastMessage: response.length > 0 ? "GGot propertyTypes successfully" : "Cannot get propertyTypes",
    propertyTypes: response,
  });

  // sorting
  // if (sort) {
  //   const order = sort
  //     .split(",")
  //     .map((el) =>
  //       el.startsWith("-") ? [el.replace("-", ""), "DESC"] : [el, "ASC"]
  //     );

  //   options.order = order;
  // }
  // const filter = {
  //   where: query,
  //   ...options,
  // };
  // if (!limit) {
  //   const keys = generateKeyRedis(filter);
  //   const alreadyGetAll = await redis.get(keys);
  //   if (alreadyGetAll)
  //     return res.json({
  //       success: true,
  //       mes: "Got",
  //       propertyTypes: JSON.parse(alreadyGetAll),
  //     });
  //   const response = await db.PropertyType.findAll({ ...filter });
  //   redis.set(keys, JSON.stringify(response));
  //   redis.expireAt(keys, parseInt(+new Date() / 1000) + 86400); //24h

  //   return res.json({
  //     success: response.length > 0,
  //     mes: response.length > 0 ? "Got" : "Cannot get propertyTypes",
  //     propertyTypes: response,
  //   });
  // }
})

const updatePropertyTypesServices = asyncHandler(async (req, res, next) => {
  const { id } = req.params

    // Kiểm tra xem có trường name, image, description trong req.body không
  if (!req.body.name || !req.body.image || !req.body.description) {
    return throwErrorWithStatus(403, "Name, image, and description are required", res, next)
  }
  
  if (Object.keys(req.body).length === 0)
    return throwErrorWithStatus(403, "Missing input", res, next)

  const [numOfAffectedRows, updatedPropertyType] = await db.PropertyType.update(req.body, {
    where: { id },
    returning: true, // Trả về bản ghi đã được cập nhật
  })

  if (numOfAffectedRows === 0) {
    return res.json({
      error: true,
      success: false,
      toastMessage: "No data is updated"
    })
  }

  return res.json({
    error: false,
    success: true,
    toastMessage: "Updated successfully",
    updatedPropertyType // Trả về đối tượng đã được cập nhật thành công
  })
})

const removePropertyTypesServices = asyncHandler(async (req, res) => {
  const { id } = req.params
  const response = await db.PropertyType.destroy({
    where: { id },
  })
  return res.json({
    error: response > 0 ? false : true,
    success: response > 0,
    mes: response > 0 ? "Deleted successfully" : "No data is delete",
  })
})

module.exports = {
  createNewPropertyTypeServices,
  getPropertyTypesServices,
  updatePropertyTypesServices,
  removePropertyTypesServices
}
