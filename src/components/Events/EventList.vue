<template>
  <div class="container">
    <h2>All Event Listings</h2>
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
    </table>
  </div>

</template>

<script>
import db from "/home/max/Documents/WebProjects/sparkwest/src/components/firebaseInit.js";
export default {
  data() {
    return {};
  },

  created() {
    db
      .collection("events")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            'id': doc.id,
            'event_id': doc.data().event.event_id,
            'title': doc.data().event.title,
            'date': doc.data().event.date,
            'time': doc.data().event.time,
            'email': doc.data().event.email,
            'desc': doc.data().event.description
          };
          console.log(data);
        });
      });
  }
};
</script>

<style>
</style>
