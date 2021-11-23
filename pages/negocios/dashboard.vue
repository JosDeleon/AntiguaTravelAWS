<template>

  <v-container fluid>

    <v-row justify="center" align="center" class="my-3">

      <v-col cols="12" xl="5" lg="5" md="6">

        <v-card style="border-radius:15px;" outlined
                class="pa-6 animate__animated animate__jackInTheBox"
        >

          <v-toolbar
            flat
            style="border-radius: 10px;"
          >

            <v-sheet
              outlined
              elevation="1"
              height="90"
              width="90"
              class="mr-3 mb-12"
              :rounded="'xl'"
              color="grey lighten-2"
            >

              <v-img :src="negocios.seleccionado.img" height="90" width="90"
                     style="border-radius: 15px;"
              />

            </v-sheet>

            <v-spacer />

            <v-toolbar-title>

              <h4 class="text-wrap">
                <span class="hidden-sm-and-down">Visitas por negocio</span>
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

                      <v-icon small>
                        fa fa-chevron-down
                      </v-icon>

                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item
                      v-for="negocio in negocios.listado"
                      :key="negocio.id"
                      v-if="negocio.id !== negocios.seleccionado.id"
                    >
                      <v-btn text max-width="400" @click="RefrescarListado(negocio)">
                        <v-list-item-title style="font-size: 14px;" class="pa-1">
                          {{ negocio.nombre }}
                        </v-list-item-title>
                      </v-btn>
                    </v-list-item>
                  </v-list>

                </v-menu>
              </h4>
              <div class="subheading">
                <h6 class="mt-1 text-wrap">
                  {{ negocios.seleccionado.nombre }} ha tenido {{ negocios.seleccionado.vistas }} visitas
                </h6>
              </div>

            </v-toolbar-title>

          </v-toolbar>

        </v-card>

      </v-col>

      <v-col cols="12" xl="5" lg="5" md="6">

        <v-card style="border-radius:15px;" outlined
                class="pa-6 animate__animated animate__jackInTheBox"
                v-if="productos.listado && productos.listado.length > 0"
        >

          <v-toolbar
            flat
            style="border-radius: 10px;"
          >

            <v-sheet
              outlined
              elevation="1"
              height="90"
              width="90"
              class="mr-3 mb-12"
              :rounded="'xl'"
              color="grey lighten-2"
            >

              <v-img :src="productos.seleccionado.img" height="90" width="90"
                     style="border-radius: 15px;"
              />

            </v-sheet>

            <v-spacer />

            <v-toolbar-title>

              <h4 class="text-wrap">
                <span class="hidden-sm-and-down">Visitas por producto</span>
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

                      <v-icon small>
                        fa fa-chevron-down
                      </v-icon>

                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item
                      v-for="producto in productos.listado"
                      :key="producto.id"
                      v-if="producto.id !== productos.seleccionado.id"
                    >
                      <v-btn text max-width="400" @click="productos.seleccionado = producto">
                        <v-list-item-title style="font-size: 14px;" class="pa-1">
                          {{ producto.nombre }}
                        </v-list-item-title>
                      </v-btn>
                    </v-list-item>
                  </v-list>

                </v-menu>
              </h4>
              <div class="subheading">
                <h6 class="mt-1 text-wrap">
                  {{ productos.seleccionado.nombre }} ha tenido {{ productos.seleccionado.vistas }} visitas
                </h6>
              </div>

            </v-toolbar-title>

          </v-toolbar>

        </v-card>

      </v-col>


    </v-row>

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
    this.ObtenerNegocios()
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
      },

      negocios: {

        listado: [],
        seleccionado: {}

      },

      productos: {

        listado: [],
        seleccionado: {}

      }

    }
  },

  methods: {

    async ObtenerNegocios(){

      let params = {
        usuarioId: JSON.parse(localStorage.getItem('usuario')).id
      }

      await this.$api.post("/negocios/usuario", params).then(data => {

        this.negocios.listado = data
        this.negocios.seleccionado = data[0]
        this.ObtenerProductos()

      })

    },

    async ObtenerProductos(){

      let params = {
        id: this.negocios.seleccionado.id
      }

      await this.$api.post("/productos", params).then(data => {

        this.productos.listado = data
        this.productos.seleccionado = data[0]

      })

    },

    RefrescarListado(negocio){

      this.negocios.seleccionado = Object.assign({}, negocio)
      this.ObtenerProductos()

    }

  }

}

</script>
