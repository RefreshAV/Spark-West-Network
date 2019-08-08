<template>
  <div class="container my-3">
    <div class="d-flex justify-content-center" v-if="events.length == 0">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Ajax_loader_metal_512.gif"
        class="loading mb-3"
        style="width:50px; height: 50px;"
      >
    </div>
    <div v-if="events.length > 0">
      <div class="card border-0 shadow mb-3 bg-dark text-white animated fadeInLeft">
        <div class="row no-gutters">
          <div class="col">
            <div class="card-block m-3 px-2">
              <h1 class="display-4">{{ events[0].title }}</h1>
              <p class="my-3">{{ events[0].desc }}</p>
              <router-link
                :to="{name: 'event-detail', params: {id: events[0].id}}"
                tag="a"
                class="btn btn-info font-weight-bold mb-0 text-white border-0"
              >Find out more...</router-link>
            </div>
          </div>
          <div id="big-img" class="col-4" :style="'background: url(' + images[0] + ');'"></div>
        </div>
      </div>

      <div class="line my-3 animated fadeIn"></div>

      <div v-if="events.length > 1" class="card-deck mb-3">
        <router-link
          v-if="events.length > 2"
          :to="{name: 'event-detail', params: {id: events[1].id}}"
          class="card border-0 shadow bg-light text-dark animated fadeInLeft"
          style="animation-delay:0.25s; text-decoration:none;"
        >
          <div class="card-header">
            <h1>{{ events[1].title }}</h1>
          </div>
          <div class="card-body">
            <p class="my-3">{{ events[1].desc }}</p>
          </div>
        </router-link>
        <router-link
          v-if="events.length > 2"
          :to="{name: 'event-detail', params: {id: events[2].id}}"
          class="card border-0 shadow bg-light text-dark animated fadeInLeft"
          style="animation-delay:0.5s; text-decoration:none;"
        >
          <div class="card-header">
            <h1>{{ events[2].title }}</h1>
          </div>
          <div class="card-body">
            <p class="my-3">{{ events[2].desc }}</p>
          </div>
        </router-link>
      </div>

      <!-- Horizontal Buttons -->
      <div class="row d-none d-md-block animated fadeIn">
        <div class="btn-group mb-3 col" style="width:100%;">
          <router-link to="/events/new" tag="button" class="btn btn-primary btn-left">
            <div class="row d-flex justify-content-center">
              <i class="fas fa-plus-circle fa-2x"></i>
            </div>
            <div class="row d-flex justify-content-center">Create an Event</div>
          </router-link>
          <router-link to="/events/calendar" tag="button" class="btn btn-info">
            <div class="row d-flex justify-content-center">
              <i class="fas fa-eye fa-2x"></i>
            </div>
            <div class="row d-flex justify-content-center">View All Events</div>
          </router-link>
          <router-link to="/events/map" tag="button" class="btn btn-danger btn-right">
            <div class="row d-flex justify-content-center">
              <i class="fas fa-map-marker-alt fa-2x"></i>
            </div>
            <div class="row d-flex justify-content-center">View Event Map</div>
          </router-link>
        </div>
      </div>

      <!-- Vertical Button -->
      <div class="btn-group-vertical mb-3 d-md-none" style="width:100%;">
        <router-link to="/events/new" tag="button" class="btn btn-primary btn-top">
          <div class="row d-flex justify-content-center">
            <i class="fas fa-plus-circle fa-2x"></i>
          </div>
          <div class="row d-flex justify-content-center">Create an Event</div>
        </router-link>
        <router-link to="/events/list" tag="button" class="btn btn-info">
          <div class="row d-flex justify-content-center">
            <i class="fas fa-eye fa-2x"></i>
          </div>
          <div class="row d-flex justify-content-center">View All Events</div>
        </router-link>
        <router-link to="/events/map" tag="button" class="btn btn-danger btn-bottom">
          <div class="row d-flex justify-content-center">
            <i class="fas fa-map-marker-alt fa-2x"></i>
          </div>
          <div class="row d-flex justify-content-center">View Event Map</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script scoped>
import db from '../../Firebase/firebaseInit'
import firebase from 'firebase'

export default {
  data () {
    return {
      events: [],
      images: [],
      isLoggedIn: false
    }
  },
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: 'Events'
  },
  created () {
    db.collection('events')
      .orderBy('likes', 'desc')
      .limit(3)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // truncate description
          var desc
          if (
            doc.data().event.description.length > 180 &&
            this.events.length > 0
          ) {
            var trunc = doc.data().event.description
            desc = trunc.substring(0, 181) + ' . . .'
          } else {
            desc = doc.data().event.description
          }

          // compile and push data as object
          var day = doc.data().event.date.day
          var month = doc.data().event.date.month
          var year = doc.data().event.date.year

          const data = {
            id: doc.id,
            title: doc.data().event.title,
            date: year + '-' + month + '-' + day,
            time: doc.data().event.time,
            email: doc.data().event.email,
            desc: desc,
            imageKey: doc.data().event.imageKey
          }
          this.events.push(data)
        })
      })
    var vm = this
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        vm.isLoggedIn = true
      } else {
        vm.isLoggedIn = false
      }
    })
  },
  watch: {
    events: 'fetchImage',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'The top events on Spark West Network'
      }
    ]
  },
  methods: {
    fetchImage () {
      var images = []
      for (var i = 0; i < this.events.length; i++) {
        var url =
          'https://firebasestorage.googleapis.com/v0/b/spark-west.appspot.com/o/events%2F' +
          this.events[i].imageKey +
          '?alt=media&token'
        images.push(url)
      }
      this.images = images
    }
  }
}
</script>

<style scoped>
.more {
  background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
}

.overllay-text {
  color: white;
  mix-blend-mode: difference;
}

#big-img {
  background-size: cover !important;
  background-position: center;
  background-repeat: no-repeat;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}

.btn-left {
  border-top-left-radius: 80px;
  border-bottom-left-radius: 80px;
}

.btn-right {
  border-top-right-radius: 80px;
  border-bottom-right-radius: 80px;
}

.btn-top {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.btn-bottom {
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}

.card {
  border-radius: 12px;
}

.line {
  width: 100;
  height: 12px;
  border-radius: 16px;

  background: #ee4036; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    45deg,
    #ff3a2b,
    #fd4260,
    #ee4036
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    45deg,
    #ff3a2b,
    #fd4260,
    #ee4036
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
