<template>
  <div class="container">
    <h1 class="mt-3">Members</h1>

    <form class="navbar-form mb-3" role="search">
      <div class="input-group">
        <input
          type="text"
          class="form-control form-control-lg"
          placeholder="Add members by email"
          v-model="email"
        >
        <div class="input-group-btn">
          <button class="btn btn-lg btn-primary" @click.prevent="addUser">
            <i class="fa fa-user-plus"/>
          </button>
        </div>
      </div>
    </form>

    <div class="list-group list-group-flush mb-3">
      <div
        v-for="user in organization.organization.users"
        :key="user.id"
        class="list-group-item list-group-item-action media"
      >
        <div class="row">
          <img
            class="align-self-center shadow-sm"
            :src="user.img"
            alt="Generic placeholder image"
            @click="loadProfile(user.uid, user.id)"
          >
          <div class="col">
            <div class="media-body">
              <div @click="loadProfile(user.uid, user.id)">
                <h5 class="mb-0">{{ user.name }}</h5>
                <h5 class="mb-0 text-muted font-weight-light">{{ user.email }}</h5>
              </div>
              <button class="btn btn-danger btn-sm mt-1" @click="removeUser(user.id)">
                <span>
                  <i class="fa fa-user-minus" />
                </span>
                Remove
              </button>
            </div>
          </div>
        </div>
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
      email: '',
      organization: {
        organization: {},
      }
    }
  },
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: 'Members',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'The members of an organization'
      }
    ]
  },
  mounted () {
    this.$bind('organization', db.collection('organizations').doc(this.$route.params.id))
  },
  methods: {
    loadProfile (uid, id) {
      this.$router.push({ name: 'userDetail', params: { id: id } })
    },
    addUser () {
      // Find user by email
      db.collection('users')
        .where('user.email', '==', this.email)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.id,
              name: doc.data().user.name,
              img: doc.data().user.photo,
              email: doc.data().user.email
            }

            // Add user to users array
            let users = this.organization.organization.users;
            users.push(data);

            // Update organization with new user
            db.collection('organizations')
              .doc(this.$route.params.id)
              .update({
                organization: {
                  ...this.organization.organization,
                  users,
                }
              })
          })
        })
    },
    removeUser (id) {
      let users = this.organization.organization.users;
      users = users.filter(user => user.id !== id);

      db.collection('organizations')
        .doc(this.$route.params.id)
        .update({
          organization: {
            ...this.organization.organization,
            users,
          }
        })
    }
  }
}
</script>

<style scoped>
.list-group-item img {
  max-width: 84px;
}
</style>
