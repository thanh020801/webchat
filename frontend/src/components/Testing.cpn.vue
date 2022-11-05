<template>
    <div class=" d-flex ">
    	<div id="showFile" >
    	</div>
    	<div v-if='file'>
    		<div id="closeFile" v-if='file.type === "image/png" || file.type === "image/jpeg"'>
	    		<i @click="closeImg"  class="bi bi-x-lg"></i>
	    	</div>
	    	<div id="close-file-name" v-else>
	    		<i @click="closeImg"  class="bi bi-x-lg"></i>
	    	</div>
    	</div>
	    	
        <input class="testing-input" v-model='message.content' type="text" placeholder="Gửi tin nhắn tới ..." aria-label="Search" v-on:keyup.enter='sendMessage(message.content)'>
        <button class="testing-submit " type="submit">
        	<input class="input-submit-file" type="file" @change="selectFile" id="input-submit-file">
        	<label for="input-submit-file"><i class="bi bi-file-earmark-text-fill"></i></label>
        </button>
        <button class="testing-submit" type="submit"  @click='sendMessage(message.content)'>
        	<i class="bi bi-send-fill"></i>
        </button>
    </div>
	
</template>
<script>
	import {TestStore} from '@/stores/test.js'
	import {userConfig} from '@/stores/userConfig.js'
	export default{
		data(){
			return {
				message:{
					content : "",
					time: "",
				},
				file: "",
			}
		},
		setup(){
			const {friend_EX,room_EX,message_EX,userProfile_EX} = TestStore()
			const configUser = userConfig()
			return {friend_EX,room_EX,message_EX,userProfile_EX,configUser}
		},
		methods:{
			selectFile(e){
				console.log('this.file', e.target.files)
				this.file = e.target.files[0]
				if(!this.file){
					return
				}
				
				if(this.file.type === 'image/png' || this.file.type === 'image/jpeg'){
					var showImg = document.getElementById('showImg')
					// console.log(showImg)
					if(showImg){
						showImg.remove()
					}
					var reader  = new FileReader();
				    reader.onload = function(e)  {
				        var image = document.createElement("img");
				        image.src = e.target.result;
				        image.width = 200
				        image.height = 200
				        image.id = 'showImg'
				        document.getElementById('showFile').appendChild(image);
				     }
				     reader.readAsDataURL(this.file);
				}else{
					var show_file_name = document.getElementById('show-file-name')
					if(show_file_name){
						show_file_name.remove()
					}
					var newDivFile = document.createElement("div");
				    newDivFile.id = 'show-file-name'
				    var newTextFile = document.createTextNode(this.file.name);
           			newDivFile.appendChild(newTextFile);
					document.getElementById('showFile').appendChild(newDivFile);
				}
				    
			},

			closeImg(){
				if(this.file.type === 'image/png' || this.file.type === 'image/jpeg'){
					console.log('close file',this.file)
					document.getElementById('showImg').remove()
				}else{
					document.getElementById('show-file-name').remove()
				}
				this.file = ""
			},
			sendMessage(content){
				if(!content){
					return
				}
				var today = new Date()	
				var timeStandard = new Date(this.$store.timeStandard)
				var message = {
					message_name_send: this.$store.userProfile.username,
					message_content: this.message.content,
					message_date: new Date(),
					message_count: ((today - timeStandard)/(1000*60)).toFixed(3),
					message_category: 'text',
					id_message: this.$store.userChosen.id_message
				}
				console.log(message)
				var chosen= this.$store.userChosen
				console.log(chosen)
				if(chosen.room){
					this.$socketInstant.emit('SEND-MESSAGE',
						{message,room_name: chosen.room.room_name,friend_name: ""})
				}
				else if(chosen.friend){
					this.$socketInstant.emit('SEND-MESSAGE',
						{message,room_name: "",friend_name: chosen.friend.username})
				}
				this.message ={
					content : "",
					time: "",
				}

			}
		}
	}
</script>
<style type="text/css">
	#closeFile{
		width: 150px;
		height: 150px;
		position: fixed;
		right: 13px;
		bottom: 60px;
		align-items: center;
		text-align: center;
		background-color: #ffffff00;
		border-radius: 10px;
	}
	#closeFile:hover{
		background-color: #c4c4c4a3;
	}
	#closeFile .bi{
		font-size: 50px;
		color: #ff000000;
		padding-top: 50px;
		text-align: center;
		line-height: 150px;
	}
	#closeFile .bi:hover{
		color: red;
	}
/**/
	#close-file-name{
		width: 40px;
		height: 50px;
		position: fixed;
		right: 13px;
		bottom: 60px;
		align-items: center;
		text-align: center;
		background-color: #dedede;
		border-radius: 0px 10px 10px 0px;
	}
	#close-file-name .bi{
		font-size: 20px;
		color: red;
		text-align: center;
		line-height: 50px;
	}
	#close-file-name .bi:hover{
		color: red;
		font-size: 24px;
	}
/**/
	#showFile #showImg{
		width: 150px;
		height: 150px;
		position: fixed;
		right: 13px;
		bottom: 60px;
		box-shadow: -2px 5px 7px  black;
		border-radius: 10px;
	}
	#show-file-name{
		min-width: 100px;
		min-height: 50px;
		line-height: 50px;
		position: fixed;
		right: 50px;
		bottom: 60px;
		background-color: #dedede;
		border-radius: 10px 0px 0px 10px;
		padding: 0 10px;
	}
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