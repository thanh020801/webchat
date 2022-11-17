<script>
import Menu from '../components/Menu.cpn.vue'
import Header from '../components/header/Header.cpn.vue'
import Testing from '../components/Testing.cpn.vue'
import FrameMS from '../components/frames/FrameMS.cpn.vue'
import FrameMSText from '../components/frames/FrameMSText.cpn.vue'
export default{
    components:{
        Menu,FrameMS,Header,Testing,FrameMSText,
    },
    methods:{

    },
    mounted(){
        

        this.$socketInstant.on('ADMIN-LOCKED-ACCOUNT-USER-STATUS', async res=>{
            this.$swal.fire({
              title: res.data.response,
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            }).then(()=>{
                this.$router.push('/login')
            })
            
        })
    },
}
</script>

<template>
    <main>
        <div class=" main-template">
            <div class="menu-layout"><Menu /></div>
            <div class="taskbar-layout">
                <router-view/>
            </div>
            <!-- {{$store.userChosen}} -->
            <div v-if='!$store.userChosen'>
                <FrameMSText/>  
            </div>
            <div class="frame-layout"  v-else>
                <Header/>
                <div id='croll-to-bottom' class="Contents" ref='container'>
                        <FrameMS/>                        
                </div>
                <div class="testing">
                    <Testing/>
                </div>
            </div>
            
            
        </div>
    </main><!-- 
    i-wish-this-would-scroll" 
                VueStickyScroll='scrollToBottom()' -->
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
        position: relative;
        /*background-color: gold;*/
    }
/*    .scroll-to-view{
        width: 30px;
        height: 30px;
        position: absolute;
        bottom: 100px;
        right: 50px;
        background-color: red;
        border-radius: 100%;
        font-weight: bold;
        font-size: 30px;
        line-height: -100px;
    }*/
    .Contents{
        width: 100%;
        height: 77vh;
        overflow-y: scroll;
        /*position: relative;*/
        /*display: block;*/
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