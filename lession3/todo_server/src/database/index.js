const { connectToDb } = require('./connect')
const { sequelize, Model, Op } = require('./sequelize')

module.exports = { connectToDb, sequelize, Model, Op }
