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
	avarta:{
		type: String,
	},
	is_login:{
		type: Boolean,
		default: false,
	},
	is_online: {
		type: Boolean,
		default: false,
	},
	friend_id: {
		type: String,
	},

},{timestamps: true})

module.exports = mongoose.model("User", user)
// const userProfile_EX = {
//     id: "123",
//     username: "thanh@gmail.com",
//     name: 'Mega',
//     phone: "025468546556",
//     birthday: "02/08/2001",
//     avarta: "",
//     isLogin: false,
//     isOnline:true,
//     friendID: "321",
//     room: room_EX.length,
// }