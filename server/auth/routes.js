const express = require('express')
const router = express.Router()
const controller = require('./controller')
const asyncMiddleware = require('../middleware/asyncMiddleware')

router.post('/sign_up', asyncMiddleware(controller.signUp))
router.post('/sign_in', asyncMiddleware(controller.signIn))
router.get('/log_out', controller.logOut)
router.get(
	'/users/validate-email/:token/:email',
	asyncMiddleware(controller.validateUser)
)

module.exports = router
