<template>
  <div class="login">

    <input type="text" v-model='user.username' placeholder="username">
    <input type="password" v-model='user.password' placeholder="password">
    <input type="password" v-model='user.confirmPassword' placeholder="password">
    <button class="btn btn-primary">Sign up</button>
    <router-link to='/login'>Sign in</router-link>
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
          confirmPassword: '',
        }
      }
    }
  }
</script>
<style>
@media (min-width: 1024px) {

}
</style>
