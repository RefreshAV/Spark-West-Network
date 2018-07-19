<template>
  <div class="container">
    <div class="d-flex justify-content-center" v-if="events.length == 0">
      <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Ajax_loader_metal_512.gif" class="loading" style="width:50px; height: 50px;">
    </div>
    <div v-if="events.length != 0">
      <div class="jumbotron p-3 p-md-5 text-white rounded bg-dark">
      <div class="col-md-6 px-0">
        <h1 class="display-4">{{events[0].title}}</h1>
        <p class="lead my-3">{{events[0].desc}}</p>
        <p class="lead mb-0"><router-link v-bind:to="{name: 'event-detail', params: {id: events[0].id}}" tag="a" class="text-white font-weight-bold">Find out more...</router-link></p>
      </div>
    </div>

    <div class="card-deck mb-2">
        <div class="card flex-md-row mb-4 box-shadow h-md-250" style="min-width:30rem;" v-for="(event, i) in events.slice(1)" v-bind:key="event.id">
          <div class="card-body d-flex flex-column align-items-start">
            <h3 class="mb-0">
              {{event.title}}
            </h3>
            <div class="mb-1 text-muted">{{event.date.year}}-{{event.date.month}}-{{event.date.day}}</div>
            <p class="card-text mb-auto">{{event.desc}}</p>
            <router-link v-bind:to="{name: 'event-detail', params: {id: event.id}}" tag="a" active-class="nav-item">Find out more...</router-link>

          </div>
          <img class="card-img-right flex-auto d-none d-md-block"  v-if="images.length > 0" :src="images[i+1]" alt="Card image cap">
          <img class="card-img-right flex-auto d-none d-md-block" v-if="images.length == 0" src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Ajax_loader_metal_512.gif" alt="Card image cap">
        </div>
    </div>
    <div class="text-center">
      <router-link to="/events/NewEvent" tag="button" class="btn btn-primary my-2" v-if="isLoggedIn">Create an Event!</router-link>
      <router-link to="/events/list" tag="button" class="btn btn-secondary my-2" v-if="isLoggedIn">All Events!</router-link>
    </div>
    </div>
  </div>
</template>

<script>
import db from "../../Firebase/firebaseInit";
import firebase, { functions } from "firebase";
export default {
  data() {
    return {
      events: [],
      images: [],
      isLoggedIn: false
    };
  },
  created() {
    db
      .collection("events")
      .orderBy("event.date")
      .limit(3)
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
          };
          this.events.push(data);
        });
      });
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
/* stylelint-disable selector-list-comma-newline-after */
.blog-header {
  line-height: 1;
  border-bottom: 1px solid #e5e5e5;
}
.blog-header-logo {
  font-size: 2.25rem;
}
.blog-header-logo:hover {
  text-decoration: none;
}
h1,
h2,
h3,
h4,
h5,
h6 {
}
.display-4 {
  font-size: 2.5rem;
}
@media (min-width: 768px) {
  .display-4 {
    font-size: 3rem;
  }
}
.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}
.nav-scroller .nav {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}
.nav-scroller .nav-link {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-size: 0.875rem;
}
.card-img-right {
  height: 100%;
  width: 50%;
  border-radius: 0 3px 3px 0;
}
.flex-auto {
  -ms-flex: 0 0 auto;
  -webkit-box-flex: 0;
  flex: 0 0 auto;
}
.h-250 {
  height: 250px;
}
@media (min-width: 768px) {
  .h-md-250 {
    height: 250px;
  }
}
.border-top {
  border-top: 1px solid #e5e5e5;
}
.border-bottom {
  border-bottom: 1px solid #e5e5e5;
}
.box-shadow {
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.05);
}
/*
   * Blog name and description
   */
.blog-title {
  margin-bottom: 0;
  font-size: 2rem;
  font-weight: 400;
}
.blog-description {
  font-size: 1.1rem;
  color: #999;
}
@media (min-width: 40em) {
  .blog-title {
    font-size: 3.5rem;
  }
}
/* Pagination */
.blog-pagination {
  margin-bottom: 4rem;
}
.blog-pagination > .btn {
  border-radius: 2rem;
}
/*
   * Blog posts
   */
.blog-post {
  margin-bottom: 4rem;
}
.blog-post-title {
  margin-bottom: 0.25rem;
  font-size: 2.5rem;
}
.blog-post-meta {
  margin-bottom: 1.25rem;
  color: #999;
}
/*
   * Footer
   */
.blog-footer {
  padding: 2.5rem 0;
  color: #999;
  text-align: center;
  background-color: #f9f9f9;
  border-top: 0.05rem solid #e5e5e5;
}
.blog-footer p:last-child {
  margin-bottom: 0;
}
</style>