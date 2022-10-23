<template>
	<div class="header" v-if='$store.isLogin'>
			<div class="avt-header" >
				<img class="avartar-header" src="../../assets/images/spider3.jpg">
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
				 @click='showOption();'
				>
				 <i class="bi bi-three-dots-vertical"></i>
			</div>
			<div v-if='isShow'>
				<div v-if='!$store.userChosen.friend'>
					<OpGroup/>
				</div>
				<div v-else>
					<OpFriend />
				</div>
			</div>
			
			
	
	</div>


</template>
<script>
	import OpGroup from './OpGroup.cpn.vue'
	import OpFriend from './OpFriend.cpn.vue'
	export default{
		data(){
			return{
				// isFriend: this.$store.userChosen,
				// infoF:this.$store.userChosen.friend,
				// infoG:this.$store.userChosen.room,
				isShow: false,
			}
		},
		components:{
			OpGroup,OpFriend,
		},
		methods:{
			showOption(){
				this.isShow = !this.isShow
				// console.log(OpGroup)
			},
		},
		created(){
			// this.isShow = false
			window.addEventListener('click', (e) => {
				// console.log('header e',this.$el)
				// console.log(e.target)
	        if (!this.$el.contains(e.target)){
	          this.isShow = false
	          // console.log('ngoai')
	        }
	      })
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
		/*border-bottom: 1px solid #36404a;*/
		/*box-shadow: 2px 2px 5px 0px black;*/
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