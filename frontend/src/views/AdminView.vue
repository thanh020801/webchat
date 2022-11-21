<template v-if='$store.userProfile.admin && $store.isLogin'>
<!-- 	<h1>T là admin</h1>
 -->	
<div class="Admin">
	<div>
		<TaskbarAdmin />
	</div>
	<div>
		<div class="headerAd">
			<HeaderAdmin />
		</div>
		<div class="Croll-TaskbarAdmin">
			<div class="block-option">
				<BlockOp />
			</div>

			<div class="manager">
				<router-view />
			</div>
		</div>
			
	</div>
		
</div>
</template>
<script>
import TaskbarAdmin from '@/components/admin/TaskbarAdmin.cpn.vue';
import HeaderAdmin from '@/components/admin/HeaderAdmin.cpn.vue';
import BlockOp from '@/components/admin/BlockOp.cpn.vue';

export default {
	data(){
		return{}
	},
	components:{
		HeaderAdmin,
		BlockOp,
		TaskbarAdmin,
	}
}
</script>
<style type="text/css">
.Admin{
	width: 100%;
	height: 100vh;
	background-color: #e1e1e1;
	z-index: 0;
	display: grid;
	grid-template-columns: 1fr 4fr;
}
.Croll-TaskbarAdmin{
	width: 100%;
	height: 100vh;
	overflow-y: scroll;
}
.Croll-TaskbarAdmin::-webkit-scrollbar {
  width: 8px;
}


.Croll-TaskbarAdmin::-webkit-scrollbar-track {
  border-radius: 10px;
}

.Croll-TaskbarAdmin::-webkit-scrollbar-thumb {
  background: #36404a; 
  border-radius: 10px;
}

.Croll-TaskbarAdmin::-webkit-scrollbar-thumb:hover {
  background: #2e0538; 
}
</style>