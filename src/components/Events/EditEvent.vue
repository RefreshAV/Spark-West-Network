<template>
    <div class="container">
        <h1>{{title}}</h1>

        <form>
      <div class="row">
        <div class="col-md-6">

          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" id="title" class="form-control" autocomplete="off" v-model="title">
          </div>
          <div class="form-group">
            <label for="eventDate">Event Date</label>
            <input id="eventDate" type="text" class="form-control" v-model="date">
          </div>
          <div class="form-group">
            <label for="eventTime">Event Time</label>
            <input type="text" id="eventTime" class="form-control" autocomplete="off" v-model="time">
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" class="form-control" autocomplete="off" v-model="email">
          </div>
          <label for="message">Description</label><br>
          <!-- Interpolation between <textarea>{{ test }}</textarea> doesn't work!-->
          <textarea id="message" rows="5" class="form-control" maxlength="500" v-model="description"></textarea>
          <p class="counter">Characters: <span class="cNum">{{ characters }}</span></p>
        </div>
        <div class="col-md-6">

          <!-- IMAGE UPLOAD -->
          <img id="preview" v-bind:src="preImg" alt="" />
          <div class="col-xs-12">
            <div class="dUp file btn btn-primary">
              Browse Images
              <input type='file' id="imgUp" class='bUp' accept="image/x-png,image/gif,image/jpeg" @change="loadFile" />
            </div>
          </div>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <router-link v-bind:to="{name: 'event-detail', params: {id: id}}" class="btn btn-danger">Cancle</router-link>
          <button type="button" class="btn btn-info" @click="saveExit">
              Save & Exit
            </button>
        </div>
      </div>
    </form>
    <hr>
    </div>
</template>

<script>
import db from "../../Firebase/firebaseInit";
import firebase from "firebase";
import "firebase/firestore";
export default {
  data() {
    return {
      id: null,
      title: null,
      date: null,
      time: null,
      email: null,
      description: null,
      image: null,
      preImg: "http://via.placeholder.com/300x300",
      characters: null
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
            console.log(doc.data());
            vm.id = doc.id;
            vm.title = doc.data().event.title;
            vm.date = doc.data().event.date;
            vm.time = doc.data().event.time;
            vm.email = doc.data().event.email;
            vm.description = doc.data().event.description;
          });
        });
      });
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
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
            console.log(doc.data());
            (this.id = doc.id),
              (this.title = doc.data().event.title),
              (this.date = doc.data().event.date),
              (this.time = doc.data().event.time),
              (this.email = doc.data().event.email),
              (this.description = doc.data().event.description);
          });
        });
    },
    saveExit() {
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
            console.log(doc.data());
            doc.ref.update({
              event: {
                id: this.id,
                title: this.title,
                date: this.date,
                time: this.time,
                email: this.email,
                description: this.description
              }
            });
          });
        });
    },
    loadFile: function() {
      var input = document.querySelector(".bUp");
      var preview = document.querySelector("#preview");

      var imgURL = window.URL.createObjectURL(input.files[0]);

      console.log("File uploaded");
      this.preImg = imgURL;
      this.image = input.files[0];
    }
  }
};
</script>

<style>
.dUp {
  position: relative;
  overflow: hidden;
}

.bUp {
  position: absolute;
  font-size: 50px;
  opacity: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.c .imgUp {
  margin-top: 20px;
  margin-left: 5px;
  margin-bottom: 5px;
  font-size: 15px;
}

#preview {
  border: 5px #383c42 solid;
  border-radius: 5px;
  margin-bottom: 10px;
  height: 300px;
}
</style>
