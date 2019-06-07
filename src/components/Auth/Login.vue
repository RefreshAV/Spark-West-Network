<template>
  <div>
    <img id="backdrop" class="animated fadeIn" src="../../assets/backdrop01.svg">
    <div class="container my-3 h-100">
      <div class="row d-flex justify-content-center mb-3">
        <div class="col-md-6">
          <div class="card animated fadeInLeft border-0 shadow">
            <div class="card-body">
              <div class="row">
                <div class="col text-center">
                  <h1>Login</h1>
                </div>
              </div>

              <div class="row d-flex justify-content-center mb-1">
                <img
                  v-if="!profPic"
                  id="loginPic"
                  src="../../assets/Profile.png"
                  alt="profile picture"
                >
                <img
                  class="animated fadeIn"
                  style="animation-delay:0.5s;"
                  v-if="profPic"
                  id="loginPic"
                  :src="profPic"
                  alt="profile picture"
                >
              </div>

              <div class="row mb-3">
                <div class="col text-center">
                  <h5>Welcome {{name}}</h5>
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <div
                    id="error"
                    class="alert alert-danger animated shake"
                    v-show="error"
                  >Incorrect username or password!</div>
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <form @submit.prevent="login()">
                    <div class="form-group">
                      <label for="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        v-model="email"
                        placeholder="example@email.com"
                        class="form-control mb-4"
                        autocomplete="off"
                        @input="getProfPic()"
                      >
                      <label for="email">Password</label>
                      <input
                        type="password"
                        id="password"
                        v-model="password"
                        placeholder="Super Secret"
                        class="form-control mb-4"
                        autocomplete="off"
                      >
                    </div>
                    <input type="submit" class="btn btn-primary" value="Login">
                  </form>
                </div>
              </div>

              <hr>

              <div class="row d-flex justify-content-center">
                <p>
                  Don't have an account?
                  <router-link to="/SignUp">Sign Up!</router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div id="firebaseui-auth-container"></div> -->
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import db from "../../Firebase/firebaseInit";

export default {
  data() {
    return {
      profPic: "",
      name: "",
      email: "",
      password: "",
      error: false
    };
  },
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: "Login",
    meta: [
      {
        vmid: "description",
        name: "description",
        content: "Login to your account"
      }
    ]
  },
  methods: {
    getProfPic() {
      const email = this.email;
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (re.test(String(email).toLowerCase())) {
        db.collection("users")
          .where("user.email", "==", email)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              this.profPic = doc.data().user.photo;
              this.name = doc.data().user.name;
            });
          })
          .catch((this.name = ""), (this.profPic = ""));
      } else {
        this.profPic = "";
        this.name = "";
      }
    },
    login() {
      this.error = false;
      let that = this;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          that.error = true;
        });

      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          that.$router.push("/");
        }
      });
    }
  }
  // mounted() {
  //   var uiConfig = {
  //     signInSuccessUrl: "/SignUpSuccess",
  //     signInOptions: [
  //       firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  //       firebase.auth.EmailAuthProvider.PROVIDER_ID,
  //       firebase.auth.GithubAuthProvider.PROVIDER_ID,
  //       firebase.auth.TwitterAuthProvider.PROVIDER_ID
  //       // firebase.auth.PhoneAuthProvider.PROVIDER_ID
  //     ]
  //   };
  //   var ui = new firebaseui.auth.AuthUI(firebase.auth())
  //   // ui.start("#firebaseui-auth-container", uiConfig);
  // }
};
</script>

<style scoped>
#loginPic {
  height: 120px;
  border-radius: 100%;
}

input[type="email"],
input[type="password"] {
  border-radius: 40px;
}

.card {
  border-radius: 12px;
}

.card-body {
  transition: 1s;
}

#backdrop {
  position: absolute;
  width: 100%;
  z-index: -1000 !important;
  bottom: 220px;
  right: 0;
}
</style>
