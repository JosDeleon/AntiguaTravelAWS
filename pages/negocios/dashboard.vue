<template>

  <v-container fluid>

    <v-row class="my-6">

      <v-col cols="12" xl="4" lg="6" md="6" sm="6"
             v-for="opcion in opciones.listado"
             :key="opcion.no"
      >

        <v-hover  v-slot="{ hover }">

          <v-card style="border-radius:15px;" :elevation="hover ? 3 : 0" outlined
                  class="pa-6 animate__animated animate__jackInTheBox" min-height="230"
                  @click.stop="$router.push( { path: opcion.to } )"
          >

            <div class="d-flex flex-no-wrap justify-space-between">

              <div>

                <v-card-title
                  class="text-h5 hidden-sm-and-down text-break mb-1"
                  v-text="opcion.titulo"
                />
                <v-card-title
                  class="text-h6 hidden-md-and-up text-break mb-2"
                  v-text="opcion.titulo"
                />

                <v-card-subtitle v-text="opcion.descripcion"></v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    class="ml-2 mt-5 hidden-sm-and-down"
                    dark
                    depressed
                    color="#e1af73"
                    :to="opcion.to"
                  >
                    <v-icon left> fa fa-globe </v-icon> Ir a página
                  </v-btn>
                  <v-btn
                    class="ml-2 mt-5 hidden-md-and-up"
                    dark
                    depressed
                    small
                    color="#e1af73"
                    :to="opcion.to"
                  >
                    <v-icon left> fa fa-globe </v-icon> Ir a página
                  </v-btn>
                </v-card-actions>

              </div>

              <v-avatar
                class="ma-3 hidden-sm-and-down"
                size="160"
                tile
              >
                <v-icon v-if="opcion.icono" size="125" color="primary darken-1">{{ opcion.icono }}</v-icon>
                <v-img v-else :src="'/imagen-no-disponible.png'"></v-img>
              </v-avatar>

              <v-avatar
                class="ma-3 hidden-md-and-up"
                size="100"
                tile
              >
                <v-icon v-if="opcion.icono" size="80" color="primary">{{ opcion.icono }}</v-icon>
                <v-img v-else :src="'/imagen-no-disponible.png'"></v-img>
              </v-avatar>

            </div>

          </v-card>

        </v-hover>

      </v-col>

    </v-row>

  </v-container>

</template>

<script>

export default {

  mounted() {
    this.$store.commit('setRutaActual', 'Inicio')
  },

  layout: 'admin_negocio',

  middleware: 'VerificarTieneNegocio',

  head(){
    return{
      titleTemplate: "Antigua Travel | Inicio"
    };
  },


  data(){
    return{

      opciones: {
        listado: [
          {
            no: 1,
            icono: 'fa fa-user-cog',
            titulo: 'Administrar Cuenta',
            descripcion: 'Página para editar los datos asociados a tu cuenta',
            to: '/usuario/cuenta'
          },
          {
            no: 2,
            icono: 'fa fa-envelope',
            titulo: 'Bandeja de Entrada',
            descripcion: 'Página para recibir mensajes e interactuar con los clientes',
            to: '/negocios/mensajes'
          },
          {
            no: 3,
            icono: 'fa fa-briefcase',
            titulo: 'Listado de Negocios',
            descripcion: 'Página para el manejo y la edición de los negocios asociados',
            to: '/negocios/listado_negocios'
          },
          {
            no: 4,
            icono: 'fa fa-images',
            titulo: 'Galeria de Imágenes',
            descripcion: 'Página para adminstrar la galeria de imágenes de cada uno de tus negocios',
            to: '/negocios/galeria'
          },
          {
            no: 5,
            icono: 'fa fa-cubes',
            titulo: 'Productos y Servicios',
            descripcion: 'Página para adminstrar los productos asociados a cada uno de tus negocios',
            to: '/negocios/productos_servicios'
          },
          {
            no: 6,
            icono: 'fa fa-calendar-week',
            titulo: 'Reservaciones',
            descripcion: 'Página para adminstrar las reservaciones y de igual forma agendar reservaciones',
            to: '/negocios/listado_reservaciones'
          },
        ]
      }

    }
  },

  methods: {
  }

}

</script>
