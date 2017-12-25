const url = require('url')
const { send, json } = require('micro')
const debug = require('debug')('list:server')

const { subscribe, optIn, optOut } = require('./app/services/user')
const db = require('./app/models/db')

const {
  NODE_ENV,
  DOMAIN = 'http://localhost:3000',
  HEADER_ORIGIN = DOMAIN,
  HEADER_METHODS = 'GET'
} = process.env

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', HEADER_ORIGIN)
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', HEADER_METHODS)
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Authorization, \
    Access-Control-Allow-Headers, \
    Access-Control-Allow-Methods, \
    Origin, \
    Content-Type, \
    Access-Control-Request-Method, \
    Access-Control-Request-Headers'
  )

  try {
    const parsed = url.parse(req.url, true)
    const { email, uuid, unsubscribe } = parsed.query

    if (email) {
      send(res, 200, await subscribe(email))
    } else if (uuid) {
      send(res, 200, await optIn(uuid))
    } else if (unsubscribe) {
      send(res, 200, await optOut(unsubscribe))
    } else {
      send(res, 403, 'You Shall Not Pass!')
    }
  } catch (err) {
    if (NODE_ENV !== 'production' && err.stack) {
      console.error(err.stack)
    }
    send(res, err.statusCode || 500, { error: true, message: err.message })
  }
}
