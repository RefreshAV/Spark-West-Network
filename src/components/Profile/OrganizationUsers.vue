<template>
  <div class="container">
    <h1 class="mt-3">Members</h1>

    <div class="list-group list-group-flush mb-3">
      <button
        v-for="profile in users"
        :key="profile.id"
        @click="loadProfile(profile.uid, profile.id)"
        class="list-group-item list-group-item-action media"
      >
        <img
          class="align-self-center mr-3 shadow-sm"
          :src="profile.img"
          alt="Generic placeholder image"
        >
        <div class="media-body">
          <h5 class="mb-0">{{ profile.name }}</h5>
          <p class="mb-0 text-muted">{{ profile.email }}</p>
        </div>
      </button>
    </div>

    <div class="collapse mb-3" id="addWidget">
      <!-- Search Bar -->
      <form class="navbar-form" role="search">
        <div class="input-group">
          <input
            type="text"
            class="form-control form-control-lg"
            placeholder="Add people by email . . ."
            v-model="searchTerm"
          >
          <div class="input-group-btn">
            <button class="btn btn-lg btn-primary" @click.prevent="search">
              <i class="fa fa-search"/>
            </button>
          </div>
        </div>
      </form>

      <!-- Search Results -->
      <ul class="list-group">
        <h3 v-if="searching">Results:</h3>
        <div v-if="searching && profiles.length <= 0" class="animated shake">
          <div class="row d-flex justify-content-center">
            <h4>Nothing found</h4>
          </div>
          <div class="row d-flex justify-content-center">
            <b>Make Sure to:</b>
          </div>
          <div class="row d-flex justify-content-center">
            <ul>
              <li>Check Spellling</li>
              <li>Check Capitalisation</li>
              <li>Check Spacing</li>
              <li>Give Up</li>
            </ul>
          </div>
        </div>
        <li
          class="list-group-item"
          v-show="searching && profiles.length > 0"
          v-for="profile in profiles"
          :key="profile.id"
        >
          <div class="row">
            <div class="col-auto">
              <img :src="profile.img" alt="profile picture" class="searchImg">
            </div>
            <div class="col d-flex align-items-center">
              <h5>{{ profile.name }}</h5>
            </div>
            <div class="col d-flex justify-content-end align-items-center">
              <button
                id="addUser"
                class="btn btn-lg btn-success"
                @click.prevent="addUser(profile.id,profile.name,profile.img)"
              >
                <i class="fa fa-plus"/>
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="btn-group mb-3">
      <a href="javascript:history.go(-1)" class="btn btn-danger">back</a>
      <button class="btn btn-primary" data-toggle="collapse" data-target="#addWidget">add</button>
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
      users: null,
      searchTerm: '',
      profiles: [],
      searching: false
    }
  },
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: 'Members',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'The members of an organization'
      }
    ]
  },
  created () {
    db.collection('organizations')
      .where(
        firebase.firestore.FieldPath.documentId(),
        '==',
        this.$route.params.id
      )
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.users = doc.data().organization.users
        })
      })
  },
  methods: {
    loadProfile (uid, id) {
      this.$router.push({ name: 'userDetail', params: { id: id } })
    },
    search () {
      const that = this
      this.searching = false
      this.profiles = []
      var search = this.searchTerm
      db.collection('users')
        .where('user.email', '==', search.trim())
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.id,
              name: doc.data().user.name,
              img: doc.data().user.photo
            }
            this.profiles.push(data)
          })
        })
        .then(function () {
          that.searching = true
        })
    },
    addUser (id, name, img) {
      var found = this.users.find(function (value) {
        return (value.name = name)
      })

      if (!found && name != this.user.email) {
        var user = {
          id,
          name,
          img,
          role: 'User'
        }
        this.users.push(user)
      }
    },
    removeUser (id, name, img) {
      var filtered = this.users.filter(function (value, index, arr) {
        return value.name != name
      })
      this.users = filtered
    }
  }
}
</script>

<style scoped>
.list-group-item img {
  max-width: 84px;
}
</style>
