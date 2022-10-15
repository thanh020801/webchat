import io from "socket.io-client"
const socketInstant =  io('127.0.0.1:5000')


function realtime(){
	return socketInstant
}

export default realtime