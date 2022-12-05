import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const store = defineStore('store', {
	
	state:() =>{
		return {
			timeStandard: 'Sun Oct 23 2022 16:00:00 GMT+0700 (Giờ Đông Dương)',
			userChosen: "",
			theme: 'theme-bright',
			isLogin: false,
			friends: [],
			messages: {
				id_message: "",
				contents: [],
				searchMS: []
			},
			rooms: [],
			userProfile: {},
			admin: {
				chosen: "Trang chủ",
			},
			// routerUrl: '/' 
		}
	},
	actions:{
		autoLogin(){
			var account = window.localStorage.getItem("account");
			account =  JSON.parse(account)
			// console.log('account ',account)
			return account
		},
		removeAccount(){
			localStorage.clear();
			var account = window.localStorage.getItem("account");
			account =  JSON.parse(account)
			console.log('account ',account)
			this.isLogin = false
			
			// console.log('account ',account)
			// return account
		}
	}
})
