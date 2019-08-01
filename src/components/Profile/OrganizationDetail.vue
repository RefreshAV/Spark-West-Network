<template>
  <div class="container" v-if="organization.organization">
    <div class="row mt-3">
      <div class="col-auto d-flex justify-content-center">
        <img
          :src="logoImg(organization.organization.logoKey)"
          class="mx-auto img-fluid img-circle d-block mb-2 shadow-sm"
          id="preview"
          alt="logo"
        />
      </div>
      <div class="col-lg">
        <div
          class="col rounded"
          :style="'height: 150px; background-image: url(' + bannerImg(organization.organization.bannerKey) + '); background-position: center; background-size: cover; background-repeat: no-repeat;'"
        ></div>
        <div class="row mt-3">
          <div class="col-auto">
            <h1>{{ organization.organization.name }}</h1>
          </div>
          <div class="col d-flex justify-content-end">
            <!-- Website -->
            <a
              data-toggle="tooltip"
              data-placement="top"
              title="Website"
              :href="organization.organization.website"
              v-if="organization.organization.website"
              target="_blank"
            >
              <span class="fa-stack fa-lg text-secondary">
                <i class="fas fa-square fa-stack-2x"></i>
                <i class="fas fa-globe fa-stack-1x fa-inverse"></i>
              </span>
            </a>

            <!-- Mail -->
            <a data-toggle="tooltip" data-placement="top" title="Email" :href="'mailto:' + organization.organization.contact.email">
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
              :href="organization.organization.contact.twitter"
              v-if="organization.organization.contact.twitter"
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
              :href="organization.organization.contact.facebook"
              v-if="organization.organization.contact.facebook"
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
              :href="organization.organization.contact.instagram"
              v-if="organization.organization.contact.instagram"
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
              title="LinkedIn"
              :href="organization.organization.contact.linkedin"
              v-if="organization.organization.contact.linkedin"
              target="_blank"
            >
              <span class="fa-stack fa-lg">
                <i class="fas fa-square fa-stack-2x"></i>
                <i class="fab fa-linkedin-in fa-stack-1x fa-inverse"></i>
              </span>
            </a>
          </div>
        </div>
        <hr />
        <div class="row">
          <!-- <div class="col-md-8" v-if="events.length > 0">
            <div class="card" style="height:100%">
              <div class="card-body d-flex justify-content-center align-items-center">Top Event</div>
            </div>
          </div> -->
          <div class="col">
            <h3>About:</h3>
            <p>
              {{organization.organization.description}}
              <!-- <a data-toggle="modal" href="#exampleModal">more</a> -->
            </p>
          </div>
        </div>

        <!-- <div class="row mt-3" v-if="events.length > 0">
          <div class="col">
            <div class="card">
              <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-center p-0">
            
                  <carousel
                    :paginationPosition="'bottom-overlay'"
                    :paginationColor="'#F0F1F2'"
                    :paginationActiveColor="'#0275d8'"
                    :autoplayTimeout="6000"
                    :scrollPerPage="false"
                    :perPageCustom="[[480, 2], [768, 3]]"
                    :autoplay="true"
                    :loop="true"
                    class="w-100 rounded"
                  >
                    <slide v-for="event in events" :key="event.id">
                      <div class="card bg-secondary text-white">
                        <div class="card-header">
                          <h1>Date</h1>
                        </div>
                        <div class="card-body">Information</div>
                      </div>
                    </slide>
                  </carousel>
                </li>
                <button class="list-group-item btn btn-primary bg-primary">See all events</button>
              </ul>
            </div>
          </div>
        </div> -->

        <div class="row">
          <div class="col-md mt-3">
            <router-link :to="'/Organizations/organization/' + organization.id + '/users/'" class="card btn p-0">
              <img src="https://picsum.photos/1900/1080/?random" class="card-img" alt="gallery" />
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
                    v-for="member in organization.organization.members"
                    :key="member.userRef.id"
                  >
                    <figure class="figure text-center">
                      <img
                        :src="member.userRef.user.photo"
                        class="figure-img img-fluid rounded-circle w-50"
                        alt="..."
                      />
                      <figcaption class="figure-caption">{{ member.userRef.user.name }}</figcaption>
                    </figure>
                  </div>
                </div>
              </div>
              <router-link
                class="card-footer btn btn-primary bg-primary text-white"
                :to="'/Organizations/organization/' + organization.id + '/users/'"
              >See all members</router-link>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>

    <!-- Modal -->
    <!-- <div
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
              />
            </div>
            <p class="mt-3">{{description}}</p>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import db from "../../Firebase/firebaseInit";
import firebase from "firebase";
import "firebase/firestore";
import $ from "jquery";
import { Carousel, Slide } from "vue-carousel";

export default {
  data() {
    return {
      organization: {
        organization: {
          contact: {},
          members: []
        }
      }
      // name: '',
      // website: '',
      // twitter: '',
      // facebook: '',
      // instagram: '',
      // linkdin: '',
      // description: '',
      // description_small: '',
      // email: '',
      // other: '',
      // logo: '',
      // banner: '',
      // users: {},
      // id: null,
      // events: []
    };
  },
  components: {
    Carousel,
    Slide
  },
  // watch: {
  //   description: function () {
  //     if (this.description.length > 200) {
  //       this.description_small = this.description.slice(0, 200) + '...'
  //     } else {
  //       this.description_small = this.description
  //     }
  //   }
  // },
  mounted() {
    this.$bind('organization', db.collection('organizations').doc(this.$route.params.id))
  },
  methods: {
    logoImg (logoKey) {
      return 'https://firebasestorage.googleapis.com/v0/b/spark-west.appspot.com/o/organizations%2Flogo%2F' + logoKey + '?alt=media&token'
    },
    bannerImg (bannerKey) {
      return 'https://firebasestorage.googleapis.com/v0/b/spark-west.appspot.com/o/organizations%2Fbanner%2F' + bannerKey + '?alt=media&token'
    },
  }
};
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
