<template>
	<!-- <h2 class="title" >Home</h2> -->
	<div class="taskbar">
		<div class="d-flex  flex-column gap-4 search-taskbar">
      <div class="d-flex">
        <input class="search-taskbar-input  me-1" type="text" placeholder="Search" aria-label="Search">
        <button class="search-taskbar-submit" type="submit"><i class="bi bi-search"></i></button>
      </div>
    </div>
  </div>

	
	<div class="croll-taskbar">
		<div class="row taskbar " v-for="user in users">
			<div class="avartar-taskbar col-lg-2">
				<img class="avarta-taskbar" src="../assets/images/spider3.jpg">
				<div class="user-online-taskbar"></div>
			</div>
			<div class="name-taskbar col-lg-8">{{user.user.name}}</div>
			<div class="timeOnline col-lg-2">{{user.user.time}}</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {users: 
			[
			{user: {avarta: '../assets/images/spider3.jpg', name: 'Nguyen Tuan Thanh', time:'5:30'}},
			{user: {avarta: '../assets/images/spider3.jpg', name: 'Mai Nam', time:'5:30'}},
			{user: {avarta: '../assets/images/spider3.jpg', name: 'Ngoc Thi', time:'5:30'}},
			{user: {avarta: '../assets/images/spider3.jpg', name: 'Hoang Anh', time:'5:30'}},
			{user: {avarta: '../assets/images/spider3.jpg', name: 'Nguyen Tuan Thanh', time:'5:30'}},
			{user: {avarta: '../assets/images/spider3.jpg', name: 'Mai Nam', time:'5:30'}},
			{user: {avarta: '../assets/images/spider3.jpg', name: 'Ngoc Thi', time:'5:30'}},
			{user: {avarta: '../assets/images/spider3.jpg', name: 'Hoang Anh', time:'5:30'}},
			{user: {avarta: '../assets/images/spider3.jpg', name: 'Nguyen Tuan Thanh', time:'5:30'}},
			{user: {avarta: '../assets/images/spider3.jpg', name: 'Mai Nam', time:'5:30'}},
			{user: {avarta: '../assets/images/spider3.jpg', name: 'Ngoc Thi', time:'5:30'}},
			{user: {avarta: '../assets/images/spider3.jpg', name: 'Hoang Anh', time:'5:30'}},
			{user: {avarta: '../assets/images/spider3.jpg', name: 'Nguyen Tuan Thanh', time:'5:30'}},

			]
			}
		},
	}
</script>
<style type="text/css">
	.taskbar{
		padding:0px 10px;
		margin: 0px;
		height: 50px;
		align-items: center;
	}

	.avarta-taskbar{
		width: 30px;
		height: 30px;
		border-radius: 100%;
	}
	.user-online-taskbar{
		width: 8px;
		height: 8px;
		background-color: red;
		border-radius: 100%;
		position: relative;
		left: 22px;
		bottom: 6px;
	}

	.search-taskbar,.search-taskbar-input, .search-taskbar-submit{
		/*background-color: green;*/
		border: none;
		outline: none;
	}
	.search-taskbar{
		width: 100%;
		padding: 0px;
		height: 50px;
		border-bottom: 1px solid black;
	}
	.search-taskbar-input{
		width: 250px;
		height: 49px;
		padding: 0 1rem;
	}
	.search-taskbar-input:focus{
		outline: none;
		/*background-color: green;*/
		border: none;
		outline: none;
	}
	.col-lg-2,.col-lg-8{
		height: 30px;
		padding: 0px;
		color: black;
	}

	.timeOnline{
		text-align: right;
		color: white;
		font-size: 13px;
	}
	.name-taskbar{
		color: white;
		font-size: 15px;
	}
	.croll-taskbar{
        width: 100%;
        height: 100vh;
        overflow-y: scroll;
    }
    /* width */
    .croll-taskbar::-webkit-scrollbar {
      width: 5px;
    }

    /* Track */
    .croll-taskbar::-webkit-scrollbar-track {
      /*box-shadow: inset 0 0 5px #2e0538; */
      border-radius: 10px;
    }
     
    /* Handle */
    .croll-taskbar::-webkit-scrollbar-thumb {
      background: #2e053873; 
      border-radius: 10px;
    }

    /* Handle on hover */
    .croll-taskbar::-webkit-scrollbar-thumb:hover {
      background: #2e0538; 
    }
</style>