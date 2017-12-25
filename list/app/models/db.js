const mongoose = require('mongoose')
const debug = require('debug')('list:db')

const {
  MONGODB //= 'mongodb://localhost/list'
} = process.env

mongoose.Promise = global.Promise
mongoose.connect(MONGODB, {
  useMongoClient: true
})

mongoose.connection
  .on('connected', () => debug(`Mongoose default connection is open to ${MONGODB}`))
  .on('error', err => console.error(`Mongoose default connection has occured ${err} error`))
  .on('disconnected', () => debug(`Mongoose default connection is disconnected`))

function cleanup () {
  mongoose.connection.close(() => {
    console.log(`Closing DB connections and stopping the server. Bye bye.`)
    process.exit(0)
  })
}

process.on('SIGINT', cleanup)
process.on('SIGTERM', cleanup)
process.on('SIGHUP', cleanup)

module.exports = mongoose
