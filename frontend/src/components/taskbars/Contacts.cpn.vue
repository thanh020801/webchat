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
			<div  v-for="item in test.friend_listfriendID" >
				<div v-if='item.name.charAt(0) === char'>
					<div class="taskbar taskbar-Contacts " 
								:id='"active" + item.id'
								@click='activeChosen(item,$event)' 
								>
							<div class="avartar-taskbar">
								<img class="avarta-taskbar" src="../../assets/images/spider3.jpg">
								<!-- <div class="user-online-taskbar"></div> -->
							</div>
							<div class="name-taskbar">
								<div class="name-taskbar">{{item.name}}</div>
								<!-- <div class="message-taskbar">{{item.message}}</div> -->
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
			const test = TestStore().friend_EX
			const configUser = userConfig()
			return {test, configUser}
		},
		data(){
			return {
			keyWord: [],
			isChosen: false,
			styleChosen: {backgroundColor: "black"}
			}
		},
		methods:{
			activeChosen(item,el){
				console.log(item.id)
				this.configUser.userChosen = item
				var taskbar = document.querySelectorAll(".taskbar-Contacts");
				taskbar.forEach(function(el) {
		      el.classList.remove("active");	   
		    });
				document.querySelector("#active" + item.id).classList.add("active")
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
			}
		},
		created(){
			for (var i = 0; i < this.test.friend_listfriendID.length; i++) {
				var name = this.test.friend_listfriendID[i].name
				this.test.friend_listfriendID[i].name = 
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
/*.chosen{
	background-color: black;
}*/
/*#chosenID[chosenActive= 'value']{
	background-color: black;
}*/

</style>