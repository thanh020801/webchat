<template>
	<div class="logo">
		<router-link class='logoM' to='/home'>MEGA CHAT</router-link>
	</div>
	<div class="item-menu">
		<router-link to='/home'><i class="bi bi-chat-left-text-fill"></i></router-link>
	</div>
	<div class="item-menu">
		<router-link to='/group'><i class="bi bi-people-fill"></i></router-link>
	</div>
	<div class="item-menu">
		<router-link to='/friends'><i class="bi bi-person-lines-fill"></i></router-link>
	</div>
	<div class="item-menu">
		<router-link to='/profile'><i class="bi bi-person-fill"></i></router-link>
	</div>
	
	
	
</template>
<script>
	export default{

	}
</script>
<style type="text/css">
	.logo{
		height: 50px;
		/*background-color: orange;*/
		justify-content: center;
		text-align: center;
		align-content: center;
		align-items: center;
	}
	.logoM{
		text-decoration: none;
		font-weight: bold;
		font-size: 20px;
	}
	.item-menu{
		text-align: center;
		justify-content: center;
		margin: 2rem 0px;
		font-size: 20px;
		color: pink;
	}
</style>