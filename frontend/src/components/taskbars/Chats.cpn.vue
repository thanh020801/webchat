<template>
	<div class="title">
		<div><h2 class="title-name" >Chats</h2></div>
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
		<div v-for="(item, index) in test_friend.friend_listfriendID">
			<div class="taskbar "
				v-if='item.id === test_message[1][test_message[1].length-1].message_name_recieve || item.id === test_message[1][test_message[1].length-1].message_name_send' 
				>
				<div class="avartar-taskbar">
					<img class="avarta-taskbar" src="../../assets/images/spider3.jpg">
					<div class="user-online-taskbar"></div>
				</div>
				<div class="name-taskbar">
					<div class="name-taskbar">{{item.name}}</div>
					<!-- <div class="name-taskbar">{{item.id}}</div> -->
					<div class="message-taskbar">{{test_message[1][test_message[1].length-1].message_content}}</div>
				</div>
				<div class="timeOnline">5:40<!-- {{user.time}} --></div>
			</div>
		</div>
	</div>
	
</template>
<script>
	import {TestStore} from '@/stores/test.js'
	export default{
		setup(){
			const test_friend = TestStore().friend_EX
			const test_message = TestStore().message_EX
			return {test_friend,test_message}
		},
		data(){
			 return {//users: 
			// [

			// 	{avarta: '', name: 'Mai Nam', time:'5:30' ,message: "Hello Mega"},
			// 	{avarta: '', name: 'Ngoc Thi', time:'5:30' ,message: "How are you"},
			// 	{avarta: '', name: 'Hoang Anh', time:'5:30' ,message: "Goodnight"},
			// 	{avarta: '', name: 'Nguyen Tuan Thanh', time:'5:30' ,message: "Ok fine"},
			// 	{avarta: '', name: 'Mai Nam', time:'5:30' ,message: "Good luck"},
			// 	{avarta: '', name: 'Ngoc Thi', time:'5:30',message: "See you late"},
			// 	{avarta: '', name: 'Hoang Anh', time:'5:30',message: "Good morning"},
			// 	{avarta: '', name: 'Nguyen Tuan Thanh', time:'5:30',message: "How"},
			// 	{avarta: '', name: 'Mai Nam', time:'5:30' ,message: ""},
			// 	{avarta: '', name: 'Ngoc Thi', time:'5:30' ,message: ""},
			// 	{avarta: '', name: 'Hoang Anh', time:'5:30' ,message: ""},
			// 	{avarta: '', name: 'Nguyen Tuan Thanh', time:'5:30' ,message: ""},
			// 	{avarta: '', name: 'Mai Nam', time:'5:30' ,message: ""},
			// 	{avarta: '', name: 'Ngoc Thi', time:'5:30',message: ""},
			// 	{avarta: '', name: 'Hoang Anh', time:'5:30',message: ""},
			// 	{avarta: '', name: 'Nguyen Tuan Thanh', time:'5:30',message: ""},
			// ]
			}
		},
		methods:{
			alertDisplay(){
        // this.$swal({
        //   title: 'What is your Name?',
        //   input: 'text',
        //   inputPlaceholder: 'Enter your name here',
        //   showCloseButton: true,
        // });
        this.$swal.fire({title:'Add Friend', 
        						input: 'text',
        						inputLabel: 'Name',
        						inputPlaceholder: 'Enter your name here',
        						background:'#272c3b', 
        						color: '#dedede',
        					}).then((res)=>{
        	console.log(res.value)
        });
        // console.log(this.$swal)
			}
		}
	}
</script>
<style type="text/css">
.taskbar-chats-recent{
	padding: 0.5rem 1.5rem;
}
</style>