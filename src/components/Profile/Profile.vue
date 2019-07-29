<template>
  <div class="container">
    <div class="row my-2 mt-5">
      <div class="col-lg-4 mb-3 order-lg-1 text-center">
        <img
          :src="user.photoUrl"
          class="mx-auto img-fluid d-block mb-2 shadow-sm"
          id="preview"
          alt="avatar"
        />

        <button
          class="btn btn-sm btn-info rounded-pill"
          data-toggle="modal"
          data-target="#modal"
        >Change</button>
      </div>
      <div class="col-lg-8 order-lg-2">
        <div class="card shadow animated fadeIn mb-3" style="border-radius: 12px;">
          <div class="card-body">
            <ul class="red nav nav-pills nav-fill">
              <li class="nav-item profile animated fadeInLeft" style="animation-delay:0s;">
                <a href data-target="#profileTab" data-toggle="tab" class="nav-link active">
                  <i class="fas fa-lg fa-user-circle"></i>
                  <span class="d-none d-sm-inline">
                    <br />Profile
                  </span>
                </a>
              </li>
              <li class="nav-item likes animated fadeInLeft" style="animation-delay:0.2s;">
                <a href data-target="#likesTab" data-toggle="tab" class="nav-link">
                  <i class="fas fa-lg fa-heart"></i>
                  <span class="d-none d-sm-inline">
                    <br />Likes
                  </span>
                </a>
              </li>
              <li class="nav-item edit animated fadeInLeft" style="animation-delay:0.4s;">
                <a href data-target="#editTab" data-toggle="tab" class="nav-link">
                  <i class="fas fa-lg fa-pencil-alt"></i>
                  <span class="d-none d-sm-inline">
                    <br />Edit
                  </span>
                </a>
              </li>
              <li class="nav-item messages animated fadeInLeft" style="animation-delay:0.6s;">
                <a href data-target="#messagesTab" data-toggle="tab" class="nav-link">
                  <i class="fas fa-lg fa-envelope"></i>
                  <span class="d-none d-sm-inline">
                    <br />Messages
                  </span>
                </a>
              </li>
            </ul>
            <div class="tab-content py-3">
              <div class="tab-pane fade show active" id="profileTab">
                <div class="row no-gutters">
                  <div class="col">
                    <h2>{{ user.name }}</h2>
                  </div>
                  <div class="col mr-3">
                    <!-- Organization large -->
                    <div class="row d-none d-lg-flex justify-content-end align-items-center">
                      <div class="col-auto">
                        <p class="text-muted">Organization:</p>
                      </div>
                      <div class="col-auto pl-0">
                        <div class="btn-group">
                          <button
                            class="btn btn-info btn-sm"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Create new organization"
                          >
                            <i class="fa fa-building" />
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
                              <i class="fa fa-plus" />
                            </span>
                          </router-link>
                        </div>
                      </div>
                    </div>

                    <!-- Organization small -->
                    <div class="btn-group float-right d-lg-none">
                      <button
                        class="btn btn-info btn-sm"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Create new organization"
                      >
                        <i class="fa fa-building" />
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
                          <i class="fa fa-plus" />
                        </span>
                      </router-link>
                    </div>
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div
                    class="col-md-6"
                    v-if="user.about || user.facebook || user.twitter || user.instagram || user.linkden || user.website"
                  >
                    <!-- About -->
                    <div v-if="user.about" class="row">
                      <div class="mb-2 col">
                        <strong>About</strong>
                        <p>{{ user.about }}</p>
                      </div>
                    </div>

                    <!-- Social Media -->
                    <div class="row mb-2">
                      <div class="col">
                        <!-- Website -->
                        <a
                          data-toggle="tooltip"
                          data-placement="top"
                          class="social"
                          title="Website"
                          :href="user.website"
                          v-if="user.website"
                          target="_blank"
                        >
                          <span class="fa-stack fa-lg text-secondary">
                            <i class="fas fa-square fa-stack-2x"></i>
                            <i class="fas fa-globe fa-stack-1x fa-inverse"></i>
                          </span>
                        </a>

                        <!-- Twitter -->
                        <a
                          data-toggle="tooltip"
                          data-placement="top"
                          class="social"
                          title="Twitter"
                          :href="user.twitter"
                          v-if="user.twitter"
                          target="_blank"
                        >
                          <span class="fa-stack fa-lg text-info">
                            <i class="fas fa-square fa-stack-2x"></i>
                            <i class="fab fa-twitter fa-stack-1x fa-inverse"></i>
                          </span>
                        </a>

                        <!-- Facebook -->
                        <a
                          data-toggle="tooltip"
                          data-placement="top"
                          class="social"
                          title="Facebook"
                          :href="user.facebook"
                          v-if="user.facebook"
                          target="_blank"
                        >
                          <span class="fa-stack fa-lg text-primary">
                            <i class="fas fa-square fa-stack-2x"></i>
                            <i class="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
                          </span>
                        </a>

                        <!-- Instagram -->
                        <a
                          data-toggle="tooltip"
                          data-placement="top"
                          class="social"
                          title="Instagram"
                          :href="user.instagram"
                          v-if="user.instagram"
                          target="_blank"
                        >
                          <span class="fa-stack fa-lg text-danger">
                            <i class="fas fa-square fa-stack-2x"></i>
                            <i class="fab fa-instagram fa-stack-1x fa-inverse"></i>
                          </span>
                        </a>

                        <!-- Linkedin -->
                        <a
                          data-toggle="tooltip"
                          data-placement="top"
                          class="social"
                          title="Linkedin"
                          :href="user.linkedin"
                          v-if="user.linkedin"
                          target="_blank"
                        >
                          <span class="fa-stack fa-lg">
                            <i class="fas fa-square fa-stack-2x"></i>
                            <i class="fab fa-linkedin-in fa-stack-1x fa-inverse"></i>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6" v-else>
                    <i>
                      Add details about yourself in
                      <a
                        href="#"
                        @click="changeTab('#profileTab', '#editTab')"
                        data-toggle="tab"
                      >Edit</a>
                    </i>
                  </div>
                  <!-- <div class="col-md-6">
                    <h6>Recent badges</h6>
                    <a href="#" class="badge badge-dark badge-pill mx-1">example1</a>
                    <a href="#" class="badge badge-dark badge-pill mx-1">coffee</a>
                    <a href="#" class="badge badge-dark badge-pill mx-1">examples</a>
                    <a href="#" class="badge badge-dark badge-pill">more examples</a>
                    <hr />
                    <span class="badge badge-primary mx-1">
                      <i class="fa fa-user" /> n Followers
                    </span>
                    <span class="badge badge-success mx-1">
                      <i class="fa fa-cog" /> n Forks
                    </span>
                    <span class="badge badge-danger mx-1">
                      <i class="fa fa-heart" />
                      {{likedEvents.length}} Likes
                    </span>
                  </div>-->
                  <div class="col-md-12">
                    <hr />
                    <h5 class="mt-2">
                      <span class="float-right badge badge-primary badge-pill">
                        <i class="fa fa-calendar" />
                        {{ events.length }}
                      </span>
                      {{ user.name }}'s Events:
                    </h5>

                    <ul class="list-group">
                      <router-link
                        class="list-group-item card text-white bg-dark mb-1 animated fadeIn"
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
                        v-if="loading"
                        id="loader"
                        class="list-group-item d-flex justify-content-center align-items-center mb-2"
                      >
                        <div class="spinner-border text-primary" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>
                      </li>

                      <li
                        v-if="events.length == 0 && !loading"
                        class="list-group-item border-0 text-white d-flex justify-content-center align-items-center mb-2 placeholder"
                      >
                        <h3>Nothing Here!</h3>
                      </li>
                    </ul>
                  </div>

                  <div class="col-md-12 d-flex justify-content-end" v-if="events.length > 0">
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

                  <router-link
                    to="/events/NewEvent"
                    class="bg-primary text-white circular mx-3 mb-3 d-flex justify-content-center align-items-center"
                  >
                    <i class="fa fa-plus" />
                  </router-link>
                </div>
                <!--/row-->
              </div>

              <div class="tab-pane fade" id="likesTab">
                <div class="row">
                  <div class="col">
                    <h5 class="mt-2">
                      <span class="float-right badge badge-danger badge-pill">
                        <i class="fa fa-heart" />
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
                        class="list-group-item border-0 text-white d-flex justify-content-center align-items-center placeholder mb-2 animated fadeIn"
                      >
                        <h3>Nothing Here!</h3>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="row">
                  <div class="col d-flex justify-content-end">
                    <div class="btn-group">
                      <button class="btn btn-outline-primary" @click="lastPageL">
                        <i class="fa fa-angle-double-left" />
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
                      />
                      <button class="btn btn-outline-primary" @click="nextPageL">
                        <i class="fa fa-angle-double-right" />
                      </button>
                    </div>
                  </div>
                </div>

                <hr />

                <router-link
                  class="btn btn-block btn-success mb-2"
                  style="border-radius:12px"
                  to="/events"
                >Find Events!</router-link>
              </div>
              <div class="tab-pane fade" id="editTab">
                <form role="form" @submit.prevent="writeUserData()">
                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label">Name</label>
                    <div class="col-lg-9">
                      <input
                        class="form-control rounded-pill"
                        type="text"
                        placeholder="username"
                        v-model="user.name"
                        required
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label">Email</label>
                    <div class="col-lg-9">
                      <input
                        class="form-control rounded-pill"
                        type="email"
                        placeholder="email@gmail.com"
                        v-model="user.email"
                        required
                      />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label">Website</label>
                    <div class="col-lg-9">
                      <input
                        class="form-control rounded-pill"
                        type="url"
                        value
                        v-model="user.website"
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col">
                      <label for="social">Social Media</label>
                    </div>
                  </div>

                  <!-- Facebook -->
                  <div class="input-group-row mb-3">
                    <div class="col p-0">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text text-white bg-primary">
                            <i class="fab fa-facebook-f mx-1"></i>
                          </span>
                        </div>
                        <input
                          type="url"
                          class="form-control"
                          placeholder="https://facebook.com/"
                          v-model="user.facebook"
                        />
                      </div>
                    </div>
                  </div>

                  <!-- Twitter -->
                  <div class="input-group-row mb-3">
                    <div class="col p-0">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text text-white bg-info">
                            <i class="fab fa-twitter"></i>
                          </span>
                        </div>
                        <input
                          type="url"
                          class="form-control"
                          placeholder="https://twitter.com/"
                          v-model="user.twitter"
                        />
                      </div>
                    </div>
                  </div>

                  <!-- Instagram -->
                  <div class="input-group-row mb-3">
                    <div class="col p-0">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text text-white bg-danger">
                            <i class="fab fa-instagram"></i>
                          </span>
                        </div>
                        <input
                          type="url"
                          class="form-control"
                          placeholder="https://www.instagram.com/"
                          v-model="user.instagram"
                        />
                      </div>
                    </div>
                  </div>

                  <!-- Linkedin -->
                  <div class="input-group-row mb-3">
                    <div class="col p-0">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text text-white bg-primary">
                            <i class="fab fa-linkedin-in"></i>
                          </span>
                        </div>
                        <input
                          type="url"
                          class="form-control"
                          placeholder="https://www.linkedin.com/"
                          v-model="user.linkedin"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="description">About Yourself</label>
                    <textarea class="form-control" id="description" rows="3" v-model="user.about" />
                  </div>
                  <div class="form-group row">
                    <div class="col-lg-9">
                      <input type="submit" class="btn btn-success" value="Save Changes" />
                    </div>
                  </div>
                </form>
              </div>
              <div class="tab-pane fade" id="messagesTab">
                <h1>Messages</h1>
                <!-- TODO -->
                <!-- <ul class="list-group">
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
                    class="list-group-item border-0 text-white d-flex justify-content-center align-items-center mb-2 placeholder"
                  >
                    <h3>Nothing Here!</h3>
                  </li>
                </ul>
                <button class="btn btn-dark">Send a message</button>-->
                <div
                  class="alert alert-primary animated fadeIn"
                  role="alert"
                  style="border-radius: 12px;"
                >
                  <div class="row mb-2">
                    <div class="col">
                      <p>Messaging is not yet a finished feature. To get notified of new features, sign up for our newsletter and follow us on social media:</p>
                    </div>
                  </div>
                  <div class="row d-flex justify-content-center">
                    <div class="col-auto">
                      <a
                        href="https://www.facebook.com/groups/418319811618645/"
                        target="_"
                        class="btn btn-lg btn-outline-primary rounded-circle"
                        style="width: 52px; height: 52px;"
                      >
                        <i class="fab fa-facebook-f"></i>
                      </a>
                    </div>
                    <div class="col-auto">
                      <a
                        href="https://twitter.com/SparkWestNet"
                        target="_"
                        class="btn btn-lg btn-outline-primary rounded-circle"
                        style="width: 52px; height: 52px;"
                      >
                        <i class="fab fa-twitter"></i>
                      </a>
                    </div>
                    <div class="col-auto">
                      <a
                        href="https://www.instagram.com/sparkwestnetwork/"
                        target="_"
                        class="btn btn-lg btn-outline-primary rounded-circle"
                        style="width: 52px; height: 52px;"
                      >
                        <i class="fab fa-instagram"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content border-0">
          <div class="modal-header">
            <h1 class="modal-title text-center w-100" id="exampleModalLongTitle">Profile Picture</h1>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col text-center">
                <!-- <img
                  :src="newImage"
                  class="mx-auto img-fluid d-block mb-2 shadow-sm"
                  id="newImage"
                  alt="avatar"
                >-->

                <VueCropper
                  id="newImage"
                  class="mb-2"
                  ref="cropper"
                  :src="newImage"
                  alt="Source Image"
                  :cropmove="cropImage"
                ></VueCropper>
              </div>
            </div>
            <div class="row">
              <div class="col text-center">
                <div class="dUp file btn btn-primary rounded-pill">
                  Upload Image
                  <i class="fas fa-arrow-up"></i>
                  <input
                    type="file"
                    id="imgUp"
                    class="bUp"
                    accept="image/x-png, image/gif, image/jpeg"
                    @change="loadFile"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer px-0 d-flex justify-content-center">
            <div class="row w-100">
              <div class="col">
                <button type="button" class="btn btn-block btn-danger" data-dismiss="modal">Cancle</button>
              </div>
              <div class="col">
                <button type="button" class="btn btn-block btn-success">Save changes</button>
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
import firebase from 'firebase/app'
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
import $ from 'jquery'

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
      loading: true,
      newImage: null,
      cropImage: null,
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
  components: {
    VueCropper: VueCropper
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
  mounted () {
    $('body').tooltip({ selector: '[data-toggle=tooltip]' })
  },
  watch: {
    page: 'updateCurrent',
    likePage: 'updateCurrentLiked',
    events: 'createPages',
    likedEvents: 'createLikePages'
  },
  methods: {
    changeTab: function (oldTab, newTab) {
      $("[data-target='" + newTab + "']").tab('show')
    },
    loadFile: function () {
      var input = document.querySelector('.bUp')

      var imgURL = window.URL.createObjectURL(input.files[0])
      this.user.photoUrl = imgURL
      this.newImage = imgURL
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
      this.loading = false
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
            vm.newImage = doc.data().user.photo
            vm.user.website = doc.data().user.website
            if (doc.data().user.twitter) {
              vm.user.twitter = doc.data().user.twitter
            }
            if (doc.data().user.facebook) {
              vm.user.facebook = doc.data().user.facebook
            }
            if (doc.data().user.instagram) {
              vm.user.instagram = doc.data().user.instagram
            }
            if (doc.data().user.linkedin) {
              vm.user.linkedin = doc.data().user.linkedin
            }
            vm.user.about = doc.data().user.about
          })
        })
      })
  },
  created () {
    // get events created by user
    this.loading = true
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
      .then((this.loading = false))

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
  text-decoration: none;
}

.circular i {
  text-decoration: none;
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

.placeholder {
  height: 82px;
  border-radius: 12px !important;
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
  height: 82px;
  border-radius: 12px;
}

#loader .spinner-border {
  width: 50px;
  max-width: 100%;
  height: 50px;
  max-height: 100%;
}

.social {
  display: inline-block;
}

#newImage img {
  border-radius: 12px;
}

.badge-danger {
  background-color: #fe3d61 !important;
}

/* Navigation Tabs */
.profile > a.active {
  border-radius: 12px;
}

.likes > a.active {
  background-color: #fe3d61 !important;
  color: white;
  border-radius: 12px;
}

.likes > a {
  color: #fe3d61;
}

.likes > a:hover {
  color: #e43368;
}

.edit > a.active {
  background-color: #17a2b8 !important;
  color: white;
  border-radius: 12px;
}

.edit > a {
  color: #17a2b8;
}

.edit > a:hover {
  color: #138396;
}

.messages > a.active {
  background-color: #6b747d !important;
  color: white;
  border-radius: 12px;
}

.messages > a {
  color: #6b747d;
}

.messages > a:hover {
  color: #5a6168;
}

/* Edit Form */
#description {
  border-radius: 12px;
  resize: none;
}

.input-group-text {
  border-top-left-radius: 40px !important;
  border-bottom-left-radius: 40px !important;
  padding-left: 16px !important;
}

input[type="url"] {
  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;
}
</style>
