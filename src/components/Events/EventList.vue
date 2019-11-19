<template>
  <div class="container">
    <!-- list navigation -->
    <div class="navigation row mt-5 mb-3 mx-0 d-none d-md-flex justify-content-center">
      <div
        v-if="date.month != now.c.month || date.year != now.c.year || weekOfMonth != nowWOM"
        class="col p-0"
        style="max-width:40px;"
      ></div>
      <div class="col-auto">
        <div class="row">
          <div class="col text-center">{{ date.year }}</div>
        </div>
        <div class="row">
          <div class="col">
            <button id="prevWeek" class="btn btn-primary btn-circle-sm" @click="prevWeek()">
              <i class="fas fa-arrow-left"></i>
            </button>
          </div>
          <div class="col">
            <h1>{{ monthName(date.month) }}</h1>
          </div>
          <div class="col">
            <button class="btn btn-primary btn-circle-sm" @click="nextWeek()">
              <i id="nextWeek" class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
      <div
        v-if="date.month != now.c.month || date.year != now.c.year || weekOfMonth != nowWOM"
        class="col-auto p-0 d-flex align-items-center"
      >
        <button @click="home()" id="home" class="btn btn-warning animated fadeIn">
          <i class="fas fa-calendar-alt text-light fa-lg"></i>
        </button>
      </div>

      <div class="view-btn">
        <router-link to="/events/calendar/" class="btn btn-default border">
          <i class="fas fa-th"></i>
        </router-link>
      </div>
    </div>

    <!-- list navigation mobile -->
    <div class="navigation row mt-5 mb-3 mx-3 d-block d-md-none">
      <div class="col">
        <div class="row">
          <div class="col text-center">{{ date.year }}</div>
        </div>
        <div class="row">
          <div class="col text-center">
            <h1>{{ monthName(date.month) }}</h1>
          </div>
        </div>
        <div class="row d-flex justify-content-center">
          <div class="col-auto">
            <div class="row">
              <div
                v-if="date.month != now.c.month || date.year != now.c.year || weekOfMonth != nowWOM"
                class="col p-0"
                style="max-width:40px;"
              ></div>
              <div class="col-auto">
                <div class="row">
                  <div class="col">
                    <button
                      id="prevWeek-sm"
                      class="btn btn-primary btn-circle-sm"
                      @click="prevWeek()"
                    >
                      <i class="fas fa-arrow-left"></i>
                    </button>
                  </div>

                  <div class="col">
                    <button
                      id="nextWeek-sm"
                      class="btn btn-primary btn-circle-sm"
                      @click="nextWeek()"
                    >
                      <i class="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="view-btn">
        <div
          v-if="date.month != now.c.month || date.year != now.c.year || weekOfMonth != nowWOM"
          class="row mb-2"
        >
          <div class="col-auto p-0 d-flex align-items-center">
            <button @click="home()" id="home" class="btn btn-warning animated fadeIn">
              <i class="fas fa-home text-light"></i>
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col p-0">
            <router-link to="/events/calendar/" class="btn btn-default border">
              <i class="fas fa-th"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- day list -->
    <div class="mb-3" v-if="month[weekOfMonth - 1]">
      <div v-for="day in month[weekOfMonth - 1].days" :key="day.key" class="row mb-3">
        <div class="col">
          <div v-if="day.currentMonth" class="card animated fadeIn">
            <div class="card-body pb-1">
              <div class="row">
                <div class="col-12 col-md-auto mb-3">
                  <div class="card">
                    <div
                      :class="{'card-body':true, 
                      'bg-light':archive(day.num, date.month, date.year) != 1, 
                      'bg-primary':archive(day.num, date.month, date.year) == 1, 
                      'text-light':archive(day.num, date.month, date.year) == 1}"
                    >
                      <h3 class="m-0">{{ calendarNum(day.num) }}</h3>
                    </div>
                  </div>
                </div>

                <!-- event list -->
                <div class="col">
                  <div v-for="event in day.events" :key="event.id">
                    <div class="row">
                      <div class="col mb-3">
                        <div class="card event">
                          <router-link
                            :to="'event/' + event.id"
                            class="card-body p-0 bg-dark shadow text-light animated fadeIn"
                          >
                            <div class="row h-100 w-100 m-0">
                              <div class="col py-3">
                                <h5 class="m-0 d-sm-flex d-md-none mb-3">
                                  <span
                                    :class="{'badge':true, 'badge-pill':true, 'shadow':true, 'badge-primary':archive(day.num, date.month, date.year) == 1, 'badge-info':archive(day.num, date.month, date.year) == 2, 'badge-warning':archive(day.num, date.month, date.year) == 0}"
                                  >{{event.time}}</span>
                                </h5>
                                <h5 class="m-0">{{ event.title }}</h5>
                              </div>
                              <div
                                class="col-4 col-lg-3 event-img py-3 d-flex justify-content-end"
                                :style="'background: url(' + event.image + ');'"
                              >
                                <h5 class="m-0 d-none d-md-inline">
                                  <span
                                    :class="{'badge':true, 'badge-pill':true, 'shadow':true, 'badge-primary':archive(day.num, date.month, date.year) == 1, 'badge-info':archive(day.num, date.month, date.year) == 2, 'badge-warning':archive(day.num, date.month, date.year) == 0}"
                                  >{{event.time}}</span>
                                </h5>
                              </div>
                            </div>
                          </router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- other month day placeholder -->
          <div v-else class="card bg-light animated fadeIn">
            <div class="card-body p-2">
              <div class="row">
                <div class="col-auto">
                  <div class="card">
                    <div class="card-body p-2 bg-light">
                      <h5 class="m-0">{{ calendarNum(day.num) }}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- week loading placeholder -->
    <div v-else>
      <div v-for="(d, i) in 7" :key="i" class="row mb-3">
        <div class="col">
          <div class="card bg-dark">
            <div class="card-body">
              <div class="row">
                <div class="col-auto">
                  <div class="card bg-dark text-secondary">
                    <div class="card-body p-2">
                      <h5 class="m-0">00</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <router-link to="new/" href class="btn btn-success btn-circle d-none d-md-flex">
          <i class="fa fa-plus" aria-hidden="true"></i>
        </router-link>
        <router-link to="new/" href class="btn btn-success btn-lg btn-block d-block d-md-none">
          <i class="fa fa-plus" aria-hidden="true"></i>
        </router-link>
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
      weekOfMonth: null,
      date: {
        day: null,
        month: null,
        year: null
      },
      now: null,
      nowWOM: null
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
    let now = DateTime.local();
    this.now = now;
    this.date.day = now.day;
    this.date.month = now.month;
    this.date.year = now.year;
    this.getMonth(now.day, now.month, now.year, 3);
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
    getMonth(day, month, year, offset) {
      // clear
      this.events = [];

      let daysInMonth;
      let weeksInMonth;

      let currentDay = day;

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
              image:
                "https://firebasestorage.googleapis.com/v0/b/spark-west.appspot.com/o/events%2F" +
                doc.data().event.imageKey +
                "?alt=media"
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

          let weekOfMonth = Math.floor(
            (currentDay + daysOfPrev) / weeksInMonth
          );

          this.weekOfMonth = weekOfMonth;

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
          if (offset == 1) this.weekOfMonth = 1;
          else if (offset == 2) this.weekOfMonth = 5;
          else if (offset == 3) this.nowWOM = this.weekOfMonth;

          // Re-enable buttons
          $("#prevWeek").attr("disabled", false);
          $("#nextWeek").attr("disabled", false);
          $("#prevWeek-sm").attr("disabled", false);
          $("#nextWeek-sm").attr("disabled", false);
        });
    },
    nextWeek() {
      if (this.weekOfMonth < this.month.length) this.weekOfMonth += 1;
      else {
        // Disable buttons
        $("#prevWeek").attr("disabled", true);
        $("#nextWeek").attr("disabled", true);
        $("#prevWeek-sm").attr("disabled", true);
        $("#nextWeek-sm").attr("disabled", true);

        let dt = DateTime.local(this.date.year, this.date.month).plus({
          months: 1
        });

        this.date.year = dt.year;
        this.date.month = dt.month;
        this.date.day = dt.day;

        this.getMonth(dt.day, dt.month, dt.year, 1);
      }
    },
    prevWeek() {
      if (this.weekOfMonth > 1) this.weekOfMonth -= 1;
      else {
        // Disable buttons
        $("#prevWeek").attr("disabled", true);
        $("#nextWeek").attr("disabled", true);
        $("#prevWeek-sm").attr("disabled", true);
        $("#nextWeek-sm").attr("disabled", true);

        let dt = DateTime.local(this.date.year, this.date.month).plus({
          months: -1
        });

        this.date.year = dt.year;
        this.date.month = dt.month;
        this.date.day = dt.day;

        this.getMonth(dt.day, dt.month, dt.year, 2);
      }
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
    weekDay(num) {
      let days = ["Sun", "Mon", "Tus", "Wed", "Thu", "Fri", "Sat"];
      return days[num];
    },
    archive(d, m, y) {
      let day = d;
      let month = m;
      let year = y;
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
    home() {
      this.date.day = this.now.day;
      this.date.month = this.now.month;
      this.date.year = this.now.year;
      this.getMonth(this.now.day, this.now.month, this.now.year);
    }
  }
};
</script>

<style scoped>
.navigation {
  position: relative;
}

.view-btn {
  position: absolute;
  bottom: 0;
  right: 0;
}

.btn-end {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
}

.btn-circle {
  border-radius: 100%;
  height: 64px;
  width: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-circle-sm {
  border-radius: 100%;
  height: 42px;
  width: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  border-radius: 12px !important;
}

.card * {
  border-radius: 12px !important;
}

.week-date {
  max-width: 120px;
}

.week-date p {
  font-size: 24px;
}

.event {
  transition: all 0.5s;
}

.event:hover {
  transform: translateY(-5px);
}

.event * {
  text-decoration: none !important;
}

.event .row {
  min-height: 73px;
}

.event-img {
  background: white;
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}

@media (max-width: 990px) {
  .week-date h1 {
    font-size: 30px !important;
  }

  .week-date p {
    font-size: 16px !important;
  }
}
</style>
