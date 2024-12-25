const errorMessages = require('./errorMessages')
const dateUtility = require('./dateUtility')
const basicValidations = require('./basicValidations')
const validations = require('./validations')
const schemaValidator = require('./schemaValidator')

/*
We can make this as a library in future
 */
module.exports = {
  ...basicValidations,
  ...validations,
  ...schemaValidator,
  dateUtility,
  errorMessages
}
