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
                <div class="row mb-3">

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
                  <div class="row d-flex justify-content-center">
                    <div class="col-lg-4 order-lg-1 text-center">
                      <img
                        src="../../assets/Profile.png"
                        class="mx-auto img-fluid img-circle d-block mb-2 shadow-sm"
                        id="preview"
                        alt="avatar"
                        v-if="!preImg">
                      <img
                        :src="preImg"
                        class="mx-auto img-fluid img-circle d-block mb-2 shadow-sm"
                        id="preview"
                        alt="avatar"
                        v-if="preImg">
                      <div class="dUp file btn btn-primary">
                        <small>Browse <i class="fa fa-camera"/></small>
                        <input
                          type='file'
                          id="imgUp"
                          class='bUp'
                          accept="image/x-png,image/gif,image/jpeg"
                          @change="loadFile">
                      </div>
                    </div>
                  </div>
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
                        @change="gravatar()"
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
                      <button type="submit" class="btn btn-primary">
                        Sign Up! <i class="fas fa-cog fa-spin" v-if="upload"></i>
                      </button> 
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
import gravatarUrl from "gravatar-url";

var check = firebase;

export default {
  data() {
    return {
      profPic: "",
      name: "",
      email: "",
      password: "",
      preImg: "",
      image: null,
      upload: false,
      blob: null
    };
  },
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: "Sign Up",
    meta: [
      {
        vmid: "description",
        name: "description",
        content: "Create your account on Spark West Network!"
      }
    ]
  },
  watch: {
    upload: "createProfile"
  },
  methods: {
    signUp() {
      const that = this;

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((this.upload = true))
        .catch((error) => {
          alert(error.message)
        });
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          db.collection("users").add({
            user: {
              UserUID: firebase.auth().currentUser.uid,
              about: "",
              email: that.email,
              name: that.name,
              photo:
                "https://firebasestorage.googleapis.com/v0/b/spark-west.appspot.com/o/users%2F" +
                firebase.auth().currentUser.uid +
                "?alt=media&token",
              website: ""
            }
          });

          var ref = firebase
            .storage()
            .ref("users/" + firebase.auth().currentUser.uid);
          var file = that.image;

          var upload = ref.put(file);
          upload
            .on(
              "state_changed",
              function progress(snapshot) {
                var percentage =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              },
              function error(err) {},
              function complete() {}
            )
            .then(that.$router.push("/"));
        }
      });
    },
    createProfile() {},
    loadFile: function() {
      var input = document.querySelector(".bUp");
      var imgURL = window.URL.createObjectURL(input.files[0]);
      this.preImg = imgURL;
      this.image = input.files[0];
    },
    gravatar() {
      var img = gravatarUrl(this.email, { size: 200, d: "retro" });

      fetch(img)
        .then(res => res.blob()) // Gets the response and returns it as a blob
        .then(blob => {
          this.image = blob;
          let objectURL = URL.createObjectURL(blob);
          this.preImg = objectURL;
        });
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