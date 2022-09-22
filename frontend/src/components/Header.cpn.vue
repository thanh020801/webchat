<template>
	<div class="header">
		<div class="avt-header" ><img class="avartar-header" src="../assets/images/spider3.jpg"></div>
		<div class="name-header"><h4>Mega</h4></div>
		<div class="option-header"><i class="bi bi-three-dots-vertical"></i></div>
	</div>


</template>
<script>
	export default{
		
	}
</script>
<style type="text/css">
	.header{
		height: 60px;
		align-items: center;
		margin: 0px;
		padding: 0 0.5rem;
		/*border-bottom: 1px solid #36404a;*/
		box-shadow: 2px 2px 5px 0px black;
		/*background-color: blue;*/
		grid-template-columns: 13% auto 5%;
		display: grid;
	}
	.avartar-header{
		width: 40px;
		height: 40px;
		border-radius: 100%;
	}
	.avt-header{
		height: 40px;
	}
</style>