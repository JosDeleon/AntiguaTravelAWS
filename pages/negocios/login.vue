<template>
  <v-container fill-height>

    <v-layout align-center row wrap>

      <v-row align="center" justify="center">

        <v-col cols="12">
          <v-img
            contain
            height="160"
            src="/logo.png"
          />
        </v-col>

        <v-col cols="9" xl="3" lg="4" sm="6" md="6">

          <v-card style="border-radius:15px;" elevation="0" outlined class="pa-6">

            <v-toolbar elevation="0" dense color="transparent">
              <v-spacer/>
              <h1> INGRESO </h1>
              <v-spacer/>
            </v-toolbar>

            <v-card-text class="pa-6">

              <v-form ref="formaLogin">

                <v-text-field
                  outlined
                  v-model="form.username"
                  :rules="[ v => v && v.length > 0 || 'El nombre de usuario es obligatorio' ]"
                  label="Nombre de Usuario"
                  color="black"
                  prepend-inner-icon="fa fa-user"
                  style="border-radius:10px;"
                />

                <v-text-field
                  v-model="form.password"
                  :append-icon="helpers.eyeState ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required]"
                  prepend-inner-icon="fa fa-lock"
                  :type="helpers.eyeState ? 'text' : 'password'"
                  name="input-10-1"
                  label="Contraseña"
                  outlined
                  autocomplete="new-password"
                  @click:append="helpers.eyeState = !helpers.eyeState"
                  color="black"
                  style="border-radius:10px;"
                />

              </v-form>

              <div class="mb-6 mt-n2 ml-n4">

                <ForgotPassword />

              </div>

              <v-btn color="secondary"
                     light
                     type="submit"
                     :loading="loading"
                     block
                     style="border-radius:7px;"
                     elevation="0"
                     class="mt-2"
                     x-large
                     @click="login"
              >
                <v-icon left color="white" size="30" class="pr-2">
                  fa fa-unlock-alt
                </v-icon>
                <div class="white--text">Ingresar</div>
              </v-btn>

            </v-card-text>

          </v-card>

        </v-col>

      </v-row>

    </v-layout>

  </v-container>
</template>

<script>
import md5 from "crypto-js/md5";
import ForgotPassword from "@/components/ForgotPassword";

export default {

  mounted() {
    this.checkLogin()
  },

  head(){
    return{
      titleTemplate: "Antigua Travel | Inicio de Sesión"
    };
  },

  components: { ForgotPassword },

  middleware: 'LoginConNegocio',

  layout: 'empty',

  data(){
    return {
      helpers: {
        eyeState: false,
        confirmEyeState: false
      },
      rules: {
        required: value => !!value || 'La contraseña es obligatoria',
        requiredVerify: value => !!value || 'Es obligatorio confirmar la contraseña',
        min: value => value.length >= 8 || 'La contraseña debe tener al menos 8 caracteres',
        verificarPassword: value => value === this.form.password || 'Las contraseñas no son iguales'
      },
      form: { password: '' },
      value: true,
      loading: false
    }
  },

  methods: {
    async login() {
      if(this.$refs.formaLogin.validate()){

        let params = {
          username: this.form.username,
          password: md5(this.form.password) + '',
        }

        this.loading = true

        this.$api.post('/signin', params).then( data => {
          console.log(data);
          if(data.accessToken){
            localStorage.setItem('usuario', JSON.stringify(data));

            this.usuario = JSON.parse(localStorage.getItem('usuario'))
            this.loading = false
            this.$router.push({path: '/negocios/dashboard'})
          }
        }).catch(data => {
          this.$alert.error(data.message, 'Inicio de Sesión Fallido')
          this.loading = false
        })

      }
    },
    CambiarPassword(){

    },
    checkLogin() {

    },
  }
}
</script>
