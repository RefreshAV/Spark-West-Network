<template>
  <div id="newEvent" class="container">
    <div class="row my-4">
      <div class="col text-center">
        <h1>Create New Event</h1>
      </div>
    </div>

    <form @submit.prevent="submit">
      <!-- details -->
      <div class="row">
        <div class="col-md-7 col-12 mb-3">
          <div class="card shadow">
            <div class="card-body">
              <!-- Title -->
              <div class="form-group">
                <label for="title">Title</label>
                <input
                  type="text"
                  placeholder="Event Title"
                  id="title"
                  class="form-control"
                  autocomplete="off"
                  v-model="event.title"
                  required
                />
              </div>

              <!-- Date -->
              <div class="form-group">
                <label for="eventDate">Event Date</label>
                <input
                  id="eventDate"
                  type="date"
                  class="form-control"
                  v-model="event.date"
                  required
                />
              </div>

              <!-- Time -->
              <div class="form-group">
                <label for="eventTimeStart">Event Time</label>
                <div class="row">
                  <div class="col-md-6">
                    <input
                      type="time"
                      id="eventTimeStart"
                      class="form-control"
                      autocomplete="off"
                      v-model="start"
                      required
                    />
                  </div>
                  <div class="col-md-6">
                    <input
                      type="time"
                      id="eventTimeEnd"
                      class="form-control"
                      autocomplete="off"
                      v-model="end"
                      required
                    />
                  </div>
                </div>
              </div>

              <!-- Location -->
              <div class="form-group">
                <label for="email">Event Location</label>
                <input
                  type="text"
                  placeholder="Event Location"
                  id="location"
                  class="form-control"
                  autocomplete="off"
                  v-model="locationSearch"
                  required
                />
                <div class="resultsWrapper">
                  <ul class="list-group results">
                    <li
                      v-for="(location,index) in locationResults"
                      :key="location.key"
                      :class="{'list-group-item':true, 'p-2':true, 'list-group-item-action':true, 'top':(index == 0), 'bottom':(index == locationResults.length - 1 || index == 2)}"
                      v-show="index < 3"
                      @click="setLocation(location)"
                    >
                      <i class="fas fa-map-marker-alt text-muted"></i>
                      {{ location.title }}
                      <small>{{ formatedVicinity(location.vicinity) }}</small>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Email -->
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="example@email.com"
                  class="form-control"
                  autocomplete="off"
                  v-model="event.email"
                  required
                />
              </div>

              <div class="form-group">
                <label for="message">Description:</label>
                <br />
                <froala :tag="'textarea'" :config="config" v-model="event.description"></froala>
              </div>
            </div>
          </div>
        </div>

        <!-- Image upload -->
        <div class="col-md col-12 w-100">
          <div class="row mb-2" v-if="image">
            <div class="col d-flex justify-content-center">
              <img class="shadow img-fluid" :src="preImg" alt />
            </div>
          </div>
          <div class="row mb-2" v-if="!image">
            <div class="col">
              <div
                id="placeholder"
                class="col shadow bg-primary d-flex justify-content-center align-items-center text-white"
              >
                <h1>
                  <i>No Image</i>
                </h1>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div id="browse" class="dUp file btn btn-block btn-primary">
                Browse Images
                <input
                  type="file"
                  id="imgUp"
                  class="bUp"
                  accept="image/x-png, image/gif, image/jpeg"
                  @change="loadFile"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <div class="row">
        <div class="col-auto">
          <router-link to="/events/all" class="btn btn-danger btn-lg">Cancel</router-link>
        </div>
        <div class="col-auto">
          <input type="submit" class="btn btn-primary btn-lg" />
        </div>
      </div>
    </form>

    <hr />

    <!-- Modals -->
    <div
      class="modal fade"
      id="sizeWarning"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title" id="exampleModalLabel">Warning:</h1>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-center text-danger">
            <h3>Event size exceeds limit (¬_¬)</h3>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="locationWarning"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title" id="exampleModalLabel">Warning:</h1>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-center text-danger">
            <h3>Invalid event location ¯\(o_o)/¯</h3>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../../Firebase/firebaseInit";
import firebase from "firebase";
import "firebase/firestore";
import toolbarConfig from "../../toolbarConfig"
import pushid from "pushid";
import $ from "jquery";

export default {
  data() {
    return {
      config: toolbarConfig,
      event: {
        title: "",
        date: "",
        time: "",
        email: "",
        description: "",
        imageKey: "",
        UserUID: firebase.auth().currentUser.uid,
        locationName: "",
        location: {
          lat: null,
          lng: null
        }
      },
      isSubmitted: false,
      characters: 500,
      preImg: "http://via.placeholder.com/1920x1080",
      image: "",
      uploaded: false,
      start: null,
      end: null,
      locationSearch: "",
      searchLocation: {
        lat: 0,
        lng: 0
      },
      locationResults: [],
      clearSearch: 0
    };
  },
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: "New Event",
    meta: [
      {
        vmid: "description",
        name: "description",
        content: "Create a new event on Spark West Network"
      }
    ]
  },
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.searchLocation.lat = pos.coords.latitude;
        this.searchLocation.lng = pos.coords.longitude;
      });
    }
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
    end: "time",
    locationSearch: "autoSuggest",
    locationResults: e => {
      if (e.length > 0) {
        document.getElementById("location").classList.add("searchResults");
      } else {
        document.getElementById("location").classList.remove("searchResults");
      }
    }
  },
  methods: {
    autoSuggest() {
      if (this.locationSearch) {
        if (this.clearSearch > 0) {
          this.clearSearch -= 1;
        } else {
          const code = process.env.VUE_APP_HERE_CODE;
          const id = process.env.VUE_APP_HERE_ID;
          const place = this.locationSearch.trim().replace(/\s/g, "+");

          const Http = new XMLHttpRequest();

          const request =
            "https://places.cit.api.here.com/places/v1/discover/search?app_id=" +
            id +
            "&app_code=" +
            code +
            "&at=" +
            this.searchLocation.lat +
            "," +
            this.searchLocation.lng +
            "&q=" +
            place;

          Http.open("GET", request);
          Http.send();

          Http.onreadystatechange = e => {
            if (Http.response) {
              let response = JSON.parse(Http.response);
              this.locationResults = response.results.items;
            } else {
              this.locationResults = [];
            }
          };

          this.event.locationName = "";
          (this.event.location.lat = null), (this.event.location.lng = null);
        }
      } else {
        document.getElementById("location").classList.remove("searchResults");
        this.locationResults = [];
      }
    },
    formatedVicinity: function(vicinity) {
      let res = vicinity.replace("<br/>", " ");
      return res;
    },
    setLocation(loc) {
      this.event.location.lat = loc.position[0];
      this.event.location.lng = loc.position[1];
      this.locationSearch = loc.title;
      this.event.locationName = loc.title;
      this.clearSearch = 1;
      this.locationResults = [];
      document.getElementById("location").classList.remove("searchResults");
    },
    submit() {
      var desc = this.event.description;
      var imgSize = this.image.size;

      if (
        !this.event.locationName ||
        !this.event.location.lat ||
        !this.event.location.lng
      ) {
        $("#locationWarning").modal("toggle");
      } else {
        var key = pushid();
        this.isSubmitted = true;
        this.event.imageKey = key;
        var ref = firebase.storage().ref("events/" + this.event.imageKey);
        var file = this.image;
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
        var d = new Date();
        var year = d.getUTCFullYear();
        var month = d.getUTCMonth();
        var day = d.getUTCDate();
        var date = year + "-" + month + "-" + day;
        db.collection("events")
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
              UserUID: this.event.UserUID,
              locationName: this.event.locationName,
              location: {
                lat: this.event.location.lat,
                lng: this.event.location.lng
              },
              likes: 1,
              likedBy: [firebase.auth().currentUser.uid]
            }
          })
          .then(this.$router.push("/events/all"));
      }
    },
    loadFile: function() {
      var input = document.querySelector(".bUp");
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

#placeholder {
  height: 300px;
  border-radius: 12px;
  background: #009fff; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    115deg,
    #ec2f4b,
    #009fff
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    115deg,
    #ec2f4b,
    #009fff
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.dUp {
  position: relative;
  overflow: hidden;
  cursor: pointer;
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

.btn-lg {
  border-radius: 12px;
}

#browse {
  border-radius: 40px;
}

#preview {
  border-radius: 5px;
  margin-bottom: 10px;
  height: auto;
  width: 100%;
  border-radius: 12px;
}

.img-fluid {
  border-radius: 12px;
}

.card {
  border-radius: 12px;
}

input[type="text"],
input[type="email"],
input[type="date"],
input[type="time"] {
  border-radius: 38px;
}

.searchResults {
  border-radius: 12px !important;
  border-bottom-left-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
  border-bottom: none;
}

.results .top {
  border-radius: 0;
}

.results .bottom {
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}

textarea {
  border-radius: 12px;
  resize: none;
}
</style>
