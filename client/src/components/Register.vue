<template>
  <div class="container">
    <h1>Register page</h1>
    <div class="form-group">
      <input type="email" name="email" placeholder="Email" class="form-control" v-model="email">
    </div>

    <div class="form-group">
      <input type="password" name="password" placeholder="Password" class="form-control" v-model="password">
    </div>
    <div class="form-group">
      <button @click="register">Register</button>
    </div>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async register () {
      const response = await AuthenticationService.register({
        username: this.email,
        password: this.password
      })
      console.log(response)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
