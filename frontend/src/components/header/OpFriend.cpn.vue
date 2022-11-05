<template>
		<div class="showOption" id="showOptionId" 
				@click=''>
			<div class="headerOption">
				<div class="avartarOption">
					<img class="avartar-header" src="../../assets/images/spider3.jpg">
				</div>
				<div class="nameOption">
					<!-- {{$store.userChosen.room}} -->
					{{$store.userChosen.friend.name}}
					
				</div>
			
				<div class="numberMember" v-if='$store.userChosen.isOnline'>	
					online
				</div>
				<div class="numberMember" v-else>	
					offline
				</div>
			</div>
			<div class="memberOption underline"></div>
			<div class="croll-taskbar height-croll-taskbar">
				<div class="memberOption ">
					<div class="id info">ID: {{$store.userChosen.friend._id}}</div>
					<div class="username info">Username: {{$store.userChosen.friend.username}}</div>
					<div class="phone info">
						Phone: {{$store.userChosen.friend.phone ? $store.userChosen.friend.phone : 'Không có'}}
					</div>
					<div class="birthday info">
						Birthday: {{$store.userChosen.friend.birthday ? $store.userChosen.friend.birthday: 'Không có'}}
					</div>
				</div>
			</div>
			<!-- <div class="memberOption underline"></div> -->
			<div class="addFriendOption">
<!-- 				<button class="btn btn-success"  @click='addFriendInGroup()'>Thêm thành viên</button> -->
				<button class="btn btn-warning" @click='removeMessage()' >
						Xóa tin nhắn
				</button>
				<button class="btn btn-danger" @click='removeFriend()'>Xóa kết bạn</button>
			</div>
			<!-- <div class="footerOption"></div> -->
		</div>

</template>
<script>
export default{
	data(){
		return{}
	},
	methods:{
		removeFriend(){
			var username = this.$store.userProfile.username
			var friendRemoved = this.$store.userChosen.friend.username
			var id_message = this.$store.userChosen.id_message
			console.log('this.$store.userChosen.friend',this.$store.userChosen)
			this.$socketInstant.emit('REMOVE-FRIEND',{username,friendRemoved,id_message})
			var temp = this.$store.friends.findIndex(element=> 
	      		element.friend.username === friendRemoved
	      	)
	      	// this.$store.friends.splice(temp,1)
	      	this.$store.userChosen = ''
		},
		removeMessage(){
			var id_message = this.$store.messages.id_message
			var content = this.$store.messages.contents[this.$store.messages.contents.length-1]
			console.log('content',content)
			const removeMS = {
				id_message,
				// [`rm-${this.$store.userProfile.username}`]: ((new Date() - new Date(this.$store.timeStandard))/(1000*60)).toFixed(3),
				message_count: content.message_count,
				username: this.$store.userProfile.username
			}
			this.$socketInstant.emit('REMOVE-MESSAGE',removeMS)
			console.log('rmMS',removeMS)
			this.$store.messages.contents = []

		}
	}
}
</script>
<style type="text/css">
</style>