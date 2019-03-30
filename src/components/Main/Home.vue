<template>
  <div>
    <!-- Slides -->
    <carousel
      class="bg-light"
      :per-page="1"
      :autoplay="true"
      :autoplayTimeout="6000"
      :loop="true"
      :paginationPosition="'bottom-overlay'"
      
    >
      <slide class="slide d-flex justify-content-center">
        <div class="w-100 d-flex justify-content-center align-items-center">
          <div class="card w-100 mx-5">
            <div class="card-header">
              <h1>Header</h1>
            </div>
            <div class="card-body">
              Body text
            </div>
          </div>
        </div>
      </slide>
      <slide class="slide d-flex justify-content-center">
        <div class="w-100 d-flex justify-content-center align-items-center">
          <div class="card w-100 mx-5">
            <div class="card-header">
              <h1>Header</h1>
            </div>
            <div class="card-body">
              Body text
            </div>
          </div>
        </div>
      </slide>
      <slide class="slide d-flex justify-content-center">
        <div class="w-100 d-flex justify-content-center align-items-center">
          <div class="card w-100 mx-5">
            <div class="card-header">
              <h1>Header</h1>
            </div>
            <div class="card-body">
              Body text
            </div>
          </div>
        </div>
      </slide>
      <slide class="slide d-flex justify-content-center">
        <div class="w-100 d-flex justify-content-center align-items-center">
          <div class="card w-100 mx-5">
            <div class="card-header">
              <h1>Header</h1>
            </div>
            <div class="card-body">
              Body text
            </div>
          </div>
        </div>
      </slide>
      <slide class="slide d-flex justify-content-center">
        <div class="w-100 d-flex justify-content-center align-items-center">
          <div class="card w-100 mx-5">
            <div class="card-header">
              <h1>Header</h1>
            </div>
            <div class="card-body">
              Body text
            </div>
          </div>
        </div>
      </slide>
      <slide class="slide d-flex justify-content-center">
        <div class="w-100 d-flex justify-content-center align-items-center">
          <div class="card w-100 mx-5">
            <div class="card-header">
              <h1>Header</h1>
            </div>
            <div class="card-body">
              Test
            </div>
          </div>
        </div>
      </slide>
    </carousel>
    <div class="container">
      <h1 class="my-4">Welcome to Spark West</h1>

      <!-- Marketing Icons Section -->
      <div class="row">
        <div class="col-lg-4 mb-4">
          <div class="card h-100">
            <h4 class="card-header">
              <i class="far fa-comments"></i> Unified Voice
            </h4>
            <div class="card-body">
              <p
                class="card-text"
              >There is no unifying voice that pulls together the diverse organizations, events, and opportunities present in the Annapolis Valley, and sister municipalities. As individuals interested in what this community offers to entrepreneurs and creative professionals, it can be challenging to keep on top of what is going on of interest. This greatly limits regional organizations’ ability to reach out to our community.</p>
            </div>
            <div class="card-footer">
              <router-link to="/About" class="btn btn-primary">Learn More</router-link>
            </div>
          </div>
        </div>
        <div class="col-lg-4 mb-4">
          <div class="card h-100">
            <h4 class="card-header">
              <i class="fa fa-arrow-right"></i> Access Ramp
            </h4>
            <div class="card-body">
              <p
                class="card-text"
              >Individuals within our region who are new to this space, or unaware, but would be interested in it, have no central “on-ramp” to its discovery.</p>
            </div>
            <div class="card-footer">
              <router-link to="/About" class="btn btn-primary">Learn More</router-link>
            </div>
          </div>
        </div>
        <div class="col-lg-4 mb-4">
          <div class="card h-100">
            <h4 class="card-header">
              <i class="far fa-bell"></i> Attracting Talent
            </h4>
            <div class="card-body">
              <p
                class="card-text"
              >The talent that we are looking to attract to Western Nova might look unfavorably on our region if they do not see it representing the cultural and business development opportunities that they could access elsewhere.</p>
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
import { Carousel, Slide } from "vue-carousel";
export default {
  components: {
    Carousel,
    Slide
  },
  metaInfo: {
    title: "Spark West Network",
    // override the parent template and just use the above title only
    titleTemplate: null
  }
};
</script>

<style scoped>
.portfolio-item {
  margin-bottom: 30px;
}

.slide {
  height: 50vh;
  background-image: url("https://picsum.photos/1900/1080/?random");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
