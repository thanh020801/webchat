<template>
	{{selectorActive()}}
	<div class="logo">
		<router-link class='logoM' to='/chats'>MEGA CHAT</router-link>
	</div>
	<div>
		<router-link to='/chats'>
			<div class="item-menu" :style='selectorActive("/chats")'>
				<i class="bi bi-chat-left-text-fill"></i><br>
				<div style="font-size: 13px; line-height: 5px;">Chats</div>
			</div>
		</router-link>


		<router-link to='/groups'>
			<div class="item-menu" :style='selectorActive("/groups")'>
				<i class="bi bi-people-fill"></i>
				<br>
				<div style="font-size: 13px; line-height: 5px;">Groups</div>
			</div>
		</router-link>


		<router-link to='/contacts'>
			<div class="item-menu" :style='selectorActive("/contacts")'>
				<i class="bi bi-person-lines-fill"></i>
				<br>
				<div style="font-size: 13px; line-height: 5px;">Contacts</div>
			</div>
		</router-link>


		<router-link to='/profile'>
			<div class="item-menu" :style='selectorActive("/profile")'>
				<i class="bi bi-person-fill"></i>
				<br>
				<div style="font-size: 13px; line-height: 5px;">Profile</div>
			</div>
		</router-link>
	
	</div>
		
</template>
<script>
	export default{
		data(){
			return {
			}
		},
		methods:{
			selectorActive(activeE){
				if(this.$router.currentRoute._value.path === activeE){
					return {
						backgroundColor: '#303841',
						borderRadius: '20px',
					}
				}

			}
		}
	}
</script>
<style type="text/css">
	a{
		text-decoration: none;
	}
	.logo{
		height: 50px;
		justify-content: center;
		text-align: center;
		align-content: center;
		align-items: center;
		margin-bottom: 1rem;

	}
	.logoM{
		text-decoration: none;
		font-weight: bold;
		font-size: 20px;
	}
	.item-menu{
		width: 80%;
		height: 90px;
		align-items: center;
		margin: 0 auto;
		text-align: center;
		justify-content: center;
		padding-top: 12px;
		font-size: 25px;
	}

</style>