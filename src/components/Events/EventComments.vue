<template>
  <div class="comments">
    <vue-disqus shortname="sparkwestnews" v-if="isLoggedIn" />
    <div class="card text-center border-secondary shadow-sm" v-if="!isLoggedIn">
      <div class="card-body text-secondary"><strong>To view and post comments you need to <router-link :to="{name: 'login'}">Login</router-link></strong></div>
    </div>
  </div>
</template>

<script>
import { auth } from "firebase/app";

export default {
  data() {
    return {
      isLoggedIn: false
    };
  },
  mounted() {
    if (auth().currentUser) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }
};
</script>

<style scoped>
.card {
  border-radius: 12px;
}
</style>