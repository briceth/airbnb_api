const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
	note: {
		type: Number,
		required: [true, 'une note est requise']
	},

	content: {
		type: String,
		required: [true, 'un contenu est requis']
	},

	_room: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Room'
	},

	_user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
})

module.exports = mongoose.model('Review', reviewSchema)
