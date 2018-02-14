const router = require('express').Router()
const controller = require('./controller')
const verifyToken = require('../../auth/auth').verifyToken
const asyncMiddleware = require('../../middleware/asyncMiddleware')

router
	.route('/')
	.get(verifyToken, asyncMiddleware(controller.get))
	.post(verifyToken, asyncMiddleware(controller.post))

router
	.route('/:id')
	.get(verifyToken, asyncMiddleware(controller.getOne))
	.put(verifyToken, asyncMiddleware(controller.put))
	.delete(verifyToken, asyncMiddleware(controller.delete))

module.exports = router
