<template>

			
	<div class="title">
		<div><h2 class="title-name" >NHÓM</h2></div>
		<!-- {{isAddFriendInGroup}} -->
		<!-- <div @click="alertDisplay" > -->
		<div @click='showCreateGroup()'>
			<i class="bi bi-people-fill"></i>
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
	<div v-if='isAddFriendInGroup'>
		<AlertCreateGroup groupName=""/>
	</div>
	
</template>
<script>
	import AlertCreateGroup from '@/components/notice/AlertCreateGroup.cpn.vue'
	export default{
		components:{AlertCreateGroup},
		data(){
			return {
				rooms: this.$store.rooms,
				search: "",
				checkFriend: [],
				isAddFriendInGroup: false,
				// groupName: "",
				// group:{
				// 	room_name: "",
				// 	room_member: [],
				// 	room_admin: "",
				// 	room_avatar: "",
				// }
			}
		},

		methods:{
			activeChosen(item,el){
				console.log(item.room._id)
				
				this.$store.$state.userChosen = item
				var taskbar = document.querySelectorAll(".taskbar-groups");
				taskbar.forEach(function(el) {
		      el.classList.remove("active");	   
		    });
				document.querySelector("#active" + item.room._id).classList.add("active")
			},
			alertDisplay(){
        this.$swal.fire({
        						title:'Create Group', 
        						input: 'text',
        						inputLabel: 'Group name',
        						inputPlaceholder: 'Enter your group name here',
        						background:'#272c3b', 
        						color: '#dedede',
        					}).then((res)=>{
						        	if(res.value){
						        		console.log('day la group')
						        			const room = {
						        				room_admin: this.$store.userProfile.username,
						        				room_member: [
						        							{
						        								username:this.$store.userProfile.username,
						        								name: this.$store.userProfile.name
						        							},
						        							{
						        								username:'thi',
						        								name: 'Tran Ngoc Thi'
						        							},{
						        								username:'thanh',
						        								name: 'Nguyễn Tuấn Thanh'
						        							},
						        							{
						        								username:'tai',
						        								name: 'Nguyễn Huu Tai'
						        							},
						        				],
						        				room_name: res.value,
						        				room_avartar: "", 
						        			}
												 	this.$socketInstant.emit('CREATE-GROUP',{room})
												 	this.$socketInstant.on('CREATE-GROUP-STATUS',(data)=>{
												 		
												 		this.$store.$state.rooms.push(data.R)
												 		console.log('create group',data)
												 		// console.log(this.$store.$state.rooms)
												 	})
						        	}
        					});
			},
			showCreateGroup(){
				this.isAddFriendInGroup = !this.isAddFriendInGroup
				console.log(this.isAddFriendInGroup)
				// if(this.isAddFriendInGroup){
				// 	document.getElementById('show-create-group').style.display = "block"
				// }
				// else{
				// 	document.getElementById('show-create-group').style.display = "none"
				// }
			},

			
		},
		created(){
		},
		mounted(){
			this.$socketInstant.on('REMOVE-GROUP-STATUS',async (data)=>{
					console.log('REMOVE-GROUP-STATUS',data)
					var temp = this.$store.$state.rooms.findIndex(obj =>
	                                obj.room.room_name === data.room_name 
	                            )
					console.log('temp',temp)
					// this.remove = true
					// console.log(this.remove)
					if(this.$store.userChosen.room){
						if(this.$store.userChosen.room.room_name === data.room_name){
							this.$store.userChosen = ""
						}
					}
					this.$store.$state.rooms.splice(temp,1)
			});

			this.$socketInstant.on('CREATE-GROUP-STATUS',(data)=>{
				var temp = this.$store.$state.rooms.find(obj =>
	                                obj.room.room_name === data.R.room.room_name 
	                            )
				console.log('create group temp',temp)
				if (!temp) {
			 		this.$store.$state.rooms.push(data.R)
			 		console.log('create group',data)
			 		this.isAddFriendInGroup = false
			 		document.getElementById('create-group-alert').style.display = "none"

			 		// console.log(this.$store.$state.rooms)
			 	}
			});


			this.$socketInstant.on('UPDATE-MEMBER_IN_GROUP-STATUS', async data=>{
				console.log(data)
				var temp = this.$store.$state.rooms.find(obj =>
	                                obj.room.room_name === data.R.room.room_name 
	                            )
				if (!temp) {
			 		this.$store.$state.rooms.push(data.R)
			 		console.log('create group',data)
			 	}
			})




		   
		   // 		console.log('isAddFriendInGroup',this.isAddFriendInGroup)

		   // 		var myAlert = document.getElementById('create-group-alert')
					// window.addEventListener('click', function (e) {
					// 	console.log(myAlert)
					// 	console.log('el', myAlert.contains(e.target))
					// 	// if(this.isAddFriendInGroup){
					// 		if (!myAlert.contains(e.target)){
					// 			var displayAlert = document.getElementById('create-group-alert').style.display
				 //          console.log('ngoai xgbcxv',displayAlert)
				 //          	document.getElementById('create-group-alert').style.display = 'none'
				 //          	console.log('ngoai xgbcxv')
				 //          	this.isAddFriendInGroup = false
				          
			  //       }
			  //     // }
					// })
		   }

		
		
	}
</script>
<style type="text/css">

/*.AddFriendInGroup{
	width: 100%;
	height: 500px;
	background: gray;
	position: relative;
	top: 0px;
	left: 100px;
}*/
#show-create-group{
	display: none;
}
</style>