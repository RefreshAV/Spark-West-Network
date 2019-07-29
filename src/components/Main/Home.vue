<template>
  <div class="w-100">
    <img id="backdrop" class="animated fadeIn d-md-inline d-none" src="../../assets/backdrop04.svg" />
    <img id="backdrop-small" class="animated fadeIn d-md-none" src="../../assets/backdrop07.svg" />
    <!-- Slides -->
    <div class="d-none d-lg-flex w-100 justify-content-center">
      <carousel
        id="carousel-lg"
        class="bg-light carousel p-0 shadow"
        :per-page="1"
        :autoplay="true"
        :autoplayTimeout="6000"
        :loop="true"
        :paginationPosition="'bottom-overlay'"
      >
        <slide class="slide">
          <!-- Image Slide -->
          <div class="row w-100 h-100 d-flex justify-content-center align-items-end">
            <div class="col-auto">
              <router-link
                to="/events/EventGallery"
                class="btn btn-success my-5"
              >Check Out The Gallery</router-link>
            </div>
          </div>
        </slide>

        <slide
          v-for="(event, index) in events"
          v-show="events"
          :key="event.id"
          class="slide d-flex justify-content-center"
          :style="'background-image:' + backgrounds[index]"
        >
          <div class="w-100 d-flex justify-content-center align-items-center">
            <router-link
              :to="{name: 'event-detail', params: {id: event.id}}"
              class="w-100 text-dark card border-0 shadow"
            >
              <div class="card-body" style="text-overflow: ellipsis;">
                <h3 class="text-info">{{ event.date }}:</h3>
                <h1>{{ event.title }}</h1>
                <p>{{ event.desc }}</p>
              </div>
            </router-link>
          </div>
        </slide>

        <slide class="slide shadow">
          <!-- Image Slide 2 -->
          <div class="row w-100 h-100 d-flex justify-content-center align-items-end">
            <div class="col-auto">
              <router-link
                to="/events/EventGallery"
                class="btn btn-success my-5"
              >Check Out The Gallery</router-link>
            </div>
          </div>
        </slide>
      </carousel>
    </div>

    <div>
      <div class="container">
        <carousel
          id="carousel-sm"
          class="d-lg-none bg-light carousel p-0 shadow"
          :per-page="1"
          :autoplay="true"
          :autoplayTimeout="6000"
          :loop="true"
          :paginationPosition="'bottom-overlay'"
        >
          <slide class="slide">
            <!-- Image Slide -->
            <div class="row w-100 h-100 d-flex justify-content-center align-items-end">
              <div class="col-auto">
                <router-link
                  to="/events/EventGallery"
                  class="btn btn-success my-5"
                >Check Out The Gallery</router-link>
              </div>
            </div>
          </slide>

          <slide
            v-for="(event, index) in events"
            v-show="events"
            :key="event.id"
            class="slide d-flex justify-content-center"
            :style="'background-image:' + backgrounds[index]"
          >
            <div class="w-100 d-flex justify-content-center align-items-center">
              <router-link
                :to="{name: 'event-detail', params: {id: event.id}}"
                class="w-100 text-dark mx-3 card border-0 shadow"
              >
                <div class="card-body" style="text-overflow: ellipsis;">
                  <h3 class="text-info">{{ event.date }}:</h3>
                  <h1>{{ event.title }}</h1>
                  <p>{{ event.desc }}</p>
                </div>
              </router-link>
            </div>
          </slide>

          <slide class="slide shadow">
            <!-- Image Slide 2 -->
            <div class="row w-100 h-100 d-flex justify-content-center align-items-end">
              <div class="col-auto">
                <router-link
                  to="/events/EventGallery"
                  class="btn btn-success my-5"
                >Check Out The Gallery</router-link>
              </div>
            </div>
          </slide>
        </carousel>

        <div class="line bg-dark my-5"></div>

        <h1 id="swn" class="text-center display-3 pb-5">
          Welcome To
          <br />
          <b>Spark West Network</b>
        </h1>

        <!-- Marketing Icons Section -->
        <div class="row">
          <div class="col-lg-4 mb-4">
            <div class="card card-info h-100 shadow animated fadeInLeft">
              <h4 class="card-header">
                <i class="far fa-comments"></i> A Unified Voice
              </h4>
              <div class="card-body">
                <p
                  class="card-text"
                >There is no unifying voice that pulls together the diverse organizations, events, and opportunities present in the Annapolis Valley, and sister municipalities. As individuals interested in what this community offers to entrepreneurs and creative professionals, it can be challenging to keep on top of what is going on of interest. This greatly limits regional organizations’ ability to reach out to our community.</p>
              </div>
              <router-link
                to="/About"
                class="card-footer bg-primary font-weight-bold btn btn-grad-blue"
              >Learn More</router-link>
            </div>
          </div>
          <div class="col-lg-4 mb-4">
            <div class="card card-info h-100 shadow animated fadeInLeft delay1">
              <h4 class="card-header">
                <i class="fa fa-arrow-right"></i> An Access Ramp
              </h4>
              <div class="card-body">
                <p
                  class="card-text"
                >Individuals within our region who are new to this space, or unaware, but would be interested in it, have no central “on-ramp” to its discovery.</p>
              </div>
              <router-link
                to="/About"
                class="card-footer bg-primary font-weight-bold btn btn-grad-blue"
              >Learn More</router-link>
            </div>
          </div>
          <div class="col-lg-4 mb-4">
            <div class="card card-info h-100 shadow animated fadeInLeft delay2">
              <h4 class="card-header">
                <i class="far fa-bell"></i> Attracting Talent
              </h4>
              <div class="card-body">
                <p
                  class="card-text"
                >The talent that we are looking to attract to Western Nova might look unfavorably on our region if they do not see it representing the cultural and business development opportunities that they could access elsewhere.</p>
              </div>
              <router-link
                to="/About"
                class="card-footer bg-primary font-weight-bold btn btn-grad-blue"
              >Learn More</router-link>
            </div>
          </div>
        </div>

        <hr />

        <div class="row mb-3">
          <div class="col text-center">
            <h1>Spark West Social:</h1>
          </div>
        </div>

        <div class="row d-flex justify-content-center mb-5">
          <!-- Twitter feed -->
          <div class="col mb-3">
            <div class="row mb-2">
              <div class="col text-center">
                <h3>
                  <span class="badge badge-pill badge-primary">
                    Twitter
                    <i class="fab fa-twitter"></i>
                  </span>
                </h3>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="card bg-dark card-social shadow">
                  <div class="card-body p-0">
                    <Timeline
                      id="SparkWestNet"
                      class="mb-0"
                      sourceType="profile"
                      :options="{ tweetLimit: '5', theme: 'dark' }"
                    />
                    <div class="p-3 w-100">
                      <a
                        class="btn btn-grad-blue btn-block font-weight-bold"
                        href="https://www.twitter.com/sparkwestnet/"
                        target="_"
                      >See more on Twitter</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Instagram feed -->
          <div class="col">
            <div class="row mb-2">
              <div class="col text-center">
                <h3>
                  <span class="badge badge-pill badge-danger">
                    Instagram
                    <i class="fab fa-instagram"></i>
                  </span>
                </h3>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="card bg-light card-social shadow">
                  <div class="card-body p-0">
                    <vue-instagram
                      token="10717756500.1677ed0.fbf63b282dac4d59a22d2abd141c7320"
                      :count="5"
                    >
                      <template slot="feeds" slot-scope="props">
                        <a
                          class="card mb-3 card-insta text-dark"
                          :href="props.feed.link"
                          target="_"
                        >
                          <div class="card-header">
                            <div class="row d-flex align-items-center">
                              <div class="col-auto">
                                <img
                                  :src="props.feed.user.profile_picture"
                                  alt="prof pics"
                                  class="rounded-circle shadow-sm"
                                  width="80"
                                />
                              </div>
                              <div class="col-auto">
                                <div class="row">
                                  <div class="col">
                                    <h5>
                                      <a
                                        :href="'https://www.instagram.com/' + props.feed.user.username"
                                        target="_"
                                      >{{ props.feed.user.full_name }}</a>
                                    </h5>
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col">
                                    <p>@{{ props.feed.user.username }}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <img
                            :src="props.feed.images.standard_resolution.url"
                            alt="Image"
                            class="card-img-top"
                          />
                          <!-- <div class="card-body">{{ props.feed.caption.text }}</div> -->
                          <ul class="list-group list-group-flush">
                            <li class="list-group-item text-muted">
                              {{props.feed.likes.count}} people
                              <i
                                class="fas fa-heart fa-lg"
                                style="color: #FD4260;"
                              ></i> this
                            </li>
                            <li class="list-group-item">
                              <div class="row">
                                <div class="col">{{ props.feed.caption.text }}</div>
                              </div>
                              <!-- <div class="row">
                            <div class="col-auto" v-for="(tag, index) in props.feed.tags" :key="index">
                              <h3><span class="badge badge-info">{{ tag }}</span></h3>
                            </div>
                              </div>-->
                            </li>
                          </ul>
                        </a>
                      </template>
                    </vue-instagram>

                    <div class="px-3 pb-3 w-100">
                      <a
                        class="btn btn-grad-blue btn-block font-weight-bold"
                        href="https://www.instagram.com/sparkwestnetwork/"
                        target="_"
                      >See more on instagram</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row d-flex justify-content-center mb-5">
          <div class="col-auto">
            <div class="card shadow">
              <div class="card-body">
                <div class="row mb-3">
                  <div class="col text-center">
                    <h3>Follow Us!</h3>
                  </div>
                </div>

                <div class="row">
                  <div class="col text-center">
                    <div class="btn-group d-none d-sm-inline">
                      <a
                        href="https://twitter.com/SparkWestNet/media"
                        target="_"
                        class="btn btn-info btn-lg"
                      >
                        Twitter
                        <i class="fab fa-twitter fa-lg"></i>
                      </a>
                      <a
                        href="https://fb.me/sparkwestnetwork"
                        target="_"
                        class="btn btn-primary btn-lg"
                      >
                        Facebook
                        <i class="fab fa-facebook fa-lg"></i>
                      </a>
                      <a
                        href="https://www.instagram.com/sparkwestnetwork/"
                        target="_"
                        class="btn btn-danger btn-lg"
                      >
                        Instagram
                        <i class="fab fa-instagram fa-lg"></i>
                      </a>
                    </div>

                    <div class="btn-group-vertical d-inline d-sm-none">
                      <a
                        href="https://twitter.com/SparkWestNet/media"
                        target="_"
                        class="btn btn-info btn-lg"
                      >
                        Twitter
                        <i class="fab fa-twitter fa-lg"></i>
                      </a>
                      <a
                        href="https://fb.me/sparkwestnetwork"
                        target="_"
                        class="btn btn-primary btn-lg"
                      >
                        Facebook
                        <i class="fab fa-facebook fa-lg"></i>
                      </a>
                      <a
                        href="https://www.instagram.com/sparkwestnetwork/"
                        target="_"
                        class="btn btn-danger btn-lg"
                      >
                        Instagram
                        <i class="fab fa-instagram fa-lg"></i>
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
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import { Timeline } from 'vue-tweet-embed'
import VueInstagram from 'vue-instagram'
import db from '../../Firebase/firebaseInit'

export default {
  data () {
    return {
      events: [],
      images: [],
      backgrounds: []
    }
  },
  components: {
    Carousel,
    Slide,
    Timeline,
    VueInstagram
  },
  metaInfo: {
    title: 'Spark West Network',
    // override the parent template and just use the above title only
    titleTemplate: null
  },
  created () {
    this.events = []
    db.collection('events')
      .orderBy('event.date')
      .limit(3)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          var day = doc.data().event.date.day
          var month = doc.data().event.date.month
          var year = doc.data().event.date.year
          const data = {
            id: doc.id,
            title: doc.data().event.title,
            date: year + '-' + month + '-' + day,
            time: doc.data().event.time,
            email: doc.data().event.email,
            desc: doc.data().event.description,
            imageKey: doc.data().event.imageKey
          }
          this.events.push(data)
        })
      })
  },
  watch: {
    events: 'fetchImages'
  },
  methods: {
    fetchImages () {
      var images = []
      for (var i = 0; i < this.events.length; i++) {
        let url =
          'https://firebasestorage.googleapis.com/v0/b/spark-west.appspot.com/o/events%2F' +
          this.events[i].imageKey +
          '?alt=media&token'
        images.push(url)
      }
      this.images = images
      for (let j = 0; j < this.images.length; j++) {
        let url = "url('" + this.images[j] + "')"
        this.backgrounds.push(url)
      }
    }
  }
}
</script>

<style scoped>
@media (max-width: 766px) {
  #swn {
    font-size: 3em;
  }
}

#swn b {
  background: -webkit-linear-gradient(
    45deg,
    #fd4260,
    #fed766
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    45deg,
    #fd4260,
    #fed766
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  -webkit-background-clip: text;
  background-clip: text;
  background-position: center;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

.portfolio-item {
  margin-bottom: 30px;
}

#carousel-lg {
  margin: 15px;
  max-width: 1600px;
  width: 100%;
  min-height: 350px;
}

#carousel-sm {
  margin: 15px 0px 15px 0px;
}

.slide {
  height: 50vh;
  min-height: 350px;
  width: 100%;
  background-image: url("https://picsum.photos/1900/1080/?random");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.slide .card {
  transition: 0.5s;
  border-radius: 12px;
  text-decoration: none !important;
  max-width: 1000px;
  max-height: calc(100% - 100px);
  overflow-y: auto;
  overflow-x: hidden;
}

.slide .card:hover {
  background: rgb(240, 240, 240);
}

.btn-grad-blue {
  background: #56ccf2; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    45deg,
    #2f80ed,
    #56ccf2
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    45deg,
    #2f80ed,
    #56ccf2
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  background-size: 200% auto;
  border: 0;
  transition: 0.5s;
  color: white;
}

.btn-grad-blue:hover {
  background-position: right center;
  color: white;
}

.welcome {
  color: #ee4036;
}

.delay1 {
  animation-delay: 0.5s;
}

.delay2 {
  animation-delay: 1s;
}

.slide,
.carousel {
  border-radius: 12px;
}

.card-info {
  border-radius: 12px;
}

.card-info .card-header {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.card-info .btn {
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}

.line {
  width: 100;
  height: 16px;
  border-radius: 16px;
}

#backdrop {
  position: absolute;
  width: 100%;
  max-height: 50vmax;
  max-width: 1900px;
  z-index: -1000 !important;
  bottom: 220px;
  left: 0px;
}

#backdrop-small {
  position: absolute;
  width: 100%;
  z-index: -1000 !important;
  bottom: 220px;
  left: 0px;
}

.card-social {
  border-radius: 12px !important;
  max-height: 440px;
  overflow: hidden;
}

.card-social .card-body {
  overflow-y: scroll;
}

.card-insta {
  text-decoration: none !important;
}

.btn-danger {
  background: #fe3d61;
  border-color: #fe3d61;
}

.btn-danger:hover {
  background: #e23655;
  border-color: #e23655;
}

.badge-danger {
  background: #fe3d61;
}

.card {
  border-radius: 12px;
}
</style>
