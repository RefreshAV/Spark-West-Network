<template>
  <div class="container">
    <h1>{{title}}</h1>
    <h3>{{date}}</h3>
    <p>{{time}}</p>
    <img :src="image" id="eventImg" class="img-thumbnail">
    <hr>
    <router-link class="btn btn-secondary" to="/events/list">Back</router-link>
    <button @click="deleteEvent" class="btn btn-danger">Delete</button>
    <router-link v-bind:to="{name: 'EditEvent', params: {id: id}}" class="btn btn-primary">Edit</router-link>
    <hr>
  </div>

</template>

<script>
import db from "../../Firebase/firebaseInit";
import firebase, { functions } from "firebase";
import "firebase/firestore";
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
      image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Ajax_loader_metal_512.gif',
      imageKey: null,
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
            (this.imageKey = doc.data().event.imageKey);
        });
      });
  },
  watch: {
    title: "fetchImage"
  },
  methods: {
    fetchImage() {
      var ref = firebase.storage().ref("events/" + this.imageKey)
      var that = this;

      var fetch = ref.getDownloadURL().then(function(url) {
        that.image = url
      });
    },
    deleteEvent() {
      if (confirm("Are you sure?")) {
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
  }
};
</script>

<style>
img {
  width: 300px;
  height: 300px;
  border: 5px, black, solid;
}
</style>

