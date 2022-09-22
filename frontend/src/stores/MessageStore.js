import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const MessageStore = defineStore('MessageStore', () => {
  const message = { 
    _id: "",
    message_name_send: "", 
    message_content: "", 
    message_name_recieve: "",
    message_date: "", 
    message_room: "", 
    message_count: "",
  }
  const messagesSeries = []
  const message_EX1 = [
  { 
    _id: "aaa",
    message_name_send: "123", 
    message_content: "Hello 123", 
    message_name_recieve: "234",
    message_date: "2/8/2222", 
    message_room: "123234", 
    message_count: "1",
  },
    { 
    _id: "aaaa",
    message_name_send: "234", 
    message_content: "Hi ", 
    message_name_recieve: "123",
    message_date: "2/8/2222", 
    message_room: "123234", 
    message_count: "1",
  },
    { 
    _id: "aaaaa",
    message_name_send: "123", 
    message_content: "How are you", 
    message_name_recieve: "234",
    message_date: "2/8/2222", 
    message_room: "123234", 
    message_count: "1",
  },
    { 
    _id: "aaaaaa",
    message_name_send: "234", 
    message_content: "Fine thank", 
    message_name_recieve: "123",
    message_date: "2/8/2222", 
    message_room: "123234", 
    message_count: "1",
  },
    { 
    _id: "aaaaaaa",
    message_name_send: "123", 
    message_content: "ok", 
    message_name_recieve: "234",
    message_date: "2/8/2222", 
    message_room: "123234", 
    message_count: "1",
  },
  ]

  const message_EX2 = [
  { 
    _id: "bbb",
    message_name_send: "123", 
    message_content: "Hello everyone", 
    message_name_recieve: "learning",
    message_date: "2/8/2222", 
    message_room: "learning", 
    message_count: "1",
  },
    { 
    _id: "bbbb",
    message_name_send: "234", 
    message_content: "Hi ", 
    message_name_recieve: "learning",
    message_date: "2/8/2222", 
    message_room: "learning", 
    message_count: "2",
  },
    { 
    _id: "bbbbb",
    message_name_send: "345", 
    message_content: "How are you", 
    message_name_recieve: "learning",
    message_date: "2/8/2222", 
    message_room: "learning", 
    message_count: "3",
  },
    { 
    _id: "bbbbbb",
    message_name_send: "456", 
    message_content: "Fine thank", 
    message_name_recieve: "learning",
    message_date: "2/8/2222", 
    message_room: "learning", 
    message_count: "4",
  },
    { 
    _id: "bbbbbbb",
    message_name_send: "234", 
    message_content: "ok", 
    message_name_recieve: "learning",
    message_date: "2/8/2222", 
    message_room: "learning", 
    message_count: "1",
  },
  ]
  const message_EX = [message_EX1, message_EX2]
  return { message, messagesSeries, message_EX }
})
