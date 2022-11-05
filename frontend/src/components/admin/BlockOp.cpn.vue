<template>
	<div class="block">
		<div class="block-item block-item1">
			<span>Số tài khoản: {{blockItemAccount}}
			</span>
		</div>
		<div class="block-item block-item2">
			<span>Số nhóm: {{blockItemGroup?blockItemGroup:0}}
			</span>
		</div>
		<div class="block-item block-item3">
			<span>
			Số tin nhắn: {{blockItemMessage?blockItemMessage:0}}
			</span>
		</div>
		<div class="block-item block-item4">
			<span>
				Lượt truy cập: {{blockItemOnline?blockItemOnline:0}}
			</span>
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return{
			blockItemAccount: "",
			blockItemGroup: "",
			blockItemMessage: "",
			blockItemOnline: "",
		}
	},
	mounted(){
		this.$socketInstant.on('GET-BLOCK-ITEMS-STATUS',async data=>{
			console.log(data)
			if(data.blockItemAccount){
				this.blockItemAccount = data.blockItemAccount
			}if(data.blockItemMessage){
				this.blockItemMessage = data.blockItemMessage
			}if(data.blockItemOnline){
				this.blockItemOnline = data.blockItemOnline
			}if(data.blockItemGroup){
				this.blockItemGroup = data.blockItemGroup
			}
			

		// setInterval(()=>{
		// 	this.$socketInstant.emit('GET-BLOCK-ITEMS')
		// },1000)
			
			
			
		})
	},
	created(){
		this.$socketInstant.emit('GET-BLOCK-ITEMS')
	}
}
</script>
<style>
.block{
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	align-items: center;
	height: 50px;
	margin: 10px auto;
	text-align: center;
}
.block .block-item{
	width: 80%;
	height: 100%;
	/*background-color: red;*/
	margin: 0 auto;
	align-items: center;
	line-height: 50px;
	border-radius: 20px;
	font-weight: bold;
	color: white;

}
.block-item1{
	background-color: #fcc053;
	background-color: #1fd77e;
}
.block-item2{
	background-color: #6fff74;
	background-color: #8763cc;
}
.block-item3{
	background-color: #ff9e9e;
	background-color: #f8c901;
}
.block-item4{
	background-color: #8a9ff9;
	background-color: #fb6a6c;
}
</style>