<template>
  <div class="container">
    <h1 class="mt-4 mb-3 text-center">Frequntly Asked Questions</h1>

    <div class="row">
      <div class="col">
        <div id="accordion">
          <div class="list-group shadow">
            <button
              id="btn1"
              type="button"
              class="list-group-item list-group-item-action text-center d-flex justify-content-between align-items-center text-center"
              data-toggle="collapse"
              data-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
              @click="collapseOne"
            >
              Why should this initiative be focused on a small rural area like the Annapolis Valley?
              <i
                id="icon1"
                class="fas fa-chevron-up"
              ></i>
            </button>
            <div
              id="collapseOne"
              class="collapse list-group-item p-0"
              aria-labelledby="headingOne"
              data-parent="#accordion"
            >
              <div
                class="p-3 bg-light"
              >This initiative wants to make western rural Nova Scotia innovate, create businesses, and urbanize. We believe there is greater value in engaging the geographic region targeted by the Innovacorp Spark West Innovation Challenge. This includes Lunenburg, Queens, Shelburne, Yarmouth, Digby, Annapolis, Kings, and Hants counties. We all share alike this rural region of Nova Scotia and collaborate across this region regularly, and our collective footprint provides a more meaningful picture.</div>
            </div>
            <button
              id="btn2"
              type="button"
              class="list-group-item list-group-item-action text-center d-flex justify-content-between align-items-center text-center"
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="true"
              aria-controls="collapseTwo"
              @click="collapseTwo"
            >
              Should we not just promote our region’s activities under the Halifax Startup Digest?
              <i
                id="icon2"
                class="fas fa-chevron-up"
              ></i>
            </button>
            <div
              id="collapseTwo"
              class="collapse list-group-item p-0"
              aria-labelledby="headingOne"
              data-parent="#accordion"
            >
              <div
                class="p-3 bg-light"
              >We should absolutely promote our region’s activities to the wider Nova Scotia startup community. HSD is an excellent way to do this. However, HSD has its own mandate which does not include our rural Nova Scotia ecosystem. It is a rare experience to find content in HSD that pulls from our region. Furthermore, HSD does not have a good vantage point to attempt to adequately represent Western Nova, because it is the big urban centres like Halifax that engage and are rich in innovation, business, entrepreneurship, and such.</div>
            </div>
            <button
              id="btn3"
              type="button"
              class="list-group-item list-group-item-action text-center d-flex justify-content-between align-items-center text-center"
              data-toggle="collapse"
              data-target="#collapseThree"
              aria-expanded="true"
              aria-controls="collapseThree"
              @click="collapseThree"
            >
              Where do you draw your inspiration from?
              <i id="icon3" class="fas fa-chevron-up"></i>
            </button>
            <div
              id="collapseThree"
              class="collapse list-group-item p-0"
              aria-labelledby="headingOne"
              data-parent="#accordion"
            >
              <div class="p-3 bg-light">
                Halifax has done a remarkable job drawing people in and sustaining a culture that appeals to entrepreneurs and creative professionals. One initiative we want to draw attention to is the Halifax Startup Digest (HSD), run by John Hamblin.
                <br>
                <br>HSD is a twice-monthly email newsletter and web calendar that aggregates events of interest to this Halifax community. As a cross-organization voice, HSD pulls together a compelling picture of the wide range of activities and organizations that make Halifax the dynamic startup ecosystem that it is. Furthermore, HSD draws from relevant programs being delivered in other urban centres in the Atlantic region, and beyond, to help situate Halifax within a larger context. As a volunteer program run by one individual, it is quite an effective community building initiative.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <div class="row text-center my-3">
      <div class="col">
        <h4>Have Even More Questions?</h4>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col">
        <router-link
          to="/contact"
          class="btn btn-lg rounded-pill btn-block btn-grad-blue contact"
        >Contact Us</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: 'FAQ',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Frequently asked questions'
      }
    ]
  },
  methods: {
    collapseOne () {
      $('#btn1').toggleClass('active')
      $('#btn2').removeClass('active')
      $('#btn3').removeClass('active')

      $('#icon1').toggleClass('fa-rotate-180')
      $('#icon2').removeClass('fa-rotate-180')
      $('#icon3').removeClass('fa-rotate-180')
    },
    collapseTwo () {
      $('#btn2').toggleClass('active')
      $('#btn1').removeClass('active')
      $('#btn3').removeClass('active')

      $('#icon2').toggleClass('fa-rotate-180')
      $('#icon1').removeClass('fa-rotate-180')
      $('#icon3').removeClass('fa-rotate-180')
    },
    collapseThree () {
      $('#btn3').toggleClass('active')
      $('#btn1').removeClass('active')
      $('#btn2').removeClass('active')

      $('#icon3').toggleClass('fa-rotate-180')
      $('#icon1').removeClass('fa-rotate-180')
      $('#icon2').removeClass('fa-rotate-180')
    }
  }
}
</script>

<style scoped>
.btn-grad-blue {
  background: #56ccf2; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    45deg,
    #2f80ed,
    #56ccf2
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    45deg,
    #2f80ed,
    #56ccf2
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  background-size: 200% auto;
  border: 0;
  transition: 0.5s;
  color: white;
}

.btn-grad-blue:hover {
  background-position: right center;
  color: white;
}

i {
  transition: 0.5s;
}
</style>
