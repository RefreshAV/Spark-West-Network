<template>
  <div class="container mt-3">
    <form @submit.prevent="submit">
      <div class="row mb-3">
        <div class="col">
          <h1>New Organization</h1>
        </div>
      </div>
      <div class="row">
        <!-- Image Uploads -->
        <div class="col-auto">
          <div class="row">
            <div class="col-auto text-center">
              <h4>Logo</h4>
              <img
                :src="preImg"
                class="img-fluid rounded d-block mb-2 shadow-sm"
                id="preview"
                alt="profile Picture"
              >
              <div class="dUp file btn btn-primary">
                <small>
                  Change
                  <i class="fa fa-camera"/>
                </small>
                <input
                  type="file"
                  id="imgUp"
                  class="bUp"
                  accept="image/x-png, image/gif, image/jpeg"
                  @change="loadFile"
                  required
                >
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <h4>Banner</h4>
          <div id="banner" class="rounded shadow-sm mb-3">
            <!-- <div id="preBadge" class="badge badge-warning badge-pill shadow-sm">preview</div> -->
            <img id="bannerImg" :src="bannerPreImg" alt="Banner Image" class="img-fluid dUp file">
            <input
              type="file"
              id="imgUp"
              class="bUp2"
              accept="image/x-png, image/gif, image/jpeg"
              @change="bannerUpload"
              required
            >
          </div>

          <div class="row">
            <div class="col">
              <div class="row">
                <div class="form-group col">
                  <label>Organization Name</label>
                  <input
                    class="form-control form-control"
                    type="text"
                    v-model="name"
                    required
                  >
                </div>
              </div>
              <div class="row">
                <div class="form-group col-md-6">
                  <label>Website</label>
                  <input
                    type="url"
                    class="form-control mb-2"
                    placeholder="http://example.com"
                    v-model="website"
                  >
                </div>
              </div>
              <div class="row">
                <div class="form-group col">
                  <label>Description</label>
                  <textarea
                    id="desc"
                    rows="5"
                    class="form-control"
                    placeholder="A description of your organization"
                    v-model="description"
                    required
                  />
                </div>
                <div class="col">
                  <div class="form-group">
                    <label>Contact Info</label>
                    <input
                      type="email"
                      class="form-control mb-2"
                      placeholder="Email"
                      v-model="email"
                      required
                    >
                    <input
                      type="tel"
                      class="form-control mb-2"
                      placeholder="Phone number"
                      v-model="phone"
                    >
                  </div>
                </div>
              </div>

              <!-- Organization Users -->
              <div class="row">
                <div class="form-group col">
                  <label>Location</label>
                  <input
                    type="address"
                    class="form-control mb-2"
                    placeholder=""
                    v-model="location"
                  >
                </div>
              </div>
              <div class="float-right">
                <button type="submit" class="btn btn-primary">Create</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    <br>
  </div>
</template>

<script>
import db from '../../Firebase/firebaseInit'
import firebase from 'firebase'
import 'firebase/firestore'
import pushid from 'pushid'

export default {
  data () {
    return {
      bannerImg: '',
      bannerPreImg: 'https://picsum.photos/930/300/?random',
      bannerKey: null,
      image: '',
      preImg: 'https://picsum.photos/150/150/?random',
      imageKey: null,
      name: '',
      website: '',
      description: '',
      email: '',
      phone: null,
      other: '',
      location: null,
      locationPos: {
        lat: 0,
        lng: 0
      },
      locationName: '',
      users: [],
      user: {
        id: null,
        img: 'https://picsum.photos/200/200/?random',
        name: 'Current User',
        email: '',
        role: 'Admin'
      },
      searchTerm: '',
      profiles: [],
      searching: false
    }
  },
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: 'New Organization',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Create a new organization account'
      }
    ]
  },
  mounted () {
    db.collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(doc => {
          this.user.name = doc.data().user.name
          this.user.img = doc.data().user.photo
          this.user.email = doc.data().user.email
          this.user.id = firebase.auth().currentUser.uid
      })
  },
  methods: {
    submit () {
      // location things
      if (this.location) {
        this.locationPos.lat = this.location.geometry.location.lat()
        this.locationPos.lng = this.location.geometry.location.lng()
        this.locationName = this.location.formatted_address
      } else {
        console.error('Location error for: ' + this.location)
      }

      // image uploads
      var key1 = pushid()
      var key2 = pushid()

      this.imageKey = key1
      this.bannerKey = key2

      var ref1 = firebase.storage().ref('organizations/logo/' + this.imageKey)
      var file1 = this.image
      var upload1 = ref1.put(file1)

      var ref2 = firebase.storage().ref('organizations/banner/' + this.bannerKey)
      var file2 = this.bannerImg
      var upload2 = ref2.put(file2)

      upload1.on(
        'state_changed',
        function progress (snapshot) {
          var percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        },
        function error (err) {},
        function complete () {}
      )

      upload2.on(
        'state_changed',
        function progress (snapshot) {
          var percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        },
        function error (err) {},
        function complete () {}
      )

      // information upload
      this.users.push(
        {
          id: this.user.id,
          img: this.user.img,
          name: this.user.name,
          role: 'Admin'
        }
      )

      db.collection('organizations').add({
        organization: {
          name: this.name,
          website: this.website,
          description: this.description,
          contact: {
            email: this.email,
            phone: this.phone,
            other: this.other
          },
          locationName: this.locationName,
          location: {
            lat: this.locationPos.lat,
            lng: this.locationPos.lng
          },
          imagekey: this.imageKey,
          bannerKey: this.bannerKey,
          users: this.users
        }
      }).catch(function () {
        this.users.pop()
      }).then(this.$router.push('/Users/organizations'))
    },
    loadFile: function () {
      var input = document.querySelector('.bUp')
      var imgURL = window.URL.createObjectURL(input.files[0])
      this.preImg = imgURL
      this.image = input.files[0]
    },
    bannerUpload () {
      var input = document.querySelector('.bUp2')
      var imgURL = window.URL.createObjectURL(input.files[0])
      this.bannerImg = input.files[0]
      this.bannerPreImg = imgURL
    },
    search () {
      const that = this
      this.searching = false
      this.profiles = []
      var search = this.searchTerm
      db.collection('users')
        .where('user.email', '==', search.trim())
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.id,
              name: doc.data().user.name,
              img: doc.data().user.photo
            }
            this.profiles.push(data)
          })
        })
        .then(function () {
          that.searching = true
        })
    },
    addUser (id, name, img) {
      var found = this.users.find(function (value) {
        return (value.name = name)
      })

      if (!found && name != this.user.email) {
        var user = {
          id,
          name,
          img,
          role: 'User'
        }
        this.users.push(user)
      }
    },
    removeUser (id, name, img) {
      var filtered = this.users.filter(function (value, index, arr) {
        return value.name != name
      })
      this.users = filtered
    },
    createOrganization () {
      db.collection('organizations')
    },
    setLocation (location) {
      this.location = location
    }
  }
}
</script>

<style scoped>
.dUp {
  position: relative;
  overflow: hidden;
}

.bUp,
.bUp2 {
  position: absolute;
  font-size: 50px;
  opacity: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

#preview {
  width: 150px;
  height: 150px;
}

#desc {
  resize: none;
}

#banner {
  height: 150px;
  overflow: hidden;
  filter: brightness(1);
  transition: height 1s;
}
#banner:hover {
  height: 300px;
}

.profileImg {
  height: 100px;
  border-radius: 100%;
}

.searchImg {
  width: 50px;
  height: 50px;
  border-radius: 100%;
}

.userImg {
  width: 75px;
  height: 75px;
  border-radius: 100%;
}

#bannerImg {
  position: absolute;
  -webkit-filter: brightness(1);
  filter: brightness(1);
  -webkit-transition: -webkit-filter 1s;
  transition: filter 1s;
}

#bannerImg:hover {
  -webkit-filter: brightness(0.75);
  filter: brightness(0.75);
}

#preBadge {
  position: absolute;
  z-index: 100;
  margin: 10px;
}

#addUser {
  border-radius: 100%;
}
</style>
