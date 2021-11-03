<template>

  <v-dialog max-width="700" v-model="dialogo"
            transition="fab-transition" persistent>

    <v-card style="border-radius:15px;" elevation="0" outlined class="pa-6">

      <v-toolbar elevation="0" dense color="transparent" class="hidden-sm-and-down">
        <v-spacer/>
        <h2> Nueva Valoración </h2>
        <v-spacer/>
        <v-btn icon @click.stop="CerrarDialogo">
          <v-icon>fa fa-times</v-icon>
        </v-btn>
      </v-toolbar>

      <v-toolbar elevation="0" dense color="transparent" class="hidden-md-and-up">
        <v-spacer/>
        <h4> Nueva Valoración </h4>
        <v-spacer/>
        <v-btn icon @click="CerrarDialogo">
          <v-icon>fa fa-times</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="pa-6">

        <v-form ref="frmValoracion">

          <v-row class="mb-2">

            <v-col cols="12">
              <h4> Indica tu calificación para este guía de turismo </h4>
            </v-col>

            <v-col cols="12" class="mt-n4 ml-n1">

              <v-rating
                v-model="rating"

                color="secondary"
                dense

                hover
                size="35"
              />

            </v-col>

          </v-row>

          <v-text-field
            outlined
            dense
            v-model="valoracion.titulo"
            :rules="[ v => v && v.length > 0 || 'El título es obligatorio' ]"
            label="Título de tu opinión"
            prepend-icon="fa fa-heading"
            color="black"
          />

          <v-textarea
            outlined
            dense
            no-resize
            clearable
            clear-icon="fa fa-times-circle"
            v-model="valoracion.comentario"
            :rules="[ v => v && v.length > 0 || 'La opinión es obligatoria' ]"
            rows="3"
            label="Danos tu opinión"
            prepend-icon="fa fa-comment"
            color="black"
          />

        </v-form>

      </v-card-text>

      <v-card-actions>

        <v-spacer />

        <v-btn
          color="primary"
          depressed
          @click="EnviarOpinion"
        >
          <div style="color: rgba(0,0,0,0.8);">
            Enviar Opinión
          </div>
        </v-btn>

      </v-card-actions>

    </v-card>

  </v-dialog>

</template>

<script>

  export default {

    props: {
      value: Boolean,
      valoracion: Object,
      negocioId: Number
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

    data: () => {

      return {

        rating: 0

      }

    },

    methods: {

      EnviarOpinion(){

        let login = true

        if(!JSON.parse(localStorage.getItem('usuario'))){
          this.$alert.warning("No puedes enviar opiniones hasta que inicies sesión",
            "Valoración Fallida")
          login = false
          return
        }

        let negocioFound = {}
        negocioFound.id = 0

        if(this.$store.state.negocios && this.$store.state.negocios.length > 0){
          negocioFound = this.$store.state.negocios.find( n => n.id === this.negocioId );
        }

        if(login) {

          if (negocioFound && negocioFound.id > 0) {
            this.$alert.warning("No puedes enviar opiniones a tu propio negocio",
              "Valoración Fallida")
          }
          else{

            if(this.$refs.frmValoracion.validate()){

              let params = {
                puntuacion: this.rating,
                titulo : this.valoracion.titulo,
                comentario : this.valoracion.comentario,
                usuarioId : JSON.parse(localStorage.getItem('usuario')).id,
                negocioId : this.negocioId
              }

              this.$api.post("/valoracion", params).then(data => {

                this.$alert.exito("Tu opinión fue enviada exitosamente", "Opinión Enviada")
                this.$emit('refresh')
                this.CerrarDialogo()

              })

            }

          }

        }

      },

      CerrarDialogo(){

        this.$emit('update:puntuacion', 0)
        this.$refs.frmValoracion?.resetValidation()
        this.dialogo = false

      }

    }

  }

</script>
