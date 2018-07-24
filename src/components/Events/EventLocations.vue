<template>
  <div class="container">
    <div class="col-md-9">
      <div id="map" class="map"></div>
    </div>
    <div class="col-md-3">
      <div
        class="form-check"
        v-for="layer in layers"
        :key="layer.id"
      >
        <label class="form-check-label">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="layer.active"
            @change="layerChanged(layer.id, layer.active)"
          />
          {{ layer.name }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        map: null,
        tileLayer: null,
        layers: [
          {
            id: 0,
            name: 'Events',
            active: false,
            features: [
              {
                id: 0,
                name: 'Callums Event',
                type: 'marker',
                coords: [45.092324,-64.362247]
              },
              {
                id: 1,
                name: 'Callums Second Event',
                type: 'marker',
                coords: [45.068077,-64.455435]
              },
              {
                id: 2,
                name: 'Callums third Event',
                type: 'marker',
                coords: [45.096356,-64.409151]
              },
              {
                id: 3,
                name: 'Callums fourth Event',
                type: 'marker',
                coords: [45.077256,-64.490604]
              }
            ]
          }
        ]
      }
    },
    mounted() {
      this.initMap();
      this.initLayers();
    },
    methods: {
      initMap() {
        this.map = L.map('map').setView([45.091200, -64.363175], 12);
        this.tileLayer = L.tileLayer(
          'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
          {
            maxZoom: 18,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
          }
        );
        this.tileLayer.addTo(this.map);
      },
      initLayers() {
        this.layers.forEach((layer) => {
          const markerFeatures = layer.features.filter(feature => feature.type === 'marker');
          markerFeatures.forEach((feature) => {
            feature.leafletObject = L.marker(feature.coords)
              .bindPopup(feature.name);
          });
        });
      },
      layerChanged(layerId, active) {
        const layer = this.layers.find(layer => layer.id === layerId);
        layer.features.forEach((feature) => {
          if (active) {
            feature.leafletObject.addTo(this.map);
          } else {
            feature.leafletObject.removeFrom(this.map);
          }
        })
      },
    }
  }
</script>

<style>
  .map {
    height: 600px;
  }
</style>
