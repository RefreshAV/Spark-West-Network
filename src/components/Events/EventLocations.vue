<template>
  <div>
    <div id="map" style="height: 500px; border: 1px solid #AAA;"></div>
  </div>

</template>

<script>
  import db from "../../Firebase/firebaseInit";
  import firebase from "firebase/app";
  export default {
    mounted() {
      var map = L.map( 'map', {
        center: [45,-64],
        minZoom: 2, zoom: 8 }); L.tileLayer( 'https://api.mapbox.com/styles/v1/cuppajoeman/cjk16g5rv28ug2sl6ucetr52a/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY3VwcGFqb2VtYW4iLCJhIjoiY2prMTY5MHJrMGU5ejNycXFvdXpnMG84aSJ9.s6Pvs5N-dITfrDFAgEWbng', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>', subdomains: ['a','b','c'] }).addTo( map ); db .collection("events") .get() .then(querySnapshot => { querySnapshot.forEach(doc => {
            L.marker([doc.data().event.location.lat, doc.data().event.location.lng])
              // .bindPopup('<router-link ' +  'class="btn btn-primary" ' + 'to="/events/event/' + doc.id + '" ' + '>' + doc.data().event.title + '</router-link>')
              // temporary workaround for router-link insdie a leaflet marker.
              .bindPopup('<router-link to="/"><a href="/events/event/' + doc.id + '">' + doc.data().event.title + '</a></router-link>')
              .addTo(map)
          });
        }); },
  }
</script>

<style>
  #map {
    margin-top: 40px;
  }
</style>
