const router = require('express').Router();
const { errorMessages: { PAGE_NOT_FOUND }, constantsAndMessages: { WELCOME_MESSAGE }, httpStatusCodes: { OK } } = require('../contants')
const { NotFoundError } = require('../errors')
/*
// sending html content
const fs=require("fs")
router.get("/", (req, res) => {
  let homePage = fs.readFileSync("./src/templets/index.html");
  res.statusCode = 200;
  res.setHeader("Content-type", "text/html");
  res.write(homePage);
  res.end();
});
*/

router.use(['/tasks', '/todos', '/task', '/todo'], require('./tasks'));

router.get('/', (req, res) => res.status(OK).send({ status: true, message: WELCOME_MESSAGE }))
router.all('*', (req, res) => { throw new NotFoundError(PAGE_NOT_FOUND) })

module.exports = router;
