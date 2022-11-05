<template>
<div class="userInfo">
	<div class="userInfo-child">
		<div class="userInfo-title">
			<img class="avarta-taskbar" src="../../assets/images/taskbar1.jpg">
			<div class="username">Tài khoản: {{user.username}}</div>
			<div class="id">id: {{user._id}}</div>
		</div>
		<div class="userInfo-info">
			<div class="name">Tên: {{user.name}}</div>
			<div class="phone">Số điện thoại: {{user.phone? user.phone:"Không có"}}</div>
			<div class="birthday">Ngày sinh: {{user.birthday? user.birthday: "Không có"}}</div>
			<div class="phone">Bạn bè: {{user.friend_number}}</div>
			<div class="birthday">Nhóm: {{user.room_member_number}}</div>
		</div>
	</div>
</div>
	<div class="table-name-friend check-is-friend" v-if='user.friend_number === 0'>Chưa có bạn bè</div>
	<div class="AdUser-cpn" v-else>
		<div class="table-name-friend">Danh sách bạn bè {{}}</div>
        <table class="list-account list-account-thead">
            <thead>
                <tr>
                    <th style="width: 5%;">Stt</th>
                    <th style="width: 18%;">Tên tài khoản</th>
                    <th style="width: 20%;">Tên</th>
                    <th style="width: 15%;">Số điện thoại</th>

                   	<th style="width: 10%;">Ngày sinh</th>
                    <!-- <th style="width: 10%;">Nhóm</th> -->
                    <th style="width: 15%;">Xem tin nhắn</th>
                    <th style="width: 7%;">Xóa</th>
                </tr>
            </thead>
        </table>
        <!-- {{friends}} -->
        <div class="croll-taskbar1">
        	<table class="list-account" id="list-account-content-id-AdUser">
	            <tbody >
					<tr class="list-account-content" v-for='(user,index) in friends'>
				
						<td style="width: 5%;">{{index+1}}</td>
						<td style="width: 18%;">{{user.username}}</td>
						<td style="width: 20%;">{{user.name}}</td>
						<td style="width: 15%;">{{user.phone? user.phone:"Không có"}}</td>
						<td style="width: 10%;">{{user.birthday? user.birthday: "Không có"}}</td>
						<!-- <td style="width: 10%;">{{user.room_number}}</td> -->
						<td style="width: 15%;">
							<router-link :to='"/admin/messages/" + user.id_message'>
								<i class="bi bi-eye-fill"></i>
							</router-link>
						</td>
						<td style="width: 7%;">
							<i @click='removeFriend(user.username,user.id_message)' class="bi bi-x-octagon-fill"></i>
						</td>
					</tr>
	                     
	            </tbody>
	        </table>

        </div>
	        
           
    </div>



	<div class="table-name-friend check-is-group" v-if='user.room_member_number === 0'>Chưa có nhóm</div>
	<div class="AdUser-cpn" v-else>
		<div class="table-name-friend">Danh sách Nhóm</div>
        <table class="list-account list-account-thead">
            <thead>
                <tr>
                    <th style="width: 5%;">Stt</th>
                    <th style="width: 25%;">Tên Nhóm</th>
                    <th style="width: 20%;">Tên trưởng nhóm</th>
                    <th style="width: 15%;">Số thành viên</th>
                    <th style="width: 15%;">Xem tin nhắn</th>
                    <th style="width: 7%;">Xóa</th>
                </tr>
            </thead>
        </table>
        <!-- {{groups}} -->
        <div class="croll-taskbar1 userInfo-croll-taskbar1" >
        	<table class="list-account" id="list-account-content-id-AdUser">
	            <tbody >
					<tr class="list-account-content" v-for='(group,index) in groups'>
						<td style="width: 5%;">{{index+1}}</td>
						<td style="width: 25%;">{{group.room_name}}</td>
						<td style="width: 20%;">{{group.room_admin}}</td>
						<td style="width: 15%;">{{group.room_member_number}}</td>
					
						<td style="width: 15%;">
							<router-link :to='"/admin/messages/" + group._id'>
								<i class="bi bi-envelope-open-fill"></i>
							</router-link>
						</td>
						<td style="width: 7%;">
							<i @click='exitGroup(group.room_name)' class="bi bi-x-octagon-fill"></i>
						</td>
					</tr>
	                     
	            </tbody>
	        </table>

        </div>
	        
           
    </div>
</template>
<script>
export default{
	data(){
		return{
			user: [],
			groups: [],
			friends: [],
		}
	},
	methods:{
		removeFriend(friendRemoved,id_message){
			var username = this.user.username
			this.$socketInstant.emit('REMOVE-FRIEND',{username,friendRemoved,id_message})
		},
		exitGroup(room_name){
			var username = this.user.username
			this.$socketInstant.emit('EXIT-GROUP',{username,room_name}) 
		}
	},
	mounted(){
		this.$socketInstant.on('ADMIN-GET-USER-INFO-STATUS', async data=>{
			this.user = data.user
			this.friends = data.friends
			this.groups = data.groups
		});
		this.$socketInstant.on('REMOVE-FRIEND-STATUS', async data=>{
			this.$socketInstant.emit('ADMIN-GET-USER-INFO',
				{username: this.$route.params.username})
		});
		this.$socketInstant.on('EXIT-GROUP-USER-STATUS', async data=>{
			this.$socketInstant.emit('ADMIN-GET-USER-INFO',
				{username: this.$route.params.username})
		})
	},
	created(){
		this.$socketInstant.emit('ADMIN-GET-USER-INFO',{username: this.$route.params.username})
	}
}
</script>
<style scoped>
.userInfo{
	width: 400px;
	margin: 1rem auto;
	background: white;
	min-height: 200px;
	border-radius: 20px;
	box-shadow: 5px 5px 5px #5f5f5f;
	text-align: center;
	background-position: bottom;
	background-image: url('../../assets/images/taskbar2.jpg');
	color: white;
}
.userInfo .userInfo-child{
	width: 100%;
	min-height: 200px;
	background-color: #164467ab;
	border-radius: 20px;
	padding: 1rem 0px;
}
.userInfo .userInfo-title{
	margin: 0px 0px 5px 0px;

	
}
.userInfo .userInfo-title .username{
	font-size: 20px;
	font-weight: bold;
}

.userInfo .userInfo-title .avarta-taskbar{
	width: 60px;
	height: 60px;
}
.userInfo .userInfo-title .id{
	width: 60%;
	padding-bottom: 5px;
	margin: 0 auto;
	border-bottom: 3px solid #0091ff;
	font-size: 13px;
}
 .userInfo .userInfo-info div{
 	padding: 5px 0;
 }

 .table-name-friend{
 	font-size: 23px;
 	font-weight: bold;
 	color: #0091ff;
 	padding: 1.6rem 0px 1rem 0px;
}
.userInfo-croll-taskbar1{
	margin-bottom: 80px;
	/*max-height: 300px;*/
}
.check-is-group{
	margin-left: 1rem;
	padding-left: 1rem;
	margin-bottom: 80px;

}
.check-is-friend{
	margin-left: 1rem;
	padding-left: 1rem;
}
</style>