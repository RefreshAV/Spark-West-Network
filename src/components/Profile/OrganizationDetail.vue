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
            >
              <span class="fa-stack fa-lg">
                <i class="fas fa-square fa-stack-2x"></i>
                <i class="fab fa-linkedin-in fa-stack-1x fa-inverse"></i>
              </span>
            </a>
          </div>
        </div>
        <hr>
        <p>{{description}}</p>
        <hr>
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
      email: "",
      other: "",
      logo: "",
      banner: ""
    };
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
