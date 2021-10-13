<template>

  <v-container fluid>

    <v-list>

      <v-list-item>

        <v-list-item-title>

          <h1 class="black--text hidden-sm-and-down" style="font-size: 24px;">
            {{ guia.nombre }}
          </h1>
          <h3 class="black--text hidden-md-and-up" style="font-size: 20px;">
            {{ guia.nombre }}
          </h3>

        </v-list-item-title>

      </v-list-item>

      <v-list-item class="mt-n2">

        <v-list-item-title>
          <v-row class="py-4 pl-2">

            <v-rating
              :value="4.5"
              color="secondary"
              dense
              half-increments
              hover
            />

            <div class="grey--text mt-1 ml-1">
              413 valoraciones |
              <v-icon class="mx-1" small color="black"> fa fa-tags </v-icon>{{ 'Ecoturismo' }}

            </div>

          </v-row>

        </v-list-item-title>

      </v-list-item>

      <v-list-item class="mt-n3">

        <v-list-item-title>
          <v-row class="py-4 pl-2">

            <div class="grey--text mt-1 text-wrap">

              <v-icon class="mx-1" small color="black"> fa fa-map-marker-alt </v-icon>{{ guia.direccion }} |
              <v-icon class="mx-1" small color="black"> fa fa-phone </v-icon> (+502) {{ FormatTelefono() }} |
              <v-icon class="mx-1" small color="black"> fa fa-clock </v-icon><span :class="VerificarHora() === 'Cerrado' ?
                                                                                    'red--text' : 'green--text'">
                    {{ VerificarHora() === 'Cerrado' ? 'No disponible' : 'Disponible' }}
                  </span> - |

            </div>

          </v-row>

        </v-list-item-title>

      </v-list-item>

    </v-list>

    <v-divider class="my-4"/>

  </v-container>

</template>

<script>

export default {

  mounted() {
    this.ObtenerGuia()
  },

  data() {
    return {

      guia: {},

      productos: {
        listado: [],
        seleccionado: {}
      }

    }
  },

  methods: {

    async ObtenerGuia(){

      await this.$api.post("/negocios/categoria", { categoria: "D" }).then( data => {

        data.forEach( negocio => {

          if(negocio.id === +this.$route.params.id){

            this.guia = negocio

          }

        } )

      } )

    },

    VerificarHora(){

      if(this.guia && this.guia.abre && this.guia.cierra){

        var format = 'hh:mm:ss'
        var time = this.$moment(this.$moment(),format),
          beforeTime = this.$moment(this.guia.abre, format),
          afterTime = this.$moment(this.guia.cierra, format);

        if (time.isBetween(beforeTime, afterTime)) {
          return "Abierto"

        } else {

          return "Cerrado"

        }

      }

    },

    FormatTelefono(){

      if(this.guia.telefono){

        return this.guia.telefono.substring(0, 4) + " " + this.guia.telefono.substring(4)

      }

    }

  }

}

</script>
