<template>
  <div class="login">

    <input type="text" v-model='user.username' placeholder="username">
    <input type="password" v-model='user.password' placeholder="password">
    <button class="btn btn-primary" @click='login()'>Sign in</button>
    <router-link to='/register'>Register</router-link>
    <div class="dataRegister">
      {{user}}
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        user: {
          username: '',
          password: '',
        }
      }
    },
    methods:{
      login(){
        
      }
    }
  }
</script>
<style>
@media (min-width: 1024px) {

}
</style>
