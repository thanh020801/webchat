<script>
import Menu from '../components/Menu.cpn.vue'
import ContentSend from '../components/Content-send.cpn.vue'
import ContentReceive from '../components/Content-receive.cpn.vue'
import Header from '../components/Header.cpn.vue'
import Testing from '../components/Testing.cpn.vue'
export default{
  components:{
    Menu,ContentSend,ContentReceive,Header,Testing,
  }
}
</script>

<template>
    <main>
        <div class=" main-template">
            <div class="menu-layout"><Menu /></div>
            <div class="taskbar-layout">
                <!-- <Taskbar/> -->
                <router-view/>
            </div>
            <div class="frame-layout">
                <Header/>
                <div class="Contents" >
                    <div class="Content" v-for='i in 5'>
                        <ContentReceive />
                        <ContentSend/>
                        <!-- <ContentSend/> -->
                       
                        
                    </div>
                </div>
                <div class="testing">
                    <Testing/>
                </div>
            </div>
            
        </div>
    </main>
</template>
<style type="text/css">
    .main-template{
        height: 100%;
        grid-template-columns: 10% 30% auto;
        display: grid;
    }
    .menu-layout{
        width: 100%;
        padding: 0px;
        
    }
    .taskbar-layout{
        height: 100vh;
        padding: 0px;
        /*margin-bottom: 3rem;*/
        /*padding-bottom: 3rem;*/
    }
    .frame-layout{
        padding: 0px;
        /*background-color: gold;*/
    }
    .Contents{
        width: 100%;
        height: 77vh;
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
      background: #36404a; 
      border-radius: 10px;
    }

    /* Handle on hover */
    .Contents::-webkit-scrollbar-thumb:hover {
      background: #2e0538; 
    }
</style>