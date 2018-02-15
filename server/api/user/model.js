const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
	firstname: {
		type: String,
		required: [true, 'un firstname est requis']
	},

	lastname: {
		type: String,
		required: [true, 'un lastname est requis']
	},

	password: {
		type: String,
		required: [true, 'un password est requis']
	},

	email: {
		type: String,
		unique: true,
		required: [true, 'un email est requis']
	},

	validated: { type: Boolean, default: false },

	_rooms: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Room'
		}
	],

	_reviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Review'
		}
	]
})

module.exports = mongoose.model('User', userSchema)
