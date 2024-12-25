const moment = require('moment')

const isDate = value => value && moment(value).isValid()
const toFormat = (date, format = 'YYYY-MM-DD hh:mm:ss') => moment(date).format(format)
const fromFormat = (date, format = ['YYYY-MM-DD hh:mm:ss', 'YYYY-MM-DD']) => moment(date, format)
const now = () => toFormat(new Date())
const onlyDatePart = (date = new Date(), format = 'YYYY-MM-DD') => toFormat(date, format)
const isBefore = (date, compareDate) => moment(date).isBefore(compareDate)
const isAfter = (date, compareDate) => moment(date).isAfter(compareDate)
const isBetween = (date, fromDate, toDate) => moment(date).isBetween(fromDate, toDate)
const isPast = date => isBefore(date, new Date())
const isFuture = date => isAfter(date, new Date())
const startOfTheDate = (date = new Date()) => toFormat(moment(date).startOf('date'))
const endOfTheDate = (date = new Date()) => toFormat(moment(date).endOf('date'))

module.exports = {
  fromFormat,
  toFormat,
  now,
  onlyDatePart,
  isDate,
  isBefore,
  isAfter,
  isBetween,
  isPast,
  isFuture,
  startOfTheDate,
  endOfTheDate
}
