<template>
  <div class="container h-100 mt-3">
    <div v-if="event">
      <div id="event" v-if="id != null">
        <div class="row">
          <div class="col">
            <router-link
              v-if="author.id"
              :to="{name: 'userDetail', params: {id: author.id}}"
              class="media p-2 btn btn-light mb-3 shadow-sm border"
            >
              <img
                id="author"
                class="align-self-center mr-3"
                :src="author.img"
                alt="Generic placeholder image"
              />
              <div class="media-body">
                <h5 class="mb-0">{{ author.name }}</h5>
                <div class="row">
                  <div class="col">
                    <span class="badge badge-primary">
                      <i class="fa fa-user" /> n Followers
                    </span>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <span class="badge badge-pill badge-info">
                      <i class="fa fa-calendar" />
                      {{ author.events }}
                    </span>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-sm-12 mb-3">
            <img id="eventImg" :src="image" alt="event image" class="w-100" />
          </div>
          <div class="col-md-6 col-sm-12">
            <div class="card shadow">
              <div class="card-body">
                <h1>{{ title }}</h1>
                <div class="row">
                  <div class="col-auto">
                    <h3 class="text-muted">{{ date.year }}-{{ date.month }}-{{ date.day }}</h3>
                    <h4>
                      <span class="badge badge-secondary">{{ time }}</span>
                    </h4>
                  </div>
                  <div class="col">
                    <button
                      id="like"
                      class="btn badge badge-pill border-0 text-danger"
                      @click="likeEvent"
                      :disabled="!isLoggedIn"
                    >
                      <span>
                        <i class="fa fa-heart" />
                        {{ likes }}
                      </span>
                    </button>
                  </div>
                </div>
                <hr />
                <h5>Description:</h5>
                <p>{{ desc }}</p>
                <h5>Location:</h5>
                <p class="lead">
                  {{ locationName }}
                  <br />
                  <i>
                    <a :href="'https://maps.google.com/?q=' + locationName">Get directions</a>
                  </i>
                </p>
                <span class="badge badge-primary">
                  <i class="fa fa-user" />
                  {{ attendees }} People Attending
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="btn-group">
        <router-link class="btn btn-secondary" to="/events/list">Back</router-link>
        <router-link
          :to="{name: 'EditEvent', params: {id: id}}"
          class="btn btn-primary"
          v-if="isAuthor || isAdmin && id"
        >Edit</router-link>
        <button @click="deleteEvent" class="btn btn-danger" v-if="isAuthor || isAdmin && id">Delete</button>
      </div>
      <hr />
      <app-comments class="mb-3" />
    </div>
    <div v-else id="no-event" class="animated shake" style="aanimation-delay: 0.5s;">
      <h1>No event found :(</h1>
      <router-link to="/events" class="btn btn-outline-info rounded-pill">Go back to events</router-link>
    </div>
  </div>
</template>

<script>
import db from "../../Firebase/firebaseInit";
import firebase from "firebase";
import "firebase/firestore";
import Comments from "./EventComments.vue";

export default {
  name: "EventDetail",
  data() {
    return {
      id: null,
      title: "Event",
      date: null,
      time: null,
      email: null,
      desc: null,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/7/7a/Ajax_loader_metal_512.gif",
      imageKey: null,
      submitDate: "not found",
      UserUID: null,
      location: null,
      locationName: null,
      author: {
        name: null,
        email: null,
        img: null,
        id: null,
        uid: null,
        events: 0
      },
      liked: false,
      likes: 0,
      likedBy: [],
      attending: false,
      attendees: Math.floor(Math.random() * 100),
      peopleAttending: [],
      isAuthor: false,
      isAdmin: false,
      isLoggedIn: false,
      event: true
    };
  },
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: "Event",
    meta: [
      {
        vmid: "description",
        name: "description",
        content: "An event on Spark West Network"
      }
    ]
  },
  metaInfo() {
    return {
      title: this.title
    };
  },
  mounted() {
    var that = this;

    if (
      firebase.auth().currentUser &&
      firebase.auth().currentUser.uid == "KwDaa9UdSAe8Jnn8biRTr0rcRlk2"
    ) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }

    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

    db.collection("events")
      .where(
        firebase.firestore.FieldPath.documentId(),
        "==",
        this.$route.params.id
      )
      .get()
      .then(querySnapshot => {
        if (!querySnapshot.empty) {
          querySnapshot.forEach(doc => {
            (this.id = doc.id),
              (this.title = doc.data().event.title),
              (this.date = doc.data().event.date),
              (this.time = doc.data().event.time),
              (this.email = doc.data().event.email),
              (this.desc = doc.data().event.description),
              (this.imageKey = doc.data().event.imageKey),
              (this.submitDate = doc.data().event.SubmitDate),
              (this.UserUID = doc.data().event.UserUID),
              (this.likes = doc.data().likes),
              (this.likedBy = doc.data().likedBy),
              (this.location = doc.data().event.location),
              (this.locationName = doc.data().event.locationName);
            this.event = true;
          });
        } else {
          this.event = false;
        }
      })
      .then(function() {
        var button = document.getElementById("like");
        if (
          firebase.auth().currentUser &&
          that.likedBy.includes(firebase.auth().currentUser.uid)
        ) {
          that.liked = true;
          button.classList.add("liked", "animated", "heartBeat");
        } else {
          that.liked = false;
          button.classList.add("notLiked");
        }
      });
  },
  watch: {
    title: "fetchImage",
    UserUID: "getAuthor",
    liked: function() {
      var button = document.getElementById("like");

      if (this.liked) {
        button.classList.remove("notLiked");
        button.classList.add("liked", "animated", "heartBeat");
      } else {
        button.classList.remove("liked", "animated", "heartBeat");
        button.classList.add("notLiked");
      }
    }
  },
  methods: {
    fetchImage() {
      var ref = firebase.storage().ref("events/" + this.imageKey);
      var that = this;

      ref.getDownloadURL().then(function(url) {
        that.image = url;
      });
    },
    getAuthor() {
      db.collection("users")
        .where("user.UserUID", "==", this.UserUID)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.author.id = doc.id;
            this.author.uid = doc.data().user.UserUID;
            this.author.name = doc.data().user.name;
            this.author.img = doc.data().user.photo;
            this.author.email = doc.data().user.email;
          });

          if (
            firebase.auth().currentUser &&
            firebase.auth().currentUser.uid == this.author.uid
          ) {
            this.isAuthor = true;
          } else {
            this.isAuthor = false;
          }
        })
        .then(() => {
          db.collection("events")
            .where("event.UserUID", "==", this.author.uid)
            .get()
            .then(querySnapshot => {
              this.author.events = querySnapshot.size;
            });
        });
    },
    deleteEvent() {
      if (confirm("Are you sure?")) {
        var ref = firebase.storage().ref("events/" + this.imageKey);
        ref.delete();

        db.collection("events")
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
      // Add join Event logic here
    },
    likeEvent() {
      if (firebase.auth().currentUser) {
        if (this.likedBy == null) {
          this.likedBy = [];
        }
        if (this.likes == null) {
          this.likes = 0;
        }

        if (this.liked) {
          // remove like
          this.liked = false;
          this.likes--;

          var remove = this.likedBy.filter(
            uid => uid !== firebase.auth().currentUser.uid
          );
          this.likedBy = remove;

          db.collection("events")
            .doc(this.id)
            .update({
              likes: this.likes,
              likedBy: this.likedBy
            });
        } else {
          // add like
          this.liked = true;
          this.likes++;
          this.likedBy.push(firebase.auth().currentUser.uid);

          db.collection("events")
            .doc(this.id)
            .update({
              likes: this.likes,
              likedBy: this.likedBy
            });
        }
      }
    }
  },
  components: {
    "app-comments": Comments
  }
};
</script>

<style scoped>
#eventImg {
  box-shadow: 0px 0px 5px grey;
  border-radius: 12px;
}

.card {
  border-radius: 12px;
}

.media img {
  max-width: 84px;
  max-height: 84px;
  border-radius: 12px;
}

.media {
  border-radius: 12px;
}

#like {
  font-size: 20px;
  box-shadow: 0px 0px 2px grey;
}

.liked {
  background-image: linear-gradient(to right, #ff0844 0%, #ffb199 100%);
  color: white;
}

.notLiked {
  color: white;
}

.liked span {
  color: white;
}

.notLiked span {
  color: #ff0844;
}

#no-event {
  text-align: center;
  margin-top: calc(50vh - 220px);
}

#no-event h1 {
  font-size: 4em;
  background: -webkit-linear-gradient(
    45deg,
    #2ab7ca,
    #fd4260,
    #fed766
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    45deg,
    #2ab7ca,
    #fd4260,
    #fed766
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  -webkit-background-clip: text;
  background-clip: text;
  background-position: center;
  background-size: 200%;
  color: transparent;
  -webkit-text-fill-color: transparent;
  -webkit-animation: scroll 20s ease infinite;
  -moz-animation: scroll 20s ease infinite;
  animation: scroll 20s ease infinite;
}

@-webkit-keyframes scroll {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@-moz-keyframes scroll {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@keyframes scroll {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@media (max-width: 500px) {
  #no-event h1 {
    font-size: 2em;
  }
}
</style>
