<template>

  <v-container fluid :fill-height="chat_pool.length === 0">

    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      fixed
      app
      :width="($vuetify.breakpoint.name === 'sm' ||
      $vuetify.breakpoint.name === 'xs') ? 350 : 500"
      v-if="chat_pool && chat_pool.length > 0"
      color="primary"
    >

      <v-layout justify-center>
        <v-img src="/logo-no-texto.png" contain width="250" height="250"/>
      </v-layout>

      <v-list>

        <v-list-item>
          <v-list-item-content>
            <v-autocomplete
              outlined
              rounded
              dense
              hide-details
              placeholder="Busqueda"
              label="Busqueda"
              prepend-inner-icon="mdi-magnify"
              color="black"
              :items="[]"
              item-value="tag"
              item-text="tag"
              clearable
              clear-icon="fa fa-times-circle"
              background-color="white"
              item-color="black"
              chips
              small-chips
              multiple
              no-data-text="No hay nadie con el nombre especificado"
            />
          </v-list-item-content>
        </v-list-item>

        <v-divider />

        <v-list-item-group v-model="seleccionado" mandatory
                           @change="CambiarChat" color="secondary"
        >

          <v-list-item
            v-for="(chat, j) in chat_pool"
            :key="j"
            exact
            class="ma-2"
            link
            outlined
          >
            <v-list-item-avatar>
              <v-img :src="negocios && negocios[chat.negocio][chat.key_negocio].image !== '' ?
              negocios[chat.negocio][chat.key_negocio].image :
              'https://www.timandorra.com/wp-content/uploads/2016/11/Imagen-no-disponible-282x300.png'"
              />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                <h4>
                  {{ negocios ? negocios[chat.negocio][chat.key_negocio].nombreNegocio : '' }}
                </h4>
                <v-spacer />
                <span>
                  {{
                    chat.fechaHora ? $moment(chat.fechaHora, "L h:mm:ss a").fromNow() : null
                  }}
                </span>
              </v-list-item-title>
              <v-list-item-subtitle>
                <div v-if="chat.ultimoEnviadoPor === idAuth">
                  <v-icon small>fa fa-check</v-icon>
                  {{ chat.ultimoMensaje !== '' ? chat.ultimoMensaje :
                  'Aún no hay mensajes en esta conversación' }}
                </div>
                <div v-else>
                  <div v-if="chat.ultimoMensaje !== 'formReservacion'">
                    {{ chat.ultimoMensaje !== '' ? chat.ultimoMensaje :
                    'Aún no hay mensajes en esta conversación' }}
                  </div>
                  <div>
                    Te enviaron un link de reservación
                  </div>
                </div>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

        </v-list-item-group>

      </v-list>

    </v-navigation-drawer>

    <v-app-bar
      fixed
      app
      flat
      color="primary"
      outlined
    >
      <v-app-bar-nav-icon color="secondary"
                          @click.stop="drawer = !drawer" v-if="chat_pool && chat_pool.length > 0"
      />
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="secondary"
            dark
            v-bind="attrs"
            v-on="on"
            icon
            @click="$router.push({path: ($nuxt.context.from.path) ? $nuxt.context.from.path : '/'})"
          >
            <v-icon color="secondary"> fa fa-arrow-left </v-icon>
          </v-btn>
        </template>
        <span>Regresar</span>
      </v-tooltip>
      <v-avatar size="45" v-if="chat_pool && chat_pool.length > 0" class="mr-2">
        <v-img :src="negocios && chat_pool[seleccionado] &&
              negocios[chat_pool[seleccionado].negocio][chat_pool[seleccionado].key_negocio].image !== '' ?
              negocios[chat_pool[seleccionado].negocio][chat_pool[seleccionado].key_negocio].image :
               'https://www.timandorra.com/wp-content/uploads/2016/11/Imagen-no-disponible-282x300.png'"
               min-width="100"
               min-height="100"
               contain
               class="mr-2"
        />
      </v-avatar>
      <v-avatar size="60" v-else>
        <v-img src="/logo-no-texto.png"
               width="100"
               height="100"
               contain
               class="mr-2"
        />
      </v-avatar>
      <v-toolbar-title v-if="chat_pool && chat_pool.length > 0">
        {{
          negocios && chat_pool[seleccionado] ?
            negocios[chat_pool[seleccionado].negocio][chat_pool[seleccionado].key_negocio].nombreNegocio :
            ''
        }}
      </v-toolbar-title>
      <v-toolbar-title v-else v-text="'No hay mensajes para mostrar'" />
    </v-app-bar>

    <v-list-item-group>

      <v-row v-for="(mensaje, i) in mensajes" :key="i"
             :justify="mensaje.enviadoPor !== idAuth ? 'end' : 'start'"
      >

        <v-col cols="12">

          <v-layout justify-center>
            <div class="text-secondary">
              {{ $moment.utc(mensaje.fecha, 'DD/MM/YYYY').format('D [ de ] MMMM YYYY') }} a las {{mensaje.hora}}
            </div>
          </v-layout>

        </v-col>

        <v-col cols="10" xl="4" lg="4" md="6" sm="8" xs="8">

          <v-card
            elevation="0"
            outlined
            style="border-radius:50px;"
            class="mb-2"
          >

            <v-list-item
              exact
              class="ma-2"
              link
              inactive
              v-if="mensaje.mensaje !== 'formReservacion'"
            >
              <v-list-item-avatar class="align-center" v-if="mensaje.enviadoPor === idAuth">
                <v-img :src="ObtenerImagenChat(mensaje.enviadoPor)" />
              </v-list-item-avatar>
              <v-list-item-content :class="mensaje.enviadoPor !== idAuth ?
                                     'text-right align-self-start' : null"
                                   color="white"
              >
                <v-list-item-title v-text="ObtenerNombreChat(mensaje.enviadoPor)" />
                <v-list-item-subtitle class="text-wrap" v-text="mensaje.mensaje" />
              </v-list-item-content>
              <v-list-item-avatar class="align-center" v-if="mensaje.enviadoPor !== idAuth">
                <v-img :src="ObtenerImagenChat(mensaje.enviadoPor)" />
              </v-list-item-avatar>
            </v-list-item>

            <v-list-item exact class="ma-2" inactive v-else>
              <v-list-item-avatar class="align-center" v-if="mensaje.enviadoPor === idAuth">
                <v-img :src="ObtenerImagenChat(mensaje.enviadoPor)" />
              </v-list-item-avatar>
              <v-list-item-content :class="mensaje.enviadoPor !== idAuth ?
                                     'text-right align-self-start' : null"
                                   color="white"
              >
                <v-list-item-title v-text="ObtenerNombreChat(mensaje.enviadoPor)" />
                <v-list-item-subtitle class="text-wrap">

                  <v-card :to="'/negocios/reservaciones'" color="grey lighten-4" elevation="0"
                          outlined style="border-radius:15px;" class="mt-2"
                  >

                    <v-layout justify-center>

                      <v-card-title class="font-weight-bold">
                        Formulario de Reservación
                      </v-card-title>

                    </v-layout>

                    <v-card-subtitle class="mt-n5 text-justify">
                      En el siguiente link podrás solicitar una reservación con nosotros
                    </v-card-subtitle>

                    <v-card-text>

                      <v-layout justify-center>

                        <v-img src="/logo-no-texto.png" contain max-height="200" max-width="200" />

                      </v-layout>

                    </v-card-text>

                  </v-card>

                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-avatar class="align-center" v-if="mensaje.enviadoPor !== idAuth">
                <v-img :src="ObtenerImagenChat(mensaje.enviadoPor)" />
              </v-list-item-avatar>
            </v-list-item>

          </v-card>

        </v-col>

      </v-row>

    </v-list-item-group>

    <v-layout justify-center align-center row wrap v-if="chat_pool.length === 0">

      <v-row align="center" justify="center">

        <v-col cols="12">

          <v-layout justify-center>

            <v-icon size="150" color="secondary">

              fa fa-exclamation-triangle

            </v-icon>

          </v-layout>

        </v-col>

        <v-col cols="12">

          <v-layout justify-center>
            <div class="subtitle justify-text" style="font-size: 18px;">
              Aún no has iniciado ninguna conversación
            </div>
          </v-layout>

        </v-col>
      </v-row>
    </v-layout>


  </v-container>

</template>

<script>

export default {

  mounted() {

    this.idAuth = JSON.parse(sessionStorage.getItem('usuario')) ?
      "id" + JSON.parse(sessionStorage.getItem('usuario')).id : ''
    this.ObtenerChats()
    this.ObtenerNegocios()
    this.ObtenerUsuarios()
  },

  middleware: 'VerificarUsuarioAuth',

  head(){
    return{
      titleTemplate: "Antigua Travel | Bandeja de Entrada"
    };
  },

  data(){

    return{
      clipped: false,
      drawer: false,
      fixed: false,
      chat_pool: [],
      chats: {},
      seleccionado: 0,
      userChats: [],
      negocios: {},
      usuarios: {},
      idAuth: -1,
      mensajesRef: null,
      mensajes: []

    }

  },

  layout: 'chat',

  methods: {

    CambiarChat(){
      this.$store.commit('setUsuarioChatActual', this.chat_pool[this.seleccionado])
      this.mensajesRef = this.$fire.database.ref("chatMessages")
        .child(this.$store.state.usuarioChatActual.chat)
      this.ObtenerMensajes()

    },

    ObtenerNombreChat(idEnviado){

      if(this.chat_pool[this.seleccionado].negocio === idEnviado){

        return this.negocios[idEnviado][this.chat_pool[this.seleccionado].key_negocio].nombreNegocio

      }

      else{

        return this.usuarios[idEnviado].nombre

      }

    },

    ObtenerImagenChat(idEnviado){

      if(this.chat_pool[this.seleccionado].negocio === idEnviado){

        let imagen = this.negocios[idEnviado][this.chat_pool[this.seleccionado].key_negocio].image

        return imagen !== '' ? imagen :
          'https://www.timandorra.com/wp-content/uploads/2016/11/Imagen-no-disponible-282x300.png'

      }

      else{

        let imagen = this.usuarios[idEnviado].image

        return imagen !== '' ? imagen :
          'https://www.timandorra.com/wp-content/uploads/2016/11/Imagen-no-disponible-282x300.png'

      }

    },

    async ObtenerChats(){

      let chatsRef = this.$fire.database.ref("Chats")

      await chatsRef.on('value', (snapshot) => {
        this.chats = snapshot.val()
        this.ObtenerChatsUsuario()
      }, (errorObject) => {
        console.log('La lectura en la DB fallo: ' + errorObject.name);
      });

    },

    async ObtenerMensajes(){

      await this.mensajesRef.on('value', (snapshot) => {

        this.mensajes = []

        if(snapshot.exists()){

          Object.keys(snapshot.val()).forEach( mensajeKey => {

            this.mensajes.push(snapshot.val()[mensajeKey])

          } )

          this.$vuetify.goTo(document.body.scrollHeight)

        }

      }, (errorObject) => {
        console.log('La lectura en la DB fallo: ' + errorObject.name);
      });

    },

    async ObtenerNegocios(){

      let negociosRef = this.$fire.database.ref("Negocios")

      await negociosRef.on('value', (snapshot) => {
        this.negocios = snapshot.val()
      }, (errorObject) => {
        console.log('La lectura en la DB fallo: ' + errorObject.name);
      });

    },

    async ObtenerUsuarios(){

      let usuariosRef = this.$fire.database.ref("Users")

      await usuariosRef.on('value', (snapshot) => {
        this.usuarios = snapshot.val()
      }, (errorObject) => {
        console.log('La lectura en la DB fallo: ' + errorObject.name);
      });

    },

    async ObtenerChatsUsuario(){


      let userChatsRef = this.$fire.database.ref("userChats/"+this.idAuth)

      await userChatsRef.on('value', (snapshot) => {

        this.userChats = []
        this.chat_pool = []
        this.userChats = snapshot.val() ? Object.keys(snapshot.val()) : []
        let chatKeys = this.chats ? Object.keys(this.chats) : []

        this.userChats.forEach(uc => {

          let temporal = {}

          chatKeys.forEach(chatKey => {

            if(chatKey === uc){

              temporal = Object.assign({}, this.chats[chatKey])

              Object.keys(temporal).forEach( chatItemKey => {

                if(temporal[chatItemKey].usuario === this.idAuth){

                  temporal[chatItemKey].idChat = chatItemKey
                  temporal[chatItemKey].chat = uc

                  this.chat_pool.push(temporal[chatItemKey])

                }

              })

            }

          })

        })

        if(this.chat_pool.length > 0){
          if(this.$route.query.id && this.$route.query.id > 0){

            this.chat_pool.forEach(chat => {

              if(chat.key_negocio === ("idNegocio"+this.$route.query.id)){

                this.seleccionado = this.chat_pool.indexOf(chat)

                  this.mensajesRef = this.$fire.database.ref("chatMessages")
                  .child(this.chat_pool[this.chat_pool.indexOf(chat)].chat)
                this.$store.commit("setUsuarioChatActual", this.chat_pool[this.chat_pool.indexOf(chat)])

              }

            })

          }
          else{
            this.mensajesRef = this.$fire.database.ref("chatMessages")
              .child(this.chat_pool[0].chat)
            this.$store.commit("setUsuarioChatActual", this.chat_pool[0])
          }

          this.$store.commit('setHideMessageField', false)
          this.ObtenerMensajes()
        }
        else{
          this.$store.commit('setHideMessageField', true)
        }


      }, (errorObject) => {
        console.log('La lectura en la DB fallo: ' + errorObject.name);
      });

    }

  }

}

</script>
