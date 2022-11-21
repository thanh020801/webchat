<template>
	<div class="taskbar-admin">
		<div class="taskbar-admin-child">
			<div class="header-admin">
				<div class="Logo-admin">
					<!-- <img class="avartar-header" src="../../assets/images/spider3.jpg"> -->
					MEGA-CHAT
				</div>
			</div>
			<div class="menu-admin">
				<ul>
					
<!-- 					<router-link to='/admin/users'>
						<li class="active-taskbar-admin activeAd" id="activeAd1"
							@click='activeChosen("activeAd1",$event)'
						>
							<i class="bi bi-speedometer2"></i>
							Trang chủ
						</li>
					</router-link> -->
					
					
					<router-link to='/admin/users'>
						<li  class="active-taskbar-admin" id="activeAd2"
							@click='activeChosen("activeAd2",$event)'
						>
							<i class="bi bi-person-lines-fill"></i>
							Người dùng
						</li>
					</router-link>
					
					
					<router-link to='/admin/groups'>
						<li  class="active-taskbar-admin" id="activeAd3"
							@click='activeChosen("activeAd3",$event)'
						>
							<i class="bi bi-people-fill" id=""></i>
							Nhóm
						</li>
					</router-link>
					
					
					<router-link to='/'>
						<li  class="active-taskbar-admin" id="activeAd4"
							@click='activeChosen("activeAd4",$event)'
						>
							<i class="bi bi-people-fill" id=""></i>
							Giao diện chính
						</li>
					</router-link>
					
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data(){
		return{
			a: ""
		}
	},
	methods:{
		activeChosen(item,el){
			// console.log('item',item)
			if(item === 'activeAd1'){
				this.$store.admin.chosen = 'TRANG CHỦ'
			}else if(item === 'activeAd2'){
				this.$store.admin.chosen = 'DANH SÁCH NGƯỜI DÙNG'
			}else if(item === 'activeAd3'){
				this.$store.admin.chosen = 'DANH SÁCH NHÓM'
			}
			
			var taskbarAd = document.querySelectorAll(".active-taskbar-admin");
			taskbarAd.forEach(function(el) {
		     	el.classList.remove("activeAd");	   
		    });
		    // console.log('item',item)
		    // console.log(document.getElementById(item))
			document.getElementById(item).classList.add("activeAd")
		},
	},
}
</script>
<style>
.taskbar-admin{
	width: 100%;
	height: 100vh;
	color: black;
	background-color: #0091ff;
	box-shadow: 1px -1px 10px 0px black;
	/*border-right: 1px solid white;*/
	z-index: 1000000;
}

.header-admin{
	width: 100%;
	height: 50px;
	align-items: center;
}
.header-admin .Logo-admin{
	width: fit-content;
	margin: 0 auto;
	font-size: 25px;
	font-weight: bold;
	text-align: center;
	line-height: 50px;
	border-bottom: 2px solid white;
	color: white;
}
.menu-admin ul{
	width: 90%;
	margin: 0px;
	padding: 0px;
	margin: 1rem auto;
	list-style: none;
	align-items: center;

}

.menu-admin ul li{
	height: 50px;
	line-height: 50px;
	padding-left: 1rem;
	margin: 1rem 0px;
	border-radius: 10px;
	color: white;


}
.menu-admin ul li:hover{
	background-color: #0055ab;
}
.menu-admin ul a li {
	color: white;
}
.menu-admin ul a  li .bi{
	font-size: 23px;
	padding-right: 5px;
	color: white;
}

.activeAd{
	background-color: #0055ab;
}
</style>	