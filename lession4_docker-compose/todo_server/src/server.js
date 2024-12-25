const express = require('express');
const { initializeMiddlewares } = require('./middlewares')
const { loggerService } = require('./services')

const createServer = () => {
  const { pid, env: { HTTP_PORT } } = process
  const app = express();
  initializeMiddlewares(app)
  app.listen(HTTP_PORT, () => {
    loggerService.logInfo({ message: `✓ 😀 Server started ( pid: ${pid}, port:${HTTP_PORT} )`, logToFile: true })
  })
}

module.exports = { createServer }
