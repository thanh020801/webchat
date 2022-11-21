<template>
		<div id="create-group-alert"  class="alert alert-secondary align-items-center position-absolute top-50 start-50 translate-middle " role="alert">
			<div class="title-create-group" v-if='groupName'>Thêm thành viên</div>
			<div class="title-create-group" v-else>Tạo nhóm</div>
			<div class="create-group">
				
			  <div class="create-group-name" v-if='groupName'>
			  	Tên nhóm: {{groupName}}
			  </div>
			  <div class="create-group-name" v-else>
			  	<input type="text" v-model='group.room_name' placeholder="Nhập tên nhóm...">
			  </div>
			  <div>Thêm bạn vào nhóm</div>
				<!-- {{group.room_member}} -->
			  <div class="list-friend-add-in-group croll-taskbar">
			  		<div class="member" v-for='item in $store.friends'>
								<div>
									<img class="avarta-taskbar" src="../../assets/images/spider3.jpg">
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
			  <div class="confirm-create-group">
			  	<button v-if='groupName' @click='updateMemberGroup()' 
			  		class="btn btn-primary">Cập nhật</button>
			  	<button v-else @click='createGroup()' class="btn btn-primary">Tạo</button>
			  </div>
			</div>
	
		</div>
</template>
<script>
export default{
	data(){
		return{
			group:{
				room_name: "",
				room_member: [],
				room_admin: "",
				room_avatar: "",
			}
		}
	},
	props: ['groupName'],
	methods:{
		createGroup(){
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
			document.getElementById('createGroup').style.display = "none"
		},
		updateMemberGroup(){
			var room_member = []
			// console.log('member', this.group.room_member)
			// console.log('chosen' , this.$store.userChosen.room.room_member)
			for(var item1 of this.group.room_member){
				console.log('item',item1.username)
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
					var temp = this.$store.$state.rooms.find(obj =>{
						if(obj.room.room_name === this.groupName){
							obj.room.room_member.push(item1)
						}
					})
	                                
	         		// console.log('room_member',room_member)
					this.$socketInstant.emit('UPDATE-MEMBER_IN_GROUP',
						{room_member,room_name: this.groupName})
    

				}
			}
			document.getElementById('position-add-friend-in-group').style.display = "none"
		 	this.group = {
				 	room_name: "",
					room_member: [],
					room_admin: "",
					room_avatar: "",
			}
			// console.log('them thanh vien cho nhom')
		},
	},
}
</script>
<style type="text/css">
/*#create-group-alert{
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
	background-color: #EEEFF2;
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
}
.list-friend-add-in-group .member div img{
}
.confirm-create-group button{
	position: absolute;
	bottom: 10px;
	right: 20px;
}*/
</style>