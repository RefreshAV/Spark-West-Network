<template>
    <div id="newEvent" class="container">
        <h3>Create New Event</h3>
    <form>
      <div class="row">
        <div class="col-md-6">

          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" id="title" class="form-control" autocomplete="off" v-model.lazy="eventData.title">
          </div>
          <div class="form-group">
            <label for="eventDate">Event Date</label>
            <input id="eventDate" type="text" class="form-control" v-model.lazy="eventData.date">
          </div>
          <div class="form-group">
            <label for="eventTime">Event Time</label>
            <input type="text" id="eventTime" class="form-control" autocomplete="off" v-model.lazy="eventData.time">
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" class="form-control" autocomplete="off" v-model.lazy="eventData.email">
          </div>
          <label for="message">Description</label><br>
          <!-- Interpolation between <textarea>{{ test }}</textarea> doesn't work!-->
          <textarea id="message" rows="5" class="form-control" maxlength="500" v-model="eventData.description"></textarea>
          <p class="counter">Characters: <span class="cNum">{{ characters }}</span></p>
        </div>
        <div class="col-md-6">

          <!-- IMAGE UPLOAD -->
          <img id="preview" v-bind:src="preImg" alt="" />
          <div class="col-xs-12">
            <div class="dUp file btn btn-primary">
              Browse Images
              <input type='file' id="imgUp" class='bUp' accept="image/x-png,image/gif,image/jpeg" @change="loadFile" />
            </div>
          </div>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <button type="button" class="btn btn-danger" @click="clear">
              Clear
            </button>
          <button type="button" class="btn btn-info" @click="saveExit">
              Save & Exit
            </button>
          <button class="btn btn-primary" @click.prevent="submit">
              Submit!
            </button>
        </div>
      </div>
    </form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      eStat: "",
      loggedIn: false,
      eventData: {
        title: "",
        date: "",
        time: "",
        email: "",
        description: ""
      },
      isSubmitted: false,
      characters: 500,
      preImg: "http://via.placeholder.com/300x300",
      image: "http://via.placeholder.com/300x300",
      account: {
        user: "",
        pass: ""
      }
    };
  },
  computed: {
    message() {
      return this.eventData.description;
    }
  },

  watch: {
    message() {
      console.log("counting characters");

      var char = this.eventData.description.length;
      var maxChar = 500;
      this.characters = maxChar - char;

      console.log(this.characters);
    }
  },

  methods: {
    signUp() {
      const user = this.account.user;
      const pass = this.account.pass;

      var email;

      auth()
        .createUserWithEmailAndPassword(user, pass)
        .catch(function(error) {})
        .then(
          function() {
            email = true;
          },
          function(error) {
            console.error("Sign up Error", error);
            email = false;
          }
        );

      if (email) {
        this.eStat = "";
      } else {
        this.eStat = "email in use!";
      }
    },
    logIn() {
      const user = this.account.user;
      const pass = this.account.pass;
      var userRef = auth().currentUser;
      auth()
        .signInWithEmailAndPassword(user, pass)
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        })
        .then(
          function() {
            console.log("Logged in");
          },
          function(error) {
            console.error("Log in error", error);
          }
        );
      if (userRef) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    },
    logOut() {
      var log;
      auth()
        .signOut()
        .then(
          function() {
            console.log("Signed Out");
          },
          function(error) {
            console.error("Sign Out Error", error);
          }
        );

      var user = auth().currentUser;

      if (user) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    },
    submit() {
      this.isSubmitted = true;
      console.log("Submited to Firebase!");
      eventRef.push({
        eventData: this.eventData,
        isSubmitted: this.isSubmitted
      });

      var file = this.image;
      var ref = storage.ref("Images/Events/" + this.eventData.title);
      var task = ref.put(file);

      task.on(
        "state_changed",
        function progress(snapshot) {
          var percentage =
            snapshot.bytesTransferred / snapshot.totalBytes * 100;
        },
        function error(err) {},
        function complete() {
          console.log("Submited to firebase!");
        }
      );
    },
    saveExit() {
      this.isSubmitted = false;
      console.log("Saved to Firebase!");
      eventDataRef.push({
        eventData: this.eventData,
        isSubmitted: this.isSubmitted
      });
    },
    clear() {
      this.eventData.title = "";
      this.eventData.date = "";
      this.eventData.time = "";
      this.eventData.email = "";
      this.eventData.description = "";
      this.eventData.image = "http://via.placeholder.com/300x300";
    },
    loadFile: function() {
      var input = document.querySelector(".bUp");
      var preview = document.querySelector("#preview");

      var imgURL = window.URL.createObjectURL(input.files[0]);

      console.log("File uploaded");
      this.preImg = imgURL;
      this.image = input.files[0];
    }
  }
};
</script>

<style>
#preImg {
  width: 500px;
  height: 500px;
  border: 5px, black, solid;
}

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

.c .imgUp {
  margin-top: 20px;
  margin-left: 5px;
  margin-bottom: 5px;
  font-size: 15px;
}

#preview {
  border: 5px;
  border-radius: 5px;
  margin-bottom: 10px;
  height: 300px;
}
</style>


