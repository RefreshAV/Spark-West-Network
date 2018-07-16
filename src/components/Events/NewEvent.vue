<template>
    <div id="newEvent" class="container">
        <h3>Create New Event</h3>
    <form>
      <div class="row">
        <div class="col-md-6">

          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" id="title" class="form-control" autocomplete="off" v-model="event.title">
          </div>
          <div class="form-group">
            <label for="eventDate">Event Date</label>
            <input id="eventDate" type="text" class="form-control" v-model="event.date">
          </div>
          <div class="form-group">
            <label for="eventTime">Event Time</label>
            <input type="text" id="eventTime" class="form-control" autocomplete="off" v-model="event.time">
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" class="form-control" autocomplete="off" v-model="event.email">
          </div>
          <label for="message">Description</label><br>
          <!-- Interpolation between <textarea>{{ test }}</textarea> doesn't work!-->
          <textarea id="message" rows="5" class="form-control" maxlength="500" v-model="event.description"></textarea>
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
          <router-link to="/events/list" class="btn btn-danger">Cancle</router-link>
          <button type="button" class="btn btn-info" @click="saveExit">
              Save & Exit
            </button>
          <button class="btn btn-primary" @click.prevent="submit">
              Submit!
            </button>
        </div>
      </div>
    </form>
    <hr>
    </div>
</template>

<script>
import db from "../../Firebase/firebaseInit";
import firebase from 'firebase'
import 'firebase/firestore'
import pushid from 'pushid'
export default {
  data() {
    return {
      event: {
        title: "",
        date: "",
        time: "",
        email: "",
        description: "",
        imageKey: ""
      },
      isSubmitted: false,
      characters: 500,
      preImg: "http://via.placeholder.com/300x300",
      image: "",
      uploaded: false
    };
  },
  computed: {
    message() {
      return this.event.description;
    }
  },
  watch: {
    message() {
      var char = this.event.description.length;
      var maxChar = 500;
      this.characters = maxChar - char;
    }
  },
  methods: {
    submit() {
      var key = pushid();
      this.isSubmitted = true;
      this.event.imageKey = key;

      var ref = firebase.storage().ref("events/" + this.event.imageKey);
      var file = this.image;

      var upload = ref.put(file);
      var uploaded = false;

      upload.on(
        "state_changed",
        function progress(snapshot) {
          var percentage =
            snapshot.bytesTransferred / snapshot.totalBytes * 100;
        },
        function error(err) {},
        function complete() {}
      );

      db.collection("events").add({
        event: {
          title: this.event.title,
          date: this.event.date,
          time: this.event.time,
          email: this.event.email,
          description: this.event.description,
          isSubmitted: this.isSubmitted,
          imageKey: this.event.imageKey
        }
      }).then(this.$router.push('/events/list'))
    },
    saveExit() {
      var key = pushid();
      this.isSubmitted = false;
      this.event.imageKey = key;
      db
        .collection("events")
        .add({
          event: {
            title: this.event.title,
            date: this.event.date,
            time: this.event.time,
            email: this.event.email,
            description: this.event.description,
            isSubmitted: this.isSubmitted,
            imageKey: this.event.imageKey
          }
        })
        .then(this.$router.push("/events/list"));
    },
    loadFile: function() {
      var input = document.querySelector(".bUp");
      var preview = document.querySelector("#preview");

      var imgURL = window.URL.createObjectURL(input.files[0]);
      this.preImg = imgURL;
      this.image = input.files[0];
    }
  }
};
</script>

<style>
#preImg {
  width: 500px;
  height: 500px;
  border: 5px, black, solid;
}

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
  border: 5px;
  border-radius: 5px;
  margin-bottom: 10px;
  height: 300px;
}
</style>


