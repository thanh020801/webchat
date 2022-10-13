<template>
	<div class="title">
		<div><h2 class="title-name" >Groups</h2></div>
		<div v-on:click="alertDisplay" >
			<i class="bi bi-people-fill"></i>
		</div>
		<!-- <div v-else >{{alertDisplaySearchRoom()}}</div> -->

	</div>
		<div class="search-taskbar">
      <div class="d-flex">
      	<button class="search-taskbar-submit" type="submit"><i class="bi bi-search"></i></button>
        <input class="search-taskbar-input " type="text" placeholder="Search ..." aria-label="Search">
      </div>
    </div>

	<div class="croll-taskbar">
		<div 	class="taskbar taskbar-groups" 
					:id='"active" + item.id' 
					v-for="item in room_EX"
					@click='activeChosen(item,$event)' 
		>
			<!-- <div class="name-taskbar">{{item}}</div> -->
			<div class="avartar-taskbar">
				<img class="avarta-taskbar" src="../../assets/images/spider3.jpg">
			</div>
			<div class="name-taskbar">
				<div class="name-taskbar">#{{item.name}}</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {TestStore} from '@/stores/test.js'
	import {userConfig} from '@/stores/userConfig.js'
	export default{
		data(){
			return {
				search: "",
			}
		},
		setup(){
			const {room_EX,room_EX_Search,message_EX} = TestStore()
			const configUser = userConfig()
			return {room_EX,room_EX_Search,configUser,message_EX}
		},
		methods:{
			activeChosen(item,el){
				// console.log(item.id)
				
				this.configUser.userChosen = item
				// console.log(this.configUser.userChosen)
				var taskbar = document.querySelectorAll(".taskbar-groups");
				taskbar.forEach(function(el) {
		      el.classList.remove("active");	   
		    });
				document.querySelector("#active" + item.id).classList.add("active")
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
        	// this.room_EX_Search = res

						        	if(res.value){
						          	for (var i = 0; i < this.room_EX_Search.length; i++) {
							        		if(this.room_EX_Search[i].name.toUpperCase() === res.value.toUpperCase()){
							        			// console.log(res.value)
							        			console.log(this.room_EX_Search[i])
							        			this.$swal.fire({
					        						title: this.room_EX_Search[i].name, 
					        						background:'#272c3b', 
					        						color: '#dedede',
					        					}).then((res)=>{
					        						console.log(res.isConfirmed)
					        						if(res.isConfirmed){
					        							this.room_EX.push(this.room_EX_Search[i])
					        							this.message_EX.push({idMessage: this.room_EX_Search[i].idMessage, contents: []})
					        						}
					        					})
					        					return
							        		}
							        		
							        	} 
					        			this.$swal.fire({
			        						title:'Không tìm thấy nhóm', 
			        						background:'#272c3b', 
			        						color: '#dedede',
			        					})
			        					return
							        		  		
						        	}
        					});
			},
			// alertDisplaySearchRoom(){
   //      this.$swal.fire({
   //      						title:this.search.id, 
   //      						// input: 'text',
   //      						// inputLabel: 'Group name',
   //      						// inputPlaceholder: 'Enter your group name here',
   //      						background:'#272c3b', 
   //      						color: '#dedede',
   //      						// button: 'Vào Nhóm'
   //      					}).then((res)=>{
   //      	// this.room_EX_Search = res
   //      	if(this.res){
   //        	// for (var i = 0; i < this.room_EX_Search.length; i++) {
	  //       		// if(this.room_EX_Search[i].name.toUpperCase() == res.value.toUpperCase()){
	  //       			console.log("dfsdfsdfds",this.room_EX_Search[i])
	  //       			// this.search = this.room_EX_Search[i]
	  //       		// }
	  //       	// }      		
   //      	}
	

   //      });
			// }
		}
	}
</script>
<style type="text/css">

</style>