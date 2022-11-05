<template>
	<div class="AdUser-cpn">
        <table class="list-account list-account-thead">
            <thead>
                <tr>
                    <th style="width: 5%;">Stt</th>
                    <th style="width: 12%;">Người gửi</th>
                    <th style="width: 25%;">Nội dung</th>
                    
                    <th style="width: 15%;">Loại tin nhắn</th>
                    <th style="width: 15%;">Thời gian gửi</th>
                    <th style="width: 15%;">Ngày gửi</th>
                    <th style="width: 7%;">Xóa</th>
                </tr>
            </thead>
        </table>
        <div class="croll-taskbar1">
        	<table class="list-account" id="list-account-content-id-AdUser">
	            <tbody >
					<tr class="list-account-content" v-for='(message,index) in messages'>
						<td  style="width: 5%;">{{index+1}}</td>
						<td  style="width: 12%;">{{message.message_name_send}}</td>
						<td  style="width: 25%;">{{message.message_content}}</td>
						
					
						<td  style="width: 15%;">{{message.message_category}}</td>
						<td  style="width: 15%;">
							<!-- {{message.message_date}} -->
							{{fomatTime(message.message_date)}}
							
						</td>
						<td  style="width: 15%;">
							{{fomatDate(message.message_date)}}
						</td>
						<td style="width: 7%;">
							<i 	@click='removeMessage(message._id)'
							 	class="bi bi-x-octagon-fill">
							 </i>
						</td>
					</tr>
	                     
	            </tbody>
	        </table>

        </div>
	   
    </div>
</template>
<script>
import {fomatTime,fomatDate} from '@/services/untils.js'
export default{
	data(){
		return{
			messages: [],
			fomatTime: fomatTime,
			fomatDate: fomatDate
		}
	},
	methods:{
		removeMessage(id){
			console.log('removeMessage',id)
			this.$socketInstant.emit('REMOVE-MESSAGE-WITH-ID',id)
		}
	},
	mounted(){
		this.$socketInstant.on('ADMIN-GET-ALL-MESSAGES-STATUS', async data=>{
			this.messages = data
			// console.log('this.messages', this.messages)
		});
		this.$socketInstant.on('REMOVE-MESSAGE-WITH-ID-STATUS',async data=>{
			this.$socketInstant.emit('ADMIN-GET-ALL-MESSAGES', this.$route.params)
		})
	},
	created(){
		// console.log('id_message', this.$route.params)
		// console.log(fomatTime,fomatDate)
		this.$socketInstant.emit('ADMIN-GET-ALL-MESSAGES', this.$route.params)
	}
}
</script>
<style>
/*.list-account{
	width: 100%;
	margin: 0 auto;
	text-align: center;
}*/
.list-account-content{
	/*text-align: center;*/
}
/*.list-account-content td{
	padding: 5px 0px;
}
*/
.list-account-content .bi-envelope-open-fill{
	color: #0091ff;
}
.list-account-content .bi-x-octagon-fill{
	color: red;
}

/*#list-account-content-id tbody tr:nth-child(odd) td{
	background-color: #dde3ee99 ;
}*/
</style>