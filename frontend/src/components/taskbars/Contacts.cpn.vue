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
			<h4 class="taskbar">{{char}}</h4>
			<div  v-for="user in users" >
				<div v-if='user.name.charAt(0) === char'>
					<div class="taskbar " >
							<div class="avartar-taskbar">
								<img class="avarta-taskbar" src="../../assets/images/spider3.jpg">
								<!-- <div class="user-online-taskbar"></div> -->
							</div>
							<div class="name-taskbar">
								<div class="name-taskbar">{{user.name}}</div>
								<div class="message-taskbar">{{user.message}}</div>
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
			users: 
			[

			{avarta: '', name: 'Mai Nam'},
			{avarta: '', name: 'Ngọc Thi'},
			{avarta: '', name: 'Hoàng Anh'},
			{avarta: '', name: 'Trần Tuấn Thanh'},
			{avarta: '', name: 'Cao Văn Nam'},
			{avarta: '', name: 'Kim Ánh'},
			{avarta: '', name: 'Lưu Hoàng Khiêm'},
			{avarta: '', name: 'Nguyễn Bình An'},
			{avarta: '', name: 'Xuân Nhã'},
			{avarta: '', name: 'Bích Châu'},
			{avarta: '', name: 'Việt Hoàng'},
			{avarta: '', name: 'Lê Hoa'},
			{avarta: '', name: 'Mega'},
			{avarta: '', name: 'David'},
			{avarta: '', name: 'Jukisan'},
			{avarta: '', name: 'Erik'},
			]
			}
		},
		methods:{
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
			console.log(this.users[3].name)
			for (var i = 0; i < this.users.length; i++) {
				let char = this.users[i].name.charAt(0);
				console.log(char)
				if(!this.keyWord.includes(char)){
					console.log('chua co')
					this.keyWord.push(char)
				}
			}
			console.log(this.keyWord.sort())
		}
	}
</script>
<style type="text/css">

</style>