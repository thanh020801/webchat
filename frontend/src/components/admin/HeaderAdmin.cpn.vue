<template>
	<div class="headerAdmin">
		<div class="title-and-back">
			<div class="back" @click.prevent='$router.go(-1)'><i class="bi bi-arrow-left"></i></div>
			<div class="titleAd">{{$store.admin.chosen}}</div>
		</div>
		<div>
		<div class="search-taskbar">
			<div class="d-flex">
				<button class="search-taskbar-submit" type="submit">
					<i class="bi bi-search"></i>
				</button>
				<input v-model='searchFriend' class="search-taskbar-input " type="text" placeholder="Search ..." aria-label="Search">
			</div>
		    </div>
		</div>
		<div class="accountAd">
			acount
		</div>
	</div>
	


</template>
<script>
export default {
	data(){
		return {
			searchFriend:""
		}
	}
}

</script>
<style type="text/css">
.headerAdmin{
	width: 100%;
	height: 50px;
	background-color: #0091ff;
	display: grid;
	grid-template-columns: 2fr 2fr 1fr;
	align-items: center;
	text-align: center;
	box-shadow: 5px 1px 10px 0px black;
	/*z-index: 1000;*/
}
.title-and-back{
	display: grid;
	grid-template-columns: 1fr 7fr;
	align-items: center;
}

.title-and-back .back{
	width: fit-content;
	margin: 0 auto;
	padding: 0 3px;
}
.title-and-back .back:hover{
	background-color: #0055ab;
	border-radius: 5px;
}
.headerAdmin .titleAd{
	font-weight: bold;
	font-size: 23px;
	color: white;
	text-align: left;
	/*padding-left: 2rem;*/
}



.headerAdmin .search-taskbar{
	margin: 0px;
	color: white;
}
.headerAdmin .search-taskbar{
	background-color:  #0091ff;
	width: 80%;
}
/*.headerAdmin .search-taskbar{
	background-color:  #0091ff;

	
}*/
.headerAdmin .search-taskbar-input,.headerAdmin .search-taskbar-input:focus ,.headerAdmin .search-taskbar-submit{
	background-color: #0091ff;
	color: white;
	border-bottom: 1px solid white;
}
.headerAdmin .search-taskbar-submit .bi , .headerAdmin .search-taskbar-input::placeholder, 
.headerAdmin .accountAd{
	color: white;
}
/*.headerAdmin .search-taskbar-input:focus, .headerAdmin .search-taskbar-input:hover{
	border-bottom: 1px solid white;
}*/
</style>