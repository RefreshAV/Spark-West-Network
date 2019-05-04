<template>
  <div class="container">
    <div class="row my-2 mt-5">
      <div class="col-lg-4 order-lg-1 text-center">
        <img
          :src="user.photoUrl"
          class="mx-auto img-fluid img-circle d-block mb-2 shadow-sm"
          id="preview"
          alt="avatar"
        >
        <div class="dUp file btn btn-primary">
          <small>
            Change
            <i class="fa fa-camera"/>
          </small>
          <input
            type="file"
            id="imgUp"
            class="bUp"
            accept="image/x-png, image/gif, image/jpeg"
            @change="loadFile"
          >
        </div>
      </div>
      <div class="col-lg-8 order-lg-2">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a href data-target="#profile" data-toggle="tab" class="nav-link active">
              <i class="fas fa-user-circle"></i>
              <span class="d-none d-sm-inline"> Profile</span>
            </a>
          </li>
          <li class="nav-item">
            <a href data-target="#likes" data-toggle="tab" class="nav-link">
              <i class="fas fa-heart"></i>
              <span class="d-none d-sm-inline"> Likes</span>
            </a>
          </li>
          <li class="nav-item">
            <a href data-target="#edit" data-toggle="tab" class="nav-link">
              <i class="fas fa-pencil-alt"></i>
              <span class="d-none d-sm-inline"> Edit</span>
            </a>
          </li>
          <li class="nav-item">
            <a href data-target="#messages" data-toggle="tab" class="nav-link">
              <i class="fas fa-envelope"></i>
              <span class="d-none d-sm-inline"> Messages</span>
            </a>
          </li>
        </ul>
        <div class="tab-content py-4">
          <div class="tab-pane active" id="profile">
            <div class="row no-gutters">
              <div class="col">
                <h2>{{ user.name }}</h2>
              </div>
              <div class="col mr-3">
                <div class="btn-group float-right">
                  <button
                    class="btn btn-info btn-sm"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Create new organization"
                  >
                    <i class="fa fa-building"/>
                  </button>
                  <router-link
                    id="organBtn"
                    class="btn btn-success btn-sm"
                    to="/Organization/New"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Add existing organization"
                  >
                    <span id="organBtnCont">
                      <i class="fa fa-plus"/>
                    </span>
                  </router-link>
                </div>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-md-6">
                <strong>About</strong>
                <p>{{ user.about }}</p>
                <strong>More info</strong>
                <p>
                  Website:
                  <a target="_blank" :href="user.website">{{ user.website }}</a>
                </p>
              </div>
              <div class="col-md-6">
                <h6>Recent badges</h6>
                <a href="#" class="badge badge-dark badge-pill mx-1">example1</a>
                <a href="#" class="badge badge-dark badge-pill mx-1">coffee</a>
                <a href="#" class="badge badge-dark badge-pill mx-1">examples</a>
                <a href="#" class="badge badge-dark badge-pill">more examples</a>
                <hr>
                <span class="badge badge-primary mx-1">
                  <i class="fa fa-user"/> n Followers
                </span>
                <span class="badge badge-success mx-1">
                  <i class="fa fa-cog"/> n Forks
                </span>
                <span class="badge badge-danger mx-1">
                  <i class="fa fa-heart"/>
                  {{likedEvents.length}} Likes
                </span>
              </div>
              <div class="col-md-12">
                <hr>
                <h5 class="mt-2">
                  <span class="float-right badge badge-primary badge-pill">
                    <i class="fa fa-calendar"/>
                    {{ events.length }}
                  </span>
                  {{ user.name }}'s Events:
                </h5>

                <ul class="list-group">
                  <router-link
                    class="list-group-item card text-white bg-dark mb-1"
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
                    v-if="events.length == 0"
                    class="list-group-item d-flex justify-content-center align-items-center"
                    style="height:400px"
                  >
                    <h3>Nothing Here!</h3>
                    <i class="far fa-frown"></i>
                  </li>
                </ul>
              </div>

              <div class="col-md-12 d-flex justify-content-end">
                <div class="btn-group">
                  <button class="btn btn-outline-primary" @click="lastPage">
                    <i class="fa fa-angle-double-left"/>
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
                  >
                  <button class="btn btn-outline-primary" @click="nextPage">
                    <i class="fa fa-angle-double-right"/>
                  </button>
                </div>
              </div>

              <router-link
                to="/events/NewEvent"
                class="bg-primary text-white circular mx-3 mb-3 d-flex justify-content-center align-items-center"
              >
                <i class="fa fa-plus"/>
              </router-link>
            </div>
            <!--/row-->
          </div>

          <div class="tab-pane" id="likes">
            <div class="col-md-12">
              <hr>
              <h5 class="mt-2">
                <span class="float-right badge badge-primary badge-pill">
                  <i class="fa fa-calendar"/>
                  {{ likedEvents.length }}
                </span>
                {{ user.name }}'s Liked Events:
              </h5>

              <ul class="list-group">
                <router-link
                  class="list-group-item card text-white bg-dark mb-1"
                  v-for="event in currentLikePage"
                  :key="event.id"
                  :to="{name: 'event-detail', params: {id: event.id}}"
                >
                  <div>
                    <h5>{{ event.title }}</h5>
                    <p>{{ event.date.year }}-{{ event.date.month }}-{{ event.date.day }}</p>
                  </div>
                </router-link>

                <li
                  v-if="likedEvents.length == 0"
                  class="list-group-item d-flex justify-content-center align-items-center"
                  style="height:400px"
                >
                  <h3>Nothing Here!</h3>
                  <i class="far fa-frown"></i>
                </li>
              </ul>
            </div>

            <div class="col-md-12 d-flex justify-content-end">
              <div class="btn-group">
                <button class="btn btn-outline-primary" @click="lastPageL">
                  <i class="fa fa-angle-double-left"/>
                </button>
                <input
                  id="likePage"
                  type="number"
                  class="btn btn-outline-primary"
                  v-model="likePage"
                  style="max-width:4rem;"
                  min="0"
                  :max="likePages.length"
                  readonly
                >
                <button class="btn btn-outline-primary" @click="nextPageL">
                  <i class="fa fa-angle-double-right"/>
                </button>
              </div>
            </div>
          </div>
          <div class="tab-pane" id="edit">
            <form role="form" @submit.prevent="writeUserData()">
              <div class="form-group row">
                <label class="col-lg-3 col-form-label form-control-label">Username</label>
                <div class="col-lg-9">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="username"
                    v-model="user.name"
                    required
                  >
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-3 col-form-label form-control-label">Email</label>
                <div class="col-lg-9">
                  <input
                    class="form-control"
                    type="email"
                    placeholder="email@gmail.com"
                    v-model="user.email"
                    required
                  >
                </div>
              </div>

              <div class="form-group row">
                <label class="col-lg-3 col-form-label form-control-label">Website</label>
                <div class="col-lg-9">
                  <input class="form-control" type="url" value v-model="user.website">
                </div>
              </div>

              <!-- Facebook -->
              <div class="input-group-row mb-3 d-flex">
                <div class="col p-0">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text text-white bg-primary"><i class="fab fa-facebook-f mx-1"></i></span>
                  </div>
                  <input type="url" class="form-control" v-model="user.facebook">
                </div>
                </div>
              </div>

              <!-- Twitter -->
              <div class="input-group-row mb-3 d-flex">
                <div class="col p-0">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text text-white bg-info"><i class="fab fa-twitter"></i></span>
                  </div>
                  <input type="url" class="form-control" v-model="user.twitter">
                </div>
                </div>
              </div>

              <!-- Instagram -->
              <div class="input-group-row mb-3 d-flex">
                <div class="col p-0">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text text-white bg-danger"><i class="fab fa-instagram"></i></span>
                  </div>
                  <input type="url" class="form-control" v-model="user.instagram">
                </div>
                </div>
              </div>

              <!-- Linkedin -->
              <div class="input-group-row mb-3 d-flex">
                <div class="col p-0">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text text-white bg-primary"><i class="fab fa-linkedin-in"></i></span>
                  </div>
                  <input type="url" class="form-control" v-model="user.linkedin">
                </div>
                </div>
              </div>

              <div class="form-group">
                <label for="exampleFormControlTextarea1">About Yourself</label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  v-model="user.about"
                />
              </div>
              <div class="form-group row">
                <div class="col-lg-9">
                  <input type="submit" class="btn btn-primary" value="Save Changes">
                </div>
              </div>
            </form>
          </div>
          <div class="tab-pane" id="messages">
            <h1>Messages</h1>
            <ul class="list-group">
              <router-link
                class="list-group-item card text-white bg-dark mb-1"
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
                v-if="events.length == 0"
                class="list-group-item d-flex justify-content-center align-items-center"
                style="height:400px"
              >
                <h3>Nothing Here!</h3>
                <i class="far fa-frown"></i>
              </li>
            </ul>
            <button class="btn btn-dark">Send a message</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../../Firebase/firebaseInit'
import firebase from 'firebase/app'
export default {
  data () {
    return {
      user: {
        name: '',
        email: '',
        photoUrl: '',
        website: '',
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
        about: ''
      },
      image: null,
      events: [],
      likedEvents: [],
      page: 1,
      likePage: 1,
      pages: [],
      likePages: [],
      currentPage: [],
      currentLikePage: [],
      pageLength: 4,
      likePageLength: 4
    }
  },
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: 'Profile',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Your personal account on Spark West Network'
      }
    ]
  },
  metaInfo () {
    if (this.user.name) {
      return {
        title: this.user.name
      }
    } else {
      return {
        title: 'Profile'
      }
    }
  },
  watch: {
    page: 'updateCurrent',
    likePage: 'updateCurrentLiked',
    events: 'createPages',
    likedEvents: 'createLikePages'
  },
  methods: {
    loadFile: function () {
      var input = document.querySelector('.bUp')

      var imgURL = window.URL.createObjectURL(input.files[0])
      this.user.photoUrl = imgURL
      this.image = input.files[0]

      var ref = firebase
        .storage()
        .ref('users/' + firebase.auth().currentUser.uid)
      var file = this.image

      var upload = ref.put(file)
      upload.on(
        'state_changed',
        function progress (snapshot) {
          var percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        },
        function error (err) {},
        function complete () {}
      )
    },
    writeUserData () {
      db.collection('users')
        .where('user.UserUID', '==', firebase.auth().currentUser.uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.update({
              user: {
                name: this.user.name,
                email: this.user.email,
                website: this.user.website,
                facebook: this.user.facebook,
                twitter: this.user.twitter,
                instagram: this.user.instagram,
                linkedin: this.user.linkedin,
                about: this.user.about,
                UserUID: firebase.auth().currentUser.uid,
                photo: this.user.photoUrl
              }
            })
          })
        })
    },
    updateCurrentLiked () {
      // console.log("update")
      // document.getElementById("likePage").readOnly = true;

      this.currentLikePage = []
      this.currentLikePage = this.likePages[this.likePage - 1]
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
    nextPageL () {
      if (this.likePage < this.likePages.length) {
        this.likePage++
      }
    },
    lastPageL () {
      if (this.likePage > 1) {
        this.likePage--
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
    createLikePages () {
      var length = Math.ceil(this.likedEvents.length / this.pageLength)

      for (var l = 0; l < length; l++) {
        if (this.likedEvents.slice(l * 4) < 4) {
          this.likePages.push(this.likedEvents.slice(l * this.pageLength))
        } else {
          this.likePages.push(
            this.likedEvents.slice(
              l * this.pageLength,
              l * this.pageLength + this.pageLength
            )
          )
        }
      }
      this.currentLikePage = this.likePages[0]
    },
    updateCurrent () {
      document.getElementById('page').readOnly = true

      this.currentPage = []
      this.currentPage = this.pages[this.page - 1]
    }
  },
  beforeRouteEnter (to, from, next) {
    // Get user data
    db.collection('users')
      .where('user.UserUID', '==', firebase.auth().currentUser.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.user.name = doc.data().user.name
            vm.user.email = doc.data().user.email
            vm.user.photoUrl = doc.data().user.photo
            vm.user.website = doc.data().user.website
            vm.user.about = doc.data().user.about
          })
        })
      })
  },
  created () {
    // get events created by user
    db.collection('events')
      .where('event.UserUID', '==', firebase.auth().currentUser.uid)
      .orderBy('event.date.year')
      .orderBy('event.date.month')
      .orderBy('event.date.day')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            title: doc.data().event.title,
            date: doc.data().event.date,
            time: doc.data().event.time,
            email: doc.data().event.email,
            desc: doc.data().event.description,
            imageKey: doc.data().event.imageKey
          }
          this.events.push(data)
        })
      })

    // get liked events
    db.collection('events')
      .where('likedBy', 'array-contains', firebase.auth().currentUser.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            title: doc.data().event.title,
            date: doc.data().event.date,
            time: doc.data().event.time,
            email: doc.data().event.email,
            desc: doc.data().event.description,
            imageKey: doc.data().event.imageKey
          }
          this.likedEvents.push(data)
        })
      })
  }
}
</script>

<style>
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
.card p {
  margin: 0px;
}

.circular {
  width: 70px;
  height: 70px;
  border-radius: 35px;
  text-decoration-line: none;
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

li h3 {
  position: absolute;
  z-index: 100;
}

.fa-frown {
  font-size: 20em;
  color: rgba(38, 41, 45, 0.5);
  z-index: 0;
}
</style>
