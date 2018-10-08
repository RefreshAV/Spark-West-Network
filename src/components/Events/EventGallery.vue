<template>
  <div class="container gallery-container">

    <h1>Event Gallery</h1>

    <div class="tz-gallery">

      <div class="row">

        <div
          v-for="(event) in events"
          :key="event.id"
          class="col-sm-6 col-md-4">
          <div
            class="thumbnail"
            data-toggle="modal"
            :data-target="'#' + event.id">
            <div class="lightbox">
              <img
                :src="event.url"
                alt="Park"
                style="height:auto; width:325px">
            </div>
            <router-link :to="{name: 'event-detail', params: {id: event.id}}">
              <div class="caption">
                <h3>{{ event.title }}</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            </router-link>
          </div>
        </div>

        <div
          v-for="event in events"
          :key="event.id">
          <div
            class="modal fade"
            :id="event.id"
            tabindex="-1"
            role="dialog"
            aria-hidden="true">
            <div
              class="modal-dialog modal-lg"
              role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5
                    class="modal-title"
                    id="exampleModalLabel">{{ event.title }}</h5>
                  <button
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close">
                    <i class="fa fa-times"/>
                  </button>
                </div>
                <div class="modal-body">
                  <img
                    :src="event.url"
                    alt="">
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
import db from '../../Firebase/firebaseInit'
export default {
  data () {
    return {
      events: [],
      images: []
    }
  },
  created () {
    db
      .collection('events')
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
              'https://firebasestorage.googleapis.com/v0/b/spark-west.appspot.com/o/events%2F' +
              doc.data().event.imageKey +
              '?alt=media&token'
          }
          this.events.push(data)
        })
      })
    baguetteBox.run('.tz-gallery')
  }
}
</script>

<style scoped>
/* .container {
  background-image: linear-gradient(to top, #cccccc 0%, #eeeeee 100%);
  /* min-height: 100vh;
  font: normal 16px sans-serif;
} */

.modal-body img {
    max-width: 100%;
}

.gallery-container h1 {
  padding-top: 6px;
  text-align: center;
  font-family: "Droid Sans", sans-serif;
  font-weight: bold;
  color: #58595a;
}

.gallery-container p.page-description {
  text-align: center;
  margin: 30px auto;
  font-size: 18px;
  color: #85878c;
}

.tz-gallery {
  padding: 40px;
}

.tz-gallery .thumbnail {
  padding: 0;
  margin-bottom: 30px;
  background-color: #fff;
  border-radius: 4px;
  border: none;
  transition: 0.15s ease-in-out;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.06);
}

.tz-gallery .thumbnail:hover {
  transform: translateY(-10px) scale(1.02);
}

.tz-gallery .lightbox img {
  border-radius: 4px 4px 0 0;
}

.tz-gallery .caption {
  padding: 26px 30px;
  text-align: center;
}

.tz-gallery .caption h3 {
  font-size: 14px;
  font-weight: bold;
  margin-top: 0;
}

.tz-gallery .caption p {
  font-size: 12px;
  color: #7b7d7d;
  margin: 0;
}

.baguetteBox-button {
  background-color: transparent !important;
}
</style>
