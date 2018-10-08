<template>
  <header>
    <div
      id="carouselExampleIndicators"
      class="carousel slide"
      data-ride="carousel">
      <ol class="carousel-indicators carousel-indicators-round">
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="0"
          class="active"/>
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="1"/>
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="2"/>
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="3"
          v-if="events.length > 0"/>
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="4"
          v-if="events.length > 1"/>
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="5"
          v-if="events.length > 2"/>
      </ol>
      <div
        class="carousel-inner"
        data-interval="false"
        role="listbox">
        <!-- Slide One - Set the background image for this slide in the line below -->
        <div
          class="carousel-item active"
          style="background-image: url('https://picsum.photos/1900/1080/?random')">
          <div class="carousel-caption d-none d-md-block">
            <router-link
              to="/events/EventGallery"
              class="btn btn-success"
              style="margin-bottom: 10px;">Check out the Gallery</router-link>
          </div>
        </div>

        <!-- Event 1 -->
        <div
          v-if="events.length > 0"
          class="carousel-item event"
          :style="{'background-image': 'url(' + images[0] + ')'}">
          <div
            class="d-flex justify-content-center align-items-center"
            style="height:100%">
            <router-link
              :to="{name: 'event-detail', params: {id: events[0].id}}"
              class="list-group-item card text-white bg-secondary mb-3"
              style="width:80%">
              <div class="card-header display-4">{{ events[0].date }}</div>
              <div class="media card-body">
                <img
                  class="mr-3"
                  :src="images[0]"
                  alt="Generic placeholder image">
                <div class="media-body">
                  <h3 class="mt-0">{{ events[0].title }}</h3>
                  {{ events[0].desc }}
                </div>
              </div>
            </router-link>
          </div>
        </div>

        <div
          class="carousel-item"
          style="background-image: url('https://picsum.photos/1900/1080/?random')">
          <div class="carousel-caption d-none d-md-block">
            <h3>Second Image Slide</h3>
            <p>This is a description for the second image.</p>
          </div>
        </div>

        <!-- Event 2 -->
        <div
          v-if="events.length > 1"
          class="carousel-item event"
          :style="{'background-image': 'url(' + images[1] + ')'}">
          <div
            class="d-flex justify-content-center align-items-center"
            style="height:100%">
            <router-link
              :to="{name: 'event-detail', params: {id: events[1].id}}"
              class="list-group-item card text-white bg-secondary mb-3"
              style="width:80%">
              <div class="card-header display-4">{{ events[1].date }}</div>
              <div class="media card-body">
                <img
                  class="mr-3"
                  :src="images[1]"
                  alt="Generic placeholder image">
                <div class="media-body">
                  <h3 class="mt-0">{{ events[1].title }}</h3>
                  {{ events[1].desc }}
                </div>
              </div>
            </router-link>
          </div>
        </div>

        <div
          class="carousel-item"
          style="background-image: url('https://picsum.photos/1900/1080/?random')">
          <div class="carousel-caption d-none d-md-block">
            <h3>Third Image Slide</h3>
            <p>This is a description for the third image.</p>
          </div>
        </div>

        <!-- Event 3 -->
        <div
          v-if="events.length > 2"
          class="carousel-item event"
          :style="{'background-image': 'url(' + images[2] + ')'}">
          <div
            class="d-flex justify-content-center align-items-center"
            style="height:100%">
            <router-link
              :to="{name: 'event-detail', params: {id: events[2].id}}"
              class="list-group-item card text-white bg-secondary mb-3"
              style="width:80%">
              <div class="card-header display-4">{{ events[2].date }}</div>
              <div class="media card-body">
                <img
                  class="mr-3"
                  :src="images[2]"
                  alt="Generic placeholder image">
                <div class="media-body">
                  <h3 class="mt-0">{{ events[2].title }}</h3>
                  {{ events[2].desc }}
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <a
        class="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev">
        <span
          class="carousel-control-prev-icon"
          aria-hidden="true"/>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next">
        <span
          class="carousel-control-next-icon"
          aria-hidden="true"/>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </header>
</template>

<script>
import db from '../../Firebase/firebaseInit'
export default {
  data () {
    return {
      events: [],
      images: [],
      backgrounds: []
    }
  },
  created () {
    db
      .collection('events')
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
body {
  padding-top: 54px;
}

.media img {
  max-width: 20%;
}

.carousel-item {
  height: 65vh;
  min-height: 300px;
  background: no-repeat center center scroll;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.portfolio-item {
  margin-bottom: 30px;
}

.carousel-indicators-round li {
  border-radius: 10px;
  margin: 1px 14px;
  height: 18px;
  max-width: 18px;
  border: 1px solid #fff;
  background-color: transparent;
}
.carousel-indicators .active {
  background-color: #fff;
  max-width: 20px;
  margin: 0 14px;
  height: 20px;
}
</style>
