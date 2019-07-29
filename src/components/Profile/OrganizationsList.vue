<template>
  <div class="container">
    <div class="btn-group my-3">
      <button
        class="btn btn-secondary btn-lg dropdown-toggle"
        type="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Organizations
        <!-- <span class="badge badge-danger badge-pill">WIP</span> -->
      </button>
      <div class="dropdown-menu">
        <router-link class="dropdown-item" to="/Users">Users</router-link>
        <router-link class="dropdown-item" to="/Organizations">Organizations</router-link>
      </div>
    </div>

    <div
      class="mb-3 row text-dark animated fadeInLeft"
      v-for="(organization, index) in organizations"
      :key="organization.id"
      :style="'animation-delay:' + (index * 0.25) + 's'"
    >
      <div class="col">
        <router-link
          :to="'Organizations/organization/' + organization.id"
          class="media p-0 btn btn-light shadow-sm"
        >
          <div class="row w-100 m-0">
            <div class="col-auto m-2 float-left">
              <div
                v-if="!organization.logo"
                class="spinnerWrapper d-flex justify-content-center align-items-center"
                style="width: 84px; height: 84px;"
              >
                <div class="spinner-border w-50 h-50 text-primary spinner-border-sm" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
              <img
                class="align-self-center rounded mb-2 logo mr-3 shadow-sm"
                v-if="organization.logo"
                :src="organization.logo"
                alt="Organization logo"
                width="84"
                height="84"
              >
              <div class="media-body">
                <h5 class="mb-0">{{ organization.name }}</h5>
                <p class="mb-0 text-muted">{{ organization.email }}</p>
                <span class="badge badge-primary">
                  <i class="fa fa-user"/> n Followers
                </span>
              </div>
            </div>
            <div
              class="col pr-0 d-flex justify-content-center align-items-center"
              :style="'background-image: url(' + organization.banner + '); background-position: center; background-size: cover; background-repeat: no-repeat;'"
            >
              <div
                v-if="!organization.banner"
                class="spinner-border text-primary spinner-border-sm"
                style="width: 84px; height: 84px;"
                role="status"
              >
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <!-- <div class="list-group list-group-flush mb-3">
      <button
        v-for="(organization, index) in organizations"
        :key="organization.id"
        @click="loadOrganization(organization.id)"
        class="list-group-item list-group-item-action media"
        :style="'animation-delay:' + (index * 0.25) + 's'"
      >
        <div class="row">
          <div class="col-auto">
            <img
              class="align-self-center logo mr-3 shadow-sm"
              :src="'https://firebasestorage.googleapis.com/v0/b/spark-west.appspot.com/o/organizations%2Flogo%2F' + organization.logo + '?alt=media&token'"
              alt="Generic placeholder image"
            >
            <div class="media-body">
              <h5 class="mb-0">{{ organization.name }}</h5>
              <p class="mb-0 text-muted">{{ organization.email }}</p>
              <span class="badge badge-primary">
                <i class="fa fa-user"/> n Followers
              </span>
            </div>
          </div>
          <div
            class="col"
            :style="'background-image: url(' + organization.banner + '); background-position: center; background-size: cover; background-repeat: no-repeat;'"
          ></div>
        </div>
      </button>
    </div>-->
  </div>
</template>

<script>
import db from '../../Firebase/firebaseInit'
import firebase from 'firebase'

export default {
  data () {
    return {
      organizations: []
    }
  },
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: 'Organizations',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'The Organizations present on Spark West Network'
      }
    ]
  },
  created () {
    db.collection('organizations')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            name: doc.data().organization.name,
            logo:
              'https://firebasestorage.googleapis.com/v0/b/spark-west.appspot.com/o/organizations%2Flogo%2F' +
              doc.data().organization.imagekey +
              '?alt=media&token',
            banner:
              'https://firebasestorage.googleapis.com/v0/b/spark-west.appspot.com/o/organizations%2Fbanner%2F' +
              doc.data().organization.bannerKey +
              '?alt=media&token',
            email: doc.data().organization.contact.email
          }
          this.organizations.push(data)
        })
      })
  },
  methods: {
    loadOrganization (id) {
      this.$router.push('Organizations/organization/' + id)
    }
  }
}
</script>

<style scoped>
.logo {
  max-width: 84px;
}

.btn-light {
  transition: 0.25s;
}

.btn-light:hover {
  transform: scale(1.05, 1.05);
}
</style>
