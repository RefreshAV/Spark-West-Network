<template>
    <div class="container">
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
                <h4>Profile Picture</h4>
                <img :src="preImg" class="img-fluid rounded d-block mb-2 shadow-sm" id="preview" alt="profile Picture">
                <div class="dUp file btn btn-primary">
                  <small>Change <i class="fa fa-camera"></i></small>
                  <input type='file' id="imgUp" class='bUp' accept="image/x-png,image/gif,image/jpeg" @change="loadFile" required/>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <h4>Banner Picture</h4>
            <div id="banner" class="rounded shadow-sm mb-3">
              <div id="preBadge" class="badge badge-secondary badge-pill shadow-sm">preview</div>
              <img id="bannerImg" src="https://picsum.photos/1900/500/?random" alt="Banner Image" class="img-fluid">
            </div>

            <div class="row">
              <div class="col">
                <div class="row">
                  <div class="form-group col">
                    <input class="form-control form-control-lg" type="text" placeholder="Organization Name" required>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-md-6">
                    <input type="url" class="form-control mb-2" placeholder="website">
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col">
                    <label>Description</label>
                    <textarea id="desc" rows="5" class="form-control" placeholder="A description of the organization"></textarea>
                  </div>
                  <div class="col">
                    <div class="form-group">
                      <label>Contact Info <span class="badge badge-warning badge-pill">Please fill in one or more</span></label>
                      <input type="email" class="form-control mb-2" placeholder="email" required>
                      <input type="text" class="form-control mb-2" placeholder="phone number">
                      <input type="text" class="form-control mb" placeholder="other">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col">
                    <label>Location:</label>
                    <input type="text" class="form-control mb-2" placeholder="Organization address">
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="card bg-light mb-3">
                      <h3 class="card-header">Add People</h3>
                      <div class="card-body">
                        <ul class="list-group">
                          <!-- Current User -->
                          <li class="list-group-item">
                            <div class="row">
                              <div class="col-auto">
                                <img :src="user.img" alt="profile picture" class="profileImg">
                              </div>
                              <div class="col d-flex align-items-center">
                                <h5>{{user.name}}</h5>
                              </div>
                              <div class="col d-flex justify-content-end align-items-center text-muted">
                                Admin
                              </div>
                            </div>
                          </li>

                          <button class="btn btn-success" @click.prevent="addUser"><i class="fa fa-plus fa-2x"></i></button>
                        </ul>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Controls -->
        <hr>
        <div class="row">
          <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
            <router-link to="/profile" class="btn btn-danger">Cancle</router-link>
            <input type="submit" class="btn btn-primary">
          </div>
        </div>

      </form>
      <hr>

    </div>
</template>

<script>
export default {
  data() {
    return {
      image: null,
      preImg: "https://picsum.photos/150/150/?random",
      user: {
        img: "https://picsum.photos/200/200/?random",
        name: "Current User"
      }
    };
  },
  methods: {
    submit() {
      console.log("Submit");
    },
    loadFile: function() {
      var input = document.querySelector(".bUp");
      var preview = document.querySelector("#preview");
      var imgURL = window.URL.createObjectURL(input.files[0]);
      this.preImg = imgURL;
      this.image = input.files[0];
    },
    addUser() {
      console.log("Add User")
    }
  }
};
</script>

<style scoped>
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
}

.profileImg {
  height: 100px;
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
  margin: 10px
}

</style>