<template>
  <div>
    <app-navbar></app-navbar>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import Navbar from './components/Navbar.vue'
  import Footer from './components/Footer.vue'
  import Home from './components/Main/Home.vue';

  export default {
    components: {
      'app-navbar': Navbar,
      'app-footer': Footer,
      'app-home': Home
    }
  }
</script>

<style>
  body {
    padding-top: 65px;
  }
</style>
