<template>
    <div class=" d-flex ">
        <input class="testing-input" v-model='message.content' type="text" placeholder="Gửi tin nhắn tới ..." aria-label="Search" v-on:keyup.enter='sendMessage(message.content)'>
        <button class="testing-submit " type="submit">
        	<input class="input-submit-file" type="file" id="input-submit-file">
        	<label for="input-submit-file"><i class="bi bi-file-earmark-text-fill"></i></label>
        </button>
        <button v-if='message.content !== "" ' class="testing-submit" type="submit"  @click='sendMessage(message.content)'>
        	<i class="bi bi-send-fill"></i>
        </button>
    </div>
	
</template>
<script>
	import {TestStore} from '@/stores/test.js'
	import {userConfig} from '@/stores/userConfig.js'
	// import {scrollIntoView} from '@/services/untils.js'
	export default{
		data(){
			return {
				message:{
					content : "",
					time: "",
				},
			}
		},
		setup(){
			const {friend_EX,room_EX,message_EX,userProfile_EX} = TestStore()
			const configUser = userConfig()
			return {friend_EX,room_EX,message_EX,userProfile_EX,configUser}
		},
		methods:{

			sendMessage(content){
				var today = new Date()	
				var timeStandard = new Date(this.$store.timeStandard)
				// console.log(test.getHours()+':'+test.getMinutes())			
				// console.log('store',this.$store.rooms)
				// console.log('friend',this.$store.friends)
				var message = {
					message_name_send: this.$store.userProfile.username,
					message_content: this.message.content,
					message_date: new Date(),
					message_count: ((today - timeStandard)/(1000*60)).toFixed(3),
					message_category: 'text',
					id_message: this.$store.userChosen.id_message
				}
				console.log(message)
				var chosen= this.$store.userChosen
				if(chosen.room){
					this.$socketInstant.emit('SEND-MESSAGE',
						{message,room_name: chosen.room.room_name,friend_name: ""})
				}
				else if(chosen.friend){
					this.$socketInstant.emit('SEND-MESSAGE',
						{message,room_name: "",friend_name: chosen.friend.username})
				}
				this.message ={
					content : "",
					time: "",
				}
				// var chosen = new Date(this.$store.userChosen.room.createdAt)

				// console.log('chosen', today - chosen)
				// this.$socketInstant.emit('')
				// if(test < today){
				// 	console.log('cpm',((today - test)/(1000*60)).toFixed(3))
				// }else{
				// 	console.log('cpm',0)
				// }

				// // console.log(this.configUser.userChosen)
				// const {userChosen} = this.configUser
				// // console.log(userChosen)
				// if(userChosen && this.message.content !== ""){					
				// 	var today = new Date()
				// 	var time = today.getHours() + ":" + today.getMinutes()
				// 	var month = today.getMonth() + 1
				// 	var date = today.getDate() + "/" + month + "/" + 
				// 			today.getFullYear()
				// 	console.log(month)
				// 	var {idMessage} = userChosen
				// 	for (var i = 0; i < this.message_EX.length; i++) {
				// 		if(idMessage === this.message_EX[i].idMessage){
				// 			var  message = { 
				// 			    id: "aaa",
				// 			    message_name_send: this.userProfile_EX.id, 
				// 			    message_content: content, 
				// 			    message_name_recieve: userChosen.id,
				// 			    message_date: date,
				// 			    message_time: time ,
				// 			    message_count: this.message_EX[i].contents.length+1,
				// 			}
				// 			this.message_EX[i].contents.push(message)
				// 			// console.log(idMessage,this.message_EX[i])
				// 			this.message.content = ""
				// 			return
				// 		}
				// 	}

				// }	

				
			}
		}
	}
</script>
<style type="text/css">
	.testing{
		width: 97%;
		margin: 0 auto;
		/*background-color: #673ab7;*/
		box-shadow: 2px -1px 5px 0px black;
		height: 10vh;
		border-radius: 5px;
	}
	.testing-input{
		outline: none;
		border-radius: 5px 0px 0px 5px;
		padding: 1rem;
		/*margin-top: 0.2rem;*/
		width: 84%;
		height: 10vh;
		/*background-color: #673ab7;*/
		border: none;
	}
	.testing-input:focus ,.testing-submit-file:focus{
		border: none;
	}
	.testing-submit, .testing-submit-file{
		width: 7%;
		/*height: 50px;*/
		font-size: 25px;
		border: none;
		outline: none;
		float: right;
	}
	.testing-submit{
		border-radius: 0px 5px 5px 0px;
	}
	.input-submit-file{
		display: none;
	}
</style>