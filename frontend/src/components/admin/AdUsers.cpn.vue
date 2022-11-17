<template>
	<div class="AdUser-cpn">
        <table class="list-account list-account-thead">
            <thead>
                <tr>
                    <th style="width: 5%;">Stt</th>
                    <th style="width: 15%;">Ảnh đại diện</th>
                    <th style="width: 18%;">Tên tài khoản</th>
                    <th style="width: 20%;">Tên</th>
                    <!-- <th style="width: 15%;">Số điện thoại</th> -->
                   	<th style="width: 10%;">Bạn bè</th>
                    <th style="width: 10%;">Nhóm</th>
                    <th style="width: 15%;">Xem thông tin</th>
                    <th style="width: 7%;">Xóa</th>
                </tr>
            </thead>
        </table>
        <!-- {{users}} -->
        <div class="croll-taskbar1">
        	<table class="list-account" id="list-account-content-id-AdUser">
	            <tbody >
					<tr class="list-account-content" v-for='(user,index) in users'>
						<!-- {{user}} -->
						<!-- {{index}} -->
						<td style="width: 5%;">{{index+1}}</td>
						<td style="width: 15%;">
							<img class="avartar-header" 
								v-if='user.avatar' 
								:src="user.avatar">
							<img v-else 
								class="avartar-header" 
								src="../../assets/images/spider3.jpg">

						</td>
						<td style="width: 18%;">{{user.username}}</td>
						<td style="width: 20%;">{{user.name}}</td>
						<!-- <td style="width: 15%;">{{user.phone? user.phone:"Không có"}}</td> -->
						<td style="width: 10%;">{{user.friend_number}}</td>
						<td style="width: 10%;">{{user.room_number}}</td>
						<td style="width: 15%;">
							<router-link :to='"/admin/user/" + user.username'>
								<i class="bi bi-eye-fill"></i>
							</router-link>
						</td>
						<td style="width: 7%;">
							<i v-if='user.lock' 
								class="bi bi-lock-fill"  
								@click='unlockUser(user.username)'>	
							</i>
							<i v-else 
								class="bi bi-unlock-fill"  
								@click='lockUser(user.username)'>	
							</i>

						</td>
					</tr>
	                     
	            </tbody>
	        </table>

        </div>
	        
    </div>
</template>
<script>
export default{
	data(){
		return{
			users: [],
		}
	},
	methods:{
		lockUser(username){
			this.$socketInstant.emit('ADMIN-LOCK-ACCOUNT-USER', {username})
		},
		unlockUser(username){
			this.$socketInstant.emit('ADMIN-UNLOCK-ACCOUNT-USER', {username})
		},
	},
	mounted(){
		this.$socketInstant.on('ADMIN-GET-ALL-USER-STATUS', async data=>{
			this.users = data
			// console.log('data',this.users)
		});
		this.$socketInstant.on('ADMIN-LOCK-ACCOUNT-USER-STATUS',async data=>{
			if(data.isLock){
				this.$socketInstant.emit('ADMIN-GET-ALL-USER')
			}
		});
		this.$socketInstant.on('ADMIN-UNLOCK-ACCOUNT-USER-STATUS',async data=>{
			if(data.isUnLock){
				this.$socketInstant.emit('ADMIN-GET-ALL-USER')
			}
		});
		this.$socketInstant.on('COMMIT-ADD-FRIEND-STATUS',async data=>{
			this.$socketInstant.emit('ADMIN-GET-ALL-USER')
		})
	},
	created(){
		this.$socketInstant.emit('ADMIN-GET-ALL-USER')
	}
}
</script>
<style>
.AdUser-cpn{
	width: 95%;
	margin: 1rem auto;
	
}
.list-account{
	width: 100%;
	margin: 0 auto;
	text-align: center;
}
.list-account-thead{
	width: 99.5%;
	margin: 0px;
}
.list-account thead, .list-account tbody{
	background-color: white;
	border-radius: 4px;
}
.list-account-content{
	/*text-align: center;*/

}
.list-account-content td{
	padding: 7px 0px;
	/*border-left: 1px solid #0091ff;*/
}
.list-account th{
	border-bottom: 2px solid #0091ff;
	color: #0091ff;
	/*background-color: #0091ff;*/
	/*color: white;*/
}


.list-account-content .bi-eye-fill{
	color: #0091ff;
}
.list-account-content .bi-lock-fill{
	color:  black;
}
.list-account-content .bi-unlock-fill{
	color: #0091ff;
}
.list-account-content .bi-x-octagon-fill{
	color: red;
}
.list-account-content .bi-envelope-open-fill{
	color: #0091ff;
}
.croll-taskbar1{
    width: 100%;
    max-height: 300px;
    overflow-y: scroll;
    /*border: 1px solid red ;*/
    /*background-color: green;*/
}
/*#list-account-content-id tbody tr:nth-child(odd) td{
	background-color: #dde3ee99 ;
}*/
/* width */
.croll-taskbar1::-webkit-scrollbar {
  width: 5px;
}


.croll-taskbar1::-webkit-scrollbar-track {
  border-radius: 10px;
}

.croll-taskbar1::-webkit-scrollbar-thumb {
  background: #36404a; 
  border-radius: 10px;
}

.croll-taskbar1::-webkit-scrollbar-thumb:hover {
  background: #2e0538; 
}

.list-account tr:nth-child(even) td{
	background-color: #e7e9ee;
}
</style>