const router = require('express').Router()
const controller = require('./controller')
const verifyToken = require('../../auth/auth').verifyToken
const asyncMiddleware = require('../../middleware/asyncMiddleware')

router
	.route('/user/:userId/room/:roomId')
	.post(verifyToken, asyncMiddleware(controller.post))

module.exports = router
