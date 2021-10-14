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
          <v-img v-if="guia.img" :src="guia.img" style="border-radius:10px;" />
          <v-img v-else :src="'/imagen-no-disponible.png'"></v-img>
        </v-avatar>

      </v-col>

      <v-col cols="12" xl="11" lg="11" md="11" sm="12">
        <v-list :class="($vuetify.breakpoint.name === 'sm' ||
                    $vuetify.breakpoint.name === 'xs') ? null : 'px-10'">

          <v-list-item>

            <v-list-item-title>

              <h1 class="black--text hidden-sm-and-down" style="font-size: 24px;">
                {{ guia.nombre }}
              </h1>
              <h3 class="black--text hidden-md-and-up" style="font-size: 20px;">
                {{ guia.nombre }}
              </h3>


            </v-list-item-title>

          </v-list-item>

          <v-list-item class="mt-n2">

            <v-list-item-title>
              <v-row class="py-4 pl-2">

                <v-rating
                  :value="4.5"
                  color="secondary"
                  dense
                  half-increments
                  hover
                />

                <div class="grey--text mt-1 ml-1">
                  413 valoraciones |
                  <v-icon class="mx-1" small color="black"> fa fa-tags </v-icon>{{tags}}

                </div>

              </v-row>

            </v-list-item-title>

          </v-list-item>

          <v-list-item class="mt-n3">

            <v-list-item-title>
              <v-row class="py-4 px-3">

                <div class="grey--text mt-1 text-wrap">

                  <v-icon class="mx-1" small color="black"> fa fa-map-marker-alt </v-icon>{{ guia.direccion }} |
                  <v-icon class="mx-1" small color="black"> fa fa-phone </v-icon> (+502) {{ FormatTelefono() }} |
                  <v-icon class="mx-1" small color="black"> fa fa-clock </v-icon> {{ $moment(guia.abre, "HH:mm:ss").format('h:mm a') }} -
                  {{ $moment(guia.cierra, "HH:mm:ss").format('h:mm a')  }} (<span :class="VerificarHora() === 'Cerrado' ?
                                                                                    'red--text' : 'green--text'">
                    {{ VerificarHora() === 'Cerrado' ? 'No disponible' : 'Disponible' }}
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


      <div v-for="(image, i) in images" :key="i">

        <v-slide-item>

          <v-img class="ma-1" :src="image" @click="index = i" max-width="400" max-height="400" style="border-radius:10px;">

            <v-container fill-height v-if="i === 0">

              <v-layout justify-start align-end>

              <span class="white--text" @click="GaleriaImagenes">
                <v-icon color="white"> fa fa-images</v-icon>
                Ver todas las imágenes ({{ images.length }})
              </span>

              </v-layout>

            </v-container>

          </v-img>

        </v-slide-item>

      </div>

    </v-slide-group>

    <v-img class="ma-1 hidden-md-and-up mx-2" :src="images[0]" max-height="300" style="border-radius:10px;">

      <v-container fill-height>

        <v-layout justify-start align-end>

              <span class="white--text" @click="GaleriaImagenes">
                <v-icon color="white"> fa fa-images</v-icon>
                Ver todas las imágenes ({{ images.length }})
              </span>

        </v-layout>

      </v-container>

    </v-img>

    <vue-gallery-slideshow :images="images" :index="index" @close="index = null" />


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
                4.5
              </h2>

              <v-rating
                :value="4.5"
                color="secondary"
                dense
                half-increments
                hover
              />

              <div class="grey--text mt-1 ml-1">
                (413 valoraciones)
              </div>

            </v-row>

            <v-divider class="my-4" />

            <v-list-item class="ml-n4">
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold">Descripción</v-list-item-title>
                <v-list-item-subtitle class="mt-2 text-wrap">{{ guia.descripcion }}</v-list-item-subtitle>
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
                        {{ $moment(guia.abre, "HH:mm:ss").format('h:mm a') }} -
                        {{ $moment(guia.cierra, "HH:mm:ss").format('h:mm a')  }} (<span :class="VerificarHora() === 'Cerrado' ?
                                                                                    'red--text' : 'green--text'">
                          {{ VerificarHora() === 'Cerrado' ? 'No disponible' : 'Disponible' }}</span>)
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
                    <v-list-item-subtitle class="mt-2">GTQ 23 - GTQ 77</v-list-item-subtitle>
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
                      <v-list-item-title>Dirección: {{ guia.direccion }}</v-list-item-title>
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
              style="max-height: 80vmin; min-height: 30vmin;"
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
              Lo sentimos, este guía turístico aún no cuenta con productos o servicios
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
            >
              Lo sentimos, este guía turístico aún no cuenta con reseñas
            </v-alert>

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
                  <v-list-item-title>{{ caracteristica.nombre }} </v-list-item-title>
                  <v-list-item-subtitle>{{ caracteristica.valor }} </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

            </v-list-item>

          </v-list>

        </v-card-text>

      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogos.valoracion"
              transition="fab-transition"
              scrollable
              persistent
              max-width="550px"
    >
      <v-card>

        <v-toolbar elevation="0" dense color="transparent">

          <v-btn icon @click="CerrarDialogoValoracion">
            <v-icon>fa fa-times</v-icon>
          </v-btn>

          <v-layout justify-center>
            <h4> Escribe una reseña acerca de este guía </h4>
          </v-layout>

        </v-toolbar>

        <v-card-text class="pa-4">

          

        </v-card-text>

      </v-card>

    </v-dialog>

    <v-overlay :value="$store.state.loading">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>

  </v-container>

</template>

<script>

import VueGallerySlideshow from 'vue-gallery-slideshow';

export default {

  mounted() {
    this.ObtenerGuia()
    this.$refs.slideGroup.setWidths()
  },

  components: { VueGallerySlideshow },

  data() {

    return {

      dialogos: {

        caracteristicas: false,
        valoracion: false

      },

      valoracion: {},

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

      guia: {},

      tags: '',

      productos: {
        listado: [],
        seleccionado: {}
      },

      index: null,

      images: [
        'https://placekitten.com/801/800',
        'https://placekitten.com/802/800',
        'https://placekitten.com/803/800',
        'https://placekitten.com/804/800',
        'https://placekitten.com/805/800',
        'https://placekitten.com/806/800',
        'https://placekitten.com/807/800',
        'https://placekitten.com/808/800',
        'https://placekitten.com/809/800',
        'https://placekitten.com/810/800'
      ]

    }
  },

  methods: {

    async ObtenerProductos(){

      let params = {
        id: this.guia.id
      }

      this.productos.listado = await this.$api.post("/productos", params)

    },

    async ObtenerGuia(){

      await this.$api.post("/negocios/categoria", { categoria: "D" }).then( data => {

        data.forEach( negocio => {

          if(negocio.id === +this.$route.params.id){

            this.guia = negocio

          }

        } )

        this.marker.position.lat = +this.guia.lat
        this.marker.position.lng = +this.guia.lng
        this.center.lat = +this.guia.lat
        this.center.lng = +this.guia.lng
        this.$forceUpdate()
        this.ObtenerProductos()
        this.ObtenerTags()

      } )

    },

    async ObtenerTags(){

      this.guia.tags = await this.$api.post("/tags/negocio", { negocioId: this.guia.id })

      this.guia.tags.forEach( tag => {

        this.tags += tag.tag + ", "

      })

      this.tags = this.tags.substring(0, this.tags.length-2)

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
      this.$router.push({ path: '/servicios/guias/galeria?id='+this.guia.id })

    },

    VerificarHora(){

      if(this.guia && this.guia.abre && this.guia.cierra){

        var format = 'hh:mm:ss'
        var time = this.$moment(this.$moment(),format),
          beforeTime = this.$moment(this.guia.abre, format),
          afterTime = this.$moment(this.guia.cierra, format);

        if (time.isBetween(beforeTime, afterTime)) {
          return "Abierto"

        } else {

          return "Cerrado"

        }

      }

    },

    FormatTelefono(){

      if(this.guia.telefono){

        return this.guia.telefono.substring(0, 4) + " " + this.guia.telefono.substring(4)

      }

    },

    Regresar(){

      this.$router.push({ path: '/servicios/guias' })

    }

  }

}

</script>
