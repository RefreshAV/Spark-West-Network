<template>
  <div class="container">
    <div class="row mt-5 mb-3 d-flex justify-content-center">
      <div class="col-auto">
        <div class="row">
          <div class="col">
            <button class="btn btn-primary" @click="prevMonth">
              <i class="fas fa-arrow-left"></i>
            </button>
          </div>
          <div class="col">
            <h1>{{ monthName }}</h1>
          </div>
          <div class="col">
            <button class="btn btn-primary" @click="nextMonth">
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col text-center">
        <span class="d-inline d-md-none">S</span>
        <span class="d-none d-md-inline">Sunday</span>
      </div>
      <div class="col text-center">
        <span class="d-inline d-md-none">M</span>
        <span class="d-none d-md-inline">Monday</span>
      </div>
      <div class="col text-center">
        <span class="d-inline d-md-none">T</span>
        <span class="d-none d-md-inline">Tuesday</span>
      </div>
      <div class="col text-center">
        <span class="d-inline d-md-none">W</span>
        <span class="d-none d-md-inline">Wednesday</span>
      </div>
      <div class="col text-center">
        <span class="d-inline d-md-none">T</span>
        <span class="d-none d-md-inline">Thursday</span>
      </div>
      <div class="col text-center">
        <span class="d-inline d-md-none">F</span>
        <span class="d-none d-md-inline">Friday</span>
      </div>
      <div class="col text-center">
        <span class="d-inline d-md-none">S</span>
        <span class="d-none d-md-inline">Saturday</span>
      </div>
    </div>
    <div class="row text-light" v-for="week in month" :key="week.key">
      <div class="col p-2 day" v-for="day in week.days" :key="day.key">
        <div
          :class="{'card':true, 'h-100':true, 'bg-dark':(day.currentMonth), 'bg-secondary':(!day.currentMonth)}"
        >
          <div class="card-body">
            <span v-if="day.num < 10">0</span>
            {{ day.num }}
          </div>
        </div>
      </div>
    </div>

    <router-link
      to="/events/NewEvent"
      class="bg-primary text-white circular mb-3 d-flex justify-content-center align-items-center"
    >
      <i class="fa fa-plus" />
    </router-link>
  </div>
</template>

<script>
import db from "../../Firebase/firebaseInit";
export default {
  data() {
    return {
      events: [],
      images: [],
      month: [],
      monthName: null,
      num: {
        month: null,
        year: null
      }
    };
  },
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: "Event List",
    meta: [
      {
        vmid: "description",
        name: "description",
        content:
          "A calendar of the current and approching events on Spark West Network"
      }
    ]
  },
  // generates array of event data objects from firebase when the component is created
  created() {
    let d = new Date();
    this.num.month = d.getMonth();
    this.num.year = d.getFullYear();

    db.collection("events")
      .orderBy("event.date.year")
      .orderBy("event.date.month")
      .orderBy("event.date.day")
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
          this.events.push(data);
        });
      });
  },
  computed: {
    combined() {
      return this.num.year && this.num.month;
    }
  },
  watch: {
    events: "fetchImages",
    combined() {
      this.getMonth(this.num.year, this.num.month);
    }
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
    getMonth(year, month) {
      // get date
      var monthNames = [
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

      var allDays = [];

      var d = new Date(year, month + 1, 0);
      const daysInCurrent = d.getDate();
      var startDay = d.getDay();

      var firstOfMonth = new Date(year, month - 1, 1);
      var day = firstOfMonth.getDay() || 6;
      day = day === 1 ? 0 : day;
      if (day) {
        day--;
      }
      var diff = 7 - day;
      var lastOfMonth = new Date(year, month, 0);
      var lastDate = lastOfMonth.getDate();
      if (lastOfMonth.getDay() === 1) {
        diff--;
      }
      var result = Math.ceil((lastDate - diff) / 7);
      var weeksInMonth = result + 1;
      // console.log("===============================");
      // console.log("days in month: " + daysInCurrent);
      // console.log("weeks in month: " + weeksInMonth);
      // console.log("First day of month: " + startDay);

      let count = 1;
      for (var i = 1; i < weeksInMonth + 1; i++) {
        let week = { key: i + "w", days: [] };
        let emptyWeek = false;
        for (var k = 1; k < 8; k++) {
          if (i == 1) {
            // First week logic
            if (startDay == 0) {
              // Month starts on 0
              if (i * k != 7) {
                week.days.push({
                  key: i * k + "d",
                  num: "lastMonth",
                  currentMonth: false
                });
              } else {
                week.days.push({
                  key: i * k + "d",
                  num: count,
                  currentMonth: true
                });
                count++;
              }
            } else {
              if (i * k < startDay - 1) {
                week.days.push({
                  key: i * k + "d",
                  num: "lastMonth",
                  currentMonth: false
                });
              } else {
                week.days.push({
                  key: i * k + "d",
                  num: count,
                  currentMonth: true
                });
                count++;
              }
            }
          } else if (count > daysInCurrent) {
            week.days.push({
              key: i * k + "d",
              num: "nextMonth",
              currentMonth: false
            });
            if (k == 1) {
              emptyWeek = true;
            }
          } else {
            week.days.push({
              key: i * k + "d",
              num: count,
              currentMonth: true
            });
            count++;
          }
        }
        if (!emptyWeek) {
          allDays.push(week);
        }
      }

      this.month = allDays;
      this.monthName = monthNames[month];
    },
    nextMonth() {
      var date;
      if (this.num.month + 1 > 12) {
        date = {
          year: this.num.year + 1,
          month: 0
        };
      } else {
        date = {
          year: this.num.year,
          month: this.num.month + 1
        };
      }
      this.num = date;
    },
    prevMonth() {
      var date;
      if (this.num.month - 1 < 0) {
        date = {
          year: this.num.year - 1,
          month: 12
        };
      } else {
        date = {
          year: this.num.year,
          month: this.num.month - 1
        };
      }
      this.num = date;
    }
  }
};
</script>

<style scope>
.circular {
  width: 70px;
  height: 70px;
  border-radius: 35px;
  text-decoration-line: none;
}

.day {
  height: 180px;
}
</style>
