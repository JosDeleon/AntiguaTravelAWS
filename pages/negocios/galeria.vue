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
      @click="dialogos.agregar_galeria = true"
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

          <div v-for="(imagen, i) in negocios.galeria"
               :key="i"
          >

            <v-divider />

            <v-list-item>
              <v-list-item-avatar>
                <v-icon
                  class="secondary"
                  dark
                >
                  fas fa-image
                </v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="text-wrap" v-text="formatImageName(imagen)"/>
                <v-list-item-subtitle class="text-wrap" v-text="formatDate(imagen.createdAt)" />
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon @click="SeleccionarImagen(imagen)">
                  <v-icon color="complementario">fa fa-eye</v-icon>
                </v-btn>
              </v-list-item-action>

            </v-list-item>

          </div>

          <v-divider />

          <v-list-item v-if="negocios.galeria.length === 0">

            <v-list-item-content>

              <v-alert
                type="info"
                prominent
                color="complementario"
              >
                Aún no se han agregado imagenes a la galería de este negocio
              </v-alert>

            </v-list-item-content>

          </v-list-item>

        </v-list>

      </v-col>

      <v-col cols="12" xl="5" lg="4" md="8">

        <v-card style="border-radius:15px;" elevation="0" outlined v-if="imagen_seleccionada.id > 0">

          <v-img
            max-height="400"
            :src="imagen_seleccionada.img"
            :lazy-src="imagen_seleccionada.img"
          >

            <v-container>

              <v-row align="center" justify="end">

                <v-btn icon @click="imagen_seleccionada = {}">
                  <v-icon color="white">fa fa-times</v-icon>
                </v-btn>

              </v-row>

            </v-container>

          </v-img>

          <v-card-actions class="ml-7">

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="black"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  icon
                  @click="DescargarImagen"
                >
                  <v-icon
                    color="black"
                  >
                    fas fa-save
                  </v-icon>
                </v-btn>
              </template>
              <span>Descargar Imagen</span>
            </v-tooltip>

            <v-tooltip bottom class="mx-4">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="error"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  icon
                  @click="EliminarImagen"
                >
                  <v-icon
                    color="error"
                  >
                    fas fa-trash
                  </v-icon>
                </v-btn>
              </template>
              <span>Eliminar Imagen</span>
            </v-tooltip>

          </v-card-actions>

          <v-divider />

          <v-card-text>

            <v-list>

              <v-list-item>
                <v-list-item-avatar>
                  <v-icon color="green"> fa fa-image </v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title> {{ formatImageName(imagen_seleccionada) }} </v-list-item-title>
                  <v-list-item-subtitle> {{ imagen_seleccionada.size }} MB &mdash; Tipo de imagen {{ imagen_seleccionada.tipo }} </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

            </v-list>

          </v-card-text>

        </v-card>

      </v-col>

    </v-row>

    <v-dialog max-width="800" v-model="dialogos.agregar_galeria"
              transition="fab-transition" persistent>

      <v-card style="border-radius:15px;" elevation="0" outlined class="pa-6">

        <v-toolbar elevation="0" dense color="transparent" class="hidden-sm-and-down">
          <v-spacer/>
          <h2>Agregar imágenes a galería</h2>
          <v-spacer/>
          <v-btn icon @click="CerrarDialogoAgregarGaleria">
            <v-icon>fa fa-times</v-icon>
          </v-btn>
        </v-toolbar>

        <v-toolbar elevation="0" dense color="transparent" class="hidden-md-and-up">
          <v-spacer/>
          <h3>Agregar imágenes a galería</h3>
          <v-spacer/>
          <v-btn icon @click="CerrarDialogoAgregarGaleria">
            <v-icon>fa fa-times</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text class="pa-4">

          <v-form ref="frmGaleria">

            <v-text-field
              outlined
              v-model="folder_seleccionado.titulo"
              label="Negocio seleccionado"
              prepend-inner-icon="fa fa-briefcase"
              style="border-radius:10px;"
              color="black"
              readonly
            />

            <v-file-input
              outlined
              accept="image/*"
              v-model="negocios.imagenes"
              :rules="[ v => !!v || 'Por favor ingrese una o más imágenes' ]"
              label="Nuevas imágenes para galería"
              prepend-inner-icon="fa fa-images"
              :prepend-icon="null"
              style="border-radius:10px;"
              color="black"
              multiple
            >

              <template v-slot:selection="{ text }">

                <v-chip
                  small
                  label
                  color="secondary"
                >
                  {{ text }}
                </v-chip>

              </template>

            </v-file-input>

          </v-form>

        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            @click="AgregarImagenesGaleria"
            large
          >
            <v-icon left>fa fa-folder-plus</v-icon>
            Agregar imágenes
          </v-btn>
        </v-card-actions>

      </v-card>

    </v-dialog>

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

        dialogos: {

          agregar_galeria: false

        },

        folders: [],

        folder_seleccionado: {},

        imagen_seleccionada: { tipo: '' },

        negocios: {

          listado: [],
          seleccionado: {},
          galeria: [],
          imagenes: []

        }

      }

    },

    methods: {

      async ObtenerGaleria(){

        this.negocios.galeria = await this.$api.post("/galeria/negocio",{ negocioId:  this.folder_seleccionado.id })

      },

      async ObtenerNegociosAuth(){

        if(JSON.parse(sessionStorage.getItem('usuario'))){

          this.folders = []

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

      async AgregarImagenesGaleria(){

        if(this.negocios.imagenes && this.negocios.imagenes.length === 0){

          this.$alert.warning("Debes de seleccionar una o más imágenes", 'Selecciona Imágenes')

        }
        else{

          this.negocios.imagenes.forEach(imagen => {

            const galeriaRef = this.$fire.storage.ref('negocios/'+this.folder_seleccionado.id+"/galeria/"
              + imagen.name.split('.')[0])

              galeriaRef.put(imagen).then( response => {

                response.ref.getDownloadURL().then(async (downloadURL) => {

                  let neg = this.negocios.galeria.find( n => n.img === downloadURL)

                  if(!neg){
                    let params = {

                      negocioId: this.folder_seleccionado.id,
                      img: downloadURL

                    }

                    await this.$api.post("/galeria", params).then(data => {

                      this.ObtenerGaleria()

                    })
                  }

                })

              })

          })

          this.CerrarDialogoAgregarGaleria()
          this.$alert.exito("Las imágenes fueron agregadas a la galería", 'Imágenes Agregadas')

        }

      },

      async DescargarImagen(){

        window.open(this.imagen_seleccionada.img, '_blank')

      },

      async EliminarImagen(){

        this.$alert.confirm('¿Estás seguro que deseas eliminar esta imagen de la galería?',
          'Eliminar Imagen').then(async () => {

          let params = {

            id: this.imagen_seleccionada.id

          }

          await this.$api.delete("/galeria/img", params).then(data => {

            let imgRef = this.$fire.storage.refFromURL(this.imagen_seleccionada.img)
            imgRef.delete()
            this.imagen_seleccionada = {}
            this.ObtenerGaleria()
            this.$alert.exito("La imagen fue eliminada exitosamente", "Imagen Eliminada")

          })

        })

      },

      SeleccionarImagen(imagen){

        imagen.tipo = ''
        this.imagen_seleccionada = Object.assign({}, imagen)

        const ref = this.$fire.storage.refFromURL(imagen.img);

        ref.getMetadata().then( (metadata) => {
          if(this.imagen_seleccionada){
            this.imagen_seleccionada.tipo = metadata.contentType
            this.imagen_seleccionada.size = ( metadata.size / 1000000 ).toFixed(2)
            this.$forceUpdate()
          }
        }).catch(function(error) {
          console.error(error)
        });

      },

      CerrarDialogoAgregarGaleria(){

        this.dialogos.agregar_galeria = false
        this.negocios.imagenes = []
        this.$refs.frmGaleria?.resetValidation()

      },

      async SeleccionarFolder(folder){

        this.folder_seleccionado = folder

        this.ObtenerGaleria()

      },

      formatDate(date){
        return this.$moment.utc(date, 'YYYY-MM-DD h:mm:ss').format('dddd, LL [a las ] h:mm:ss a').charAt(0).toUpperCase() +
          this.$moment.utc(date, 'YYYY-MM-DD h:mm:ss').format('dddd, LL [a las ] h:mm:ss a').slice(1)
      },

      formatImageName(imagen){

        let primeraParte = imagen.img.split("negocios")[1].split("2F")[3]

        return primeraParte.split("?")[0]

      },

      LimpiarBusqueda(){

        this.folder_seleccionado = {}
        this.imagen_seleccionada = {}
        this.ObtenerNegociosAuth()

      }

    }

  }

</script>
