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
	<div class="message-receive" >
		<div class="avarta-message" >
			<img class="avartar-messase-img" src="../../assets/images/spider3.jpg">
		</div>
		<div class="content-receive-message">
			<div class="name-receive">{{item.message_name_send}}</div>
			<div class="message-receive-content">{{item.message_content}}</div>
			<div class="time-receive">{{fomatTime(item.message_date)}}</div>
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
	/*padding: 1rem;*/
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
	/*border:  1px solid black;*/
	/*background-color: brown;*/
	border-radius: 10px;
}
.name-receive{
	font-size: 12px;
	/*color: red;*/
}
.time-receive{
	font-size: 11px;
	/*color: #8d8484;*/
}
/*.message-send-content{
	font-size: 16px;
	color: white;
}*/
</style>