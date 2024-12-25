const { loggerService } = require('../services')
const { LOGICAL } = require('../contants')

const requestAndResponseInfoLogger = (req, res, next) => {
  if (process.env.INFO_LOGS_TO_CONSOLE !== LOGICAL.NO) {
    const { ip, hostname, method, baseUrl, path, originalUrl, params, query } = req
    const details = { req: { ip, hostname, method, baseUrl, path, originalUrl, params, query } }
    loggerService.logInfo({ message: JSON.stringify(details) })
  }
  next()
}

module.exports = { requestAndResponseInfoLogger }
