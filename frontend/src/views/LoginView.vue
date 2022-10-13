<template>
  <div class="login">

    <input type="text" v-model='username' placeholder="username">
    <input type="password" v-model='password' placeholder="password">
    <button class="btn btn-primary" @click='login()'>Sign in</button>
    <router-link to='/register'>Register</router-link>
    <div class="dataRegister">
      <!-- {{user}} -->
    </div>
  </div>
</template>
<script>
  import {TestStore} from '@/stores/test.js'
  import realtime from '@/services/realtime.js'
  export default {
    data(){
      return {
          socketInstant: realtime(),
          username: '',
          password: '',
      }
    },
    setup(){
      const {userProfile_EX} = TestStore()
      return {userProfile_EX}
    },
    methods:{
      login(){
        if(this.username !=="" && this.password !==''){
          this.userProfile_EX.isLogin = true
          this.userProfile_EX.username = this.username
          this.userProfile_EX.password = this.password 
          console.log(this.username, this.password)
          console.log(this.userProfile_EX)
          this.$router.push('/')
          this.socketInstant.emit('hello')
          this.socketInstant.on('hello-status', async (data)=>{
            alert(data)
          })
        }else{
          alert('Moi ban nhap')
        }
      }
    }
  }
</script>
<style>
@media (min-width: 1024px) {

}
</style>
