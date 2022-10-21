<template>

<div class="container-register ">
          <div class="register form-horizontal">
          <fieldset>
            <div id="legend">
              <legend class="">ĐĂNG KÝ</legend>
            </div>
            <div class="control-group">
              <label class="control-label"  for="Name">Tên</label>
              <div class="controls">
                <input type="text" id="name" v-model='user.name' name="Name" placeholder="Nhập tên của bạn" class="form-control input-lg">
              </div>
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
                <input type="password" id="password" v-model='user.password' name="password" placeholder="Nhập tên mật khẩu của bạn" class="form-control input-lg">
              </div>
            </div>
         
            <div class="control-group">
              <label class="control-label"  for="password_confirm">Xác nhận mật khẩu</label>
              <div class="controls">
                <input type="password" id="password_confirm" v-model='user.confirmPassword' name="password_confirm" placeholder="Xác nhận mật khẩu của bạn" class="form-control input-lg">
              </div>
            </div>
         
            <div class="control-group">
              <div class="controls">
                <button @click='register' class="btn btn-success">Xác nhận</button>
              </div>
            </div>
          </fieldset>
        </div>
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
        if(this.user.username !=="" && this.user.password !=='' && this.user.confirmPassword !=='' && this.user.name !==''){
          if(this.user.password === this.user.confirmPassword){
            this.$socketInstant.emit('REGISTER', {user:this.user})
            this.$socketInstant.on('REGISTER-STATUS', async (res)=>{
              if(res.status === 200){
                this.$swal.fire({
                      title:'Register successfully', 
                      background:'#272c3b', 
                      color: '#dedede',
                    }).then(()=>{
                      this.$router.push('/login')
                    })
                
              }else{
                this.$swal.fire({
                      title: res.data.response, 
                      background:'#272c3b', 
                      color: '#dedede',
                    })
              }
            })
          }else{
              this.$swal.fire({
                      title:'Mật khẩu xác nhận không khớp', 
                      background:'#272c3b', 
                      color: '#dedede',
                    })
          }          
        }else{
          alert('Moi ban nhap')
        }
      },
      test(){
        console.log(this.$store.$state)
      }
    }
  }
</script>
<style>
/*.controls a{
  color: wheat;
}*/
</style>
