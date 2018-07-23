<template>
  <div class="container">
    <div class="row my-2">
      <div class="col-lg-8 order-lg-2">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a href="" data-target="#profile" data-toggle="tab" class="nav-link active">Profile</a>
          </li>
          <li class="nav-item">
            <a href="" data-target="#messages" data-toggle="tab" class="nav-link">Messages</a>
          </li>
          <li class="nav-item">
            <a href="" data-target="#edit" data-toggle="tab" class="nav-link">Edit</a>
          </li>
        </ul>
        <div class="tab-content py-4">
          <div class="tab-pane active" id="profile">
            <h2 class="mb-3">{{ user.name }}</h2>
            <hr>
            <div class="row">
              <div class="col-md-6">
                <strong>About</strong>
                <p>
                  {{user.about}}
                </p>
                <strong>More info</strong>
                <p>
                  Website: <a target="_blank" :href="user.website">{{user.website}}</a>
                </p>
              </div>
              <div class="col-md-6">
                <h6>Recent badges</h6>
                <a href="#" class="badge badge-dark badge-pill">example1</a>
                <a href="#" class="badge badge-dark badge-pill">coffee</a>
                <a href="#" class="badge badge-dark badge-pill">examples</a>
                <a href="#" class="badge badge-dark badge-pill">more examples</a>
                <hr>
                <span class="badge badge-primary"><i class="fa fa-user"></i> n Followers</span>
                <span class="badge badge-success"><i class="fa fa-cog"></i> n Forks</span>
                <span class="badge badge-danger"><i class="fa fa-eye"></i> n Views</span>
              </div>
              <div class="col-md-12">

                <hr>
                <h5 class="mt-2"><span class="float-right badge badge-primary badge-pill">{{events.length}}</span>{{user.name}}'s Events:</h5>

                <ul class="list-group">
                  <router-link class="list-group-item card text-white bg-dark mb-1" v-for="event in events" v-bind:key="event.id" v-bind:to="{name: 'event-detail', params: {id: event.id}}">
                  <div>
                    <h5>{{event.title}}</h5>
                    <p>{{event.date.year}}-{{event.date.month}}-{{event.date.day}}</p>
                  </div>
                  </router-link>
                </ul>

                
              </div>
              <router-link to="/events/NewEvent" class="btn btn-primary btn-circular-lg mb-3"><i class="fa fa-plus"></i></router-link>
            </div>
            <!--/row-->
          </div>
          <div class="tab-pane" id="messages">
            <div class="alert alert-info alert-dismissable">
              <a class="panel-close close" data-dismiss="alert">×</a> This is an example bootstrap <strong>.alert</strong> Put Important message here.
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
              <tr>
              <tr>
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
          <div class="tab-pane" id="edit">
            <form role="form" @submit.prevent="writeUserData">
              <div class="form-group row">
                <label class="col-lg-3 col-form-label form-control-label">Username</label>
                <div class="col-lg-9">
                  <input class="form-control" type="text" placeholder="username"  v-model="user.name" required>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-3 col-form-label form-control-label">Email</label>
                <div class="col-lg-9">
                  <input class="form-control" type="email" placeholder="email@gmail.com" v-model="user.email" required>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-lg-3 col-form-label form-control-label">Website</label>
                <div class="col-lg-9">
                  <input class="form-control" type="url" value="" v-model="user.website">
                </div>
              </div>
              <div class="form-group">
                <label for="exampleFormControlTextarea1">About Yourself</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="user.about"></textarea>
              </div>
              <div class="form-group row">
                <div class="col-lg-9">
                  <input type="submit" class="btn btn-primary" value="Save Changes">
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-lg-4 order-lg-1 text-center">
        <img :src="user.photoUrl" class="mx-auto img-fluid img-circle d-block mb-2 shadow-sm" id="preview" alt="avatar">
        <div class="dUp file btn btn-primary">
          <small>Change <i class="fa fa-camera"></i></small>
          <input type='file' id="imgUp" class='bUp' accept="image/x-png,image/gif,image/jpeg" @change="loadFile" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../../Firebase/firebaseInit";
import firebase from "firebase/app";
export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        photoUrl: "",
        website: "",
        about: ""
      },
      events: []
    };
  },
  methods: {
    loadFile: function() {
      var input = document.querySelector(".bUp");
      var preview = document.querySelector("#preview");

      var imgURL = window.URL.createObjectURL(input.files[0]);
      this.preImg = imgURL;
      this.image = input.files[0];
    },
    writeUserData() {
      db
        .collection("users")
        .where("user.UserUID", "==", firebase.auth().currentUser.uid)
        .orderBy("event.date.month")
        .orderBy("event.date.day")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.update({
              user: {
                name: this.user.name,
                email: this.user.email,
                website: this.user.website,
                about: this.user.about,
                UserUID: firebase.auth().currentUser.uid,
                photo: this.user.photoUrl
              }
            });
          });
        });
    }
  },
  beforeRouteEnter(to, from, next) {
    db
      .collection("users")
      .where("user.UserUID", "==", firebase.auth().currentUser.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.user.name = doc.data().user.name;
            vm.user.email = doc.data().user.email;
            vm.user.photoUrl = doc.data().user.photo;
            vm.user.website = doc.data().user.website;
            vm.user.about = doc.data().user.about;
          });
        });
      });
  },
  created() {
    db
      .collection("events")
      .where("event.UserUID", "==", firebase.auth().currentUser.uid)
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
  }
};
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
  margin-top: 5px
}
</style>

