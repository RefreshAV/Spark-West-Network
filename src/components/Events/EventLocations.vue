<template>
  <div id="map" style="height: 440px; border: 1px solid #AAA;"></div>
</template>

<script>
  export default {
    data() {
      return {
        markers: [
          {
            id: 0,
            name: 'Callums Event',
            url: 'https://google.com',
            lat: 45.092324,
            lng: -64.362247
          },
          {
            id: 1,
            name: 'Callums Second Event',
            url: 'https://google.com',
            lat: 45.068077,
            lng: -64.455435
          },
          {
            id: 2,
            name: 'Callums third Event',
            url: 'https://google.com',
            lat: 45.096356,
            lng: -64.409151
          },
          {
            id: 3,
            name: 'Callums fourth Event',
            url: 'https://google.com',
            lat: 45.077256,
            lng: -64.490604
          }
        ]
      }
    },
    mounted() {
      var map = L.map( 'map', {
        center: [45,-64],
        minZoom: 2,
        zoom: 8
      });
      L.tileLayer( 'https://api.mapbox.com/styles/v1/cuppajoeman/cjk16g5rv28ug2sl6ucetr52a/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY3VwcGFqb2VtYW4iLCJhIjoiY2prMTY5MHJrMGU5ejNycXFvdXpnMG84aSJ9.s6Pvs5N-dITfrDFAgEWbng', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: ['a','b','c']
      }).addTo( map );
      this.markers.forEach(place => {
        L.marker([place.lat,place.lng])
          .bindPopup('<a href="' + place.url + '" target="_blank">' + place.name + '</a>')
          .addTo(map);
      })
    }
  }
</script>

<style>
  #map {
    margin-top: 40px;
  }
</style>
