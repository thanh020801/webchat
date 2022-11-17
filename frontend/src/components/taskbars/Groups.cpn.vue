<template>

			
	<div class="title" >
		<div><h2 class="title-name" >NHÓM</h2></div>
		<!-- {{isAddFriendInGroup}} -->
		<!-- <div @click="alertDisplay" > -->
		<div id='isShow'>
			<i class="bi bi-people-fill" id=""></i>
		</div>
	</div>
		<div class="search-taskbar">
      <div class="d-flex">
      	<button class="search-taskbar-submit" type="submit"><i class="bi bi-search"></i></button>
        <input class="search-taskbar-input " type="text" placeholder="Search ..." aria-label="Search">
      </div>
    </div>
<!-- {{$store.rooms}} -->
	<div class="croll-taskbar">
		<div 	class="taskbar taskbar-groups" 
					:id='"active" + item.room._id' 
					v-for="item in rooms"
					@click='activeChosen(item,$event)' 
		>
		

			<!-- <div class="name-taskbar">{{item}}</div> -->
			<div class="avartar-taskbar">
				<img class="avarta-taskbar" src="../../assets/images/spider3.jpg">
			</div>
			<div class="name-taskbar">
				<div class="name-taskbar">{{item.room.room_name}}</div>
			</div>
		</div>
	</div>
	<!-- <div class="fullbg-alert" id='createGroupShowHide'> -->
		<!-- <div v-if='isAddFriendInGroup1' > -->
		<div id='createGroup'>
				<AlertCreateGroup groupName="" />
		</div>
	<!-- </div> -->
</template>
<script>
	import {scrollIntoViewBottom} from '@/services/untils.js'
	import AlertCreateGroup from '@/components/notice/AlertCreateGroup.cpn.vue'
	import {Alert} from 'bootstrap'
	export default{
		components:{AlertCreateGroup},
		data(){
			return {
				rooms: this.$store.rooms,
				search: "",
			}
		},

		methods:{
			activeChosen(item,el){
				// console.log(item.room._id)
				// console.log(item.friend.friend_id)
				this.$store.$state.userChosen = item
				// console.log(item)
				// this.$store.$state.messages = {id_message:item.id_message}
				this.$socketInstant.emit('GET-MESSAGES-FROM-ID-MESSAGE',{username:this.$store.userProfile.username,id_message:item.id_message})
				this.$store.messages.id_message = item.id_message
				console.log('chosen in room',this.$store.messages.id_message)
				var taskbar = document.querySelectorAll(".taskbar-groups");
				taskbar.forEach(function(el) {
		      el.classList.remove("active");	   
		    });
				document.querySelector("#active" + item.room._id).classList.add("active")

			},
			showHideAlertCreateGroup(idShow,clickicon){
					document.addEventListener('click',(e)=>{
						const myclick = document.getElementById(idShow)
						const myclickicon = document.getElementById(clickicon)
						if(myclick && myclickicon){
							if(myclickicon.contains(e.target)){
								myclick.style.display = 'block'
								// console.log('click icon')
							}
							else if(!myclick.contains(e.target)){
								myclick.style.display = 'none'
							}
						}
					})
			}
		},
		mounted(){
			this.showHideAlertCreateGroup('createGroup','isShow')

			this.$socketInstant.on('REMOVE-GROUP-STATUS',async (data)=>{
					console.log('REMOVE-GROUP-STATUS',data)
					var temp = this.$store.$state.rooms.findIndex(obj =>
	                                obj.room.room_name === data.room_name 
	                            )
					console.log('temp REMOVE-GROUP-STATUS',temp)
					// this.remove = true
					// console.log(this.remove)
					if(this.$store.userChosen.room){
						if(this.$store.userChosen.room.room_name === data.room_name){
							this.$store.userChosen = ""
						}
					}
					this.$store.$state.rooms.splice(temp,1)
			});

			this.$socketInstant.on('CREATE-GROUP-STATUS',async (data)=>{
				var temp = this.$store.$state.rooms.find(obj =>
	                                obj.room.room_name === data.R.room.room_name 
	                            )
				// console.log('create group temp',temp)
				if (!temp) {
			 		await this.$store.$state.rooms.push(data.R)
			 		// console.log('create group',data)
			 			// document.getElementById('createGroup').style.display = "none"
			 	}
			});

			this.$socketInstant.on('EXIT-GROUP-MEMBER-STATUS', async data=>{
				console.log('EXIT-GROUP-MEMBER-STATUS',data)
				var temp = this.$store.$state.rooms.findIndex(obj =>{
					if(obj.room.room_name === data.R.room.room_name ){
						obj.room = data.R.room
					}
				})
			});
			this.$socketInstant.on('EXIT-GROUP-USER-STATUS', async data=>{
				console.log('EXIT-GROUP-USER-STATUS',data)
				var temp = this.$store.$state.rooms.findIndex(obj =>
	                                obj.room.room_name === data.room_name 
	                            )
				this.$store.$state.rooms.splice(temp,1)
				this.$store.userChosen = ""
			});


			this.$socketInstant.on('UPDATE-MEMBER_IN_GROUP-STATUS', async data=>{
				console.log(data)
				var temp = this.$store.$state.rooms.find(obj =>
	                                obj.room.room_name === data.R.room.room_name 
	                            )
				if (!temp) {
			 		await this.$store.$state.rooms.push(data.R)
			 		console.log('create group',data)
			 	}
			});

			this.$socketInstant.on('GET-ALL-GROUPS-STATUS',async data=>{
				// console.log(data.rooms)
				this.$store.rooms = await data.rooms
			});




					},
	}
</script>
<style type="text/css">
.fullbg-alert{
	width: 100%;
	height: 100vh;
	background: green;
}
#createGroup{
	display: none;
}
</style>