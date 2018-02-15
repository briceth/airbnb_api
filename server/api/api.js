const router = require('express').Router()

router.use('/users', require('./user/routes'))
router.use('/rooms', require('./room/routes'))

// router.route.get('*', (req, res) => {
// 	res.status(404).send("Cette page n'existe pas !")
// })

module.exports = router
