import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const TestStore = defineStore('TestStore', () => {
	const friend_EX = { 
		id: "ppp",
		friend_username: "thanh@gmail.com", 
		friend_listfriendID: [
								// {id:'123', name: 'Thanh', idMessage: '111'},
								{id:'234',username: 'phuong@gmail.com',name: "phuong" , idMessage: '222'},
								{id: '345',username: 'thang@gmail.com',name: 'thang' , idMessage: '333'},
								{id:'456',username: 'An@gmail.com',name: 'An', idMessage: '444'},
								{id:'567',username: 'tai@gmail.com',name: "tai", idMessage: '555'},
								{id: '678',username: 'bong@gmail.com',name: 'bong', idMessage: '666'},
								{id:'789',username: 'hoa@gmail.com',name: 'hoa', idMessage: '777'},
								{id:'8910',username: 'khang@gmail.com',name: "khang", idMessage: '888'},
								{id: '91011',username: 'anh@gmail.com',name: 'anh', idMessage: "999"},
								{id:'101112',username: 'kim@gmail.com',name: 'kim', idMessage: '101010'},
								{id:'111213',username: 'nhu@gmail.com',name: "nhu", idMessage: '111111'},
								{id: '121314',username: 'viet@gmail.com',name: 'viet', idMessage: '121212'},
								{id: '131415',username: '.viet@gmail.com',name: '.viet', idMessage: '131313'},
								{id: '141516',username: '*viet@gmail.com',name: '*viet', idMessage: '141414'},
							], 
		friendidUser: "123",
		friend_invited: ['456'],
		friend_recieved: [], 
	}
	  const message_EX1 = {idMessage: '222', contents:[
  { 
    id: "aaa",
    message_name_send: "123", 
    message_content: "Hello 123", 
    message_date: "1/8/2222", 
    message_room: "123234", 
    message_count: 1,
  },
    { 
    id: "aaaa",
    message_name_send: "234", 
    message_content: "Hi ", 
    message_date: "2/8/2222", 
    message_room: "123234", 
    message_count: 2,
  },
    { 
    id: "aaaaa",
    message_name_send: "123", 
    message_content: "How are you", 
    message_date: "3/8/2222", 
    message_room: "123234", 
    message_count: 3,
  },
    { 
    id: "aaaaaa",
    message_name_send: "234", 
    message_content: "Fine thank", 
    message_date: "4/8/2222", 
    message_room: "123234", 
    message_count: 4,
  },
    { 
    id: "aaaaaaa",
    message_name_send: "123", 
    message_content: "ok", 
    message_date: "5/8/2222", 
    message_room: "123234", 
    message_count: 5,
  },

    ]}

  const message_EX2 = {idMessage: '1111',contents: [
  { 
    id: "bbb",
    message_name_send: "123", 
    message_content: "Hello everyone", 
    message_date: "2/8/2222", 
    message_room: "learning", 
    message_count: "1",
  },
    { 
    id: "bbbb",
    message_name_send: "234", 
    message_content: "Hi ", 
    message_date: "2/8/2222", 
    message_room: "learning", 
    message_count: "2",
  },
    { 
    id: "bbbbb",
    message_name_send: "345", 
    message_content: "How are you", 
    message_date: "2/8/2222", 
    message_room: "learning", 
    message_count: "3",
  },
    { 
    id: "bbbbbb",
    message_name_send: "456", 
    message_content: "Fine thank", 
    message_date: "2/8/2222", 
    message_room: "learning", 
    message_count: "4",
  },
    { 
    id: "bbbbbbb",
    message_name_send: "234", 
    message_content: "okdsfsdfdfsgdsfgdsg", 
    message_date: "2/8/2222", 
    message_room: "learning", 
    message_count: "1",
  },


  ]}

  // const message_EX = [message_EX1]
  const message_EX = [
    message_EX1,
    message_EX2,
    {idMessage: '333', contents: []},
    {idMessage: '444', contents: []},
    {idMessage: '555', contents: []},
    {idMessage: '666', contents: []},
    {idMessage: '777', contents: []},
    {idMessage: '888', contents: []},
    {idMessage: '999', contents: []},
    {idMessage: '101010', contents: []},
    {idMessage: '111111', contents: []},
    {idMessage: '121212', contents: []},
    {idMessage: '131313', contents: []},
    {idMessage: '141414', contents: []},
    // {idMessage: '1111', contents: []},
    {idMessage: '2222', contents: []},
    {idMessage: '3333', contents: []},
    {idMessage: '4444', contents: []},
    {idMessage: '5555', contents: []},
    {idMessage: '6666', contents: []},
    {idMessage: '7777', contents: []},
  ]
  const room_EX = [
    { 
      id: "learning",
      room_admin: "thanh@gmail.com", 
      room_member: ['123','234','345','456'], 
      name: "Learning", 
      idMessage: "1111",
    },
        { 
      id: "chatNodejs",
      room_admin: "tuan@gmail.com", 
      room_member: ['123','234','345','456'], 
      name: "chatNodejs",
      idMessage: "2222", 
    },
        { 
      id: "news",
      room_admin: "an@gmail.com", 
      room_member: ['123','234','456','789'], 
      name: "News", 
      idMessage: "3333",
    },
        { 
      id: "python",
      room_admin: "chi@gmail.com", 
      room_member: ['123','345','789','456'], 
      name: "Python", 
      idMessage: "4444",
    },
        { 
      id: "techology",
      room_admin: "leo@gmail.com", 
      room_member: ['123','234','345','456'], 
      name: "techology", 
      idMessage: "5555",
    },
        { 
      id: "vuejs",
      room_admin: "eric@gmail.com", 
      room_member: ['123','234','345','456'], 
      name: "Vuejs", 
      idMessage: "6666",
    },
        { 
      id: "datamining",
      room_admin: "thuc@gmail.com", 
      room_member: ['123','234','345','456','567','678','789'], 
      name: "Data mining",
      idMessage: "7777", 
    },

  ]


  const room_EX_Search = [
    { 
      id: "mouse",
      room_admin: "thanh@gmail.com", 
      room_member: ['123','234','345','456'], 
      name: "Mouse", 
      idMessage: "8888",
    },
    { 
      id: "laptop",
      room_admin: "tuan@gmail.com", 
      room_member: ['123','234','345','456'], 
      name: "Laptop",
      idMessage: "9999", 
    },
  ]


const userProfile_EX = {
    id: "123",
    username: "thanh@gmail.com",
    name: 'Mega',
    phone: "025468546556",
    birthday: "02/08/2001",
    avarta: "",
    isLogin: false,
    isOnline:true,
    friendID: "321",
    room: room_EX.length,
}


const user_EX1 = {
    id: "kkk",
    username: "khoa@gmail.com",
    name: 'Khoa',
    phone: "0213957669",
    birthday: "12/08/2001",
    avarta: "",
    isOnline: true,
}
const user_EX2 = {
    id: "lll",
    username: "gach@gmail.com",
    name: 'Gach',
    phone: "0978456132",
    birthday: "30/04/2015",
    avarta: "",
    isOnline: true,
}
const user_EX3 = {
    id: "mmm",
    username: "minh@gmail.com",
    name: 'minh',
    phone: "0213957669",
    birthday: "12/08/2001",
    avarta: "",
    isOnline: true,
}
const user_EX4 = {
    id: "nnn",
    username: "nam@gmail.com",
    name: 'Nam',
    phone: "0213957669",
    birthday: "12/08/2001",
    avarta: "",
    isOnline: true,
}
const user_EX = [user_EX1, user_EX2, user_EX3, user_EX4]
  return { message_EX, friend_EX, room_EX,userProfile_EX,room_EX_Search ,user_EX}
})
