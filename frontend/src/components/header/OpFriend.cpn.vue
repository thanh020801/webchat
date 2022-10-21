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
				<button class="btn btn-danger" @click='exitGroup()'>Xóa kết bạn</button>
			</div>
			<!-- <div class="footerOption"></div> -->
		</div>

</template>
<script>
export default{
	
}
</script>
<style type="text/css">
/*	.showOption{
		display: block;
		font-size: 13px;
		padding: 0.5rem;
		position: absolute;
		right: 0px;
		top: 60px;
		width: 300px;
		height: 360px;
		z-index: 10000000;
		text-align: center;
		align-items: center;
		justify-content: center;
	}
	.headerOption {
	}
	.headerOption .avartarOption{
		align-items: center;
		justify-content: center;
		align-content: center;

	}
	.nameOption{
		font-weight: bold;
		font-size: 20px;
		text-align: center;
	}
	.addFriendOption{
		margin-top: 0.5rem;

	}
	.addFriendOption button{
		margin: 3px;
		height: 30px;
		width: 80%;
		border-radius: 10px;
		border: none;
		line-height: 10px;
		font-size: 15px;
	}
	
	.addFriendOption .btn-warning{
		color: #FFF;
	}
	.memberOption{
		width: 80%;
		margin: 0 auto;
		text-align: left;
		font-size: 14px;
		padding: 0.5rem;
	}
	.underline{
		border-top: 1px solid black;
		margin-top: 5px;
		padding: 0px;
	}

	.height-croll-taskbar{
		height: 140px;
	}
	.memberOption .member i{
		font-size: 20px;
		padding-top: 10px;
	}
	.memberOption .info{
		padding: 5px 0;
	}*/
</style>