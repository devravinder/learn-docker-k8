const { isArray, isString, isEmpty } = require('./basicValidations')

const finalResult = (errors) => ({ isValid: isEmpty(errors), errors })
const validateData = (data, validationSchema, options = { eager: true }) => {
  const { eager } = options
  const errors = {}

  const validateRule = (key, value, rule) => {
    const message = rule(value)
    if (isString(message)) {
      if (!errors[key]) { errors[key] = [] }
      errors[key].push(message)
      if (eager) throw new Error()
    }
  }

  try {
    for (const key of Object.keys(validationSchema)) {
      const rules = validationSchema[key]
      if (isArray(rules)) {
        for (const rule of rules) {
          validateRule(key, data[key], rule)
        }
      }
      else {
        validateRule(key, data[key], rules)
      }
    }
    return finalResult(errors)
  }
  catch (_err) {
    return finalResult(errors)
  }
}

/*
// uasge eg:-
const data = { name: 'Ram', age: 21 }
const schema = { name: [minLength(4), maxLength(2)], age: greaterThan(27) }
const errors = validateData(data, schema, { eager: false })
console.log(' errors ', errors)
 */

module.exports = { validateData }
