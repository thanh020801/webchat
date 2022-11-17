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
	message_category:{
		type: String,			// 'text', 'img', file 'docx', file 'pdf'
	},
	message_remove:{
		type:String,
	},
	message_time_remove:{
		type:Number
	}

},{timestamps: true})

module.exports = mongoose.model("Message", message)

