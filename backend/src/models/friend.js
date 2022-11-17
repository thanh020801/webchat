const mongoose = require('mongoose')

const friend = mongoose.Schema({
	friend_username:{
		type: String,
		require: true,
	},
	list_friend:{
		type: Array,
		require: true,
		default: [],
	},		
	list_room:{
		type: Array,
		require: true,
		default: [],
	},		
},{timestamps: true})
module.exports = mongoose.model("Friend", friend)
