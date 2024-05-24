const router = require("express").Router();
const Joi = require("joi");
const propertyTypeController = require("../controllers/propertyTypeController");
const validateDto = require("../middlewares/validation");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
const { stringReq, string } = require('../middlewares/joiSchema');
const rateLimiter = require("../middlewares/rateLimiter");

router.use(rateLimiter)

router.post(
  "/",
  verifyToken,
  // isAdmin,
  validateDto(
    Joi.object({
      name: stringReq,
      description: stringReq,
      image: stringReq
    })
  ),
  propertyTypeController.createNewPropertyType
)

router.get(
  "/",
  propertyTypeController.getPropertyTypes
)

router.patch(
  "/:id",
  verifyToken,
  isAdmin,
  validateDto(
    Joi.object({
      name: string,
      description: string,
      image: string
    })
  ),
  propertyTypeController.updatePropertyType
)

router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  propertyTypeController.deletePropertyType
)

module.exports = router;
