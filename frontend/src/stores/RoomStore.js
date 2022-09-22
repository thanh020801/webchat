import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const RoomStore = defineStore('RoomStrore', () => {
  const room = { 
      _id: "",
      room_admin: "", 
      room_member: [], 
      room_name: "", 
  }
  const rooms = []

  const room_EX = [
    { 
      _id: "learning",
      room_admin: "thanh@gmail.com", 
      room_member: ['123','234','345','456'], 
      room_name: "Learning", 
    },
        { 
      _id: "chatNodejs",
      room_admin: "tuan@gmail.com", 
      room_member: ['123','234','345','456'], 
      room_name: "chatNodejs", 
    },
        { 
      _id: "news",
      room_admin: "an@gmail.com", 
      room_member: ['123','234','456','789'], 
      room_name: "News", 
    },
        { 
      _id: "python",
      room_admin: "chi@gmail.com", 
      room_member: ['123','345','789','456'], 
      room_name: "Python", 
    },
        { 
      _id: "techology",
      room_admin: "leo@gmail.com", 
      room_member: ['123','234','345','456'], 
      room_name: "techology", 
    },
        { 
      _id: "vuejs",
      room_admin: "eric@gmail.com", 
      room_member: ['123','234','345','456'], 
      room_name: "Vuejs", 
    },
        { 
      _id: "datamining",
      room_admin: "thuc@gmail.com", 
      room_member: ['123','234','345','456','567','678','789'], 
      room_name: "Data mining", 
    },

  ]
  return { room, rooms, room_EX }
})
