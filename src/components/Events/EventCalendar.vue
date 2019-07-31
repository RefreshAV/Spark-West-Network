<template>
  <div class="container">
    <div class="row mt-5 mb-3 d-flex justify-content-center">
      <div v-if="num.month != currentMonth || num.year != currentYear" class="col p-0" style="max-width:40px;"></div>
      <div class="col-auto">
        <div class="row">
          <div class="col text-center">{{ num.year }}</div>
        </div>
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
      <div v-if="num.month != currentMonth || num.year != currentYear" class="col-auto p-0 d-flex align-items-center">
        <button @click="home()" id="home" class="btn btn-warning">
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
          class="card h-100 bg-dark text-light day-action"
          v-if="day.currentMonth"
        >
          <div class="card-body">
            <div class="row w-100 m-0">
              <div class="col p-0">{{ calendarNum(day.num) }}</div>
            </div>
            <hr class="mt-1 mb-2" />
            <div v-for="dayEvent in day.events" :key="dayEvent.id" class="row w-100 m-0">
              <div class="col p-0">
                <span
                  v-if="!checkArchive(dayEvent.date.day,dayEvent.date.month,dayEvent.date.year)"
                  class="badge badge-warning badge-pill text-truncate w-100"
                >{{ dayEvent.title }}</span>
                <span
                  v-else
                  :class="{ 'badge':true, 'badge-primary':(checkArchive(dayEvent.date.day,dayEvent.date.month,dayEvent.date.year) == 2), 'badge-info':(checkArchive(dayEvent.date.day,dayEvent.date.month,dayEvent.date.year) == 1), 'badge-pill':true, 'text-truncate':true, 'w-100':true }"
                >{{ dayEvent.title }}</span>
              </div>
            </div>
          </div>
        </a>

        <div class="card h-100 bg-secondary text-light" v-if="!day.currentMonth">
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
        <router-link to="/events/NewEvent" class="btn btn-primary circular my-3">
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
            <h2 class="modal-title">{{ monthName }} {{ dayNum }}</h2>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">
                <i class="fa fa-times"></i>
              </span>
            </button>
          </div>
          <div class="modal-body">
            <!-- Events -->
            <div
              v-for="(event, index) in dayEvents"
              :key="event.id"
              :class="{ 'row':true, 'mb-2':(index < dayEvents.length - 1) }"
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
                          <span
                            v-if="!checkArchive(event.date.day,event.date.month,event.date.year)"
                            class="badge badge-pill badge-warning"
                          >Archived</span>
                          <span v-else class="badge badge-pill badge-secondary">{{ event.time }}</span>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div class="card-body">{{ event.desc }}</div>
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

export default {
  data() {
    return {
      events: [],
      images: [],
      month: [],
      monthName: null,
      currentDay: null,
      currentMonth: null,
      currentYear: null,
      num: {
        month: null,
        year: null
      },
      dayNum: null,
      dayEvents: []
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

    let month;
    this.num.month = d.getMonth();
    this.num.year = d.getFullYear();
    this.currentDay = d.getDate();
    this.currentMonth = d.getMonth();
    this.currentYear = d.getFullYear();
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
      let searchMonth;
      if (month + 1 < 10) {
        searchMonth = "0" + (month + 1);
      } else {
        searchMonth = (month + 1).toString();
      }

      this.events = [];
      db.collection("events")
        .where("event.date.year", "==", year.toString())
        .where("event.date.month", "==", searchMonth)
        .orderBy("event.date.day")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            let end = "";
            if (doc.data().event.description.length > 100) {
              end = " . . .";
            }
            const data = {
              id: doc.id,
              title: doc.data().event.title,
              date: doc.data().event.date,
              time: doc.data().event.time,
              email: doc.data().event.email,
              desc: doc.data().event.description.substring(0, 100) + end,
              imageKey: doc.data().event.imageKey
            };
            this.events.push(data);
          });
        })
        .then(() => {
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

          let daysInPrevious;
          if (month - 1 < 0) {
            daysInPrevious = new Date(year - 1, 12, 0).getDate();
          } else {
            daysInPrevious = new Date(year, month, 0).getDate();
          }

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
            let lmCount = 0;
            let lm = false;
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
                    lm = true;
                    lmCount++;
                  } else {
                    let events = this.events.filter(ev => {
                      if (count < 10) {
                        return ev.date.day === this.calendarNum(count);
                      } else {
                        return ev.date.day === count.toString();
                      }
                    });
                    week.days.push({
                      key: i * k + "d",
                      num: count,
                      currentMonth: true,
                      events: events
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
                    lm = true;
                    lmCount++;
                  } else {
                    let events = this.events.filter(ev => {
                      if (count < 10) {
                        return ev.date.day === this.calendarNum(count);
                      } else {
                        return ev.date.day === count.toString();
                      }
                    });
                    week.days.push({
                      key: i * k + "d",
                      num: count,
                      currentMonth: true,
                      events: events
                    });
                    count++;
                  }
                }
              } else if (count > daysInCurrent) {
                week.days.push({
                  key: i * k + "d",
                  num: count - daysInCurrent,
                  currentMonth: false
                });

                count++;
                if (k == 1) {
                  emptyWeek = true;
                }
              } else {
                let events = this.events.filter(ev => {
                  if (count < 10) {
                    return ev.date.day === this.calendarNum(count);
                  } else {
                    return ev.date.day === count.toString();
                  }
                });
                week.days.push({
                  key: i * k + "d",
                  num: count,
                  currentMonth: true,
                  events: events
                });
                count++;
              }
            }
            if (lm) {
              for (let j = 0; j < lmCount; j++) {
                week.days[j].num = daysInPrevious - (lmCount - j) + 1;
              }
            }
            if (!emptyWeek) {
              allDays.push(week);
            }
          }

          this.month = allDays;
          this.monthName = monthNames[month];
        });
    },
    nextMonth() {
      var date;
      if (this.num.month + 1 >= 12) {
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
          month: 11
        };
      } else {
        date = {
          year: this.num.year,
          month: this.num.month - 1
        };
      }
      this.num = date;
    },
    calendarNum(num) {
      if (num < 10) {
        return "0" + num;
      } else {
        return num;
      }
    },
    displayDay(num, events) {
      this.dayNum = num;
      this.dayEvents = events;
    },
    checkArchive(d, m, y) {
      let day = parseInt(d);
      let month = parseInt(m);
      let year = parseInt(y);
      if (month == this.currentMonth + 1 && year == this.currentYear) {
        if (day == this.currentDay) {
          return 2;
        } else {
          return 1;
        }
      } else {
        if (year < this.currentYear) {
          return 0;
        } else {
          if (month < this.currentMonth + 1) {
            return 0;
          } else {
            return 1;
          }
        }
      }
    },
    goTo(id) {
      $("#dayDetails").modal("toggle");
      $("#dayDetails").on("hidden.bs.modal", () => {
        this.$router.push("event/" + id);
      });
    },
    home() {
      this.num.year = this.currentYear
      this.num.month = this.currentMonth
    }
  }
};
</script>

<style scope>
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
