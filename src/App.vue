<template>
  <div>
    <app-navbar/>
    <router-view/>
    <app-footer/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import Home from './components/Main/Home.vue'

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
    padding-top: 56px;
  }
</style>
