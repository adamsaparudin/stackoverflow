<template lang="html">
  <div class="Login">
    <Heading></Heading>
    <div class="row">

      <div class="col-md-2 col-md-offset-5">
        <form>
          <div class="form-group">
            <label for="username">Username : </label>
            <input type="text" name="username" v-model="username">

            <label for="password">Password : </label>
            <input type="text" name="password" v-model="password">

            <button type="button" v-on:click="LoginCoy" name="button"> Login </button>
          </div>
        </form>
      </div>

    </div>
    <Foot></Foot>
  </div>
</template>

<script>

import Heading from './Heading';
import Foot from './Foot';
import axios from 'axios'

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  components: {
    Heading,
    Foot
  },
  methods: {
    LoginCoy() {
      axios.post('http://localhost:3000/api/login', {
        username: this.username,
        password: this.password
      }).then( (response) => {
        // IDEA: If wrong password execute function to show shit bar
        if(response.data == "User not found") {
          console.log("Username or password error");
        } else {
          localStorage.setItem("Token", response.data)
          window.location.href = "/"
        }
      }).catch( (error) => {

      })
    }
  }
}
</script>

<style lang="css">
</style>
