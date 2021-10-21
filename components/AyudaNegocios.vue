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

      <v-card-text class="pa-6">

        <v-list>

          <v-list-item>

            <v-list-item-content>

              <v-list-item-title class="text-wrap">
                <h4>¿Cómo hago para registrar mi negocio?</h4>
              </v-list-item-title>

              <v-list-item-subtitle class="text-wrap text-justify black--text">
                <ol class="ml-4 mt-2">
                  <li>
                    Lo primero que se debe de hacer es registrarse en la parte superior derecha de la página,
                    para que dicha cuenta sea asociada con el negocio para la administración del mismo.
                  </li>
                  <li class="mt-2">
                    Una vez se este registrado, se debe de llenar un formulario de registro de negocio en que
                    se puede encontrar en el apartado de negocios (el icono del portafolio).
                  </li>
                  <li class="mt-2">
                    Una vez te encuentres en dicho apartado selecciona si quieres registrarte como un negocio
                    (restaurante, hotel o renta de autos), cambista o guía de turismo.
                  </li>
                  <li class="mt-2">
                    Cuando te encuentres en cualquiera de las páginas mencionadas, debes de llenar el formulario con
                    los datos que se solicitan lo más detallado posible.
                  </li>
                  <li class="mt-2">
                    Cuando termines de llenar los datos y registres el negocio, te estará llegando un correo al correo asociado
                    a tu cuenta. En dicho correo se solicitarán datos adicionales de tu empresa así como de tu persona para poder
                    activar tu negocio.
                  </li>
                </ol>
              </v-list-item-subtitle>

            </v-list-item-content>

          </v-list-item>

          <v-list-item>

            <v-list-item-content>

              <v-list-item-title class="text-wrap">
                <h4>¿Cómo administro mis negocios?</h4>
              </v-list-item-title>

              <v-list-item-subtitle class="text-wrap text-justify black--text">
                Si cuentas con un negocio, puedes ir al apartado de negocios y accesar al administrador de negocios
                en donde encontrarás una variedad de opciones para modificar tu negocio.
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
