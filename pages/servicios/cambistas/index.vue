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
              Lo sentimos, aún no hay cambistas disponibles para mostrar.
            </v-alert>
          </v-col>

          <v-col cols="12"
                 lg="4"
                 md="6"
                 sm="6"
                 v-for="(cambista, i) in listado"
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
                max-height="300"
                :src="cambista.img ? cambista.img : '/imagen-no-disponible.png'"
              ></v-img>

              <v-card-title>
                <h4>
                  {{ cambista.nombre }}
                </h4>
                <v-spacer/>
                <h6>
                  <span :class="VerificarHora(cambista.abre, cambista.cierra) === 'Cerrado' ?
                  'red--text' : 'green--text'">
                    {{ VerificarHora(cambista.abre, cambista.cierra) === 'Cerrado' ? 'No disponible' : 'Disponible' }}
                  </span> -
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-chip outlined color="black" small v-bind="attrs" v-on="on">
                        <v-icon color="black" class="mr-1">fa fa-clock</v-icon>
                        Horarios
                      </v-chip>
                    </template>
                    <span> Todos los días de {{ $moment(cambista.abre, "HH:mm:ss").format('h:mm a') }} -
                  {{ $moment(cambista.cierra, "HH:mm:ss").format('h:mm a')  }}</span>
                  </v-tooltip>

                </h6>
              </v-card-title>

              <v-card-text>

                <v-row
                  align="center"
                  class="mx-0 mb-2"
                >
                  <v-rating
                    :value="cambista.puntuacionAvg"
                    color="secondary"
                    dense
                    half-increments
                    readonly
                  />

                  <div class="grey--text ms-4">
                    {{ cambista.puntuacionAvg.toFixed(1) }} ({{ cambista.totalValoraciones }}
                    {{ cambista.totalValoraciones > 1 ||  cambista.totalValoraciones === 0 ?  'valoraciones' : 'valoración' }})
                  </div>
                </v-row>

                <div class="my-2">
                  <v-icon color="black" class="mr-1">
                    fa fa-map-marker-alt
                  </v-icon>
                  Se encuentra a <span class="font-weight-bold">
                    {{ CalcularDistancia(cambista.lng, cambista.lat) }} km
                  </span> de ti
                </div>

                <div>{{ cambista.descripcion ? cambista.descripcion :
                  "Este cambista no cuenta con una descripción" }}</div>

              </v-card-text>

              <v-divider class="my-4"/>

              <v-card-actions>

                <v-btn
                  color="black"
                  outlined
                  @click="InformacionProducto(cambista)"
                >
                  <v-icon left color="secondary">
                    fa fa-compass
                  </v-icon>
                  Explorar
                </v-btn>

                <v-btn
                  color="black"
                  outlined
                  @click="EnviarMensaje(cambista)"
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
            :zoom="14"
            map-style-id="roadmap"
            class="pa-2"
            style="max-width: 100vmin; max-height: 50vmin; min-width: 50vmin; min-height: 50vmin;"
            ref="mapRef"
            @click="handleMapClick"
          >
            <GmapMarker
              v-for="(mk, index) in markers"
              :key="index"
              :position="mk.position"
              :clickable="true"
              @click="toggleInfo(mk, index)"
              :icon="icon_marker"
            />

            <gmap-info-window
              :options="{
                          maxWidth: 300,
                          pixelOffset: { width: 0, height: -35 }
                        }"
              :position="infoWindow.position"
              :opened="infoWindow.open"
              @closeclick="infoWindow.open=false">
              <div v-html="infoWindow.template"></div>
            </gmap-info-window>

          </GmapMap>

        </v-card-text>

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
      this.ObtenerCambistas()
      this.ObtenerTagPool()
      this.ObtenerAuth()
      this.initGeolocate()
    },

    computed: {

      listado() {

        let lista = []

        let listado_total = []

        if(this.helpers.filtro_rango){

          this.cambistas.listado.forEach(cambista => {

            if(this.VerificarRangoPrecios(cambista.rango)){

              listado_total.push(cambista)

            }

          })

        }
        else{
          listado_total = [...this.cambistas.listado]
        }

        if(this.helpers.filtro_fecha || this.helpers.filtro_hora){

          listado_total.filter(cambista => {

            if(this.helpers.filtro_hora && this.helpers.hora_planeada){

              if(this.VerificarHoraFiltro(this.helpers.hora_planeada, cambista.abre, cambista.cierra)){

                lista.push(cambista)

              }

            }

          })

        }
        else{

          lista = listado_total

        }

        this.markers = []

        lista.forEach( async cambista => {

          this.markers.push({position: {lat: +cambista.lat, lng: +cambista.lng}, negocio: cambista})

        })

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

        infoWindow: {
          position: {lat: 0, lng: 0},
          open: false,
          template: ''
        },

        icon_marker: {
          url: "https://cdn0.iconfinder.com/data/icons/travel-vacation/289/travel-transport-hotel-vacation-holidays-tourist-tourism-travelling-traveling_166-512.png",
          scaledSize: {width: 45, height: 45},
          labelOrigin: {x: 16, y: -10}
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

        cambistas: {
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

        range: [1,1000],

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

      async EnviarMensaje(cambista){

        let login = true

        if(!JSON.parse(localStorage.getItem('usuario'))){
          this.$alert.warning("No puedes enviar mensajes porque no has iniciado sesión",
            "Contacto Fallido")
          login = false
          return
        }

        let negocioFound = {id: 0}

        if(this.$store.state.negocios && this.$store.state.negocios.length > 0){
          negocioFound = this.$store.state.negocios.find( n => n.id === cambista.id );
        }

        if(login){

          if(negocioFound && negocioFound.id > 0){
            this.$alert.warning("No puedes enviar mensajes a tu negocio",
              "Contacto Fallido")
          }
          else{
            await this.$api.post("/usuario/info", { id: cambista.usuarioId })
              .then(async data => {
                let encargado = data
                try {

                  const chatsRef = this.$fire.database.ref(
                    'Chats/'+'chat' + this.auth.id+"-"+encargado.id + '/'+'idNegocio'+cambista.id
                  )

                  Axios.get(chatsRef.toString() + '.json').then(async response => {

                    if(!response.data){
                      let chat = {
                        usuario: "id"+this.auth.id,
                        negocio: "id"+encargado.id,
                        key_negocio: 'idNegocio'+cambista.id,
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

                    this.$router.push({path: '/usuario/mensajes?id=' + this.cambista.id })

                  })

                } catch (e) {
                  console.error(e)
                }
              })
          }

        }

      },

      async ObtenerAuth(){
        if(JSON.parse(localStorage.getItem('usuario')))
          this.auth = await this.$api.post("/usuario/info",
            { id: JSON.parse(localStorage.getItem('usuario')).id })
      },

      async ObtenerCambistas(){

        await this.$api.post("/negocios/categoria", { categoria: "C" }).then( data => {

          this.cambistas.listado = data
          this.cambistas.listado.forEach( async cambista => {

            let params = {
              negocioId: cambista.id
            }

            cambista.totalValoraciones = 0
            cambista.puntuacionAvg = 0

            await this.$api.post("/valoraciones", params).then(data => {

              let valoracionesAvg = 0

              data.forEach(valoracion => {

                valoracionesAvg += valoracion.puntuacion;

              })

              cambista.totalValoraciones = data.length

              cambista.puntuacionAvg = (data.length > 0) ? valoracionesAvg / data.length : 0

              this.$forceUpdate()

            })

            await this.$api.post("/productos", { id: cambista.id }).then(data => {

              data.sort(function (a, b) {
                return a.valor - b.valor
              })

              cambista.rango = [+data[0].valor, +data[data.length - 1].valor]

              this.productos.listado = [...this.productos.listado, ...data]

              this.productos.listado.sort(function (a, b) {
                return a.valor - b.valor
              })

            })

          } )

        } )

      },

      async ObtenerTagPool(){

        await this.$api.post("/tags/find", { categoria: 'C' }).then( data => {

          data.forEach(negocio => {

            negocio.tags.forEach( tag => {

              this.tag_pool.push(tag.tag)

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

            this.cambistas.listado = data

            this.cambistas.listado.forEach( async cambista => {

              let params = {
                negocioId: cambista.id
              }

              cambista.totalValoraciones = 0
              cambista.puntuacionAvg = 0

              await this.$api.post("/valoraciones", params).then(data => {

                let valoracionesAvg = 0

                data.forEach(valoracion => {

                  valoracionesAvg += valoracion.puntuacion;

                })

                cambista.totalValoraciones = data.length

                cambista.puntuacionAvg = (data.length > 0) ? valoracionesAvg / data.length : 0

                this.$forceUpdate()

              })

            } )

          }).catch(({ data }) => {
            console.error(data)
            this.$alert.error('Ocurrió un error interno, vuelva a intentarlo', 'Error Interno')
          })

        }

        else{

          await this.ObtenerCambistas()

        }

      },

      toggleInfo(mk, idx){

        const contenido =
          (`<div class="card">
          <div class="card-image">
            <img src="${mk.negocio.img}" alt="Placeholder image"
              style="max-width: 120px; max-height: 120px; min-width: 60px; min-height: 60px;"
              >
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <h3 class="black--text">${mk.negocio.nombre}</h3>
              </div>
            </div>
            <div class="content black--text mb-1">
              ${mk.negocio.direccion}
            </div>
            <div class="content">
              ${mk.negocio.descripcion}
            </div>
            <a href="/servicios/cambistas/${mk.negocio.id}" target="_blank" style="text-decoration: none;">
            <button type="button" class=" my-2 v-btn v-btn--outlined theme--light v-size--small black--text">
              <span class="v-btn__content">
              <i aria-hidden="true" class="v-icon notranslate v-icon--left
                 fa fa fa fa-compass theme--light secondary--text"></i>
                  Explorar
                </span>
            </button>
            </a>
          </div>
        </div>`);

        this.infoWindow.position = { lat: mk.position.lat, lng: mk.position.lng }
        this.infoWindow.title = mk.negocio.nombre
        this.infoWindow.template = contenido
        this.infoWindow.open = true

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
        this.ObtenerCambistas()

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

      InformacionProducto(cambista){

        this.$router.push({ path: '/servicios/cambistas/'+cambista.id })

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

          let mk = this.markers.find(m => m.position.lat === marker.lat && m.position.lng === marker.lng)

          if(mk){
            this.toggleInfo(mk, 0)
          }

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
