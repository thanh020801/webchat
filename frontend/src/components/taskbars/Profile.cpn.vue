<template>
<!-- 		<div class="search-taskbar">
      <div class="d-flex">
        <input class="search-taskbar-input  me-1" type="text" placeholder="Search ..." aria-label="Search">
        <button class="search-taskbar-submit" type="submit"><i class="bi bi-search"></i></button>
      </div>
    </div>

	
	<div class="croll-taskbar">
		<div class="taskbar " v-for="user in users">
			<div class="avartar-taskbar">
				<img class="avarta-taskbar" src="../../assets/images/spider3.jpg">
				<div class="user-online-taskbar"></div>
			</div>
			<div class="name-taskbar">
				<div class="name-taskbar">{{user.user.name}}</div>
				<div class="message-taskbar">{{user.user.message}}</div>
			</div>
			<div class="timeOnline">{{user.user.time}}</div>
		</div>
	</div> -->
	<h2>Profile</h2>
</template>
<script>
	export default{

	}
</script>
<style type="text/css">
	.taskbar{
		padding:0px 10px;
		margin: 0px;
		height: 60px;
		align-items: center;
		border-bottom: 1px solid #36404a;
		grid-template-columns: 15% auto 10%;
		display: grid;
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
		grid-template-columns: auto 5%;
		display: grid;
		/*width: 100%;*/
		padding: 0px;
		height: 50px;
		border-bottom: 1px solid #36404a;
	}
	.search-taskbar-input{
		width: 89%;
		height: 49px;
		padding: 0 1rem;
	}
	.search-taskbar-input:focus{
		outline: none;
		/*background-color: green;*/
		border: none;
		outline: none;
	}
/*	.col-lg-2,.col-lg-8{
		height: 30px;
		padding: 0px;
		color: black;
	}*/

	.timeOnline{
		text-align: right;
		color: white;
		font-size: 13px;
	}
	.name-taskbar{
		color: #dedede;
		font-size: 15px;
		line-height: 10px;
	}
	.message-taskbar{
		color: #8aa4bb;
		font-size: 13px;
		line-height: 30px;
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
      background: #36404a; 
      border-radius: 10px;
    }

    /* Handle on hover */
    .croll-taskbar::-webkit-scrollbar-thumb:hover {
      background: #2e0538; 
    }
</style>