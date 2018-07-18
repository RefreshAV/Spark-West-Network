<template>
  <div class="container">
    <!-- <h2>All Event Listings</h2>
    <p>et, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean </p>
    <table class="table table-hover">
      <thead class="thead-dark">
      <tr>
        <th>Event</th>
        <th>Name</th>
        <th>Date</th>
        <th>Location</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Event1</td>
        <td>Example User</td>
        <td>March 23 2018</td>
        <td>Wolfville</td>
      </tr>
      <tr>
        <td>Event1</td>
        <td>Example User</td>
        <td>March 23 2018</td>
        <td>Wolfville</td>
      </tr>
      <tr>
        <td>Event1</td>
        <td>Example User</td>
        <td>March 23 2018</td>
        <td>Wolfville</td>
      </tr>
      </tbody>
    </table> -->

    <!-- <ul class="list-group">
      <div class="list-group-item-heading"><h2>Events:</h2></div>
      <div class="d-flex justify-content-center" v-if="events.length == 0">
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Ajax_loader_metal_512.gif" class="loading" style="width:50px; height: 50px;">
      </div>
      <div v-for="(event, i) in events" v-bind:key="event.id" class="list-group-item ">
        <router-link v-bind:to="{name: 'event-detail', params: {id: event.id}}"> 
          <div class="row">
          <div class="col-md-6">
            <h4>{{event.date}}</h4>
            <h5>{{event.title}}</h5>
            <p>{{event.time}}</p>
          </div>
          <div class="col-md-6 float-md-right">
            <img :src="images[i]">
          </div>
          </div>
        </router-link>
      </div>
    </ul> -->

    <ul class="list-group">
      <h1 class="list-group-header d-flex justify-content-center">June</h1>
      <div class="d-flex justify-content-center" v-if="events.length == 0">
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Ajax_loader_metal_512.gif" class="loading" style="width:50px; height: 50px;">
      </div>
      <router-link v-for="(event) in events" v-bind:key="event.id" class="list-group-item card text-white bg-dark mb-3" v-bind:to="{name: 'event-detail', params: {id: event.id}}">
        <h1 class="card-header">{{event.date}}</h1>
        <div class="card-body">
          <h5 class="card-title">{{event.title}}</h5>
          <p class="card-text">{{event.desc}}</p>
        </div>
      </router-link>
    </ul>
      <router-link to="/events/NewEvent" class="btn btn-primary btn-circular mb-3"><i class="fa fa-plus"></i></router-link>
  </div>

</template>

<script>
import db from "../../Firebase/firebaseInit";
export default {
  data() {
    return {
      events: [],
      images: []
    };
  },

  //generates array of event data objects from firebase when the component is created
  created() {
    db
      .collection("events")
      .orderBy("event.date")
      .limit(7)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          var date = doc.data().event.date.toString().substring(8) ;
          const data = {
            id: doc.id,
            title: doc.data().event.title,
            date: date,
            time: doc.data().event.time,
            email: doc.data().event.email,
            desc: doc.data().event.description,
            imageKey: doc.data().event.imageKey
          };
          this.events.push(data);
        });
      });
  },
  watch: {
    events: "fetchImages"
  },
  methods: {
    fetchImages() {
      var images = [];

      for (var i = 0; i < this.events.length; i++) {
        var url =
          "https://firebasestorage.googleapis.com/v0/b/spark-west.appspot.com/o/events%2F" +
          this.events[i].imageKey +
          "?alt=media&token";
        images.push(url);
      }
      this.images = images;
    }
  }
};
</script>

<style>
img {
  height: 150px;
}

.btn-circular {
  width: 70px;
  height: 70px;
  padding: 10px 16px;
  border-radius: 35px;
  font-size: 40px;
  line-height: 1.33;
}
</style>
