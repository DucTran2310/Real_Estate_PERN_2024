const { errHandler, badRequestException } = require('../middlewares/errorHandler')
const authRoutes = require('./authRoutes')

const initRoutes = (app) => {
  app.use('/api/auth', authRoutes)

  app.use("/", badRequestException)
  app.use(errHandler)
}

module.exports = initRoutes
