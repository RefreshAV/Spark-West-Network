<template>
  <div>
    <img id="backdrop" class="animated fadeIn" src="../../assets/backdrop01.svg">
    <div class="container my-3 h-100">
      <div class="row d-flex justify-content-center mb-3">
        <div class="col-md-6">
          <div class="card animated fadeInLeft border-0 shadow">
            <div class="card-body">
              <div class="row">
                <div class="col text-center">
                  <h1>Reset password</h1>
                </div>
              </div>
              
              <div class="row">
                <div class="col">
                  <div
                    id="error"
                    class="alert alert-danger animated shake"
                    v-show="error"
                  >{{ errorMessage }}</div>
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <form @submit.prevent="reset()">
                    <div class="form-group">
                      <label for="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        v-model="email"
                        placeholder="example@email.com"
                        class="form-control mb-4"
                        autocomplete="off"
                      >
                    </div>
                    
                    <input type="submit" class="btn btn-primary mr-2" value="Reset">
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  data () {
    return {
      email: '',
      error: false,
      errorMessage: ''
    }
  },
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: 'Reset password',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Reset your password'
      }
    ]
  },
  methods: {
    reset () {
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.error = false
          this.errorMessage = ''

          this.$router.push('/login')
        })
        .catch((err) => {
          this.error = true
          this.errorMessage = err.message
        })
    }
  }
}
</script>

<style scoped>
#loginPic {
  height: 120px;
  border-radius: 100%;
}

input[type="email"],
input[type="password"] {
  border-radius: 40px;
}

.card {
  border-radius: 12px;
}

.card-body {
  transition: 1s;
}

#backdrop {
  position: absolute;
  width: 100%;
  z-index: -1000 !important;
  bottom: 220px;
  right: 0;
}
</style>
