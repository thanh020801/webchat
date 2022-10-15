<template>
	<div class="header" v-if='$store.isLogin'>
		<div class="avt-header" >
			<img class="avartar-header" src="../assets/images/spider3.jpg">
		</div>
		<div class="name-header" v-if='$store.userChosen.friend'>
			<h4>{{$store.userChosen.friend.name}}</h4>
			<div v-if='$store.userChosen.isOnline'>online</div>
			<div v-else>offline</div>
		</div>
		<div class="option-header"><i class="bi bi-three-dots-vertical"></i></div>
	</div>


</template>
<script>
	import {userConfig} from '@/stores/userConfig.js'
	export default{
		setup(){
			const configUser = userConfig()
			// console.log(configUser.userChosen)
			// console.log(userConfig())
			return {configUser}
		}
	}
</script>
<style type="text/css">
	.header{
		height: 60px;
		align-items: center;
		margin: 0px;
		padding: 0 0.5rem;
		/*border-bottom: 1px solid #36404a;*/
		box-shadow: 2px 2px 5px 0px black;
		/*background-color: blue;*/
		grid-template-columns: 13% auto 5%;
		display: grid;
	}
	.avartar-header{
		width: 40px;
		height: 40px;
		border-radius: 100%;
	}
	.avt-header{
		height: 40px;
	}
</style>