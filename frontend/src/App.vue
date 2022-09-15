<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container-fluid">
    <RouterView />
  </div>
</template>

<style>
  @import '@/assets/CSS/theme-dark.css';
/*  .container-fluid{
    height: 100vh;
  }*/
  body{
    overflow: hidden;
  }

</style>
