<template>
	<div class="AdUser-cpn">
        <table class="list-account list-account-thead">
            <thead>
                <tr>
                    <th style="width: 5%;">Stt</th>
                    <th style="width: 25%;">Tên Nhóm</th>
                    <th style="width: 20%;">Tên trưởng nhóm</th>
                    <th style="width: 15%;">Số thành viên</th>
                    <th style="width: 15%;">Xem tin nhắn</th>
                    <th style="width: 7%;">Xóa</th>
                </tr>
            </thead>
        </table>
        <!-- {{groups}} -->
        <div class="croll-taskbar1">
        	<table class="list-account" id="list-account-content-id-AdUser">
	            <tbody >
					<tr class="list-account-content" v-for='(group,index) in groups'>
						<td style="width: 5%;">{{index+1}}</td>
						<td style="width: 25%;">{{group.room_name}}</td>
						<td style="width: 20%;">{{group.room_admin}}</td>
						<td style="width: 15%;">{{group.room_member_number}}</td>
					
						<td style="width: 15%;">
							<router-link :to='"/admin/messages/" + group._id'>
								<i class="bi bi-envelope-open-fill"></i>
							</router-link>
						</td>
						<td style="width: 7%;">
							<i @click='removeGroup(group)' class="bi bi-x-octagon-fill"></i>
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
			groups:[],
		}
	},
	methods:{
		removeGroup(room){
			console.log(room)
			this.$socketInstant.emit('REMOVE-GROUP', {room})
		},
	},
	mounted(){
		this.$socketInstant.on('ADMIN-GET-ALL-GROUP-STATUS', async data=>{
			this.groups = data
			console.log('data',this.groups)
		});
		this.$socketInstant.on('REMOVE-GROUP-STATUS', async data=>{
			if(data.isRemoveGroup){
				this.$socketInstant.emit('ADMIN-GET-ALL-GROUP')
			}
			this.$socketInstant.emit('GET-BLOCK-ITEMS')
		});
		this.$socketInstant.on('CREATE-GROUP-STATUS', async data=>{
			this.$socketInstant.emit('ADMIN-GET-ALL-GROUP')
		})
	},
	created(){
		this.$socketInstant.emit('ADMIN-GET-ALL-GROUP')
	}
}
</script>
<style>
/*.list-account{
	width: 95%;
	text-align: center;
}
.list-account-content{
}
.list-account-content td{
	padding: 5px 0px;
}*/

.list-account-content .bi-envelope-open-fill{
	color: #0091ff;
}
.list-account-content .bi-x-octagon-fill{
	color: red;
}


</style>