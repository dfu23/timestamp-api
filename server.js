var express = require('express')
var moment = require('moment')
var app = express()

/**
 * Handles all GET requests
 */
app.get('*', function (req, res) {
  var timestamp = {'unix':null,'natural':null}
  
  var path = req.path
  console.log('Request received' + path)
  
  var value = path.substring(1) // trim the leading slash
  var day = null
  
  // Parse the string if needed using moment
  if (Number.parseInt(value)) {
    day = moment.unix(Number.parseInt(value))
  } else {
    day = moment(decodeURIComponent(value))
  }

  // Send back good info if the date is valid
  if (day.isValid()) {
    timestamp.unix = Number.parseInt(day.format('X'))
    timestamp.natural = day.format('MMMM D, YYYY')
    res.send(timestamp)
  } else {
    res.send(timestamp)
  }
})

/**
 * Starts the application listening on the specified port 
 */
app.listen(8080, function () {
  var start = new Date();
  console.log('The Timestamp Microservice is now running on port 8080!')
  console.log('This service was started:')
  console.log('  Unix Timestamp - ' + start.getTime())
  console.log('  Natural Language Date - ' + start)
})
