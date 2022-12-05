<template>

			
	<div class="title" >
		<div><h2 class="title-name" >NHÓM</h2></div>
		<!-- {{isAddFriendInGroup}} -->
		<!-- <div @click="alertDisplay" > -->
		
		<div type="button" class="" data-bs-toggle="modal" data-bs-target="#exampleModal">
		<i class="bi bi-people-fill" id=""></i>
		</div>

		<div class="modal fade"  id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		  <div class="modal-dialog" style="width: 350px;">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title" id="exampleModalLabel">Tạo nhóm</h5>
		        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		      </div>
		      <div class="modal-body" style="font-size: 15px; ">
		        
		      	<div class="create-group-name">
					  	Tên nhóm: <input type="text" v-model='group.room_name'  placeholder="Nhập tên nhóm..." required>
					  </div>
					  <div>Thêm bạn vào nhóm</div>

					  <div class="list-friend-add-in-group croll-taskbar" style="height: 150px">
				  		<div class="member" v-for='item in $store.friends'>
									<div>
										<img class="avartar-header" 
											v-if='item.friend.avatar' 
											:src="item.friend.avatar">
										<img v-else class="avartar-header" src="../../assets/images/spider3.jpg">
									</div>
									<div>
										{{item.friend.name}}
									</div>
									<div class="">
										<input  type="checkbox" :id='item.friend.username' 
										:value="{name:item.friend.name,username:item.friend.username}" 
										v-model='group.room_member'>
									</div>							
															
							</div>
				  	</div>

		      </div>
		      <div class="modal-footer">
		        <button type="button" 
		        				class="btn btn-secondary" 
		        				data-bs-dismiss="modal">
		        					Thoát
		        </button>
		        <button type="button" 
		        				class="btn btn-primary" 
		        				data-bs-dismiss="modal"
		        				@click='createGroup()'>
		        					Tạo
		        </button>
		      </div>
		    </div>
		  </div>
		</div>




<!-- 		<div id='isShow'>


			<i class="bi bi-people-fill" id=""></i>
		</div> -->
	</div>
		<div class="search-taskbar">
      <div class="d-flex">
      	<button class="search-taskbar-submit" type="submit"><i class="bi bi-search"></i></button>
        <input class="search-taskbar-input " v-model='searchGroup' type="text" placeholder="Search ..." aria-label="Search">
      </div>
    </div>
<!-- {{$store.rooms}} -->
	<div class="croll-taskbar">
		<div 	class="taskbar taskbar-groups" 
					:id='"active" + item.room._id' 
					v-for="item in rooms"
					@click='activeChosen(item,$event)' 
		>
				<!-- {{item.room.room_member}} -->

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
				searchGroup: "",
				group:{
					room_name: "",
					room_member: [],
					room_admin: "",
					room_avatar: "",
				}
			}
		},

		methods:{
			activeChosen(item,el){
				this.$store.userChosen = item

				this.$socketInstant.emit('GET-MESSAGES-FROM-ID-MESSAGE',{username:this.$store.userProfile.username,id_message:item.id_message})
				this.$store.messages.id_message = item.id_message
				// console.log('chosen in room',this.$store.messages.id_message)
				var taskbar = document.querySelectorAll(".taskbar-groups");
				taskbar.forEach(function(el) {
		      el.classList.remove("active");	   
		    });
				document.querySelector("#active" + item.room._id).classList.add("active")

			},
			search(){
        if (this.searchGroup) {
        		// console.log('this.searchFriend',this.searchFriend)
            var result = this.$store.rooms.filter(item => {
                return this.searchGroup
                    .toLowerCase()
                    .split(" ")
                    .every(v => item.room.room_name.toLowerCase().includes(v));
            });
        }
        console.log('result',result)
        // this.rooms = result ? result : this.$store.rooms
        return result ? result : this.$store.rooms
        console.log('rooms',this.rooms)
			},
			createGroup(){
				if(this.group.room_name === "") return
				this.group.room_member.push({
						username:this.$store.userProfile.username,
						name: this.$store.userProfile.name,
						// avatar: this.$store.userProfile.avatar
					})
				const room = {
					room_admin: this.$store.userProfile.username,
					room_member: this.group.room_member,
					room_name: this.group.room_name,
					room_avartar: "", 
				}
				console.log(room)
				this.$socketInstant.emit('CREATE-GROUP',{room})
				console.log('CREATE-GROUP kk')
			 	this.group = {
					 	room_name: "",
						room_member: [],
						room_admin: "",
						room_avatar: "",
				}
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
					var temp = this.$store.rooms.findIndex(obj =>
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
					this.$store.rooms.splice(temp,1)
			});

			this.$socketInstant.on('CREATE-GROUP-STATUS',async (data)=>{
				var temp = this.$store.rooms.find(obj =>
	                                obj.room.room_name === data.R.room.room_name 
	                            )
				console.log('create group temp',temp)
				if (!temp) {
			 		this.$store.rooms.push(data.R)
			 		// console.log('create group',data)
			 			// document.getElementById('createGroup').style.display = "none"
			 	}
			});

			this.$socketInstant.on('EXIT-GROUP-MEMBER-STATUS', async data=>{
				console.log('EXIT-GROUP-MEMBER-STATUS',data)
				let flag = false
				var temp = this.$store.rooms.findIndex(obj =>{
					if(obj.room.room_name === data.R.room.room_name ){
						obj.room = data.R.room
						if(obj.room.room_name === this.$store.userChosen.room?.room_name){
							this.$store.userChosen = obj
						}
					}
				})
				this.rooms = this.$store.rooms
			});
			this.$socketInstant.on('EXIT-GROUP-USER-STATUS', async data=>{
				console.log('EXIT-GROUP-USER-STATUS',data)
				var temp = this.$store.rooms.findIndex(obj =>
	                                obj.room.room_name === data.room_name 
	                            )
				this.$store.rooms.splice(temp,1)
				this.rooms = this.$store.rooms
				this.$store.userChosen = ""
			});

			this.$socketInstant.on('UPDATE-MEMBER_IN_GROUP-STATUS', async data=>{
				console.log(data)
				let flag = false
				var temp = this.$store.rooms.find(obj =>{
					if(obj.room.room_name === data.R.room.room_name){
						flag = true
						obj.room = data.R.room
						// obj.id_message = data.R.id_message
						console.log('obj', obj)
						if(obj.room.room_name === this.$store.userChosen.room?.room_name){
							this.$store.userChosen = obj
						}
					}
				})
				if(!flag){
					console.log('push')
					this.$store.rooms.push(data.R)
					this.rooms = this.$store.rooms
				}
			});



			this.$socketInstant.on('GET-ALL-GROUPS-STATUS',async data=>{
				console.log(data.rooms)
				this.$store.rooms =  data.rooms
			});




		},
		created(){
		},
		watch:{
			'$store.rooms'(){
				this.rooms = this.$store.rooms
			},
			searchGroup(){
				this.rooms= this.search()
			}
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
#create-group-alert{
	width: 350px;
	height: 400px;
	z-index: 200000;
	padding: 0px;
	position: relative;
	background-color: #EEEFF2;

}
.create-group{
	padding: 1rem;
}
#create-group-alert .title-create-group{
	width: 100%;
	font-size: 20px;
	color: white;
	font-weight: bold;
	background-color: #0091ff;
	padding: 10px 20px;
}
#create-group-alert div{
	align-items: center;
	padding-top: 5px;
}
.list-friend-add-in-group{
	width: 100%;
	height: 200px;
}
.create-group-name input{
	width: 100%;
	height: 40px;
	border: none;
	background-color: #fff;
	border-bottom: 1px solid #0091ff;
	margin-bottom: 10px;
}
.create-group-name input:focus{
		border: none;
		outline: none;
		border-bottom: 1px solid #0091ff;
}
.list-friend-add-in-group .member{
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 3fr 0.6fr;
	padding: 5px 0;
	align-items: center;
}
.list-friend-add-in-group .member div img{
	width: 30px;
	height: 30px;
}
.confirm-create-group button{
	position: absolute;
	bottom: 10px;
	right: 20px;
}
</style>