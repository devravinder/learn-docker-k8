const { errorMessages: { INPUT_VALIDATION_FAILED } } = require('../contants')
const { isString, isObject } = require('../utilities')

class CustomError extends Error {
  constructor (message) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.message = message
    this.errors = {}
    this.meta = {}
    this.status = false
  }
}

class ClientError extends CustomError {}
class AuthorizationError extends ClientError {}
class NotFoundError extends ClientError {}
class ForbiddenError extends ClientError {}

class ValidationError extends ClientError {
  constructor (message, meta = {}) {
    super(isString(message) ? message : INPUT_VALIDATION_FAILED)
    if (isObject(message)) this.errors = message
    this.meta = meta
  }
}

module.exports = {
  CustomError,
  ClientError,
  AuthorizationError,
  NotFoundError,
  ForbiddenError,
  ValidationError
}
