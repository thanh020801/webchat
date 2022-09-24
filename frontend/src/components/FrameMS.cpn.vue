<template>
	<div v-for='item in messages'> 
		<div v-if='this.configUser.userChosen.id === item.message_name_recieve'>
			<ContentSend :item='item'/>
		</div>
		<div v-else>
			<ContentReceive :item='item'/>
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
		}
	}
</script>
<style type="text/css"></style>