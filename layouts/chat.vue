<template>
  <v-app style="background-color: #f5f5f5;">
    <v-main>
      <nuxt />
    </v-main>
    <template>
      <v-footer inset app>
        <v-row>
          <v-col cols="12">

            <v-text-field
              v-model="mensaje"
              append-outer-icon="mdi-send"
              filled
              placeholder="Mensaje"
              type="text"
              color="secondary"
              @keyup.enter.native="EnviarMensaje"
              clearable
              clear-icon="fa fa-times-circle"

            />

          </v-col>
        </v-row>
      </v-footer>
    </template>
  </v-app>
</template>

<script>
export default {

  data () {
    return {
      mensaje: ''
    }
  },

  methods: {

    async EnviarMensaje(){

      const mensajeRef = this.$fire.database.ref('chatMessages')
        .child(this.$store.state.usuarioChatActual.id)

      const chatRef = this.$fire.database.ref('Chats')
        .child(this.$store.state.usuarioChatActual.id)

      let mensaje = {
        mensaje: this.mensaje,
        fecha: this.$moment().format('L').toString(),
        hora: this.$moment().format('h:mm:ss a').toString(),
        enviadoPor: JSON.parse(sessionStorage.getItem('usuario')).id
      }

      let chat = Object.assign({}, this.$store.state.usuarioChatActual)
      chat.ultimoMensaje = this.mensaje
      chat.fechaHora = this.$moment().format('L').toString()+" "+this.$moment().format('h:mm:ss a').toString()
      delete chat['id']

      await chatRef.set(chat)
      await mensajeRef.push(mensaje)

      chat.id = this.$store.state.usuarioChatActual.id
      this.$store.commit("setUsuarioChatActual", chat)
      this.mensaje = ''

    }

  }

}
</script>
