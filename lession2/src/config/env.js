
/*  
    we shouldn't use env variables like this, but for the development this works fine
    we need to pass env values from cmd or any other secure way
 */

const path = require('path')

process.env.NODE_ENV = 'local' // ['local', 'dev', 'test', 'production', 'staging']

process.env.LOGS_PATH = path.resolve(__dirname, '../../data_container/logs/')
process.env.ERROR_LOGS_PATH = path.resolve(__dirname, '../../data_container/logs/error/')
process.env.INFO_LOGS_PATH = path.resolve(__dirname, '../../data_container/logs/info/')

process.env.INFO_LOGS_TO_CONSOLE = 'NO' // 'YES

// app variables
process.env.HTTP_PORT = '8080'
process.env.HTTPS_PORT = '8443'

// database variables

// dev
/* process.env.DB_HOST="localhost"
process.env.DB_INSTANCE = "postgres"
process.env.DB_SCHEMA="task_manager"
process.env.DB_USER = "ravinder"
process.env.DB_PWD = ""
process.env.DB_DIALECT = "postgres"
*/
process.env.DB_DIALECT = 'sqlite'
process.env.DB_STORAGE_PATH = path.resolve(__dirname, '../../data_container/db/tasks.db')

// secure data
process.env.JWT_SECRET = '$E(ret'
process.env.JWT_EXPIRY_TIME = '24h'
