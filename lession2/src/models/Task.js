
const { sequelize, DataTypes, Model } = require('../database/sequelize');
const { TASK_STATUS } = require('../contants')
const {dateUtility} = require('../utilities')

const taskStatusValues = Object.values(TASK_STATUS)

class Task extends Model {}

Task.init(

  {
    _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING
    },
    sub_title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    priority: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    start_date: {
      type: DataTypes.DATE,
      defaultValue: dateUtility.now()
    },
    end_date: {
      type: DataTypes.DATE,
      defaultValue: dateUtility.endOfTheDate()
    },
    status: {
      // type: DataTypes.ENUM
      type: DataTypes.STRING,
      defaultValue: TASK_STATUS.CREATED,
      isIn: {
        args: [taskStatusValues],
        msg: `Must be one of the values: ${taskStatusValues.join(',')}`
      }
    },
    task_img_url: {
      type: DataTypes.STRING
    },
    task_geo_loc: {
      type: DataTypes.STRING
    },
    owner_: {
      type: DataTypes.STRING
    }

  },
  {
    sequelize, // connect db
    modelName: 'task',
    timestamps: false
  }
);
Task.taskStatusValues = taskStatusValues
Task.TASK_STATUS = TASK_STATUS

module.exports = Task;
