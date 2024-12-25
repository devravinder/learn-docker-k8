const { AuthorizationError, NotFoundError, ForbiddenError, ValidationError } = require('../errors')
const { httpStatusCodes: { UNAUTHORIZED, NOT_FOUND, FORBIDDEN, BAD_REQUEST, INTERNAL_SERVER_ERROR } } = require('../contants')
const { errorHandlerService } = require('../services')

const clientErrorHandler = (err, req, res, next) => {
  if (err instanceof AuthorizationError) res.status(UNAUTHORIZED).send(err) // res.sendStatus(UNAUTHORIZED)
  else if (err instanceof NotFoundError) res.status(NOT_FOUND).send(err)
  else if (err instanceof ForbiddenError) res.status(FORBIDDEN).send(err)
  else if (err instanceof ValidationError) res.status(BAD_REQUEST).send(err)
  else next(err)
}

const serverErrorHandler = (err, req, res) => {
  errorHandlerService.handleError(err)
  res.status(INTERNAL_SERVER_ERROR).end()
}

module.exports = { clientErrorHandler, serverErrorHandler }
