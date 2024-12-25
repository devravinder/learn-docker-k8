const fs = require('fs')
const { dateUtility: { now, onlyDatePart } } = require('../../utilities')
const { LOG_TYPES } = require('../../contants')
const { LOGS_PATH, ERROR_LOGS_PATH, INFO_LOGS_PATH } = process.env

const writeToFile = (message, fileName = `${LOGS_PATH}${onlyDatePart()}.log`) => {
  fs.writeFile(fileName, message, (err) => {
    if (err) { console.log(err) }
  })
}

const appendToFile = (message, fileName = `${LOGS_PATH}${onlyDatePart()}.log`) => {
  fs.appendFile(fileName, `\n${message}`, (err) => {
    if (err) { console.log(err) }
  })
}

/**
 * @param {String} message
 * @param {String} fileName
*/
const log = ({ message, type = LOG_TYPES.ERROR, logToConsole = true, logToFile = true, fileName = '' }) => {
  if (logToConsole) { console.log(message) }

  message = `${now()} ${typeof message === 'string' ? message : JSON.stringify(message)}`

  if (!fileName) {
    switch (type) {
      case LOG_TYPES.ERROR: {
        fileName = `${ERROR_LOGS_PATH}${onlyDatePart()}.log`
        break;
      }
      case LOG_TYPES.INFO: {
        fileName = `${INFO_LOGS_PATH}${onlyDatePart()}.log`
        break;
      }
      default: {
        fileName = `${LOGS_PATH}${onlyDatePart()}.log`
        break;
      }
    }
  }

  if (logToFile) {
    if (fs.existsSync(fileName)) { appendToFile(message, fileName) }
    else writeToFile(message, fileName)
  }
}

const logError = ({ message, logToConsole = true, logToFile = true, fileName = `${ERROR_LOGS_PATH}/${onlyDatePart()}.log` }) => log({ message, type: LOG_TYPES.ERROR, logToConsole, logToFile, fileName })
const logInfo = ({ message, logToConsole = true, logToFile = false, fileName = `${INFO_LOGS_PATH}/${onlyDatePart()}.log` }) => log({ message, type: LOG_TYPES.INFO, logToConsole, logToFile, fileName })

module.exports = { log, writeToFile, logError, logInfo }
