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
          <button class="btn btn-lg btn-primary" @click.prevent="addMember">
            <i class="fa fa-user-plus"/>
          </button>
        </div>
      </div>
    </form>

    <div class="list-group list-group-flush mb-3">
      <div
        v-for="member in organization.organization.members"
        :key="member.id"
        class="list-group-item list-group-item-action media"
      >
        <div class="row" v-if="member.userRef.user">
          <img
            class="align-self-center shadow-sm"
            :src="member.userRef.user.photo"
            alt="Generic placeholder image"
            @click="loadProfile(member.userRef.id)"
          >
          <div class="col">
            <div class="media-body">
              <div @click="loadProfile(member.userRef.id)">
                <h5 class="mb-0">{{ member.userRef.user.name }}</h5>
                <h5 class="mb-0 text-muted font-weight-light">{{ member.userRef.user.email }}</h5>
              </div>
              <button class="btn btn-danger btn-sm mt-1" @click="removeMember(member.userRef.id)">
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
        organization: {
          members: []
        },
      },
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
    this.currentUserId = firebase.auth().currentUser.uid;
  },
  methods: {
    loadProfile (id) {
      this.$router.push({ name: 'userDetail', params: { id: id } })
    },
    addMember () {
      // Find user by email
      db.collection('users')
        .where('user.email', '==', this.email)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            let members = this.organization.organization.members.map((member) => ({
              userRef: db.collection('users').doc(member.userRef.id),
              role: member.role
            }))

            members.push({
              userRef: doc.ref,
              role: 'Admin'
            });

            db.collection('organizations')
              .doc(this.$route.params.id)
              .update({
                organization: {
                  ...this.organization.organization,
                  members,
                }
              }).then(location.reload()) // Vuefire has trouble understanding references when data changes so we reload everything
          })
        })
    },
    removeMember (id) {
      let members = this.organization.organization.members;
      members = members.filter(member => member.userRef.id !== id);

      db.collection('organizations')
        .doc(this.$route.params.id)
        .update({
          organization: {
            ...this.organization.organization,
            members,
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
