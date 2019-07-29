<template>
  <div class="container">
    <div class="row my-4">
      <div class="col text-center">
        <h1>Editing: {{ title }}</h1>
      </div>
    </div>

    <div class="row">
      <!-- Info -->
      <div class="col-md col-sm-12 mb-3">
        <div class="card border-0 shadow">
          <div class="card-body">
            <!-- Title -->
            <div class="form-group">
              <label class="font-weight-bold" for="title">Title:</label>
              <input
                type="text"
                id="title"
                placeholder="Event Title"
                class="form-control"
                autocomplete="off"
                v-model="title"
                required
              >
            </div>

            <!-- Date -->
            <div class="form-group">
              <label class="font-weight-bold" for="eventDate">Event Date:</label>
              <input id="eventDate" type="date" class="form-control" v-model="date" required>
            </div>

            <!-- Time -->
            <div class="form-group">
              <label class="font-weight-bold" for="eventTimeStart">Event Time:</label>
              <div class="row">
                <div class="col">
                  <input
                    type="time"
                    id="eventTimeStart"
                    class="form-control"
                    autocomplete="off"
                    v-model="start"
                    required
                  >
                </div>
                <div class="col">
                  <input
                    type="time"
                    id="eventTimeEnd"
                    class="form-control"
                    autocomplete="off"
                    v-model="end"
                    required
                  >
                </div>
              </div>
            </div>

            <!-- Location (IP) -->
            <div class="form-group">
              <label class="font-weight-bold" for="email">Event Location:</label>
              <GmapAutocomplete
                id="location"
                class="form-control"
                @place_changed="setLocation"
                v-model="locationName"
              />
            </div>

            <!-- Contact (IP) -->
            <div class="form-group">
              <label class="font-weight-bold" for="email">Email:</label>
              <input
                type="email"
                id="email"
                class="form-control"
                autocomplete="off"
                v-model="email"
                required
              >
            </div>

            <!-- Description (IP) -->
            <div class="form-group">
              <label class="font-weight-bold" for="message">Description:</label>
              <br>
              <textarea
                id="message"
                rows="5"
                class="form-control mb-2"
                maxlength="500"
                v-model="description"
              />
              <i class="counter">
                Characters:
                <span class="cNum">{{ characters }}</span>
              </i>
            </div>
          </div>
        </div>
      </div>

      <!-- Images -->
      <div class="col-md col-sm-12 w-100">
        <div class="row mb-2">
          <div class="col">
            <div
              class="w-100 d-flex justify-content-center align-items-center"
              v-if="!preImg"
              style="height:300px"
            >
              <div
                class="spinner-border text-primary"
                style="width: 5rem; height: 5rem;"
                role="status"
              >
                <span class="sr-only">Loading...</span>
              </div>
            </div>
            <img
              id="preview"
              v-if="preImg"
              :src="preImg"
              class="d-block mb-2 shadow"
              height="300"
              width="100%"
              alt
            >
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="dUp file btn btn-block btn-primary">
              Browse Images
              <input
                type="file"
                id="imgUp"
                class="bUp"
                accept="image/x-png, image/gif, image/jpeg"
                @change="loadFile"
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <hr>

    <div class="row">
      <div class="col">
        <div class="btn-group">
          <router-link :to="{name: 'event-detail', params: {id: id}}" class="btn btn-danger">Cancel</router-link>
          <button
            type="submit"
            class="btn btn-primary"
            @click="saveExit()"
            value="Save & Exit"
          >Save & Exit</button>
        </div>
      </div>
    </div>

    <hr>
  </div>
</template>

<script>
import db from '../../Firebase/firebaseInit'
import firebase from 'firebase'
import 'firebase/firestore'
export default {
  data () {
    return {
      id: null,
      title: null,
      date: null,
      time: null,
      email: null,
      description: null,
      image: null,
      preImg: null,
      imageKey: null,
      characters: null,
      start: null,
      end: null,
      UID: null,
      submitDate: null,
      locationName: '',
      locationPos: {
        lat: 0,
        lng: 0
      },
      location: null
    }
  },
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: 'Edit Event',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Edit the details of an event'
      }
    ]
  },
  metaInfo () {
    if (this.title) {
      return {
        title: this.title
      }
    } else {
      return {
        title: 'Edit Event'
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    db.collection('events')
      .where(firebase.firestore.FieldPath.documentId(), '==', to.params.id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.id = doc.id
            vm.title = doc.data().event.title
            vm.date = doc.data().event.date
            vm.time = doc.data().event.time
            vm.email = doc.data().event.email
            vm.description = doc.data().event.description
            vm.locationName = doc.data().event.locationName
            vm.imageKey = doc.data().event.imageKey
            vm.submitDate = doc.data().event.SubmitDate
            vm.UID = doc.data().event.UserUID
          })
        })
      })
  },
  mounted () {
    db.collection('events')
      .where(
        firebase.firestore.FieldPath.documentId(),
        '==',
        this.$route.params.id
      )
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let date = doc.data().event.date
          this.id = doc.id
          this.title = doc.data().event.title
          this.date = date.year + '-' + date.month + '-' + date.day
          this.time = doc.data().event.time
          this.email = doc.data().event.email
          this.desc = doc.data().event.description
          this.locationName = doc.data().event.locationName
          this.imageKey = doc.data().event.imageKey
          this.submitDate = doc.data().event.SubmitDate
          this.UID = doc.data().event.UserUID
        })
      })
  },
  watch: {
    id: 'fetchImage',
    description: 'getChars'
  },
  methods: {
    getChars () {
      this.characters = this.description.length
    },
    fetchImage () {
      var ref = firebase.storage().ref('events/' + this.imageKey)
      var that = this

      ref.getDownloadURL().then(function (url, a) {
        that.preImg = url
      })

      var time = this.time
      this.end = time.substring(6)
      this.start = time.substring(0, 5)
    },
    saveExit () {
      if (this.location) {
        this.locationPos.lat = this.location.geometry.location.lat()
        this.locationPos.lng = this.location.geometry.location.lng()
        this.locationName = this.location.formatted_address
      }
      var start = this.start
      var end = this.end

      this.time = start + '-' + end

      var ref = firebase.storage().ref('events/' + this.imageKey)
      var file = this.image
      var that = this

      if (file != null) {
        console.log('Updating file')
        var upload = ref.put(file)

        upload.on(
          'state_changed',
          function progress (snapshot) {
            var percentage =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          },
          function error (err) {},
          function complete () {}
        )
      }

      db.collection('events')
        .where(
          firebase.firestore.FieldPath.documentId(),
          '==',
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
            })
          })
        })
        .then(that.$router.push('/events/event/' + that.id))
    },
    loadFile: function () {
      var input = document.querySelector('.bUp')

      var imgURL = window.URL.createObjectURL(input.files[0])

      this.preImg = imgURL
      this.image = input.files[0]
    },
    setLocation (location) {
      this.location = location
    }
  }
}
</script>

<style scoped>
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

#preview {
  border-radius: 5px;
  margin-bottom: 10px;
  height: auto;
  width: 100%;
  border-radius: 12px;
}

.card {
  border-radius: 12px;
}

input[type="text"],
input[type="email"],
input[type="date"],
input[type="time"],
#location {
  border-radius: 38px;
}

textarea {
  border-radius: 12px;
  resize: none;
}
</style>
