const Friend = require('./../models/friend.js')
const User = require('./../models/user.js')
const Room = require('./../models/room.js')
const Message = require('./../models/message.js')
const config = require('./../config/index.js')

const mongoose = require('mongoose')
const sha256 = require('sha256')

// logout,friend Online,
realtime = (io)=>{
    io.on('connection', (socket) => {
        socket.on('REGISTER', async (data)=>{
            const isUser = await User.findOne({username: data.user.username})
            if(isUser){
                socket.emit('REGISTER-STATUS',{status:400,data:{response: "Register failed"}})
                return
            }
            else{
                const hashPassword = await sha256(data.user.password + data.user.username)
                const newFriend = Friend({
                    friend_username: data.user.username,
                })
                const friend = await newFriend.save()
                const friend_id =  friend._id.toString()
                console.log(friend_id)
                const newUser = User({
                    username: data.user.username,
                    password: hashPassword,
                    name: data.user.name,
                    friend_id,
                })
                const user = await newUser.save()
                console.log(user,friend)
                socket.emit('REGISTER-STATUS', {status: 200,data:{user,friend}})
                return
            }
            return
        });
        socket.on('LOGIN', async (data)=>{
            const user = await User.findOne({username: data.user.username})
            if(!user){
                return socket.emit('LOGIN-STATUS',{status:404, data:{response: 'Account Wrong!!!'}})
            }else{
                const hashPassword = await sha256(data.user.password + data.user.username)
                const isPassword = hashPassword === user.password ? true : false
                if(!isPassword){
                    return socket.emit('LOGIN-STATUS',{status:404, data:{response: 'password Wrong!!!'}})
                }else{
                    // Kiểm tra bản thân có online hay chưa nếu chưa thì được thêm vào onlines
                    var checkOnline = config.socket.onlines.find(obj =>
                            obj.username === user.username) ? true:false
                    if(!checkOnline){
                        config.socket.onlines.push({id: socket.id,username:user.username} )
                    }

                    // console.log('onlines',config.socket.onlines)
                    // Lấy danh sách bạn bè bằng friend_id trong user 
                    // Tạo biến F để lưu danh sách bạn của mình
                    const friends = await Friend.findById({_id: user.friend_id})
                    var F = []
                    for(var i = 0;i < friends.list_friend.length; i++){
                        const friend = await User.findOne({
                            username:friends.list_friend[i].username
                        })
                        // Tạo biến temp để lưu lại bạn bè đang online
                        var temp = config.socket.onlines.find(obj =>
                            obj.username === friends.list_friend[i].username
                        )
                        // console.log(temp)
                        // Nếu temp có trong onlines thì gửi thông điệp đến họ là mình
                        // vừa mới onlines
                        if(temp){
                            // socket.join(temp.id)
                            socket.to(temp.id).emit('HAS_PEOPLE_ONLINE',
                                {status:200, data:{username:user.username}})
                        }
                        
                        F.push({isOnline: temp ? true:false ,friend})
                        
                    }
                    // console.log('room ',socket.adapter.rooms)
                    // socket.to('')
                    // Cập nhật cho chính mình về profile và danh sách bạn
                    return socket
                        .emit('LOGIN-STATUS',{status:200, data:{user,F}})
                }
            }
        });

        socket.on('UPDATE-PROFILE', async (data)=>{
            const user = await User.findOneAndUpdate(
                {username: data.username},
                data.payload,
                {new:true}
            )
            socket.emit('UPDATE-PROFILE-STATUS',{status:200, data:{user}})
        });

        socket.on('ADD-FRIEND', async (data)=>{
            const friend = await User.findOne({username: data.search})
            if(!friend){
                socket.emit('ADD-FRIEND-STATUS', {status:404, data:{response: 'Khong tim thay'}})
            }else{
                socket.emit('ADD-FRIEND-STATUS', {status:200,data:{friend}})
            }
        });

        socket.on('COMMIT-ADD-FRIEND', async (data)=>{
            const user1 = await Friend.findById(data.user1)
            const user2 = await Friend.findById(data.user2)
            const id_message = user1.friend_username + user2.friend_username
            addUser1 = await Friend.findByIdAndUpdate(
                user1._id,
                {$push: {'list_friend':{id_message, username: user2.friend_username}}},
                // {new: true},
                {runValidators: true}
            )
            addUser2 = await Friend.findByIdAndUpdate(
                {_id: user2._id},
                {$push: {'list_friend':{id_message, username: user1.friend_username}}},
                // {new: true},
                {runValidators: true}
            )
            var temp = config.socket.onlines.find(obj =>
                            obj.username === addUser2.friend_username
                        )

            // var check = config.socket.onlines.has(addUser2.friend_username)
            const isOnline = temp ? true:false
            const friend = await User.findOne({username: user2.friend_username})
            socket.emit('COMMIT-ADD-FRIEND-STATUS',{status: 200, F: {isOnline,friend}})
        });    

        socket.on('DELETE-ALL-USER', async (data)=>{
            deleteAll = await Friend.remove()
            deleteAllUser = await User.remove()
        });

        socket.on('disconnect',async ()=>{
            // console.log('toi da ngat ket noi ', socket.id)
            var temp = config.socket.onlines.findIndex(obj =>
                            obj.id === socket.id
                        )
            // console.log(temp)
            // console.log('before onlines',config.socket.onlines[temp].username)
            var {username} = config.socket.onlines[temp]
            config.socket.onlines.splice(temp,1)
            const friends = await Friend.findOne({friend_username:username})
            for(var i of friends.list_friend){
                var temp = config.socket.onlines.find(obj =>
                            obj.username === i.username)
                if(temp){
                    socket.to(temp.id).emit('HAS_PEOPLE_OFFLINE',
                        {status:200, data:{username}})
                }
            }
            console.log('before onlines',config.socket.onlines)
            
            // console.log('after onlines',config.socket.onlines)
        })

    })
}
module.exports = realtime
