const cors = require('cors');
const express = require('express');
const { requestAndResponseInfoLogger } = require('./logger')
const { constantsAndMessages: { API_PREFIX } } = require('../contants')
const routes = require('../routes')
const { clientErrorHandler, serverErrorHandler } = require('./errorHandler')

const initializeMiddlewares = app => {
  app.use(API_PREFIX, [
    cors(),
    express.json({ extened: false }),
    requestAndResponseInfoLogger,
    routes,
    clientErrorHandler,
    serverErrorHandler

  ])
}
module.exports = initializeMiddlewares
