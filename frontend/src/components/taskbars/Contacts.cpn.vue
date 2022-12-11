<template>

<!-- <WebViewer initialDoc='http://localhost:5000/uploads/911256d63cb92820cf7dc659db1601e9.docx'/> -->
<!-- {{$route}} -->
	<div class="title">
		<div><h2 class="title-name" >LIÊN HỆ</h2></div>
		<div v-on:click="alertDisplay"><i class="bi bi-person-plus-fill"></i></div>
	</div>
		<div class="search-taskbar">
      <div class="d-flex">
      	<button class="search-taskbar-submit" type="submit"><i class="bi bi-search"></i></button>
        <input v-model='searchFriend' class="search-taskbar-input " type="text" placeholder="Search ..." aria-label="Search">
      </div>
    </div>

	<div class="croll-taskbar" >
		<div v-for='char in keyWord'>
 			<h4 class="taskbar-contact-keys">{{char}}</h4>
 			<!-- <div>{{$store.friends}}</div> -->
			<div  v-for="item in $store.friends" >
				<!-- {{item}} -->
				<div v-if='item.friend.name.charAt(0).toUpperCase() === char'>
					<div class="taskbar taskbar-Contacts" 
								:id='"active" + item.friend.friend_id'
								@click='activeChosen(item,$event)' 
								>

								<!-- <div>{{item.id_message}}</div> -->

							<div class="avartar-taskbar">
								<img v-if='item.friend.avatar' class="avarta-taskbar" :src="item.friend.avatar">
								<img v-else class="avarta-taskbar" src="../../assets/images/spider3.jpg">
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
	import {scrollIntoViewBottom} from '@/services/untils.js'
	// import WebViewer from "@/components/Viewer/WebViewer.cpn.vue";
	export default{
		// components: {WebViewer},
		data(){
			return {
				searchFriend: "",
				keyWord: [],
				friends: this.$store.friends,
			}
		},
		methods:{
			activeChosen(item,el){
				// console.log(item.friend.friend_id)
				this.$store.$state.userChosen = item
				// console.log(item.id_message)
				// this.$store.$state.messages = {id_message:item.id_message}
				this.$socketInstant.emit('GET-MESSAGES-FROM-ID-MESSAGE',{username:this.$store.userProfile.username,id_message:item.id_message})
				this.$store.messages.id_message = item.id_message
				var taskbar = document.querySelectorAll(".taskbar-Contacts");
				taskbar.forEach(function(el) {
		      el.classList.remove("active");	   
		    });
				document.querySelector("#active" + item.friend.friend_id).classList.add("active")
				scrollIntoViewBottom('croll-to-bottom')
			},
			alertDisplay(){
        this.$swal.fire({title:'Kết bạn', 
        						input: 'text',
        						inputLabel: 'Tài khoản cần tìm',
        						inputPlaceholder: 'Nhập tên cần tìm',
        						background:'#fff', 
        						color: '#000',
        					}).then((res)=>{
        							if(res.value){
        								if(this.$store.userProfile.username === res.value){
        									this.$swal.fire({
        										title:'Không thể tự kết bạn với chính mình', 
				        						background:'#fff', 
				        						color: '#000',
				        					})
				        					return
        								}
        							}
        							if(res.value){
        								this.$socketInstant.emit('ADD-FRIEND',{search:res.value})
        								this.$socketInstant.on('ADD-FRIEND-STATUS', async (data)=>{
        									// console.log(data)
        									if(data.status !== 200){
        										this.$swal.fire({
					        						title: data.data.response, 
					        						background:'#fff', 
				        							color: '#000',
					        					})
					        					return
        									}else{
        										const {friend} = data.data
        										this.$swal.fire({
					        						title: friend.name, 
					        						background:'#fff', 
				        							color: '#000',
					        					}).then((res)=>{
					        						
					        						this.$socketInstant.emit('COMMIT-ADD-FRIEND',{	
					        								user1: {username: this.$store.userProfile.username},
					        								user2: {username:friend.username}
					        						})
					        						// console.log(res.value)
        											
					        					})
        									}
        								})
        							}

        				});
			},
			render(){
					this.keyWord = []
					// const {friends} = this.$store
					const {friends} = this
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
			},
			search(){

        if (this.searchFriend) {
        		// console.log('this.searchFriend',this.searchFriend)
            var result = this.$store.friends.filter(item => {
                return this.searchFriend
                    .toLowerCase()
                    .split(" ")
                    .every(v => item.friend.name.toLowerCase().includes(v));
            });
        }
        // console.log('result',result)
        this.friends = result ? result:this.$store.friends
        this.render()
			},
		},
		created(){
			// this.render()
			this.$socketInstant.emit('GET-ALL-FRIENDS',
      							{username:this.$store.userProfile.username})
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
      });
      this.$socketInstant.on('HAS_PEOPLE_OFFLINE',async(res)=>{
      	this.$store.$state.friends.find(element => {
          	if(element.friend.username === res.data.username){
          		element.isOnline = false
          	}
        })
      });
      this.$socketInstant.on('REMOVE-FRIEND-STATUS',async data=>{
      	this.$socketInstant.emit('GET-ALL-FRIENDS',
      		{username:this.$store.userProfile.username})
      });
      this.$socketInstant.on('COMMIT-ADD-FRIEND-STATUS',(data)=>{
      	console.log('ADD-FRIEND', data)
					if(data.status === 200){
						console.log('ADD-FRIEND', data)
						var temp = this.$store.friends.find(element => 
							element.friend.username === data.F.friend.username
						)
						console.log('temp ADD-FRIEND-STATUS', temp)
						if(!temp){
							console.log('them bạn thành công')
							this.$socketInstant.emit('GET-ALL-FRIENDS',
      							{username:this.$store.userProfile.username})
						}
					}
			});
			this.$socketInstant.on('GET-ALL-FRIENDS-STATUS',async data=>{
				this.$store.friends = data.friends
			});
		},
		watch:{
			'$store.friends'(){
				this.friends = this.$store.friends
				this.render()
			},
			searchFriend(){
				this.search()
			}
		},
	}
</script>
<style type="text/css">
.taskbar-contact-keys{
	padding: 0.5rem 1.5rem;
}
</style>