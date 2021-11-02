<template>

  <v-container fluid>

    <v-row dense>

      <v-col cols="12" xl="3" lg="4" class="mt-12" >

        <v-card style="border-radius:10px;"
                max-width="400"
                min-width="400"
                class="mx-auto"
                elevation="0"
                outlined
        >

          <v-card-text>

            <div class="hidden-md-and-up">

              <h3 class="mb-2">
                Busqueda por Tags
              </h3>

              <v-row justify="start" align="start" class="ml-n5">

                <v-col
                  cols="12"
                  lg="12"
                  sm="10"
                  md="8"
                >

                  <v-chip-group v-model="tags_seleccionadas" multiple @change="RefrescarNegocios">
                    <v-chip
                      filter
                      outlined
                      v-for="(tag, t) in tag_pool"
                      :key="t"
                    >
                      <v-icon class="mr-1">fa fa-tag</v-icon>
                      {{ tag }}
                    </v-chip>
                  </v-chip-group>

                </v-col>

              </v-row>


            </div>

            <div class="hidden-sm-and-down">

              <h3 class="mb-2 black--text">
                Busqueda por Tags
              </h3>

              <v-chip-group v-model="tags_seleccionadas" multiple column color="secondary" @change="RefrescarNegocios">
                <v-chip
                  filter
                  outlined
                  v-for="(tag, t) in tag_pool"
                  :key="t"
                >
                  <v-icon class="mr-1">fa fa-tag</v-icon>
                  {{ tag }}
                </v-chip>
              </v-chip-group>

            </div>

            <v-divider class="my-2" />

            <v-list rounded>
              <h3 class="mb-2 black--text">Filtros</h3>

              <v-list-item
                v-for="(filtro, i) in filtros"
                :key="i"
                class="my-auto"
                @click="FiltrarNegocio(filtro)"
                inactive
              >
                <v-list-item-icon>
                  <v-icon v-text="filtro.icono"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="filtro.texto"></v-list-item-title>
                  <v-range-slider
                    v-model="range"
                    :max="rango[1]"
                    :min="rango[0]"
                    track-color="black"
                    thumb-color="black"
                    track-fill-color="black"
                    v-if="i === 2"
                    @change="helpers.filtro_rango = true"
                  />
                  <v-layout justify-center v-if="i===2">

                    <div class="justify-center mt-n4">
                      {{  'Q. ' + (+range[0]).toFixed(2) }} -
                      {{ 'Q. ' + (+range[1]).toFixed(2)  }}
                    </div>

                  </v-layout>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-layout justify-center>

              <v-btn
                color="secondary"
                depressed
                @click="LimpiarFiltros"
              >
                Limpiar Filtros
              </v-btn>

            </v-layout>

          </v-card-text>

        </v-card>

      </v-col>

      <v-col cols="12" xl="9" lg="8">

        <v-row>

          <v-col cols="6" class="mt-12" v-if="listado && listado.length === 0">
            <v-alert
              border="left"
              colored-border
              type="warning"
              elevation="2"
            >
              Lo sentimos, aún no hay lugares de renta de autos disponibles para mostrar.
            </v-alert>
          </v-col>

          <v-col cols="12"
                 lg="4"
                 md="6"
                 sm="6"
                 v-for="(renta, i) in listado"
                 :key="i"
          >

            <v-card
              style="border-radius:10px;"
              class="mx-auto my-12"
              max-width="400"
              min-width="400"
              elevation="0"
              outlined
            >
              <v-img
                height="200"
                contain
                :src="renta.img ? renta.img : '/imagen-no-disponible.png'"
              ></v-img>

              <v-card-title>
                <h4>
                  {{ renta.nombre }}
                </h4>
                <v-spacer/>
                <h6>
                  <span :class="VerificarHora(renta.abre, renta.cierra) === 'Cerrado' ?
                  'red--text' : 'green--text'">
                    {{ VerificarHora(renta.abre, renta.cierra) }}
                  </span> -
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-chip outlined color="black" small v-bind="attrs" v-on="on">
                        <v-icon color="black" class="mr-1">fa fa-clock</v-icon>
                        Horarios
                      </v-chip>
                    </template>
                    <span> Todos los días de {{ $moment(renta.abre, "HH:mm:ss").format('h:mm a') }} -
                  {{ $moment(renta.cierra, "HH:mm:ss").format('h:mm a')  }}</span>
                  </v-tooltip>
                </h6>

              </v-card-title>

              <v-card-text>

                <v-row
                  align="center"
                  class="mx-0 mb-2"
                >
                  <v-rating
                    :value="renta.puntuacionAvg"
                    color="secondary"
                    dense
                    half-increments
                    readonly
                  />

                  <div class="grey--text ms-4">
                    {{ renta.puntuacionAvg.toFixed(1) }} ({{ renta.totalValoraciones }}
                    {{ renta.totalValoraciones > 1 ||  renta.totalValoraciones === 0 ?  'valoraciones' : 'valoración' }})
                  </div>
                </v-row>

                <div class="my-2">
                  <v-icon color="black" class="mr-1">
                    fa fa-map-marker-alt
                  </v-icon>
                  Se encuentra a <span class="font-weight-bold">
                    {{ CalcularDistancia(renta.lng, renta.lat) }} km
                  </span> de ti
                </div>

                <div>{{ renta.descripcion }}</div>

              </v-card-text>

              <v-divider class="my-4"/>

              <v-card-actions>

                <v-btn
                  color="black"
                  outlined
                  @click="InformacionProducto(renta)"
                >
                  <v-icon left color="secondary">
                    fa fa-compass
                  </v-icon>
                  Explorar
                </v-btn>

                <v-btn
                  color="black"
                  outlined
                  @click="EnviarMensaje(renta)"
                >
                  <v-icon left color="primary darken-2">
                    fa fa-paper-plane
                  </v-icon>
                  Contactar
                </v-btn>

              </v-card-actions>

            </v-card>

          </v-col>

        </v-row>

      </v-col>

    </v-row>

    <v-fab-transition style="direction: rtl;">
      <v-btn
        class="hidden-sm-and-down"
        color="black"
        fab
        dark
        absolute
        bottom
        left
        :style="{left: '50%', transform:'translateX(-50%)'}"
        large
        @click="MostrarDialogoMapa"
      >
        <v-icon>fa fa-map-marker-alt</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-fab-transition>
      <v-btn
        class="hidden-md-and-up"
        color="black"
        fab
        dark
        small
        absolute
        bottom
        left
        :style="{left: '50%', transform:'translateX(-50%)'}"
        @click="MostrarDialogoMapa"
      >
        <v-icon>fa fa-map-marker-alt</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-dialog v-model="dialogos.mapa"
              transition="dialog-bottom-transition"
              scrollable
              persistent
              max-width="1000px"
    >
      <v-card>

        <v-toolbar elevation="0" dense color="transparent">

          <v-btn icon @click="CerrarDialogoMapa">
            <v-icon>fa fa-times</v-icon>
          </v-btn>

        </v-toolbar>

        <v-card-text class="pa-4">

          <v-row class="mt-2 hidden-sm-and-down">
            <v-col cols="1">
              <v-icon class="mt-n3">
                fa fa-search
              </v-icon>
            </v-col>
            <v-col cols="11" class="ml-n12 mt-n3">
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

          <v-row class="mt-2 hidden-md-and-up">
            <v-col cols="1">
              <v-icon class="mt-n3">
                fa fa-search
              </v-icon>
            </v-col>
            <v-col cols="11" class="ml-n2 mt-n3">
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
            :center="center"
            :zoom="18"
            map-style-id="roadmap"
            :options="mapOptions"
            class="pa-2"
            style="max-width: 100vmin; max-height: 40vmin; min-width: 50vmin; min-height: 40vmin;"
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

        </v-card-text>

        <v-layout justify-center>
          <v-card-actions>
            <v-btn
              color="primary"
              depressed
              @click=""
            >
              <div style="color: rgba(0,0,0,0.8);">
                Seleccionar
              </div>
            </v-btn>
          </v-card-actions>
        </v-layout>

      </v-card>
    </v-dialog>

    <v-overlay :value="$store.state.loading">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>

    <v-dialog
      ref="fecha_planeada"
      v-model="dialogos.filtro_fecha"
      :return-value.sync="helpers.fecha_planeada"
      persistent
      transition="fab-transition"
      width="300"
    >
      <v-date-picker
        v-model="helpers.fecha_planeada"
        scrollable
      >
        <v-spacer></v-spacer>
        <v-btn
          text
          color="primary"
          @click="dialogos.filtro_fecha = false"
        >
          Cancelar
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="FiltrarFecha"
        >
          Aceptar
        </v-btn>
      </v-date-picker>
    </v-dialog>

    <v-dialog
      ref="hora_planeada"
      v-model="dialogos.filtro_hora"
      :return-value.sync="helpers.hora_planeada"
      persistent
      transition="fab-transition"
      width="300"
    >
      <v-time-picker
        v-model="helpers.hora_planeada"
        scrollable
        color="primary darken-2"
      >
        <v-spacer></v-spacer>
        <v-btn
          text
          color="primary darken-2"
          @click="dialogos.filtro_hora = false"
        >
          Cancelar
        </v-btn>
        <v-btn
          text
          color="primary darken-2"
          @click="FiltrarHora"
        >
          Aceptar
        </v-btn>
      </v-time-picker>
    </v-dialog>

  </v-container>

</template>

<script>

import * as Axios from "axios";

export default {

  mounted() {
    this.ObtenerRentaAutos()
    this.ObtenerAuth()
    this.initGeolocate()
    this.ObtenerTagPool()
  },

  computed: {

    listado() {

      let lista = []

      let listado_total = []

      if(this.helpers.filtro_rango){

        this.rentas.listado.forEach(renta => {

          if(this.VerificarRangoPrecios(renta.rango)){

            listado_total.push(renta)

          }

        })

      }
      else{
        listado_total = [...this.rentas.listado]
      }

      if(this.helpers.filtro_fecha || this.helpers.filtro_hora){

        listado_total.filter(renta => {

          if(this.helpers.filtro_hora && this.helpers.hora_planeada){

            if(this.VerificarHoraFiltro(this.helpers.hora_planeada, renta.abre, renta.cierra)){

              lista.push(renta)

            }

          }

        })

      }
      else{

        lista = listado_total

      }

      return lista

    },

    rango(){

      let rangoPrecios = [1.00, 1000.00]

      if(this.productos.listado && this.productos.listado.length > 0){
        rangoPrecios = [this.productos.listado[0].valor, this.productos.listado[this.productos.listado.length - 1].valor]
      }

      this.range = [rangoPrecios[0], rangoPrecios[1]]

      return rangoPrecios

    }

  },

  data(){
    return{

      dialogos: {
        mapa: false,
        filtro_fecha: false,
        filtro_hora: false
      },

      coords: { lat: 0, lng: 0 },

      helpers: {
        nonce: 1,
        mapSearch: null,
        busqueda: null,
        filtro_fecha: false,
        filtro_hora: false,
        filtro_rango: false,
        fecha_planeada: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        hora_planeada: null
      },

      rentas: {
        listado: []
      },

      productos: {

        listado: []

      },

      filtros: [
        { texto: 'Hora Planeada', icono: 'fa fa-clock', valor: 'H' },
        { texto: 'Fecha Planeada', icono: 'fa fa-calendar-day', valor: 'F' },
        { texto: 'Rango de Precios', icono: 'fa fa-money-bill-wave', valor: 'R' },
      ],

      range: [1.00, 1000.00],

      markers: [],

      places: [],

      currentPlace: null,

      marker: { position: { lat: 14.55706946331603, lng: -90.73366553217345 } },

      center: { lat: 14.55706946331603, lng: -90.73366553217345 },

      mapOptions: {
        disableDefaultUI: true,
      },

      auth: {},

      tag_pool: [],

      tags_seleccionadas: []

    }
  },

  methods: {

    async EnviarMensaje(renta){

      let login = true

      if(!JSON.parse(sessionStorage.getItem('usuario'))){
        this.$alert.warning("No puedes enviar mensajes porque no has iniciado sesión",
          "Contacto Fallido")
        login = false
        return
      }

      let negocioFound = {id: 0}

      if(this.$store.state.negocios && this.$store.state.negocios.length > 0){
        negocioFound = this.$store.state.negocios.find( n => n.id === renta.id );
      }

      if(login){

        if(negocioFound && negocioFound.id > 0){
          this.$alert.warning("No puedes enviar mensajes a tu negocio",
            "Contacto Fallido")
        }
        else{
          await this.$api.post("/usuario/info", { id: renta.usuarioId })
            .then(async data => {
              let encargado = data
              try {

                const chatsRef = this.$fire.database.ref(
                  'Chats/'+'chat' + this.auth.id+"-"+encargado.id + '/'+'idNegocio'+renta.id
                )

                Axios.get(chatsRef.toString() + '.json').then(async response => {

                  if(!response.data){
                    let chat = {
                      usuario: "id"+this.auth.id,
                      negocio: "id"+encargado.id,
                      key_negocio: 'idNegocio'+renta.id,
                      ultimoMensaje: ''
                    }

                    const userChatsRef = this.$fire.database.ref('userChats')
                      .child("id"+this.auth.id).child("chat"+this.auth.id+"-"+encargado.id)

                    const encargadoChatsRef = this.$fire.database.ref('userChats')
                      .child("id"+encargado.id).child("chat"+this.auth.id+"-"+encargado.id)

                    await chatsRef.set(chat)

                    await userChatsRef.set("chat"+this.auth.id+"-"+encargado.id)
                    await encargadoChatsRef.set("chat"+this.auth.id+"-"+encargado.id)

                  }

                  this.$router.push({path: '/usuario/mensajes?id=' + renta.id })

                })

              } catch (e) {
                console.error(e)
              }
            })
        }

      }

    },

    async ObtenerAuth(){
      if(JSON.parse(sessionStorage.getItem('usuario')))
        this.auth = await this.$api.post("/usuario/info",
          { id: JSON.parse(sessionStorage.getItem('usuario')).id })
    },

    async ObtenerRentaAutos(){

      await this.$api.post("/negocios/categoria", { categoria: "RC" }).then( data => {

        this.rentas.listado = data
        let cont = 0
        this.rentas.listado.forEach( async renta => {

          let params = {
            negocioId: renta.id
          }

          renta.totalValoraciones = 0
          renta.puntuacionAvg = 0

          await this.$api.post("/valoraciones", params).then(data => {

            let valoracionesAvg = 0

            data.forEach(valoracion => {

              valoracionesAvg += valoracion.puntuacion;

            })

            renta.totalValoraciones = data.length

            renta.puntuacionAvg = (data.length > 0) ? valoracionesAvg / data.length : 0

            this.$forceUpdate()

          })

          await this.$api.post("/productos", { id: hotel.id }).then(data => {

            data.sort(function (a, b) {
              return a.valor - b.valor
            })

            hotel.rango = [+data[0].valor, +data[data.length - 1].valor]

            this.productos.listado = [...this.productos.listado, ...data]

            this.productos.listado.sort(function (a, b) {
              return a.valor - b.valor
            })

          })

          renta.showCardTags = false
          renta.tags = ["Al aire libre"]
          cont++

        } )

      } )

    },

    async ObtenerTagPool(){

      await this.$api.get('/negocios', {}).then(data => {

        data.rentas.forEach(async negocio => {

          await this.$api.post("/tags/negocio", { negocioId: negocio.id }).then(data => {

            data.forEach(tag => {

              this.tag_pool.push(tag.tag)

            })

          })

        })

      })

    },

    async RefrescarNegocios(){

      if(this.tags_seleccionadas && this.tags_seleccionadas.length > 0){

        let seleccionadas = []

        this.tags_seleccionadas.forEach(tag => {

          seleccionadas.push(this.tag_pool[tag])

        })

        let params = {
          tags: seleccionadas
        }

        await this.$api.post("/tags", params).then(data => {

          this.rentas.listado = data

          this.rentas.listado.forEach( async renta => {

            let params = {
              negocioId: renta.id
            }

            renta.totalValoraciones = 0
            renta.puntuacionAvg = 0

            await this.$api.post("/valoraciones", params).then(data => {

              let valoracionesAvg = 0

              data.forEach(valoracion => {

                valoracionesAvg += valoracion.puntuacion;

              })

              renta.totalValoraciones = data.length

              renta.puntuacionAvg = (data.length > 0) ? valoracionesAvg / data.length : 0

              this.$forceUpdate()

            })

          } )

        }).catch(({ data }) => {
          console.error(data)
          this.$alert.error('Ocurrió un error interno, vuelva a intentarlo', 'Error Interno')
        })

      }

      else{

        await this.ObtenerRentaAutos()

      }

    },

    initGeolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.coords.lat = position.coords.latitude
        this.coords.lng = position.coords.longitude
      });
    },

    CalcularDistancia(lng, lat){

      lng = parseFloat(lng)
      lat = parseFloat(lat)

      var R = 6371; // Radius of the earth in km
      var dLat = this.deg2rad(lat-this.coords.lat);  // deg2rad below
      var dLon = this.deg2rad(lng-this.coords.lng);
      var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.deg2rad(this.coords.lat)) * Math.cos(this.deg2rad(lat)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      // Distance in km
      return (R * c).toFixed(0);

    },

    deg2rad(deg) {
      return deg * (Math.PI/180)
    },

    InformacionProducto(renta){

      this.$router.push({ path: '/servicios/renta_autos/'+renta.id })

    },

    VerificarHoraFiltro(hora, abre, cierra){

      var format = 'hh:mm:ss'
      var time = this.$moment(hora, format),
        beforeTime = this.$moment(abre, format),
        afterTime = this.$moment(cierra, format);

      return time.isBetween(beforeTime, afterTime)

    },

    VerificarRangoPrecios(rangoPrecios){

      return (Math.floor(+rangoPrecios[0]) >= this.range[0] && Math.floor(+rangoPrecios[0]) <= this.range[1]) ||
        (Math.floor(+rangoPrecios[1]) >= this.range[0] && Math.floor(+rangoPrecios[1]) <= this.range[1])

    },

    FiltrarNegocio(filtro){

      if(filtro.valor === 'F'){

        this.dialogos.filtro_fecha = true

      }
      else if(filtro.valor === 'H'){

        this.dialogos.filtro_hora = true

      }

    },

    FiltrarFecha(){

      this.$refs.fecha_planeada.save(this.helpers.fecha_planeada)
      this.helpers.filtro_fecha = true

    },

    FiltrarHora(){

      this.$refs.hora_planeada.save(this.helpers.hora_planeada)
      this.helpers.filtro_hora = true

    },

    LimpiarFiltros(){

      this.helpers.fecha_planeada = null
      this.helpers.hora_planeada = null
      this.helpers.filtro_fecha = false
      this.helpers.filtro_hora = false
      this.helpers.filtro_rango = false
      this.range = [1,1000]
      this.tags_seleccionadas = []
      this.ObtenerRentaAutos()

    },

    VerificarHora(abre, cierra){

      var format = 'hh:mm:ss'
      var time = this.$moment(this.$moment(),format),
        beforeTime = this.$moment(abre, format),
        afterTime = this.$moment(cierra, format);

      if (time.isBetween(beforeTime, afterTime)) {

        return "Abierto"

      } else {

        return "Cerrado"

      }

    },

    MostrarDialogoMapa(){
      this.dialogos.mapa = true
    },

    CerrarDialogoMapa(){
      this.dialogos.mapa = false
    },

    StringTags(tags){

      let tagg = ""

      let count = 1

      tags.forEach(tag => {

        if(count === tags.length){
          tagg += tag;
        }
        else{
          tagg = tagg + tag + ', '
          count++;
        }

      })

      return tagg

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
