<template>
  <div class="container">
    <!-- <div class="row">
      <div class="col p-0">
        <ul class="list-group" v-if="display">
          <div class="d-flex justify-content-center" v-if="events.length == 0">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Ajax_loader_metal_512.gif"
              class="loading"
              style="width:50px; height: 50px;"
            />
          </div>
          <router-link
            v-for="(event) in events"
            :key="event.id"
            class="list-group-item card text-white bg-dark mb-3"
            :to="{name: 'event-detail', params: {id: event.id}}"
          >
            <h1 class="card-header">{{ event.date.day }}</h1>
            <div class="card-body">
              <h5 class="card-title">{{ event.title }}</h5>
              <div class="card-text" v-html="event.desc" v-line-clamp="4"></div>
            </div>
          </router-link>
        </ul>
      </div>
    </div>-->

    <div class="row mt-5 mb-3 d-flex justify-content-center">
      <div
        v-if="num.month != currentMonth || num.year != currentYear"
        class="col p-0"
        style="max-width:40px;"
      ></div>
      <div class="col-auto">
        <div class="row">
          <div class="col text-center">{{ num.year }}</div>
        </div>
        <div class="row">
          <div class="col">
            <button class="btn btn-primary" @click="prevWeek">
              <i class="fas fa-arrow-left"></i>
            </button>
          </div>
          <div class="col">
            <h1>{{ monthName }}</h1>
          </div>
          <div class="col">
            <button class="btn btn-primary" @click="nextWeek">
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
      <div
        v-if="num.month != currentMonth || num.year != currentYear"
        class="col-auto p-0 d-flex align-items-center"
      >
        <button @click="home()" id="home" class="btn btn-warning">
          <i class="fas fa-calendar-alt"></i>
        </button>
      </div>
    </div>

    <!-- <div class="row my-4">
      <div class="col p-0">
        <div class="card bg-dark text-light">
          <h1 class="card-header">Day</h1>
          <div class="card-body">
            <h5 class="card-title">Event Title</h5>
            <div>Event Description</div>
            <div class="card-text" v-html="event.desc" v-line-clamp="4"></div>
          </div>
        </div>
      </div>
    </div>-->

    <div v-for="(day, i) in week" :key="day.key" class="row mb-3">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <!-- Week day -->
              <div class="col-auto">
                <div class="card bg-light border-0 week-date">
                  <div class="card-body">
                    <h1 class="mb-0">{{ calendarNum(day.num) }}</h1>
                    <p>{{ weekDay(i) }}</p>
                  </div>
                </div>
              </div>
              <!-- Event list -->
              <div class="col">
                <div v-if="day.events == 0 || !day.events" class="card bg-light border-0 h-100">
                  <div class="card-body d-flex justify-content-center align-items-center">
                    <h3 class="text-muted font-italic">No events today</h3>
                  </div>
                </div>
                <div v-for="event in day.events" :key="event.id" class="row mb-3">
                  <div class="col">
                    <div class="card bg-dark text-light shadow event">
                      <div class="card-body">
                        <div class="row">
                          <div class="col">
                            <h2>{{ event.title }}</h2>
                          </div>
                          <div class="col d-flex justify-content-end">
                            <h3>
                              <p class="badge badge-primary badge-pill">{{ event.time }}</p>
                            </h3>
                          </div>
                        </div>
                        <div class="card-text" v-html="event.desc" v-line-clamp="2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <router-link to="/events/new" class="btn btn-primary circular my-3">
          <i class="fa fa-plus" />
        </router-link>
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
      week: [],
      monthName: null,
      currentDay: null,
      currentWeek: null,
      currentMonth: null,
      currentYear: null,
      num: {
        month: null,
        year: null,
        day: null
      },
      weekNum: null,
      weeksInMonth: null,
      setPrevMonth: false
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

          let currentWeek = null;

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
          this.weeksInMonth = weeksInMonth - 1;
          if (this.setPrevMonth) {
            this.weekNum = this.weeksInMonth - 1;
            this.setPrevMonth = false;
          }

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
                      currentMonth: false,
                      currentDay: false
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
                    let currentDay = this.currentDay == count;
                    if (currentDay) {
                      currentWeek = i;
                    }
                    week.days.push({
                      key: i * k + "d",
                      num: count,
                      currentMonth: true,
                      currentDay: currentDay,
                      events: events
                    });
                    count++;
                  }
                } else {
                  if (i * k < startDay - 1) {
                    week.days.push({
                      key: i * k + "d",
                      num: "lastMonth",
                      currentMonth: false,
                      currentDay: false
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
                    let currentDay = this.currentDay == count;
                    if (currentDay) {
                      currentWeek = i;
                    }
                    week.days.push({
                      key: i * k + "d",
                      num: count,
                      currentMonth: true,
                      currentDay: currentDay,
                      events: events
                    });
                    count++;
                  }
                }
              } else if (count > daysInCurrent) {
                week.days.push({
                  key: i * k + "d",
                  num: count - daysInCurrent,
                  currentMonth: false,
                  currentDay: false
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
                let currentDay = this.currentDay == count;
                if (currentDay) {
                  currentWeek = i;
                }
                week.days.push({
                  key: i * k + "d",
                  num: count,
                  currentMonth: true,
                  currentDay: currentDay,
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
          if (this.currentWeek == null) {
            this.currentWeek = currentWeek - 1;
            this.week = this.month[this.currentWeek].days;
            this.weekNum = this.currentWeek;
          }
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
    nextWeek() {
      if (this.weekNum + 1 > this.weeksInMonth - 1) {
        this.weekNum = 0;
        console.log("Next Month");
        this.nextMonth();
        this.week = this.month[this.weekNum].days;
      } else {
        console.log("Next Week");
        this.weekNum += 1;
        this.week = this.month[this.weekNum].days;
      }
    },
    prevWeek() {
      if (this.weekNum - 1 < 0) {
        console.log("Prev Month");
        this.setPrevMonth = true;
        this.prevMonth();
        this.week = this.month[this.weekNum].days;
      } else {
        console.log("Prev Week");
        this.weekNum -= 1;
        this.week = this.month[this.weekNum].days;
      }
    },
    calendarNum(num) {
      if (num < 10) {
        return "0" + num;
      } else {
        return num;
      }
    },
    weekDay(num) {
      let days = ["Sun", "Mon", "Tus", "Wed", "Thu", "Fri", "Sat"];
      return days[num];
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
    home() {
      this.num.year = this.currentYear;
      this.num.month = this.currentMonth;
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
  border-radius: 12px !important;
}

.week-date {
  max-width: 120px;
}

.week-date p {
  font-size: 24px;
}

.event {
  max-height: 140px;
  overflow-y: hidden;
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
