const mongoose = require('mongoose')

const message = mongoose.Schema({
	message_name_send:{
		type: String,
	},
	message_content:{
		type: String
	},
	message_date:{
		type: String
	},
	message_count:{
		type: Number,
	},
	id_message:{
		type: String,
	},

},{timestamps: true})

module.exports = mongoose.model("Message", message)
  //   { 
  //   id: "bbbbbbb",
  //   message_name_send: "234", 
  //   message_content: "okdsfsdfdfsgdsfgdsg", 
  //   message_date: "2/8/2222", 
  //   message_room: "learning", 
  //   message_count: "1",
  // },
