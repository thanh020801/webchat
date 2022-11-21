<template>
	<div class="blank">
		<p class="">Hãy cùng nhau chia sẽ những kỹ niệm thú vị đi nào</p>
	</div>
	<!-- <ContentSend /> -->
	<!-- {{$store.messages.contents}} -->
	<!-- {{$store.userChosen.friend.username}} -->
	<div   v-if='$store.userChosen.friend'>
		<div
			v-for='item in $store.messages.contents' > 
			<div  v-if='$store.userProfile.username !== item.message_name_send'>
				<ContentReceive  :item='item'/>
			</div>
			<div v-else>
				<ContentSend :item='item'/>
			</div>
		</div>
	</div>
	<div v-if='$store.userChosen.room'>
		<div v-for='item in $store.messages.contents' > 
			<!-- {{$store.userProfile.username}}<br> -->
			<!-- {{item}} -->
			<div   class="croll-to-bottom-in-message" 
				v-if='$store.userProfile.username !== item.message_name_send'>
				<ContentReceive :item='item'/>
			</div>
			<div v-else>
				<ContentSend :item='item'/>
			</div>
		</div>
	</div>
</template>
<script>
import {scrollIntoViewBottom} from '@/services/untils.js'
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
				// console.log(data.message)
				const {id_message,createdAt,updatedAt,...content} = await data.message
				if(id_message === this.$store.userChosen.id_message){
					await this.$store.messages.contents.push(content)
					const myTimeout = setTimeout(()=>{
						scrollIntoViewBottom('croll-to-bottom')
					}, 500);
					scrollIntoViewBottom('croll-to-bottom')
				}
				
					

			});
			this.$socketInstant.on('GET-MESSAGES-FROM-ID-MESSAGE-STATUS', async data=>{
				// console.log(this.$store.userChosen)
				const {id_message,createdAt,updatedAt,...contents} = await data.messages

				this.$store.messages.contents = await Object.values(contents)
				// console.log(this.$store.messages.contents)
				const myTimeout = setTimeout(()=>{
					scrollIntoViewBottom('croll-to-bottom')
				}, 1000);
				scrollIntoViewBottom('croll-to-bottom')
			});
		},
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