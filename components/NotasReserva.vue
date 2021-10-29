<template>

  <v-dialog max-width="620" v-model="dialogo"
            transition="fab-transition" persistent>

    <v-card style="border-radius:15px;" elevation="0" outlined class="pa-6">

      <v-toolbar elevation="0" dense color="transparent" class="hidden-sm-and-down">
        <v-spacer/>
        <h2>Notas de la Reserva</h2>
        <v-spacer/>
        <v-btn icon @click="CerrarDialogo">
          <v-icon>fa fa-times</v-icon>
        </v-btn>
      </v-toolbar>

      <v-toolbar elevation="0" dense color="transparent" class="hidden-md-and-up">
        <v-spacer/>
        <h3>Notas de la Reserva</h3>
        <v-spacer/>
        <v-btn icon @click="CerrarDialogo">
          <v-icon>fa fa-times</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="pa-6">

        <v-card outlined style="border-radius:15px;" elevation="0"
                class="mb-4"
        >
          <v-list-item>

            <v-list-item-icon>
              <v-icon color="#E1AF73">fa fa-comment</v-icon>
            </v-list-item-icon>

            <v-list-item-content>

              <span>

                {{ reserva.observacion }}

              </span>

            </v-list-item-content>

          </v-list-item>

        </v-card>

      </v-card-text>

    </v-card>

  </v-dialog>

</template>

<script>

export default {

  props: {

    value: Boolean,
    reserva: Object

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

      this.$emit("update:reserva", {})
      this.dialogo = false

    }

  }

}

</script>
