<template>

  <v-app dark style="background: #F5F5F5;">

    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      fixed
      app
      dark
      color="secondary"
      width="350"
    >

      <v-list>

        <v-list-item link :to="'/usuario/cuenta'">
          <v-list-item-avatar>
            <v-img :src="usuario_autenticado.img ? usuario_autenticado.img : '/no-pf.png'" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ usuario_autenticado.nombre }}
            </v-list-item-title>
            <v-list-item-subtitle>
              <v-icon size="20" class="mr-1"> fa fa-user-cog </v-icon>
              Administrar Cuenta
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item link :to="'/negocios/mensajes'">
          <v-list-item-avatar>
            <v-icon>fa fa-envelope</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              Bandeja de Entrada
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="(ruta, i) in rutas" :key="i" :to="ruta.to" router exact>
          <v-list-item-action>
            <v-icon color="lightTitle">{{ ruta.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="ruta.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>

    <v-app-bar dark color="secondary" elevation="0"
               :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon large @click.stop="drawer = !drawer" />
      <div class="ml-2">

        <v-row class="mb-n9" align="center">

          <v-col>
            <h3 class="hidden-sm-and-down">Antigua Travel</h3>
            <h4 class="hidden-md-and-up">Antigua Travel</h4>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <span class="hidden-sm-and-down"> {{ $store.state.rutaActual }} </span>
            <span style="font-size: 15px;" class="hidden-md-and-up"> {{ $store.state.rutaActual }} </span>
          </v-col>
        </v-row>

      </div>

      <v-progress-circular indeterminate v-show="$store.state.loading"
                           class="mx-2" color="white" />
      <v-spacer />

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            dark
            v-bind="attrs"
            v-on="on"
            icon
            @click="$router.push({path: '/negocios/dashboard'})"
          >
            <v-icon>fa fa-home</v-icon>
          </v-btn>
        </template>
        <span>Regresar a Inicio</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            dark
            v-bind="attrs"
            v-on="on"
            icon
            @click="$router.push({path: '/'})"
          >
            <v-icon>fa fa-globe</v-icon>
          </v-btn>
        </template>
        <span>Regresar al sitio</span>
      </v-tooltip>

      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            dark
            v-bind="attrs"
            v-on="on"
            icon
            @click="logoutUser"
          >
            <v-icon>fa fa-sign-out-alt</v-icon>
          </v-btn>
        </template>
        <span>Cerrar Sesión</span>
      </v-tooltip>
    </v-app-bar>

    <v-main>

      <nuxt />

    </v-main>

    <v-footer
      color="secondary"
      class="white--text"
      height="30"
      dense
    >
      <v-layout justify-center>
        <span style="font-size: 14px;">
          Copyright &copy; Antigua Travel &mdash;
          {{ new Date().getFullYear() }}
        </span>
      </v-layout>
    </v-footer>

  </v-app>

</template>

<script>
export default {

  mounted() {

    this.ObtenerAuth()

  },

  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      usuario_autenticado: {},
      rutas: [
        {
          no: 1,
          icon: 'fa fa-home',
          title: 'Inicio',
          to: '/negocios/dashboard'
        },
        {
          no: 2,
          icon: 'fa fa-briefcase',
          title: 'Listado de Negocios',
          to: '/negocios/listado_negocios'
        },
        {
          no: 3,
          icon: 'fa fa-images',
          title: 'Galeria de Imágenes',
          to: '/negocios/galeria'
        },
        {
          no: 4,
          icon: 'fa fa-cubes',
          title: 'Productos y Servicios',
          to: '/negocios/productos_servicios'
        },
        {
          no: 5,
          icon: 'fa fa-calendar-week',
          title: 'Reservaciones',
          to: '/negocios/listado_reservaciones'
        },
      ],
      miniVariant: false,
      badgeConteo: null
    }
  },

  methods: {

    async ObtenerAuth(){

      this.usuario_autenticado = await this.$api.post("/usuario/info",
        { id: JSON.parse(sessionStorage.getItem('usuario')).id })

      if(this.usuario_autenticado.id > 0){
        this.$fire.storage.ref(
          'usuarios/'+this.usuario_autenticado.id + "/foto-perfil"
        ).getDownloadURL().then((url) => {
          this.usuario_autenticado.img = url
          this.$forceUpdate()
        })
      }

    },

    async logoutUser(){
      try {
        this.$alert.confirm('¿Está seguro que desea cerrar sesión?',
          'Cerrar Sesión').then(() => {

          sessionStorage.removeItem('usuario')
          this.$router.push({path: '/negocios/login'})

        });
      } catch (e) {
        console.error(e.message)
      }
    }

  },
}
</script>
