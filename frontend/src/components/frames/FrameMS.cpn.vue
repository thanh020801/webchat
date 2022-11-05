<template>
	<div class="blank">
		<p class="">Hãy cùng nhau chia sẽ những kỹ niệm thú vị đi nào</p>
	</div>
	<!-- {{$store.messages.contents}} -->
	<div v-if='chosen.friend'>
		<div v-for='item in $store.messages.contents' > 
			<div class="" v-if='chosen.friend.username === item.message_name_send'>
				<ContentReceive :item='item'/>
			</div>
			<div v-else>
				<ContentSend :item='item'/>
			</div>
		</div>
	</div>
	<div v-if='chosen.room'>
		<div v-for='item in $store.messages.contents' > 
<!-- 			{{$store.userProfile.username}}<br>
			{{item.message_name_send}} -->
			<div class="" v-if='$store.userProfile.username !== item.message_name_send'>
				<ContentReceive :item='item'/>
			</div>
			<div v-else>
				<ContentSend :item='item'/>
			</div>
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
				chosen: this.$store.userChosen,
			}
		},
		setup(){
			const {friend_EX,room_EX,message_EX,userProfile_EX} = TestStore()
			const configUser = userConfig()
			return {friend_EX,room_EX,message_EX,userProfile_EX,configUser}
		},
		methods:{
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
				// console.log(this.$store.messages.contents)
			});
			
			// this.$socketInstant.
		},
		// created(){
		// 	this.setupMessageSendAndReceive()
		// },

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