const debug = require('debug')('list:services')
const nodemailer = require('nodemailer')
const postmarkTransport = require('nodemailer-postmark-transport')

const { confirm } = require('../emails')
const User = require('../models/user')

const {
  NODE_ENV,
  DOMAIN = 'http://localhost:3000',
  POSTMARK_FROM,
  POSTMARK_KEY,
  ETHEREAL_USER,
  ETHEREAL_PASS
} = process.env

/**
 * @link https://ethereal.email/
 */
const ethereal = {
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user:  ETHEREAL_USER,
    pass: ETHEREAL_PASS
  }
}

const postmark = postmarkTransport({
  auth: {
    apiKey: POSTMARK_KEY
  }
})


const transporter = nodemailer.createTransport(
  NODE_ENV !== 'production' ? ethereal : postmark
)

const mail = async user => {
  let authURL = `${DOMAIN}?uuid=${user._id}`
  let mailOptions = {
    from: POSTMARK_FROM,
    to: user.email,
    subject: 'Confirm your email',
    html: await confirm(DOMAIN, authURL)
  }

  return await transporter.sendMail(mailOptions)
    .then(info => {
      debug('Message sent: ', info.messageId)
      // Preview only available when sending through an Ethereal account
      debug('Preview URL: ', nodemailer.getTestMessageUrl(info))
      return { sent: true }
    })
    .catch(err => {
      console.error(err)
      return { sent: false }
    })
}

const sendEmail = async email => {
  let newUser = new User({ email: email })
  const user = await newUser.save()

  return await mail(user)
}

module.exports.subscribe = async email => {
  let user = await User.findOne({ email: email })
  if (user === null) {
    return await sendEmail(email)
  } else {
     return user.authenticated
      ? { authenticated: true }
      : await mail(user)
  }
}

module.exports.optIn = async uuid => {
  const { authenticated } = await User.findOneAndUpdate({ _id: uuid }, { $set: { authenticated: true } }, { new: true })
  return { authenticated }
}

module.exports.optOut = async uuid => {
  const { email } = await User.findByIdAndRemove(uuid)
  return { unsubscribed: email }
}
