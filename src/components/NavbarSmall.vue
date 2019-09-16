<template>
  <!-- Navigation -->
  <nav id="navbar" class="navbar navbar-dark mt-0 p-0">
    <div class="container" id="top">
      <router-link to="/" id="brand" active-class="navbar-brand">
        <img src="../assets/SWN.png" height="70" alt="logo" />
        <!-- <span id="badge" class="badge badge-secondary">beta</span> -->
      </router-link>
      <button
        class="btn btn-lg btn-light navbar-toggler-right align-middle"
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fas fa-bars fa-lg"></i>
      </button>
    </div>
    <div class="collapse w-100 navbar-collapse bg-dark" id="navbarResponsive">
      <div class="container w-100">
        <ul class="navbar-nav ml-auto text-dark m-3 w-100">
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
          <router-link
            class="nav-links"
            :to="{name: 'profile'}"
            tag="li"
            active-class="nav-item"
            v-if="isLoggedIn"
          >
            <a class="nav-link">Profile</a>
          </router-link>
          <router-link :to="{name: 'login'}" tag="li" active-class="nav-item" v-if="!isLoggedIn">
            <button
              class="btn btn-outline-light btn-block mt-2 font-weight-bold rounded-pill mt-sm-0 mb-0"
              type="submit"
            >Login</button>
          </router-link>
          <router-link to="/" tag="li" active-class="nav-item" v-if="isLoggedIn">
            <button
              @click="logOut"
              class="btn btn-block btn-secondary font-weight-bold rounded-pill text-dark mt-2 mt-sm-0 mb-0"
              type="submit"
            >Log Out</button>
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
  watch: {
    $route(to, from) {
      $("#navbarResponsive").collapse("hide");
    }
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
          function() {},
          function(error) {
            console.error("Sign Out Error", error);
          }
        );
    },

    closeNav() {
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
  overflow: visible;
}

.btn-light i {
  color: #fe3d61;
}

.nav-links {
  color: white;
  font-weight: bold;
}

#navbarResponsive,
#navbar {
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
}

#brand {
  cursor: pointer;
}

#top {
  background: #fe3d61;
  border-radius: 0 !important;
  z-index: 1000;
}
</style>
