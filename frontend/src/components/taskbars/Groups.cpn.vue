<template>
	<div class="title">
		<div><h2 class="title-name" >Groups</h2></div>
		<div v-on:click="alertDisplay"><i class="bi bi-people-fill"></i></div>
	</div>
		<div class="search-taskbar">
      <div class="d-flex">
      	<button class="search-taskbar-submit" type="submit"><i class="bi bi-search"></i></button>
        <input class="search-taskbar-input " type="text" placeholder="Search ..." aria-label="Search">
      </div>
    </div>

	<div class="croll-taskbar">
		<div class="taskbar " v-for="group in groups">
			<div class="avartar-taskbar">
				<img class="avarta-taskbar" src="../../assets/images/spider3.jpg">
			</div>
			<div class="name-taskbar">
				<div class="name-taskbar">{{group.name}}</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {groups: 
				[
					{avarta: '', name: '#News'},
					{avarta: '', name: '#Game'},
					{avarta: '', name: '#Learn'},
					{avarta: '', name: '#Techology'},
					{avarta: '', name: '#Language'},
					{avarta: '', name: '#Python'},
					{avarta: '', name: '#Nodejs'},
					{avarta: '', name: '#Vuejs'},
					{avarta: '', name: '#Reactjs'},
				]
			}
		},
		methods:{
			alertDisplay(){
        this.$swal.fire({title:'Create Group', 
        						input: 'text',
        						inputLabel: 'Group name',
        						inputPlaceholder: 'Enter your group name here',
        						background:'#272c3b', 
        						color: '#dedede',
        					}).then((res)=>{
        	console.log(res.value)
        });
        // console.log(this.$swal)
			}
		}
	}
</script>
<style type="text/css">

</style>