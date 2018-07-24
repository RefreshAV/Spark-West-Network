<template>
  <div class="container mt-3">
    <div>
      <div class="row">
        <h1>{{title}}</h1>
      </div>
      <div class="row">
        <h3 v-if="date != null">{{date.year}}-{{date.month}}-{{date.day}}</h3>
      </div>
      <div class="row">
        <h5>{{time}}</h5>
      </div>
      <div class="row">
        <router-link to="/" class="media btn btn-light mb-3">
          <img class="align-self-center mr-3" :src="author.img" alt="Generic placeholder image">
          <div class="media-body">
            <h5 class="mb-0">{{author.name}}</h5>
            <p class="mb-0 text-muted">{{author.email}}</p>
            <span class="badge badge-primary"><i class="fa fa-user"></i> n Followers</span>
          </div>
        </router-link>
  
      </div>
      <div class="row">
        <img :src="image" id="eventImg" class="img-thumbnail">
      </div>
      <div class="row">
        <small>Submitted: {{submitDate}}</small>
      </div>
    </div>
    <hr>
    <router-link class="btn btn-secondary" to="/events/list">Back</router-link>
    <button @click="deleteEvent" class="btn btn-danger" v-if="isAuthenticated">Delete</button>
    <router-link v-bind:to="{name: 'EditEvent', params: {id: id}}" class="btn btn-primary" v-if="isAuthenticated">Edit</router-link>
    <hr>
    <app-comments></app-comments>
  </div>

</template>

<script>
import db from "../../Firebase/firebaseInit";
import firebase, { functions } from "firebase";
import "firebase/firestore";
import Comments from "./EventComments.vue";
export default {
  name: "event-detail",
  data() {
    return {
      id: null,
      title: null,
      date: null,
      time: null,
      email: null,
      desc: null,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/7/7a/Ajax_loader_metal_512.gif",
      imageKey: null,
      submitDate: "not found",
      UserUID: null,
      author: {
        name: null,
        email: null,
        img: null,
        id: null
      },
      isAuthenticated: false
    };
  },
  beforeRouteEnter(to, from, next) {
    db
      .collection("events")
      .where(firebase.firestore.FieldPath.documentId(), "==", to.params.id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.id = doc.id;
            vm.title = doc.data().event.title;
            vm.date = doc.data().event.date;
            vm.time = doc.data().event.time;
            vm.email = doc.data().event.email;
            vm.desc = doc.data().event.description;
            vm.imageKey = doc.data().event.imageKey;
            vm.submitDate = doc.data().event.SubmitDate;
            vm.UserUID = doc.data().event.UserUID;
          });
        });
      });
  },
  mounted() {
    var ref;

    db
      .collection("events")
      .where(
        firebase.firestore.FieldPath.documentId(),
        "==",
        this.$route.params.id
      )
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          (this.id = doc.id),
            (this.title = doc.data().event.title),
            (this.date = doc.data().event.date),
            (this.time = doc.data().event.time),
            (this.email = doc.data().event.email),
            (this.desc = doc.data().event.description),
            (this.imageKey = doc.data().event.imageKey),
            (this.submitDate = doc.data().event.SubmitDate),
            (this.UserUID = doc.data().event.UserUID);
        });
      });
  },
  updated() {
    if (firebase.auth().currentUser.uid == this.UserUID) {
      this.isAuthenticated = true;
    }
  },
  watch: {
    title: "fetchImage",
    UserUID: "getAuthor"
  },
  methods: {
    fetchImage() {
      var ref = firebase.storage().ref("events/" + this.imageKey);
      var that = this;

      var fetch = ref.getDownloadURL().then(function(url) {
        that.image = url;
      });
    },
    getAuthor() {
      db
        .collection("users")
        .where("user.UserUID", "==", this.UserUID)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.author.id = doc.id
            this.author.name = doc.data().user.name
            this.author.img = doc.data().user.photo
            this.author.email = doc.data().user.email
          })
        });
    },
    deleteEvent() {
      if (confirm("Are you sure?")) {
        var ref = firebase.storage().ref("events/" + this.imageKey);
        ref.delete();

        db
          .collection("events")
          .where(
            firebase.firestore.FieldPath.documentId(),
            "==",
            this.$route.params.id
          )
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.delete();
              this.$router.push("/events/list");
            });
          });
      }
    }
  },
  components: {
    "app-comments": Comments
  }
};
</script>

<style scoped>
img {
  width: auto;
  height: 300px;
  border: 5px, black, solid;
}

.media img {
  max-width: 84px;
  max-height: 84px;
  border-radius: 100%;
}
</style>

