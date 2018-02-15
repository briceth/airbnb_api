const Room = require('./model')
const User = require('../user/model')
const chalk = require('chalk')
const log = console.log

// POST METHODS
// CREATE ONE ROOM
exports.post = async (req, res) => {
	const { userId } = req.params
	const {
		title,
		description,
		photos,
		price,
		city,
		loc: { lon, lat }
	} = req.body

	const room = new Room({
		title,
		description,
		photos,
		price,
		city,
		loc: [lon, lat],
		_user: userId
	})

	const newRoom = await room.save()

	const user = await User.findByIdAndUpdate(
		userId,
		{ _rooms: { $push: newRoom._id } },
		{ new: true }
	)
	log('user', user)

	if (newRoom) {
		log(chalk.green('room CREATED with Success!'))
		res.json(newRoom)
	}
}

// GET METHODS
//GET ALL ROOMS
exports.get = async (req, res) => {
	const { city, page } = req.query
	const limit = 5 || req.query.limit

	const rooms = await Room.find({ city })
		.skip(page > 0 ? (page - 1) * limit : 0)
		.limit(limit)

	const count = await Room.find({ city }).count()
	res.json({ rooms, count })
}
//GET ONE ROOM
exports.getOne = async (req, res) => {
	const { id } = req.params
	const room = await Room.findById(id).populate({
		path: '_user',
		select: 'firstname'
	})
	res.json(room)
}
//GET ONE ROOM BY TOWN
exports.getByLoc = async (req, res) => {
	const limit = req.query.limit || 10
	//get the max distance or set it to 2 kilometers
	const maxDistance = req.query.distance || 2

	const { lon, lat } = req.query

	const rooms = await Room.find({
		loc: {
			$near: [lon, lat],
			$maxDistance: maxDistance
		}
	}).limit(limit)

	console.log('room', rooms)
	res.json(rooms)
}

exports.getByPriceRange = async (req, res) => {
	const { max, min } = req.query

	const rooms = await Room.find({
		price: { $gte: min, $lte: max }
	})
	//get le nombre total correspondant
	const count = await Room.find({
		price: { $gte: min, $lte: max }
	}).count()

	res.json({ rooms, count })
}

// PUT METHODS
//UPDATE ONE ROOM
exports.put = async (req, res) => {
	const { id } = req.params
	const { body } = req
	const room = await Room.findOneAndUpdate({ _id: id }, { body }, { new: true })

	log(chalk.green('room UPDATED with Success!'))
	res.json(room)
}

// DELETE METHODS
//DELETE ONE ROOM
exports.delete = async (req, res) => {
	const { id } = req.params

	const removed = await Room.findOneAndRemove({ _id: id })
	log(chalk.green('user DELETED with Success!'))
	res.json(removed)
}
