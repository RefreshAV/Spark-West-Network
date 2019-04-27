<template>
  <section id="contact">
    <div class="container">
      <h1 class="mt-4 mb-3 text-center">Contact Us</h1>
      <div class="row">
        <div class="col">
          <div class="card bg-white border-0 mb-3 shadow animated fadeInLeft">
            <div class="card-body">
              <div class="row">
                <div class="col-md-7 rounded">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22534.894807880497!2d-64.37648732789971!3d45.08859451133002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b585508649b3e03%3A0xb991fdcccab87245!2sWolfville%2C+NS!5e0!3m2!1sen!2sca!4v1531401712394"
                    frameborder="0"
                    @load="load"
                    v-show="loaded"
                    class="w-100 h-100 border-0 rounded"
                    allowfullscreen
                  />
                </div>

                <div class="col-md-5">
                  <form>
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        name
                        value
                        placeholder="Name"
                        v-model="contactRequest.name"
                      >
                    </div>
                    <div class="form-group">
                      <input
                        type="email"
                        class="form-control"
                        name
                        value
                        placeholder="E-mail"
                        v-model="contactRequest.email"
                      >
                    </div>
                    <div class="form-group">
                      <input
                        type="tel"
                        class="form-control"
                        name
                        value
                        placeholder="Phone"
                        v-model="contactRequest.phone"
                      >
                    </div>
                    <div class="form-group">
                      <textarea
                        class="form-control"
                        name
                        rows="4"
                        placeholder="Message"
                        v-model="contactRequest.message"
                        style="resize:none;"
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

      <div class="row mb-3 px-3 d-flex justify-content-center align-items-center">
        <div class="col-8">
          <div
            class="row p-3 d-flex justify-content-center align-items-center socBanner shadow rounded-pill"
          >
            <div class="col text-center">
              <button class="btn btn-info socialMedia rounded-circle">SM</button>
            </div>
            <div class="col text-center">
              <button class="btn btn-info socialMedia rounded-circle">SM</button>
            </div>
            <div class="col text-center">
              <button class="btn btn-info socialMedia rounded-circle">SM</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import $ from "jquery";

export default {
  data: function() {
    return {
      contactRequest: {
        name: "",
        email: "",
        phone: "",
        message: ""
      },
      loaded: false
    };
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
    load() {
      this.loaded = true;
      $("iframe").addClass("animated fadeIn");
    }
  }
};
</script>

<style>
textarea {
  resize: none;
}

.socialMedia {
  width: 8vmax;
  height: 8vmax;
  max-width: 80px;
  max-height: 80px;
}

.socBanner {
  background: #12c2e9; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #f64f59,
    #c471ed,
    #12c2e9
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #f64f59,
    #c471ed,
    #12c2e9
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
