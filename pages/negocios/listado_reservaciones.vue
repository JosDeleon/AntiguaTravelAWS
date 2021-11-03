<template>

  <v-container fluid>

    <v-row>

      <v-col>

        <v-date-picker
          v-model="fecha_seleccionada"
          ref="fecha_evento"
          :min="new Date().getFullYear().toString()"
          locale="Es"
          :events="reservaciones"
          color="tertiary"
          event-color="primary darken-2"
          full-width
          class="mt-4"
        />


      </v-col>

    </v-row>

    <v-row class="my-6" justify="center">

      <v-col cols="12" xl="8" lg="8">

        <v-list
          subheader
          two-line
          style="border-radius:15px;"
        >

          <v-subheader inset class="black--text">
            <h3 class="hidden-sm-and-down"> Historial de Reservaciones </h3>
            <h4 class="hidden-md-and-up"> Historial de Reservaciones </h4>
          </v-subheader>

          <div v-for="(reserva, i) in reservas"
               :key="i"
          >

            <v-divider />

            <v-list-item>
              <v-list-item-avatar>
                <v-icon
                  class="secondary"
                  dark
                >
                  fas fa-calendar-day
                </v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="text-wrap black--text">
                  Reserva de {{ reserva.usuario }}
                  <v-tooltip bottom v-if="reserva.estado !== 'p'">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon :color="reserva.estado === 'a' ? 'green' : 'error'" small>
                          {{ reserva.estado === 'a' ? 'fa fa-check-circle' : 'fa fa-times-circle' }}
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>{{ reserva.estado === 'a' ? 'Confirmada' : 'Rechazada' }}</span>
                  </v-tooltip>
                </v-list-item-title>
                <v-list-item-subtitle class="text-wrap mt-n2" v-text="'Solicitó una reservación en ' + reserva.negocio" />
                <v-list-item-subtitle class="text-wrap" v-if="reserva.fechaInicio !== null && reserva.fechaFinal !== null">
                  Del {{ $moment.utc((reserva.fechaInicio).split("T")[0],"YYYY-MM-DD").format("L") }} al
                  {{ $moment.utc((reserva.fechaFinal).split("T")[0],"YYYY-MM-DD").format("L") }} — {{ $moment(reserva.hora, "HH:mm:ss").format('h:mm a') }}
                </v-list-item-subtitle>
                <v-list-item-subtitle class="text-wrap" v-if="reserva.fechaInicio !== null && reserva.fechaFinal === null">
                  Fecha: {{ (reserva.fechaInicio).split("T")[0] }} — {{ $moment(reserva.hora, "HH:mm:ss").format('h:mm a') }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      v-bind="attrs"
                      v-on="on"
                      color="blue-grey"
                      @click="MostrarNotasReserva(reserva)">
                      <v-icon>fa fa-edit</v-icon>
                    </v-btn>
                  </template>
                  <span>Notas de la Reserva</span>
                </v-tooltip>
              </v-list-item-action>

              <v-list-item-action class="mx-0" v-if="reserva.estado === 'p'">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      v-bind="attrs"
                      v-on="on"
                      color="green"
                      @click="ConfirmarReserva(reserva)">
                      <v-icon>fa fa-check-circle</v-icon>
                    </v-btn>
                  </template>
                  <span>Confirmar Reserva</span>
                </v-tooltip>
              </v-list-item-action>

              <v-list-item-action class="mx-0" v-if="reserva.estado === 'p'">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      v-bind="attrs"
                      v-on="on"
                      color="red"
                      @click="RechazarReserva(reserva)">
                      <v-icon>fa fa-times-circle</v-icon>
                    </v-btn>
                  </template>
                  <span>Rechazar Reserva</span>
                </v-tooltip>
              </v-list-item-action>

            </v-list-item>

          </div>

          <v-divider />

          <v-list-item v-if="reservas && reservas.length === 0">

            <v-list-item-content>

              <v-alert
                type="info"
                prominent
                color="complementario"
              >
                Aún no se han solicitado reservaciones en la fecha seleccionada
              </v-alert>

            </v-list-item-content>

          </v-list-item>

        </v-list>

      </v-col>

    </v-row>

    <NotasReserva v-model="dialogos.notas" :reserva.sync="reserva_seleccionada" />

  </v-container>

</template>

<script>

export default {

  mounted() {
    this.$store.commit('setRutaActual', 'Reservaciones Pendientes')
    this.ObtenerAuth()
  },

  layout: 'admin_negocio',

  computed: {

    today() { this.$moment() },

    reservas(){

      let reservations = []

      if(this.listado_reservaciones && this.listado_reservaciones.length > 0) {

        this.listado_reservaciones.forEach(reservacion => {

          let start = reservacion.fechaInicio ? (reservacion.fechaInicio).split("T")[0] : ""
          let end = reservacion.fechaFinal ? (reservacion.fechaFinal).split("T")[0] : ""

          if (start === this.fecha_seleccionada || end === this.fecha_seleccionada) {

            reservations.push(reservacion)

          }

        })

      }

      return reservations

    }

  },

  data: () => ({

    dialogos: {

      notas: false

    },

    fecha_seleccionada: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),

    reserva_seleccionada: {},

    reservaciones: [],

    listado_reservaciones: [],

    negocios: [],

    auth: {}

  }),

  methods: {

    async ObtenerAuth(){

      await this.$api.post("/usuario/info",
        { id: JSON.parse(localStorage.getItem('usuario')).id }).then(data => {

        this.auth = data
        this.ObtenerNegocios()

      })

    },

    async ObtenerNegocios(){

      let params = {
        usuarioId: JSON.parse(localStorage.getItem('usuario')).id
      }

      await this.$api.post("/negocios/usuario", params).then(data => {

        this.negocios = data
        this.ObtenerReservaciones()

      })

    },

    ObtenerReservaciones(){

      this.listado_reservaciones = []

      this.negocios.forEach(async negocio => {

        let params = {

          negocioId: negocio.id

        }

        await this.$api.post("/reservacion/negocio", params).then( data => {

          data.forEach(reserva => {

            reserva.negocio = negocio.nombre
            reserva.usuario = this.auth.nombre

            let start = reserva.fechaInicio ? (reserva.fechaInicio).split("T")[0] : "2021-10-14"
            let end = reserva.fechaFinal ? (reserva.fechaFinal).split("T")[0] : "2021-10-15"

            this.reservaciones.push(start)
            this.reservaciones.push(end)
            this.$forceUpdate()

          })

          this.listado_reservaciones = [...this.listado_reservaciones, ...data]

        })

      })


    },

    ConfirmarReserva(reserva){

      this.$alert.confirm('¿Estás seguro que deseas aceptar confirmar esta reserva?',
        'Confirmar Reserva').then(async () => {

          let params = {

            id: reserva.id,
            estado: "a"

          }

          this.$api.put("/reservacion", params).then(data => {

            this.$alert.exito("La reserva fue confirmada exitosamente", "Reserva Confirmada")
            this.ObtenerReservaciones()

          })

      });

    },

    RechazarReserva(reserva){

      this.$alert.confirm('¿Estás seguro que deseas aceptar rechazar esta reserva?',
        'Rechazar Reserva').then(async () => {

        let params = {

          id: reserva.id,
          estado: "r"

        }

        this.$api.put("/reservacion", params).then(data => {

          this.$alert.exito("La reserva fue rechazada exitosamente", "Reserva Rechazada")
          this.ObtenerReservaciones()

        })

      });

    },

    MostrarNotasReserva(reserva){

      this.reserva_seleccionada = Object.assign({}, reserva)
      this.dialogos.notas = true

    }

  }

}

</script>
