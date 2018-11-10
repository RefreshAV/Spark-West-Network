<template>
  <div class="container">
    <div class="btn-group my-3">
      <button
        class="btn btn-secondary btn-lg dropdown-toggle"
        type="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false">
        Users
      </button>
      <div class="dropdown-menu">
        <router-link
          class="dropdown-item"
          to="/Users">Users</router-link>
        <router-link
          class="dropdown-item"
          to="/Users/organizations">Organizations</router-link>
      </div>
    </div>
    <div class="list-group list-group-flush mb-3">
      <button
        v-for="profile in profiles"
        :key="profile.id"
        @click="loadProfile(profile.uid, profile.id)"
        class="list-group-item list-group-item-action media ">
        <img
          class="align-self-center mr-3"
          :src="profile.img"
          alt="Generic placeholder image">
        <div class="media-body">
          <h5 class="mb-0">{{ profile.name }}</h5>
          <p class="mb-0 text-muted">{{ profile.email }}</p>
          <span class="badge badge-primary"><i class="fa fa-user"/> n Followers</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import db from "../../Firebase/firebaseInit";
import firebase from "firebase"

export default {
  data() {
    return {
      profiles: []
    };
  },
  created() {
    db.collection("users")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            uid: doc.data().user.UserUID,
            name: doc.data().user.name,
            img: doc.data().user.photo,
            email: doc.data().user.email
          };
          this.profiles.push(data);
        });
      });
  },
  methods: {
    loadProfile(uid, id) {
      this.$router.push('Users/user/' + id)
    }
  }
};
</script>

<style scoped>
.list-group-item img {
  max-width: 84px;
}
</style>
