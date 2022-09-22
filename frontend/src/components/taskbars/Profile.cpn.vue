<template>
	<div class="title">
			<h2 class="title-name" >Profile</h2>
	</div>

	<!-- <div class="croll-taskbar"> -->
		<div class="taskbar-profile">
			<div class="avartar-profile">
				<img src="../../assets/images/spider3.jpg"  >
			</div>
			<div class="info-profile">
				<div class="info-profile-name">
					<div>Name: </div><div class="info-profile-value">Nguyễn Tuấn Thanh</div>
				</div>
				<div class="info-profile-name">
					<div>Username: </div><div class="info-profile-value">thanh@gmail.com</div>
				</div>				
				<div class="info-profile-name">
					<div>Phone: </div><div class="info-profile-value">0972227890</div>
				</div>
				<div class="info-profile-name">
					<div>Friends: </div><div class="info-profile-value">500 people</div>
				</div>
				<div class="info-profile-name">
					<div>Rooms: </div><div class="info-profile-value">20 room</div>
				</div>
				<!-- <div class="info-profile-name">
					<div>Birthday: </div><div class="info-profile-value">02/08/2001</div>
				</div><div class="info-profile-name">
					<div>Birthday: </div><div class="info-profile-value">02/08/2001</div>
				</div> -->

			</div>
			<div class="change-profile">
				<div class="btn btn-primary"><i class="bi bi-pencil-square"></i> Chỉnh sửa</div>
			</div>
		</div>
		
	<!-- </div> -->

</template>
<script>
	export default{
		data(){
			return {}
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
.title-profile{
	padding: 0.5rem 2rem;
}
.taskbar-profile {
	width: 100%;
	padding: 0.5rem 2rem;
}
.avartar-profile{
	width: 100px;
	margin: 0 auto;
}
.avartar-profile img{
	width: 100px;
	height: 100px;
	border-radius: 100%;
	margin: 0 auto;
	margin-bottom: 1rem;
}
/*.info-profile{
	color: #dedede;
}*/
.info-profile-name{
	grid-template-columns: 30% auto;
  	display: grid;
	width: 100%;
	padding: 0.3rem 0;
}
.info-profile-value{
	text-align: right;
}
.change-profile{
	margin-top: 1.5rem;
	width: 100%;
	justify-content: right;
	justify-items: right;
}
.change-profile .btn-primary{
	text-align: right;
	float: right;
}
</style>