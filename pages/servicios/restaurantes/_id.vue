<template>

  <v-container fluid>

    <v-row>

      <v-col cols="1" align-self="center" class="hidden-sm-and-down">

        <v-avatar
          :class="($vuetify.breakpoint.name === 'xl' ||
                   $vuetify.breakpoint.name === 'lg') ? 'ml-10' : 'ml-5' "
          size="100"
          tile
        >
          <v-img v-if="restaurante.img" :src="restaurante.img" style="border-radius:10px;" />
          <v-img v-else :src="'/imagen-no-disponible.png'"></v-img>
        </v-avatar>

      </v-col>

      <v-col cols="12" xl="11" lg="11" md="11" sm="12">
        <v-list :class="($vuetify.breakpoint.name === 'sm' ||
                    $vuetify.breakpoint.name === 'xs') ? null : 'px-10'">

          <v-list-item>

            <v-list-item-title>

              <h1 class="black--text hidden-sm-and-down" style="font-size: 24px;">
                {{ restaurante.nombre }}
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary darken-2"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      icon
                      @click="EnviarMensaje"
                    >
                      <v-icon color="primary darken-2">
                        fa fa-paper-plane
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Contactar</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary darken-2"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      icon
                      :to="'/negocios/reservaciones?id=' + $route.params.id"
                    >
                      <v-icon color="black">
                        fa fa-calendar-week
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Reservar</span>
                </v-tooltip>
              </h1>
              <h3 class="black--text hidden-md-and-up" style="font-size: 20px;">
                {{ restaurante.nombre }}
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary darken-2"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      icon
                      @click="EnviarMensaje"
                    >
                      <v-icon color="primary darken-2" small>
                        fa fa-paper-plane
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Contactar</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary darken-2"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      icon
                      :to="'/negocios/reservaciones?id=' + $route.params.id"
                    >
                      <v-icon color="black">
                        fa fa-calendar-week
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Reservar</span>
                </v-tooltip>
              </h3>


            </v-list-item-title>

          </v-list-item>

          <v-list-item class="mt-n2">

            <v-list-item-title>
              <v-row class="py-4 pl-2">

                <v-rating
                  :value="restaurante.puntuacionAvg"
                  color="secondary"
                  dense
                  half-increments
                  readonly
                />

                <div class="grey--text mt-1 ml-1">
                  {{ restaurante.totalValoraciones }} valoraciones |
                  <v-icon class="mx-1" small color="black"> fa fa-tags </v-icon>{{tags}} |
                  <v-icon color="black" class="mr-1">fa fa-map-pin</v-icon>
                  Se encuentra a <span class="font-weight-bold">
                    {{ CalcularDistancia(restaurante.lng, restaurante.lat) }} km
                      </span> de ti
                </div>

              </v-row>

            </v-list-item-title>

          </v-list-item>

          <v-list-item class="mt-n3">

            <v-list-item-title>
              <v-row class="py-4 px-3">

                <div class="grey--text mt-1 text-wrap">

                  <v-icon class="mx-1" small color="black"> fa fa-map-marker-alt </v-icon>{{ restaurante.direccion }} |
                  <v-icon class="mx-1" small color="black"> fa fa-phone </v-icon> (+502) {{ FormatTelefono() }} |
                  <v-icon class="mx-1" small color="black"> fa fa-clock </v-icon> {{ $moment(restaurante.abre, "HH:mm:ss").format('h:mm a') }} -
                  {{ $moment(restaurante.cierra, "HH:mm:ss").format('h:mm a')  }} (<span :class="VerificarHora() === 'Cerrado' ?
                                                                                    'red--text' : 'green--text'">
                    {{ VerificarHora() }}
                  </span>)

                </div>

              </v-row>

            </v-list-item-title>

          </v-list-item>

        </v-list>
      </v-col>

    </v-row>

    <v-divider class="my-4"/>

    <v-btn
      color="secondary"
      @click="Regresar"
      outlined
      :class="($vuetify.breakpoint.name === 'sm' ||
               $vuetify.breakpoint.name === 'xs') ? 'my-4 ml-2' : 'my-4 ml-12'"
    >
      <v-icon left color="secondary">
        fa fa-arrow-left
      </v-icon>
      Regresar
    </v-btn>

    <v-slide-group show-arrows class="hidden-sm-and-down pa-9" ref="slideGroup">

      <template v-slot:next>
        <v-icon color="black"> fa fa-arrow-right </v-icon>
      </template>
      <template v-slot:prev>
        <v-icon color="black"> fa fa-arrow-left </v-icon>
      </template>


      <div v-for="(image, i) in galeria" :key="i">

        <v-slide-item>

          <v-img class="ma-1" :src="image" @click="index = i" min-height="400" max-width="500" max-height="400" style="border-radius:10px;">

            <v-container fill-height v-if="i === 0">

              <v-layout justify-start align-end>
                <a style="text-decoration:none;">
                  <span class="white--text" @click="GaleriaImagenes">
                    <v-icon color="white"> fa fa-images</v-icon>
                    Ver todas las imágenes ({{ galeria.length }})
                  </span>
                </a>

              </v-layout>

            </v-container>

          </v-img>

        </v-slide-item>

      </div>

    </v-slide-group>

    <v-img class="ma-1 hidden-md-and-up mx-2" :src="galeria[0]" max-height="300" style="border-radius:10px;">

      <v-container fill-height>

        <v-layout justify-start align-end>

          <a style="text-decoration:none;">
                <span class="white--text" @click="GaleriaImagenes">
                <v-icon color="white"> fa fa-images</v-icon>
                Ver todas las imágenes ({{ galeria.length }})
              </span>
          </a>

        </v-layout>

      </v-container>

    </v-img>

    <vue-gallery-slideshow :images="galeria" :index="index" @close="index = null" />


    <v-row :class="($vuetify.breakpoint.name === 'sm' ||
                    $vuetify.breakpoint.name === 'xs') ? 'my-5' : 'px-16 my-5'">

      <v-col cols="12" xl="4" lg="4">

        <v-card style="border-radius:15px;" elevation="0" outlined
                class="pa-2" :min-height="($vuetify.breakpoint.name === 'md' || $vuetify.breakpoint.name === 'sm' ||
                                           $vuetify.breakpoint.name === 'xs') ? null : 390"
        >

          <v-toolbar elevation="0" dense color="transparent" class="hidden-sm-and-down">
            <h4>
              Calificaciones y valoraciones
            </h4>
          </v-toolbar>

          <v-toolbar elevation="0" dense color="transparent" class="hidden-md-and-up">
            <h4>
              Calificaciones y valoraciones
            </h4>
          </v-toolbar>

          <v-card-text class="pa-3">

            <v-row class="py-4 pl-3">

              <h2 class="black--text mt-1 mr-1">
                {{ restaurante.puntuacionAvg }}
              </h2>

              <v-rating
                :value="restaurante.puntuacionAvg"
                color="secondary"
                dense
                half-increments
                readonly
              />

              <div class="grey--text mt-1 ml-1">
                ({{ restaurante.totalValoraciones }} valoraciones)
              </div>

            </v-row>

            <v-divider class="my-4" />

            <v-list-item class="ml-n4">
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold">Descripción</v-list-item-title>
                <v-list-item-subtitle class="mt-2 text-wrap">{{ restaurante.descripcion }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider class="my-4" />

            <v-row class="pt-n6 mt-4">

              <h3 class="ml-3 black--text">
                Horario
              </h3>

              <v-col cols="12">

                <v-list class="ml-n4 mt-n2">

                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="black">
                        fa fa-clock
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ $moment(restaurante.abre, "HH:mm:ss").format('h:mm a') }} -
                        {{ $moment(restaurante.cierra, "HH:mm:ss").format('h:mm a')  }} (<span :class="VerificarHora() === 'Cerrado' ?
                                                                                    'red--text' : 'green--text'">
                          {{ VerificarHora() }}</span>)
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                </v-list>

              </v-col>

            </v-row>

          </v-card-text>

        </v-card>

      </v-col>

      <v-col cols="12" xl="4" lg="4">

        <v-card style="border-radius:15px;" elevation="0" outlined
                class="pa-2" :min-height="($vuetify.breakpoint.name === 'md' || $vuetify.breakpoint.name === 'sm' ||
                                           $vuetify.breakpoint.name === 'xs') ? null : 390"
        >

          <v-toolbar elevation="0" dense color="transparent" class="hidden-sm-and-down">
            <h4>
              Detalles Generales
            </h4>
          </v-toolbar>

          <v-toolbar elevation="0" dense color="transparent" class="hidden-md-and-up">
            <h4>
              Detalles Generales
            </h4>
          </v-toolbar>

          <v-card-text class="pa-3">

            <v-row class="pt-n6">

              <v-list class="mt-n4">

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Rango de precios</v-list-item-title>
                    <v-list-item-subtitle class="mt-2">
                      {{ CalcularRangoPrecios() }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Servicios que ofrecen</v-list-item-title>
                    <v-list-item-subtitle class="mt-2 text-wrap">{{ tags }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

              </v-list>

            </v-row>

            <v-divider class="my-4" />

            <v-row class="pt-n6 mt-4">

              <h3 class="ml-3 black--text">
                Datos
              </h3>

              <v-col cols="12">

                <v-list class="ml-n4 mt-n2">

                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="black">
                        fa fa-phone
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Teléfono: (+502) {{ FormatTelefono() }} </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="black">
                        fa fa-map-marker-alt
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title class="text-wrap">Dirección: {{ restaurante.direccion }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                </v-list>

              </v-col>

            </v-row>

          </v-card-text>

        </v-card>

      </v-col>

      <v-col cols="12" xl="4" lg="4">

        <v-card style="border-radius:15px;" elevation="0" outlined
                class="pa-2" :min-height="($vuetify.breakpoint.name === 'md' || $vuetify.breakpoint.name === 'sm' ||
                                           $vuetify.breakpoint.name === 'xs') ? null : 390"
        >

          <v-toolbar elevation="0" dense color="transparent" class="hidden-sm-and-down">
            <h4>
              Ubicación
            </h4>
          </v-toolbar>

          <v-toolbar elevation="0" dense color="transparent" class="hidden-md-and-up">
            <h4>
              Ubicación
            </h4>
          </v-toolbar>

          <v-card-text class="pa-3">

            <GmapMap
              :center="center"
              :zoom="18"
              map-style-id="roadmap"
              :options="mapOptions"
              class="pa-2"
              style="border-radius:15px; max-height: 80vmin; min-height: 30vmin;"
              ref="mapRef"
            >
              <GmapMarker
                :position="marker.position"
                :clickable="false"
                :draggable="false"
              />
            </GmapMap>

          </v-card-text>

        </v-card>

      </v-col>

    </v-row>

    <v-row :class="($vuetify.breakpoint.name === 'sm' ||
                    $vuetify.breakpoint.name === 'xs') ? 'mb-5' : 'px-16 mb-5'">

      <v-col cols="12">

        <v-card style="border-radius:15px;" elevation="0" outlined
                class="pa-2"
        >

          <v-toolbar elevation="0" dense color="transparent" class="hidden-sm-and-down" min-height="60">
            <h2>
              Productos o servicios que brinda
            </h2>
          </v-toolbar>

          <v-toolbar elevation="0" dense color="transparent" class="hidden-md-and-up" min-height="60">
            <h3>
              Productos o servicios que brinda
            </h3>
          </v-toolbar>

          <v-divider />

          <v-card-text class="pa-4">

            <v-alert
              border="left"
              colored-border
              type="warning"
              elevation="2"
              v-if="productos.listado && productos.listado.length === 0"
            >
              Lo sentimos, este restaurante aún no cuenta con productos o servicios
            </v-alert>

            <v-row>

              <v-col cols="12"
                     xl="4"
                     lg="4"
                     v-for="(producto, i) in productos.listado"
                     :key="i"
              >

                <v-hover v-slot="{ hover }">

                  <v-card
                    class="mx-auto" color="grey lighten-4" min-width="450"
                    style="border-radius:15px;" elevation="0" outlined
                    :max-width="($vuetify.breakpoint.name === 'sm' ||
                                 $vuetify.breakpoint.name === 'xs') ? null : 400"
                  >

                    <v-img
                      :aspect-ratio="16/9"
                      :contain="!producto.img"
                      :src="producto.img ? producto.img : '/imagen-no-disponible.png'"
                    >

                      <v-expand-transition>
                        <div
                          v-if="hover"
                          class="d-flex transition-fast-in-fast-out tertiary darken-2 v-card--reveal text-h2 white--text"
                          style="height: 100%;"
                        >
                          <v-container fill-height>
                            <v-layout justify-center align-center>
                              Q. {{ producto.valor }}
                            </v-layout>
                          </v-container>
                        </div>
                      </v-expand-transition>

                    </v-img>

                    <v-card-text class="pa4">
                      <h2 class="font-weight-light black--text mb-2">
                        {{ producto.nombre }}
                      </h2>
                      <div class="font-weight-light mb-2" style="">
                        {{ producto.descripcion }}
                      </div>
                    </v-card-text>

                    <v-divider class="my-4"/>

                    <v-card-actions>

                      <v-btn
                        color="black"
                        outlined
                        @click="MostrarDialogoCaracteristicas(producto)"
                      >
                        <v-icon left color="primary darken-1">
                          fa fa-shopping-cart
                        </v-icon>
                        ¿Qué ofrece?
                      </v-btn>

                    </v-card-actions>

                  </v-card>

                </v-hover>

              </v-col>

            </v-row>

          </v-card-text>

        </v-card>

      </v-col>

    </v-row>

    <v-row :class="($vuetify.breakpoint.name === 'sm' ||
                    $vuetify.breakpoint.name === 'xs') ? 'mb-5' : 'px-16 mb-5'">

      <v-col cols="12">

        <v-card style="border-radius:15px;" elevation="0" outlined
                class="pa-2"
        >

          <v-toolbar elevation="0" dense color="transparent" class="hidden-sm-and-down" min-height="60">
            <h2>
              Valoraciones
            </h2>
            <v-spacer />
            <v-btn class="mt-1" elevation="0"
                   style="border-radius: 5px;"
                   color="secondary" dark
                   @click="MostrarDialogoValoracion"
            >
              <v-icon left>
                fa fa-comment
              </v-icon>
              Escribe un reseña
            </v-btn>
          </v-toolbar>

          <v-toolbar elevation="0" dense color="transparent" class="hidden-md-and-up" min-height="60">
            <h3>
              Valoraciones
            </h3>
            <v-spacer />
            <v-btn class="mt-1" elevation="0"
                   style="border-radius: 5px;"
                   color="secondary" dark small
                   @click="MostrarDialogoValoracion"
            >
              <v-icon left>
                fa fa-comment
              </v-icon>
              Escribe un reseña
            </v-btn>
          </v-toolbar>

          <v-divider />

          <v-card-text class="pa-4">

            <v-alert
              border="left"
              colored-border
              type="warning"
              elevation="2"
              v-if="valoraciones && valoraciones.length === 0"
            >
              Lo sentimos, este restaurante aún no cuenta con reseñas
            </v-alert>

            <v-list>

              <v-divider />

              <div v-for="(valoracion, v) in valoraciones"
                   :key="valoracion.id"
              >

                <v-list-item class="mt-2 mb-1">

                  <v-list-item-avatar>

                    <v-img :src="valoracion.img ? valoracion.img : '/no-pf.png' " />

                  </v-list-item-avatar>

                  <v-list-item-content>

                    <div>
                      <v-row
                        align="center"
                        class="mx-0 mb-1 pl-n1"
                      >
                        <v-rating
                          :value="valoracion.puntuacion"
                          color="secondary"
                          dense
                          readonly
                        />

                        <div class="black--text">
                          &mdash; escrita por {{ valoracion.nombre }}
                        </div>
                      </v-row>
                    </div>

                    <v-list-item-title v-text="valoracion.titulo" class="font-weight-bold" />
                    <v-list-item-subtitle v-text="valoracion.comentario" class="black--text text-wrap text-justify" />
                    <v-list-item-subtitle v-text="formatDate(valoracion.createdAt)" class="text-wrap text-justify" />

                  </v-list-item-content>

                  <v-list-item-action>

                    <v-spacer/>

                    <v-tooltip bottom v-if="VerificarValoracion(valoracion)">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="error"
                          dark
                          v-bind="attrs"
                          v-on="on"
                          icon
                          @click="EliminarValoracion(valoracion)"
                        >
                          <v-icon
                            color="error"
                          >
                            fas fa-trash
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>Eliminar Valoración</span>
                    </v-tooltip>

                  </v-list-item-action>

                </v-list-item>

                <v-divider />

              </div>

            </v-list>

          </v-card-text>

        </v-card>

      </v-col>

    </v-row>

    <v-dialog v-model="dialogos.caracteristicas"
              transition="fab-transition"
              scrollable
              persistent
              max-width="550px"
    >
      <v-card>

        <v-toolbar elevation="0" dense color="transparent">

          <v-btn icon @click="CerrarDialogoCaracteristicas">
            <v-icon>fa fa-times</v-icon>
          </v-btn>

          <v-layout justify-center>
            <h4> ¿Qué ofrece este producto? </h4>
          </v-layout>

        </v-toolbar>

        <v-card-text class="pa-4">

          <v-list>

            <v-list-item v-for="caracteristica in productos.seleccionado.carac" :key="caracteristica.id">

              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="black">
                    {{ caracteristica.icono }}
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="text-wrap">{{ caracteristica.nombre }} </v-list-item-title>
                  <v-list-item-subtitle class="text-wrap">{{ caracteristica.valor }} </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

            </v-list-item>

          </v-list>

        </v-card-text>

      </v-card>
    </v-dialog>

    <v-overlay :value="$store.state.loading">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>

    <Valoracion v-model="dialogos.valoracion" :valoracion.sync="valoracion"
                :negocioId="+$route.params.id" @refresh="ObtenerValoraciones"
    />

  </v-container>

</template>

<script>

import VueGallerySlideshow from 'vue-gallery-slideshow';
import Valoracion from "@/components/restaurantes/Valoracion";
import * as Axios from "axios";

export default {

  mounted() {
    this.ObtenerRestaurante()
    this.ObtenerGaleria()
    this.ObtenerValoraciones()
    this.geolocate()

  },

  components: { VueGallerySlideshow, Valoracion },

  data() {

    return {

      dialogos: {

        caracteristicas: false,
        valoracion: false

      },

      coords: { lat: 0, lng: 0 },

      valoracion: { puntuacion: 0 },

      valoraciones: [],

      helpers: {
        nonce: 1,
        mapSearch: null,
        busqueda: null
      },

      range: [1,1000],

      markers: [],

      places: [],

      currentPlace: null,

      marker: { position: { lat: 14.55706946331603, lng: -90.73366553217345 } },

      center: { lat: 14.55706946331603, lng: -90.73366553217345 },

      mapOptions: {
        disableDefaultUI: true,
      },

      restaurante: {},

      tags: '',

      productos: {
        listado: [],
        seleccionado: {}
      },

      index: null,

      galeria: [],

      auth: {}

    }
  },

  methods: {

    geolocate() {
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

    async ObtenerGaleria(){

      await this.$api.post("/galeria/negocio",{ negocioId:  +this.$route.params.id }).then( data => {

        data.forEach(imagen => {

          this.galeria.push(imagen.img)

        })

      })

    },

    async ObtenerAuth(){
      if(JSON.parse(localStorage.getItem('usuario')))
        this.auth = await this.$api.post("/usuario/info",
          { id: JSON.parse(localStorage.getItem('usuario')).id })
    },

    async EnviarMensaje(){

      let login = true

      if(!JSON.parse(localStorage.getItem('usuario'))){
        this.$alert.warning("No puedes enviar mensajes porque no has iniciado sesión",
          "Contacto Fallido")
        login = false
        return
      }

      let negocioFound = {}
      negocioFound.id = 0

      if(this.$store.state.negocios && this.$store.state.negocios.length > 0){
        negocioFound = this.$store.state.negocios.find( n => n.id === this.restaurante.id );
      }

      try {

        if(login){

          if(negocioFound && negocioFound.id > 0){
            this.$alert.warning("No puedes enviar mensajes a tu negocio",
              "Contacto Fallido")
          }
          else{
            await this.$api.post("/usuario/info", { id: this.restaurante.usuarioId })
              .then(async data => {
                let encargado = data
                try {

                  const chatsRef = this.$fire.database.ref(
                    'Chats/'+'chat' + this.auth.id+"-"+encargado.id + '/'+'idNegocio'+ this.restaurante.id
                  )

                  Axios.get(chatsRef.toString() + '.json').then(async response => {

                    if(!response.data){
                      let chat = {
                        usuario: "id"+this.auth.id,
                        negocio: "id"+encargado.id,
                        key_negocio: 'idNegocio'+this.restaurante.id,
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

                    this.$router.push({path: '/usuario/mensajes?id=' + this.restaurante.id })

                  })

                } catch (e) {
                  console.error(e)
                }
              })
          }

        }

      }
      catch(e){
        console.error(e)
      }

    },

    async ObtenerProductos(){

      let params = {
        id: this.restaurante.id
      }

      this.productos.listado = await this.$api.post("/productos", params)

      this.productos.listado.sort(function (a, b) {
        return a.valor - b.valor
      })

    },

    async ObtenerRestaurante(){

      await this.$api.post("/negocios/categoria", { categoria: "R" }).then( data => {

        data.forEach( negocio => {

          if(negocio.id === +this.$route.params.id){

            this.restaurante = negocio

          }

        } )

        this.marker.position.lat = +this.restaurante.lat
        this.marker.position.lng = +this.restaurante.lng
        this.center.lat = +this.restaurante.lat
        this.center.lng = +this.restaurante.lng
        this.$forceUpdate()
        this.ObtenerProductos()
        this.ObtenerTags()

      } )

    },

    async ObtenerTags(){

      this.restaurante.tags = await this.$api.post("/tags/negocio", { negocioId: this.restaurante.id })

      this.restaurante.tags.forEach( tag => {

        this.tags += tag.tag + ", "

      })

      this.tags = this.tags.substring(0, this.tags.length-2)

    },

    async ObtenerValoraciones(){

      let params = {
        negocioId: +this.$route.params.id
      }

      this.valoraciones = await this.$api.post("/valoraciones", params)
      let valoracionesAvg = 0

      for (const valoracion of this.valoraciones) {

        valoracionesAvg += valoracion.puntuacion;

        let userRef = this.$fire.database.ref("Users/id"+valoracion.usuarioId)

        await userRef.on('value', (snapshot) => {
          valoracion.nombre = snapshot.val().nombre
          this.$forceUpdate()
        })


        await this.$fire.storage.ref('usuarios/' + valoracion.usuarioId + "/foto-perfil")
          .getDownloadURL().then((url) => {

            valoracion.img = url
            this.$forceUpdate()

          })

      }

      this.restaurante.totalValoraciones = this.valoraciones.length
      this.restaurante.puntuacionAvg = (this.valoraciones.length > 0) ? valoracionesAvg / this.valoraciones.length : 0
      this.$forceUpdate()

    },

    CalcularRangoPrecios(){

      if(this.productos.listado && this.productos.listado.length > 0){

        return "GTQ " + this.productos.listado[0].valor + " - GTQ " + this.productos.listado[this.productos.listado.length - 1].valor

      }

      else {

        return "-"

      }

    },

    VerificarValoracion(valoracion){

      if(!JSON.parse(localStorage.getItem('usuario'))){

        return false

      }

      else{

        return JSON.parse(localStorage.getItem('usuario')).id === valoracion.usuarioId

      }

    },

    async EliminarValoracion(valoracion){

      this.$alert.confirm('¿Estás seguro que deseas eliminar esta valoración?',
        'Eliminar Valoración').then(async () => {

        let params = {

          id: valoracion.id

        }

        await this.$api.delete("/valoracion", params).then(data => {

          this.ObtenerValoraciones()
          this.$alert.exito("La valoración fue eliminada exitosamente", "Valoración Eliminada")

        })

      })

    },

    formatDate(date){
      return this.$moment.utc(date, 'YYYY-MM-DD h:mm:ss').format('dddd, LL [a las ] h:mm:ss a').charAt(0).toUpperCase() +
        this.$moment.utc(date, 'YYYY-MM-DD h:mm:ss').format('dddd, LL [a las ] h:mm:ss a').slice(1)
    },

    async ObtenerCaracteristicas(){

      let params = {
        productoId: this.productos.seleccionado.id
      }

      this.productos.seleccionado.carac = await this.$api.post("/carte/producto", params)

      this.$forceUpdate()

    },

    MostrarDialogoCaracteristicas(producto){

      this.productos.seleccionado = Object.assign({}, producto)
      this.dialogos.caracteristicas = true
      this.ObtenerCaracteristicas()

    },

    MostrarDialogoValoracion(){

      this.dialogos.valoracion = true

    },

    CerrarDialogoCaracteristicas(){

      this.productos.seleccionado = {}
      this.dialogos.caracteristicas = false

    },

    CerrarDialogoValoracion(){

      this.valoracion = {}
      this.dialogos.valoracion = false

    },

    GaleriaImagenes(){

      this.index = null
      this.$router.push({ path: '/servicios/restaurantes/galeria?id='+this.restaurante.id })

    },

    VerificarHora(){

      if(this.restaurante && this.restaurante.abre && this.restaurante.cierra){

        var format = 'hh:mm:ss'
        var time = this.$moment(this.$moment(),format),
          beforeTime = this.$moment(this.restaurante.abre, format),
          afterTime = this.$moment(this.restaurante.cierra, format);

        if (time.isBetween(beforeTime, afterTime)) {
          return "Abierto"

        } else {

          return "Cerrado"

        }

      }

    },

    FormatTelefono(){

      if(this.restaurante.telefono){

        return this.restaurante.telefono.substring(0, 4) + " " + this.restaurante.telefono.substring(4)

      }

    },

    Regresar(){

      let path

      if(this.$nuxt.context.from.path.includes("galeria")){
        path = '/servicios/restaurantes'
      }
      else if(!this.$nuxt.context.from.path.includes("galeria") && !this.$nuxt.context.from.path.includes("restaurantes")){
        path = '/'
      }
      else{
        path = this.$nuxt.context.from.path
      }

      this.$router.push({ path: path })

    }

  }

}

</script>
