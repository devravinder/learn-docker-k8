// we can use lodash
const isEmpty = value => (value === undefined || value === null || value === '' ||
                         (typeof value === 'object' && Object.keys(value).length === 0) ||
                         (typeof value === 'string' && value.trim().length === 0))

const isNullOrUndefined = value => value === undefined || value === null // isNullOrUndefined = isEmpty

const isNumber = value => !isNaN(parseFloat(value))
const isBoolean = value => (typeof value === 'boolean') || (value && (value === 'true' || value === 'false'))
const isArray = value => value && Array.isArray(value)
const isString = value => value && typeof value === 'string'
const isObject = value => value && typeof value === 'object'
const isOneOf = (values, value) => values.includes(value)

module.exports = {
  isEmpty, isNumber, isBoolean, isArray, isNullOrUndefined, isString, isObject, isOneOf
}
