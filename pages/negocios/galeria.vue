<template>

  <v-container fluid>

    <v-btn
      color="complementario"
      @click="LimpiarBusqueda"
      outlined
      class="mb-n3"
      v-if="folder_seleccionado.id > 0"
    >
      <v-icon left color="complementario">
        fa fa-arrow-left
      </v-icon>
      Regresar
    </v-btn>

    <v-btn
      color="black"
      @click=""
      outlined
      class="mb-n3"
      v-if="folder_seleccionado.id > 0"
    >
      <v-icon left color="black">
        fa fa-image
      </v-icon>
      Nueva imágen
    </v-btn>

    <v-row class="my-6" justify="center">

      <v-col cols="12" xl="7" lg="8">

        <v-list
          subheader
          two-line
          style="border-radius:15px;"
          v-if="!folder_seleccionado.id > 0"
        >

          <v-subheader inset class="black--text">Negocios</v-subheader>

          <div v-for="(folder, f) in folders"
               :key="f"
          >

            <v-divider />

            <v-list-item>
              <v-list-item-avatar>
                <v-icon
                  class="grey lighten-1"
                  dark
                >
                  fa fa-folder
                </v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="folder.titulo"/>
                <v-list-item-subtitle v-text=" folder.cantidadArchivos + ' imágenes agregadas'" />
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon @click="SeleccionarFolder(folder)">
                  <v-icon color="grey lighten-1">fa fa-info-circle</v-icon>
                </v-btn>
              </v-list-item-action>

            </v-list-item>

          </div>

          <v-divider />

        </v-list>

        <v-list
          subheader
          two-line
          style="border-radius:15px;"
          v-else
        >

          <v-subheader inset class="black--text">
            Archivos ({{ folder_seleccionado.titulo }})
          </v-subheader>

          <div v-for="(folder, f) in []"
               :key="f"
          >

            <v-divider />

            <v-list-item>
              <v-list-item-avatar>
                <v-icon
                  class="grey lighten-1"
                  dark
                >
                  fa fa-folder
                </v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="folder.titulo"/>
                <v-list-item-subtitle v-text=" folder.cantidadArchivos + ' imágenes agregadas'" />
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon @click="folder_seleccionado = folder">
                  <v-icon color="grey lighten-1">fa fa-info-circle</v-icon>
                </v-btn>
              </v-list-item-action>

            </v-list-item>

          </div>

          <v-divider />

        </v-list>

      </v-col>

      <v-col cols="12" xl="5" lg="4" md="8">

        <v-card style="border-radius:15px;" elevation="0" outlined>

          <v-img
            max-height="400"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          />

          <v-card-actions>

            <v-spacer />

            <v-icon color="black"> fa fa-save </v-icon>
            <v-icon color="error" class="mx-4"> fa fa-trash </v-icon>

          </v-card-actions>

          <v-card-text>

            <v-list>

              <v-list-item>
                <v-list-item-avatar>
                  <v-icon color="green"> fa fa-image </v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title> Imagen #1</v-list-item-title>
                  <v-list-item-subtitle> 420KB &mdash; Tipo de imagen png </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-avatar>
                  <v-icon color="secondary"> fa fa-calendar-day </v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title> Fecha de creación</v-list-item-title>
                  <v-list-item-subtitle> {{ $moment().format('L') }} </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-avatar>
                  <v-icon color="amber darken-1"> fa fa-folder-open </v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>Ubicación</v-list-item-title>
                  <v-list-item-subtitle> /negocio/galería </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

            </v-list>

          </v-card-text>

        </v-card>

      </v-col>

    </v-row>

  </v-container>

</template>

<script>

import VueGallerySlideshow from 'vue-gallery-slideshow';

  export default {

    mounted() {
      this.$store.commit('setRutaActual', 'Galeria de Imágenes')
      this.ObtenerNegociosAuth()
    },

    components: { VueGallerySlideshow },

    layout: 'admin_negocio',

    data() {

      return {
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
        ],

        folders: [],

        folder_seleccionado: {},

        negocios: {

          listado: [],
          seleccionado: {},
          galeria: []

        }

      }

    },

    methods: {

      async ObtenerGaleria(){

        this.negocios.galeria = this.$api.get("/galeria",{ negocioId:  this.folder_seleccionado.id })

      },

      async ObtenerNegociosAuth(){

        if(JSON.parse(sessionStorage.getItem('usuario'))){

         this.negocios.listado = await this.$api.post('/negocios/usuario',
            { usuarioId: JSON.parse(sessionStorage.getItem('usuario')).id })

          for (const negocio of this.negocios.listado) {

            const conteo = await this.$fire.storage.ref('negocios/'+negocio.id)
              .child("galeria").listAll()

            this.folders.push({
              id: negocio.id,
              titulo: negocio.nombre,
              cantidadArchivos: conteo.items.length
            })

          }

        }

      },

      async SeleccionarFolder(folder){

        this.folder_seleccionado = folder

        this.ObtenerGaleria()

      },

      LimpiarBusqueda(){

        this.folder_seleccionado = {}

      }

    }

  }

</script>
