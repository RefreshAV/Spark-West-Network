<template>
  <!-- Navigation -->
  <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <router-link to="/" tag="a" active-class="navbar-brand">Nova Obsido</router-link>
      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <!--Do this in for loop-->
          <router-link :to="{name: 'about'}" tag="li" active-class="nav-item"><a class="nav-link">About</a></router-link>
          <router-link :to="{name: 'faq'}" tag="li" active-class="nav-item"><a class="nav-link">FAQ</a></router-link>
          <router-link :to="{name: 'contact'}" tag="li" active-class="nav-item"><a class="nav-link">Contact</a></router-link>
          <router-link :to="{name: 'events'}" tag="li" active-class="nav-item"><a class="nav-link">Events</a></router-link>
          <router-link :to="{name: 'sign-up'}" tag="li" active-class="nav-item" v-if="!isLoggedIn"><button class="btn btn-outline-success my-2 my-sm-0" type="submit">Sign Up</button></router-link>
          <router-link to="/" tag="li" active-class="nav-item" v-if="isLoggedIn"><button @click="logOut" class="btn btn-outline-success my-2 my-sm-0" type="submit">Log Out</button></router-link>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  import firebase from 'firebase/app'
  export default {
    data(){
      return {
        isLoggedIn: false
      }
    },
    created() {
      var vm = this
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          vm.isLoggedIn = true;
        } else {
          vm.isLoggedIn = false;
        }
      });
    },
    methods: {
      logOut() {
        firebase.auth().signOut().then(function() {
          console.log('Signed Out');
        }, function(error) {
          console.error('Sign Out Error', error);
        });
      },
    },
  }
</script>

<style scoped>
  body {
    padding-top: 54px;
  }

  @media (min-width: 992px) {
    body {
      padding-top: 56px;
    }
  }

  .carousel-item {
    height: 65vh;
    min-height: 300px;
    background: no-repeat center center scroll;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }

  .portfolio-item {
    margin-bottom: 30px;
  }
</style>
