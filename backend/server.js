const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const Realtime = require('./src/controllers/realtime.js')
const config = require('./src/config')
// const Routers = require('./src/routers')
// 
const Message = require('./src/models/message.js')
// 
const app = express();
const server = http.createServer(app);
app.use(cors())
app.use(cookieParser())
app.use(express.json())

const io = new Server(server,{
    cors:{
        origin: "*",
        methods: ["GET","POST"]
    }
});

app.use('/uploads',express.static(__dirname + "/uploads"))

// app.get('/', (req,res)=>res.send('HelloWorld'))
Realtime(io)
// Routers(app)

const PORT = config.port
const URI = config.DB.uri

// app.put('/update',async (req,res)=>{
//   var id_message= req.body.id_message
//   var message_count = req.body.message_count
//   var username = req.body.username
//   var update = {helo: 'hellllllo'}
//   const findMessage = await Message.findOneAndUpdate(
//                 {id_message, message_count},
//                 {message_remove: username, message_time_remove:500000},
//                 {new:true}
//             )
//   res.send(findMessage)
// })


mongoose.connect(URI)
  .then(()=>{
    console.log("Database is connecting !!!")
  })
  .catch((err)=>{
    console.log("err: ",err)
  })


server.listen(PORT, () => {
    console.log('listening on *: ',PORT);
});
