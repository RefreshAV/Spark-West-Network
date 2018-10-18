<template>
    <div class="container my-3">
        <div>
            <div class="row d-flex justify-content-center">
                <div class="col">
                    <h1>Sign Up</h1>
                    <hr>
                </div>
            </div>

            <div class="row d-flex justify-content-center">              
              <div class="col-md-5">
                  <h2>Welcome to Spark West Network!</h2>
                  <hr>
                  <i class="text-muted">"We believe that rural Nova Scotia is a great place to be an entrepreneur. However, there is much need for improvement."</i>
                  <hr>
                <div class="row">

                  <div class="col">
                    <div class="row d-flex justify-content-center">
                      <p>Events</p>
                    </div>
                    <div class="row d-flex justify-content-center">
                      <i class="far fa-calendar fa-6x"></i>
                    </div>
                  </div>

                  <div class="col">
                    <div class="row d-flex justify-content-center">
                      <p>News</p>
                    </div>
                    <div class="row d-flex justify-content-center">
                      <i class="far fa-newspaper fa-6x"></i>
                    </div>
                  </div>

                  <div class="col">
                    <div class="row d-flex justify-content-center">
                      <p>Learning</p>
                    </div>
                    <div class="row d-flex justify-content-center">
                      <i class="fas fa-award fa-6x"></i>
                    </div>
                  </div>

                </div>
              </div>

              <div class="col">
                <form @submit.prevent="signUp()">
                    <div class="form-group">
                    <label for="email">Name</label>
                      <input
                        type="text"
                        id="name"
                        v-model="name"
                        placeholder="John Smith"
                        class="form-control mb-4"
                        autocomplete="off"
                        required>
                      <label for="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        v-model="email"
                        placeholder="example@email.com"
                        class="form-control mb-4"
                        required>
                        <label for="email">Password</label>
                      <input
                        type="password"
                        id="password"
                        v-model="password"
                        placeholder="Super Secret"
                        class="form-control mb-4"
                        required>
                    </div>
                  <div class="row">
                    <div class="col-auto">
                      <input type="submit" class="btn btn-primary" value="Sign Up"> 
                    </div>
                    <div class="col-m3">
                      <p>Or if you already have an account <router-link to="/Login">Login!</router-link></p>
                    </div>
                  </div>
                </form>
              <hr>
              </div>
          </div>
        </div>
        <!-- <div id="firebaseui-auth-container"></div> -->
    </div>
</template>

<script>
import firebase from "firebase/app";
import firebaseui from "firebaseui";
import db from "../../Firebase/firebaseInit";

export default {
  data() {
    return {
      profPic: "",
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    signUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage)
        }).then(
          this.$router.push('/')
        )
    }
  }
};
</script>

<style>
#loginPic {
  height: 120px;
  border-radius: 100%;
}
</style>
