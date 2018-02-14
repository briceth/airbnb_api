const mailgun = require('mailgun-js')
const config = require('../../config/config')
const api_key = config.mailgun.api_key
const DOMAIN = config.mailgun.domain
const mailgun = require('mailgun-js')({ apiKey: api_key, domain: DOMAIN })

const data = {
	from: 'Excited User <me@samples.mailgun.org>',
	to: 'bar@example.com, YOU@YOUR_DOMAIN_NAME',
	subject: 'Hello',
	text: 'Testing some Mailgun awesomness!'
}

mailgun.messages().send(data, function(error, body) {
	console.log(body)
})
