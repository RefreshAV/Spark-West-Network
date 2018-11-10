<template>
  <div class="container my-3">
    <div
      class="d-flex justify-content-center"
      v-if="events.length == 0">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Ajax_loader_metal_512.gif"
        class="loading mb-3"
        style="width:50px; height: 50px;">
    </div>
    <div v-if="events.length != 0">
      <!-- <div class="jumbotron text-white rounded" :style="'background: url(' + images[0] + ')'">
        <div id="jumboContent" class="col-md-4 bg-dark">
          <h1 class="display-4">{{ events[0].title }}</h1>
          <p class="lead my-3">{{ events[0].desc }}</p>
          <p class="lead mb-0"><router-link
            :to="{name: 'event-detail', params: {id: events[0].id}}"
            tag="a"
            class="text-white font-weight-bold">Find out more...</router-link></p>
        </div>
      </div> -->

      <div class="card mb-3 bg-dark text-white">
        <div class="row no-gutters">
          <div class="col">
            <div class="card-block m-3 px-2">
              <h1 class="display-4">{{ events[0].title }}</h1>
              <p class="my-3">{{ events[0].desc }}</p>
              <p class="mb-0"><router-link
                :to="{name: 'event-detail', params: {id: events[0].id}}"
                tag="a"
                class="text-white font-weight-bold">Find out more...</router-link></p>
            </div>
          </div>
          <div class="col-4" :style="'background: url(' + images[0] + '); background-size:cover; background-position:center; background-repeat: no-repeat;'">
          </div>
        </div>
      </div>

      <div class="card-deck mb-3">
        <router-link :to="{name: 'event-detail', params: {id: events[1].id}}" class="card bg-light text-dark">
          <div class="card-body">
            <h1>{{ events[1].title }}</h1>
            <hr>
            <p class="my-3">{{ events[1].desc }}</p>
          </div>
        </router-link>
        <router-link :to="{name: 'event-detail', params: {id: events[2].id}}" class="card bg-light text-dark">
          <div class="card-body">
            <h1>{{ events[2].title }}</h1>
            <hr>
            <p class="my-3">{{ events[2].desc }}</p>
          </div>
        </router-link>
      </div>

      <!-- <div class="card-deck mb-2">
        <router-link
          :to="{name: 'event-detail', params: {id: event.id}}"
          class="card flex-md-row mb-4 box-shadow h-md-250"
          style="min-width:30rem;overflow:hidden"
          v-for="(event, i) in events.slice(1)"
          :key="event.id"
          :id="event.id">
          <div class="card-body d-flex flex-column align-items-start">
            <h3 class="mb-0">
              {{ event.title }}
            </h3>
            <div class="mb-1 text-muted">{{ event.date.year }}-{{ event.date.month }}-{{ event.date.day }}</div>
            <div class="card-text mb-auto preText">{{ event.desc }}</div>

          </div>
          <img
            class="card-img-right flex-auto d-none d-md-block"
            v-if="images.length > 0"
            :src="images[i+1]"
            alt="Card image cap">
          <img
            class="card-img-right flex-auto d-none d-md-block"
            v-if="images.length == 0"
            src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Ajax_loader_metal_512.gif"
            alt="Card image cap">
        </router-link>
      </div> -->

      <div class="text-center">
        <router-link
          to="/events/NewEvent"
          tag="button"
          class="btn btn-primary">
          Create an Event!</router-link>
        <router-link
          to="/events/list"
          tag="button"
          class="btn btn-secondary mx-1">
          All Events!</router-link>
        <router-link
          to="/events/EventMap"
          tag="button"
          class="btn btn-secondary">
          Map</router-link>
      </div>
    </div>
  </div>
</template>

<script scoped>
import db from "../../Firebase/firebaseInit";
import firebase from "firebase";

export default {
  data() {
    return {
      events: [],
      images: [],
      isLoggedIn: false
    };
  },
  created() {
    db.collection("events")
      .orderBy("likes", "desc")
      .limit(3)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // truncate description
          var desc;
          if (
            doc.data().event.description.length > 180 &&
            this.events.length > 0
          ) {
            var trunc = doc.data().event.description;
            desc = trunc.substring(0, 181) + " . . .";
          } else {
            desc = doc.data().event.description;
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
          };
          this.events.push(data);
        });
      });
    id = "bigTxt";
    var vm = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        vm.isLoggedIn = true;
      } else {
        vm.isLoggedIn = false;
      }
    });
  },
  watch: {
    events: "fetchImage"
  },
  methods: {
    fetchImage() {
      var images = [];
      for (var i = 0; i < this.events.length; i++) {
        var url =
          "https://firebasestorage.googleapis.com/v0/b/spark-west.appspot.com/o/events%2F" +
          this.events[i].imageKey +
          "?alt=media&token";
        images.push(url);
      }
      this.images = images;
    }
  }
};
</script>

<style scoped>
/* .jumbotron {
  padding: 0;
  height: 20rem;
}

#jumboContent {
  height: 100%;
}

#bigEvent {
  padding: 0;
  max-height: 20rem;
  height: 100%;
}

#bigTxt {
  overflow: hidden;
  text-overflow: ellipsis; 
}

#bigImg {
  padding: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
} */
</style>
