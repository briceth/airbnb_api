const Promise = require('bluebird')
const config = require('../../config/config')
const apiKey = config.mailgun.api_key
const domain = config.mailgun.domain
const mailgun = require('mailgun-js')({ apiKey: apiKey, domain: domain })
const mailgunP = Promise.promisifyAll(mailgun)
const ejs = require('ejs')
//const fs = Promise.promisifyAll(require('fs'))
//const mailgun = require('mailgun-js')({ apiKey, domain })
//const template = require('./template').template
//var content
// First I want to read the file

function generateHTMLtemplate(token, email) {
	ejs.renderFile(
		__dirname + '/template.ejs',
		{ token: '1234567890', email: email },
		function(err, str) {
			if (err) console.error(err)
			console.log('str', str)
			return str
		}
	)
}

module.exports = (token, email) => {
	const data = {
		from:
			'Airbnb <postmaster@sandbox50cb3f3f71d04c61899bef6766e06375.mailgun.org>',
		to: `<${email}>`,
		subject: 'Validation du compte',
		html: generateHTMLtemplate(email)
	}
	mailgunP
		.messages()
		.send(data)
		.then(body => {
			console.log('body', body)
		})
		.catch(error => {
			console.error(error)
		})
}
