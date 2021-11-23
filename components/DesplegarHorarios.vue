<template>

  <v-dialog max-width="400" v-model="dialogo"
            transition="fab-transition" persistent>

    <v-card style="border-radius:15px;" elevation="0" outlined class="pa-6">

      <v-toolbar elevation="0" dense color="transparent" class="hidden-sm-and-down">
        <v-spacer/>
        <h2>Horarios</h2>
        <v-spacer/>
        <v-btn icon @click="CerrarDialogo">
          <v-icon>fa fa-times</v-icon>
        </v-btn>
      </v-toolbar>

      <v-toolbar elevation="0" dense color="transparent" class="hidden-md-and-up">
        <v-spacer/>
        <h3>Horarios</h3>
        <v-spacer/>
        <v-btn icon @click="CerrarDialogo">
          <v-icon>fa fa-times</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="pa-4">

        <v-row justify="center" align="center">

          <v-list>

            <v-list-item v-for="horario in negocio.horarios" :key="horario.dia">
              <v-list-item-content>
                <v-list-item-title :class="listado_dias[$moment().format('dddd')] === horario.dia ? 'font-weight-bold text-decoration-underline' : null">
                  {{ dias[horario.dia] }}: {{ $moment(horario.abre, 'HH:mm:ss').format('h:mm a') }} &mdash;
                  {{ $moment(horario.cierra, 'HH:mm:ss').format('h:mm a') }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

          </v-list>

        </v-row>

      </v-card-text>

    </v-card>

  </v-dialog>

</template>

<script>

export default {

  props: {

    value: Boolean,
    negocio: Object

  },

  data: () => ({

    dias: {
      1: "Lunes",
      2: "Martes",
      3: "Miercoles",
      4: "Jueves",
      5: "Viernes",
      6: "Sabado",
      7: "Domingo"
    },

    listado_dias: {
      lunes: 1,
      martes: 2,
      miercoles: 3,
      jueves: 4,
      viernes: 5,
      sabado: 6,
      domingo: 7
    }

  }),

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

    CerrarDialogo() {

      this.$emit("update:negocio", {})
      this.dialogo = false

    }

  }

}

</script>
