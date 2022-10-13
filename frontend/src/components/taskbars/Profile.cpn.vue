<template>
	<div class="title">
			<h2 class="title-name" >Profile</h2>
	</div>

	<!-- <div class="croll-taskbar"> -->
		<div class="taskbar-profile" v-if='!convertProfile'>
			<div class="avartar-profile">
				<img src="../../assets/images/spider3.jpg"  >
			</div>
			<div class="info-profile">
				<div class="info-profile-name">
					<div>Name: </div><div class="info-profile-value">{{userProfile_EX.name}}</div>
				</div>
				<div class="info-profile-name">
					<div>Username: </div><div class="info-profile-value">{{userProfile_EX.username}}</div>
				</div>		
				<div class="info-profile-name">
					<div>Birthday: </div><div class="info-profile-value">{{userProfile_EX.birthday}}</div>
				</div>			
				<div class="info-profile-name">
					<div>Phone: </div><div class="info-profile-value">{{userProfile_EX.phone}}</div>
				</div>
				<div class="info-profile-name">
					<div>Friends: </div><div class="info-profile-value">{{friend_EX.friend_listfriendID.length}} people</div>
				</div>
				<div class="info-profile-name">
					<div>Rooms: </div><div class="info-profile-value">{{userProfile_EX.room}} room</div>
				</div>

			</div>
			<div class="change-profile">
				<div class="btn btn-primary" @click='updateProfile'><i class="bi bi-pencil-square"></i> Chỉnh sửa</div>
			</div>
		</div>


		<div class="taskbar-profile" v-else>
			<div class="avartar-profile">
				<img src="../../assets/images/spider3.jpg"  >
			</div>
			<div class="info-profile">
				<div class="info-profile-name">
					<div>Name: </div>
					<div class="info-profile-value">
						<input type="text" v-model='dataChange.name'>
					</div>
				</div>	
				<div class="info-profile-name">
					<div>Birthday: </div>
					<div class="info-profile-value">
						<input type="text" v-model='dataChange.birthday'>
					</div>
				</div>			
				<div class="info-profile-name">
					<div>Phone: </div>
					<div class="info-profile-value">
						<input type="text" v-model='dataChange.phone'>
					</div>
				</div>

			</div>
			<div class="change-profile">
				<div class="btn btn-primary" @click='updateProfile()'>
					<i class="bi bi-pencil-square"></i>Confirm
				</div>
			</div>
		</div>		
	<!-- </div> -->

</template>
<script>
	import {TestStore} from '@/stores/test.js'
	export default{
		data(){
			return {
				convertProfile : false,
				dataChange: "",
			}
		},
		setup(){
			const {userProfile_EX,friend_EX,room_EX} = TestStore()
			return {userProfile_EX,friend_EX,room_EX}
		},
		methods:{
			updateProfile(){
				if(!this.convertProfile){
					this.convertProfile = true
					this.dataChange = this.userProfile_EX
					// console.log(this.dataChange)
				}else{
					this.convertProfile = false
					this.userProfile_EX = this.dataChange
				}
				
				// console.log(this.dataChange.name)
			},
			alertDisplay(){
		        this.$swal.fire({title:'Create Group', 
		        						input: 'text',
		        						inputLabel: 'Group name',
		        						inputPlaceholder: 'Enter your group name here',
		        						background:'#272c3b', 
		        						color: '#dedede',
		        					}).then((res)=>{
		        	console.log(res.value)
		        });
		        // console.log(this.$swal)
			}
		}
	}
</script>
<style type="text/css">
.title-profile{
	padding: 0.5rem 2rem;
}
.taskbar-profile {
	width: 100%;
	padding: 0.5rem 2rem;
}
.avartar-profile{
	width: 100px;
	margin: 0 auto;
}
.avartar-profile img{
	width: 100px;
	height: 100px;
	border-radius: 100%;
	margin: 0 auto;
	margin-bottom: 1rem;
}
/*.info-profile{
	color: #dedede;
}*/
.info-profile-name{
	grid-template-columns: 30% auto;
  	display: grid;
	width: 100%;
	padding: 0.3rem 0;
}
.info-profile-value{
	text-align: right;
}
.change-profile{
	margin-top: 1.5rem;
	width: 100%;
	justify-content: right;
	justify-items: right;
}
.change-profile .btn-primary{
	text-align: right;
	float: right;
}

.info-profile-value input{
	background-color: #3b728b;
	border: none;
	border-radius: 3px;
	color: wheat;
	padding: 0.3rem 0.5rem;
}
 .info-profile-value input:focus{
 	border: none;
 	outline: none;
 }
</style>