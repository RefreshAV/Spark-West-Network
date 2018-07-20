<template>
  <div class="container">
    <h1>Signup succeeded</h1>
    <button @click='logOut' class="btn btn-primary">Log out</button>
    <hr>
    <img :src="user.photo" style=”height:120px”> <br>
    <p>{{user.name}}</p>
    <p>{{user.email}}</p>
    <p>{{user.UserUID}}</p>
    <button @click="uploadData" class="btn btn-primary">Continue</button>
    <hr>
    <!--<pre>{{user}}</pre>-->
  </div>
</template>

<script>
  import db from "../../Firebase/firebaseInit";
  import firebase from 'firebase/app'
  export default {
    data(){
      return {
        user: {
          photo: '',
          UserUID: '',
          name: '',
          email: '',
        }
      }
    },
    created() {
      var vm = this
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          vm.user.name = user.displayName;
          vm.user.email = user.email;
          vm.user.photo = user.photoURL;
          vm.user.UserUID = user.uid;
        }
      });
    },
    updated() {
    },
    methods: {
      logOut() {
        firebase.auth().signOut();
      },
      uploadData() {
        db
          .collection("users")
          .add({
            user: {
              name: this.user.name,
              email: this.user.email,
              photo: this.user.photo,
              UserUID: this.user.UserUID,
              about: null,
              website: null
            }
          });
        this.$router.push("/");
      }
    }
  };
</script>
