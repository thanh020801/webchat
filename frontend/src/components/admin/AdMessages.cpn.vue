<template>
	<div class="AdUser-cpn">
        <table class="list-account list-account-thead">
            <thead>
                <tr>
                    <th style="width: 5%;">Stt</th>
                    <th style="width: 12%;">Người gửi</th>
                    <th style="width: 32%;">Nội dung</th>
                    
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
						

						<td  style="width: 32%;" 
							v-if='message.message_category === "text"'>
							{{message.message_content}}
						</td>

						<td  style="width: 32%;" 
							v-else-if='fomatFileType(message.message_content) === "Ảnh"'>
						
							<div type="button" 
									class="" 
									data-bs-toggle="modal" 
									data-bs-target="#getMessageModal"
									@click='getMessageModal(message.message_content)'
							>
							  		<img class="admin-message-image" :src="message.message_content" >
							</div>
							
						</td>
						<td  style="width: 32%;" 
							v-else-if='fomatFileType(message.message_content) === "File"'>

							<div type="button" 
									class="" 
									data-bs-toggle="modal" 
									data-bs-target="#getMessageModal"
									@click='getMessageModal(message.message_content)'
							>
							  		{{message.message_content.split('/')
									[message.message_content.split('/').length-1]}}
							</div>

						</td>
						<td  style="width: 32%;" 
							v-else='fomatFileType(message.message_content) === "File"'>
							{{message.message_content}}
							
						</td>

						<td  style="width: 15%;">
							<!-- {{message.message_category}} -->
							{{message.message_category === 'text'? "Text": fomatFileType(message.message_content)}}
						</td>
						<td  style="width: 15%;">
							<!-- {{message.message_date}} -->
							{{fomatTime(message.message_date)}}
							
						</td>
						<td  style="width: 15%;">
							{{fomatDate(message.message_date)}}
						</td>
						<td style="width: 7%;">
							<i 	@click='removeMessage(message._id,message.message_category === "text" ? "" : message.message_content)'
							 	class="bi bi-x-octagon-fill">
							 </i>
						</td>
					</tr>
	                     
	            </tbody>
	        </table>

        </div>
	   
    </div>

<div class="modal fade" id="getMessageModal" 
								tabindex="-1" aria-labelledby="getMessageModal" 
								aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" 
					id="getMessageModal">
						Tải xuống
				</h5>
				<button type="button" 
						class="btn-close" 
						data-bs-dismiss="modal" 
						aria-label="Close">
				</button>
			</div>
			<div class="modal-body" v-if='fomatFileType(messageModalContent) === "Ảnh"'>
				<img style="width: 100%;" :src="messageModalContent">
			</div>
			<div class="modal-body" v-if='fomatFileType(messageModalContent) === "File"'>
				{{messageModalContent.split('/')
					[messageModalContent.split('/').length-1]}}
			</div>
			<div class="modal-footer">
				<button type="button" 
						class="btn btn-secondary" 
						data-bs-dismiss="modal">
						Thoát
				</button>
				<a target="_blank" 
					:href="messageModalContent">
					<button type="button" 
						class="btn btn-primary" 
						data-bs-dismiss="modal">
						Xác nhận
					</button>
				</a>

			</div>
		</div>
	</div>
</div>

<!-- <AlertShowAndDownload/> -->
</template>
<script>
import {fomatTime,fomatDate} from '@/services/untils.js'
import AlertShowAndDownload from '@/components/notice/AlertShowAndDownload.cpn.vue'
export default{
	components: AlertShowAndDownload,
	data(){
		return{
			messages: [],
			fomatTime: fomatTime,
			fomatDate: fomatDate,
			messageModalContent: "",
		}
	},
	methods:{
		getMessageModal(content){
			this.messageModalContent = content
		},
		removeMessage(id,filename){
			console.log('removeMessage',{id,filename})
			this.$socketInstant.emit('REMOVE-MESSAGE-WITH-ID',{id,filename})
		},
		fomatFileType(fileType){
			// console.log('fileType',fileType.split('.')[fileType.split('.').length-1])
			const type = fileType.split('.')[fileType.split('.').length-1]
			// console.log('fileType',fileType.split('.')[fileType.split('.').length-1])
			if(type === 'png' || type === 'PNG' ||type === 'jpg' || type === 'jpeg' ){
				return  "Ảnh"
			}
			if(type === 'pdf' || type === 'rar' ||type === 'zip' || type === 'docx' ||
				type === 'txt' || type === 'pptx'){
				return  'File'
			}
		}
	},
	mounted(){
		this.$socketInstant.on('ADMIN-GET-ALL-MESSAGES-STATUS', async data=>{
			this.messages = data.messages
		});
		this.$socketInstant.on('ADMIN-UPDATE-MESSAGES-STATUS', async data=>{
			// console.log(this.$route.params.id_message,",,,",data.id_message)
			if(this.$route.params.id_message === data.id_message){
				this.messages = data.messages
			}
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
.admin-message-image{
/*	display: block;*/
	max-width: 40px;
}
</style>