<template>
	<div class="title">
		<div><h2 class="title-name" >Contacts</h2></div>
		<div v-on:click="alertDisplay"><i class="bi bi-person-plus-fill"></i></div>
	</div>
		<div class="search-taskbar">
      <div class="d-flex">
      	<button class="search-taskbar-submit" type="submit"><i class="bi bi-search"></i></button>
        <input class="search-taskbar-input " type="text" placeholder="Search ..." aria-label="Search">
      </div>
    </div>

	<div class="croll-taskbar" >
		<div v-for='char in keyWord'>
			<h4 class="taskbar-contact-keys">{{char}}</h4>
			<div  v-for="item in friend_EX.friend_listfriendID" >
				<div v-if='item.name.charAt(0) === char'>
					<div class="taskbar taskbar-Contacts " 
								:id='"active" + item.id'
								@click='activeChosen(item,$event)' 
								>
							<div class="avartar-taskbar">
								<img class="avarta-taskbar" src="../../assets/images/spider3.jpg">
							</div>
							<div class="name-taskbar">
								<div class="name-taskbar">{{item.name}}</div>
								<div class="message-taskbar">{{item.username}}</div>
							</div>
							<div class="timeOnline"><i class="bi bi-three-dots-vertical"></i></div>
					</div>
				</div>	
			</div>
		</div>
	</div>
</template>
<script>
	import {TestStore} from '@/stores/test.js'
	import {userConfig} from '@/stores/userConfig.js'
	export default{
		setup(){
			const {friend_EX, user_EX,message_EX} = TestStore()
			const configUser = userConfig()
			return {friend_EX, configUser, user_EX,message_EX}
		},
		data(){
			return {
				keyWord: [],
			}
		},
		methods:{
			activeChosen(item,el){
				// console.log(item.id)
				this.configUser.userChosen = item
				var taskbar = document.querySelectorAll(".taskbar-Contacts");
				taskbar.forEach(function(el) {
		      el.classList.remove("active");	   
		    });
				document.querySelector("#active" + item.id).classList.add("active")
			},
			alertDisplay(){
        this.$swal.fire({title:'Add Friend', 
        						input: 'text',
        						inputLabel: 'Name',
        						inputPlaceholder: 'Enter your name here',
        						background:'#272c3b', 
        						color: '#dedede',
        					}).then((res)=>{
        							if(res.value){
        								for (var i = 0; i < this.user_EX.length; i++) {
        									// console.log(res.value)
        									// console.log(this.user_EX[i])
        									if(this.user_EX[i].username == res.value){
        										// console.log(this.user_EX[i])
        										this.$swal.fire({
					        						title: this.user_EX[i].username, 
					        						background:'#272c3b', 
					        						color: '#dedede',
					        					}).then((res)=>{
					        						// console.log(res.isConfirmed)
					        						if(res.isConfirmed){
					        							var randomIdMessage = Math.floor(Math.random()*100000+1)
					        							console.log(randomIdMessage)
					        							this.user_EX[i].idMessage = String(randomIdMessage)
					        							console.log(this.user_EX[i])
					        							this.friend_EX.friend_listfriendID.push(this.user_EX[i])
					        							this.message_EX.push({idMessage: this.user_EX[i].idMessage, contents: []})
					        						}
					        					})
					        					return
        									}
        								}
        								this.$swal.fire({
			        						title:'Không tìm thấy !!!', 
			        						background:'#272c3b', 
			        						color: '#dedede',
			        					})
			        					return
        							}
        });
        // console.log(this.$swal)
			}
		},
		created(){
			for (var i = 0; i < this.friend_EX.friend_listfriendID.length; i++) {
				var name = this.friend_EX.friend_listfriendID[i].name
				this.friend_EX.friend_listfriendID[i].name = 
					name.charAt(0).toUpperCase()+ name.slice(1)
				let char = name.charAt(0).toUpperCase();
				// console.log(char)
				if(!this.keyWord.includes(char)){
					this.keyWord.push(char)
				}
			}
			this.keyWord.sort()
		}
	}
</script>
<style type="text/css">
.taskbar-contact-keys{
	padding: 0.5rem 1.5rem;
}
</style>