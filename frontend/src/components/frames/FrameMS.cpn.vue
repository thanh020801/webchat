<template>
	<div class="blank">
		<p class="">Hãy cùng nhau chia sẽ những kỹ niệm thú vị đi nào</p>
	</div>
	<!-- <ContentSend /> -->
	<!-- {{$store.messages.contents}} -->
	<!-- {{$store.userChosen.friend.username}} -->
	<div   v-if='$store.userChosen.friend'>
		<div
			v-for='item in messages' > 
			<div  v-if='$store.userProfile.username !== item.message_name_send'>
				<ContentReceive 
								:item='item'/>
			</div>
			<div v-else>
				<ContentSend 
								:item='item'/>
			</div>
		</div>
	</div>
	<div v-if='$store.userChosen.room'>
		<div v-for='item in messages' > 
			<!-- {{$store.userProfile.username}}<br> -->
			<!-- {{item}} -->
			<div   class="croll-to-bottom-in-message" 
				v-if='$store.userProfile.username !== item.message_name_send'>
				<ContentReceive 
								:item='item'/>
			</div>
			<div v-else>
				<ContentSend 
								:item='item'/>
			</div>
		</div>
	</div>
</template>
<script>
import {scrollIntoViewBottom} from '@/services/untils.js'
import ContentSend from '@/components/messages/Content-send.cpn.vue'
import ContentReceive from '@/components/messages/Content-receive.cpn.vue'
	export default{
		components:{
			ContentSend,ContentReceive
		},
		data(){
			return{
				messages: this.$store.messages.contents,
			}
		},
		methods:{
			showMessageSearch(){
				var taskbar = document.querySelectorAll(".content-message");
				taskbar.forEach(function(el) {
			     	el.classList.remove("search-MS");	   
			    });

				for(var item of this.$store.messages.searchMS){
					this.messages.find(ele=>{
						// console.log((item.message_count * 1000))
						if(item.message_count === ele.message_count){
							document.querySelector("#check-search" + (item.message_count * 1000)).classList.add("search-MS")
						}
					})	
				}

			}
		},
		watch: {
		 	'$store.messages.searchMS': function() {
		 		if(this.$store.messages.searchMS.length > 0){
					this.showMessageSearch()
		 		}else{
		 			var taskbar = document.querySelectorAll(".search-MS");
					taskbar.forEach(function(el) {
				     	el.classList.remove("search-MS");	   
				    });
		 		}
		    	
		 	},
		 	'$store.messages.contents': function() {
		 		this.messages = this.$store.messages.contents
		 		// this.messages = this.$store.messages.contents
				var taskbar = document.querySelectorAll(".search-MS");
				taskbar.forEach(function(el) {
			     	el.classList.remove("search-MS");	   
			    });
		 	}
		},
		mounted(){
			// this.showMessageSearch()
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

			this.$socketInstant.on('RECALL-MESSAGE-STATUS',async data=>{
				console.log('id_message',this.$store.messages.id_message)
				console.log('message', data.message)
				if (this.$store.messages.id_message === data.message.id_message) {
					const indexMessage = this.$store.messages.contents.findIndex(item=>
						item._id === data.message._id
					)
					console.log('indexMessage',indexMessage)
					if(indexMessage != -1){
						this.$store.messages.contents[indexMessage] = data.message
					}
					
				}
				
			})
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
	.search-MS{
		border: 3px solid black;
	}
</style>