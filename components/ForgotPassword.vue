<template>

  <v-dialog max-width="620" v-model="dialogos.change_password"
            transition="fab-transition" persistent>

    <template v-slot:activator="{ on, attrs }">
      <v-btn
          text
          color="transparent"
          v-bind="attrs"
          v-on="on"
          style="background-color: transparent;"
      >

      <span class="text-caption black--text font-weight-bold"
            style="text-decoration: underline;"
      >
        ¿Olvidaste tu contraseña?
      </span>

      </v-btn>
    </template>

    <v-card style="border-radius:15px;" elevation="0" outlined class="pa-6">

      <v-toolbar elevation="0" dense color="transparent" class="hidden-sm-and-down">
        <v-spacer/>
        <h2>Restablecer Contraseña</h2>
        <v-spacer/>
        <v-btn icon @click="CerrarDialogoCambiarPassword">
          <v-icon>fa fa-times</v-icon>
        </v-btn>
      </v-toolbar>

      <v-toolbar elevation="0" dense color="transparent" class="hidden-md-and-up">
        <v-spacer/>
        <h3>Restablecer Contraseña</h3>
        <v-spacer/>
        <v-btn icon @click="CerrarDialogoCambiarPassword">
          <v-icon>fa fa-times</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="pa-6">

        <v-layout justify-center class="mb-6">
          <h4 class="mt-1 text-wrap primary-text hidden-sm-and-down"
              style="text-align:justify; text-justify: inter-word;"
          >
            Por favor ingrese su correo electrónico para recibir las instrucciones para restablecer la contraseña de su cuenta
          </h4>
          <h4 class="mt-1 text-wrap primary-text hidden-md-and-up"
              style="text-align:justify; text-justify: inter-word;"
          >
            Por favor ingrese su correo electrónico para recibir las instrucciones para restablecer la contraseña de su cuenta
          </h4>
        </v-layout>

        <v-form ref="frmCambioPassword" @submit.prevent="CambiarPassword">

          <v-text-field
              outlined
              v-model="correo"
              :rules="[ v => v && v.length > 0 || 'El nombre de usuario es obligatorio' ]"
              label="Correo Electrónico"
              prepend-inner-icon="fa fa-envelope"
              style="border-radius:10px;"
          />

          <v-btn color="secondary" light type="submit" block
                 style="border-radius:7px;" elevation="0" class="mt-2" x-large
          >
            <v-icon left color="white" size="30" class="pr-2">
              fa fa-key
            </v-icon>
            <div class="white--text">Cambiar Contraseña</div>
          </v-btn>

        </v-form>

      </v-card-text>

    </v-card>

  </v-dialog>

</template>

<script>

  import md5 from "crypto-js/md5";

  export default {

    data(){
      return{
        dialogos: {
          change_password: false
        },
        correo: null
      }
    },

    computed: {

    },

    methods: {

      CerrarDialogoCambiarPassword(){

        this.username = null
        this.$refs.frmCambioPassword?.resetValidation()
        this.dialogos.change_password = false

      },

      CambiarPassword(){

        if(this.$refs.frmCambioPassword.validate()){

          let params = {
            usuario: this.correo
          }

        }

      },

    }

  }

</script>
