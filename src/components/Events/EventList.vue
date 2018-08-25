<template>
  <div class="container">
    <hr>
  <div class="row justify-content-md-center">
    <div class="col col-md-auto">
      <button v-if="display" class="btn btn-primary" @click="lastWeek()"><i class="fa fa-angle-double-left fa-2x"></i></button>
    </div>
    <div class="col-md-auto">
      <h1>{{month}}</h1>
    </div>
    <div class="col col-md-auto">
      <button class="btn btn-primary" @click="nextWeek()"><i class="fa fa-angle-double-right fa-2x"></i></button>
    </div>
  </div>
  <div class="row justify-content-md-center">
    <div class="col col-md-auto">
      <h3><span v-if="weekStart < 10">0</span>{{weekStart}} - <span v-if="weekEnd < 10">0</span>{{weekEnd}}</h3>
    </div>
  </div>
  <div class="row justify-content-md-center">
    <small class="badge badge-danger badge-pill">Not Implemented</small>
  </div>
  <hr>

  <ul class="list-group" v-if="display">
    <div class="d-flex justify-content-center" v-if="events.length == 0">
      <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Ajax_loader_metal_512.gif" class="loading" style="width:50px; height: 50px;">
    </div>
    <router-link v-for="(event) in events" v-bind:key="event.id" class="list-group-item card text-white bg-dark mb-3" v-bind:to="{name: 'event-detail', params: {id: event.id}}">
      <h1 class="card-header">{{event.date.day}}</h1>
      <div class="card-body">
        <h5 class="card-title">{{event.title}}</h5>
        <p class="card-text">{{event.desc}}</p>
      </div>
    </router-link>
  </ul>

      <router-link to="/events/NewEvent" class="btn btn-primary btn-circular-lg mb-3"><i class="fa fa-plus"></i></router-link>
  </div>
</template>

<script>
import db from "../../Firebase/firebaseInit";
export default {
  data() {
    return {
      events: [],
      images: [],
      year: null,
      month: null,
      monthNum: null,
      weekStart: null,
      weekEnd: null,
      display: true
    };
  },

  //generates array of event data objects from firebase when the component is created
  created() {
    //get date
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var week = d.getDate() - d.getDay();

    this.month = months[d.getMonth()];
    this.monthNum = month;
    this.weekStart = week;
    this.year = year;
    if (week + 6 > daysInMonth) {
      this.weekEnd = week + 6 - daysInMonth;
    } else {
      this.weekEnd = week + 6;
    }

    if (this.monthNum > 9) {
      month = this.monthNum;
    } else {
      month = "0" + (this.monthNum + 1);
    }

    db
      .collection("events")
      .orderBy("event.date.year")
      .orderBy("event.date.month")
      .orderBy("event.date.day")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          var date = doc
            .data()
            .event.date.toString()
            .substring(8);
          const data = {
            id: doc.id,
            title: doc.data().event.title,
            date: doc.data().event.date,
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
    },
    nextWeek() {
      var year = this.year;
      var month = this.monthNum;
      var daysInMonth = new Date(year, month + 1, 0).getDate();

      var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];

      if (this.weekStart + 7 > daysInMonth) {
        if (month + 1 > 11) {
          //Next Year
          year++;
          month = 0;
          this.weekStart = 1;
          this.weekEnd = 7;
        } else {
          //Next Month
          month++;
          this.weekStart = 1;
          this.weekEnd = 7;
        }
      } else {
        //Next Week
        if (this.weekEnd + 7 > daysInMonth) {
          this.weekStart += 7;
          this.weekEnd += 7 - daysInMonth;
        } else {
          this.weekStart += 7;
          this.weekEnd += 7;
        }
      }

      this.year = year;
      this.monthNum = month;
      this.month = months[month];
    },
    lastWeek() {
      console.log("Not Implemented");
      // var year = this.year;
      // var month = this.monthNum;
      // var daysInMonth = new Date(year, month + 1, 0).getDate();

      // var months = [
      //   "January",
      //   "February",
      //   "March",
      //   "April",
      //   "May",
      //   "June",
      //   "July",
      //   "August",
      //   "September",
      //   "October",
      //   "November",
      //   "December"
      // ];

      // if (this.weekStart - 7 < 0) {
      //   if (month - 1 < 0) {
      //     //Last Year
      //     this.year -= 1
      //     this.monthNum = 11

      //     this.weekStart = 30
      //     this.weekEnd = 24
      //   } else {
      //     //Last Month
      //     this.weekStart =
      //   }
      // } else {
      //   //Last Week
      // }
    }
  }
};
</script>

<style scope>

.btn-circular-lg {
  width: 70px;
  height: 70px;
  padding: 10px 16px;
  border-radius: 35px;
  font-size: 40px;
  line-height: 1.33;
}
</style>
