<template>
	<div class="message-send">
		<div class="avarta-message" >
			<img class="avartar-messase-img" src="../assets/images/spider3.jpg">
		</div>
		<div class="content-send-message">
			<div class="name-send">thanh</div>
			<div class="message-send-content">Hi Eric, I'm fine</div>
			<div class="time-send">6:50</div>
		</div>
	</div>
</template>
<script>
	export default{
		
	}
</script>
<style type="text/css">
.message-send{
	margin: 0.7rem;
	/*padding: 1rem;*/
	grid-template-columns: 40px auto;
	display: grid;
}
.avartar-messase-img{
	width: 30px;
	height: 30px;
	border-radius: 100%;
}
.content-send-message{
	padding: 0.3rem 1rem;
	max-width: fit-content;
	/*border:  1px solid black;*/
	/*background-color: brown;*/
	border-radius: 10px;
}
.name-send{
	font-size: 14px;
	/*color: red;*/
}
.time-send{
	font-size: 11px;
	/*color: #8d8484;*/
}
/*.message-send-content{
	font-size: 16px;
	color: white;
}*/
</style>