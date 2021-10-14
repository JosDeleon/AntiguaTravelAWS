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
        <v-img  v-if="auth.img" :src="auth.img" />
        <v-icon dark color="white" size="20" v-else>
          fa fa-user
        </v-icon>
      </v-avatar>
      <div class="ml-2 hidden-sm-and-down">
        {{ auth.nombre }}
      </div>

    </v-app-bar>

    <v-row justify="center" align="center">

      <v-col cols="12" xl="8" lg="8" class="mt-5">

        <v-card-actions>

          <v-spacer class="hidden-sm-and-down" />

          <v-chip-group
            mandatory
            active-class="secondary--text"
            v-model="ajustes.seleccionado"
            :show-arrows="$vuetify.breakpoint.name === 'sm' || $vuetify.breakpoint.name === 'xs'"
            :class="$vuetify.breakpoint.name === 'sm' || $vuetify.breakpoint.name === 'xs' ? 'mb-4' : null"
          >

            <v-chip v-for="(ajuste, a) in ajustes.listado" :key="a" label outlined>
              <v-icon
                :color="ajustes.seleccionado === a ? 'secondary' : ajuste.color"
                left
              >
                {{ ajuste.icono }}
              </v-icon>
              {{ ajuste.texto }}
            </v-chip>

          </v-chip-group>

        </v-card-actions>

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
                      {{ ajustes.listado[ajustes.seleccionado].icono }}
                    </v-icon>
                  </v-col>
                </v-row>
              </v-container>

            </v-sheet>

            <v-toolbar-title class="font-weight-bold text-wrap">
              <h5 style="font-family: Poppins, sans-serif;" class="hidden-sm-and-down">
                {{ ajustes.listado[ajustes.seleccionado].toolbar }}
              </h5>
              <h5 style="font-family: Poppins, sans-serif; font-size: 15px;" class="hidden-md-and-up">
                {{ ajustes.listado[ajustes.seleccionado].toolbar }}
              </h5>
            </v-toolbar-title>

          </v-toolbar>

          <v-card-text class="pa-6" v-if="ajustes.seleccionado === 0">

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

          <v-card-text class="pa-6" v-else-if="ajustes.seleccionado === 1">

            <v-layout justify-center>

              <v-card style="border-radius:15px;" elevation="0" outlined
                      class="pa-6" max-width="700"
              >

                <v-card-text class="pa-6">

                  <v-form ref="frmCambioPassword">

                    <v-row justify="center" align="center">

                      <v-col cols="12">

                        <v-text-field
                          v-model="form.password"
                          :append-icon="helpers.currentEyeState ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required,  rules.min]"
                          prepend-icon="fa fa-key"
                          :type="helpers.currentEyeState ? 'text' : 'password'"
                          name="input-10-1"
                          label="Contraseña Actual"
                          counter
                          outlined
                          dense
                          autocomplete="new-password"
                          @click:append="helpers.currentEyeState = !helpers.currentEyeState"
                          color="black"
                        />

                      </v-col>

                      <v-col cols="12">

                        <v-text-field
                          v-model="form.nuevaPassword"
                          :append-icon="helpers.eyeState ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required,  rules.min]"
                          prepend-icon="fa fa-key"
                          :type="helpers.eyeState ? 'text' : 'password'"
                          name="input-10-1"
                          label="Nueva Contraseña"
                          counter
                          outlined
                          dense
                          autocomplete="new-password"
                          @click:append="helpers.eyeState = !helpers.eyeState"
                          color="black"
                        />

                      </v-col>

                      <v-col cols="12">

                        <v-text-field
                          v-model="form.confirmarPassword"
                          label="Confirmar contraseña"
                          type="password"
                          autocomplete="new-password"
                          prepend-icon="fa fa-key"
                          counter
                          outlined
                          dense
                          :type="helpers.confirmEyeState ? 'text' : 'password'"
                          :append-icon="helpers.confirmEyeState ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.requiredVerify, rules.verificarPassword]"
                          @click:append="helpers.confirmEyeState = !helpers.confirmEyeState"
                          color="black"
                        />

                      </v-col>

                    </v-row>

                  </v-form>

                </v-card-text>

              </v-card>

            </v-layout>

          </v-card-text>

          <v-card-text class="pa-6" v-else>

            <v-layout justify-center>

              <v-card style="border-radius:15px;" elevation="0" outlined
                      class="pa-6" max-width="700"
              >

                <v-toolbar elevation="0" dense color="transparent" class="hidden-sm-and-down">
                  <v-spacer/>
                  <h2>
                    {{ helpers.step === 1 ? '¿Por qué quieres desactivar tu cuenta?' :
                      '¿Estás seguro que quieres desactivar tu cuenta?'
                    }}
                  </h2>
                  <v-spacer/>
                </v-toolbar>

                <v-toolbar elevation="0" dense color="transparent" class="hidden-md-and-up">
                  <v-spacer/>
                  <h3>
                    {{ helpers.step === 1 ? '¿Por qué quieres desactivar tu cuenta?' :
                    '¿Estás seguro que quieres desactivar tu cuenta?'
                    }}
                  </h3>
                  <v-spacer/>
                </v-toolbar>

                <v-window v-model="helpers.step">

                  <v-window-item :value="1">

                    <v-card-text class="pa-6">

                      <v-form ref="frmCambioPassword">

                        <v-row justify="center" align="center">

                          <v-col cols="12">

                            <v-list>
                              <v-list-item-group
                                v-model="razones.seleccionada"
                                active-class="border"
                                color="secondary"
                              >
                                <v-list-item
                                  v-for="(razon, i) in razones.listado"
                                  :key="i"
                                >
                                  <v-list-item-icon>
                                    <v-icon v-text="razon.icono"></v-icon>
                                  </v-list-item-icon>

                                  <v-list-item-content>
                                    <v-list-item-title v-text="razon.texto"></v-list-item-title>
                                  </v-list-item-content>
                                </v-list-item>
                              </v-list-item-group>
                            </v-list>

                          </v-col>

                          <v-col cols="12" v-if="razones.seleccionada === 4">

                            <h3 class="ml-4 mb-4">Motivo</h3>

                            <v-text-field
                              v-model="razones.motivo"
                              prepend-icon="fa fa-comment"
                              placeholder="¿Por qué te vas?"
                              outlined
                              dense
                              autocomplete="new-password"
                              color="secondary"
                              class="mx-4"
                            />

                          </v-col>

                        </v-row>

                      </v-form>

                    </v-card-text>

                  </v-window-item>

                  <v-window-item :value="2">

                    <v-card-text class="pa-6">

                      <v-list>

                        <v-list-item
                          v-for="(consecuencia, i) in consecuencias"
                          :key="i"
                          inactive
                        >
                          <v-list-item-icon>
                            <v-icon> fa fa-dot-circle </v-icon>
                          </v-list-item-icon>

                          <v-list-item-content>
                            <v-list-item-title v-text="consecuencia" class="text-wrap text-justify" />
                          </v-list-item-content>
                        </v-list-item>

                      </v-list>

                    </v-card-text>

                  </v-window-item>

                </v-window>


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
                    class="black--text"
                    depressed
                    @click="helpers.step++"
                    :disabled="razones.seleccionada === null || razones.seleccionada === undefined"
                    v-if="helpers.step < 2"
                  >
                    Siguiente
                  </v-btn>
                </v-card-actions>

              </v-card>

            </v-layout>

          </v-card-text>

          <v-card-actions class="pa-6">

            <v-spacer />

            <v-btn
              color="black"
              text
              x-large
              @click="ActualizarUsuario"
              v-if="ajustes.seleccionado === 0"
            >
              <v-icon left>fa fa-user-check</v-icon>
              Actualizar
            </v-btn>

            <v-btn
              color="amber darken-1"
              text
              x-large
              @click="ActualizarPassword"
              v-else-if="ajustes.seleccionado === 1"
            >
              <v-icon left>fa fa-lock-open</v-icon>
              Actualizar Contraseña
            </v-btn>

            <v-btn
              color="error"
              text
              x-large
              @click="DesactivarCuenta"
              :disabled="helpers.step < 2"
              v-else
            >
              <v-icon left>fa fa-user-slash</v-icon>
              Desactivar Cuenta
            </v-btn>

          </v-card-actions>

        </v-card>

      </v-col>

    </v-row>

    <v-overlay :value="cargando">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>

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

      helpers: {
        step: 0,
        currentEyeState: false,
        eyeState: false,
        confirmEyeState: false,
      },

      rules: {
        required: value => !!value || 'La contraseña es obligatoria',
        requiredVerify: value => !!value || 'Es obligatorio confirmar la contraseña',
        min: value => value && value.length >= 8 || 'La contraseña debe tener al menos 8 caracteres',
        verificarPassword: value => value === this.form.password || 'Las contraseñas no son iguales'
      },

      ajustes: {

        listado: [
          {
            texto: 'Editar Perfil', icono: 'fa fa-user-edit', color: 'black',
            toolbar: 'Editar perfil — Completa tu perfil'
          },
          {
            texto: 'Cambiar Contraseña', icono: 'fa fa-user-lock', color: 'amber darken-1',
            toolbar: 'Cambiar contraseña — Ingresa tus credenciales'
          },
          {
            texto: 'Desactivar Cuenta', icono: 'fa fa-user-times', color: 'error',
            toolbar: 'Desactivar cuenta — Eliminar datos'
          },
        ],
        seleccionado: 0

      },

      form: {},

      razones: {
        listado: [
          { texto: 'Me preocupa la privacidad o la seguridad.', icono: 'fa fa-dot-circle' },
          { texto: 'Ya no puedo seguir con mis negocios.', icono: 'fa fa-dot-circle' },
          { texto: 'No me gusta la plataforma en funcionalidad.', icono: 'fa fa-dot-circle' },
          { texto: 'No me gusta la plataforma visualmente.', icono: 'fa fa-dot-circle' },
          { texto: 'Otro', icono: 'fa fa-dot-circle' }
        ],
        seleccionada: null,
        motivo: null
      },

      consecuencias: [
        'Tu perfil y todos los negocios asociados a tu cuenta desaparecerán.',
        'No podrás acceder a la información ya ingresada como por ejemplo reservaciones o mensajes.',
      ],

      auth: {},

      menu: false,

      activePicker: null,

      cargando: false

    }
  },

  methods: {

    async ObtenerAuth(){
      this.cargando = true
      this.auth = await this.$api.post("/usuario/info",
        { id: JSON.parse(sessionStorage.getItem('usuario')).id })
      this.auth.nacimiento = this.$moment.utc(this.auth.nacimiento).format('YYYY-MM-D')
     this.$fire.storage.ref(
        'usuarios/'+JSON.parse(sessionStorage.getItem('usuario')).id + "/foto-perfil"
      ).getDownloadURL().then((url) => {
        this.auth.img = url
        this.$forceUpdate()
     })
      this.cargando = false
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

      this.cargando = true

      if(this.auth.nuevaImagen){

        const imagenRef = this.$fire.storage.ref(
          'usuarios/'+JSON.parse(sessionStorage.getItem('usuario')).id + "/foto-perfil"
        )

        imagenRef.put(this.auth.archivo).then( response => {

          response.ref.getDownloadURL().then(async (downloadURL) => {

            let params = {

              id: this.auth.id,
              nombre: this.auth.nombre,
              telefono: this.auth.telefono,
              username: this.auth.username,
              correo: this.auth.correo,
              nacimiento: this.auth.nacimiento,
              genero: this.auth.genero.valor,
              img: downloadURL

            }

            await this.$api.put("/usuario", params).then( data => {

              this.cargando = false
              this.$router.push({path: '/'})

            } )

          })

        } )

      }

      else {
        let params = {
        nombre: this.auth.nombre,
        telefono: this.auth.telefono,
        username: this.auth.username,
        correo: this.auth.email,
        nacimiento: this.auth.nacimiento,
        genero: this.auth.genero.valor,
        img: this.auth.img

      }
        this.cargando = false
      }

    },

    ActualizarPassword(){

    },

    DesactivarCuenta(){

    },

  }

}

</script>
