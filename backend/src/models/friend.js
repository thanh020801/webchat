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
	// const friend_EX = { 
	// 	id: "ppp",
	// 	friend_username: "thanh@gmail.com", 
	// 	friend_listfriendID: [
	// 							// {id:'123', name: 'Thanh', idMessage: '111'},
	// 							{id:'234',username: 'phuong@gmail.com',name: "phuong" , idMessage: '222'},
	// 							{id: '345',username: 'thang@gmail.com',name: 'thang' , idMessage: '333'},
	// 							{id:'456',username: 'An@gmail.com',name: 'An', idMessage: '444'},
	// 							{id:'567',username: 'tai@gmail.com',name: "tai", idMessage: '555'},
	// 							{id: '678',username: 'bong@gmail.com',name: 'bong', idMessage: '666'},
	// 							{id:'789',username: 'hoa@gmail.com',name: 'hoa', idMessage: '777'},
	// 							{id:'8910',username: 'khang@gmail.com',name: "khang", idMessage: '888'},
	// 							{id: '91011',username: 'anh@gmail.com',name: 'anh', idMessage: "999"},
	// 							{id:'101112',username: 'kim@gmail.com',name: 'kim', idMessage: '101010'},
	// 							{id:'111213',username: 'nhu@gmail.com',name: "nhu", idMessage: '111111'},
	// 							{id: '121314',username: 'viet@gmail.com',name: 'viet', idMessage: '121212'},
	// 							{id: '131415',username: '.viet@gmail.com',name: '.viet', idMessage: '131313'},
	// 							{id: '141516',username: '*viet@gmail.com',name: '*viet', idMessage: '141414'},
	// 						], 
	// 	friendidUser: "123",
	// 	friend_invited: ['456'],
	// 	friend_recieved: [], 
	// }