<template>
  <div class="container">
    <div class="row mt-5 mb-3 d-flex justify-content-center">
      <div
        v-if="date.month != now.c.month || date.year != now.c.year"
        class="col p-0"
        style="max-width:40px;"
      ></div>
      <div class="col-auto">
        <div class="row">
          <div class="col text-center">{{ date.year }}</div>
        </div>
        <div class="row">
          <div class="col">
            <button class="btn btn-primary" @click="prevMonth">
              <i class="fas fa-arrow-left"></i>
            </button>
          </div>
          <div class="col">
            <h1>{{ monthName(date.month) }}</h1>
          </div>
          <div class="col">
            <button class="btn btn-primary" @click="nextMonth">
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
      <div
        v-if="date.month != now.c.month || date.year != now.c.year"
        class="col-auto p-0 d-flex align-items-center"
      >
        <button @click="home()" id="home" class="btn btn-warning animated fadeIn">
          <i class="fas fa-calendar-alt"></i>
        </button>
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
    <div class="row" v-for="week in month" :key="week.key">
      <div class="col day" v-for="day in week.days" :key="day.key">
        <a
          href="#"
          data-toggle="modal"
          data-target="#dayDetails"
          @click="displayDay(calendarNum(day.num), day.events)"
          class="card h-100 bg-dark text-light day-action animated fadeIn"
          v-if="day.currentMonth"
        >
          <div class="card-body">
            <div class="row w-100 m-0">
              <div class="col p-0">{{ calendarNum(day.num) }}</div>
            </div>
            <hr class="mt-1 mb-2" />
            <div v-for="dayEvent in day.events" :key="dayEvent.id" class="row w-100 m-0 animated fadeIn">
              <div class="col p-0">
                <span
                  :class="{ 'badge':true, 'badge-warning':archive(dayEvent) == 0, 'badge-primary':archive(dayEvent) == 1, 'badge-info':archive(dayEvent) == 2, 'badge-pill':true, 'text-truncate':true, 'w-100':true }"
                >{{ dayEvent.title }}</span>
              </div>
            </div>
          </div>
        </a>

        <div class="card h-100 bg-secondary text-light animated fadeIn" v-if="!day.currentMonth">
          <div class="card-body">
            <div class="row">
              <div class="col">{{ calendarNum(day.num) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col p-0">
        <router-link to="/events/new" class="btn btn-primary circular my-3">
          <i class="fa fa-plus" />
        </router-link>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="dayDetails"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">
              {{ monthName(now.c.month) }} {{ modalNum }}
              <span
                v-if="archive({date: {day: modalNum, month: now.c.month, year: now.c.year}}) == 0"
                class="badge badge-pill badge-warning"
              >Archived</span>
            </h2>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">
                <i class="fa fa-times"></i>
              </span>
            </button>
          </div>
          <div class="modal-body">
            <div
              v-for="(event, index) in modalEvents"
              :key="event.id"
              :class="{ 'row':true, 'mb-2':(index < modalEvents.length - 1) }"
            >
              <div class="col">
                <a href="#" @click="goTo(event.id)" class="card bg-dark text-light event">
                  <div class="card-header">
                    <div class="row">
                      <div class="col d-flex align-items-center">
                        <h4 class="m-0">{{ event.title }}</h4>
                      </div>
                      <div class="col-auto d-flex align-items-center">
                        <h4 class="m-0">
                          <span class="badge badge-pill badge-secondary">{{ event.time }}</span>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div class="card-body modal-desc" v-html="event.desc" v-line-clamp="3"></div>
                </a>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary d-none d-md-inline"
              data-dismiss="modal"
            >Close</button>
            <button
              type="button"
              class="btn btn-secondary rounded-pill btn-block d-inline d-md-none"
              data-dismiss="modal"
            >Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../../Firebase/firebaseInit";
import $ from "jquery";
import { parse } from "path";
import { DateTime } from "luxon";

export default {
  data() {
    return {
      events: [],
      images: [],
      month: [],
      date: {
        month: null,
        year: null
      },
      now: null,
      modalNum: null,
      modalEvents: []
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
  created() {
    var now = DateTime.local();
    this.now = now;
    this.date.month = now.month;
    this.date.year = now.year;
    this.getMonth(this.date.month, this.date.year);
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
    getMonth(month, year) {
      // clear
      this.events = [];

      let daysInMonth;
      let weeksInMonth;

      let daysInPrev;

      let searchMonth;
      if (month < 10) {
        searchMonth = "0" + month;
      }

      // Get months events from firebase
      db.collection("events")
        .where("event.date.year", "==", year.toString())
        .where("event.date.month", "==", searchMonth || month.toString())
        .orderBy("event.date.day")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.id,
              title: doc.data().event.title,
              date: {
                day: parseInt(doc.data().event.date.day),
                month: parseInt(doc.data().event.date.month),
                year: parseInt(doc.data().event.date.year)
              },
              time: doc.data().event.time,
              email: doc.data().event.email,
              desc: doc.data().event.description,
              imageKey: doc.data().event.imageKey
            };
            this.events.push(data);
          });
        })
        .then(() => {
          // Clear old data
          this.month = [];
          this.images = [];

          // Setup DateTimes
          let DT = DateTime.local(year, month);
          let pDT = DateTime.local(year, month).plus({ months: -1 });

          // Compute number of days in next and previous month displayed
          let daysOfPrev = DT.weekday;
          let daysOfNext =
            DateTime.local(year, month, DT.daysInMonth).weekday + 1;

          if (daysOfPrev == 7) daysOfPrev = 0;
          if (daysOfNext == 8) daysOfNext = 1;

          daysOfNext = 7 - daysOfNext;

          // Compute total number of days displayed
          let totalDays = DT.daysInMonth + daysOfPrev + daysOfNext;

          // Compute number of weeks displayed
          let weeksInMonth = totalDays / 7;

          // Iterate through every day displayed
          let day = 0;
          for (let w = 0; w < weeksInMonth; w++) {
            let week = [];
            for (let d = 0; d < 7; d++) {
              // If day is previous month
              if (day < daysOfPrev) {
                week.push({
                  currentMonth: false,
                  num: pDT.daysInMonth - (daysOfPrev - day) + 1,
                  key: "d" + day
                });
              }
              // If day is next month
              else if (totalDays - day <= daysOfNext) {
                week.push({
                  currentMonth: false,
                  num: day + 1 - (totalDays - daysOfNext),
                  key: "d" + day
                });
              }
              // If day is this month
              else {
                // Get days events
                let events = this.events.filter(ev => {
                  return ev.date.day == day + 1 - daysOfPrev;
                });

                week.push({
                  currentMonth: true,
                  num: day - daysOfPrev + 1,
                  key: "d" + day,
                  events: events
                });
              }
              day += 1;
            }

            this.month.push({ days: week, key: "w" + w });
          }
        });
    },
    home() {
      let now = DateTime.local();

      this.date.month = now.month;
      this.date.year = now.year;

      this.getMonth(this.date.month, this.date.year);
    },
    nextMonth() {
      let dt = DateTime.local(this.date.year, this.date.month).plus({
        months: 1
      });
      this.date.month = dt.month;
      this.date.year = dt.year;

      this.getMonth(this.date.month, this.date.year);
    },
    prevMonth() {
      let dt = DateTime.local(this.date.year, this.date.month).plus({
        months: -1
      });
      this.date.month = dt.month;
      this.date.year = dt.year;

      this.getMonth(this.date.month, this.date.year);
    },
    calendarNum(num) {
      if (num < 10) {
        return "0" + num;
      } else {
        return num;
      }
    },
    monthName(num) {
      let names = [
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

      return names[num - 1];
    },
    displayDay(num, events) {
      this.modalNum = num;
      this.modalEvents = events;
    },
    archive(event) {
      let day = event.date.day;
      let month = event.date.month;
      let year = event.date.year;
      let now = DateTime.local();

      if (year != now.year) {
        if (year < now.year) return 0;
        if (year > now.year) return 2;
      } else if (month != now.month) {
        if (month < now.month) return 0;
        if (month > now.month) return 2;
      } else if (day != now.day) {
        if (day < now.day) return 0;
        if (day > now.day) return 2;
      } else {
        return 1;
      }
    },
    goTo(id) {
      $("#dayDetails").modal("toggle");
      $("#dayDetails").on("hidden.bs.modal", () => {
        this.$router.push("event/" + id);
      });
    }
  }
};
</script>

<style scoped>
.circular {
  width: 70px;
  height: 70px;
  border-radius: 100% !important;
  padding: 0;
  display: flex !important;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}

.card {
  border-radius: 12px;
}

#home {
  width: 40px;
  height: 40px;
  border-radius: 40px;
}

#home-wrapper {
  margin-top: -80px;
}

.day {
  height: 180px;
  min-width: 0;
  padding: 6px !important;
  transition: 0.5s;
}

.day .card-body {
  padding: 10px;
}

.day .day-action {
  transition: 0.5s;
}

.day .day-action:hover {
  transform: translateY(-5px);
}

.day-action {
  text-decoration: none !important;
}

.modal-content {
  border-radius: 12px !important;
}

.event {
  text-decoration: none !important;
}

.modal-desc {
  max-height: 124px;
  overflow-y: hidden;
}

@media only screen and (max-width: 800px) {
  .day {
    padding: 1px !important;
    font-size: 0.8em;
    font-weight: bold;
    height: 120px;
  }

  .day .card-body {
    padding: 5px;
  }
}
</style>
