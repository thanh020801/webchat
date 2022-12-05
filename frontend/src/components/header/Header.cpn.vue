<template>
	<div class="header" v-if='$store.isLogin' >
			<div class="avt-header" v-if='$store.userChosen.friend'>
				<img class="avartar-header" 
					v-if='$store.userChosen.friend.avatar' 
					:src="$store.userChosen.friend.avatar">
				<img v-else class="avartar-header" src="../../assets/images/spider3.jpg">
			</div>
			<div class="avt-header" v-if='$store.userChosen.room'>
				<img class="avartar-header" 
					v-if='$store.userChosen.room.room_avatar' 
					:src="$store.userChosen.room.room_avatar">
				<img v-else class="avartar-header" src="../../assets/images/spider3.jpg">
			</div>
			<div class="name-header" v-if='$store.userChosen.friend'>
				<h4>{{$store.userChosen.friend.name}}</h4>
				<div v-if='$store.userChosen.isOnline'>online</div>
				<div v-else>offline</div>
			</div>
			<div class="name-header" v-if='$store.userChosen.room'>

				<h4>{{$store.userChosen.room.room_name}}</h4>
			</div>

			

			<div class="option-header" 
				@click='checkSearch = !checkSearch'
				>
				<i class="bi bi-search"></i>
			</div>

			<div class="option-header"
				  id="isShowOption"
				>
				 <i class="bi bi-three-dots-vertical" ></i>
			</div>
			
			
	
	</div>
<div class="alert alert-primary" v-if='checkSearch' role="alert">
	<div class="drop-search-message" @click='dropSearch'>
  		<i class="bi bi-arrow-left" style="color: #0091ff;"></i>
  	</div>
  	<div class="input-search-message">
  		<input type="text" v-model='searchKey' placeholder="Tìm tin nhắn">
  	</div>
  	<div><span v-if='searchKey'>Tìm thấy {{lengthSearch}}</span></div>
  	<div class="drop-search-message" @click='dropSearch'>
  		<i class="bi bi-x-octagon-fill" style="color: red;"></i>
  	</div>
</div>
<div id="OpGroupOpFriend">
	<!-- <div v-if='isShow' > -->
		<div v-if='!$store.userChosen.friend'>
			<OpGroup/>
		</div>
		<div v-else>
			<OpFriend />
		</div>
	<!-- </div> -->
</div>
</template>
<script>
	import OpGroup from './OpGroup.cpn.vue'
	import OpFriend from './OpFriend.cpn.vue'
	export default{
		data(){
			return{
					checkSearch: false,
					searchKey: "",
					lengthSearch: 0,
			}
		},
		components:{
			OpGroup,OpFriend,
		},
		methods:{
			search(){
		        if (this.searchKey) {
		        		// console.log('this.searchFriend',this.searchFriend)
		            var result = this.$store.messages.contents.filter(item => {
		                return this.searchKey
		                    .toLowerCase()
		                    .split(" ")
		                    .every(v => item.message_content.toLowerCase().includes(v));
		            });
		            this.$store.messages.searchMS = result ? result:
		        					this.$store.messages.contents
		        	this.lengthSearch = this.$store.messages.searchMS.length
		        }else{
		        	this.$store.messages.searchMS = []
		        	this.lengthSearch = this.$store.messages.searchMS.length
		        }
			},
			dropSearch(){
				this.$store.messages.searchMS = []
				this.checkSearch = false
				this.searchKey = ""
				this.lengthSearch = 0
			},
			showHideAlertCreateGroup(idShow,clickicon){
				document.addEventListener('click',(e)=>{
					const myclick = document.getElementById(idShow)
					const myclickicon = document.getElementById(clickicon)
					if(myclick && myclickicon){
						if(myclickicon.contains(e.target)){
							myclick.style.display = 'block'
							// console.log('click icon')
						}
						else if(!myclick.contains(e.target)){
							myclick.style.display = 'none'
						}
					}
				})
			}
		},
		mounted(){
			this.showHideAlertCreateGroup('OpGroupOpFriend','isShowOption')
		},
		watch:{
			searchKey(){
				this.search()
			}
		},
	}
</script>
<style type="text/css">
	.header{
		position: relative;
		height: 60px;
		align-items: center;
		margin: 0px;
		padding: 0 0.5rem;

		grid-template-columns: 13% auto 5% 5%;
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
	.name-header h4{
		margin: 0px;
	}
	.alert{
		display: grid;
		grid-template-columns: 5% auto 20% 5%;
		background-color: white;
		border-radius: 0px;
		margin: 0px;
		padding: 10px;
		align-items: center;
	}
	.alert input{
		width: 90%;
		margin: 0 auto;
		border: none;
		color: #0091ff;
	}
	.alert input:focus{
		outline: none;
		border: none;
		outline: none;
	}
</style>