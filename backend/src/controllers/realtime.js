const Friend = require('./../models/friend.js')
const User = require('./../models/user.js')
const Room = require('./../models/room.js')
const Message = require('./../models/message.js')
const config = require('./../config/index.js')

const mongoose = require('mongoose')
const sha256 = require('sha256')

const fs = require('fs')
const crypto = require('crypto')
const path = require('path')
var ss = require('socket.io-stream');
ss.forceBase64 = true ; 






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
                //console.log(friend_id)
                const newUser = User({
                    username: data.user.username,
                    password: hashPassword,
                    name: data.user.name,
                    birthday:data.user.birthday,
                    phone: data.user.phone,
                    friend_id,
                })
                const user = await newUser.save()
                //console.log(user,friend)
                io.to(config.socket.admin.id).emit('GET-BLOCK-ITEMS-STATUS',
                    {blockItemAccount: await User.find().count()})
                socket.emit('REGISTER-STATUS', {status: 200,data:{user,friend}})
                return
            }
            return
        });
        socket.on('LOGIN', async (data)=>{
            //console.log('Có ngừ online')
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
                    if(user.lock){
                        return socket.emit('LOGIN-STATUS',{status:403, data:{response: 'Account had lock'}})
                    }
                    if(user.admin){
                        config.socket.admin.id = socket.id
                        config.socket.admin.username = user.username
                    }
                    var checkOnline = config.socket.onlines.find(obj =>
                            obj.username === user.username) ? true:false
                    if(!checkOnline){
                        config.socket.onlines.push({id: socket.id,username:user.username} )
                    }

                    // //console.log('onlines',config.socket.onlines)
                    // Lấy danh sách bạn bè bằng friend_id trong user 
                    // Tạo biến F để lưu danh sách bạn của mình
                    const friends = await Friend.findById({_id: user.friend_id})
                    var F = []
                    var R = []
                    for(var i = 0;i < friends.list_friend.length; i++){
                        const friend = await User.findOne({
                            username:friends.list_friend[i].username
                        })
                        // Tạo biến temp để lưu lại bạn bè đang online
                        var temp = config.socket.onlines.find(obj =>
                            obj.username === friends.list_friend[i].username
                        )
                        // //console.log(temp)
                        // Nếu temp có trong onlines thì gửi thông điệp đến họ là mình
                        // vừa mới onlines
                        if(temp){
                            // socket.join(temp.id)
                            socket.to(temp.id).emit('HAS_PEOPLE_ONLINE',
                                {status:200, data:{username:user.username}})
                        }
                        
                        F.push({
                            id_message:friends.list_friend[i].id_message,
                            isOnline: temp ? true:false ,
                            friend
                        })
                        
                    }
                    // //console.log(friends.list_room.length)
                    // //console.log(friends.list_room)
                    if(friends.list_room.length){
                        for(var i = 0;i < friends.list_room.length; i++){
                            // const {list_room}
                            const room = await Room.findOne({
                                room_name: friends.list_room[i].room_name
                            })
                            R.push({id_message: friends.list_room[i].id_message ,room})
                            
                        }
                    }
                       
                    //console.log('onlines',config.socket.onlines)
                    // socket.to('')
                    // Cập nhật cho chính mình về profile và danh sách bạn
                    //console.log('room ',socket.adapter.rooms)
                    io.to(config.socket.admin.id).emit('GET-BLOCK-ITEMS-STATUS',
                        {blockItemOnline:config.socket.onlines.length})
                    return socket
                        .emit('LOGIN-STATUS',{status:200, data:{user,R,F}})
                }
            }
        });

        socket.on('GET-ALL-FRIENDS', async (data)=>{
            const {list_friend} = await Friend.findOne({friend_username:data.username})
            // console.log(list_friend,id_message)
            const friends = []
            for(var item of list_friend){
                const friend = await User.findOne({username:item.username})
                var temp = config.socket.onlines.find(element=> 
                    element.username === friend.username) 
                friends.push({isOnline: temp?true:false,id_message: item.id_message,friend})
            }
            socket.emit('GET-ALL-FRIENDS-STATUS',{friends})
        })

        socket.on('GET-ALL-GROUPS', async (data)=>{
            const {list_room} = await Friend.findOne({friend_username:data.username})
            // console.log(list_room,id_message)
            const rooms = []
            for(var item of list_room){
                const room = await Room.findOne({room_name:item.room_name})
                for(var temp of room.room_member){
                    const member = await User.findOne({username: temp.username})
                    // console.log(temp)
                    temp.avatar = member.avatar
                    // room.room_member = temp
                    // console.log(temp)
                }
                // console.log('room',room.room_member)
                rooms.push({id_message:item.id_message,room})
            }
            // console.log('rooms',rooms[0].room)
            socket.emit('GET-ALL-GROUPS-STATUS',{rooms})
        });
        socket.on('UPDATE-PROFILE', async (data)=>{
            const user = await User.findOneAndUpdate(
                {username: data.username},
                data.payload,
                {new:true}
            )
            socket.emit('UPDATE-PROFILE-STATUS',{status:200, data:{user}})
        });


        socket.on('SEND-MESSAGE',async data=>{
            // //console.log(data.message)
            const newMessage = Message(data.message)
            const message = await newMessage.save(newMessage)

            const member = await User.findOne({username: data.message.message_name_send})
            message._doc.avatar = member.avatar
          
            if(data.friend_name){
                var temp = config.socket.onlines.find(element=>element.username === data.friend_name)
                if(temp){

                    io.to(temp.id).emit('RECIEVE-MESSAGE',{message})
                    
                }
                socket.emit('RECIEVE-MESSAGE',{message})
            } else if(data.room_name){
                var room = await Room.findOne({room_name: data.room_name})
                
                // console.log('message',message)
                for(var item of room.room_member){
                    var temp = config.socket.onlines.find(element=>
                        element.username === item.username)
                    if(temp){
                        io.to(temp.id).emit('RECIEVE-MESSAGE',{message})
                    }
                }
                    
            }
            // console.log('content',message)
            
            io.to(config.socket.admin.id).emit('GET-BLOCK-ITEMS-STATUS',
                    {blockItemMessage: await Message.find().count()})
            const messages = await Message.find({id_message: data.message.id_message})
                .sort({message_count: -1})
            io.to(config.socket.admin.id).emit('ADMIN-UPDATE-MESSAGES-STATUS',
                {messages,id_message: data.message.id_message})
        });

        socket.on('REMOVE-MESSAGE', async data=>{
            const {id_message,message_count,...rmMessage} = data
            //console.log('data remove message', rmMessage)
            const findMessage = await Message.findOneAndUpdate(
                {id_message:data.id_message, message_count: data.message_count},
                {message_time_remove: data.message_count, message_remove:data.username},
                {new: true}
            )
            //console.log(findMessage)
        });

        socket.on('REMOVE-MESSAGE-WITH-ID',async data=>{
            //console.log('REMOVE-MESSAGE-WITH-ID',data)
            const removeMessage = await Message.findByIdAndDelete({_id:data.id})
            //console.log('REMOVE-MESSAGE-WITH-ID',removeMessage)
            if(data.filename !== ""){
                const pathname = './uploads/'+ path.basename(data.filename)
                //console.log(pathname)
                // pathname = './uploads/' + pathname
                fs.unlink(pathname, (err) => {
                    if (err) {
                        socket.emit('REMOVE-FILE-WITH-NAME-STATUS',
                            {status:404, response: "ko tim thay file"})
                        return
                    }
                    socket.emit('REMOVE-FILE-WITH-NAME-STATUS',
                        {status:200, response:'Xoa thanh cong'})
                })
            }
                

            io.to(config.socket.admin.id).emit('REMOVE-MESSAGE-WITH-ID-STATUS')
            io.to(config.socket.admin.id).emit('GET-BLOCK-ITEMS-STATUS',
                    {blockItemMessage: await Message.find().count()})
        })

        socket.on('GET-MESSAGES-FROM-ID-MESSAGE',async data=>{
            // console.log('data.id_message',data.id_message)
            // Tim cho xoa tin nhan moi nhat
            var findMessage = await Message.find({
                id_message:data.id_message, message_remove:data.username})
                .sort({message_time_remove: -1})
                .limit(1)
            
            // Nếu người dùng từng xóa tin nhắn thì sẽ bắt đầu 
            // lấy tin nhắn phía sau trả cho ng dùng 
            // Nếu ko thì lấy toàn bộ tin nhắn
            if(findMessage[0]){
                //console.log('message_remove',findMessage[0].message_time_remove)
                var messages = await Message.find({
                    id_message:data.id_message,
                    message_count: {'$gt': findMessage[0].message_time_remove}
                })
                .sort({message_count:1})


                // const frameMessages = []
                for(message of messages){
                    const sender = await User.findOne({username: message.message_name_send})
                    message._doc.avatar = sender.avatar
                    // await frameMessages.push(message)
                }


                //console.log('message get 1', messages)
                socket.emit('GET-MESSAGES-FROM-ID-MESSAGE-STATUS',{status:200,messages})
            }else{
                var messages = await Message.find({id_message:data.id_message})
                .sort({message_count:1})

                // const frameMessages = []
                for(message of messages){
                    const sender = await User.findOne({username: message.message_name_send})
                    message._doc.avatar = sender.avatar
                    // await frameMessages.push(message)
                }

                // console.log('message get 2', messages)
                socket.emit('GET-MESSAGES-FROM-ID-MESSAGE-STATUS',{status:200,messages})
            }
            
        })
        // //console.log('message get final', messages)
        socket.on('ADD-FRIEND', async (data)=>{
            const friend = await User.findOne({username: data.search})
            if(!friend){

                socket.emit('ADD-FRIEND-STATUS', {status:404, data:{response: 'Khong tim thay'}})
            }else{
                socket.emit('ADD-FRIEND-STATUS', {status:200,data:{friend}})
            }
        });
        socket.on('REMOVE-FRIEND',async data=>{
            var removeFriend1 = await Friend.findOneAndUpdate(
                {friend_username: data.username},
                {'$pull': {list_friend:{username:data.friendRemoved}}},
                {new:true}
            )
            var removeFriend2 = await Friend.findOneAndUpdate(
                {friend_username: data.friendRemoved},
                {'$pull': {list_friend:{username:data.username}}},
                {new:true}
            )
            var removeMessages = await Message.remove({id_message: data.id_message})
            var temp = config.socket.onlines.find(element=>element.username===data.friendRemoved)
            if(temp){
                io.to(temp.id).emit('REMOVE-FRIEND-STATUS',{status:200, friend_username: data.username})
            }
            //console.log('removeFriend1', removeFriend1, 'removeFriend2',removeFriend2)
            io.to(config.socket.admin.id).emit('REMOVE-FRIEND-STATUS')
            socket.emit('REMOVE-FRIEND-STATUS',{status:200, friend_username: data.friendRemoved})
        })

        socket.on('COMMIT-ADD-FRIEND', async (data)=>{
            const user1 = await Friend.findOne({friend_username: data.user1.username})
            const user2 = await Friend.findOne({friend_username: data.user2.username})
            const isFriend = user1.list_friend.find(element => element.username === data.user2.username)
            //console.log('isFriend',isFriend)
            if(!isFriend){
                const id_message = user1.friend_username + user2.friend_username
                addUser1 = await Friend.findByIdAndUpdate(
                    user1._id,
                    {$push: {'list_friend':{id_message, username: user2.friend_username}}},
                    {new: true},
                    // {runValidators: true}
                )
                addUser2 = await Friend.findByIdAndUpdate(
                    {_id: user2._id},
                    {$push: {'list_friend':{id_message, username: user1.friend_username}}},
                    {new: true},
                    // {runValidators: true}
                )
                const friend = await User.findOne({username: user2.friend_username})
                const user = await User.findOne({username: user1.friend_username})
                var temp = config.socket.onlines.find(obj =>
                                obj.username === addUser2.friend_username
                            )

                //console.log('temp ',temp)
                const isOnline = temp ? true:false
                if(temp){
                    //console.log('COMMIT-ADD-FRIEND-STATUS success')
                    io.to(temp.id).emit('COMMIT-ADD-FRIEND-STATUS',
                        {status: 200, F: {id_message, isOnline:true, friend:user}});
                    
                }
                socket.emit('COMMIT-ADD-FRIEND-STATUS',
                        {status: 200, F: {id_message, isOnline,friend}});
                
            }else{
                //console.log('false')
                socket.emit('COMMIT-ADD-FRIEND-STATUS',{status: 201, data:{response:'Đã kết bạn với người này rồi'}})
            }
            io.to(config.socket.admin.id).emit('COMMIT-ADD-FRIEND-STATUS')
        });    

        socket.on('CREATE-GROUP', async (data)=>{

            const isRoom = await Room.findOne({room_name: data.room.room_name})
            if(isRoom){
                return
            }
            //console.log('CREATE-GROUP')            
            const newRoom = Room({
                room_admin: data.room.room_admin,
                room_member: data.room.room_member,
                room_name: '#' + data.room.room_name,
                room_avartar: data.room.room_avatar, 
            })
            const room = await newRoom.save()
            const id_message = room._id.toString()
            for(item of room.room_member){
                const updateRoom = await Friend.findOneAndUpdate(
                    {friend_username: item.username},
                    {$push: {'list_room':{id_message, room_name: room.room_name}}},
                    {new:true},
                    // {runValidators: true}
                )
                // //console.log(updateRoom)
                const temp = config.socket.onlines.find(element=>element.username === item.username)
                //console.log('temp1',temp)
                if(temp){
                    //console.log('temp onl',temp)
                    io.to(temp.id).emit('CREATE-GROUP-STATUS',{status:200,R:{id_message,room}})
                }
            }
            io.to(config.socket.admin.id).emit('GET-BLOCK-ITEMS-STATUS',
                    {blockItemGroup: await Room.find().count()})
            socket.emit('CREATE-GROUP-STATUS',{status:200,R:{id_message,room}})
            io.to(config.socket.admin.id).emit('CREATE-GROUP-STATUS')
        })
        // Rời nhóm nếu người rơi nhóm là admin thì chuyển quyền admin cho 1 ngkhac
        // Nếu nhóm chỉ có 1 người mà rời nhóm thì sẽ xóa luôn nhóm
        // Else rời nhóm thành công cập nhật lại số lượng trong room_member
        // và Friend.list_room
        socket.on('EXIT-GROUP', async (data)=>{
        try{
            //console.log('EXIT-GROUP',data)
            const room = await Room.findOne({room_name:data.room_name})
            var updateRoom = ""
            if(room.room_admin === data.username){
                const checkAdmin = room.room_member.find(element=>element.username !== data.username)
                if(checkAdmin){
                    updateRoom = await Room.findOneAndUpdate(
                        {room_name:data.room_name},
                        {
                            room_admin: checkAdmin.username,
                            '$pull': {'room_member': {username:data.username}}
                        },
                        {new:true}
                    )
                    // //console.log('updateRoom', updateRoom)
                }else{
                    const delRoom = await Room.findOneAndDelete({room_name:data.room_name})
                    io.to(config.socket.admin.id).emit('GET-BLOCK-ITEMS-STATUS',
                        {blockItemGroup: await Room.find().count()})
                    // //console.log('da delete Room', delRoom)
                }
            }else{
                updateRoom = await Room.findOneAndUpdate(
                    {room_name:data.room_name},
                    {'$pull': {'room_member': {username:data.username}}},
                    {new:true}
                )
                //console.log('updateRoom no admin', updateRoom)
            }
            const updateListRoom = await Friend.findOneAndUpdate(
                        {friend_username: data.username},
                        {'$pull': {'list_room': {room_name:room.room_name}}}
            )
            // //console.log('updateListRoom', updateListRoom)

            for(var item of updateRoom.room_member){
                var temp = config.socket.onlines.find(el => 
                    el.username === item.username)
                if(temp){
                    //console.log('EXIT-GROUP', temp)
                    io.to(temp.id).emit('EXIT-GROUP-MEMBER-STATUS',
                        {status:200,R:{room:updateRoom}})
                }

            }
            // Neu ng dung da roi nhom la ban 
            // gui tin ve cho ban 
            // neu ng dung ko phai ban ma onl
            // gui tin ve cho ng do
            var checkUser = config.socket.onlines.find(el => 
                    el.username === data.username)
            if(checkUser){
                if(checkUser.id === socket.id){
                    //console.log('check la ban')
                    socket.emit('EXIT-GROUP-USER-STATUS',
                        {status:200, room_name:room.room_name})
                }else{
                    //console.log('check la ko phai  ban')
                    io.to(checkUser.id).emit('EXIT-GROUP-USER-STATUS',
                        {status:200, room_name:room.room_name})
                }
            }
            io.to(config.socket.admin.id).emit('EXIT-GROUP-USER-STATUS')  
        }catch(err){
            //console.log(err)
        }
        
        });

        socket.on('CHANGE-ADMIN-IN-GROUP', async (data)=>{
            room = await Room.findOne({room_name:data.room_name})
            //console.log('room change admin',room)
            updateRoom = await Room.findOneAndUpdate(
                {room_name:data.room_name},
                {room_admin: data.changeUsername},
                {new:true}
            )
            //console.log('updateRoom', updateRoom)
            var userOnl = config.socket.onlines.find(el => el.username === data.changeUsername)
            //console.log('userOnl', userOnl)
            if(userOnl){
                io.to(userOnl.id).emit('CHANGE-ADMIN-IN-GROUP-STATUS',{status:200, R:{room:updateRoom}})
            }
            socket.emit('CHANGE-ADMIN-IN-GROUP-STATUS',{status:200, R:{room:updateRoom}})
            
        });


        socket.on('UPDATE-MEMBER_IN_GROUP', async (data)=>{
            var room = await Room.findOne({room_name:data.room_name})
            console.log(room, data.room_name)
            var id_message = room._id.toString()
            for(var item of data.room_member){
                // //console.log('item',item)
                var updateMemberRoom = await Room.findOneAndUpdate(
                    {room_name:data.room_name},
                    {'$push': {room_member: {name:item.name, username: item.username}}},
                    {new:true}
                )
                var updateListRoom = await Friend.findOneAndUpdate(
                    {friend_username: item.username},
                    {'$push': {list_room: {id_message, room_name: data.room_name}}},
                    {new:true}
                )
                //console.log('updateMemberRoom',updateMemberRoom,'updateListRoom',updateListRoom)
            }
            for(var item of updateMemberRoom.room_member){
                var checkOnl = config.socket.onlines.find(element=>element.username === item.username)
                if(checkOnl){
                    var roomAfterUpdate = await Room.findOne({room_name:data.room_name})
                    //console.log('room change member',roomAfterUpdate)
                    io.to(checkOnl.id).emit('UPDATE-MEMBER_IN_GROUP-STATUS',{
                        status:200,
                        R: {room:roomAfterUpdate},
                    })
                }
                //console.log('checkOnl', checkOnl)
            }
            
        });


        socket.on('REMOVE-GROUP',async (data)=>{
            // //console.log(data.room)
            for(var element of data.room.room_member){
                var userOnl = config.socket.onlines.find(el => el.username === element.username)
                // //console.log('tim thay', userOnl)
                if(userOnl){
                    //console.log('emit tung user ', userOnl.id)
                    io.to(userOnl.id)
                        .emit('REMOVE-GROUP-STATUS',
                            {status:200,room_name:data.room.room_name})
                }
                var updateListRoom = await Friend.findOneAndUpdate(
                    {friend_username: element.username},
                    {'$pull': {'list_room': {room_name:data.room.room_name}}}
                )
            }
            //console.log('data._id',data.room._id)
            const deleMessageInGroup = await Message.remove({id_message: data.room._id.toString()})
            const delRoom = await Room.findOneAndDelete({room_name:data.room.room_name})
            //console.log('REMOVE-GROUP', delRoom)
            io.to(config.socket.admin.id)
                        .emit('REMOVE-GROUP-STATUS',
                            {isRemoveGroup: true})
        })

        socket.on('DELETE-ALL-USER', async (data)=>{
            deleteAll = await Friend.remove()
            deleteAllUser = await User.remove()
            deleteAllRooms = await Room.remove()
            deleteAllMessage = await Message.remove()
            //console.log('DELETE SUCCESSFULLY')
        });


        socket.on('GET-BLOCK-ITEMS',async()=>{
            const blockItemAccount = await User.find().count()
            // //console.log('blockItemAccount',blockItemAccount)
            const blockItemGroup = await Room.find().count()
            // //console.log('blockItemGroup',blockItemGroup)
            const blockItemMessage = await Message.find().count()
            // //console.log('blockItemMessage',blockItemMessage)
            const blockItemOnline = await config.socket.onlines.length
            // //console.log('blockItemOnline',blockItemOnline)
            io.to(config.socket.admin.id).emit('GET-BLOCK-ITEMS-STATUS', 
                {blockItemAccount,blockItemGroup,blockItemMessage,blockItemOnline})
        });

        socket.on('ADMIN-GET-ALL-USER', async ()=>{
            const users = await User.find()
            const F = []
            for(let user of users){
                // //console.log('ADMIN-GET-ALL-USER1', user._doc)
                const {_v,password,createdAt,updatedAt,...userInfo} = user._doc
                const friends = await Friend.findOne({friend_username: user.username})
                userInfo.friend_number = friends.list_friend.length
                userInfo.room_number = friends.list_room.length
                // //console.log('ADMIN-GET-ALL-USER', userInfo)
                F.push(userInfo)
            }
            io.to(config.socket.admin.id).emit('ADMIN-GET-ALL-USER-STATUS', F)
        });

        socket.on('ADMIN-GET-ALL-GROUP', async ()=>{
            const rooms = await Room.find()
            const R = []
            for(let room of rooms){
                //console.log('ADMIN-GET-ALL-USER1', room._doc)
                const {_v,createdAt,updatedAt,...groupInfo} = room._doc
                // const friends = await Friend.findOne({friend_username: user.username})
                // userInfo.friend_number = friends.list_friend.length
                groupInfo.room_member_number = groupInfo.room_member.length
                groupInfo.message_number = await Message.find({id_message: groupInfo._id}).count()
                // console.log('ADMIN-GET-ALL-GROUP', groupInfo)
                R.push(groupInfo)
            }
           io.to(config.socket.admin.id).emit('ADMIN-GET-ALL-GROUP-STATUS', R)
        });

        socket.on('ADMIN-GET-ALL-MESSAGES', async data=>{
            const messages = await Message.find({id_message: data.id_message.toString()}).sort({message_count:-1})
            //console.log('message',messages, data.id_message.id_message)
            // const {createdAt,updatedAt,_v,...payload} = messages._doc
            io.to(config.socket.admin.id).emit('ADMIN-GET-ALL-MESSAGES-STATUS', {messages})
        })


        socket.on('ADMIN-GET-USER-INFO', async data=>{
            const findUser = await User.findOne({username: data.username})
            const findFriends = await Friend.findOne({friend_username: data.username})
            var {password,admin,createdAt,updatedAt,...user} = findUser._doc
            //console.log(user)
            user.friend_number = findFriends.list_friend.length
            user.room_member_number = findFriends.list_room.length
            const friends = []
            const groups = []
            for(let friend of findFriends.list_friend){
                const findFriend = await User.findOne({username:friend.username})
                var {_v,password,admin,createdAt,updatedAt,...payload} = findFriend._doc
                
                payload.id_message = friend.id_message
                payload.message_number = await Message.find({id_message: friend.id_message}).count()
                friends.push(payload)
            }
            for(let room of findFriends.list_room){
                const findRoom = await Room.findOne({room_name: room.room_name})
                var {_v,createdAt,updatedAt,...payload} = findRoom._doc
                payload.room_member_number = findRoom.room_member.length
                payload.id_message = room.id_message
                payload.message_number = await Message.find({id_message: room.id_message}).count()
                groups.push(payload)
            }
            //console.log('user',user)
            //console.log('friends',friends)
            //console.log('groups',groups)
            io.to(config.socket.admin.id).emit('ADMIN-GET-USER-INFO-STATUS',{user,friends,groups})
        });


        socket.on('ADMIN-LOCK-ACCOUNT-USER',async data=>{
            var lockUser = await User.findOneAndUpdate(
                    {username: data.username},
                    {lock: true},
                    {new:true}
                )
            var temp = config.socket.onlines.find(element=>element.username === data.username)
            if(temp){
                io.to(temp.id).emit('ADMIN-LOCKED-ACCOUNT-USER-STATUS',{data:{response:"Tài khoản bị khóa"}})
            }
            io.to(config.socket.admin.id).emit('ADMIN-LOCK-ACCOUNT-USER-STATUS',{isLock:true})
        })

        socket.on('ADMIN-UNLOCK-ACCOUNT-USER',async data=>{
            var lockUser = await User.findOneAndUpdate(
                    {username: data.username},
                    {lock: false},
                    {new:true}
                )
            io.to(config.socket.admin.id).emit('ADMIN-UNLOCK-ACCOUNT-USER-STATUS',{isUnLock:true})
        })




// ////////////////////////

    ss(socket).on('UPLOAD-FILE', async (stream, data)=>{
        crypto.randomBytes(16, (err, buf) => {
            if (err) {
                console.log('err',err)
                return 
            }
            const filename = buf.toString('hex') + path.extname(data.name);
            
            stream.pipe(fs.createWriteStream('uploads/' + filename));
            // console.log('data upload', data.upload)
            if(data.upload === 'message'){
                stream.on('end',(end)=>{
                    socket.emit('UPLOAD-FILE-STATUS',{
                        url:new URL(config.dowloadFile(filename)), 
                        type: data.type,
                        size: data.size
                    })
                    // console.log('file filename',filename)
                    stream.destroy();
                })
            }else if(data.upload === 'avatar'){
                stream.on('end',(end)=>{
                    socket.emit('UPLOAD-AVATAR-STATUS',{
                        url:new URL(config.dowloadFile(filename)), 
                        type: data.type,
                        size: data.size
                    })
                    // console.log('avatar filename',filename)
                    stream.destroy();
                })
            }
                
        });
    })
    // socket.on('GET-FILE', async data=>{
    //     console.log('GET-FILE-GET-FILE',data)

    //     socket.emit('UPLOAD-FILE-STATUS',{url:new URL(config.dowloadFile(data.name))})
    // })

    socket.on('REMOVE-FILE-WITH-NAME', async data=>{
        // console.log('REMOVE-FILE-WITH-NAME',data)
        var pathname = './uploads/' + data.name
        fs.unlink(pathname, (err) => {
          if (err) {
            socket.emit('REMOVE-FILE-WITH-NAME-STATUS',{status:404, response: "ko tim thay file"})
            return
          }
          socket.emit('REMOVE-FILE-WITH-NAME-STATUS',{status:200, response:'Xoa thanh cong'})
        })



        // crypto.randomBytes(16, (err, buf) => {
        //     if (err) {
        //         //console.log('err',err)
        //         return 
        //     }
        //     const filename = buf.toString('hex') + path.extname(data.name);
        //     //console.log('filename',filename)
        // });
    })
// /////////////////////////






    // socket.on('GET-AVATAR-MEMBER-IN-GROUP',async data=>{
    //     console.log(data.room_name)
    //     room
    // })






        socket.on('disconnect',async ()=>{
            try{
                //console.log('có ng vua off')
                // //console.log('toi da ngat ket noi ', )
                var temp = config.socket.onlines.findIndex(obj =>
                                obj.id === socket.id
                            )
                //console.log('temp',temp)
                // //console.log('before onlines',config.socket.onlines[temp].username)
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
                //console.log('room ',socket.adapter.rooms)
                //console.log('onlines ',config.socket.onlines)
                io.to(config.socket.admin.id).emit('GET-BLOCK-ITEMS-STATUS',
                    {blockItemOnline: config.socket.onlines.length})
            }catch(err){
                // //console.log(err)
            }
        })

    })
}
module.exports = realtime
