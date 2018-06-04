const tap = require("crocks/helpers/tap")





const log = level => message => console.log({
  uts: Date.now(),
  message,
  level
})


const message = process.argv[2]
log(message)