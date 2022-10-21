<script >
import { RouterLink, RouterView } from 'vue-router'
export default{
    created(){
        if(this.$store.isLogin){
            this.$router.push('/')
        }else{
            this.$router.push('/login')        
        }
    }
}
</script>

<template>

  <div  :class='$store.theme'
        class=" container-fluid" 
       >

    <RouterView />
  </div>
</template>

<style>
  @import '@/assets/CSS/theme-dark.css';
  @import '@/assets/CSS/theme-bright.css';
  @import '@/assets/CSS/general.css';
  @import url(https://fonts.googleapis.com/css?family=Raleway);
  .container-fluid{
    /*height: 100vh;*/
    margin: 0px;
    padding: 0px;
  }
  body{
    overflow: hidden;
    font-family: 'Raleway', serif;
  }

</style>
