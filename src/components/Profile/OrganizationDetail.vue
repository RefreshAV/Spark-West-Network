<template>
  <div class="container">
    <div class="row mt-3">
      <div class="col-auto d-flex justify-content-center">
        <img
          :src="'https://firebasestorage.googleapis.com/v0/b/spark-west.appspot.com/o/organizations%2Flogo%2F' + logo + '?alt=media&token'"
          class="mx-auto img-fluid img-circle d-block mb-2 shadow-sm"
          id="preview"
          alt="logo"
        >
      </div>
      <div class="col-lg">
        <div
          class="col rounded"
          :style="'height: 150px; background-image: url(' + banner + '); background-position: center; background-size: cover; background-repeat: no-repeat;'"
        ></div>
        <div class="row mt-3">
          <div class="col-auto">
            <h1>{{name}}</h1>
          </div>
          <div class="col d-flex justify-content-end">
            <!-- Website -->
            <a
              data-toggle="tooltip"
              data-placement="top"
              title="Website"
              :href="website"
              v-if="website"
              target="_blank"
            >
              <span class="fa-stack fa-lg text-secondary">
                <i class="fas fa-square fa-stack-2x"></i>
                <i class="fas fa-globe fa-stack-1x fa-inverse"></i>
              </span>
            </a>

            <!-- Mail -->
            <a data-toggle="tooltip" data-placement="top" title="Email" :href="'mailto: ' + email">
              <span class="fa-stack fa-lg text-success">
                <i class="fas fa-square fa-stack-2x"></i>
                <i class="fas fa-envelope fa-stack-1x fa-inverse"></i>
              </span>
            </a>

            <!-- Twitter -->
            <a
              data-toggle="tooltip"
              data-placement="top"
              title="Twitter"
              :href="twitter"
              v-if="twitter"
              target="_blank"
            >
              <span class="fa-stack fa-lg text-info">
                <i class="fas fa-square fa-stack-2x"></i>
                <i class="fab fa-twitter fa-stack-1x fa-inverse"></i>
              </span>
            </a>

            <!-- Facebook -->
            <a
              data-toggle="tooltip"
              data-placement="top"
              title="Facebook"
              :href="facebook"
              v-if="facebook"
              target="_blank"
            >
              <span class="fa-stack fa-lg">
                <i class="fas fa-square fa-stack-2x"></i>
                <i class="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
              </span>
            </a>

            <!-- Instagram -->
            <a
              data-toggle="tooltip"
              data-placement="top"
              title="Instagram"
              :href="instagram"
              v-if="instagram"
              target="_blank"
            >
              <span class="fa-stack fa-lg text-danger">
                <i class="fas fa-square fa-stack-2x"></i>
                <i class="fab fa-instagram fa-stack-1x fa-inverse"></i>
              </span>
            </a>

            <!-- Linkdin -->
            <a
              data-toggle="tooltip"
              data-placement="top"
              title="Linkdin"
              :href="linkdin"
              v-if="linkdin"
              target="_blank"
            >
              <span class="fa-stack fa-lg">
                <i class="fas fa-square fa-stack-2x"></i>
                <i class="fab fa-linkedin-in fa-stack-1x fa-inverse"></i>
              </span>
            </a>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-md-8">
            <div class="card" style="height:100%">
              <div class="card-body d-flex justify-content-center align-items-center">No Events :(</div>
            </div>
          </div>
          <div class="col">
            <h3>About:</h3>
            <p>
              {{description_small}}
              <a data-toggle="modal" href="#exampleModal">more</a>
            </p>
          </div>
        </div>
        <br>
        <div class="row">
          <div class="col">
            <div class="card bg-secondary text-white">
              <div class="card-body d-flex justify-content-center">Members go here</div>
            </div>
          </div>
        </div>
        <hr>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">About {{name}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <i class="fas fa-times-circle"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="row d-flex justify-content-center">
              <img
                :src="'https://firebasestorage.googleapis.com/v0/b/spark-west.appspot.com/o/organizations%2Flogo%2F' + logo + '?alt=media&token'"
                class="mx-auto img-fluid img-circle d-block mb-2 shadow"
                id="preview"
                alt="logo"
              >
            </div>
            <hr>
            <p>{{description}}</p>
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

export default {
  data() {
    return {
      name: "",
      website: "",
      twitter: "",
      facebook: "",
      instagram: "",
      linkdin: "",
      description: "",
      description_small: "",
      email: "",
      other: "",
      logo: "",
      banner: ""
    };
  },
  watch: {
    description: function() {
      if (this.description.length > 200) {
        this.description_small = this.description.slice(0, 200) + "...";
      } else {
        this.description_small = this.description;
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    db.collection("organizations")
      .where(firebase.firestore.FieldPath.documentId(), "==", to.params.id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.name = doc.data().organization.name;
            vm.website = doc.data().organization.website;
            vm.description = doc.data().organization.description;
            vm.email = doc.data().organization.contact.email;
            vm.logo = doc.data().organization.imagekey;
            vm.banner = doc.data().organization.bannerKey;
            vm.instagram = doc.data().organization.contact.instagram;
            vm.facbook = doc.data().organization.contact.facebook;
            vm.twitter = doc.data().organization.contact.twitter;
            vm.linkdin = doc.data().organization.contact.linkdin;
          });
        });
      });
  },
  mounted() {
    // get user info
    db.collection("organizations")
      .where(
        firebase.firestore.FieldPath.documentId(),
        "==",
        this.$route.params.id
      )
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.name = doc.data().organization.name;
          this.website = doc.data().organization.website;
          this.description = doc.data().organization.description;
          this.email = doc.data().organization.contact.email;
          this.banner =
            "https://firebasestorage.googleapis.com/v0/b/spark-west.appspot.com/o/organizations%2Fbanner%2F" +
            doc.data().organization.bannerKey +
            "?alt=media&token";
          this.instagram = doc.data().organization.contact.instagram;
          this.facebook = doc.data().organization.contact.facebook;
          this.twitter = doc.data().organization.contact.twitter;
          this.linkdin = doc.data().organization.contact.linkdin;
        });
      });
  }
};
</script>
<style>
</style>
