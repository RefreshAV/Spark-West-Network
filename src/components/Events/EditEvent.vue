<template>
  <div class="container">
    <h1>{{ title }}</h1>

    <form @submit.prevent="saveExit">
      <div class="row">
        <div class="col-md-6">

          <div class="form-group">
            <label for="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Event Title"
              class="form-control"
              autocomplete="off"
              v-model="title"
              required>
          </div>
          <div class="form-group">
            <label for="eventDate">Event Date</label>
            <input
              id="eventDate"
              type="date"
              class="form-control"
              v-model="date"
              required>
          </div>
          <div class="form-group">
            <label for="eventTimeStart">Event Time</label>
            <div class ="row">
              <div class="col-md-6">
                <input
                  type="time"
                  id="eventTimeStart"
                  class="form-control"
                  autocomplete="off"
                  v-model="start"
                  required>
              </div>
              <div class="col-md-6">
                <input
                  type="time"
                  id="eventTimeEnd"
                  class="form-control"
                  autocomplete="off"
                  v-model="end"
                  required>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="email">Event Location</label>
            <GmapAutocomplete
              class="form-control"
              @place_changed="setLocation"
              v-model="locationName"/>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              class="form-control"
              autocomplete="off"
              v-model="email"
              required>
          </div>
          <label for="message">Description</label><br>
          <textarea
            id="message"
            rows="5"
            class="form-control"
            maxlength="500"
            v-model="description"/>
          <p class="counter">Characters: <span class="cNum">{{ characters }}</span></p>
        </div>
        <div class="col-md-6">
          <!-- IMAGE UPLOAD -->
          <img
            id="preview"
            :src="preImg"
            class="d-block mb-2 shadow-sm"
            alt="" >
          <div class="col-xs-12">
            <div class="dUp file btn btn-primary">
              Browse Images
              <input
                type='file'
                id="imgUp"
                class='bUp'
                accept="image/x-png,image/gif,image/jpeg"
                @change="loadFile" >
            </div>
          </div>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <router-link
            :to="{name: 'event-detail', params: {id: id}}"
            class="btn btn-danger">Cancel</router-link>
          <input
            type="submit"
            class="btn btn-primary"
            value="Save & Exit">
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
      preImg:
        "https://upload.wikimedia.org/wikipedia/commons/7/7a/Ajax_loader_metal_512.gif",
      imageKey: null,
      characters: null,
      start: null,
      end: null,
      UID: null,
      submitDate: null,
      locationName: "",
      locationPos: {
        lat: 0,
        lng: 0
      },
      location: null
    };
  },
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: "Edit Event",
    meta: [
      { vmid: 'description', name: 'description', content: 'Edit the details of an event' }
    ]
  },
  metaInfo() {
    if (this.title) {
      return {
        title: this.title
      };
    } else {
      return {
        title: "Edit Event"
      };
    }
  },
  beforeRouteEnter(to, from, next) {
    db.collection("events")
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
            vm.description = doc.data().event.description;
            vm.locationName = doc.data().event.locationName;
            vm.imageKey = doc.data().event.imageKey;
            vm.submitDate = doc.data().event.SubmitDate;
            vm.UID = doc.data().event.UserUID;
          });
        });
      });
  },
  mounted() {
    db.collection("events")
      .where(
        firebase.firestore.FieldPath.documentId(),
        "==",
        this.$route.params.id
      )
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let date = doc.data().event.date;
          this.id = doc.id;
          this.title = doc.data().event.title;
          this.date = date.year + "-" + date.month + "-" + date.day;
          this.time = doc.data().event.time;
          this.email = doc.data().event.email;
          this.desc = doc.data().event.description;
          this.locationName = doc.data().event.locationName;
          this.imageKey = doc.data().event.imageKey;
          this.submitDate = doc.data().event.SubmitDate;
          this.UID = doc.data().event.UserUID;
        });
      });
  },
  watch: {
    id: "fetchImage"
  },
  methods: {
    fetchImage() {
      var ref = firebase.storage().ref("events/" + this.imageKey);
      var that = this;

      ref.getDownloadURL().then(function(url, a) {
        that.preImg = url;
      });

      var time = this.time;
      this.end = time.substring(6);
      this.start = time.substring(0, 5);
    },
    saveExit() {
      if (this.location) {
        this.locationPos.lat = this.location.geometry.location.lat();
        this.locationPos.lng = this.location.geometry.location.lng();
        this.locationName = this.location.formatted_address;
      }
      var start = this.start;
      var end = this.end;

      this.time = start + "-" + end;

      var ref = firebase.storage().ref("events/" + this.imageKey);
      var file = this.image;
      var that = this;

      if (file != null) {
        console.log("Updating file");
        var upload = ref.put(file);

        upload.on(
          "state_changed",
          function progress(snapshot) {
            var percentage =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          function error(err) {},
          function complete() {}
        );
      }

      db.collection("events")
        .where(
          firebase.firestore.FieldPath.documentId(),
          "==",
          this.$route.params.id
        )
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.update({
              event: {
                title: this.title,
                date: {
                  year: this.date.substring(0, 4),
                  month: this.date.substring(5, 7),
                  day: this.date.substring(8)
                },
                time: this.time,
                email: this.email,
                description: this.description,
                imageKey: this.imageKey,
                SubmitDate: this.submitDate,
                UserUID: this.UID,
                locationName: this.locationName,
                location: {
                  lat: this.locationPos.lat,
                  lng: this.locationPos.lng
                }
              }
            });
          });
        })
        .then(that.$router.push("/events/event/" + that.id));
    },
    loadFile: function() {
      var input = document.querySelector(".bUp");

      var imgURL = window.URL.createObjectURL(input.files[0]);

      this.preImg = imgURL;
      this.image = input.files[0];
    },
    setLocation(location) {
      this.location = location;
    }
  }
};
</script>

<style scoped>
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
  border-radius: 5px;
  margin-bottom: 10px;
  height: 300px;
  width: auto;
}
</style>
