<script >
import { RouterLink, RouterView } from 'vue-router'
import {userConfig} from '@/stores/userConfig.js'
export default{
  setup(){
    const configUser = userConfig()
    return {configUser}
  }
}
</script>

<template>

  <div  :class='configUser.userTheme'
        class=" container-fluid" 
       >
    <RouterView />
  </div>
</template>

<style>
  @import '@/assets/CSS/theme-dark.css';
  @import '@/assets/CSS/theme-bright.css';

  .container-fluid{
    /*height: 100vh;*/
    margin: 0px;
    padding: 0px;
  }
  body{
    overflow: hidden;
  }

</style>
