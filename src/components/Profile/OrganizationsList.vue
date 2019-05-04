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

    <div class="list-group list-group-flush mb-3">
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
              class="align-self-center mr-3 shadow-sm"
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
          <div class="col" :style="'background-image: url(' + organization.banner + '); background-position: center; background-size: cover; background-repeat: no-repeat;'">
          </div>
        </div>
      </button>
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
  created () {
    db.collection('organizations')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.data().organization.imagekey)
          const data = {
            id: doc.id,
            name: doc.data().organization.name,
            logo: doc.data().organization.imagekey,
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
.list-group-item img {
  max-width: 84px;
}
</style>
