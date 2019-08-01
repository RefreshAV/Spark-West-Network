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
              <img
                class="align-self-center rounded mb-2 logo shadow-sm"
                :src="logoImg(organization.organization.logoKey)"
                alt="Organization logo"
                width="84"
                height="84"
              >
              <div class="media-body">
                <h5 class="mb-0">{{ organization.organization.name }}</h5>
                <p class="mb-0 text-muted">{{ organization.organization.contact.email }}</p>
              </div>
            </div>
            <div
              class="col pr-0 d-flex justify-content-center align-items-center"
              :style="'background-image: url(' + bannerImg(organization.organization.bannerKey) + '); background-position: center; background-size: cover; background-repeat: no-repeat;'"
            />
          </div>
        </router-link>
      </div>
    </div>
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
  firestore: {
    organizations: db.collection('organizations'),
  },
  methods: {
    logoImg (logoKey) {
      return 'https://firebasestorage.googleapis.com/v0/b/spark-west.appspot.com/o/organizations%2Flogo%2F' + logoKey + '?alt=media&token'
    },
    bannerImg (bannerKey) {
      return 'https://firebasestorage.googleapis.com/v0/b/spark-west.appspot.com/o/organizations%2Fbanner%2F' + bannerKey + '?alt=media&token'
    },
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
