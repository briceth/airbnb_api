const router = require('express').Router()
const controller = require('./controller')
const verifyToken = require('../../auth/auth').verifyToken
const asyncMiddleware = require('../../middleware/asyncMiddleware')

router.route('/').get(asyncMiddleware(controller.get))

router
	.route('/publish/:userId')
	.post(verifyToken, asyncMiddleware(controller.post))

router.route('/loc').get(asyncMiddleware(controller.getByLoc))
router.route('/price').get(asyncMiddleware(controller.getByPriceRange))
router.route('/rating').post(asyncMiddleware(controller.rating))

router
	.route('/:id')
	.get(asyncMiddleware(controller.getOne))
	.put(verifyToken, asyncMiddleware(controller.put))
	.delete(verifyToken, asyncMiddleware(controller.delete))

module.exports = router
