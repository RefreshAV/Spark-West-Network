<template>
  <div id="app">
    <TempNav />
    <div class="container">
      <router-view/>
      </div>
  </div>
</template>

<script>
import TempNav from './components/TempNav'
export default {
  name: 'App',
  components: {
    TempNav
  }
}
</script>
