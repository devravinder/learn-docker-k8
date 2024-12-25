const startApp = async () => {
  require('./config')
  // const { errorHandlerService } = require('./services')
  const errorHandlerService = require('./services/_helpers/errorHandler')
  try {
    errorHandlerService.registerGlobalErrorHandlers()
    const { connectToDb } = require('./database')
    await connectToDb()

    const { createServer } = require('./server')
    createServer()
  }
  catch (error) {
    errorHandlerService.handleError(error)
  }
}

startApp()
