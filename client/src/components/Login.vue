<template>
<div class="container">
  <img src="../assets/images/logo_pharmakeys.png" alt="Logo PharmaKeys" class="pharma-logo img-responsive">
  <div class="login-box">
    <form method="POST">

      <div class="form-group">
        <div class="row">
          <div class="col-md-2">
            <label for="username">Username</label>
          </div>
          <div class="col-md-8">
            <input type="text" class="form-control" name="username" v-model="username">
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="row">
          <div class="col-md-2">
            <label for="password">Password</label>
          </div>
          <div class="col-md-8">
            <input type="password" class="form-control" name="password" v-model="password">
          </div>
        </div>
      </div>
      <div class="alert alert-danger" style="max-width: 500px;" ref="errmsg" id="errmsg">Son, wrong answer</div>
      <div class="form-group">
        <button class="btn-green pull-right" @click="login">login </button>
      </div>
    </form>
   </div>
</div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login (event) {
      event.preventDefault()
      const response = await AuthenticationService.login({
        username: this.username,
        password: this.password
      })
      console.log(response)
    }
  },
  created () {
    console.log(this.$refs.errmsg)
  }
}
</script>

<style scoped>

</style>
