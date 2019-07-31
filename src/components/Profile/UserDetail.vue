<template>
  <div>
    <img id="backdrop" class="animated fadeIn" src="../../assets/backdrop02.svg" />
    <div class="container">
      <div class="row my-2 mt-5">
        <div class="col-lg-4 order-lg-1 text-center">
          <img
            :src="user.user.photo"
            class="mx-auto img-fluid img-circle d-block mb-3 shadow"
            id="preview"
            alt="avatar"
          />
        </div>
        <div class="col-lg-8 order-lg-2 mb-3">
          <div class="card border-0 shadow" style="border-radius:12px;">
            <div class="card-body">
              <div class="tab-content py-4">
                <div class="tab-pane active" id="profile">
                  <div v-if="isLoggedIn">
                    <button
                      class="btn btn-primary float-right"
                      @click="unfollowUser"
                      v-if="isFollowed"
                    >
                      <span>
                        <i class="fa fa-user-minus" /> Unfollow
                      </span>
                    </button>
                    <button class="btn btn-primary float-right" @click="followUser" v-else>
                      <span>
                        <i class="fa fa-user-plus" /> Follow
                      </span>
                    </button>
                  </div>
                  <h2 class="mb-3">{{ user.user.name }}</h2>
                  <hr />
                  <div class="row">
                    <div class="col-md-6">
                      <strong>About</strong>
                      <p>{{ user.user.about }}</p>
                      <strong>More info</strong>
                      <p>
                        Website:
                        <a target="_blank" :href="user.user.website">{{ user.user.website }}</a>
                      </p>
                    </div>
                    <div class="col-md-6">
                      <h6>Recent badges</h6>
                      <a href="#" class="badge badge-dark badge-pill mr-1">example1</a>
                      <a href="#" class="badge badge-dark badge-pill mr-1">coffee</a>
                      <a href="#" class="badge badge-dark badge-pill mr-1">examples</a>
                      <a href="#" class="badge badge-dark badge-pill mr-1">more examples</a>
                      <hr />
                      <span class="badge badge-primary mr-1">
                        <i class="fa fa-user" /> {{ followerCount }} Follower<span v-if="followerCount.length > 1 || !followerCount">s</span>
                      </span>
                      <span class="badge badge-success mr-1">
                        <i class="fa fa-cog" /> n Forks
                      </span>
                      <span class="badge badge-danger">
                        <i class="fa fa-heart" />
                        {{ likedEvents.length }} Liked Events
                      </span>
                    </div>
                    <div class="col-md-12">
                      <hr />
                      <h5 class="mt-2">
                        <span class="float-right badge badge-primary badge-pill">
                          <i class="fa fa-calendar" />
                          {{ events.length }}
                        </span>
                        {{ user.user.name }}'s Events:
                      </h5>

                      <ul class="list-group border-0 mb-3">
                        <router-link
                          class="list-group-item event shadow-sm mb-1 card event text-white bg-dark"
                          v-for="event in currentPage"
                          :key="event.id"
                          :to="{name: 'event-detail', params: {id: event.id}}"
                        >
                          <div>
                            <h5>{{ event.title }}</h5>
                            <p>{{ event.date.year }}-{{ event.date.month }}-{{ event.date.day }}</p>
                          </div>
                        </router-link>

                        <li
                          v-if="events.length === 0"
                          id="placeholder"
                          class="list-group-item border-0 shadow text-white d-flex justify-content-center align-items-center"
                        >
                          <h3>Nothing Here!</h3>
                        </li>
                      </ul>
                    </div>

                    <div class="col-md-12 d-flex justify-content-end">
                      <div class="btn-group">
                        <button class="btn btn-outline-primary" @click="lastPage">
                          <i class="fa fa-angle-double-left" />
                        </button>
                        <input
                          id="page"
                          type="number"
                          class="btn btn-outline-primary"
                          v-model="page"
                          style="max-width:4rem;"
                          min="0"
                          :max="pages.length"
                          readonly
                        />
                        <button class="btn btn-outline-primary" @click="nextPage">
                          <i class="fa fa-angle-double-right" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tab-pane" id="messages">
                  <div class="alert alert-info alert-dismissable">
                    <a class="panel-close close" data-dismiss="alert">×</a> This is an example bootstrap
                    <strong>.alert</strong> Put Important message here.
                  </div>
                  <table class="table table-hover table-striped">
                    <tbody>
                      <tr>
                        <td>
                          <span class="float-right font-weight-bold">3 hrs ago</span> New Weekly events updated
                        </td>
                      </tr>
                      <td>
                        <span class="float-right font-weight-bold">9/10</span> Porttitor vitae ultrices quis, dapibus id dolor. Morbi venenatis lacinia rhoncus.
                      </td>
                      <tr />
                      <tr>
                        <td>
                          <span class="float-right font-weight-bold">9/4</span> Vestibulum tincidunt ullamcorper eros eget luctus.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span class="float-right font-weight-bold">9/4</span> Maxamillion ais the fix for tibulum tincidunt ullamcorper eros.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../../Firebase/firebaseInit'
import firebase, { firestore } from 'firebase'
import 'firebase/firestore'
export default {
  data () {
    return {
      user: {
        user: {}
      },
      currentUser: {
        user: {}
      },
      events: [],
      likedEvents: [],
      page: 1,
      pages: [],
      currentPage: [],
      followers: [],
      isLoggedIn: false
    }
  },
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: 'User',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'The description of a user on Spark West Network'
      }
    ]
  },
  metaInfo () {
    return {
      title: this.user.user.name
    }
  },
  mounted () {
    this.$bind('user', db.collection('users').doc(this.$route.params.id)),
    this.$bind('followers', db.collection('users').where('user.following', 'array-contains', this.$route.params.id)),
    this.$bind(
      'currentUser',
      db.collection('users').doc(firebase.auth().currentUser.uid)
    )
    this.$bind(
      'events',
      db
        .collection('events')
        .where('event.UserUID', '==', this.$route.params.id)
        .orderBy('event.date.year')
        .orderBy('event.date.month')
        .orderBy('event.date.day')
    )
    this.$bind(
      'likedEvents',
      db
        .collection('events')
        .where('likedBy', 'array-contains', this.$route.params.id)
    )
  },
  created () {
    var vm = this
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        vm.isLoggedIn = true
      } else {
        vm.isLoggedIn = false
      }
    })
  },
  computed: {
    isFollowed () {
      if (
        this.currentUser.user.following &&
        this.currentUser.user.following.includes(this.$route.params.id)
      ) {
        return true
      } else {
        return false
      }
    },
    followerCount () {
      return this.followers.length;
    }
  },
  watch: {
    page: 'updateCurrent',
    events: 'createPages'
  },
  methods: {
    followUser () {
      const userRef = db.collection('users').doc(firebase.auth().currentUser.uid)

      db.runTransaction(transaction => {
        return transaction.get(userRef).then(doc => {
          if (!doc.data().user.following) {
            transaction.set(userRef, {
              user: {
                ...doc.data().user,
                following: [this.$route.params.id]
              }
            })
          } else {
            const following = doc.data().user.following
            following.push(this.$route.params.id)
            transaction.update(userRef, {
              user: {
                ...doc.data().user,
                following
              }
            })
          }
        })
      })
    },
    unfollowUser () {
      const userRef = db.collection('users').doc(firebase.auth().currentUser.uid)

      db.runTransaction(transaction => {
        return transaction.get(userRef).then(doc => {
            let following = doc.data().user.following
            following = following.filter(i => i !== this.$route.params.id) // Remove user from array

            transaction.update(userRef, {
              user: {
                ...doc.data().user,
                following
              }
            })
          })
        })
    },
    nextPage () {
      if (this.page < this.pages.length) {
        this.page++
      }
    },
    lastPage () {
      if (this.page > 1) {
        this.page--
      }
    },
    createPages () {
      var length = Math.ceil(this.events.length / this.pageLength)
      for (var i = 0; i < length; i++) {
        if (this.events.slice(i * 4) < 4) {
          this.pages.push(this.events.slice(i * this.pageLength))
        } else {
          this.pages.push(
            this.events.slice(
              i * this.pageLength,
              i * this.pageLength + this.pageLength
            )
          )
        }
      }
      this.currentPage = this.pages[0]
    },
    updateCurrent () {
      document.getElementById('page').readOnly = true

      this.currentPage = []
      this.currentPage = this.pages[this.page - 1]
    }
  }
}
</script>

<style scoped>
.dUp {
  position: relative;
  overflow: hidden;
}

.bUp {
  position: absolute;
  font-size: 50px;
  opacity: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.imgUp {
  margin-top: 20px;
  margin-left: 5px;
  margin-bottom: 5px;
  font-size: 15px;
}

#preview {
  width: 150px;
  height: 150px;
  border-radius: 100%;
}

.event p {
  margin: 0px;
}

.btn-group input {
  max-width: 5rem;
  align-content: center;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

#placeholder {
  height: 344px;
  border-radius: 12px;
  background: #009fff; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    115deg,
    #ec2f4b,
    #009fff
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    115deg,
    #ec2f4b,
    #009fff
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

#loader {
  height: 344px;
  border-radius: 12px;
}

#loader .spinner-border {
  width: 100px;
  max-width: 100%;
  height: 100px;
  max-height: 100%;
}

#backdrop {
  position: absolute;
  width: 100%;
  z-index: -1000 !important;
  bottom: 220px;
  right: 0;
}
</style>
