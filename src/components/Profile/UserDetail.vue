<template>
  <div class="container">
    <div class="row my-2 mt-5">
      <div class="col-lg-4 order-lg-1 text-center">
        <img
          :src="img"
          class="mx-auto img-fluid img-circle d-block mb-2 shadow-sm"
          id="preview"
          alt="avatar">
      </div>
      <div class="col-lg-8 order-lg-2">
        <div class="tab-content py-4">
          <div
            class="tab-pane active"
            id="profile">
            <h2 class="mb-3">{{ name }}</h2>
            <hr>
            <div class="row">
              <div class="col-md-6">
                <strong>About</strong>
                <p>
                  {{ about }}
                </p>
                <strong>More info</strong>
                <p>
                  Website: <a
                    target="_blank"
                    :href="website">{{ website }}</a>
                </p>
              </div>
              <div class="col-md-6">
                <h6>Recent badges</h6>
                <a
                  href="#"
                  class="badge badge-dark badge-pill">example1</a>
                <a
                  href="#"
                  class="badge badge-dark badge-pill">coffee</a>
                <a
                  href="#"
                  class="badge badge-dark badge-pill">examples</a>
                <a
                  href="#"
                  class="badge badge-dark badge-pill">more examples</a>
                <hr>
                <span class="badge badge-primary"><i class="fa fa-user"/> n Followers</span>
                <span class="badge badge-success"><i class="fa fa-cog"/> n Forks</span>
                <span class="badge badge-danger"><i class="fa fa-heart"/> {{ likedEvents.length }} Liked Events</span>
              </div>
              <div class="col-md-12">

                <hr>
                <h5 class="mt-2"><span class="float-right badge badge-primary badge-pill"><i class="fa fa-calendar"/> {{ events.length }}</span>{{ name }}'s Events:</h5>

                <ul class="list-group">
                  <router-link
                    class="list-group-item card text-white bg-dark mb-1"
                    v-for="event in currentPage"
                    :key="event.id"
                    :to="{name: 'event-detail', params: {id: event.id}}">
                    <div>
                      <h5>{{ event.title }}</h5>
                      <p>{{ event.date.year }}-{{ event.date.month }}-{{ event.date.day }}</p>
                    </div>
                  </router-link>

                  <li
                    v-if="events.length == 0"
                    class="list-group-item d-flex justify-content-center align-items-center"
                    style="height:400px">
                    <h3>Nothing Here!</h3>
                  </li>
                </ul>

              </div>

              <div class="col-md-12 d-flex justify-content-end">
                <div class="btn-group">
                  <button
                    class="btn btn-outline-primary"
                    @click="lastPage"><i class="fa fa-angle-double-left"/></button>
                  <input
                    id="page"
                    type="number"
                    class="btn btn-outline-primary"
                    v-model="page"
                    style="max-width:4rem;"
                    min="0"
                    :max="pages.length"
                    readonly>
                  <button
                    class="btn btn-outline-primary"
                    @click="nextPage"><i class="fa fa-angle-double-right"/></button>
                </div>
              </div>

            </div>
            <!--/row-->
          </div>
          <div
            class="tab-pane"
            id="messages">
            <div class="alert alert-info alert-dismissable">
              <a
                class="panel-close close"
                data-dismiss="alert">×</a> This is an example bootstrap <strong>.alert</strong> Put Important message here.
            </div>
            <table class="table table-hover table-striped">
              <tbody>
                <tr>
                  <td>
                    <span class="float-right font-weight-bold">3 hrs ago</span> New Weekly events updated
                  </td>
                </tr>
                <td>
                  <span class="float-right font-weight-bold">9/10</span> Porttitor vitae ultrices quis, dapibus id dolor. Morbi venenatis lacinia rhoncus.
                </td>
                <tr/><tr>
                  <td>
                    <span class="float-right font-weight-bold">9/4</span> Vestibulum tincidunt ullamcorper eros eget luctus.
                  </td>
                </tr>
                <tr>
                  <td>
                    <span class="float-right font-weight-bold">9/4</span> Maxamillion ais the fix for tibulum tincidunt ullamcorper eros.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../../Firebase/firebaseInit'
import firebase from 'firebase'
import 'firebase/firestore'
export default {
  data () {
    return {
      name: null,
      email: null,
      img: null,
      about: null,
      website: null,
      UserUID: null,
      events: [],
      likedEvents: [],
      page: 1,
      pages: [],
      currentPage: [],
      pageLength: 4
    }
  },
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: 'User',
    meta: [
      { vmid: 'description', name: 'description', content: 'The description of a user on Spark West Network' }
    ]
  },
  metaInfo () {
    return {
      title: this.name
    }
  },
  beforeRouteEnter (to, from, next) {
    var UserUID

    db.collection('users')
      .where(firebase.firestore.FieldPath.documentId(), '==', to.params.id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.name = doc.data().user.name
            vm.email = doc.data().user.email
            vm.img = doc.data().user.photo
            vm.about = doc.data().user.about
            vm.website = doc.data().user.website
            UserUID = doc.data().user.UserUID
            if (UserUID == firebase.auth().currentUser.uid) {
              next('/Profile')
            }
          })
        })
      })
  },
  mounted () {
    // get user info
    db.collection('users')
      .where(
        firebase.firestore.FieldPath.documentId(),
        '==',
        this.$route.params.id
      )
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.name = doc.data().user.name
          this.email = doc.data().user.email
          this.img = doc.data().user.photo
          this.about = doc.data().user.about
          this.website = doc.data().user.website
          this.UserUID = doc.data().user.UserUID
        })
      })
  },
  watch: {
    page: 'updateCurrent',
    UserUID: 'getEvents',
    events: 'createPages'
  },
  methods: {
    getEvents () {
      // get users eventstranslate
      db.collection('events')
        .where('event.UserUID', '==', this.UserUID)
        .orderBy('event.date.year')
        .orderBy('event.date.month')
        .orderBy('event.date.day')
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
            }
            this.events.push(data)
          })
        })

      // get liked events
      db.collection('events')
        .where('likedBy', 'array-contains', this.UserUID)
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
            }
            this.likedEvents.push(data)
          })
        })
    },
    nextPage () {
      if (this.page < this.pages.length) {
        this.page++
      }
    },
    lastPage () {
      if (this.page > 1) {
        this.page--
      }
    },
    createPages () {
      var length = Math.ceil(this.events.length / this.pageLength)
      for (var i = 0; i < length; i++) {
        if (this.events.slice(i * 4) < 4) {
          this.pages.push(this.events.slice(i * this.pageLength))
        } else {
          this.pages.push(
            this.events.slice(
              i * this.pageLength,
              i * this.pageLength + this.pageLength
            )
          )
        }
      }
      this.currentPage = this.pages[0]
    },
    updateCurrent () {
      document.getElementById('page').readOnly = true

      this.currentPage = []
      this.currentPage = this.pages[this.page - 1]
    }
  }
}
</script>

<style>
.dUp {
  position: relative;
  overflow: hidden;
}

.bUp {
  position: absolute;
  font-size: 50px;
  opacity: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.imgUp {
  margin-top: 20px;
  margin-left: 5px;
  margin-bottom: 5px;
  font-size: 15px;
}

#preview {
  width: 150px;
  height: 150px;
  border-radius: 100%;
}
.card p {
  margin: 0px;
}

.btn-circular-lg {
  width: 70px;
  height: 70px;
  padding: 10px 16px;
  border-radius: 35px;
  font-size: 40px;
  line-height: 1.33;
  margin-top: 5px;
}

.btn-group input {
  max-width: 5rem;
  align-content: center;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
