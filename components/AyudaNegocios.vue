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
                <h4>¿Cómo hago para registrar mi negocio?</h4>
              </v-list-item-title>

              <v-list-item-subtitle class="text-wrap text-justify black--text">
                <ol class="ml-4 mt-2">
                  <li>
                    Lo primero que se debe de hacer es registrarse en la parte superior derecha de la página, en el apartado
                    al lado del apartado de negocios apartado de negocios <v-icon size="20" color="black">fa fa-briefcase</v-icon>
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
                <h4>Requisitos para que se apruebe tu negocio</h4>
              </v-list-item-title>

              <v-list-item-subtitle class="text-wrap text-justify black--text">
                <ol class="ml-4 mt-2">
                  <li>
                    Tener 5 tags o más agregados al negocio.
                  </li>
                  <li class="mt-2">
                    Tener 10 o más imagenes en la galería.
                  </li>
                  <li class="mt-2">
                    Tener una foto de perfil adecuada para el negocio (se solicita en un tamaño específico).
                  </li>
                  <li class="mt-2">
                    Identificarse con DPI o algún documento de identificación válido en el país.
                  </li>
                  <li class="mt-2">
                    Tener 10 o más productos agregados al negocio
                  </li>
                  <li class="mt-2">
                    Tener documentos en orden del negocio para darle validez al mismo.
                  </li>
                  <li class="mt-2">
                    Se debe de pasar por un proceso de verificación en cuanto a la empresa
                  </li>
                  <li class="mt-2">
                    Antecendentes penales y policiacos del encargado
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
