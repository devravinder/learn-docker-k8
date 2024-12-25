const { errorMessages: { INVALID, REQUIRED, NUMBER, ONE_OF } } = require('../../../contants')
const { ValidationError } = require('../../../errors')
const { isEmpty, isNullOrUndefined, isNumber, isOneOf } = require('../../../utilities')
const { Task } = require('../../../models')

const validate = (task) => {
  if (isNullOrUndefined(task)) { throw new ValidationError({ task: INVALID, message: INVALID }) }

  const { title, priority, status } = task

  if (isEmpty(title)) throw new ValidationError({ title: REQUIRED })
  if (!isNumber(priority)) throw new ValidationError({ priority: NUMBER })
  if (isEmpty(status)) throw new ValidationError({ status: REQUIRED })
  if (!isOneOf(Task.taskStatusValues, status)) throw new ValidationError({ status: `${ONE_OF} ${Task.taskStatusValues.join(',')}` })
}
module.exports = validate
