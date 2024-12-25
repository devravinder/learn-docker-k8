
const { isEmpty, isNumber, isBoolean } = require('./basicValidations')
const { isDate, isPast, isFuture, isBetween } = require('./dateUtility')
const {
  MANDATORY, REQUIRED, NUMBER, BOOLEAN, REGEX, BETEEN_NUMBER, MIN_LENGTH, MAX_LENGTH,
  DATE, FUTURE_DATE, PAST_DATE, BETWEEN_DATE, GREATER_THAN, LESS_THAN, CONTAINS
} = require('./errorMessages')

// these validations can be used for input validations in server side & client side

const mandatory = (message) => (val) => (!isEmpty(val)) || message || MANDATORY
const required = (message) => (val) => (!isEmpty(val)) || message || REQUIRED
const number = (message) => (val) => isNumber(val) || message || NUMBER
const date = (message) => (val) => isDate(val) || message || DATE
const boolean = (message) => (val) => isBoolean(val) || message || BOOLEAN
const regex = (pattern, message) => (val) => pattern.test(val) || message || `${REGEX} ${pattern}` // need to test this
const betweenNumbers = (from, to, message) => (val) => {
  if (!isNumber(val)) { return NUMBER }

  from = parseFloat(from)
  to = parseFloat(to)
  val = parseFloat(val)

  return (from <= val && val <= to) || message || `${BETEEN_NUMBER} ${from}, ${to}`
}
const greaterThan = (num, message) => (val) => {
  if (!isNumber(val)) { return NUMBER }
  num = parseFloat(num)
  return (num <= val) || message || `${GREATER_THAN} ${num}`
}
const lessThan = (num, message) => (val) => {
  if (!isNumber(val)) { return NUMBER }
  num = parseFloat(num)
  return (val <= num) || message || `${LESS_THAN} ${num}`
}
const minLength = (min, message) => (val) => (val && val.length >= min) || message || `${MIN_LENGTH} ${min}`
const maxLength = (max, message) => (val) => (val && val.length <= max) || message || `${MAX_LENGTH} ${max}`
const pastDate = (message) => (val) => isPast(val) || message || PAST_DATE
const futureDate = (message) => (val) => isFuture(val) || message || FUTURE_DATE
const betweenDates = (from, to, message) => (val) => {
  if (!isDate(val)) return DATE
  return isBetween(val, from, to) || message || BETWEEN_DATE
}
const contains = (values, message) => (val) => (val && values.includes(val)) || message || `${CONTAINS} ${values.join(',')}`
module.exports = {
  mandatory,
  required,
  number,
  date,
  boolean,
  regex,
  betweenNumbers,
  greaterThan,
  lessThan,
  minLength,
  maxLength,
  pastDate,
  futureDate,
  betweenDates,
  contains
}
