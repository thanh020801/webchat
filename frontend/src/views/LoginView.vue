<template>
  <div class="login">

    <input type="text" v-model='user.username' placeholder="username">
    <input type="password" v-model='user.password' placeholder="password">
    <button class="btn btn-primary" @click='login()'>Sign in</button>
    <router-link to='/register'>Register</router-link>
    <button class="btn btn-primary" @click='deleteAllUser()'>DeleteAll</button>
    <button class="btn btn-primary" @click='create4User()'>Create4User</button>
    <div class="dataRegister">
      {{user}}
    </div>

  </div>
</template>
<script>
  import {TestStore} from '@/stores/test.js'
  export default {
    data(){
      return {
          user:{
            username: '',
            password: '123',
          },
          
      }
    },
    setup(){
      const createUser = TestStore().createUser
      return {createUser}
    },
    mounted(){
      const account = this.$store.autoLogin()
      if(!account){
        console.log(this.user)
        this.$router.push('/login')
      }else{
        // console.log(this.user)
        this.user = account
        this.login()
      }
      
    },
    methods:{
      login(){
        console.log(this.$socketInstant.connect())
        if(this.user.username !=="" && this.user.password !==''){
          this.$socketInstant.emit('LOGIN',{user:this.user})
          this.$socketInstant.on('LOGIN-STATUS', async (res)=>{
            if(res.status !== 200){
              console.log(res.data.response)
            }else{
              // console.log(res.data.F)
              this.$store.$state.friends = res.data.F
              this.$store.$state.userProfile = res.data.user
              this.$store.$state.isLogin = true
              localStorage.setItem("account", JSON.stringify(this.user))
              
              // console.log(this.$store.$state.friends)

              // console.log(this.$store.$state)
              this.$router.push('/')
            }
          })          
        }else{
          alert('Moi ban nhap')
        }
      },
      deleteAllUser(){
        this.$socketInstant.emit('DELETE-ALL-USER')
      },
      create4User(){
            console.log(this.createUser)
            // this.$socketInstant.emit('REGISTER', {user:createUser[1]})
            for(var i = 0; i < this.createUser.length;i++){
                this.$socketInstant.emit('REGISTER', {user: this.createUser[i]})
            }
      },
    }
  }
</script>
<style>
@media (min-width: 1024px) {

}
</style>
