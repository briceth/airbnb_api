const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roomSchema = new Schema({
	title: {
		type: String,
		required: [true, 'Doit contenir un titre']
	},

	description: {
		type: String,
		required: [true, 'Doit contenir une description']
	},

	photos: [String],

	price: { type: Number, required: [true, 'doit contenir un prix'] },

	ratingValue: { type: Number, default: null },

	reviews: { type: Number, default: 0 },

	city: {
		type: String,
		required: [true, 'Doit contenir une ville']
	},

	loc: {
		type: [Number], // Longitude et latitude
		index: '2d' // Créer un index geospatial https://docs.mongodb.com/manual/core/2d/
	},

	_user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
})

module.exports = mongoose.model('Room', roomSchema)
