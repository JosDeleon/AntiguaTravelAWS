<template>

  <v-container fluid>

    <v-app-bar
      fixed
      app
      flat
      color="primary"
      outlined
    >
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            icon
            color="black"
            @click="$router.push({path: '/'})"
          >
            <v-icon color="black">
              fa fa-arrow-left
            </v-icon>
          </v-btn>
        </template>
        <span>Regresar a Inicio</span>
      </v-tooltip>
      <v-toolbar-title v-text="'Perfil de Usuario'" />

      <v-spacer />

      <v-avatar color="grey" size="35">
        <v-icon dark color="white" size="20">
          fa fa-user
        </v-icon>
      </v-avatar>
      <div class="ml-2 hidden-sm-and-down">
        {{ auth.nombre }}
      </div>

    </v-app-bar>

    <v-row justify="center" align="center">

      <v-col cols="12" xl="8" lg="8" class="mt-5">

        <v-card outlined elevation="0" style="border-radius: 10px;"
                class="animate__animated animate__zoomIn"
        >

          <v-toolbar
            flat
            style="border-radius: 10px;"
          >

            <v-sheet
              color="primary"
              elevation="1"
              height="80"
              width="80"
              class="mr-3 mb-1"
              :rounded="true"
            >

              <v-container fill-height fluid class="ml-2">
                <v-row align="center"
                       justify="center">
                  <v-col>
                    <v-icon size="40" color="secondary">
                      fa fa-user-cog
                    </v-icon>
                  </v-col>
                </v-row>
              </v-container>

            </v-sheet>

            <v-toolbar-title class="font-weight-bold text-wrap">
              <h5 style="font-family: Poppins, sans-serif;" class="hidden-sm-and-down">
                Editar perfil — Completa tu perfil
              </h5>
              <h5 style="font-family: Poppins, sans-serif; font-size: 15px;" class="hidden-md-and-up">
                Editar perfil — Completa tu perfil
              </h5>
            </v-toolbar-title>

          </v-toolbar>

          <v-card-text class="pa-6">

            <v-form ref="frmProducto">

              <v-row justify="center" align="center">

                <v-col cols="12" align="center">

                  <v-avatar color="grey" :size="($vuetify.breakpoint.name === 'sm' ||
                                               $vuetify.breakpoint.name === 'xs') ? 150 : 250"
                  >

                    <v-img :src="auth.nuevaImagen ? auth.nuevaImagen : auth.img" v-if="auth.img" />

                    <v-img :src="auth.nuevaImagen ? auth.nuevaImagen : '/no-pf.png' " v-else />

                  </v-avatar>

                </v-col>

                <v-btn
                  color="tertiary"
                  @click="SeleccionarImagen"
                >
                  <v-icon left color="white">fas fa-image</v-icon>
                  <div class="white--text">Cambiar Imagen</div>
                </v-btn>

                <input
                  ref="uploader"
                  class="d-none"
                  type="file"
                  accept="image/*"
                  @change="onFileChanged"
                />

              </v-row>

              <v-row class="mt-6">

                <v-col cols="12" xl="6" lg="6">

                  <v-text-field
                    outlined
                    dense
                    v-model="auth.nombre"
                    :rules="[ v => v && v.length > 0 || 'El nombre es obligatorio' ]"
                    label="Nombre"
                    color="black"
                    prepend-icon="fa fa-heading"
                  />

                </v-col>

                <v-col cols="12" xl="6" lg="6">

                  <v-text-field
                    outlined
                    dense
                    v-model="auth.correo"
                    :rules="[ v => v && v.length > 0 || 'El correo electrónico es obligatorio' ]"
                    label="Correo Electrónico"
                    color="black"
                    prepend-icon="fa fa-envelope"
                  />

                </v-col>

              </v-row>

              <v-row>

                <v-col cols="12" xl="4" lg="4">

                  <v-text-field
                    label="Teléfono"
                    color="black"
                    autocomplete="new-password"
                    outlined
                    dense
                    type="number"
                    prefix="(+502)"
                    v-model="auth.telefono"
                    :rules="[ v => !!v || 'El teléfono es obligatorio' ]"
                    prepend-icon="fa fa-phone"
                  />

                </v-col>

                <v-col cols="12" xl="4" lg="4">

                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="auth.nacimiento"
                        label="Fecha de Nacimiento"
                        prepend-icon="fa fa-calendar-day"
                        readonly
                        outlined
                        dense
                        :rules="[ v => !!v || 'La fecha de nacimiento es obligatoria' ]"
                        color="black"
                        v-bind="attrs"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="auth.nacimiento"
                      :active-picker.sync="activePicker"
                      :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                      min="1950-01-01"
                      event-color="secondary"
                      header-color="secondary"
                      color="secondary"
                      @change="GuardarBDAY"
                    ></v-date-picker>
                  </v-menu>

                </v-col>

                <v-col cols="12" xl="4" lg="4">

                  <v-autocomplete
                    label="Género"
                    outlined
                    dense
                    :items="[ { nombre: 'Masculino', valor: 'M' }, { nombre: 'Femenino', valor: 'F' } ]"
                    item-value="valor"
                    item-text="nombre"
                    v-model="auth.genero"
                    :rules="[ v => !!v || 'El género es obligatorio' ]"
                    color="black"
                    item-color="black"
                    prepend-icon="fa fa-venus-mars"
                  />

                </v-col>

              </v-row>

            </v-form>

          </v-card-text>

          <v-card-actions class="pa-6">

            <v-spacer />

            <v-btn
              color="secondary"
              @click="ActualizarUsuario"
            >
              <v-icon left>fa fa-check</v-icon>
              Actualizar
            </v-btn>

          </v-card-actions>

        </v-card>

      </v-col>

    </v-row>

  </v-container>

</template>

<script>

import md5 from "crypto-js/md5";

export default {

  mounted() {
    this.ObtenerAuth()
  },

  layout: 'empty',

  middleware: 'VerificarUsuarioAuth',

  data(){
    return{
      auth: {},
      menu: false,
      activePicker: null,
    }
  },

  methods: {

    async ObtenerAuth(){
      this.auth = await this.$api.post("/usuario/info",
        { id: JSON.parse(sessionStorage.getItem('usuario')).id })
      this.auth.nacimiento = this.$moment.utc(this.auth.nacimiento).format('YYYY-MM-D')
    },

    GuardarBDAY (date) {
      this.$refs.menu.save(date)
    },

    SeleccionarImagen() {
      window.addEventListener('focus', () => {
      }, { once: true })

      this.$refs.uploader.click()
    },

    onFileChanged(e) {
      this.auth.nuevaImagen = URL.createObjectURL(e.target.files[0])
      this.auth.archivo = e.target.files[0]
      this.$forceUpdate()
    },

    ActualizarUsuario(){

      if(this.auth.nuevaImagen){

        let idGenerado = (Math.random() + 1).toString(36).substring(2);

        const imagenRef = this.$fire.storage.ref(
          'usuarios/'+JSON.parse(sessionStorage.getItem('usuario')).id + "/foto-perfil"
        )

        imagenRef.put(this.auth.archivo).then( response => {

          response.ref.getDownloadURL().then(async (downloadURL) => {

            let params = {
              nombre: this.auth.nombre,
              telefono: this.auth.telefono,
              username: this.auth.username,
              correo: this.auth.email,
              nacimiento: this.auth.nacimiento,
              genero: this.auth.genero.valor,
              img: downloadURL

            }

            this.$router.push({replace: '/'})

          })

        } )

      }

    }

  }

}

</script>
