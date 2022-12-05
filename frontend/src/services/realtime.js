import io from "socket.io-client"

const socketInstant =  io('127.0.0.1:5000')
// const socketInstant =  io('https://b0b7-14-252-255-32.ap.ngrok.io/')
// const socketInstant =  io('http://127.0.0.1:4041')
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