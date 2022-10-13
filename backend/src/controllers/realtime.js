const Friend = require('./../models/friend.js')
const User = require('./../models/user.js')
const Room = require('./../models/room.js')
const Message = require('./../models/message.js')

const mongoose = require('mongoose')
const sha256 = require('sha256')

// logout,friend Online,
realtime = (io)=>{
    io.on('connection', (socket) => {
    	socket.on('hello', async (data)=>{
    		socket.emit('hello-status',"Hello Socket")
    	});

        socket.on('REGISTER', async (data)=>{
            const isUser = await User.findOne({username: data.user.username})
            if(isUser){
                socket.emit('REGISTER-STATUS',"Register failed")
                return
            }
            else{
                const hashPassword = await sha256(data.user.password)
                const newFriend = Friend({
                    friend_username: data.user.username,
                })
                const friend = await newFriend.save()
                const newUser = User({
                    username: data.user.username,
                    password: hashPassword,
                    name: data.user.name,
                    friend_id: friend._id,
                })
                const user = await newUser.save()
                console.log(user,friend)
                socket.emit('REGISTER-STATUS', {user,friend})
                return
            }
            return
        });
        socket.on('login', async (data)=>{
            
        });
    })

}
module.exports = realtime
