<template>
    <div class=" d-flex">
      <!-- <div class="d-flex"> -->
        <input class="testing-input  " type="text" placeholder="Gửi tin nhắn tới ..." aria-label="Search">
        <button class="testing-submit " type="submit">
        	<input class="input-submit-file" type="file" id="input-submit-file">
        	<label for="input-submit-file"><i class="bi bi-file-earmark-text-fill"></i></label>
        </button>
        <button class="testing-submit " type="submit">
        	<i class="bi bi-send-fill"></i>
        </button>
      <!-- </div> -->
    </div>
	
</template>
<script>
	export default{
		
	}
</script>
<style type="text/css">
	.testing{
		width: 97%;
		margin: 0 auto;
		/*background-color: #673ab7;*/
		box-shadow: 2px -1px 5px 0px black;
		height: 10vh;
		border-radius: 5px;
	}
	.testing-input{
		outline: none;
		border-radius: 5px 0px 0px 5px;
		padding: 1rem;
		/*margin-top: 0.2rem;*/
		width: 84%;
		height: 10vh;
		/*background-color: #673ab7;*/
		border: none;
	}
	.testing-input:focus ,.testing-submit-file:focus{
		border: none;
	}
	.testing-submit, .testing-submit-file{
		width: 7%;
		/*height: 50px;*/
		font-size: 25px;
		border: none;
		outline: none;
		float: right;
	}
	.testing-submit{
		border-radius: 0px 5px 5px 0px;
	}
	.input-submit-file{
		display: none;
	}
</style>