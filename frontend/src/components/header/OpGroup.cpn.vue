<template>
		<div class="showOption croll-taskbar" id="showOptionId" >
			<div class="headerOption">
				<div class="avartarOption">
					<img class="avartar-header" src="../../assets/images/spider3.jpg">

				</div>
				<div class="nameOption">
					{{$store.userChosen.room.room_name}}
					
				</div>
				<div class="numberMember">	
					Số lượng thành viên: {{$store.userChosen.room.room_member.length}}
				</div>
			</div>
			<div class="memberOption underline"></div>
			<div class="croll-taskbar height-croll-taskbar">
				<div class="memberOption " v-for='friend in $store.userChosen.room.room_member'>
					<div class="member">
						<div>
							<img v-if='friend.avatar' class="avarta-taskbar" :src="friend.avatar">
							<img v-else class="avarta-taskbar" src="../../assets/images/spider3.jpg">
						</div>
						<div>
							<!-- {{friend}} -->
							{{friend.name}}
						<i class="bi bi-key-fill" v-if='friend.username === $store.userChosen.room.room_admin'></i>
						</div>
						<div v-if='$store.userChosen.room.room_admin === $store.userProfile.username'>
							<div v-if='!isChangeAdmin'>
								<i @click='ClickOutOfGroup(friend.username)' class="bi bi-x-circle-fill" style="color: red;"></i>
							</div>
							<div v-else>
								<input type="radio" :id='friend.username' :value="friend.username" v-model='getUsernameChangeAdmin'>
							</div>
							
						</div>
						
					</div>
				</div>
<!-- 				{{getUsernameChangeAdmin}}
 -->			</div>
			<!-- <div class="memberOption underline"></div> -->
			<div class="addFriendOption">
				<!-- @click='addFriendInGroup()' -->
				<button id='add-friend-in-group' 
						data-bs-toggle="modal" 
						data-bs-target="#addMemberInGroupModal"
						class="btn btn-success"  
						>
							Thêm thành viên
				</button>
				<button  class="btn btn-warning" @click='changeAdmin()' 
					v-if='!getUsernameChangeAdmin && $store.userChosen.room.room_admin === $store.userProfile.username'>
						Chuyển quyền trưởng nhóm
				</button>
				<button v-else class="btn btn-warning" @click='changeAdmin()' 
					v-if='$store.userChosen.room.room_admin === $store.userProfile.username'>
						Xác nhận
				</button>
				<button class="btn btn-danger" @click='exitGroup()'>Rời Nhóm</button>
				<button class="btn btn-danger" @click='removeGroup()'
					v-if='$store.userChosen.room.room_admin === $store.userProfile.username'
				>Giải tán nhóm
				</button>
			</div>
			<!-- <div class="footerOption"></div> -->
		</div>

		<!-- <div  class="" id="position-add-friend-in-group"> -->
			<!-- <AlertCreateGroup :groupName='$store.userChosen.room.room_name'/> -->
		<!-- </div> -->

		<div class="modal fade"  id="addMemberInGroupModal" tabindex="-1" aria-labelledby="addMemberInGroupModalLabel" aria-hidden="true">
		  <div class="modal-dialog" style="width: 350px;">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title" id="addMemberInGroupModalLabel">Cập nhật nhóm</h5>
		        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		      </div>
		      <div class="modal-body" style="font-size: 15px; ">
		        
				  <div class="create-group-name">
				  	Tên nhóm: <h3>{{$store.userChosen.room.room_name}}</h3>
					<!-- Tên nhóm: <input type="text" v-model='group.room_name'  placeholder="Nhập tên nhóm..." required> -->
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
		        				@click='updateGroup()'>
		        					Cập nhật
		        </button>
		      </div>
		    </div>
		  </div>
		</div>

</template>
<script>
import AlertCreateGroup from '@/components/notice/AlertCreateGroup.cpn.vue'

export default{
	components:{AlertCreateGroup},
	data(){
		return{
			isChangeAdmin:false,
			getUsernameChangeAdmin:"",
			group:{
				room_name: this.$store.userChosen.room.room_name,
				room_member: [],
				room_admin: "",
				room_avatar: "",
			}
			// remove :false,
			// isAddFriendInGroup: false,
		}
	},
	methods:{
		updateGroup(){
			var room_member = []
			// var room_name_old = this.$store.userChosen.room.room_name
			// console.log('room_member',this.group.room_member)
     		// console.log('room_name',this.group.room_name)
     		// console.log('room_name_old',room_name_old)
			// console.log('member', this.group.room_member)
			// console.log('chosen' , this.$store.userChosen.room.room_member)
			for(var item1 of this.group.room_member){
				// console.log('item',item1.username)
				var flag = false
				for(var item2 of this.$store.userChosen.room.room_member){
					if(item2.username === item1.username){
						flag = true
						break
					}
				}
				if(!flag){
					// console.log('push',item1)
					room_member.push(item1)
					// var temp = this.$store.$state.rooms.find(obj =>{
					// 	if(obj.room.room_name === this.groupName){
					// 		obj.room.room_member.push(item1)
					// 	}
					// })
	                                
	         		
    

				}
			}
			console.log('room_member',room_member)
	         		// console.log('room_name',room_name)
	         		// console.log('room_name_old',room_name_old)
			this.$socketInstant.emit('UPDATE-MEMBER_IN_GROUP',
				{room_member,room_name: this.group.room_name})

		 	this.group = {
				 	room_name: "",
					room_member: [],
					room_admin: "",
					room_avatar: "",
			}
		},
		ClickOutOfGroup(friendName){
			console.log(friendName)
			this.$socketInstant.emit('EXIT-GROUP',{
				username: friendName,
				room_name: this.$store.userChosen.room.room_name})
		},
		changeAdmin(){
			this.isChangeAdmin = !this.isChangeAdmin
			console.log('isChangeAdmin',this.isChangeAdmin)
			if(this.getUsernameChangeAdmin){
				console.log('getUsernameChangeAdmin', this.getUsernameChangeAdmin)
				this.$socketInstant.emit('CHANGE-ADMIN-IN-GROUP',
					{
						room_name: this.$store.userChosen.room.room_name,
						changeUsername: this.getUsernameChangeAdmin

					})
				this.isChangeAdmin = false
				this.getUsernameChangeAdmin = ""
			}
			
		},
		addFriendInGroup(idShow,clickicon){
			document.addEventListener('click',(e)=>{
				const myclick = document.getElementById(idShow)
				const myclickicon = document.getElementById(clickicon)
				if(myclick && myclickicon){
					if(myclickicon.contains(e.target)){
						myclick.style.display = 'block'
						console.log('click icon')
					}
					else if(!myclick.contains(e.target)){
						myclick.style.display = 'none'
					}
				}
			})
		},
		removeGroup(){
			this.$socketInstant.emit('REMOVE-GROUP', 
				{room: this.$store.userChosen.room})
		},
		exitGroup(){
			this.$socketInstant.emit('EXIT-GROUP',{username: this.$store.userProfile.username,room_name: this.$store.userChosen.room.room_name})
					// var temp = this.$store.$state.rooms.findIndex(obj =>
		   //                              obj.room.room_name === this.$store.userChosen.room.room_name 
		   //                          )
			// this.$store.userChosen = ""
		}
	},
	mounted(){
		this.addFriendInGroup('position-add-friend-in-group','add-friend-in-group');
		// this.$socketInstant.on('UPDATE-MEMBER_IN_GROUP-STATUS', async data=>{
		// 		console.log(data)
		// 		var temp = this.$store.$state.rooms.find(obj =>
	    //                             obj.room.room_name === data.R.room.room_name 
	    //                         )
		// 		if (!temp) {
		// 	 		await this.$store.$state.rooms.push(data.R)
		// 	 		console.log('create group',data)
		// 	 	}
		// 	});

		this.$socketInstant.on('CHANGE-ADMIN-IN-GROUP-STATUS',
			async (data)=>{
				console.log('R',data.R.room)
				var temp = this.$store.$state.rooms.findIndex(obj =>{
					if(obj.room.room_name === data.R.room.room_name){
						obj.room = data.R.room
						this.isChangeAdmin = false
						if(this.$store.userChosen.room){
							if(this.$store.userChosen.room.room_name === data.R.room_name){
								this.$store.userChosen = data.R.room
							}
						}
					} 
				})
		    	console.log(temp)
		    	this.isChangeAdmin = false
				this.getUsernameChangeAdmin = ""
		});
	}
}
</script>
<style type="text/css">
.memberOption .member{
	display: grid;
	grid-template-columns: 1.2fr 3fr 0.6fr;
}
/*.AddFriendInGroup{
	width: 100%;
	height: 100vh;
	background-color: green;
	z-index: 1000;
	position: fixed;

}*/

#position-add-friend-in-group{
	position: absolute;
	top: 236px;
	left: 16.7%;
	/*display: none;*/
/*	top: 50;
	left: 50%;*/
}

</style>