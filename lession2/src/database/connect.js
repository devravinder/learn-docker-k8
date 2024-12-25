const { sequelize } = require('./sequelize')
const { loggerService } = require('../services')

const connectToDb = async () => {
  await sequelize.authenticate()

  sequelize.sync() // sync all
  //  sequelize.sync({force:true})

  // sequelize.models.task.sync() // to sync one // sequelize.models.task.sync({force:true})

  loggerService.logInfo({ message: '✓ 👍 connection established successfully', logToFile: true })
}

module.exports = { connectToDb }
