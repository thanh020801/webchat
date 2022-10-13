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
	room_avartar: {
		type: String,
	}
	
},{timestamps: true})

module.exports = mongoose.model("Room", room)
      // id: "learning",
      // room_admin: "thanh@gmail.com", 
      // room_member: ['123','234','345','456'], 
      // name: "Learning", 
      // idMessage: "1111",