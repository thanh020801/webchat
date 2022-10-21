<template>
	<div class="title">
		<div><h2 class="title-name" >NHÓM</h2></div>
		<div @click="alertDisplay" >
			<i class="bi bi-people-fill"></i>
		</div>
	</div>
		<div class="search-taskbar">
      <div class="d-flex">
      	<button class="search-taskbar-submit" type="submit"><i class="bi bi-search"></i></button>
        <input class="search-taskbar-input " type="text" placeholder="Search ..." aria-label="Search">
      </div>
    </div>
<!-- {{$store.rooms}} -->
	<div class="croll-taskbar">
		<div 	class="taskbar taskbar-groups" 
					:id='"active" + item.room._id' 
					v-for="item in rooms"
					@click='activeChosen(item,$event)' 
		>
		

			<!-- <div class="name-taskbar">{{item}}</div> -->
			<div class="avartar-taskbar">
				<img class="avarta-taskbar" src="../../assets/images/spider3.jpg">
			</div>
			<div class="name-taskbar">
				<div class="name-taskbar">{{item.room.room_name}}</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				rooms: this.$store.rooms,
				search: "",
				checkFriend: [],
			}
		},

		methods:{
			activeChosen(item,el){
				console.log(item.room._id)
				
				this.$store.$state.userChosen = item
				var taskbar = document.querySelectorAll(".taskbar-groups");
				taskbar.forEach(function(el) {
		      el.classList.remove("active");	   
		    });
				document.querySelector("#active" + item.room._id).classList.add("active")
			},
			alertDisplay(){
        this.$swal.fire({
        						title:'Create Group', 
        						input: 'text',
        						inputLabel: 'Group name',
        						inputPlaceholder: 'Enter your group name here',
        						background:'#272c3b', 
        						color: '#dedede',
        					}).then((res)=>{
						        	if(res.value){
						        		console.log('day la group')
						        			const room = {
						        				room_admin: this.$store.userProfile.username,
						        				room_member: [
						        							{
						        								username:this.$store.userProfile.username,
						        								name: this.$store.userProfile.name
						        							},
						        							{
						        								username:'thi',
						        								name: 'Tran Ngoc Thi'
						        							},{
						        								username:'thanh',
						        								name: 'Nguyễn Tuấn Thanh'
						        							},
						        							{
						        								username:'tai',
						        								name: 'Nguyễn Huu Tai'
						        							},
						        				],
						        				room_name: res.value,
						        				room_avartar: "", 
						        			}
												 	this.$socketInstant.emit('CREATE-GROUP',{room})
												 	this.$socketInstant.on('CREATE-GROUP-STATUS',(data)=>{
												 		
												 		this.$store.$state.rooms.push(data.R)
												 		console.log('create group',data)
												 		// console.log(this.$store.$state.rooms)
												 	})
						        	}
        					});
			},
		},
		// mounted(){
		// 	this.$socketInstant.
		// }
	}
</script>
<style type="text/css">

</style>