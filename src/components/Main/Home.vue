<template>
  <div>
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

        <h1 class="d-lg-block d-none text-center display-3 pb-5">
          Welcome To
          <br>Spark West Network
        </h1>

        <h2 class="d-lg-none text-center pb-5">
          Welcome To
          <br>Spark West Network
        </h2>

        <!-- Marketing Icons Section -->
        <div class="row">
          <div class="col-lg-4 mb-4">
            <div class="card card-info h-100 border-0 shadow animated fadeInLeft">
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
            <div class="card card-info h-100 border-0 shadow animated fadeInLeft delay1">
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
            <div class="card card-info h-100 border-0 shadow animated fadeInLeft delay2">
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
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import db from "../../Firebase/firebaseInit";

export default {
  data() {
    return {
      events: [],
      images: [],
      backgrounds: []
    };
  },
  components: {
    Carousel,
    Slide
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
      .limit(3)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          var day = doc.data().event.date.day;
          var month = doc.data().event.date.month;
          var year = doc.data().event.date.year;
          const data = {
            id: doc.id,
            title: doc.data().event.title,
            date: year + "-" + month + "-" + day,
            time: doc.data().event.time,
            email: doc.data().event.email,
            desc: doc.data().event.description,
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
    }
  }
};
</script>

<style scoped>
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
</style>
