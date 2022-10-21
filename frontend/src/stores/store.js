import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const store = defineStore('store', {
	
	state:() =>{
		return {
			userChosen: "",
			theme: 'theme-bright',
			isLogin: false,
			friends: [],
			messages: [],
			rooms: [],
			userProfile: {},
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
