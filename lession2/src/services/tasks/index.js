const { Op } = require('../../database/sequelize')
const { Task } = require('../../models')
const { ValidationError } = require('../../errors')
const createValidation = require('./_helpers/createValidation')
const updateValidation = require('./_helpers/updateValidation')

const { errorMessages: { INVALID } } = require('../../contants')

const addTask = (task, transaction) => {
  createValidation(task)

  // task.save()
  return Task.create(task, { transaction })
}

const getTask = async (_id) => {
  const task = await Task.findOne({ where: { _id } })
  if (!task) throw new ValidationError({ id: INVALID })

  return task
}

const getTasks = () => Task.findAll()

const searchTask = async (title) => {
  const tasks = await Task.findAll({ where: { title: { [Op.like]: `%${title}%` } } })
  return tasks
}

const delteTask = (_id, transaction) => {
  return Task.destroy({ where: { _id } }, { transaction })
}

const updateTask = async (_id, task, transaction) => {
  const old = await Task.findOne({ where: { _id }, attributes: ['_id'] })
  if (!old) throw new ValidationError({ id: INVALID })

  updateValidation(task)
  await Task.update(task, { where: { _id } }, { transaction })
  return ({ ...old.get({ plain: true }), ...task })
}

module.exports = {
  addTask,
  getTask,
  getTasks,
  searchTask,
  delteTask,
  updateTask
}
