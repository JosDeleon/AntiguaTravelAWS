<template>

  <v-dialog max-width="620" v-model="dialogo"
            transition="fab-transition" persistent>

    <v-card style="border-radius:15px;" elevation="0" outlined class="pa-6">

      <v-toolbar elevation="0" dense color="transparent" class="hidden-sm-and-down">
        <v-spacer/>
        <h2>Preguntas Frecuentes</h2>
        <v-spacer/>
        <v-btn icon @click="CerrarDialogo">
          <v-icon>fa fa-times</v-icon>
        </v-btn>
      </v-toolbar>

      <v-toolbar elevation="0" dense color="transparent" class="hidden-md-and-up">
        <v-spacer/>
        <h3>Preguntas Frecuentes</h3>
        <v-spacer/>
        <v-btn icon @click="CerrarDialogo">
          <v-icon>fa fa-times</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="pa-4">

        <v-list class="mt-n4">

          <v-list-item>

            <v-list-item-content>

              <v-list-item-title class="text-wrap">
                <h4>¿Cómo puedo recuperar mi contraseña?</h4>
              </v-list-item-title>

              <v-list-item-subtitle class="text-wrap text-justify black--text">
                <p>

                  Si necesitas recuperar tu contraseña puedes hacerlo en el apartado de usuarios en la esquina superior
                  derecha al lado de apartado de negocios <v-icon size="20" color="black">fa fa-briefcase</v-icon> o en el mismo apartado en la
                  opción de inicio de sesión.

                </p>
              </v-list-item-subtitle>

            </v-list-item-content>

          </v-list-item>

          <v-list-item>

            <v-list-item-content>

              <v-list-item-title class="text-wrap">
                <h4>¿Por qué no tengo mensajes en mi buzón?</h4>
              </v-list-item-title>

              <v-list-item-subtitle class="text-wrap text-justify black--text">
                <p>

                  Para tener mensajes primero debes de contactar con algún negocio, guía de turismo o
                  cambista yendo a su página en la parte superior dando click en el icono
                  <v-icon size="20" color="primary darken-2">fa fa-paper-plane</v-icon>.

                </p>
              </v-list-item-subtitle>

            </v-list-item-content>

          </v-list-item>

          <v-list-item>

            <v-list-item-content>

              <v-list-item-title class="text-wrap">
                <h4>¿Cómo puedo valorar un negocio?</h4>
              </v-list-item-title>

              <v-list-item-subtitle class="text-wrap text-justify black--text">
                <p>

                  Para valorar un negocio debes de irte a la página del negocio y en la parte inferor
                  de la página hay un apartado donde con toda confianza puedes dejar un comentario siempre
                  y cuando no sea un negocio que administres.

                </p>
              </v-list-item-subtitle>

            </v-list-item-content>

          </v-list-item>

          <v-list-item>

            <v-list-item-content>

              <v-list-item-title class="text-wrap">
                <h4>¿Es posible realizar una reservación?</h4>
              </v-list-item-title>

              <v-list-item-subtitle class="text-wrap text-justify black--text">
                <p>

                  Para realizar una reservación primero debes de ir a la página del negocio
                  que desees y en la parte superior de la página debes dar click en el icono
                  <v-icon size="20" color="black">fa fa-calendar-week</v-icon>.

                </p>
              </v-list-item-subtitle>

            </v-list-item-content>

          </v-list-item>

          <v-list-item>

            <v-list-item-content>

              <v-list-item-title class="text-wrap">
                <h4>¿Puedo contratar un servicio por medio de la página?</h4>
              </v-list-item-title>

              <v-list-item-subtitle class="text-wrap text-justify black--text">
                <p>

                  No es posible contratar un servicio directamente en la página, si deseas
                  contratar un servicio primero debes de contactar al negocio por medio de
                  su página dando click en <v-icon size="20" color="primary darken-2">fa fa-paper-plane</v-icon>.

                </p>
              </v-list-item-subtitle>

            </v-list-item-content>

          </v-list-item>

          <v-list-item>

            <v-list-item-content>

              <v-list-item-title class="text-wrap">
                <h4>¿Si mi cuenta esta asociada a negocios puedo usar mi cuenta en la plataforma?</h4>
              </v-list-item-title>

              <v-list-item-subtitle class="text-wrap text-justify black--text">
                <p>

                  Sí, con tu cuenta podrás seguir usando la plataforma de forma normal, siempre y cuando
                  no sean interacciones con tus propios negocios, puedes explorar, contactar y reservar
                  con negocios.

                </p>
              </v-list-item-subtitle>

            </v-list-item-content>

          </v-list-item>

        </v-list>

      </v-card-text>

    </v-card>

  </v-dialog>

</template>

<script>

export default {

  props: {

    value: Boolean

  },

  computed: {

    dialogo: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    },

  },

  methods: {

    CerrarDialogo(){

      this.dialogo = false

    }

  }

}

</script>
