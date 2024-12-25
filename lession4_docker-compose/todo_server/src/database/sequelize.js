const { Sequelize, DataTypes, Model, Op } = require('sequelize');

// https://sequelize.org/master/manual/model-basics.html

/*
const sequelize = new Sequelize(process.env.DB_INSTANCE, process.env.DB_USER, process.env.DB_PWD,
  {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    schema:process.env.DB_SCHEMA,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000, // 600000
        idle: 10000
      },
    dialectOptions: {
      options: { requestTimeout: 300000 }
    },
     // logging:  false,
      define: {
        //prevent sequelize from pluralizing table names
        freezeTableName: true
      }
  })
 */
const sequelize = new Sequelize(`${process.env.DB_DIALECT}:${process.env.DB_STORAGE_PATH}`,
  {
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      options: { requestTimeout: 300000 }
    },
    logging: false,
    define: {
      freezeTableName: true
    }
  })
module.exports = { sequelize, DataTypes, Model, Op };
