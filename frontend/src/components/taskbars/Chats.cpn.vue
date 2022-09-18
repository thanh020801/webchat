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

	<div class="taskbar">Recent</div>
	<div class="croll-taskbar">
		<div class="taskbar " v-for="user in users">
			<div class="avartar-taskbar">
				<img class="avarta-taskbar" src="../../assets/images/spider3.jpg">
				<div class="user-online-taskbar"></div>
			</div>
			<div class="name-taskbar">
				<div class="name-taskbar">{{user.name}}</div>
				<div class="message-taskbar">{{user.message}}</div>
			</div>
			<div class="timeOnline">{{user.time}}</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {users: 
			[

				{avarta: '', name: 'Mai Nam', time:'5:30' ,message: "Hello Mega"},
				{avarta: '', name: 'Ngoc Thi', time:'5:30' ,message: "How are you"},
				{avarta: '', name: 'Hoang Anh', time:'5:30' ,message: "Goodnight"},
				{avarta: '', name: 'Nguyen Tuan Thanh', time:'5:30' ,message: "Ok fine"},
				{avarta: '', name: 'Mai Nam', time:'5:30' ,message: "Good luck"},
				{avarta: '', name: 'Ngoc Thi', time:'5:30',message: "See you late"},
				{avarta: '', name: 'Hoang Anh', time:'5:30',message: "Good morning"},
				{avarta: '', name: 'Nguyen Tuan Thanh', time:'5:30',message: "How"},
				{avarta: '', name: 'Mai Nam', time:'5:30' ,message: ""},
				{avarta: '', name: 'Ngoc Thi', time:'5:30' ,message: ""},
				{avarta: '', name: 'Hoang Anh', time:'5:30' ,message: ""},
				{avarta: '', name: 'Nguyen Tuan Thanh', time:'5:30' ,message: ""},
				{avarta: '', name: 'Mai Nam', time:'5:30' ,message: ""},
				{avarta: '', name: 'Ngoc Thi', time:'5:30',message: ""},
				{avarta: '', name: 'Hoang Anh', time:'5:30',message: ""},
				{avarta: '', name: 'Nguyen Tuan Thanh', time:'5:30',message: ""},
			]
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

</style>