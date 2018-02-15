const Review = require('./model')
const User = require('../user/model')
const Room = require('../room/model')
const chalk = require('chalk')
const log = console.log
const mongoose = require('mongoose')

exports.post = async (req, res) => {
	const { userId, roomId } = req.params
	const { note, content } = req.body

	const review = new Review({
		note,
		content,
		_user: userId,
		_room: roomId
	})

	const newReview = await review.save()

	log(newReview)

	log(typeof req.params.userId)

	// const user = await User.findOneAndUpdate(
	// 	{ _id: userId },
	// 	{ _reviews: { $push: mongoose.Types.ObjectId(newReview._id) } },
	// 	{ new: true }
	// )

	const room = await Room.findOneAndUpdate(
		{ _id: roomId },
		{ _reviews: { $push: mongoose.Types.ObjectId(newReview._id) } },
		{ new: true }
	)

	if (newReview) {
		log(chalk.green('review CREATED with Success!'))
		//res.json({ newReview, room: room._id, user: user._id })
	}
}
