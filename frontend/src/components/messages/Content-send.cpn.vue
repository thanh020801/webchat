<template>
<!-- 	<div class="message-receive" >
		<div class="content-receive-message">
			<div class="message-receive-content">{{item.message_content}}</div>
			<div class="time-receive">{{item.message_date}}</div>
		</div>
	</div> -->
	<div class="message-send">
		<div class="content-send-message">
			<div class="message-send-content">{{item.message_content}}</div>
			<div class="time-send">{{item.message_date}}</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{

			}
		},
		props: ['item']
	}
</script>
<style type="text/css">
.message-send{
	margin: 0.5rem;
	display: flex;
	justify-content: flex-end;
}

.content-send-message{
	/*padding-left: 1rem;
	padding-right: 1rem;
*/	padding: 0.5rem 1rem;
	max-width: 550px;
	/*border:  1px solid black;*/
	/*background-color: darkblue;*/
	border-radius: 10px;
}

.time-send{
	font-size: 11px;
/*	color: #8d8484;
*/}
.message-send-content{
	font-size: 16px;
	color: white;
}
</style>