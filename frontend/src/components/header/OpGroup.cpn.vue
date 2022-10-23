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
							<img class="avarta-taskbar" src="../../assets/images/spider3.jpg">
						</div>
						<div>
							{{friend.name}}
						<i class="bi bi-key-fill" v-if='friend.username === $store.userChosen.room.room_admin'></i>
						</div>
						<div v-if='$store.userChosen.room.room_admin === $store.userProfile.username'>
							<div v-if='!isChangeAdmin'>
								<i  class="bi bi-x-circle-fill" style="color: red;"></i>
							</div>
							<div v-else>
								<input type="radio" :id='friend.username' :value="friend.username" v-model='getUsernameChangeAdmin'>
							</div>
							
						</div>
						
					</div>
				</div>
				{{getUsernameChangeAdmin}}
			</div>
			<!-- <div class="memberOption underline"></div> -->
			<div class="addFriendOption">
				<button class="btn btn-success"  @click='addFriendInGroup()'>Thêm thành viên</button>
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

		<div v-if='isAddFriendInGroup' class="" id="position-add-friend-in-group">
			<AlertCreateGroup :groupName='$store.userChosen.room.room_name'/>
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
			remove :false,
			isAddFriendInGroup: false,
		}
	},
	methods:{
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
		addFriendInGroup(){
			this.isAddFriendInGroup = !this.isAddFriendInGroup
			console.log(this.isAddFriendInGroup)
		},
		removeGroup(){
			this.$socketInstant.emit('REMOVE-GROUP', 
				{room: this.$store.userChosen.room})


		},
		exitGroup(){
			this.$socketInstant.emit('EXIT-GROUP',{username: this.$store.userProfile.username,room_name: this.$store.userChosen.room.room_name})
			var temp = this.$store.$state.rooms.findIndex(obj =>
                                obj.room.room_name === this.$store.userChosen.room.room_name 
                            )
			this.$store.userChosen = ""
			this.$store.$state.rooms.splice(temp,1)
		}
	},
	mounted(){
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
		})
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
/*	top: 50;
	left: 50%;*/
}

</style>