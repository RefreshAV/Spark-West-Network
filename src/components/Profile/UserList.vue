<template>
  <div class="bg-grad">
    <div class="container">
      <div class="btn-group my-3">
        <button
          class="btn btn-secondary btn-lg dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >Users</button>
        <div class="dropdown-menu">
          <router-link class="dropdown-item" to="/Users">Users</router-link>
          <router-link class="dropdown-item" to="/Organizations">Organizations</router-link>
        </div>
      </div>

      <div
        class="mb-3 row text-dark animated fadeInLeft"
        v-for="(profile, index) in profiles"
        :key="profile.id"
        :style="'animation-delay:' + (index * 0.25) + 's'"
      >
        <div class="col">
          <router-link
            :to="{name: 'userDetail', params: {id: profile.id}}"
            class="media btn btn-light shadow-sm"
          >
            <img
              class="align-self-center rounded mr-3"
              :src="profile.img"
              alt="Generic placeholder image"
            >
            <div class="media-body">
              <h5 class="mb-0">{{ profile.name }}</h5>
              <p class="mb-0">{{ profile.about }}</p>
              <span class="badge badge-primary">
                <i class="fa fa-user"/> n Followers
              </span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../../Firebase/firebaseInit";
import firebase from "firebase";

export default {
  data() {
    return {
      profiles: []
    };
  },
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: "Users",
    meta: [
      {
        vmid: "description",
        name: "description",
        content: "Users on Spark West Network"
      }
    ]
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
            email: doc.data().user.email,
            about: doc.data().user.about
          };

          if(data.about.length > 30) {
            data.about = data.about.substring(0,30) + "..."
          }
          this.profiles.push(data);
        });
      });
  },
  methods: {
    loadProfile(uid, id) {
      this.$router.push("Users/user/" + id);
    }
  }
};
</script>

<style scoped>
img {
  max-width: 84px;
}

.btn-light {
  transition: 0.25s;
}

.btn-light:hover {
  transform: scale(1.05, 1.05);
}
</style>
