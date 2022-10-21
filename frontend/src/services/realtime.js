import io from "socket.io-client"
// import {store} from '@/stores/store.js'

const socketInstant =  io('127.0.0.1:5000')
// const socketInstantLogin =  io('127.0.0.1:5000')
// export var isLogin = false

export function realtime(){
	// console.log(isLogin)
	// const stores = store()
	// console.log(stores)
	// if(isLogin){
		return socketInstant
	// }
	
}

// export default {realtime,isLogin}