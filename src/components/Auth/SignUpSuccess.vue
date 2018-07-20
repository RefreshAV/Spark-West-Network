<template>
  <div class="container">
    <h1>Signup succeeded</h1>
    <hr>
    <img :src="user.photo" style=”height:120px”> <br>
    <p>{{user.name}}</p>
    <p>{{user.email}}</p>
    <p>{{user.UserUID}}</p>
    <hr>
    <!--<pre>{{user}}</pre>-->
  </div>
</template>

<script>
import db from '../../Firebase/firebaseInit';
import firebase from 'firebase/app';
export default {
  data() {
    return {
      user: {
        photo: '',
        UserUID: '',
        name: '',
        email: '',
      },
    };
  },
  created() {
    var vm = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user.displayName);
        vm.user.name = user.displayName;
        vm.user.email = user.email;
        vm.user.photo = user.photoURL;
        vm.user.UserUID = user.uid;
      }
    });
  },
  mounted() {
    var vm = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        db.collection('users').add({
          user: {
            name: vm.user.name,
            email: vm.user.email,
            photo: vm.user.photo,
            UserUID: vm.user.UserUID,
            about: null,
            website: null,
          },
        });
      }
    });
  },
};
</script>
