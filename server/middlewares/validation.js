const { throwErrorWithStatus } = require("./errorHandler")

const validateDto = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body)
  if (error) {
    // const message = error.details[0].message?.replaceAll(`\"`, '')
    // throwErrorWithStatus(403, message, res, next)

    return res.status(403).json({
      error: true,
      success: false,
      mes: error.details[0].message.replaceAll(`\"`, ""),
    });
  }
  next()
}

module.exports = validateDto
