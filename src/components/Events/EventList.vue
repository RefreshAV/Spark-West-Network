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

    <ul class="list-group">
      <div class="list-group-item-heading"><h2>Events:</h2></div>
      <div v-for="event in events" v-bind:key="event.id" class="list-group-item">
        <router-link v-bind:to="{name: 'event-detail', params: {id: event.id}}">
          <h4>{{event.date}}</h4>
          <h5>{{event.title}}</h5>
          <p>{{event.time}}</p>
        </router-link>
      </div>
    </ul>
      <router-link to="/events/NewEvent" class="btn btn-primary my-2">New Event</router-link>
  </div>

</template>

<script>
import db from "/home/max/Documents/WebProjects/sparkwest/src/components/firebaseInit.js";
export default {
  data() {
    return {
      events: []
    };
  },

  //generates array of event data objects from firebase when the component is created
  created() {
    db
      .collection("events").limit(7)
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
            imageKey: doc.data().event.imageKey
          };
          console.log(data);
          this.events.push(data)
        });
      });
  }
};
</script>

<style>
</style>
