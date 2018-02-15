const Room = require('./model')
const chalk = require('chalk')
const log = console.log

exports.get = async (req, res) => {
	const rooms = await Room.find({})
	res.json(rooms)
}

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
	//log('body', title, description, photos, price, city, lat, lon)

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
	if (newRoom) {
		log(chalk.green('room CREATED with Success!'))
		res.json(newRoom)
	}
}

exports.getOne = async (req, res) => {
	const { id } = req.params
	const room = await Room.findById(id).populate({
		path: '_user',
		select: 'firstname'
	})
	res.json(room)
}

exports.put = async (req, res) => {
	const { id } = req.params
	const { body } = req
	const room = await Room.findOneAndUpdate({ _id: id }, { body }, { new: true })

	log(chalk.green('room UPDATED with Success!'))
	res.json(room)
}

exports.delete = async (req, res) => {
	const { id } = req.params

	const removed = await Room.findOneAndRemove({ _id: id })
	log(chalk.green('user DELETED with Success!'))
	res.json(removed)
}
