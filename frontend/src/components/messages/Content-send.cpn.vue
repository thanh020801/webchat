<template>
<!-- 	<div class="message-send" :id="`num-${item.message_count}`" >
		<div class="content-send-message">
			<div class="name-send">Bạn</div>
			<div class="message-send-content">{{item.message_content}}</div>
			<div class="time-send">{{fomatTime(item.message_date)}}</div>

		</div>
	</div> -->
<!-- {{item.message_content}} -->
	<div class="message-send" :id="`num-${item.message_count}`" >
		<div class="message-option">
			 <i class="bi bi-three-dots-vertical" ></i>
		</div>
		<div class="content-send-message">
			<div class="name-send">Bạn</div>
			

			<div v-if='item.message_category === "text"' 
			class="message-send-content">{{item.message_content.toString()}}</div>

			<div class="message-receive-content-image" 
				v-else-if='item.message_category === "image/png" || 
					item.message_category === "image/jpeg"'	
			>
				<!-- {{item.message_content}} -->
				<img :src="item.message_content">
				<!-- <img src="http://localhost:5000/uploads/e52e98eaf46e96bf32795b285b1d826e.PNG"> -->
			</div>

			<div class="message-send-content-file" v-else>
				<i class="bi bi-file-earmark-text"></i> 
				<span>
					<a :href="item.message_content" target="_blank">
						{{item.message_content.split('/')[item.message_content.split('/').length-1]}}
					</a>
				</span>
				
			</div>


			<div class="time-send">{{fomatTime(item.message_date)}}</div>

		</div>

	</div>
</template>
<script>
// import {fomatTime} from '@/services/untils.js'
	export default{
		data(){
			return{
				// time: new Date(this.item.date)
			}
		},
		props: ['item'],
		methods:{
			fomatTime(time){
				var date = new Date(time)
				return date.getHours()+':'+date.getMinutes() 
			}
		}
	}
</script>
<style type="text/css">
.message-option .bi{
	color: black;
}
.message-send{
	margin: 0.5rem;
	display: flex;
	justify-content: flex-end;
}

.content-send-message{
	padding: 0.5rem 1rem;
	max-width: fit-content;
	border-radius: 10px;
}
.name-send{
	font-size: 12px;
	color: white;
}
.time-send{
	font-size: 11px;
/*	color: #8d8484;
*/}
.message-send-content{
	font-size: 16px;
	color: white;
}


.message-send-content-file{
	max-width: 400px;
	min-width: 100px;
	border-radius: 10px;
	margin: 3px 0;
	padding: 5px 10px;
	background-color: #dedede;
	line-height: 20px;
	cursor: pointer;
	
}
.message-send-content-file .bi{
	color: white;
	font-size: 20px;
	margin-right: 5px;
}
.message-send-content-file span a{
	color: black;
}
</style>