<template>

  <v-container fluid>

    <v-app-bar
      fixed
      app
      flat
      color="primary"
      outlined
    >

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

      <v-avatar size="60">
        <v-img src="/logo-no-texto.png"
               width="100"
               height="100"
               contain
               class="mr-2"
        />
      </v-avatar>
      <v-toolbar-title v-text="'Historial de Reservaciones'" />
    </v-app-bar>

    <v-row>
      <v-col>

        <v-sheet height="64">
          <v-toolbar
            flat
          >
            <v-btn
              outlined
              class="mr-4"
              color="grey darken-2"
              @click="hoy"
            >
              <v-icon left>fa fa-calendar-day</v-icon>
              Hoy
            </v-btn>
            <v-btn
              fab
              text
              small
              color="grey darken-2"
              @click="previo"
            >
              <v-icon small>
                fa fa-chevron-left
              </v-icon>
            </v-btn>
            <v-btn
              fab
              text
              small
              color="grey darken-2"
              @click="siguiente"
            >
              <v-icon small>
                fa fa-chevron-right
              </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title.charAt(0).toUpperCase() + $refs.calendar.title.substring(1) }}
            </v-toolbar-title>
            <v-spacer />
            <v-menu
              bottom
              right
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  outlined
                  color="grey darken-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon left>
                    {{ tipos.iconos[tipos.seleccionado] }}
                  </v-icon>
                  <span>{{ tipos.listado[tipos.seleccionado] }}</span>
                  <v-icon right>
                    mdi-menu-down
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="tipos.seleccionado = 'day'">
                  <v-list-item-content>
                    <v-list-item-title>Día</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="tipos.seleccionado = 'week'">
                  <v-list-item-title>Semana</v-list-item-title>
                </v-list-item>
                <v-list-item @click="tipos.seleccionado = 'month'">
                  <v-list-item-title>Mes</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>

        <v-sheet>
          <v-calendar
            v-model="focus"
            ref="calendar"
            :type="tipos.seleccionado"
            :now="today"
            :events="reservaciones"
            @click:more="viewDay"
            @click:date="viewDay"
            color="secondary"
            event-color="secondary"
            class="text-wrap"
          />
        </v-sheet>
      </v-col>
    </v-row>

  </v-container>

</template>

<script>

  export default {

    mounted() {
      this.$refs.calendar.scrollToTime('08:00')
      this.ObtenerReservaciones()
    },

    layout: 'empty',

    computed: {

      today() { this.$moment() }

    },

    data: () => ({
      focus: '',

      tipos: {
        seleccionado: 'month',
        listado: {
          month: 'Mes',
          week: 'Semana',
          day: 'Día'
        },
        iconos: {
          month: 'fa fa-calendar',
          week: 'fa fa-calendar-week',
          day: 'fa fa-calendar-day'
        },
      },

      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],

      reservaciones: [],

      negocios: []

    }),

    methods: {

      async ObtenerReservaciones(){

        let params = {

          usuarioId: JSON.parse(localStorage.getItem('usuario')).id

        }

        await this.$api.post("/reservacion/usuario", params).then( data => {

          data.forEach(reserva => {

            reserva.start = reserva.fechaInicio ? (reserva.fechaInicio).split("T")[0] + " " + reserva.hora : "2021-10-14 07:30"
            reserva.end = reserva.fechaFinal ? (reserva.fechaFinal).split("T")[0] + " " + reserva.hora : "2021-10-15 07:30"

          })

          this.reservaciones = [...this.reservaciones, ...data]

          this.ObtenerNegocios()

        })


      },

      async ObtenerNegocios(){

        await this.$api.get('/negocios', {}).then( data => {

          this.reservaciones.forEach( reserva => {

            Object.keys(data).forEach(key => {

              data[key].forEach(negocio => {

                if(reserva.negocioId === negocio.id){
                  reserva.name = "Reservación en " + negocio.nombre + " (" + ((reserva.estado === 'p') ? "Pendiente" : "Confirmada") + ")"
                  this.$forceUpdate()
                }

              })

            })

          } )

        } )

      },

      hoy () {
        this.focus = ''
      },

      previo () {
        this.$refs.calendar.prev()
      },

      siguiente () {
        this.$refs.calendar.next()
      },

      viewDay ({ date }) {

        this.focus = date

        this.tipos.seleccionado = 'day'

      },

      updateRange ({ start, end }) {
        const events = []
        const min = new Date(`${start.date}T00:00:00`)
        const max = new Date(`${end.date}T23:59:59`)
        const days = (max.getTime() - min.getTime()) / 86400000
        const eventCount = this.rnd(days, days + 20)
        for (let i = 0; i < eventCount; i++) {
          const allDay = this.rnd(0, 3) === 0
          const firstTimestamp = this.rnd(min.getTime(), max.getTime())
          const first = new Date(firstTimestamp - (firstTimestamp % 900000))
          const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
          const second = new Date(first.getTime() + secondTimestamp)
          events.push({
            name: this.names[this.rnd(0, this.names.length - 1)],
            start: first,
            end: second
          })
        }
        this.events = events
      },

      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },

    }

  }

</script>
