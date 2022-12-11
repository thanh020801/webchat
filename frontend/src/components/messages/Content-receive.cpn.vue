<template>
	<div class="message-receive">
		<div class="avarta-message" >
			<img v-if='item.avatar' 
				class="avartar-messase-img" 
				:src="item.avatar">
			<img v-else class="avartar-messase-img" src="../../assets/images/spider3.jpg">
		</div>
		<div class="content-receive-option"> 
			<div class="content-receive-message content-message" 
				:id='"check-search" + (item.message_count * 1000)'>
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
						<router-link :to="path='/viewer/'+ item.message_content.split('/')[item.message_content.split('/').length-1] ">
							{{item.message_content.split('/')[item.message_content.split('/').length-1]}}
						</router-link>
					</span>
					
				</div>


				<!-- <div class="time-receive">20:45</div> -->
				<div class="time-receive">{{fomatTime(item.message_date)}}</div>
				
			</div>
			<div v-if='$store.userChosen.room'>				
				<div class="message-option" v-if='$store.userChosen.room.room_admin === $store.userProfile.username'>
					<i class="bi bi-three-dots-vertical" 
						@click='isOptionInMessage=!isOptionInMessage'>	
					</i>
					<div class="alert alert-primary option-in-message-recieve" 
						v-if='isOptionInMessage' 
						role="alert" 
						@click='recallMessage(item)'
					>
						Thu hồi
					</div>

				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return {
			isOptionInMessage: false,
		}
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
		},
		recallMessage(message){
			this.isOptionInMessage = ! this.isOptionInMessage
			console.log(message)

			var chosen= this.$store.userChosen
			// console.log(chosen)
			if(chosen.room){
				this.$socketInstant.emit('RECALL-MESSAGE',
					{message,room_name: chosen.room.room_name,friend_name: ""})
			}
			// this.$socketInstant.emit('RECALL-MESSAGE', message)
		}
	}
}
</script>
<style type="text/css">
.message-option{
	position: relative;
	
}
.option-in-message-recieve{
	width: 80px;
	position: absolute;
	left: 5px;
/*	padding: 0px;*/
	display: block;
	text-align: center;
	cursor: pointer;
}
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