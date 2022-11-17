<template>
	<div class="title" >
		<div><h2 class="title-name" >CÁ NHÂN</h2></div>
		<div v-if='$store.userProfile.admin'>
			<router-link to='/admin'>
				<i class="bi bi-gear-fill" id=""></i>
			</router-link>
		</div>
	</div>

		<div class="taskbar-profile" v-if='!convertProfile'>
			<div class="avatar-profile">
				<img :src="$store.userProfile.avatar" v-if='$store.userProfile.avatar' id="show-avatar">
				<img src="../../assets/images/spider3.jpg" v-else id="show-avatar">
				<i class="bi bi-pencil-square"></i>

				<input 	class="input-submit-avatar" 
						type="file" 
						accept="image/*"
						@change="selectAvatar"
						id="input-submit-avatar"
				>
        		<label for="input-submit-avatar"  >
        			<i class="bi bi-pencil-square"></i>
        		</label>
        		<div class="submit-avatar" v-if='avatar'>
        			<i class="bi bi-check-lg" @click='submitAvatar'></i>
        			<i class="bi bi-x" @click='dropAvatar'></i>
        		</div>
			</div>
			<div class="info-profile">
				<div class="info-profile-name">
					<div>Name: </div><div class="info-profile-value">{{userProfile.name}}</div>
				</div>
				<div class="info-profile-name">
					<div>Username: </div><div class="info-profile-value">{{userProfile.username}}</div>
				</div>		
				<div class="info-profile-name">
					<div>Birthday: </div><div class="info-profile-value">{{userProfile.birthday}}</div>
				</div>			
				<div class="info-profile-name">
					<div>Phone: </div><div class="info-profile-value">{{userProfile.phone}}</div>
				</div>
				<div class="info-profile-name">
					<div>Friends: </div><div class="info-profile-value">{{friendNumber}} people</div>
				</div>
				<div class="info-profile-name">
					<div>Rooms: </div><div class="info-profile-value">{{roomNumber}} room</div>
				</div>

			</div>
			<div class="change-profile">
				<div class="btn btn-primary" @click='updateProfile'><i class="bi bi-pencil-square"></i> Chỉnh sửa</div>
			</div>
		</div>


		<div class="taskbar-profile" v-else>
			<div class="avatar-profile">
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
					<i class="bi bi-pencil-square"></i>Xác nhận
				</div>
			</div>
		</div>		
	<!-- </div> -->

</template>
<script>
	import ss from 'socket.io-stream';
	export default{
		data(){
			return {
				avatar: "",
				convertProfile : false,
				dataChange: "",
				userProfile: this.$store.$state.userProfile,
				friendNumber: this.$store.$state.friends.length,
				roomNumber: this.$store.$state.rooms.length,
				// roomNumber: this.$store.$state.friends.list_room.length | 0,
			}
		},
		methods:{
			updateProfile(){
				if(!this.convertProfile){

					this.convertProfile = true
					this.dataChange = this.userProfile
					// console.log(this.dataChange)
				}else{
					this.convertProfile = false
					this.$socketInstant.emit('UPDATE-PROFILE',
						{username: this.userProfile.username, payload: this.dataChange})
				}
			},
			selectAvatar(e){
				console.log('this.avatar', e.target.files)
				this.avatar = e.target.files[0]
				if(!this.avatar){
					this.avatar = ''
					return
				}
				if (this.avatar.type !== 'image/png' && this.avatar.type !== 'image/jpeg') {
					alert('loi dinh dang')
					this.avatar = ''
					return 
				}
					var showAvatar = document.getElementById('show-avatar')
					var reader  = new FileReader();
				    reader.onload = function(e)  {
				        showAvatar.src = e.target.result;
				     }
				     reader.readAsDataURL(this.avatar);
				
			},
			dropAvatar(){
				console.log(this.avatar)
				var avatar = document.getElementById('show-avatar')
				avatar.src = this.$store.$state.userProfile.avatar;
				this.avatar = ''
			},
			submitAvatar(){
				ss.forceBase64 = true ; 
				var stream = ss.createStream({
					highWaterMark: 1024,
				});
				console.log("Kiem tra render avatar")
				ss(this.$socketInstant).emit('UPLOAD-FILE', stream, {
					name: this.avatar.name, 
					type: this.avatar.type,
					size: this.avatar.size,
					upload: 'avatar',
				});

				ss.createBlobReadStream(this.avatar).pipe(stream);

				return
			},
		},
		mounted(){
			this.$socketInstant.on('UPDATE-PROFILE-STATUS', async(res)=>{
				// console.log(res.data)
				const oldAvatar = this.$store.userProfile.avatar.split('/')
						[this.$store.userProfile.avatar.split('/').length -1]
				console.log('oldAvatar',oldAvatar)
				this.$socketInstant.emit('REMOVE-FILE-WITH-NAME',
					{name: oldAvatar})
				this.$store.$state.userProfile = res.data.user
				console.log("hien thi user profile",this.$store.$state.userProfile)
			})

			this.$socketInstant.on('UPLOAD-AVATAR-STATUS', async data=>{
				console.log('data.url avatar',data.url)

				this.$socketInstant.emit('UPDATE-PROFILE',
					{username: this.userProfile.username, payload: {avatar:data.url}})

				this.avatar = ""
				// return
			})
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
.avatar-profile{
	width: 100px;
	margin: 0 auto;
	position: relative;
}
.avatar-profile img{
	width: 100px;
	height: 100px;
	border-radius: 100%;
	margin: 0 auto;
	margin-bottom: 1rem;
}
.avatar-profile .bi-pencil-square{
	position: absolute;
	bottom: 10px;
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
	background-color: #EEEFF2;
	border: none;
	border-radius: 3px;
	color: black;
	padding: 0.3rem 0.5rem;
}
.info-profile-value input:focus{
	border: none;
	outline: none;
}

.input-submit-avatar{
	display: none;
}
</style>