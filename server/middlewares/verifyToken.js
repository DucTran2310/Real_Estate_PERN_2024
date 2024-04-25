const jwt = require("jsonwebtoken");
const { throwErrorWithStatus } = require("./errorHandler");

const verifyToken = (req, res, next) => {
  const token = req?.headers?.authorization?.startsWith("Bearer")

  if (!token) return throwErrorWithStatus(401, "Credentials not provide", res, next)

  const rawToken = req?.headers?.authorization?.split(" ")[1]

  jwt.verify(rawToken, process.env.JWT_SECRET_KEY, (err, decode) => {
    if (err) return throwErrorWithStatus(401, "Credentials invalid", res, next)
    req.user = decode
    next()
  })
}

module.exports = {
  verifyToken
}
