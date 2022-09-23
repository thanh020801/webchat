import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const userConfig = defineStore('userConfig', () => {
  const userTheme = 'theme-bright' // if theme is true then using bright theme
  const userChosen = 'sdf'
  const userProfile = {
    _id: "",
    userName: "",
    phone: "",
    birthday: "",
    avarta: "",
    isOnline: true,
    friendID: "",
    roomID: [],
  }
  const userProfile_EX = {
    _id: "123",
    userName: "thanh@gmail.com",
    name: 'Mega',
    phone: "025468546556",
    birthday: "02/08/2001",
    avarta: "",
    isOnline: true,
    friendID: "321",
    roomID: ['learning','chatNodejs','Pan'],
  }
  return { userTheme, userProfile,userProfile_EX}
})