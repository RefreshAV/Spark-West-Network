<template>
  <div>
    <app-slider/>
    <div class="container">

      <h1 class="my-4">Welcome to Spark West</h1>

      <!-- Marketing Icons Section -->
      <div class="row">
        <div class="col-lg-4 mb-4">
          <div class="card h-100">
            <h4 class="card-header"><i class="far fa-comments"></i> Unified Voice</h4>
            <div class="card-body">
              <p class="card-text">There is no unifying voice that pulls together the diverse organizations, events, and opportunities present in the Annapolis Valley, and sister municipalities. As individuals interested in what this community offers to entrepreneurs and creative professionals, it can be challenging to keep on top of what is going on of interest. This greatly limits regional organizations’ ability to reach out to our community.</p>
            </div>
            <div class="card-footer">
              <router-link to="/About" class="btn btn-primary">Learn More</router-link>
            </div>
          </div>
        </div>
        <div class="col-lg-4 mb-4">
          <div class="card h-100">
            <h4 class="card-header"><i class="fa fa-arrow-right"></i> Access Ramp</h4>
            <div class="card-body">
              <p class="card-text">Individuals within our region who are new to this space, or unaware, but would be interested in it, have no central “on-ramp” to its discovery.</p>
            </div>
            <div class="card-footer">
              <router-link to="/About" class="btn btn-primary">Learn More</router-link>
            </div>
          </div>
        </div>
        <div class="col-lg-4 mb-4">
          <div class="card h-100">
            <h4 class="card-header"><i class="far fa-bell"></i> Attracting Talent</h4>
            <div class="card-body">
              <p class="card-text">The talent that we are looking to attract to Western Nova might look unfavorably on our region if they do not see it representing the cultural and business development opportunities that they could access elsewhere.</p>
            </div>
            <div class="card-footer">
              <router-link to="/About" class="btn btn-primary">Learn More</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from "./Slider.vue";
export default {
  components: {
    "app-slider": Slider
  },
  metaInfo: {
    title: "Spark West Network",
    // override the parent template and just use the above title only
    titleTemplate: null
  }
};
</script>

<style scoped>
body {
  padding-top: 54px;
}

@media (min-width: 992px) {
  body {
    padding-top: 56px;
  }
}

.carousel-item {
  height: 65vh;
  min-height: 300px;
  background: no-repeat center center scroll;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.portfolio-item {
  margin-bottom: 30px;
}
</style>
