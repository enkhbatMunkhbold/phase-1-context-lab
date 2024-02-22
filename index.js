const createEmployeeRecord = data => {
  return {
    firstName: data[0],
    familyName: data[1],
    title: data[2],
    payPerHour: data[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

const createEmployeeRecords = records => records.map(record => createEmployeeRecord(record))
function createTimeInEvent(date) { 
  let [inDate, time] = date.split(' ')
  this.timeInEvents.push ({
    type: 'TimeIn',
    hour: +time,
    date: inDate   
  })
  return this
}

function createTimeOutEvent(date) {
  let [outDate, time] = date.split(' ')
  this.timeOutEvents.push({
    type: 'TimeOut',
    hour: +time,
    date: outDate
  })
  return this
}

function hoursWorkedOnDate(str) {
  let date = str.split(' ')[0]
  let inTime = this.timeInEvents.find(day => day.date === date)
  let outTime = this.timeOutEvents.find(day => day.date === date)
  return (outTime.hour - inTime.hour) / 100
}

function wagesEarnedOnDate(str) {
  return hoursWorkedOnDate.call(this, str) * this.payPerHour
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(data, name) {
  return data.find(record => record.firstName === name ? record : undefined)
}

function calculatePayroll(data) {
  return data.reduce((total, record) => total += allWagesFor.call(record), 0)
}