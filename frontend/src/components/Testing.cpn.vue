<template>
    <div class=" testing d-flex align-items-center justify-content-center flex-column gap-4">
      <div class="d-flex">
        <input class="testing-input  " type="text" placeholder="Gửi tin nhắn tới ..." aria-label="Search">
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
		width: 550px;
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
	}
</style>