<template>
  <section id="contact">
    <div class="wrapper">
      <div class="container">
        <h1 class="mt-4 mb-3 text-center">Contact Us</h1>
        <div class="row">
          <div class="col">
            <div class="card bg-white shadow animated fadeInLeft">
              <div class="card-body pb-0">
                <div class="row">
                  <div class="col-md col-12 mb-3">
                    <div class="map">
                      <MglMap
                        :accessToken="accessToken"
                        :mapStyle="mapStyle"
                        :center="coordinates"
                        :zoom="12"
                        @load="onMapLoaded"
                      >
                        <MglNavigationControl position="top-right" />
                        <MglMarker :coordinates="coordinates" color="#fd4260">
                          <MglPopup>
                            <div>
                              <h5>Patterson Hall</h5>
                              <p>
                                24 University Ave
                                Wolfville
                              </p>
                            </div>
                          </MglPopup>
                        </MglMarker>
                      </MglMap>
                    </div>
                  </div>

                  <div class="col-md-5 col-12 mb-3">
                    <form @submit.prevent="mail">
                      <div class="form-group">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Name"
                          v-model="contactRequest.name"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Subject"
                          v-model="contactRequest.subject"
                          required
                        />
                      </div>
                      <!-- <div class="form-group">
                        <input
                          type="tel"
                          class="form-control"
                          placeholder="Phone"
                          v-model="contactRequest.phone"
                        />
                        <small class="form-text text-muted ml-1">optional</small>
                      </div> -->
                      <div class="form-group">
                        <textarea
                          class="form-control"
                          rows="8"
                          placeholder="Message"
                          v-model="contactRequest.message"
                          style="resize:none;"
                          required
                        />
                      </div>
                      <button class="btn btn-block btn-primary" type="submit" name="button">
                        Send
                        <i class="fas fa-paper-plane"></i>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <div class="row d-flex justify-content-center mb-4">
          <div class="col-md-auto col">
            <div class="card border-info text-info shadow">
              <div class="card-body">
                <div class="row mb-3">
                  <div class="col text-center">
                    <h3>Or Follow Us</h3>
                  </div>
                </div>

                <div class="row">
                  <div class="col text-center">
                    <div class="btn-group d-none d-sm-inline">
                      <a
                        href="https://twitter.com/SparkWestNet/media"
                        target="_"
                        class="btn btn-info btn-lg"
                      >
                        Twitter
                        <i class="fab fa-twitter fa-lg"></i>
                      </a>
                      <a
                        href="https://fb.me/sparkwestnetwork"
                        target="_"
                        class="btn btn-primary btn-lg"
                      >
                        Facebook
                        <i class="fab fa-facebook fa-lg"></i>
                      </a>
                      <a
                        href="https://www.instagram.com/sparkwestnetwork/"
                        target="_"
                        class="btn btn-danger btn-lg"
                      >
                        Instagram
                        <i class="fab fa-instagram fa-lg"></i>
                      </a>
                    </div>

                    <div class="btn-group-vertical d-inline d-sm-none">
                      <a
                        href="https://twitter.com/SparkWestNet/media"
                        target="_"
                        class="btn btn-info btn-lg"
                      >
                        Twitter
                        <i class="fab fa-twitter fa-lg"></i>
                      </a>
                      <a
                        href="https://fb.me/sparkwestnetwork"
                        target="_"
                        class="btn btn-primary btn-lg"
                      >
                        Facebook
                        <i class="fab fa-facebook fa-lg"></i>
                      </a>
                      <a
                        href="https://www.instagram.com/sparkwestnetwork/"
                        target="_"
                        class="btn btn-danger btn-lg"
                      >
                        Instagram
                        <i class="fab fa-instagram fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import $ from "jquery";
import { MglMap, MglMarker, MglNavigationControl, MglPopup } from "vue-mapbox";

export default {
  data: function() {
    return {
      contactRequest: {
        name: "",
        subject: "",
        phone: "",
        message: ""
      },
      accessToken:
        "pk.eyJ1IjoiY3VwcGFqb2VtYW4iLCJhIjoiY2prMTY5MHJrMGU5ejNycXFvdXpnMG84aSJ9.s6Pvs5N-dITfrDFAgEWbng",
      mapStyle: "mapbox://styles/mapbox/dark-v9",
      coordinates: [-64.36834, 45.08829],
      loaded: false
    };
  },
  components: {
    MglMap,
    MglMarker,
    MglPopup,
    MglNavigationControl
  },
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: "Contact",
    meta: [
      {
        vmid: "description",
        name: "description",
        content: "Get in touch with us"
      }
    ]
  },
  methods: {
    onMapLoaded() {
      this.loaded = true;
      $("iframe").addClass("animated fadeIn");
    },
    mail() {
      let subject = this.contactRequest.name + ': ' + this.contactRequest.subject
      let body = this.contactRequest.message

      window.open('mailto:info@sparkwest.network?subject=' + subject + '&body=' + body);
    }
  }
};
</script>

<style scoped>
textarea {
  resize: none;
}

.card {
  border-radius: 12px;
}

.map {
  border-radius: 12px !important;
  min-height: 200px;
  height: 100%;
  overflow: hidden;
}

.mapboxgl-popup {
  transform: translateY(100px);
}

input {
  border-radius: 40px;
}

textarea {
  border-radius: 12px;
}

form button {
  border-radius: 12px;
}
</style>
