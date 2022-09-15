<template>
    <div class=" testing d-flex align-items-center justify-content-center flex-column gap-4">
      <div class="d-flex">
        <input class="testing-input  " type="text" placeholder="Message" aria-label="Search">
        <button class="testing-submit " type="submit">
        	<i class="bi bi-send-fill"></i>
        </button>
      </div>
    </div>
	
</template>
<script>
	export default{
		
	}
</script>
<style type="text/css">
	.testing{
		/*background-color: #673ab7;*/
		height: 10vh;
	}
	.testing-input{
		outline: none;

		padding: 0px;
		/*margin-top: 0.2rem;*/
		width: 680px;
		/*background-color: #673ab7;*/
		border: none;
	}
	.testing-input:focus{
		border: none;
	}
	.testing-submit{
		/*height: 50px;*/
		font-size: 25px;
		border: none;
		outline: none;
		/*background-color:#673ab7 ;*/
		/*margin-top: 0.2rem;*/
	}
/*	.testing{
		border-radius: 10px;
		margin: 0.3rem 1rem;
		height: 8vh;
		width: 100px;
		grid-template-columns: 85% 10% 5%;
		display: grid;
		background-color: pink;
	}*/
/*	.text-message{
		height: 8vh;
		border-radius: 10px;
		padding: 0.5rem;
		background-color: pink;
		border: none;

	}
	.send-text{
		align-content: center;
		align-items: center;
	}*/
</style>