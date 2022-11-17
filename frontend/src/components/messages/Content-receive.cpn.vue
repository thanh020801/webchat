<template>
<!-- 	<div class="message-send">
		<div class="avarta-message" >
			<img class="avartar-messase-img" src="../assets/images/spider3.jpg">
		</div>
		<div class="content-send-message">
			<div class="name-send">thanh</div>
			<div class="message-send-content">{{item.message_content}}</div>
			<div class="time-send">{{item.message_date}}</div>
		</div>
	</div> -->
	<div class="message-receive">
	<!-- 	<div class="avarta-message" >
			<img v-if='$store.userChosen.friend.avatar' 
				class="avartar-messase-img" 
				:src="$store.userChosen.friend.avatar">
			<img v-else class="avartar-messase-img" src="../../assets/images/spider3.jpg">
		</div> -->
		<div class="avarta-message" >
			<img v-if='item.avatar' 
				class="avartar-messase-img" 
				:src="item.avatar">
			<img v-else class="avartar-messase-img" src="../../assets/images/spider3.jpg">
		</div>
		<div class="content-receive-option">
			<div class="content-receive-message">
				<div class="name-receive">{{item.message_name_send}}</div>

				<div v-if='item.message_category === "text"' class="message-receive-content">{{item.message_content.toString()}}</div>

				<div class="message-receive-content-image" 
					v-else-if='item.message_category === "image/png" || 
						item.message_category === "image/jpeg"'	
				>
					<img :src="item.message_content">
				</div>

				<div class="message-receive-content-file" v-else>
					<i class="bi bi-file-earmark-text"></i> 
					<span>
						<a :href="item.message_content" target="_blank">
							{{item.message_content.split('/')[item.message_content.split('/').length-1]}}
						</a>
					</span>
					
				</div>


				<!-- <div class="time-receive">20:45</div> -->
				<div class="time-receive">{{fomatTime(item.message_date)}}</div>
				
			</div>
			<div class="message-option">
				<i class="bi bi-three-dots-vertical" ></i>
			</div>
		</div>
	</div>
</template>
<script>
import {userConfig} from '@/stores/userConfig.js'
	export default{
		data(){
			return {

			}
		},
		setup(){
			const configUser = userConfig()
			return {configUser}
		},
		props: ['item'],
		created(){
			// console.log("send")
			// console.log(this.item)
		},
		methods:{
			fomatTime(time){
				var date = new Date(time)
				return date.getHours()+':'+date.getMinutes() 
			}
		}
	}
</script>
<style type="text/css">
.message-receive{
	margin: 0.7rem;
	grid-template-columns: 40px auto;
	display: grid;
}
.avartar-messase-img{
	width: 30px;
	height: 30px;
	border-radius: 100%;
}
.content-receive-message{
	padding: 0.3rem 1rem;
	max-width: fit-content;
	border-radius: 10px;
}
.content-receive-option{
	display: flex;
}
.name-receive{
	font-size: 12px;
}
.time-receive{
	font-size: 11px;
}

.message-receive-content-image img{
	max-width: 300px;
	min-width: 100px;
	margin: 3px 0;
}
.message-receive-content-file{
	max-width: 400px;
	min-width: 100px;
	border-radius: 10px;
	margin: 3px 0;
	padding: 5px 10px;
	background-color: #dedede;
	line-height: 20px;
	cursor: pointer;
	
}
.message-receive-content-file .bi{
	color: black;
	font-size: 20px;
	margin-right: 5px;
}
.message-receive-content-file span a{
	color: black;
}
</style>