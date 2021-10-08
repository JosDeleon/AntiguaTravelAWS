<template>

  <v-container fluid>

    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      fixed
      app
      :width="($vuetify.breakpoint.name === 'sm' ||
      $vuetify.breakpoint.name === 'xs') ? 350 : 500"

    >
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

        <v-list-item-group v-model="chats.seleccionado" mandatory>

          <div v-for="(us_chat, i) in usuario_chats" :key="i">

            <v-list-item
              v-for="(llave, j) in chats.listado[us_chat] ? Object.keys(chats.listado[us_chat]) : []"
              :key="j"
              :value="llave"
              exact
              class="ma-2"
              link
            >
              <v-list-item-avatar>
                <v-img :src="ObtenerImagen(chats.listado[us_chat][llave])"
                />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  <h4>{{ chats.listado[us_chat][llave] ?
                    negocios.listado[chats.listado[us_chat][llave].negocio][chats.listado[us_chat][llave].key_negocio].nombreNegocio : '' }}
                  </h4>
                  <v-spacer />
                  <span>
                  {{
                      chats.listado[us_chat][llave].fechaHora ?
                        $moment(chats.listado[us_chat][llave].fechaHora, "L h:mm:ss a").fromNow() : null
                    }}
                </span>
                </v-list-item-title>
                <v-list-item-subtitle v-text="chats.listado[us_chat][llave] &&
                chats.listado[us_chat][llave].ultimoMensaje !== '' ?
                chats.listado[us_chat][llave].ultimoMensaje : 'Aún no hay mensajes en esta conversación'" />
              </v-list-item-content>
            </v-list-item>

          </div>

        </v-list-item-group>

      </v-list>

    </v-navigation-drawer>

    <v-app-bar
      fixed
      app
      flat
      color="white"
      outlined
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="" />
    </v-app-bar>

    {{$store.state.usuarioChatActual}}

    <v-list-item-group>
      <v-list-item
        v-for="(idMensaje, i) in mensajes.ids"
        :key="i"
        exact
        class="ma-2"
        link
      >
        <v-list-item-avatar v-if="mensajes.listado[idMensaje].enviadoPor === idAuth">
          <v-img :src="'https://www.timandorra.com/wp-content/uploads/2016/11/Imagen-no-disponible-282x300.png'" />
        </v-list-item-avatar>
        <v-list-item-content :class="mensajes.listado[idMensaje].enviadoPor !== idAuth ?
                                     'text-right align-self-start' : null"
                             color="white"
        >
          <v-list-item-title v-text="'Fernando Sagastume'" />
          <v-list-item-subtitle v-text="mensajes.listado[idMensaje].mensaje" />
        </v-list-item-content>
        <v-list-item-avatar v-if="mensajes.listado[idMensaje].enviadoPor !== idAuth">
          <v-img :src="'https://www.timandorra.com/wp-content/uploads/2016/11/Imagen-no-disponible-282x300.png'" />
        </v-list-item-avatar>
      </v-list-item>
    </v-list-item-group>

  </v-container>

</template>

<script>

import * as Axios from "axios";
import firebase from 'firebase'

export default {

  mounted() {
    this.ObtenerChats()
  },

  layout: 'chat',

  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      usuarios: {
        listado: {},
        seleccionado: {}
      },
      negocios: {
        listado: {}
      },
      chats: {
        listado: {},
        seleccionado: ''
      },
      usuario_chats: [],
      mensajes: {
        ids: [],
        listado: {}
      },
      msjRef: null,
      chatsRef: null,
      idAuth: JSON.parse(sessionStorage.getItem('usuario')).id
    }
  },

  computed: {

    CurrentChatListener(){
      if(this.msjRef){
        this.msjRef.on('value', (snapshot) => {
          if(snapshot.val()){
            this.mensajes.ids = Object.keys(snapshot.val())
            this.mensajes.listado = snapshot.val()
          }
        }, (errorObject) => {
          console.log('The read failed: ' + errorObject.name);
        });
      }
    },

    ChatsListener(){
      if(this.chatsRef){
        this.chatsRef.on('value', (snapshot) => {
          this.chats.listado = snapshot.val()
        }, (errorObject) => {
          console.log('The read failed: ' + errorObject.name);
        });
      }
    }

  },


  methods: {

    async ObtenerChats(){

     this.chatsRef = this.$fire.database.ref("Chats")
     let id = JSON.parse(sessionStorage.getItem('usuario')).id
     const userChatsRef = this.$fire.database.ref("userChats/id"+id)

     this.ChatsListener

      let negociosRef = this.$fire.database.ref("Negocios")

      Axios.get(negociosRef.toString() + '.json').then(response => {
        this.negocios.listado = response.data
      })

     Axios.get(userChatsRef.toString() + '.json').then(response => {
       if(response.data){
         this.usuario_chats = Object.keys(response.data)
         let chat_0 = this.usuario_chats[0]
         let chatKeys = Object.keys(this.chats.listado)
         this.chats.seleccionado = chatKeys[0]

         let chat = Object.assign({}, this.chats.listado[chat_0][this.chats.seleccionado])
         chat.id = this.chats.seleccionado
         this.$store.commit("setUsuarioChatActual", this.chats.listado[chat_0][chatKeys[0]])

         this.msjRef = this.$fire.database.ref("chatMessages/"+this.chats.seleccionado)
       }

       this.CurrentChatListener

     })

     const usersRef = this.$fire.database.ref("Users")

     Axios.get(usersRef.toString() + '.json').then(response => {
       this.usuarios.listado = response.data
     })

   },

    ObtenerImagen(chat){

     if(this.negocios.listado[chat.negocio][chat.key_negocio] &&
       this.negocios.listado[chat.negocio][chat.key_negocio].image){
       return this.usuarios.listado[this.chats.listado[chat].negocio].image
     }
     else{
       return 'https://www.timandorra.com/wp-content/uploads/2016/11/Imagen-no-disponible-282x300.png'
     }

   },


  }

}

</script>
