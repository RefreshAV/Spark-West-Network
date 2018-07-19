<template>
    <div id="newEvent" class="container">
        <h3>Create New Event</h3>
    <form @submit.prevent="submit">
      <div class="row">
        <div class="col-md-6">

          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" placeholder="Event Title" id="title" class="form-control" autocomplete="off" v-model="event.title" required>
          </div>
          <div class="form-group">
            <label for="eventDate">Event Date</label>
            <input id="eventDate" type="date" class="form-control" v-model="event.date" required>
          </div>
          <div class="form-group">
            <label for="eventTime">Event Time <small class="badge badge-pill badge-warning">24 hour</small></label>
            <div class ="row">
            <div class="col-md-6">
              <input type="time" id="eventTime" class="form-control" autocomplete="off" v-model="start" required>
            </div>
            <div class="col-md-6">
              <input type="time" id="eventTime" class="form-control" autocomplete="off" v-model="end" required>
            </div>
            </div>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="example@email.com" class="form-control" autocomplete="off" v-model="event.email" required>
          </div>
          <label for="message">Description</label><br>
          <!-- Interpolation between <textarea>{{ test }}</textarea> doesn't work!-->
          <textarea id="message" placeholder="A description of your event..." rows="5" class="form-control" maxlength="500" v-model="event.description"></textarea>
          <p class="counter">Characters: <span class="cNum">{{ characters }}</span></p>
        </div>
        <div class="col-md-6">

          <!-- IMAGE UPLOAD -->
          <img id="preview" class="d-block mb-2 shadow-sm" v-bind:src="preImg" alt="" />
          <div class="col-xs-12">
            <div class="dUp file btn btn-primary">
              Browse Images
              <input type='file' id="imgUp" class='bUp' accept="image/x-png,image/gif,image/jpeg" @change="loadFile" required/>
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
          <input type="submit" class="btn btn-primary">
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
import pushid from "pushid";
export default {
  data() {
    return {
      event: {
        title: "",
        date: "",
        time: "",
        email: "",
        description: "",
        imageKey: "",
        UserUID: firebase.auth().currentUser.uid
      },
      isSubmitted: false,
      characters: 500,
      preImg: "http://via.placeholder.com/300x300",
      image: "",
      uploaded: false,
      start: null,
      end: null
    };
  },
  mounted() {
    var d = new Date();
    var year = d.getUTCFullYear();
    var month = d.getUTCMonth();
    var day = d.getUTCDay();

    var date = year + "-" + month + "-" + day;
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
    },
    end: "time"
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

      var d = new Date();
      var year = d.getUTCFullYear();
      var month = d.getUTCMonth();
      var day = d.getUTCDay();

      var date = year + "-" + month + "-" + day;

      db
        .collection("events")
        .add({
          event: {
            title: this.event.title,
            date: {
              year: this.event.date.substring(0, 4),
              month: this.event.date.substring(5, 7),
              day: this.event.date.substring(8)
            },
            time: this.event.time,
            email: this.event.email,
            description: this.event.description,
            isSubmitted: this.isSubmitted,
            SubmitDate: date,
            imageKey: this.event.imageKey,
            UserUID: this.event.UserUID
          }
        })
        .then(this.$router.push("/events/list"));
    },
    saveExit() {
      var key = pushid();
      this.isSubmitted = false;
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

      var d = new Date();
      var year = d.getUTCFullYear();
      var month = d.getUTCMonth();
      var day = d.getUTCDay();

      var date = year + "-" + month + "-" + day;

      db
        .collection("events")
        .add({
          event: {
            title: this.event.title,
            date: {
              year: this.event.date.substring(0, 4),
              month: this.event.date.substring(5, 7),
              day: this.event.date.substring(8)
            },
            time: this.event.time,
            email: this.event.email,
            description: this.event.description,
            isSubmitted: this.isSubmitted,
            SubmitDate: date,
            imageKey: this.event.imageKey,
            UserUID: this.event.UserUID
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
    },
    time() {
      var start = this.start;
      var end = this.end;

      this.event.time = start + "-" + end;
    }
  }
};
</script>

<style scoped>
textarea {
  resize: none;
}
input :invalid {
  background-color: red;
}

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


