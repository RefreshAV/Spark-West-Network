<template>
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
          v-if="profile.isProfile === false"
          :to="{name: 'userDetail', params: {id: profile.id}}"
          class="media border btn btn-light shadow-sm p-2"
        >
          <div
            v-if="!profile.img"
            class="spinnerWrapper d-flex justify-content-center align-items-center rounded border bg-white"
          >
            <div class="spinner-border spinner-border-sm w-50 h-50" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <img
            class="align-self-center mr-3"
            v-if="profile.img"
            :src="profile.img"
            alt="profile image"
            width="84"
            height="84"
          />
          <div class="media-body">
            <h5 class="mb-0">{{ profile.name }}</h5>
            <p class="mb-0">{{ profile.about }}</p>
            <div class="row">
              <div class="col">
                <span class="badge badge-primary">
                  <i class="fa fa-user" /> n Followers
                </span>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <span class="badge badge-pill badge-info">
                  <i class="fa fa-calendar" />
                  {{ profile.events }}
                </span>
              </div>
            </div>
          </div>
        </router-link>

        <router-link
          v-if="profile.isProfile === true"
          :to="{name: 'profile'}"
          class="media border btn btn-light shadow-sm"
        >
          <div
            v-if="!profile.img"
            class="spinnerWrapper d-flex justify-content-center align-items-center rounded border bg-white"
          >
            <div class="spinner-border spinner-border-sm w-50 h-50" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <img
            class="align-self-center mr-3"
            v-if="profile.img"
            :src="profile.img"
            alt="profile image"
            width="84"
            height="84"
          />
          <div class="media-body">
            <h5 class="mb-0">{{ profile.name }}</h5>
            <!-- <p class="mb-0">{{ profile.about }}</p> -->
            <div class="row">
              <div class="col">
                <span class="badge badge-primary">
                  <i class="fa fa-user" /> n Followers
                </span>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <span class="badge badge-pill badge-info">
                  <i class="fa fa-calendar" />
                  {{ profile.events }}
                </span>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../../Firebase/firebaseInit'
import firebase from 'firebase'

export default {
  data () {
    return {
      profiles: [],
      events: [],
      render: false
    }
  },
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: 'Users',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Users on Spark West Network'
      }
    ]
  },
  created () {
    db.collection('users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let isProfile = false
          if (doc.data().user.UserUID == firebase.auth().currentUser.uid) {
            isProfile = true
          }
          const data = {
            id: doc.id,
            uid: doc.data().user.UserUID,
            name: doc.data().user.name,
            img: doc.data().user.photo,
            email: doc.data().user.email,
            // about: doc.data().user.about,
            events: 0,
            isProfile: isProfile
          }

          // if (data.about.length > 30) {
          //   data.about = data.about.substring(0, 30) + '...'
          // }
          this.profiles.push(data)
        })
      })
      .then(
        db
          .collection('events')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              this.events.push({
                uid: doc.data().event.UserUID
              })
            })
          })
          .then(() => {
            console.log(this.profiles.length)
            for (let i = 0; i < this.profiles.length; i++) {
              let uid = this.profiles[i].uid
              let num = this.events.filter(event => event.uid === uid)
              this.profiles[i].events = num.length
            }
          })
      )
  },
  // mounted() {
  //   let i = 0
  //   for (i = 0; i < this.profiles.length; i++) {
  //     // let num = this.events.filter(event => event.uid === profile.uid).length;
  //     console.log(i);
  //   }
  //   console.log(i)
  // },
  methods: {
    loadProfile (uid, id) {
      this.$router.push('Users/user/' + id)
    },
    countEvents (profile) {
      console.log('loaded')
    }
  }
}
</script>

<style scoped>
img {
  width: 84px;
  border-radius: 12px;
}

.media {
  border-radius: 12px;
}

.btn-light {
  transition: 0.25s;
}

.btn-light:hover {
  transform: scale(1.05, 1.05);
}

.spinnerWrapper {
  width: 84px;
  height: 84px;
}
</style>
