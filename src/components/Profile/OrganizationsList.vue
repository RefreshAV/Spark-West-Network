<template>
  <div class="container">

    <div class="btn-group my-3">
      <button
        class="btn btn-secondary btn-lg dropdown-toggle"
        type="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false">
        Organizations
        <span class="badge badge-danger badge-pill">WIP</span>
      </button>
      <div class="dropdown-menu">
        <router-link
          class="dropdown-item"
          to="/Users">Users</router-link>
        <router-link
          class="dropdown-item"
          to="/Users/organizations">Organizations</router-link>
      </div>
    </div>

    <div class="list-group list-group-flush mb-3">
      <router-link
        v-for="organization in organizations"
        :key="organization.id"
        :to="{name: 'userDetail', params: {id: organization.id}}"
        class="list-group-item list-group-item-action media ">
        <img
          class="align-self-center mr-3"
          :src="organization.img"
          alt="Generic placeholder image">
        <div class="media-body">
          <h5 class="mb-0">{{ organization.name }}</h5>
          <p class="mb-0 text-muted">{{ organization.email }}</p>
          <span class="badge badge-primary"><i class="fa fa-user"/> n Followers</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      organizations: []
    }
  },
  created () {
    // get organizations
  }
}
</script>

<style scoped>
.list-group-item img {
    max-width: 84px
}
</style>
