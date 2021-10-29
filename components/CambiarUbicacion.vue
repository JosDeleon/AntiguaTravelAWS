<template>

  <v-dialog max-width="620" v-model="dialogo"
            transition="fab-transition" persistent>

    <v-card style="border-radius:15px;" elevation="0" outlined class="pa-6">

      <v-toolbar elevation="0" dense color="transparent" class="hidden-sm-and-down">
        <v-spacer/>
        <h2>Cambiar Ubicación</h2>
        <v-spacer/>
        <v-btn icon @click="CerrarDialogo">
          <v-icon>fa fa-times</v-icon>
        </v-btn>
      </v-toolbar>

      <v-toolbar elevation="0" dense color="transparent" class="hidden-md-and-up">
        <v-spacer/>
        <h3>Cambiar Ubicacíón</h3>
        <v-spacer/>
        <v-btn icon @click="CerrarDialogo">
          <v-icon>fa fa-times</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="pa-6">

        <h3 class="black--text my-4">Selecciona la ubicación de tu negocio</h3>
        <v-row class="mt-4">
          <v-col cols="1">
            <v-icon class="mt-n3">
              fa fa-search
            </v-icon>
          </v-col>
          <v-col cols="11" class="ml-n3 mt-n3">
            <gmap-autocomplete
              style="width: 70%; border:1px solid grey;
                              font-size: 16px; border-radius:3px;"
              class="w-50 pa-2"
              :select-first-on-enter="true"
              @place_changed="setPlace"
              :options="{ fields: ['geometry', 'formatted_address', 'address_components'] }"
            />
          </v-col>
        </v-row>

        <br/>

        <GmapMap
          :center="{ lat: +this.negocio.lat, lng: +this.negocio.lng }"
          :zoom="18"
          map-style-id="roadmap"
          :options="mapOptions"
          class="pa-2"
          style="width: 55vmin; height: 40vmin"
          ref="mapRef"
          @click="handleMapClick"
        >
          <GmapMarker
            :position="{ lat: +this.negocio.lat, lng: +this.negocio.lng }"
            :clickable="true"
            :draggable="true"
            @drag="handleMarkerDrag"
            @click="panToMarker"
          />
        </GmapMap>
        <v-btn @click="geolocate" small class="mt-2 pa-4" color="secondary"

        >
          <v-icon left>
            fa fa-map-marker-alt
          </v-icon>
          Ubicación actual
        </v-btn>

      </v-card-text>

      <v-card-actions>

        <v-btn color="blue darken-3" light block class="mt-2"
               style="border-radius:7px;" elevation="0"
               x-large @click="ActualizarUbicacion"
        >
          <v-icon left color="white" size="30" class="pr-2">
            fa fa-check
          </v-icon>
          <div class="white--text">Cambiar Ubicación</div>
        </v-btn>

      </v-card-actions>

    </v-card>

  </v-dialog>

</template>

<script>

export default {

  props: {

    value: Boolean,
    negocio: Object

  },

  computed: {

    dialogo: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }

  },

  data: () => ({

    helpers: {

      nonce: 1,
      mapSearch: null,
      busqueda: null,

    },

    markers: [],

    places: [],

    currentPlace: null,

    center: { lat: 14.55706946331603, lng: -90.73366553217345 },

    mapOptions: {
      disableDefaultUI: true,
    },

  }),

  methods: {

    ActualizarUbicacion(){

      let params = {

        id: this.negocio.id,
        nombre: this.negocio.nombre,
        categoria: this.negocio.categoria,
        direccion: this.negocio.direccion,
        abre: this.negocio.abre,
        cierra: this.negocio.cierra,
        telefono: this.negocio.telefono,
        descripcion: this.negocio.descripcion,
        coordenadas: {
          latitud: this.negocio.lat,
          longitud: this.negocio.lng
        },
        img: this.negocio.img
      }

      this.$api.put("/negocio", params).then(data => {

        this.$emit("refresh")
        this.$alert.exito("El negocio fue actualizado exitosamente", "Negocio Actualizado")
        this.CerrarDialogo()

      }).catch(data => {
        console.error(data)
        this.$alert.error('Ocurrió un error en el registro, vuelve a intentarlo', 'Error Interno')
      })

    },

    setPlace(place) {
      this.currentPlace = place;
      if (this.currentPlace) {

        this.negocio.lat = this.currentPlace.geometry.location.lat()
        this.negocio.lng = this.currentPlace.geometry.location.lng()
        this.places.push(this.currentPlace);
        this.currentPlace = null;
        this.panToMarker()
      }
    },

    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {

        this.negocio.lat = position.coords.latitude
        this.negocio.lng = position.coords.longitude

        this.panToMarker();

      });
    },

    handleMarkerDrag(e) {
      this.negocio.lat = e.latLng.lat()
      this.negocio.lng = e.latLng.lng()
    },

    panToMarker() {
      this.$refs.mapRef.panTo({ lat: this.negocio.lat, lng: this.negocio.lng });
      try {
        this.$refs.mapRef.setZoom(18);
      }
      catch (e) {

      }
    },

    handleMapClick(e) {
      this.negocio.lat = e.latLng.lat()
      this.negocio.lng = e.latLng.lng()
    },

    CerrarDialogo(){

      this.$emit("update:negocio", { lat: 14.55706946331603, lng: -90.73366553217345 })
      this.currentPlace = null
      this.dialogo = false

    }

  }

}

</script>
