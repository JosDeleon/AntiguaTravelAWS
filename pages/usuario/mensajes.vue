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
          <v-list-item
            v-for="(chat, i) in usuario_chats"
            :key="i"
            :value="chat"
            exact
            class="ma-2"
            link
          >
            <v-list-item-avatar>
              <v-img :src="ObtenerImagen(chat)"
              />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                <h4>{{ObtenerNombreNegocio(chat)}}</h4>
                <v-spacer />
                <span>
                  {{
                    chats.listado[chat] ?
                      $moment(chats.listado[chat].fechaHora, "L h:mm:ss a").fromNow() : null
                  }}
                </span>
              </v-list-item-title>
              <v-list-item-subtitle v-text="chats.listado[chat] && chats.listado[chat].ultimoMensaje !== '' ?
              chats.listado[chat].ultimoMensaje : 'Aún no hay mensajes en esta conversación'" />
            </v-list-item-content>
          </v-list-item>
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
      <v-toolbar-title v-text="ObtenerNombreNegocio(chats.seleccionado)" />
    </v-app-bar>

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
          this.mensajes.ids = Object.keys(snapshot.val())
          this.mensajes.listado = snapshot.val()
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

     Axios.get(userChatsRef.toString() + '.json').then(response => {

       this.usuario_chats = Object.keys(response.data)
       this.chats.seleccionado = this.usuario_chats[0]

       let chat = Object.assign({}, this.chats.listado[this.chats.seleccionado])
       chat.id = this.chats.seleccionado
       this.$store.commit("setUsuarioChatActual", chat)

       this.msjRef = this.$fire.database.ref("chatMessages/"+this.chats.seleccionado)
       this.CurrentChatListener

     })

     const usersRef = this.$fire.database.ref("Users")

     Axios.get(usersRef.toString() + '.json').then(response => {
       this.usuarios.listado = response.data
     })

   },

    ObtenerImagen(chat){

     if(this.chats.listado[chat] && this.usuarios.listado[this.chats.listado[chat].negocio] &&
        this.usuarios.listado[this.chats.listado[chat].negocio].image){
       return this.usuarios.listado[this.chats.listado[chat].negocio].image
     }
     else{
       return 'https://www.timandorra.com/wp-content/uploads/2016/11/Imagen-no-disponible-282x300.png'
     }

   },

    ObtenerNombreNegocio(chat){

      if(this.chats.listado[chat] && this.usuarios.listado[this.chats.listado[chat].negocio] &&
        this.usuarios.listado[this.chats.listado[chat].negocio].nombreNegocio){
        return this.usuarios.listado[this.chats.listado[chat].negocio].nombreNegocio
      }

    }


  }

}

</script>
