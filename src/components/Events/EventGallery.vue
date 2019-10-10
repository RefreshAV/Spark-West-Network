<template>
  <div class="container">
    <img src="../../assets/socialStripe.svg" class="stripe" />
    <h1 class="my-4 text-center display-3">Gallery</h1>
    <div class="row">
      <div v-for="event in events" :key="event.id" class="col-lg-4 col-md-6 col-sm-12 mb-3">
        <a href @click.prevent="modal(event)" class="card bg-light shadow thumbnail w-100">
          <img v-lazy="event.url" alt="event img" class="bg-light card-img-top" />
          <div class="card-body text-dark">
            <h4 v-line-clamp="1" class="m-0">{{event.title}}</h4>
          </div>
        </a>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="imageModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content" style="border-radius: 12px;">
          <div class="modal-header">
            <h2 class="modal-title" id="exampleModalCenterTitle">{{show.title}}</h2>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body p-4">
            <div class="row mb-3">
              <div class="col d-flex justify-content-center">
                <img :src="show.img" alt="event img" class="img-fluid rounded" />
              </div>
            </div>
            <div class="row">
              <div class="col" v-line-clamp="4">
                <a
                  href
                  @click.prevent="goTo(show.id)"
                  class="card bg-light text-dark border-0"
                  style="text-decoration:none;"
                >
                  <div class="card-body">
                    <div v-html="show.desc"></div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../../Firebase/firebaseInit";
import $ from "jquery";
import VueInstagram from "vue-instagram";
import * as https from "https";
import { type } from "os";

export default {
  data() {
    return {
      events: [],
      instagram: [],
      show: {
        img: null,
        title: null,
        id: null,
        desc: null
      }
    };
  },
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: "Gallery",
    meta: [
      {
        vmid: "gallery",
        name: "gallery",
        content: "A collection of pictures from events on Spark West Network"
      }
    ]
  },
  created() {
    db.collection("events")
      // .orderBy("event.likes")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            title: doc.data().event.title,
            date: doc.data().event.date,
            time: doc.data().event.time,
            email: doc.data().event.email,
            desc: doc.data().event.description,
            url:
              "https://firebasestorage.googleapis.com/v0/b/spark-west.appspot.com/o/events%2F" +
              doc.data().event.imageKey +
              "?alt=media&token"
          };
          this.events.push(data);
        });
      })
      .then(() => {
        var token = "10717756500.1677ed0.fbf63b282dac4d59a22d2abd141c7320",
          userid = 1362124742,
          num_photos = 20;

        let that = this;

        $.ajax({
          url: "https://api.instagram.com/v1/users/self/media/recent",
          dataType: "json",
          type: "GET",
          data: { access_token: token, count: num_photos },
          success: that.getInsta(res),
          error: function(data) {
            console.error(data);
          }
        });
      });
  },
  methods: {
    modal(ev) {
      this.show.img = ev.url;
      this.show.title = ev.title;
      this.show.id = ev.id;
      this.show.desc = ev.desc;

      $("#imageModal").modal("show");
    },
    goTo(id) {
      $("#imageModal").modal("toggle");
      $("#imageModal").on("hidden.bs.modal", () => {
        this.$router.push("event/" + id);
      });
    },
    getInsta(data) {
      console.log("Got data");
      console.log(data);
    }
  }
};
</script>

<style scoped>
.stripe {
  position: absolute;
  width: 100vw;
  left: 0;
  bottom: 5vh;
  z-index: -1000;
}

.thumbnail {
  transition: 0.5s all;
  border-radius: 12px !important;
  text-decoration: none;
}

.thumbnail img {
  border-radius: 12px;
}

.thumbnail:hover {
  transform: translateY(-0.5rem);
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.07) !important;
}
</style>
