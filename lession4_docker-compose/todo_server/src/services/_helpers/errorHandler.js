
const loggerService = require('./logger')

const mailError = ({ message }) => {
  /*  mailService.sendMail({
    userName:"kbdrreddy10@gmail.com",
    password:"***",
    from:"kbdrreddy10@gmail.com",
    to:"kbdrreddy10@gmail.com",
    subject:"Mail from Node",
    textMessage:"Hello",
    htmlMessage:"<h1>Hello</h1>"
    })
 */
}
const handleError = (error) => {
  const message = typeof error === 'object' ? error.stack || error.message : error
  loggerService.logError({ message })
  mailError({ message })
}

const registerGlobalErrorHandlers = () => {
  process.on('uncaughtException', function (error) {
    handleError(error)
  });

  process.on('unhandledRejection', function (error) {
    handleError(error)
  });
}

module.exports = {
  handleError,
  registerGlobalErrorHandlers
}
