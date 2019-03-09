<template>
  <div class="container mt-3">
    <div id="event" v-if="id != null">
      <div class="row">
        <div class="col">
          <router-link
            :to="{name: 'userDetail', params: {id: author.id}}"
            class="media btn btn-light mb-3"
          >
            <img class="align-self-center mr-3" :src="author.img" alt="Generic placeholder image">
            <div class="media-body">
              <h5 class="mb-0">{{ author.name }}</h5>
              <p class="mb-0 text-muted">{{ author.email }}</p>
              <span class="badge badge-primary">
                <i class="fa fa-user"/> n Followers
              </span>
            </div>
          </router-link>
        </div>
      </div>
      <div class="row">
        <div class="col align-middle">
          <img id="eventImg" :src="image" alt="event image" class="rounded img-fluid">
        </div>
        <div class="col">
          <h1>{{ title }}</h1>
          <div class="row">
            <div class="col-auto">
              <h3 class="text-muted">{{ date.year }}-{{ date.month }}-{{ date.day }}</h3>
              <h4>
                <span class="badge badge-secondary">{{ time }}</span>
              </h4>
            </div>
            <div class="col">
              <div id="like" class="btn badge badge-pill border-0 text-danger" @click="likeEvent">
                <span>
                  <i class="fa fa-heart"/>
                  {{ likes }}
                </span>
              </div>
            </div>
          </div>
          <hr>
          <h5>Description:</h5>
          <p>{{ desc }}</p>
          <h5>Location:</h5>
          <p class="lead">
            {{ locationName }}
            <br>
            <i>
              <a :href="'https://maps.google.com/?q=' + locationName">Get directions</a>
            </i>
          </p>
          <span class="badge badge-primary">
            <i class="fa fa-user"/>
            {{ attendees }} People Attending
          </span>
        </div>
      </div>
    </div>
    <hr>
    <div class="btn-group">
      <router-link class="btn btn-secondary" to="/events/list">Back</router-link>
      <router-link
        :to="{name: 'EditEvent', params: {id: id}}"
        class="btn btn-primary"
        v-if="isAuthenticated || isAdmin"
      >Edit</router-link>
      <button
        @click="deleteEvent"
        class="btn btn-danger"
        v-if="isAuthenticated || isAdmin"
      >Delete</button>
    </div>
    <hr>
    <app-comments class="mb-3"/>
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
      location: null,
      locationName: null,
      author: {
        name: null,
        email: null,
        img: null,
        id: null
      },
      liked: false,
      likes: 0,
      likedBy: [],
      attending: false,
      attendees: Math.floor(Math.random() * 100),
      peopleAttending: [],
      isAuthenticated: false,
      isAdmin: false
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
            vm.desc = doc.data().event.description;
            vm.imageKey = doc.data().event.imageKey;
            vm.submitDate = doc.data().event.SubmitDate;
            vm.UserUID = doc.data().event.UserUID;
            vm.likes = doc.data().likes;
            vm.likedBy = doc.data().likedBy;
          });
        });
      });
  },
  mounted() {
    var that = this;

    if (
      firebase.auth().currentUser.uid == "KwDaa9UdSAe8Jnn8biRTr0rcRlk2"
    ) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
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
        });
      })
      .then(function() {
        var button = document.getElementById("like");
        if (that.likedBy.includes(firebase.auth().currentUser.uid)) {
          that.liked = true;
          button.classList.add("liked", "animated", "heartBeat");
        } else {
          that.liked = false;
          button.classList.add("notLiked");
        }
      });
  },
  updated() {
    if (firebase.auth().currentUser.uid == this.UserUID) {
      this.isAuthenticated = true;
    }
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
            this.author.name = doc.data().user.name;
            this.author.img = doc.data().user.photo;
            this.author.email = doc.data().user.email;
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
  },
  components: {
    "app-comments": Comments
  }
};
</script>

<style scoped>
#eventImg {
  box-shadow: 0px 0px 5px grey;
}

.media img {
  max-width: 84px;
  max-height: 84px;
  border-radius: 100%;
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
  background-image: linear-gradient(to left, #ff0844 0%, #ffb199 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: red;
}
</style>
