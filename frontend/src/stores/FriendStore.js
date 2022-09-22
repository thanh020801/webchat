import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const FriendStore = defineStore('FriendStore', () => {
  const friend = { 
      _id: "",
      friend_username: "", 
      friend_listfriendID: [], 
      friend_idUser: "",
      friend_invited: [],
      friend_recieved: [], 
  }
  // const rooms = []

  const friend_EX = { 
      _id: "ppp",
      friend_username: "thanh@gmail.com", 
      friend_listfriendID: ['123','234','678'], 
      friend_idUser: "123",
      friend_invited: ['456'],
      friend_recieved: [], 
  }
  return { friend, friend_EX }
})
