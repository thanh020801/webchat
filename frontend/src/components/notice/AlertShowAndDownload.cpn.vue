<template>
<div>
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
					<!-- {{messageModalContent}} -->
				</div>
				<div class="modal-body" v-if='fomatFileType(messageModalContent) === "File"'>
					{{messageModalContent.split('/')
						[messageModalContent.split('/').length-1]}}aaaaaaa
				</div>
				<div class="modal-footer">
					<button type="button" 
							class="btn btn-secondary" 
							data-bs-dismiss="modal">
							Thoát
					</button>
					<a target="_blank" :href="messageModalContent">
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
	
</div>
	
</template>
<script>
	export default {
		props:['item']
	}
</script>
<style type="text/css"></style>