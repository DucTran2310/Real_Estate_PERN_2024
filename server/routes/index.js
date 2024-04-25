const { errHandler, badRequestException } = require('../middlewares/errorHandler')
const authRoutes = require('./authRoutes')
const userRoutes = require('./userRoutes')

const initRoutes = (app) => {
  app.use('/api/auth', authRoutes)
  app.use('/api/user', userRoutes)

  app.use("/", badRequestException)
  app.use(errHandler)
}

module.exports = initRoutes
