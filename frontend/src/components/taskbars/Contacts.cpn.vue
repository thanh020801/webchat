<template>
	<div class="title">
		<div><h2 class="title-name" >LIÊN HỆ</h2></div>
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
			<div  v-for="item in friends" >
				<div v-if='item.friend.name.charAt(0).toUpperCase() === char'>
					<div class="taskbar taskbar-Contacts" 
								:id='"active" + item.friend.friend_id'
								@click='activeChosen(item,$event)' 
								>
							<div class="avartar-taskbar">
								<img class="avarta-taskbar" src="../../assets/images/spider3.jpg">
								<div class="user-online-taskbar" v-if='item.isOnline === true'></div>
								<div class="user-offline-taskbar" v-else></div>
							</div>
							<div class="name-taskbar">
								<div class="name-taskbar">{{item.friend.name}}</div>
								<div class="message-taskbar">{{item.friend.username}}</div>
							</div>
							<div class="timeOnline"><i class="bi bi-three-dots-vertical"></i></div>
					</div>
				</div>	
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				keyWord: [],
				key: 0,
				update: false,
				friends: this.$store.friends,
			}
		},
		methods:{
			activeChosen(item,el){
				// console.log(item.friend.friend_id)
				this.$store.$state.userChosen = item
				var taskbar = document.querySelectorAll(".taskbar-Contacts");
				taskbar.forEach(function(el) {
		      el.classList.remove("active");	   
		    });
				document.querySelector("#active" + item.friend.friend_id).classList.add("active")
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
        								this.$socketInstant.emit('ADD-FRIEND',{search:res.value})
        								this.$socketInstant.on('ADD-FRIEND-STATUS', async (data)=>{
        									// console.log(data)
        									if(data.status !== 200){
        										this.$swal.fire({
					        						title: data.data.response, 
					        						background:'#272c3b', 
					        						color: '#dedede',
					        					})
					        					return
        									}else{
        										const {friend} = data.data
        										this.$swal.fire({
					        						title: friend.name, 
					        						background:'#272c3b', 
					        						color: '#dedede',
					        					}).then((res)=>{
					        						
					        						this.$socketInstant.emit('COMMIT-ADD-FRIEND',{	
					        								user1: {username: this.$store.userProfile.username},
					        								user2: {username:friend.username}
					        						})
					        						// console.log(res.value)
        											this.$socketInstant.on('COMMIT-ADD-FRIEND-STATUS',
        											(data)=>{
        												if(data.status === 200){
	        												var temp = this.$store.friends.find(element => 
	        														element.friend.username === data.F.friend.username)
	        												if(!temp){
	        													this.$store.$state.friends.push(data.F)
	        												}
        												}
	        											else{
	        													this.$swal.fire({
	        														title: data.data.response, 
									        						background:'#272c3b', 
									        						color: '#dedede',
									        					})
	        											}

        											})
					        					})
        									}
        								})
        							}

        				});
			},
			render(){
					const friends = this.friends
					// console.log(friends)
					for (var i = 0; i < friends.length; i++) {
						var name = friends[i].friend.name
						name = name.charAt(0).toUpperCase()+ name.slice(1)
						let char = name.charAt(0).toUpperCase();
						// console.log(char)
						if(!this.keyWord.includes(char)){
							this.keyWord.push(char)
						}
					}
					this.keyWord.sort()
			}
		},
		// watch:{
		// 	'key': function(val, oldVal){
		// 		console.log('hello')
		// 		this.render()

		// 	}
		// },
		created(){
			this.render()
			

		},
		mounted(){
			// this.render()
			// Cập nhật bạn bè online
			this.$socketInstant.on('HAS_PEOPLE_ONLINE',async(res)=>{
          // console.log('data of has online',res.data.username)
          this.$store.$state.friends.find(element => {
          	if(element.friend.username === res.data.username){
          		element.isOnline = true
          	}
          })
          // console.log(this.$store.$state.friends)
      })
      this.$socketInstant.on('HAS_PEOPLE_OFFLINE',async(res)=>{
      	this.$store.$state.friends.find(element => {
          	if(element.friend.username === res.data.username){
          		element.isOnline = false
          	}
        })
        // console.log('hhhhhh')
      })
		}
	}
</script>
<style type="text/css">
.taskbar-contact-keys{
	padding: 0.5rem 1.5rem;
}
</style>