<template>
	<div class="blank">
		<p class="">Hãy cùng nhau chia sẽ những kỹ niệm thú vị đi nào</p>
	</div>
	<!-- {{$store.messages.contents}} -->
	<div v-for='item in $store.messages.contents'> 
		<div class="" v-if='$store.userChosen.friend.username === item.message_name_send'>
			<ContentReceive :item='item'/>
		</div>
		<div v-else>
			<ContentSend :item='item'/>
		</div>
	</div>
</template>
<script>

import ContentSend from '@/components/messages/Content-send.cpn.vue'
import ContentReceive from '@/components/messages/Content-receive.cpn.vue'
import {TestStore} from '@/stores/test.js'
import {userConfig} from '@/stores/userConfig.js'
	export default{
		components:{
			ContentSend,ContentReceive
		},
		data(){
			return{
				messages: [],
			}
		},
		setup(){
			const {friend_EX,room_EX,message_EX,userProfile_EX} = TestStore()
			const configUser = userConfig()
			return {friend_EX,room_EX,message_EX,userProfile_EX,configUser}
		},
		methods:{
			// Tim tin nhan cua minh voi ng ban duoc chon bang idMessage 
			// Luu tin nhan lai bang messages
			setupMessageSendAndReceive(){
				// console.log('no da thay doi', this.configUser.userChosen)
				// const {userChosen} = this.configUser
				// if(userChosen){
				// 	for (var i = 0; i < this.message_EX.length; i++) {
				// 		if (userChosen.idMessage === this.message_EX[i].idMessage) {
				// 			this.messages = this.message_EX[i].contents
				// 			return
				// 		}
				// 	}
				// 	this.messages = []
					// console.log(this.messages)
				// }

			}
		},
		mounted(){
			this.$socketInstant.on('RECIEVE-MESSAGE',async data=>{
				const {id_message,createdAt,updatedAt,...content} = data.message
				console.log('message', id_message,createdAt,updatedAt,content)
				// console.log(id_message)
				// console.log(content)
				// this.$store.messages.id_message = id_message
				console.log(this.$store.messages.contents)
				this.$store.messages.contents.push(content)
			});
			this.$socketInstant.on('GET-MESSAGES-FROM-ID-MESSAGE-STATUS', async data=>{
				// console.log(data.messages)
				const {id_message,createdAt,updatedAt,...contents} = data.messages
				this.$store.messages.contents = Object.values(contents)
				console.log(this.$store.messages.contents)
			});
			
			// this.$socketInstant.
		},
		created(){
			this.setupMessageSendAndReceive()
		},

		// watch:{
		// 	'configUser.userChosen': function(val, oldVal){
		// 		this.setupMessageSendAndReceive()

		// 	}
		// },
	}
</script>
<style type="text/css">
	.blank{
		height: 300px;
		width: 100%;
		/*background-color: red;*/

	}
	.blank p{
		width: fit-content;
		height: 50px;
		margin: 0 auto;
		position: relative;
		top: 50%;
		font-size: 20px;
	}
</style>