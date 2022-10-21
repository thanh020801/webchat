<template>
	<div class="blank">
		<p class="">Hãy cùng nhau chia sẽ những kỹ niệm thú vị đi nào</p>
	</div>
	<div v-for='item in messages'> 
		<div class="" v-if='this.configUser.userChosen.id === item.message_name_send'>
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
			// scrollToElement() {
			// 	const container = document.querySelectorAll('.Contents')				
			// 	console.log(container.scrollTop)
			// 	container.scrollTop = container.scrollHeight;
			// },


			// Tim tin nhan cua minh voi ng ban duoc chon bang idMessage 
			// Luu tin nhan lai bang messages
			setupMessageSendAndReceive(){
				// console.log('no da thay doi', this.configUser.userChosen)
				const {userChosen} = this.configUser
				if(userChosen){
					for (var i = 0; i < this.message_EX.length; i++) {
						if (userChosen.idMessage === this.message_EX[i].idMessage) {
							this.messages = this.message_EX[i].contents
							return
						}
					}
					this.messages = []
					// console.log(this.messages)
				}
			}
		},
		created(){
			this.setupMessageSendAndReceive()
		},

		watch:{
			'configUser.userChosen': function(val, oldVal){
				this.setupMessageSendAndReceive()

			}
		},
		// mounted() {
		//   	this.scrollToElement();
		// },
		// updated(){
		// 	var elem = this.$el
  // 			elem.scrollTop = elem.clientHeight;
  // 			console.log('elem ', elem)
		// }
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