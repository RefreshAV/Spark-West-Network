<template>
  <div class="container">
    <h1>{{title}}</h1>
    <h3>{{date}}</h3>
    <p>{{time}}</p>
    <router-link class="btn btn-secondary" to="/events/list">Back</router-link>
    <button @click="deleteEvent" class="btn btn-danger">Delete</button>
    <router-link v-bind:to="{name: 'EditEvent', params: {id: id}}" class="btn btn-primary">Edit</router-link>
    <hr>
  </div>

</template>

<script>
import db from "../firebaseInit";
import firebase from 'firebase'
import 'firebase/firestore'
  export default {
    name: 'event-detail',
    data () {
      return {
        id:null,
        title: null,
        date: null,
        time: null,
        email: null,
        desc: null
      }
    },
    beforeRouteEnter (to, from, next) {
      db.collection('events').where(firebase.firestore.FieldPath.documentId(), '==', to.params.id).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {next(vm => {
          vm.id = doc.id
          vm.title = doc.data().event.title
          vm.date = doc.data().event.date
          vm.time = doc.data().event.time
          vm.email = doc.data().event.email
          vm.desc = doc.data().event.description
        })
        })
      })
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        db.collection('events').where(firebase.firestore.FieldPath.documentId(), '==', this.$route.params.id).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            console.log(doc.data())
            this.id = doc.id,
            this.title = doc.data().event.title,
            this.date = doc.data().event.date,
            this.time = doc.data().event.time,
            this.email = doc.data().event.email,
            this.desc = doc.data().event.description
          })
        })
      },
      deleteEvent () {
        if(confirm('Are you sure?')){
          db.collection('events').where(firebase.firestore.FieldPath.documentId(), '==', this.$route.params.id).get()
          .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete();
            this.$router.push('/events/list')
          })
        })
        }
      }
    }
  }
</script>
