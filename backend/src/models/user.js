const mongoose = require('mongoose')

const user = mongoose.Schema({
	username: {
		type: String,
		default: true,
		unique: true,
		require: true,
	},
	password:{
		type: String,
		require: true,
	},
	name: {
		type: String,
	},
	phone: {
		type: String,
	},
	birthday: {
		type: String,
	},	
	avatar:{
		type: String,
	},
	admin: {
		type: Boolean,
		default: false
	},
	friend_id: {
		type: String,
	},
	lock: {
		type: Boolean,
		default: false
	}

},{timestamps: true})

module.exports = mongoose.model("User", user)
