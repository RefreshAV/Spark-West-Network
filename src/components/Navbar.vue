<template>
  <!-- Navigation -->
  <nav id="nav" class="navbar navbar-expand-lg navbar-dark mt-0">
    <div class="container">
      <router-link id="logo" to="/" tag="a" active-class="navbar-brand">
        <img src="../assets/logoLG.svg" class="m-1" height="42" alt="logo">
        <!-- <span class="badge badge-secondary">beta</span> -->
      </router-link>
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
      <ul class="navbar-nav ml-auto bg-dark p-2 d-flex align-items-center rounded-pill">
        <!--Do this in for loop-->
        <router-link :to="{name: 'about'}" tag="li" active-class="nav-item">
          <a id="about" class="nav-link">About</a>
        </router-link>
        <router-link :to="{name: 'faq'}" tag="li" active-class="nav-item">
          <a id="faq" class="nav-link">FAQ</a>
        </router-link>
        <router-link :to="{name: 'contact'}" tag="li" active-class="nav-item">
          <a id="contact" class="nav-link">Contact</a>
        </router-link>
        <router-link :to="{name: 'events'}" tag="li" active-class="nav-item">
          <a id="events" class="nav-link">Events</a>
        </router-link>
        <router-link :to="{name: 'userList'}" tag="li" active-class="nav-item">
          <a id="userlist" class="nav-link">Users</a>
        </router-link>
        <router-link :to="{name: 'profile'}" tag="li" active-class="nav-item" v-if="isLoggedIn">
          <a id="profile" class="nav-link">Profile</a>
        </router-link>
        <router-link :to="{name: 'login'}" tag="li" active-class="nav-item" v-if="!isLoggedIn">
          <button class="btn btn-danger rounded-pill" type="submit">Login</button>
        </router-link>
        <button
          v-if="isLoggedIn"
          @click="logOut"
          class="nav-item btn btn-danger rounded-pill"
          type="submit"
        >Log Out</button>

        <!-- <div class="dropdown">
          <button
            class="btn btn-danger dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >Log Out</button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <p>Are you sure?</p>
            <a class="dropdown-item" href="#">Yes</a>
            <a class="dropdown-item" href="#">No/a>
          </div>
        </div>-->
      </ul>
    </div>
  </nav>
</template>

<script>
import { auth } from "firebase/app";
import VueScrollTo from "vue-scrollto";
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
  watch: {
    $route(to, from) {
      VueScrollTo.scrollTo(document.getElementById("nav"));
    }
  },
  methods: {
    logOut() {
      let that = this;
      auth()
        .signOut()
        .then(
          function() {
            that.$router.push("/");
          },
          function(error) {
            console.error("Sign Out Error", error);
          }
        );
    }
  }
};
</script>

<style scoped>
body {
  padding-top: 54px;
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

.navbar {
  background: #fe3d61;
}

.btn-danger {
  background: #fe3d61;
  border-color: #fe3d61;
}

.btn-danger:hover {
  background: #e23655;
  border-color: #e23655;
}

.btn-light {
  color: #fd4260;
  font-weight: bold;
  height: 54px;
}

ul {
  transition: 1s;
}

#logo {
  transition: 0.5s all;
}

#logo:hover {
  transform: translateY(-4px);
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5));
}

.router-link-exact-active {
  font-weight: bold;
}
</style>
