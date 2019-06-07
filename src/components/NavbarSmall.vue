<template>
  <!-- Navigation -->
  <nav id="navbar" class="navbar navbar-expand-lg navbar-dark mt-0">
    <div class="container">
      <a id="brand" active-class="navbar-brand" @click="closeNav">
        <img src="../assets/SWN.png" height="70" alt="logo">
        <!-- <span id="badge" class="badge badge-secondary">beta</span> -->
      </a>
      <button
        class="navbar-toggler navbar-toggler-right"
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"/>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto text-dark">
          <!--Do this in for loop-->
          <router-link
            class="nav-links"
            :to="{name: 'about'}"
            tag="li"
            active-class="nav-item"
            data-toggle="collapse"
            data-target=".navbar-collapse"
          >
            <a class="nav-link">About</a>
          </router-link>
          <router-link
            class="nav-links"
            :to="{name: 'faq'}"
            tag="li"
            active-class="nav-item"
            data-toggle="collapse"
            data-target=".navbar-collapse"
          >
            <a class="nav-link">FAQ</a>
          </router-link>
          <router-link
            class="nav-links"
            :to="{name: 'contact'}"
            tag="li"
            active-class="nav-item"
            data-toggle="collapse"
            data-target=".navbar-collapse"
          >
            <a class="nav-link">Contact</a>
          </router-link>
          <router-link
            class="nav-links"
            :to="{name: 'events'}"
            tag="li"
            active-class="nav-item"
            data-toggle="collapse"
            data-target=".navbar-collapse"
          >
            <a class="nav-link">Events</a>
          </router-link>
          <router-link
            class="nav-links"
            :to="{name: 'userList'}"
            tag="li"
            active-class="nav-item"
            data-toggle="collapse"
            data-target=".navbar-collapse"
          >
            <a class="nav-link">Users</a>
          </router-link>
          <router-link class="nav-links" :to="{name: 'profile'}" tag="li" active-class="nav-item" v-if="isLoggedIn">
            <a class="nav-link">Profile</a>
          </router-link>
          <router-link :to="{name: 'login'}" tag="li" active-class="nav-item" v-if="!isLoggedIn">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Login</button>
          </router-link>
          <router-link to="/" tag="li" active-class="nav-item" v-if="isLoggedIn">
            <button @click="logOut" class="btn btn-light my-2 my-sm-0" type="submit">Log Out</button>
          </router-link>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { auth } from "firebase/app";
import $ from "jquery";

export default {
  data() {
    return {
      isLoggedIn: false
    };
  },
  created() {
    var vm = this;
    auth().onAuthStateChanged(function(user) {
      if (user) {
        vm.isLoggedIn = true;
      } else {
        vm.isLoggedIn = false;
      }
    });
  },
  methods: {
    logOut() {
      auth()
        .signOut()
        .then(
          function() {
            console.log("Signed Out");
          },
          function(error) {
            console.error("Sign Out Error", error);
          }
        );
    },

    closeNav() {
      console.log("collapse");
      $("#navbarResponsive").collapse("hide");
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
body {
  padding-top: 54px;
}

.navbar {
  background: #fe3d61;
}

.nav-links {
  color: white;
  font-weight: bold;
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

/* img {
  margin-top: -15px;
  margin-left: -15px;
} */

#brand {
  cursor: pointer;
}
</style>
