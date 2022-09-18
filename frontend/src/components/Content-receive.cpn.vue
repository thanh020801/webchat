<template>
	<div class="message-receive" >
		<div class="content-receive-message">
			<div class="message-receive-content">Hello Mega, How are you</div>
			<div class="time-receive">6:50</div>
		</div>
	</div>
</template>
<script>
	export default{
		
	}
</script>
<style type="text/css">
.message-receive{
	margin: 0.5rem;
	display: flex;
	justify-content: flex-end;
}

.content-receive-message{
	/*padding-left: 1rem;
	padding-right: 1rem;
*/	padding: 0.5rem 1rem;
	max-width: 550px;
	/*border:  1px solid black;*/
	/*background-color: darkblue;*/
	border-radius: 10px;
}

.time-receive{
	font-size: 11px;
/*	color: #8d8484;
*/}
.message-receive-content{
	font-size: 16px;
	color: white;
}
</style>