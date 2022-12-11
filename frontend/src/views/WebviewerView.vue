<template>
	<!-- <WebViewer :initialDoc='item.message_content'/>  -->
	<!-- <h1>helo</h1> {{url}} -->
	<WebViewer :initialDoc='url'/>

</template>
<script>
import WebViewer from "@/components/Viewer/WebViewer.cpn.vue";
export default{
	data(){
		return{
			url: "http://localhost:5000/uploads/"+ this.$route.params.initialDoc
		}
	},
	components: {WebViewer},
	mounted(){
		console.log(this.$route.params.initialDoc)
	}
}
</script>
