<template>

  <v-row justify="center" align="center">

    <v-col cols="12" sm="10" md="10" lg="9">

      <v-card style="border-radius:10px;">

        <v-img
          min-height="900"
          max-height="1100"
          src="https://elcomercio.pe/resizer/EFi-q5JXzfA8p4uDIRbwXANtqHM=/1200x675/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/NE6ATAPMMFCBNG2WOCPZAXMTSA.jpg"
          lazy-src="https://elcomercio.pe/resizer/EFi-q5JXzfA8p4uDIRbwXANtqHM=/1200x675/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/NE6ATAPMMFCBNG2WOCPZAXMTSA.jpg"
          style="border-radius:10px;"
        >

          <v-container>

            <v-row align="center" justify="start">

              <v-col>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="white"
                      dark
                      x-large
                      v-bind="attrs"
                      v-on="on"
                      icon
                      @click="$router.push({path: ($nuxt.context.from.path) ? $nuxt.context.from.path : '/'})"
                    >
                      <v-icon> fa fa-arrow-left </v-icon>
                    </v-btn>
                  </template>
                  <span>Regresar</span>
                </v-tooltip>

              </v-col>

            </v-row>

            <v-layout justify-center>

              <v-card min-width="400" width="700"
                      style="border-radius:10px;">

                <v-card-text class="pa-4">

                  <h2 class="mb-5 black--text">
                    Registro para Cambista
                  </h2>

                  <v-window v-model="helpers.step">

                    <v-window-item :value="1">

                      <v-card-text class="pa-4">

                        <h3 class="black--text mb-4">Información para que puedan contactarte</h3>

                        <v-form ref="formDatosNegocio">

                          <v-text-field
                            label="Nombre Completo"
                            color="black"
                            autocomplete="new-password"
                            outlined
                            dense
                            v-model="negocio.nombre"
                            :rules="[ v => v && v.length > 0 || 'El nombre es obligatorio' ]"
                            prepend-icon="fa fa-city"
                          />

                          <v-text-field
                            label="Número de Teléfono"
                            color="black"
                            autocomplete="new-password"
                            outlined
                            dense
                            type="number"
                            prefix="(+502)"
                            v-model="negocio.telefono"
                            :rules="[ v => !!v || 'El teléfono es obligatorio' ]"
                            prepend-icon="fa fa-phone"
                          />

                          <v-textarea
                            outlined
                            dense
                            no-resize
                            clearable
                            clear-icon="fa fa-times-circle"
                            v-model="negocio.direccion"
                            :rules="[ v => v && v.length > 0 || 'La dirección es obligatoria' ]"
                            rows="3"
                            label="¿Dónde te ubican?"
                            prepend-icon="fa fa-map-marker-alt"
                            color="black"
                          />

                          <v-textarea
                            outlined
                            dense
                            no-resize
                            clearable
                            clear-icon="fa fa-times-circle"
                            v-model="negocio.descripcion"
                            :rules="[ v => v && v.length > 0 || 'La descripción es obligatoria' ]"
                            rows="3"
                            label="Descripción de tu trabajo"
                            prepend-icon="fa fa-edit"
                            color="black"
                          />

                          <v-divider class="mb-4"/>

                          <h3 class="black--text mb-4">Selecciona lo que mejor describa tu trabajo</h3>

                          <v-combobox
                            v-model="tags"
                            :filter="filter"
                            :hide-no-data="!helpers.busqueda"
                            :items="lista_tags"
                            :search-input.sync="helpers.busqueda"
                            hide-selected
                            label="Selecciona un tag o más"
                            :rules="[ v => v && v.length > 0 || 'Debes seleccionar al menos un tag' ]"
                            multiple
                            small-chips
                            solo
                            color="black"
                            style="border-radius:10px;"
                            class="elevation-0"
                          >
                            <template v-slot:no-data>
                              <v-list-item>
                                <span class="subheading mr-2">Crear el tag </span>
                                <v-chip
                                  :color="`${helpers.colores[helpers.nonce - 1]} lighten-3`"
                                  label
                                  small
                                >
                                  {{ helpers.busqueda }}
                                </v-chip>
                              </v-list-item>
                            </template>
                            <template v-slot:selection="{ attrs, item, parent, selected }">
                              <v-chip
                                v-if="item === Object(item)"
                                v-bind="attrs"
                                :color="`${item.color} lighten-3`"
                                :input-value="selected"
                                label
                                small
                              >
                                        <span class="pr-2">
                                          {{ item.text }}
                                        </span>
                                <v-icon
                                  small
                                  @click="parent.selectItem(item)"
                                >
                                  $delete
                                </v-icon>
                              </v-chip>
                            </template>
                            <template v-slot:item="{ index, item }">
                              <v-chip
                                :color="`${item.color} lighten-3`"
                                dark
                                label
                                small
                              >
                                {{ item.text }}
                              </v-chip>
                            </template>
                          </v-combobox>

                        </v-form>

                      </v-card-text>

                    </v-window-item>

                    <v-window-item :value="2">

                      <v-card-text class="pa-4">

                        <div>
                          <h3 class="black--text mb-4">Selecciona el horario en el que operas</h3>
                          <v-row
                            justify="space-around"
                            align="center"
                          >
                            <v-col>
                              <h3 class="black--text mb-2">Hora que inicias</h3>
                              <v-time-picker
                                v-model="negocio.abre"
                                landscape
                                color="secondary"
                              />
                            </v-col>
                            <v-col>
                              <h3 class="black--text mb-2">Hora que terminas</h3>
                              <v-time-picker
                                v-model="negocio.cierra"
                                landscape
                                color="secondary"
                              />
                            </v-col>
                          </v-row>
                        </div>

                      </v-card-text>

                    </v-window-item>

                    <v-window-item :value="3">

                      <v-card-text class="pa-4">

                        <h3 class="black--text my-4">Ubicación para que las personas te encuentren mejor</h3>
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
                              :options="{
                                fields: ['geometry', 'formatted_address', 'address_components'],
                              }"
                            />
                          </v-col>
                        </v-row>

                        <br/>

                        <GmapMap
                          :center="center"
                          :zoom="18"
                          map-style-id="roadmap"
                          :options="mapOptions"
                          class="pa-2"
                          style="width: 100vmin; height: 40vmin"
                          ref="mapRef"
                          @click="handleMapClick"
                        >
                          <GmapMarker
                            :position="marker.position"
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

                    </v-window-item>

                  </v-window>

                </v-card-text>

                <v-divider/>

                <v-card-actions>
                  <v-btn
                    :disabled="helpers.step === 1"
                    text
                    @click="helpers.step--"
                  >
                    Atrás
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    depressed
                    @click="VerificarForma"
                    v-if="helpers.step < 3"
                  >
                    <div style="color: rgba(0,0,0,0.8);">
                      Siguiente
                    </div>
                  </v-btn>
                  <v-btn
                    color="primary"
                    depressed
                    @click="RegistrarNegocio"
                    v-else
                  >
                    <div style="color: rgba(0,0,0,0.8);">
                      Registrarse
                    </div>
                  </v-btn>
                </v-card-actions>

              </v-card>

            </v-layout>

          </v-container>

        </v-img>

      </v-card>

    </v-col>

  </v-row>

</template>

<script>

export default {

  mounted() {

  },

  head(){
    return{
      titleTemplate: "Registra tu negocio | Súmate a Antigua Travel"
    };
  },

  layout: 'empty',

  data() {

    return {
      helpers: {
        step: 1,
        colores: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
        nonce: 1,
        mapSearch: null,
        busqueda: null,
      },
      markers: [],
      places: [],
      currentPlace: null,
      lista_tags: [
        { header: 'Selecciona o crea un tag' },
        {
          text: 'Dólares',
          color: 'green',
        },
        {
          text: 'Quetzales',
          color: 'orange',
        },
        {
          text: 'Euros',
          color: 'blue',
        },
        {
          text: 'Libras',
          color: 'blue',
        },
        {
          text: 'Horario flexible',
          color: 'blue',
        },
      ],
      negocio: { },
      tags: [],
      marker: { position: { lat: 14.55706946331603, lng: -90.73366553217345 } },
      center: { lat: 14.55706946331603, lng: -90.73366553217345 },
      mapOptions: {
        disableDefaultUI: true,
      },
    }

  },

  watch: {
    tags (val, prev) {

      if (val.length === prev.length) return

      this.tags = val.map(v => {
        if (typeof v === 'string') {
          v = {
            text: v,
            color: this.helpers.colores[this.helpers.nonce - 1],
          }

          this.lista_tags.push(v)

          this.helpers.nonce++

          this.$forceUpdate()
        }

        return v
      })
    },
  },

  methods: {

    VerificarForma(){

      if(this.helpers.step === 1 && this.$refs.formDatosNegocio.validate()){
        this.helpers.step++
      }
      else{
        this.helpers.step++
      }
    },

    async RegistrarNegocio(){

      let tags_negocio = []

      this.tags.forEach( tag => {
        tags_negocio.push(tag.text)
      } )

      let params = {
        nombre: this.negocio.nombre,
        telefono: this.negocio.telefono,
        direccion: this.negocio.direccion,
        descripcion: this.negocio.descripcion,
        categoria: 'C',
        tags: tags_negocio,
        abre: this.negocio.abre,
        cierra: this.negocio.cierra,
        coordenadas: {
          latitud: this.marker.position.lat,
          longitud: this.marker.position.lng
        },
        usuarioId: JSON.parse(localStorage.getItem('usuario')).id
      }

      await this.$api.post("/negocio", params).then( data => {
        this.$alert.registro_exitoso()
        this.$router.push({ path: '/' })
      } ).catch(data => {
        console.error(data)
        this.$alert.error('Ocurrió un error en el registro, vuelve a intentarlo', 'Error Interno')
      })

    },

    setPlace(place) {
      this.currentPlace = place;
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.marker.position = marker;
        this.currentPlace = null;
        this.panToMarker()
      }
    },

    filter (item, queryText, itemText) {
      if (item.header) return false

      const hasValue = val => val != null ? val : ''

      const text = hasValue(itemText)
      const query = hasValue(queryText)

      return text.toString()
        .toLowerCase()
        .indexOf(query.toString().toLowerCase()) > -1
    },

    //detects location from browser
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.marker.position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        this.center.lat = position.coords.latitude
        this.center.lng = position.coords.longitude

        this.panToMarker();
      });
    },

    //sets the position of marker when dragged
    handleMarkerDrag(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    },

    //Moves the map view port to marker
    panToMarker() {
      this.$refs.mapRef.panTo(this.marker.position);
      try {
        this.$refs.mapRef.setZoom(18);
      }
      catch (e) {

      }
    },

    //Moves the marker to click position on the map
    handleMapClick(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      console.log(e);
    }

  }

}

</script>
