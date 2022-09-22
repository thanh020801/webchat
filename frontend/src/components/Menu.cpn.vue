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
		<div v-if='cTheme'>
			<div class="item-menu" @click='changeTheme()'>
				<i class="bi bi-sun-fill"></i>
				<div style="font-size: 13px; line-height: 5px;">Light</div>
			</div>
		</div>
		<div v-else>
			<div class="item-menu" @click='changeTheme()'>
				<i class="bi bi-moon-fill"></i>
				<div style="font-size: 13px; line-height: 5px;">Dark</div>
			</div>
		</div>
	</div>
		
</template>
<script>
import {userConfig} from '@/stores/userConfig.js'
	export default{
		data(){
			return {
				cTheme: true,
				
			}
		},
		setup(){
			const configUser = userConfig()
			return {configUser}
		},
		methods:{
			selectorActive(activeE){
				if(this.$router.currentRoute._value.path === activeE){
					return {
						backgroundColor: '#3b728b',
						borderRadius: '20px',
					}
				}
			},
			changeTheme(){
				// console.log(this.configUser.userTheme)
				this.cTheme = !this.cTheme
				if(this.configUser.userTheme === 'theme-bright'){
					this.configUser.userTheme = 'theme-dark'
				}else{
					this.configUser.userTheme = 'theme-bright'
				}
			}			
		},

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
		width: 70%;
		height: 80px;
		align-items: center;
		margin: 0 auto;
		text-align: center;
		justify-content: center;
		padding-top: 12px;
		font-size: 25px;
		cursor: pointer;
	}

</style>