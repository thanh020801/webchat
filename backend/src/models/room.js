const mongoose = require('mongoose')

const room = mongoose.Schema({
	room_admin: {
		type: String,
	},
	room_member:{
		type: Array,
		default: [],
	},
	room_name: {
		type: String,
	},
	room_avatar: {
		type: String,
		default: "",
	},
	
},{timestamps: true})

module.exports = mongoose.model("Room", room)
