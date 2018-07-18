<template>
<h1>LOG OUT</h1>
</template>

<script>
  export default {
    data: function () {
      return {

      }
    },
    beforeRouteEnter(to, from, next) {
      var user = firebase.auth().currentUser;
      if (user) {
        next();
      } else {
        next(false);
      }
    }
  }
</script>
