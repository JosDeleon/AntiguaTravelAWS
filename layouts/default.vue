<template>

  <v-app>

    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      fixed
      app
      light
      class="hidden-lg-and-up"
      temporary
    >
      <v-list>
        <v-list-item
          v-for="(opcion, i) in opciones"
          :key="opcion.no"
          :to="opcion.to"
          router
          exact
          color="secondary"
        >
          <v-list-item-action>
            <v-icon>{{ opcion.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="opcion.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      fixed
      app
      light
      hide-on-scroll
      color="primary"
      min-height="80"
      max-height="160"
    >

      <v-btn icon rounded @click.stop="drawer = !drawer"
             class="hidden-lg-and-up mt-12"
      >
        <v-icon color="black">
          fa fa-bars
        </v-icon>
      </v-btn>

      <div>
        <v-img class="mx-10 mt-11 hidden-md-and-down"
               src="/logo-no-texto.png"
               max-height="90"
               max-width="90"
               contain
        >
        </v-img>
        <v-img class="mx-1 mt-6 hidden-lg-and-up align-center"
               src="/logo-no-texto.png"
               max-height="90"
               max-width="90"
               contain
        >
        </v-img>

        <v-app-bar-title style="font-family: Cairo, sans-serif; font-size: 24px;"
                         class="font-weight-bold secondary--text mx-4 hidden-md-and-down"
        >
          Antigua Travel
        </v-app-bar-title>
      </div>

      <v-spacer></v-spacer>

      <v-btn-toggle
        rounded
        class="mt-12 mr-4"
        color="transparent"
      >
        <v-menu
          rounded="lg"
          nudge-bottom="60"
          :close-on-click="true"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>fa fa-briefcase</v-icon>

            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="opcion in opciones_adicionales"
              :key="opcion.value"
            >
              <v-btn text max-width="400" @click="MostrarDialogoPorOpcion(opcion.value)">
                <v-list-item-title style="font-size: 14px;" class="pa-1">
                  <v-icon left>
                    {{ opcion.icono }}
                  </v-icon>
                  {{ opcion.titulo }}
                </v-list-item-title>
              </v-btn>
            </v-list-item>
            <v-divider/>
            <v-list-item
              v-for="opcion in opciones_negocios"
              :key="opcion.value"
            >
              <v-btn text max-width="400" @click="MostrarDialogoOpcionesNegocio(opcion.value)">
                <v-list-item-title style="font-size: 14px;" class="pa-1">
                  <v-icon left>
                    {{ opcion.icono }}
                  </v-icon>
                  {{ opcion.titulo }}
                </v-list-item-title>
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu
          rounded="lg"
          nudge-bottom="60"
          :close-on-click="true"
          v-if="usuario.id < 1"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >

              <v-icon>
                fa fa-user
              </v-icon>

            </v-btn>
          </template>

            <v-list>
              <v-list-item
                v-for="opcion in opciones_usuario"
                :key="opcion.value"
              >
                <v-btn text max-width="400" @click="MostrarDialogoSignInSignUp(opcion.value)">
                  <v-list-item-title style="font-size: 14px;" class="pa-1">
                    <v-icon left>
                      {{ opcion.icono }}
                    </v-icon>
                    {{ opcion.titulo }}
                  </v-list-item-title>
                </v-btn>
              </v-list-item>
            </v-list>

        </v-menu>

        <v-menu
          rounded="lg"
          nudge-bottom="60"
          :close-on-click="true"
          v-else
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >

              <v-avatar size="30" color="transparent" v-if="usuario.img">

                <v-img :src="usuario.img" />

              </v-avatar>

              <v-avatar color="grey" size="30" v-else>

                <v-icon dark color="white" size="18">
                  fa fa-user
                </v-icon>

              </v-avatar>

            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="opcion in opciones_usuario_auth1"
              :key="opcion.value"
            >
              <v-btn text max-width="400" @click="MostrarDialogoOpcionesUsuarioAuth(opcion.value)">
                <v-list-item-title style="font-size: 14px;" class="pa-1">
                  <v-icon left>
                    {{ opcion.icono }}
                  </v-icon>
                  {{ opcion.titulo }}
                </v-list-item-title>
              </v-btn>
            </v-list-item>
            <v-divider/>
            <v-list-item
              v-for="opcion in opciones_usuario_auth2"
              :key="opcion.value"
            >
              <v-btn text max-width="400" @click="MostrarDialogoOpcionesUsuarioAuth(opcion.value)">
                <v-list-item-title style="font-size: 14px;" class="pa-1">
                  <v-icon left>
                    {{ opcion.icono }}
                  </v-icon>
                  {{ opcion.titulo }}
                </v-list-item-title>
              </v-btn>
            </v-list-item>
          </v-list>

        </v-menu>

      </v-btn-toggle>

      <template v-slot:extension>
        <v-tabs
          class="hidden-md-and-down"
          v-model="tabs"
          centered
          color="tertiary"
          slider-color="secondary"
          background-color="transparent"

        >
          <v-tab
            v-for="opcion in opciones"
            :key="opcion.no"
            :to="opcion.to"
          >
            <v-icon class="mr-2">
              {{ opcion.icon }}
            </v-icon>
              {{ opcion.title }}
          </v-tab>
        </v-tabs>
      </template>

    </v-app-bar>

    <v-main>

      <v-dialog v-model="dialogos.registro"
                transition="dialog-bottom-transition"
                scrollable
                persistent
                max-width="550px"
      >
        <v-card>

          <v-toolbar elevation="0" dense color="transparent">

            <v-btn icon @click="CerrarDialogoRegistro">
              <v-icon>fa fa-times</v-icon>
            </v-btn>

            <v-layout justify-center>
              <h4 v-if="helpers.step !== 3">Por favor brinda tus datos para el registro </h4>
            </v-layout>

          </v-toolbar>


          <v-window v-model="helpers.step">

            <v-window-item :value="1">
              <v-card-text>

                <v-form ref="formaDatos">

                  <v-text-field
                    label="Nombre"
                    color="black"
                    autocomplete="new-password"
                    outlined
                    dense
                    v-model="form.nombre"
                    :rules="[rules.nombreRequerido]"
                    prepend-icon="fa fa-id-card"
                  />

                  <v-text-field
                    label="Correo Electrónico"
                    color="black"
                    autocomplete="new-password"
                    hint="ejemplo@ejemplo.com"
                    outlined
                    dense
                    v-model="form.email"
                    :rules="[rules.emailRequerido, rules.emailValido]"
                    prepend-icon="fa fa-envelope"
                  />

                  <v-text-field
                    label="Nombre de Usuario"
                    color="black"
                    autocomplete="new-password"
                    outlined
                    dense
                    v-model="form.username"
                    :rules="[rules.usernameRequerido, rules.usernameValido]"
                    prepend-icon="fa fa-user"
                  />

                  <v-text-field
                    label="Teléfono"
                    color="black"
                    autocomplete="new-password"
                    outlined
                    dense
                    type="number"
                    prefix="(+502)"
                    v-model="form.telefono"
                    :rules="[rules.numeroRequerido, rules.numeroValido]"
                    prepend-icon="fa fa-phone"
                  />

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
                        v-model="form.fechaNacimiento"
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
                      v-model="form.fechaNacimiento"
                      :active-picker.sync="helpers.activePicker"
                      :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                      min="1950-01-01"
                      event-color="secondary"
                      header-color="secondary"
                      color="secondary"
                      @change="GuardarBDAY"
                    ></v-date-picker>
                  </v-menu>

                  <v-combobox
                    name="cuenta-text"
                    label="Género"
                    outlined
                    dense
                    :items="[ { nombre: 'Masculino', valor: 'M' }, { nombre: 'Femenino', valor: 'F' } ]"
                    item-value="valor"
                    item-text="nombre"
                    v-model="form.genero"
                    :rules="[ v => !!v || 'El género es obligatorio' ]"
                    color="black"
                    item-color="black"
                    prepend-icon="fa fa-venus-mars"
                  />

                </v-form>

              </v-card-text>
            </v-window-item>

            <v-window-item :value="2">
              <v-card-text>

                <v-form ref="formaDatosPasswords">
                  <v-text-field
                    v-model="form.password"
                    :append-icon="helpers.eyeState ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required,  rules.min]"
                    prepend-icon="fa fa-key"
                    :type="helpers.eyeState ? 'text' : 'password'"
                    name="input-10-1"
                    label="Contraseña"
                    counter
                    outlined
                    dense
                    autocomplete="new-password"
                    @click:append="helpers.eyeState = !helpers.eyeState"
                    color="black"
                  />

                  <v-text-field
                    v-model="form.confirmPassword"
                    label="Confirmar contraseña"
                    type="password"
                    autocomplete="new-password"
                    prepend-icon="fa fa-key"
                    outlined
                    dense
                    :type="helpers.confirmEyeState ? 'text' : 'password'"
                    :append-icon="helpers.confirmEyeState ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.requiredVerify, rules.verificarPassword]"
                    @click:append="helpers.confirmEyeState = !helpers.confirmEyeState"
                    color="black"
                  />
                </v-form>

                <span class="text-caption grey--text text--darken-1">
                  Por favor ingresa la contraseña para tu cuenta
                </span>
              </v-card-text>
            </v-window-item>

            <v-window-item :value="3">
              <div class="pa-4 text-center">
                <v-img
                  class="mb-4"
                  contain
                  height="128"
                  src="logo-no-texto.png"
                ></v-img>
                <h3 class="text-h6 font-weight-light mb-2">
                  Bienvenido a Antigua Travel
                </h3>
                <span class="text-caption grey--text">¡Muchas gracias por tus datos!</span>
              </div>
            </v-window-item>

          </v-window>

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
              v-if="helpers.step <3"
            >
              <div style="color: rgba(0,0,0,0.8);">
                Siguiente
              </div>
            </v-btn>
            <v-btn
              color="primary"
              depressed
              @click="RegistrarUsuario"
              v-else
            >
              <div style="color: rgba(0,0,0,0.8);">
                Registrarse
              </div>
            </v-btn>
          </v-card-actions>

        </v-card>

      </v-dialog>

      <v-dialog v-model="dialogos.login"
                transition="dialog-bottom-transition"
                scrollable
                persistent
                max-width="550px"
      >
        <v-card>

          <v-toolbar elevation="0" dense color="transparent">

            <v-btn icon @click="CerrarDialogoLogin">
              <v-icon>fa fa-times</v-icon>
            </v-btn>

            <v-layout justify-center>
              <h4 v-if="helpers.step !== 3"> Inicio de Sesión </h4>
            </v-layout>

          </v-toolbar>

          <v-card-text class="pa-4">

            <h3 class="mb-5 black--text">
              {{ must_login ?
              'Primero debes iniciar sesión para poder registrar un negocio' :
              'Te damos la bienvenida a Antigua Travel'
              }}
            </h3>

            <v-form ref="FormaLogin" @submit.prevent="Login">

              <v-text-field
                label="Nombre de Usuario"
                color="black"
                autocomplete="new-password"
                outlined
                dense
                v-model="form.username"
                :rules="[ v => v && v.length > 0 || 'El nombre de usuario es obligatorio' ]"
                prepend-icon="fa fa-user"
              />

              <v-text-field
                v-model="form.password"
                :append-icon="helpers.eyeState ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required]"
                prepend-icon="fa fa-key"
                :type="helpers.eyeState ? 'text' : 'password'"
                name="input-10-1"
                label="Contraseña"
                outlined
                dense
                autocomplete="new-password"
                @click:append="helpers.eyeState = !helpers.eyeState"
                color="black"
              />

              <div class="mb-6 mt-n2 ml-n4">

                <ForgotPassword />

              </div>

              <v-layout justify-center>

                <v-btn
                  color="primary"
                  depressed
                  :loading="helpers.loading"
                  type="submit"
                >
                  <div style="color: rgba(0,0,0,0.8);">
                    Iniciar Sesión
                  </div>
                </v-btn>

              </v-layout>

            </v-form>

          </v-card-text>

        </v-card>
      </v-dialog>

      <AyudaNegocios v-model="dialogos.ayuda_negocios" />

      <AyudaUsuarios v-model="dialogos.ayuda_usuarios" />

      <v-snackbar
        v-model="showServiceOut"
        vertical
      >
        El servicio no está disponible en este momento, vuelve a intentarlo o regresa más tarde

        <template v-slot:action="{ attrs }">
          <v-btn
            color="indigo"
            text
            v-bind="attrs"
            @click="showServiceOut = false"
          >
            Cerrar
          </v-btn>
        </template>
      </v-snackbar>

      <Nuxt />

    </v-main>

    <template>
      <v-footer
        dark
        padless
      >
        <v-card
          class="flex"
          flat
          tile
          dense
        >
          <v-card-title class="secondary">
            <strong class="subheading">¡Conéctate con nosotros en las redes sociales!</strong>

            <v-spacer></v-spacer>

            <v-btn
              v-for="icon in ['fa fa-facebook', 'fa fa-instagram', 'fa fa-twitter']"
              :key="icon"
              class="mx-2"
              dark
              icon
            >
              <v-icon size="24px">{{ icon }}</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text class="py-2 white--text text-center">
            Copyright &copy; <strong>Antigua Travel</strong> — {{ new Date().getFullYear() }}
          </v-card-text>
        </v-card>
      </v-footer>
    </template>

  </v-app>

</template>

<script>

import md5 from "crypto-js/md5";

import ForgotPassword from "@/components/ForgotPassword";

export default {

  mounted() {

    this.$bus.$on('serviceOut',() =>{
      console.log('entre')
      this.showServiceOut = true
      this.$forceUpdate()
    })

    this.usuario = JSON.parse(localStorage.getItem('usuario')) ?? { id: -1 }
    if(this.usuario.id > 0){
      this.$fire.storage.ref(
        'usuarios/'+JSON.parse(localStorage.getItem('usuario')).id + "/foto-perfil"
      ).getDownloadURL().then((url) => {
        this.usuario.img = url
        this.$forceUpdate()
      })
    }
    this.ObtenerNegociosAuth()
  },

  components: {

    ForgotPassword

  },

  data () {
    return {
      showServiceOut: false,
      usuario: {  },
      dialogos: {
        registro: false,
        login: false,
        ayuda_negocios: false,
        ayuda_usuarios: false
      },
      scrolledToBottom: false,
      must_login: false,
      menu: false,
      helpers: {
        step: 1,
        activePicker: null,
        eyeState: false,
        confirmEyeState: false,
        loading: false
      },
      rules: {
        required: value => !!value || 'La contraseña es obligatoria',
        requiredVerify: value => !!value || 'Es obligatorio confirmar la contraseña',
        min: value => value.length >= 8 || 'La contraseña debe tener al menos 8 caracteres',
        verificarPassword: value => value === this.form.password || 'Las contraseñas no son iguales',
        nombreRequerido: value => !!value || 'El nombre es obligatorio',
        emailRequerido: value => !!value || 'El correo electrónico es obligatorio',
        usernameRequerido: value => !!value || 'El nombre de usuario es obligatorio',
        numeroRequerido: value => !!value || 'El número de teléfono es obligatorio',
        numeroValido: value => value >= 9999999 && value <= 99999999 || 'Debe de contener exactamente 8 diigitos',
        emailValido:  v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Por favor escriba un correo electrónico válido',
        usernameValido: v => /^([a-z0-9]|[-._](?![-._])){8,20}$/.test(v) || 'Por favor escriba en nombre de usuario valido'
      },
      form: { password: '' },
      clipped: false,
      drawer: false,
      fixed: false,
      tabs: null,
      opciones_adicionales: [
        { titulo: 'Únete como negocio', value: 'N', icono: 'fa fa-building' },
        { titulo: 'Únete como guía de turismo', value: 'G', icono: 'fa fa-hiking' },
        { titulo: 'Únete como cambista', value: 'C', icono: 'fa fa-comments-dollar' }
      ],
      opciones_negocios: [
        { titulo: 'Administrador de Negocio', value: 'A', icono: 'fa fa-sign-in-alt' },
        { titulo: 'Ayuda', value: 'H', icono: 'fa fa-question-circle' },
      ],
      opciones_usuario: [
        { titulo: 'Iniciar sesión', value: 'I', icono: 'fa fa-sign-in-alt' },
        { titulo: 'Registrarse', value: 'R', icono: 'fa fa-id-badge' },
        { titulo: 'Ayuda', value: 'A', icono: 'fa fa-question-circle' }
      ],
      opciones_usuario_auth1: [
        { titulo: 'Mensajes', value: 'M', icono: 'fa fa-inbox' },
        { titulo: 'Reservaciones', value: 'R', icono: 'fa fa-calendar-week' },
        { titulo: 'Cuenta', value: 'C', icono: 'fa fa-user-cog' }
      ],
      opciones_usuario_auth2: [
        { titulo: 'Ayuda', value: 'A', icono: 'fa fa-question-circle' },
        { titulo: 'Cerrar sesión', value: 'L', icono: 'fa fa-sign-out-alt' }
      ],
      opciones: [
        {
          no: 1,
          icon: 'fa fa-home',
          title: 'Inicio',
          to: '/'
        },
        {
          no: 2,
          icon: 'fa fa-hotel',
          title: 'Hoteles',
          to: '/servicios/hoteles'
        },
        {
          no: 3,
          icon: 'fa fa-utensils',
          title: 'Restaurantes',
          to: '/servicios/restaurantes'
        },
        {
          no: 4,
          icon: 'fa fa-car',
          title: 'Renta de Autos',
          to: '/servicios/renta_autos'
        },
        {
          no: 5,
          icon: 'fa fa-hiking',
          title: 'Guías Turísticos',
          to: '/servicios/guias'
        },
        {
          no: 6,
          icon: 'fa fa-comments-dollar',
          title: 'Cambistas',
          to: '/servicios/cambistas'
        },
      ],
      title: 'Antigua Travel'
    }
  },

  watch: {
    menu (val) {
      val && setTimeout(() => (this.helpers.activePicker = 'YEAR'))
    },
  },

  methods: {

    async ObtenerNegociosAuth(){

      if(JSON.parse(localStorage.getItem('usuario'))){

        await this.$api.post('/negocios/usuario',
          { usuarioId: JSON.parse(localStorage.getItem('usuario')).id })
          .then( async data => {

            this.$store.commit('setNegocios', data)

            for (const negocio of data) {

              const negocioRef = this.$fire.database.ref('Negocios').child("id" +
                JSON.parse(localStorage.getItem('usuario')).id+"/idNegocio"+negocio.id)

              let neg = {
                negocioId: negocio.id,
                adminId: JSON.parse(localStorage.getItem('usuario')).id,
                image: negocio.img ?? '',
                nombreNegocio: negocio.nombre
              }

              await negocioRef.set(neg)

            }

          })

      }

    },

    VerificarForma(){
      if(this.helpers.step === 1 && this.$refs.formaDatos.validate()){
        this.helpers.step++
      }
      else if(this.helpers.step === 2 && this.$refs.formaDatosPasswords.validate()){
        this.helpers.step++
      }
    },

    GuardarBDAY (date) {
      this.$refs.menu.save(date)
    },

    MostrarDialogoPorOpcion(tipo) {

      if (tipo === 'N') {

        if(!JSON.parse(localStorage.getItem('usuario'))){
          this.must_login = true
          this.MostrarDialogoSignInSignUp('L')
        }
        else{
          this.$router.push({ path: '/negocios/registro' })
        }

      }

      else if (tipo === 'G') {

        if(!JSON.parse(localStorage.getItem('usuario'))){
          this.must_login = true
          this.MostrarDialogoSignInSignUp('L')
        }
        else{
          this.$router.push({ path: '/negocios/registro_guia' })
        }

      }

      else {

        if(!JSON.parse(localStorage.getItem('usuario'))){
          this.must_login = true
          this.MostrarDialogoSignInSignUp('L')
        }
        else{
          this.$router.push({ path: '/negocios/registro_cambista' })
        }

      }

    },

    MostrarDialogoOpcionesNegocio(tipo) {

      if (tipo === 'A') {

        this.$router.push({ path: '/negocios/login' })

      }
      else {

        this.dialogos.ayuda_negocios = true

      }
    },

    MostrarDialogoOpcionesUsuarioAuth(tipo){

      if(tipo === 'C'){

        this.$router.push({ path: '/usuario/cuenta' })

      }

      else if(tipo === 'M'){

        this.$router.push({ path: '/usuario/mensajes' })

      }

      else if(tipo === 'R'){

        this.$router.push({ path: '/usuario/reservaciones' })

      }

      else if(tipo === 'L'){

        this.$alert.confirm('¿Estás seguro que deseas cerrar sesión?',
          'Cerrar Sesión').then(async () => {
          localStorage.removeItem('usuario')
          this.usuario = { id: -1 }
          this.$store.commit('setNegocios', [])
        });


      }

      else{

        this.dialogos.ayuda_usuarios = true

      }

    },

    MostrarDialogoSignInSignUp(tipo){

      if(tipo === 'R'){
        this.helpers.step = 1
        this.helpers.eyeState = false
        this.helpers.confirmEyeState = false
        this.$refs.formaDatos?.resetValidation()
        this.$refs.formaDatosPasswords?.resetValidation()
        this.dialogos.registro = true;

      }
      else if(tipo === 'A'){

        this.dialogos.ayuda_usuarios = true;

      }
      else{
        this.$refs.FormaLogin?.resetValidation()
        this.dialogos.login = true;
      }

    },

    CerrarDialogoRegistro(){
      this.dialogos.registro = false
      this.form = { password: '' }
    },

    CerrarDialogoLogin(){

      this.must_login = false
      this.dialogos.login = false
      this.form = { password: '' }

    },

    RegistrarUsuario(){
      let params = {
        nombre: this.form.nombre,
        telefono: this.form.telefono,
        username: this.form.username,
        password: md5(this.form.password) + '',
        correo: this.form.email,
        nacimiento: this.form.fechaNacimiento,
        genero: this.form.genero.valor
      }

      this.$api.post('/usuario', params).then( data => {
        this.Login()
        this.CerrarDialogoRegistro()
      }).catch(err => console.log(err))
    },

    CambiarPassword(){

    },

    Login(){
      let params = {
        username: this.form.username,
        password: md5(this.form.password) + ''
      }
      this.helpers.loading = true

      this.$api.post('/signin', params).then( async data => {
        if (data.accessToken) {
          localStorage.setItem('usuario', JSON.stringify(data));

          this.usuario = JSON.parse(localStorage.getItem('usuario'))

          this.$fire.storage.ref('usuarios/'+this.usuario.id + "/foto-perfil")
            .getDownloadURL().then((url) => {
            this.usuario.img = url
            this.$forceUpdate()
          })

          await this.ObtenerNegociosAuth()

          await this.$api.post("/usuario/info", { id: this.usuario.id } )
            .then(async data => {
              try{

                const usersRef = this.$fire.database.ref('Users').child("id"+data.id)

                let user = {

                  username: data.username,
                  image: data.img ?? '',
                  correo: data.correo,
                  nombre: data.nombre

                }

                await usersRef.set(user)

              }
              catch (e) {
                console.error(e)
              }
            })

          this.helpers.loading = false
          this.CerrarDialogoLogin()
        }
        else{
          this.$alert.error(data.message, 'Inicio de Sesión Fallido')
          this.helpers.loading = false
        }
      }).catch(err => {
        if(err.response){
          this.$alert.error(err.response.data.message, 'Inicio de Sesión Fallido')
          this.helpers.loading = false
        }
      })
    }

  }

}
</script>
