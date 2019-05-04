<template>
  <div class="container">
    <div class="row mt-3">
      <div class="col-auto d-flex justify-content-center">
        <img
          :src="'https://firebasestorage.googleapis.com/v0/b/spark-west.appspot.com/o/organizations%2Flogo%2F' + logo + '?alt=media&token'"
          class="mx-auto img-fluid img-circle d-block mb-2 shadow-sm"
          id="preview"
          alt="logo"
        >
      </div>
      <div class="col-lg">
        <div
          class="col rounded"
          :style="'height: 150px; background-image: url(' + banner + '); background-position: center; background-size: cover; background-repeat: no-repeat;'"
        ></div>
        <div class="row mt-3">
          <div class="col-auto">
            <h1>{{name}}</h1>
          </div>
          <div class="col d-flex justify-content-end">
            <!-- Website -->
            <a
              data-toggle="tooltip"
              data-placement="top"
              title="Website"
              :href="website"
              v-if="website"
              target="_blank"
            >
              <span class="fa-stack fa-lg text-secondary">
                <i class="fas fa-square fa-stack-2x"></i>
                <i class="fas fa-globe fa-stack-1x fa-inverse"></i>
              </span>
            </a>

            <!-- Mail -->
            <a data-toggle="tooltip" data-placement="top" title="Email" :href="'mailto: ' + email">
              <span class="fa-stack fa-lg text-success">
                <i class="fas fa-square fa-stack-2x"></i>
                <i class="fas fa-envelope fa-stack-1x fa-inverse"></i>
              </span>
            </a>

            <!-- Twitter -->
            <a
              data-toggle="tooltip"
              data-placement="top"
              title="Twitter"
              :href="twitter"
              v-if="twitter"
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
              title="Facebook"
              :href="facebook"
              v-if="facebook"
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
              title="Instagram"
              :href="instagram"
              v-if="instagram"
              target="_blank"
            >
              <span class="fa-stack fa-lg text-danger">
                <i class="fas fa-square fa-stack-2x"></i>
                <i class="fab fa-instagram fa-stack-1x fa-inverse"></i>
              </span>
            </a>

            <!-- Linkdin -->
            <a
              data-toggle="tooltip"
              data-placement="top"
              title="Linkdin"
              :href="linkdin"
              v-if="linkdin"
              target="_blank"
            >
              <span class="fa-stack fa-lg">
                <i class="fas fa-square fa-stack-2x"></i>
                <i class="fab fa-linkedin-in fa-stack-1x fa-inverse"></i>
              </span>
            </a>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-md-8" v-if="events.length > 0">
            <div class="card" style="height:100%">
              <div class="card-body d-flex justify-content-center align-items-center">Top Event</div>
            </div>
          </div>
          <div class="col">
            <h3>About:</h3>
            <p>
              {{description_small}}
              <a data-toggle="modal" href="#exampleModal">more</a>
            </p>
          </div>
        </div>

        <div class="row mt-3" v-if="events.length > 0">
          <div class="col">
            <div class="card">
              <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-center p-0">
                  <!-- Event Slider -->
                  <carousel :paginationPosition="'bottom-overlay'" :paginationColor="'#F0F1F2'" :paginationActiveColor="'#0275d8'" :autoplayTimeout="6000" :scrollPerPage="false" :perPageCustom="[[480, 2], [768, 3]]" :autoplay="true" :loop="true" class="w-100 rounded">
                    <slide v-for="event in events" :key="event.id">
                      <div class="card bg-secondary text-white">
                        <div class="card-header">
                          <h1>Date</h1>
                        </div>
                        <div class="card-body">
                          Information
                        </div>
                      </div>
                    </slide>
                  </carousel>
                </li>
                <button class="list-group-item btn btn-primary bg-primary">See all events</button>
              </ul>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md mt-3">
            <router-link :to="'/Organizations/organization/' + id + '/users/'" class="card btn p-0">
              <img src="https://picsum.photos/1900/1080/?random" class="card-img" alt="gallery">
              <div class="card-img-overlay d-flex justify-content-center align-items-center">
                <h1 class="overllay-text">Gallery</h1>
              </div>
            </router-link>
          </div>
          <div class="col-md mt-3">
            <div class="card mh-100 h-100">
              <div class="card-header pb-0 text-center">
                <h3>Members</h3>
              </div>
              <div class="card-body py-0">
                <div class="row h-100">
                  <div
                    class="col-md d-flex justify-content-center align-items-center"
                    v-if="users.length"
                  >
                    <figure class="figure text-center">
                      <img
                        :src="users[0].img"
                        class="figure-img img-fluid rounded-circle w-50"
                        alt="..."
                      >
                      <figcaption class="figure-caption">{{users[0].name}}</figcaption>
                    </figure>
                  </div>

                  <div
                    class="col-md d-flex justify-content-center align-items-center"
                    v-if="users.length > 1"
                  >
                    <figure class="figure text-center">
                      <img
                        :src="users[1].img"
                        class="figure-img img-fluid rounded-circle w-50"
                        alt="..."
                      >
                      <figcaption class="figure-caption">{{users[1].name}}</figcaption>
                    </figure>
                  </div>
                </div>
              </div>
              <router-link
                class="card-footer btn btn-primary bg-primary text-white"
                :to="'/Organizations/organization/' + id + '/users/'"
              >See all members</router-link>
            </div>
          </div>
        </div>
        <hr>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header mb-0">
            <h5 class="modal-title" id="exampleModalLabel">About {{name}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <i class="fas fa-times-circle"></i>
            </button>
          </div>
          <div class="modal-body pt-0">
            <div
              class="row d-flex justify-content-center py-3"
              :style="'background-image: url(' + banner + '); background-position: center; background-size: cover; background-repeat: no-repeat;'"
            >
              <img
                :src="'https://firebasestorage.googleapis.com/v0/b/spark-west.appspot.com/o/organizations%2Flogo%2F' + logo + '?alt=media&token'"
                class="mx-auto img-fluid img-circle d-block shadow"
                id="preview"
                alt="logo"
              >
            </div>
            <p class="mt-3">{{description}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import db from '../../Firebase/firebaseInit'
import firebase from 'firebase'
import 'firebase/firestore'
import $ from 'jquery'
import { Carousel, Slide } from 'vue-carousel'

export default {
  data () {
    return {
      name: '',
      website: '',
      twitter: '',
      facebook: '',
      instagram: '',
      linkdin: '',
      description: '',
      description_small: '',
      email: '',
      other: '',
      logo: '',
      banner: '',
      users: {},
      id: null,
      events: []
    }
  },
  components: {
    Carousel,
    Slide
  },
  watch: {
    description: function () {
      if (this.description.length > 200) {
        this.description_small = this.description.slice(0, 200) + '...'
      } else {
        this.description_small = this.description
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    db.collection('organizations')
      .where(firebase.firestore.FieldPath.documentId(), '==', to.params.id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.name = doc.data().organization.name
            vm.website = doc.data().organization.website
            vm.description = doc.data().organization.description
            vm.email = doc.data().organization.contact.email
            vm.logo = doc.data().organization.imagekey
            vm.banner = doc.data().organization.bannerKey
            vm.instagram = doc.data().organization.contact.instagram
            vm.facbook = doc.data().organization.contact.facebook
            vm.twitter = doc.data().organization.contact.twitter
            vm.linkdin = doc.data().organization.contact.linkdin
            vm.users = doc.data().organization.users
            vm.id = doc.id
          })
        })
      })
  },
  mounted () {
    // get user info
    db.collection('organizations')
      .where(
        firebase.firestore.FieldPath.documentId(),
        '==',
        this.$route.params.id
      )
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.name = doc.data().organization.name
          this.website = doc.data().organization.website
          this.description = doc.data().organization.description
          this.email = doc.data().organization.contact.email
          this.banner =
            'https://firebasestorage.googleapis.com/v0/b/spark-west.appspot.com/o/organizations%2Fbanner%2F' +
            doc.data().organization.bannerKey +
            '?alt=media&token'
          this.instagram = doc.data().organization.contact.instagram
          this.facebook = doc.data().organization.contact.facebook
          this.twitter = doc.data().organization.contact.twitter
          this.linkdin = doc.data().organization.contact.linkdin
          this.users = doc.data().organization.users
          this.id = doc.id
        })
      })

    for (var i = 0; i < 6; i++) {
      this.events.push({ id: i })
    }
  }
}
</script>
<style>
.overllay-text {
  color: white;
  mix-blend-mode: difference;
}

.users {
  position: absolute;
  color: white;
  mix-blend-mode: difference;
}
</style>
