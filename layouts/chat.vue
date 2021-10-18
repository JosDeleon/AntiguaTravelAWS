<template>
  <v-app style="background-color: #f5f5f5;">
    <v-main>
      <nuxt />
    </v-main>
    <template>
      <v-footer inset app v-if="!$store.state.hideMessageField">
        <v-row>
          <v-col cols="12">

            <v-text-field
              v-model="mensaje"
              filled
              placeholder="Mensaje"
              type="text"
              color="secondary"
              @keyup.enter.native="EnviarMensaje"
              clearable
              clear-icon="fa fa-times-circle"
            >

              <template v-slot:prepend>

                <v-tooltip top v-if="VerificarUsuarioAuth">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary darken-2"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      icon
                      @click="EnviarFormularioReserva"
                    >
                      <v-icon color="primary darken-2"> fa fa-calendar-week </v-icon>
                    </v-btn>
                  </template>
                  <span>Enviar Formulario de Reservación</span>
                </v-tooltip>

              </template>

              <template v-slot:append-outer>
                <v-btn icon @click="EnviarMensaje">
                  <v-icon color="secondary">
                    mdi-send
                  </v-icon>
                </v-btn>
              </template>

            </v-text-field>

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

  computed: {

    VerificarUsuarioAuth(){

      return 'id'+JSON.parse(sessionStorage.getItem('usuario')).id === this.$store.state.usuarioChatActual.negocio

    },

  },

  methods: {

    async EnviarFormularioReserva(){

      const mensajeRef = this.$fire.database.ref('chatMessages')
        .child(this.$store.state.usuarioChatActual.chat)

      const chatRef = this.$fire.database.ref('Chats')
        .child(this.$store.state.usuarioChatActual.chat)
        .child(this.$store.state.usuarioChatActual.idChat)

      let mensaje = {
        mensaje: "formReservacion",
        fecha: this.$moment().format('L').toString(),
        hora: this.$moment().format('h:mm:ss a').toString(),
        enviadoPor: "id"+JSON.parse(sessionStorage.getItem('usuario')).id
      }

      let chat = {
        key_negocio: this.$store.state.usuarioChatActual.key_negocio,
        negocio: this.$store.state.usuarioChatActual.negocio,
        ultimoMensaje: "formReservacion",
        ultimoEnviadoPor: "id"+JSON.parse(sessionStorage.getItem('usuario')).id,
        usuario: this.$store.state.usuarioChatActual.usuario,
        fechaHora: this.$moment().format('L h:mm:ss a').toString()
      }

      await chatRef.set(chat)
      await mensajeRef.push(mensaje)

      let changeStore = Object.assign({}, this.$store.state.usuarioChatActual)
      changeStore.ultimoMensaje = "formReservacion"
      changeStore.ultimoMensaje = this.$moment().format('L h:mm:ss a').toString()
      this.$store.commit("setUsuarioChatActual", changeStore)

    },

    async EnviarMensaje(){

      if(this.mensaje === null)
        this.mensaje = ''

      if(this.mensaje.trim() !== ''){

        const mensajeRef = this.$fire.database.ref('chatMessages')
          .child(this.$store.state.usuarioChatActual.chat)

        const chatRef = this.$fire.database.ref('Chats')
          .child(this.$store.state.usuarioChatActual.chat)
          .child(this.$store.state.usuarioChatActual.idChat)

        let mensaje = {
          mensaje: this.mensaje,
          fecha: this.$moment().format('L').toString(),
          hora: this.$moment().format('h:mm:ss a').toString(),
          enviadoPor: "id"+JSON.parse(sessionStorage.getItem('usuario')).id
        }

        let chat = {
          key_negocio: this.$store.state.usuarioChatActual.key_negocio,
          negocio: this.$store.state.usuarioChatActual.negocio,
          ultimoMensaje: this.mensaje,
          ultimoEnviadoPor: "id"+JSON.parse(sessionStorage.getItem('usuario')).id,
          usuario: this.$store.state.usuarioChatActual.usuario,
          fechaHora: this.$moment().format('L h:mm:ss a').toString()
        }

        await chatRef.set(chat)
        await mensajeRef.push(mensaje)

        let changeStore = Object.assign({}, this.$store.state.usuarioChatActual)
        changeStore.ultimoMensaje = this.mensaje
        changeStore.ultimoMensaje = this.$moment().format('L h:mm:ss a').toString()
        this.$store.commit("setUsuarioChatActual", changeStore)

        this.mensaje = ''

      }

    }

  }

}
</script>
