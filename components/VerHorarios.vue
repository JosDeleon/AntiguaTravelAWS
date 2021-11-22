<template>

  <v-dialog max-width="620" v-model="dialogo"
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

        <v-form ref="frmHorarios">

          <v-row>

            <div v-for="(dia, i) in dias_semana" :key="i">

              <v-row justify="center" align="center">

                <v-col cols="2" xl="1" lg="1" md="1" sm="1">

                  <v-tooltip bottom v-if="horarios.find(h => h.dia === dia.codigo)">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="error"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        class="mb-6"
                        icon
                        @click="EliminarHorario(horarios.find(h => h.dia === dia.codigo))"
                      >
                        <v-icon
                          color="error"
                        >
                          fas fa-trash
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>Eliminar Horario</span>
                  </v-tooltip>

                </v-col>

                <v-col cols="10" xl="5" lg="5" md="5" sm="11">

                  <v-text-field
                    outlined
                    :value="dia.dia"
                    label="Día"
                    color="black"
                    prepend-inner-icon="fa fa-calendar-day"
                    style="border-radius:10px;"
                    readonly
                  />

                </v-col>

                <v-col cols="12" xl="6" lg="6" md="6">

                  <v-text-field
                    outlined
                    :value="$moment(horarios.find(h => h.dia === dia.codigo).abre, 'HH:mm:ss').format('h:mm a') +
                    ' - ' + $moment(horarios.find(h => h.dia === dia.codigo).cierra, 'HH:mm:ss').format('h:mm a')"
                    label="Horario"
                    color="black"
                    prepend-inner-icon="fa fa-calendar-day"
                    style="border-radius:10px; cursor: pointer;"
                    v-if="BuscarHorario(dia)"
                    @click="MostrarTimePicker(dia, true)"
                    readonly
                  />

                  <v-text-field
                    outlined
                    :value="'Día cerrado'"
                    label="Horario"
                    color="black"
                    prepend-inner-icon="fa fa-clock"
                    style="border-radius:10px; cursor: pointer;"
                    readonly
                    v-else
                    @click="MostrarTimePicker(dia, false)"
                  />

                </v-col>

              </v-row>

            </div>

          </v-row>

        </v-form>

      </v-card-text>

      <v-dialog max-width="900" v-model="dialogos.time_picker"
                transition="fab-transition" persistent>

        <v-card style="border-radius:15px;" elevation="0" outlined class="pa-6">

          <v-toolbar elevation="0" dense color="transparent" class="hidden-sm-and-down">
            <v-spacer/>
            <h2>Seleccionar horario</h2>
            <v-spacer/>
            <v-btn icon @click="CerrarTimePicker">
              <v-icon>fa fa-times</v-icon>
            </v-btn>
          </v-toolbar>

          <v-toolbar elevation="0" dense color="transparent" class="hidden-md-and-up">
            <v-spacer/>
            <h3>Seleccionar horario</h3>
            <v-spacer/>
            <v-btn icon @click="CerrarTimePicker">
              <v-icon>fa fa-times</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card-text class="pa-4">

            <v-row
              justify="space-around"
              align="center"
            >

              <v-col style="width: 350px; flex: 0 1 auto;">

                <h2 class="mb-4 black--text">Hora de abrir</h2>

                <v-time-picker
                  v-model="horario.abre"
                  :max="horario.cierra"
                  color="secondary"
                />

              </v-col>
              <v-col style="width: 350px; flex: 0 1 auto;">

                <h2 class="mb-4 black--text">Hora de cerrar</h2>

                <v-time-picker
                  v-model="horario.cierra"
                  :min="horario.abre"
                  color="secondary"
                />

              </v-col>

            </v-row>

          </v-card-text>

          <v-card-actions>

            <v-spacer />

            <v-btn color="secondary" light type="submit"
                   style="border-radius:7px;" elevation="0" class="mt-2"
                   x-large @click="ActualizarHorario" v-if="horario.id > 0"
            >
              <v-icon left color="white" size="30">
                fa fa-check
              </v-icon>
              <div class="white--text">
                Actualizar
              </div>
            </v-btn>

            <v-btn color="secondary" light type="submit"
                   style="border-radius:7px;" elevation="0" class="mt-2"
                   x-large @click="GuardarHorario" v-else
                   :disabled="!horario.abre || !horario.cierra"
            >
              <v-icon left color="white" size="30">
                fa fa-check
              </v-icon>
              <div class="white--text">
                Guardar
              </div>
            </v-btn>

            <v-spacer />

          </v-card-actions>

        </v-card>


      </v-dialog>

    </v-card>

  </v-dialog>

</template>

<script>

export default {

  props: {

    value: Boolean,
    negocio: Object,
    horarios: Array

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

  data: () => ({

    dialogos: {

      time_picker: false

    },

    dias_semana: [
      { dia: "Lunes", codigo: 1 },
      { dia: "Martes", codigo: 2 },
      { dia: "Miercoles", codigo: 3 },
      { dia: "Jueves", codigo: 4 },
      { dia: "Viernes", codigo: 5 },
      { dia: "Sabado", codigo: 6 },
      { dia: "Domingo", codigo: 7 }
    ],
    horario: {}

  }),

  methods: {

    CerrarDialogo(){

      this.$emit("update:negocio", {})
      this.$emit("update:horarios", [])
      this.dialogo = false

    },

    async ObtenerHorarios(){

      let params = {
        negocioId: this.negocio.id
      }

      await this.$api.post("/horario/negocio", params).then(data => {

        this.$emit("update:horarios", data)
        this.$forceUpdate()

      })

    },

    async GuardarHorario(){

      let params = {

        dia: this.horario.dia,
        abre: this.horario.abre,
        cierra: this.horario.cierra,
        negocioId: this.negocio.id

      }

      await this.$api.post("/horario", params).then(data => {

        this.ObtenerHorarios()
        this.$alert.exito("El horario fue guardado exitosamente", "Horario Guardado")
        this.CerrarTimePicker()

      }).catch(data => {
        console.error(data)
        this.$alert.error('Ocurrió un error en el ingreso, vuelve a intentarlo', 'Error Interno')
      })

    },

    async ActualizarHorario(){

      let params = {

        abre: this.horario.abre,
        cierra: this.horario.cierra,
        id: this.horario.id

      }

      await this.$api.put("/horario", params).then(data => {

        this.ObtenerHorarios()
        this.$alert.exito("El horario fue actualizado exitosamente", "Horario Actualizado")
        this.CerrarTimePicker()

      }).catch(data => {
        console.error(data)
        this.$alert.error('Ocurrió un error en el ingreso, vuelve a intentarlo', 'Error Interno')
      })

    },

    async EliminarHorario(horario){

      let params = {
        id: horario.id
      }

      this.$alert.confirm('¿Estás seguro que deseas eliminar este horario?',
        'Eliminar Horario').then(async () => {

          this.$api.delete("/horario/dia", params).then(data => {

            this.ObtenerHorarios()
            this.$alert.exito('El horario fue eliminado exitosamente', 'Horario Eliminado')

          })

      })

    },

    MostrarTimePicker(dia, existe_horario){

      if(existe_horario){
        this.DevolverHorario(dia)
        this.dialogos.time_picker = true
      }
      else{
        this.horario.dia = dia.codigo
        this.dialogos.time_picker = true
      }

    },

    CerrarTimePicker(){

      this.dialogos.time_picker = false
      this.horario = {}

    },

    BuscarHorario(dia){

      let found = false

      this.horarios.forEach(horario => {

        if(horario.dia === dia.codigo){
          found = true
        }

      })

      return found

    },

    DevolverHorario(dia){

      this.horarios.forEach(horario => {

        if(horario.dia === dia.codigo){
          this.horario = horario
        }

      })

    }

  }

}

</script>
