import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const TestStore = defineStore('TestStore', () => {
	const friend_EX = { 
		id: "ppp",
		friend_username: "thanh@gmail.com", 
		friend_listfriendID: [
								{id:'123', name: 'Thanh', idMessage: '111'},
								{id:'234',name: "phuong" , idMessage: '222'},
								{id: '345', name: 'thang' , idMessage: '333'},
								{id:'456', name: 'An', idMessage: '444'},
								{id:'567',name: "tai", idMessage: '555'},
								{id: '678', name: 'bong', idMessage: '666'},
								{id:'789', name: 'hoa', idMessage: '777'},
								{id:'8910',name: "khang", idMessage: '888'},
								{id: '91011', name: 'anh', idMessage: "999"},
								{id:'101112', name: 'kim', idMessage: '101010'},
								{id:'111213',name: "nhu", idMessage: '111111'},
								{id: '121314', name: 'viet', idMessage: '121212'},
								{id: '131415', name: '.viet', idMessage: '131313'},
								{id: '141516', name: '*viet', idMessage: '141414'},
							], 
		friendidUser: "123",
		friend_invited: ['456'],
		friend_recieved: [], 
	}
	  const message_EX1 = {idMessage: '222', content:[
  { 
    id: "aaa",
    message_name_send: "123", 
    message_content: "Hello 123", 
    message_name_recieve: "234",
    message_date: "2/8/2222", 
    message_room: "123234", 
    message_count: "1",
  },
    { 
    id: "aaaa",
    message_name_send: "234", 
    message_content: "Hi ", 
    message_name_recieve: "123",
    message_date: "2/8/2222", 
    message_room: "123234", 
    message_count: "1",
  },
    { 
    id: "aaaaa",
    message_name_send: "123", 
    message_content: "How are you", 
    message_name_recieve: "234",
    message_date: "2/8/2222", 
    message_room: "123234", 
    message_count: "1",
  },
    { 
    id: "aaaaaa",
    message_name_send: "234", 
    message_content: "Fine thank", 
    message_name_recieve: "123",
    message_date: "2/8/2222", 
    message_room: "123234", 
    message_count: "1",
  },
    { 
    id: "aaaaaaa",
    message_name_send: "123", 
    message_content: "ok", 
    message_name_recieve: "234",
    message_date: "2/8/2222", 
    message_room: "123234", 
    message_count: "1",
  },

    ]}

  const message_EX2 = {idMessage: '11112',content: [
  { 
    id: "bbb",
    message_name_send: "123", 
    message_content: "Hello everyone", 
    message_name_recieve: "learning",
    message_date: "2/8/2222", 
    message_room: "learning", 
    message_count: "1",
  },
    { 
    id: "bbbb",
    message_name_send: "234", 
    message_content: "Hi ", 
    message_name_recieve: "learning",
    message_date: "2/8/2222", 
    message_room: "learning", 
    message_count: "2",
  },
    { 
    id: "bbbbb",
    message_name_send: "345", 
    message_content: "How are you", 
    message_name_recieve: "learning",
    message_date: "2/8/2222", 
    message_room: "learning", 
    message_count: "3",
  },
    { 
    id: "bbbbbb",
    message_name_send: "456", 
    message_content: "Fine thank", 
    message_name_recieve: "learning",
    message_date: "2/8/2222", 
    message_room: "learning", 
    message_count: "4",
  },
    { 
    id: "bbbbbbb",
    message_name_send: "234", 
    message_content: "okdsfsdfdfsgdsfgdsg", 
    message_name_recieve: "learning",
    message_date: "2/8/2222", 
    message_room: "learning", 
    message_count: "1",
  },


  ]}

  const message_EX = [message_EX1, message_EX2]

  const room_EX = [
    { 
      id: "learning",
      room_admin: "thanh@gmail.com", 
      room_member: ['123','234','345','456'], 
      room_name: "Learning", 
      idMessage: "1111",
    },
        { 
      id: "chatNodejs",
      room_admin: "tuan@gmail.com", 
      room_member: ['123','234','345','456'], 
      room_name: "chatNodejs",
      idMessage: "2222", 
    },
        { 
      id: "news",
      room_admin: "an@gmail.com", 
      room_member: ['123','234','456','789'], 
      room_name: "News", 
      idMessage: "3333",
    },
        { 
      id: "python",
      room_admin: "chi@gmail.com", 
      room_member: ['123','345','789','456'], 
      room_name: "Python", 
      idMessage: "4444",
    },
        { 
      id: "techology",
      room_admin: "leo@gmail.com", 
      room_member: ['123','234','345','456'], 
      room_name: "techology", 
      idMessage: "5555",
    },
        { 
      id: "vuejs",
      room_admin: "eric@gmail.com", 
      room_member: ['123','234','345','456'], 
      room_name: "Vuejs", 
      idMessage: "6666",
    },
        { 
      id: "datamining",
      room_admin: "thuc@gmail.com", 
      room_member: ['123','234','345','456','567','678','789'], 
      room_name: "Data mining",
      idMessage: "7777", 
    },

  ]
  const userProfile_EX = {
    id: "123",
    userName: "thanh@gmail.com",
    name: 'Mega',
    phone: "025468546556",
    birthday: "02/08/2001",
    avarta: "",
    isOnline: true,
    friendID: "321",
    roomID: ['learning','chatNodejs','Pan'],
  }

  return { message_EX, friend_EX, room_EX,userProfile_EX }
})