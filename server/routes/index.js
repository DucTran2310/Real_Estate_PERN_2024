const { errHandler, badRequestException } = require('../middlewares/errorHandler')
const authRoutes = require('./authRoutes')
const userRoutes = require('./userRoutes')
const insertRoutes = require('./insertRoutes')
const propertyTypeRoutes = require('./propertyTypeRoutes')

const initRoutes = (app) => {
  app.use('/api/property-type', propertyTypeRoutes)
  app.use('/api/auth', authRoutes)
  app.use('/api/user', userRoutes)
  app.use('/api/insert', insertRoutes)

  app.use("/", badRequestException)
  app.use(errHandler)
}

module.exports = initRoutes
