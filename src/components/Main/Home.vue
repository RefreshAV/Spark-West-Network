<template>
  <div class="container text-dark">
    <img src="../../assets/stripe.svg" alt class="background-stripe d-none d-lg-flex" />
    <img src="../../assets/stripe-sm.svg" alt class="background-stripe-sm d-lg-none" />

    <!-- Desktop View -->
    <div class="row d-none d-lg-flex">
      <!-- Welcome -->
      <div class="col mr-5 d-flex align-items-end">
        <div>
          <div class="row">
            <div class="col">
              <h2>Welcome to:</h2>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <img
                src="../../assets/LogoMediumREN.png"
                alt="SWN Logo Medium"
                class="img-fluid"
                width="380"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Latest Event -->
      <div class="col-7 p-0 my-5">
        <carousel
          v-if="events.length > 0"
          :per-page="1"
          :scrollPerPage="true"
          :adjustableHeight="true"
          :loop="true"
          :autoplay="true"
          :autoplayTimeout="10000"
          :paginationActiveColor="'#fcd23c'"
          :paginationColor="'#424b54'"
          :paginationSize="14"
          :paginationPadding="10"
          class="event-carousel"
        >
          <slide class="event-slide" v-for="(event, index) in events" :key="event.id">
            <div class="card mx-1 event">
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <div class="row">
                      <div class="col">
                        <h4 class="badge-dark badge-pill d-inline">{{events[0].date}}</h4>
                        <h1 class="mt-2">{{event.title}}</h1>
                        <p class="text-muted">{{event.desc}}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col d-flex justify-content-end">
                    <div
                      :style="'background: url(' + images[index] + ');'"
                      alt="event image"
                      class="event-img"
                    ></div>
                    <router-link
                      :to="'/events/event/' + event.id"
                      class="btn btn-lg btn-success rounded-pill shadow event-info"
                    >
                      <i class="fas fa-eye fa-lg"></i>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </slide>
        </carousel>
        <div v-else class="carousel-placeholder bg-light shadow">
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile view -->
    <!-- Latest Event -->
    <div class="row d-lg-none">
      <div class="col my-5">
        <carousel
          v-if="events.length > 0"
          :per-page="1"
          :scrollPerPage="true"
          :adjustableHeight="true"
          :loop="true"
          :autoplay="true"
          :autoplayTimeout="10000"
          :paginationActiveColor="'#fcd23c'"
          :paginationColor="'#424b54'"
          :paginationSize="14"
          :paginationPadding="10"
          class="event-carousel"
        >
          <slide class="event-slide" v-for="(event, index) in events" :key="event.id + 1">
            <div class="card mx-1">
              <div class="card-body">
                <div class="row mb-3">
                  <div class="col">
                    <div class="row">
                      <div class="col">
                        <h4 class="badge-dark badge-pill d-inline">{{event.date}}</h4>
                        <h1 class="mt-2">{{event.title}}</h1>
                        <p class="text-muted">{{event.desc}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col d-flex justify-content-end">
                    <div
                      :style="'background: url(' + images[index] + ');'"
                      alt="event image"
                      class="img-fluid event-img"
                    ></div>
                    <button class="btn btn-lg btn-success rounded-pill shadow event-info">
                      <i class="fas fa-eye fa-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </slide>
        </carousel>
        <div v-else class="carousel-placeholder bg-light shadow">
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Welcome -->
    <div class="row d-lg-none">
      <div class="col mr-5 d-flex align-items-end">
        <div>
          <div class="row">
            <div class="col">
              <h2>Welcome to:</h2>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <img src="../../assets/LogoMediumREN.png" alt="SWN Logo Medium" class="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Break Line Desktop -->
    <div class="row d-none d-lg-flex" style="margin-top:90px; margin-bottom:90px;">
      <div class="col">
        <img src="../../assets/dashedBreak.svg" alt="line break" class="img-fluid" />
      </div>
    </div>

    <!-- Break Line Mobile -->
    <div class="row my-4 d-lg-none">
      <div class="col">
        <img src="../../assets/dashedBreakMobile.svg" alt="line break" class="img-fluid" />
      </div>
    </div>

    <!-- Desktop View -->
    <!-- Gallery + About -->
    <div class="row d-none d-lg-flex">
      <div class="col">
        <carousel
          :per-page="1"
          :scrollPerPage="true"
          :adjustableHeight="true"
          :loop="true"
          :autoplay="true"
          :autoplayTimeout="5000"
          :paginationPosition="'bottom-overlay'"
          class="gallery-carousel"
        >
          <slide v-for="(img,index) in gallerySize" :key="index">
            <div
              :style="'background: url(' + randImg(index) + ');'"
              class="img-fluid gallery-img shadow"
            ></div>
          </slide>
        </carousel>
        <router-link
          to="/events/gallery shadow"
          class="btn btn-lg btn-success rounded-pill shadow gallery-info"
        >Check Out the Gallery</router-link>
      </div>
      <div class="col-4 ml-5">
        <h2>
          What is
          <i>Spark West Network</i> ?
        </h2>
        <p class="my-2">
          <b>Spark West Network</b> is an umbrella marketing platform that draws together, assists, and coordinates the various organizations, events, and people that define our region’s unique entrepreneurial opportunities.
        </p>
        <router-link to="/about" class="btn btn-block btn-primary rounded-pill shadow">Learn More</router-link>
      </div>
    </div>

    <!-- Mobile View -->
    <div class="row d-lg-none mb-4">
      <div class="col">
        <h2>
          What is
          <i>Spark West Network</i> ?
        </h2>
        <p class="my-2">
          <b>Spark West Network</b> is an umbrella marketing platform that draws together, assists, and coordinates the various organizations, events, and people that define our region’s unique entrepreneurial opportunities.
        </p>
        <router-link to="/about" class="btn btn-block btn-primary rounded-pill shadow">Learn More</router-link>
      </div>
    </div>
    <div class="row d-lg-none">
      <div class="col">
        <div
          style="background-image: url('https://picsum.photos/id/614/1000/500');"
          class="img-fluid gallery-img gallery-img-sm shadow"
        ></div>
        <router-link
          to="/events/gallery shadow"
          class="btn btn-lg btn-success rounded-pill shadow gallery-info gallery-info-sm"
        >Check Out the Gallery</router-link>
      </div>
    </div>

    <!-- Break Line Desktop -->
    <div class="row my-5 d-lg-flex d-none">
      <div class="col">
        <img src="../../assets/dashedBreakLg.svg" alt="line break" class="img-fluid" />
      </div>
    </div>

    <!-- Break Line Mobile -->
    <div class="row my-4 d-lg-none">
      <div class="col">
        <img src="../../assets/dashedBreakMobile.svg" alt="line break" class="img-fluid" />
      </div>
    </div>

    <!-- Social Media Desktop -->
    <div class="row mb-5 d-none d-lg-flex">
      <div class="col-3">
        <div class="row mb-3">
          <div class="col text-center">
            <h2>Spark West Social</h2>
          </div>
        </div>

        <!-- Social Buttons -->
        <div class="row mb-4">
          <div class="col d-flex align-items-center justify-content-end">
            <a
              href="https://www.facebook.com/sparkwestnetwork/"
              target="_"
              class="btn btn-lg btn-primary rounded-pill btn-social shadow"
            >
              <i class="fab fa-facebook-f fa-2x"></i>
            </a>
          </div>
          <div class="col d-flex align-items-center">
            <a
              href="https://www.instagram.com/sparkwestnetwork/"
              target="_"
              class="btn btn-lg btn-danger rounded-pill btn-social shadow"
            >
              <i class="fab fa-instagram fa-2x"></i>
            </a>
          </div>
        </div>
        <div class="row">
          <div class="col d-flex align-items-center justify-content-end">
            <a
              href="https://twitter.com/SparkWestNet"
              target="_"
              class="btn btn-lg btn-info rounded-pill btn-social shadow"
            >
              <i class="fab fa-twitter fa-2x"></i>
            </a>
          </div>
          <div class="col d-flex align-items-center">
            <a
              href="mailto: info@sparkwest.network"
              target="_"
              class="btn btn-lg btn-secondary rounded-pill btn-social shadow"
            >
              <i class="fas fa-envelope fa-2x"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="row">
          <!-- Twitter Feed -->
          <div class="col-6">
            <div class="row">
              <div class="col">
                <div class="card bg-dark card-social twitter shadow">
                  <div class="card-body p-0">
                    <Timeline
                      id="SparkWestNet"
                      class="mb-0"
                      sourceType="profile"
                      :options="{ tweetLimit: '5', theme: 'dark' }"
                    />
                    <div class="p-3 w-100">
                      <a
                        class="btn btn-primary btn-block font-weight-bold"
                        href="https://www.twitter.com/sparkwestnet/"
                        target="_"
                      >See more on Twitter</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Instagram Feed -->
          <div class="col-6">
            <div class="row">
              <div class="col">
                <div class="card bg-light card-social insta shadow">
                  <div class="card-body p-0 text-dark">
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
                                        class="text-dark"
                                      >{{ props.feed.user.full_name }}</a>
                                    </h5>
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col">
                                    <p class="text-primary">@{{ props.feed.user.username }}</p>
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
                            </li>
                          </ul>
                        </a>
                      </template>
                    </vue-instagram>

                    <div class="px-3 pb-3 w-100">
                      <a
                        class="btn btn-primary btn-block font-weight-bold"
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
      </div>
    </div>

    <!-- Social Media Mobile -->
    <div>
      <img src="../../assets/socialStripe.svg" class="social-stripe d-lg-none" />
      <div class="row mb-4 d-lg-none">
        <div class="col">
          <div class="row mb-3">
            <div class="col text-center">
              <h2>Spark West Social</h2>
            </div>
          </div>

          <!-- Social Buttons -->
          <div class="row mb-4">
            <div class="col d-flex align-items-center justify-content-end">
              <a
                href="https://www.facebook.com/sparkwestnetwork/"
                target="_"
                class="btn btn-lg btn-primary rounded-pill btn-social shadow"
              >
                <i class="fab fa-facebook-f fa-2x"></i>
              </a>
            </div>
            <div class="col d-flex align-items-center">
              <a
                href="https://www.instagram.com/sparkwestnetwork/"
                target="_"
                class="btn btn-lg btn-danger rounded-pill btn-social shadow"
              >
                <i class="fab fa-instagram fa-2x"></i>
              </a>
            </div>
          </div>
          <div class="row">
            <div class="col d-flex align-items-center justify-content-end">
              <a
                href="https://twitter.com/SparkWestNet"
                target="_"
                class="btn btn-lg btn-info rounded-pill btn-social shadow"
              >
                <i class="fab fa-twitter fa-2x"></i>
              </a>
            </div>
            <div class="col d-flex align-items-center">
              <a
                href="mailto: info@sparkwest.network"
                target="_"
                class="btn btn-lg btn-secondary rounded-pill btn-social shadow"
              >
                <i class="fas fa-envelope fa-2x"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Twitter Feed Mobile -->
      <div class="row mb-4 d-lg-none">
        <div class="col">
          <div class="row">
            <div class="col">
              <div class="card bg-dark card-social twitter shadow">
                <div class="card-body p-0">
                  <Timeline
                    id="SparkWestNet"
                    class="mb-0"
                    sourceType="profile"
                    :options="{ tweetLimit: '5', theme: 'dark' }"
                  />
                  <div class="p-3 w-100">
                    <a
                      class="btn btn-primary btn-block font-weight-bold"
                      href="https://www.twitter.com/sparkwestnet/"
                      target="_"
                    >See more on Twitter</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Instagram Feed Mobile -->
      <div class="row mb-3 d-lg-none">
        <div class="col">
          <div class="row">
            <div class="col">
              <div class="card bg-light card-social insta shadow">
                <div class="card-body p-0 text-dark">
                  <vue-instagram
                    token="10717756500.1677ed0.fbf63b282dac4d59a22d2abd141c7320"
                    :count="5"
                  >
                    <template slot="feeds" slot-scope="props">
                      <a class="card mb-3 card-insta text-dark" :href="props.feed.link" target="_">
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
                                      class="text-dark"
                                    >{{ props.feed.user.full_name }}</a>
                                  </h5>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col">
                                  <p class="text-primary">@{{ props.feed.user.username }}</p>
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
                          </li>
                        </ul>
                      </a>
                    </template>
                  </vue-instagram>

                  <div class="px-3 pb-3 w-100">
                    <a
                      class="btn btn-primary btn-block font-weight-bold"
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
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import { Timeline } from "vue-tweet-embed";
import VueInstagram from "vue-instagram";
import db from "../../Firebase/firebaseInit";
import "animate.css";

export default {
  data() {
    return {
      events: [],
      images: [],
      backgrounds: [],
      gallerySize: 5
    };
  },
  components: {
    Carousel,
    Slide,
    Timeline,
    VueInstagram
  },
  metaInfo: {
    title: "Spark West Network",
    // override the parent template and just use the above title only
    titleTemplate: null
  },
  created() {
    this.events = [];
    db.collection("events")
      .orderBy("event.date")
      .limit(7)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          var day = doc.data().event.date.day;
          var month = doc.data().event.date.month;
          var year = doc.data().event.date.year;
          var description = doc.data().event.description;
          if (description.length > 164) {
            description = description.slice(0, 164) + " ...";
          }
          const data = {
            id: doc.id,
            title: doc.data().event.title,
            date: year + "-" + month + "-" + day,
            time: doc.data().event.time,
            email: doc.data().event.email,
            desc: description,
            imageKey: doc.data().event.imageKey
          };
          this.events.push(data);
        });
      });
  },
  watch: {
    events: "fetchImages"
  },
  methods: {
    fetchImages() {
      var images = [];
      for (var i = 0; i < this.events.length; i++) {
        let url =
          "https://firebasestorage.googleapis.com/v0/b/spark-west.appspot.com/o/events%2F" +
          this.events[i].imageKey +
          "?alt=media&token";
        images.push(url);
      }
      this.images = images;
      for (let j = 0; j < this.images.length; j++) {
        let url = "url('" + this.images[j] + "')";
        this.backgrounds.push(url);
      }
    },

    randImg(i) {
      return (
        "https://picsum.photos/id/" +
        Math.round(Math.random() * 100).toString() +
        "/1000/500"
      );
    }
  }
};
</script>

<style scoped>
.background-stripe {
  position: absolute;
  z-index: -1000;
  width: 1920px;
  left: inherit;
  top: 0;
}

.background-stripe-sm {
  position: absolute;
  z-index: -1000;
  width: 1110px;
  left: inherit;
  top: 0;
}

.carousel-placeholder {
  min-height: 280px;
  width: 100%;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel-placeholder .spinner-border {
  width: 5rem;
  height: 5rem;
}

.event-slide {
  min-height: 200px;
}

.card,
.card-body {
  border-radius: 12px;
}

/* .event-img {
  border-radius: 12px;
  margin-bottom: 16px;
  margin-right: 16px;
  width: calc(100% - 16px);
  height: calc(100% - 16px);
  min-height: 200px;
  background-position: center !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  background-color: lightgray;
} */

.event-info {
  position: absolute;
  bottom: 0;
  right: 16px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.VueCarousel-dot {
  margin-top: 0 !important;
}

.gallery-carousel {
  border-radius: 12px;
  margin-bottom: 16px;
  margin-right: 16px;
  border: #3bb273 4px solid;
  overflow: hidden;
}

.gallery-img {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 345px;
}

/* .gallery-img-sm {
  width: calc(100% - 16px);
} */

.gallery-info {
  position: absolute;
  bottom: 0;
  right: 0;
}

.gallery-info-sm {
  right: 16px;
}
/* 
.social-stripe {
  position: absolute;
  z-index: -1000;
  width: 1110px;
  left: 0;
  bottom: calc(inherit/2);
} */

.btn-social {
  width: 82px;
  height: 82px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-social {
  border-radius: 12px !important;
  max-height: 440px;
  max-width: 100%;
  overflow: hidden;
}

.card-social .card-body {
  overflow-y: scroll;
}

.card-insta {
  text-decoration: none !important;
}
</style>
