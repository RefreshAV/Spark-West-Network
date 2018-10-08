<template>
  <h1 @click="test">LOG OUT</h1>
</template>

<script>
import firebase from 'firebase/app'
export default {
  data: function () {
    return {

    }
  },
  methods: {
    test: function () {
      console.log(firebase.auth().currentUser.uid)
    }
  }
}
</script>
