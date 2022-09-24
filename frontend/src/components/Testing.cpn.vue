<template>
    <div class=" d-flex ">
        <input class="testing-input" v-model='message.content' type="text" placeholder="Gửi tin nhắn tới ..." aria-label="Search">
        <button class="testing-submit " type="submit">
        	<input class="input-submit-file" type="file" id="input-submit-file">
        	<label for="input-submit-file"><i class="bi bi-file-earmark-text-fill"></i></label>
        </button>
        <button class="testing-submit" type="submit" @click='sendMessage(message.content)'>
        	<i class="bi bi-send-fill"></i>
        </button>
    </div>
	
</template>
<script>
	import {TestStore} from '@/stores/test.js'
	import {userConfig} from '@/stores/userConfig.js'
	export default{
		data(){
			return {
				message:{
					content : "",
					time: "",
				}
			}
		},
		setup(){
			const {friend_EX,room_EX,message_EX,userProfile_EX} = TestStore()
			const configUser = userConfig()
			return {friend_EX,room_EX,message_EX,userProfile_EX,configUser}
		},
		methods:{
			sendMessage(content){
				
				// console.log(this.configUser.userChosen)
				const {userChosen} = this.configUser
				// console.log(userChosen)
				if(userChosen && this.message.content !== ""){					
					var today = new Date()
					var time = today.getHours() + ":" + today.getMinutes()
					// var  message = { 
					//     id: "aaa",
					//     message_name_send: this.userProfile_EX.id, 
					//     message_content: content, 
					//     message_name_recieve: userChosen.id,
					//     message_date: time, 
					//     // message_room: , 
					//     message_count: 1,
					// }
					// console.log(message)
					var {idMessage} = userChosen
					for (var i = 0; i < this.message_EX.length; i++) {
						if(idMessage === this.message_EX[i].idMessage){
							var  message = { 
							    id: "aaa",
							    message_name_send: this.userProfile_EX.id, 
							    message_content: content, 
							    message_name_recieve: userChosen.id,
							    message_date: time, 
							    message_count: this.message_EX[i].contents.length+1,
							}
							this.message_EX[i].contents.push(message)
							// console.log(idMessage,this.message_EX[i])
							this.message.content = ""
							return
						}
					}
					// var contents = []
					// contents.push(message)
					// this.message_EX.push({idMessage, contents })
					// // console.log(userChosen,idMessage)
					// // console.log(this.message_EX)
					// this.message.content = ""
				}	

				
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