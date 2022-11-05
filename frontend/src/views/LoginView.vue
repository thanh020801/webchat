<template>
<div class="loader" v-if='$store.isLogin'>
  <div class="loadingio-spinner-dual-ball-few6dm43crk" >
      <div class="ldio-v2o7onpi3">
          <div></div><div></div><div></div>
      </div>

  </div>
  <div class="loader-text">Loading ...</div>
</div>
<div class="container-register" v-else >
          <div class="register login form-horizontal">
          <fieldset>
            <div id="legend">
              <legend class="">Đăng nhập</legend>
            </div>
         
            <div class="control-group">
              <label class="control-label" for="username">Tài khoản</label>
              <div class="controls">
                <input type="username" id="username" v-model='user.username' name="username" placeholder="Nhập tên tài khoản của bạn" class="form-control input-lg">
              </div>
            </div>
         
            <div class="control-group">
              <label class="control-label" for="password">Mật khẩu</label>
              <div class="controls">
                <input type="password" id="password" v-model='user.password' name="password" placeholder="Nhập mật khẩu của bạn" class="form-control input-lg">
              </div>
            </div>
         
         
            <div class="control-group">
              <div class="controls">
                <button @click='login' class="btn btn-success">Xác nhận</button>
                <p>Bạn chưa có tài khoản ? 
                  <router-link to='/register'><span>Đăng ký</span></router-link>
                </p> 
              </div>
            </div>
          </fieldset>
        </div>
        <button class="btn btn-danger" @click='deleteAllUser()'>Xoa het</button>
        <button class="btn btn-success" @click='create4User()'>Tao moi</button>
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
    created(){
      const account = this.$store.autoLogin()
      if(!account){
        console.log(this.user)
        this.$router.push('/login')
      }else{
        // console.log(this.user)
        this.user = account
        this.login()
        this.$store.isLogin = true
      }
      
    },
    methods:{
      async login(){
        const Toast = this.$swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 2000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.addEventListener('mouseenter', this.$swal.stopTimer)
                    toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                  }
                })
        console.log('login')
        if(this.user.username !=="" && this.user.password !==''){
          console.log(this.$socketInstant.connect().connected)
          if(this.$socketInstant.connect().connected){
            // console.log('loginádasfdasdf')
            this.$socketInstant.emit('LOGIN',{user:this.user})
            this.$socketInstant.on('LOGIN-STATUS', async (res)=>{
              if(res.status !== 200){
                Toast.fire({
                    icon: 'error',
                    title: res.data.response
                })
                this.$store.isLogin = false
                this.$router.push('/login')
              }else{
                // console.log(res.data)
                this.$store.$state.friends = res.data.F
                this.$store.$state.rooms = res.data.R
                this.$store.$state.userProfile = res.data.user
                this.$store.$state.isLogin = true
                this.$store.userChosen = ""
                localStorage.setItem("account", JSON.stringify(this.user))
                if(this.$store.$state.userProfile.admin){
                  this.$router.push('/admin')
                }else{
                  this.$router.push('/')
                }
                
                  Toast.fire({
                    icon: 'success',
                    title: 'Đăng nhập thành công'
                })
              }
            }) 
          }else{
              this.$router.push('/login')
              this.$store.isLogin = false
          }       
        }else{
                Toast.fire({
                  icon: 'warning',
                  title: 'Vui lòng điền thông tin trước khi đăng nhập'
                })
                this.$store.isLogin = false
                this.$router.push('/login')
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
.login{
  margin-top: 3rem;
}

.loader{
  width: 200px;
  height: 300px;
  margin: 140px auto;
}

.loader-text{
  /*margin: 0 auto;*/
  text-align: center;
  padding-right: 30px;
  font-size: 25px;
}

@keyframes ldio-v2o7onpi3-o {
    0%    { opacity: 1; transform: translate(0 0) }
   49.99% { opacity: 1; transform: translate(80px,0) }
   50%    { opacity: 0; transform: translate(80px,0) }
  100%    { opacity: 0; transform: translate(0,0) }
}
@keyframes ldio-v2o7onpi3 {
    0% { transform: translate(0,0) }
   50% { transform: translate(80px,0) }
  100% { transform: translate(0,0) }
}
.ldio-v2o7onpi3 div {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  top: 60px;
  left: 20px;
}
.ldio-v2o7onpi3 div:nth-child(1) {
  background: #0091ff;
  animation: ldio-v2o7onpi3 1s linear infinite;
  animation-delay: -0.5s;
}
.ldio-v2o7onpi3 div:nth-child(2) {
  background: #7e00fe;
  animation: ldio-v2o7onpi3 1s linear infinite;
  animation-delay: 0s;
}
.ldio-v2o7onpi3 div:nth-child(3) {
  background: #0091ff;
  animation: ldio-v2o7onpi3-o 1s linear infinite;
  animation-delay: -0.5s;
}
.loadingio-spinner-dual-ball-few6dm43crk {
  width: 200px;
  height: 100px;
  margin: 0 auto;
  display: inline-block;
  overflow: hidden;
  background: #ffffff;
}
.ldio-v2o7onpi3 {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-v2o7onpi3 div { box-sizing: content-box; }
/* generated by https://loading.io/ */
</style>
