const router = require('express').Router();
const { tasksService } = require('../../services')
const inputValidation = require('./_helpers/inputValidation')
const {
  httpStatusCodes: { CREATED, OK },
  constantsAndMessages: { UPDATE_SUCCESSFULL, DELETE_SUCCESSFULL }
} = require('../../contants')
const { sequelize } = require('../../database')
const { Task } = require('../../models')

router.post('/', async (req, res, next) => {
  const transaction = await sequelize.transaction();

  try {
    const { body } = req
    let task = Task.build(body) // Task.build(body).get({ plain: true }) // to set default values
    task = task.get({ plain: true })
    inputValidation(task)
    task = await tasksService.addTask(task, transaction)
    await transaction.commit()
    res.status(CREATED).send({ status: true, data: task })
  }
  catch (error) {
    next(error)
    transaction.rollback()
  }
})
router.get('/', async (req, res, next) => {
  try {
    const tasks = await tasksService.getTasks()
    res.status(OK).send({ status: true, data: tasks })
  }
  catch (error) {
    next(error)
  }
})

router.get('/:_id', async (req, res, next) => {
  try {
    const { _id } = req.params
    const task = await tasksService.getTask(_id)
    res.status(OK).send({ status: true, data: task })
  }
  catch (error) {
    next(error)
  }
})

router.put('/:_id', async (req, res, next) => {
  const transaction = await sequelize.transaction();

  try {
    const { params: { _id }, body } = req
    const updatedTask = await tasksService.updateTask(_id, body, transaction)
    await transaction.commit()
    res.status(OK).send({ status: true, data: updatedTask, message: UPDATE_SUCCESSFULL })
  }
  catch (error) {
    next(error)
    transaction.rollback()
  }
})
router.delete('/:_id', async (req, res, next) => {
  const transaction = await sequelize.transaction();

  try {
    const { params: { _id } } = req
    const deleteCount = await tasksService.delteTask(_id, transaction)
    await transaction.commit()
    res.status(OK).send({ status: true, data: deleteCount, message: DELETE_SUCCESSFULL })
  }
  catch (error) {
    next(error)
    transaction.rollback()
  }
})

module.exports = router;
