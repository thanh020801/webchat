<!-- <template>
	<div class="title">
		<div><h2 class="title-name" >CHATS</h2></div>
		<div v-on:click="alertDisplay"><i class="bi bi-person-plus-fill"></i></div>
	</div>
		<div class="search-taskbar">
      <div class="d-flex">
      	<button class="search-taskbar-submit" type="submit"><i class="bi bi-search"></i></button>
        <input class="search-taskbar-input " type="text" placeholder="Search ..." aria-label="Search">
      </div>
    </div>
	<div class="croll-taskbar">
		<div class="taskbar-chats-recent">Recent</div>
		<div v-for="(item, index) in test.friend_listfriendID">
			<div class="taskbar taskbar-chats"
				 	:id='"active" + item.id' 
					@click='activeChosen(item,$event)' 
				>
				<div class="avartar-taskbar">
					<img class="avarta-taskbar" src="../../assets/images/spider3.jpg">
					<div class="user-online-taskbar"></div>
				</div>
				<div class="name-taskbar">
					<div class="name-taskbar">{{item.name}}</div>
				</div>
				<div class="timeOnline">5:40</div>
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
					friendInstane : []
			}
		},
		methods:{
			activeChosen(item,el){
				console.log(item.id)
				
				this.configUser.userChosen = item
				console.log(this.configUser.userChosen)
				var taskbar = document.querySelectorAll(".taskbar-chats");
				taskbar.forEach(function(el) {
		      el.classList.remove("active");	   
		    });
				document.querySelector("#active" + item.id).classList.add("active")
			},

			findMessage(friendIdMessage, idMessage){
				return friendIdMessage === idMessage
			},
			alertDisplay(){

        this.$swal.fire({title:'Add Friend', 
        						input: 'text',
        						inputLabel: 'Name',
        						inputPlaceholder: 'Enter your name here',
        						background:'#EEEFF2', 
        						color: 'black',
        					}).then((res)=>{
        	console.log(res.value)
        });
			}
		}
	}
</script>
<style type="text/css">
.taskbar-chats-recent{
	padding: 0.5rem 1.5rem;
}

</style> -->