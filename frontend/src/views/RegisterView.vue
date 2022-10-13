<template>
  <div class="login">
    <input type="text" v-model='user.name' placeholder="username">
    <input type="text" v-model='user.username' placeholder="username">
    <input type="password" v-model='user.password' placeholder="password">
    <input type="password" v-model='user.confirmPassword' placeholder="password">
    <button class="btn btn-primary" @click='register()'>Sign up</button>
    <router-link to='/login'>Sign in</router-link>
    <div class="dataRegister">
      {{user}}
    </div>
     <button class="btn btn-primary" @click='test()'>test</button>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        user: {
          username: '',
          name: '',
          password: '',
          confirmPassword: '',
        }
      }
    },
    methods:{
      register(){
        if(this.user.username !=="" && this.user.password !==''){
          this.$socketInstant.emit('REGISTER', {user:this.user})
          this.$socketInstant.on('REGISTER-STATUS', async (res)=>{
            if(res.user){
              this.$swal.fire({
                    title:'Register successfully', 
                    background:'#272c3b', 
                    color: '#dedede',
                  })
              this.$router.push('/login')
            }else{
              this.$swal.fire({
                    title: res, 
                    background:'#272c3b', 
                    color: '#dedede',
                  })
            }
          })
        }else{
          alert('Moi ban nhap')
        }
      },
      test(){
        console.log(this.$testStore.$state.hello)
      }
    }
  }
</script>
<style>
@media (min-width: 1024px) {

}
</style>
