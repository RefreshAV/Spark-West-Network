<template>
  <div class="container">
    <h1>Please Login</h1>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
  import firebase from 'firebase/app';
  import firebaseui from 'firebaseui';
  import config from '../../Firebase/firebaseConfig.js';

  export default {
    mounted() {
      var uiConfig = {
        signInSuccessUrl: '/success',
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.GithubAuthProvider.PROVIDER_ID
        ]
      };
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      ui.start('#firebaseui-auth-container', uiConfig);
    },
  }
</script>
