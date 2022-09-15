<script>
import Menu from '../components/Menu.cpn.vue'
import ContentSend from '../components/Content-send.cpn.vue'
import ContentReceive from '../components/Content-receive.cpn.vue'
import Taskbar from '../components/Taskbar.cpn.vue'
import Header from '../components/Header.cpn.vue'
import Testing from '../components/Testing.cpn.vue'
export default{
  components:{
    Menu,ContentSend,ContentReceive,Taskbar,Header,Testing,
  }
}
</script>

<template>
    <main>
        <div class="row main-template">
            <div class="col-sm-1 menu-layout"><Menu /></div>
            <div class="col-sm-3 taskbar-layout"><Taskbar/></div>
            <div class="col frame-layout">
                <Header/>
                <div class="Contents" >
                    <div class="Content" v-for='i in 15 '>
                        <ContentSend/>
                        <ContentSend/>
                       
                        <ContentReceive />
                    </div>
                </div>
                <Testing/>
            </div>
            
        </div>

    </main>
</template>
<style type="text/css">
    .main-template{
        height: 100vh;
    }
    .menu-layout{
        width: 60px;
        padding: 0px;
        
    }
    .taskbar-layout{
        padding: 0px;
    }
    .frame-layout{
        padding: 0px;
        /*background-color: gold;*/
    }
    .Contents{
        width: 100%;
        height: 79.6vh;
        overflow-y: scroll;
    }
    /* width */
    .Contents::-webkit-scrollbar {
      width: 5px;
    }

    /* Track */
    .Contents::-webkit-scrollbar-track {
      /*box-shadow: inset 0 0 5px #2e0538; */
      border-radius: 10px;
    }
     
    /* Handle */
    .Contents::-webkit-scrollbar-thumb {
      background: #2e053873; 
      border-radius: 10px;
    }

    /* Handle on hover */
    .Contents::-webkit-scrollbar-thumb:hover {
      background: #2e0538; 
    }
</style>