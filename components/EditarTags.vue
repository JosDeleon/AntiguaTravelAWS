<template>

  <v-dialog max-width="620" v-model="dialogo"
            transition="fab-transition" persistent
  >

    <v-card style="border-radius:15px;" elevation="0" outlined class="pa-6" :loading="$store.state.loading">

      <template slot="progress">
        <v-overlay absolute class="d-flex flex-column text-center">
          <div>
            <v-progress-circular size="75" color="white" indeterminate>
              <span class="white--text">Cargando</span>
            </v-progress-circular>
          </div>
        </v-overlay>
      </template>

      <v-toolbar elevation="0" dense color="transparent" class="hidden-sm-and-down">
        <v-spacer/>
        <h2>Editar Tags</h2>
        <v-spacer/>
        <v-btn icon @click="CerrarDialogo">
          <v-icon>fa fa-times</v-icon>
        </v-btn>
      </v-toolbar>

      <v-toolbar elevation="0" dense color="transparent" class="hidden-md-and-up">
        <v-spacer/>
        <h3>Editar Tags</h3>
        <v-spacer/>
        <v-btn icon @click="CerrarDialogo">
          <v-icon>fa fa-times</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="pa-4">

        <v-chip-group column>
          <v-chip
            v-for="tag in tags"
            :key="tag.id"
            outlined
            label
            close
            close-icon="fa fa-times-circle"
            @click:close="EliminarTag(tag.id)"
          >
            <v-icon left color="amber darken-2">
              fa fa-tag
            </v-icon>
            {{ tag.tag }}
          </v-chip>
        </v-chip-group>

        <v-divider class="my-4" />

        <v-form ref="formaTags" @submit.prevent="">

          <v-combobox
            v-model="etiquetas"
            :filter="filter"
            :hide-no-data="!helpers.busqueda"
            :search-input.sync="helpers.busqueda"
            :items="lista_tags"
            hide-selected
            label="Escribe lo que mejor describa mejor tu negocio"
            :rules="[ v => !!v || 'Debes escribir al menos un tag' ]"
            multiple
            small-chips
            solo
            color="black"
            style="border-radius:10px;"
            class="elevation-0 mt-4"
          >

            <template v-slot:no-data>
              <v-list-item>
                <span class="subheading mr-2">Crear el tag </span>
                <v-chip
                  :color="`${helpers.colores[helpers.nonce - 1]} lighten-3`"
                  label
                  small
                >
                  {{ helpers.busqueda }}
                </v-chip>
              </v-list-item>
            </template>

            <template v-slot:selection="{ attrs, item, parent, selected }">
              <v-chip
                v-if="item === Object(item)"
                v-bind="attrs"
                text-color="black--text"
                :input-value="selected"
                label
                small
                outlined
              >
                <v-icon
                  small
                  left
                  color="amber darken-2"
                >
                  fa fa-tag
                </v-icon>
                <span class="pr-2">
                  {{ item.text }}
                </span>
                <v-icon
                  small
                  @click="parent.selectItem(item)"
                >
                  $delete
                </v-icon>
              </v-chip>
            </template>

            <template v-slot:item="{ index, item }">
              <v-chip
                :color="`${item.color} lighten-3`"
                dark
                label
                small
              >
                {{ item.text }}
              </v-chip>
            </template>

          </v-combobox>

          <v-layout justify-center>

            <v-btn
              color="secondary"
              depressed
              @click="GuardarTags"
              type="submit"
              :disabled="etiquetas && etiquetas.length === 0"
            >
              <v-icon left>
                fa fa-check
              </v-icon>
              Guardar Tags
            </v-btn>

          </v-layout>

        </v-form>

      </v-card-text>

    </v-card>

  </v-dialog>

</template>

<script>

export default {

  props: {

    value: Boolean,
    negocio: Object,
    tags: Array

  },

  computed: {

    dialogo: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }

  },

  watch: {
    etiquetas (val, prev) {

      if (val.length === prev.length) return

      this.etiquetas = val.map(v => {
        if (typeof v === 'string') {
          v = {
            text: v,
            color: this.helpers.colores[this.helpers.nonce - 1],
          }

          this.lista_tags.push(v)

          this.helpers.nonce++

          this.$forceUpdate()
        }

        return v
      })
    },
  },

  data: () => ({

    helpers: {
      colores: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
      nonce: 1,
      busqueda: null,
    },

    etiquetas: [],

    lista_tags: [
      { header: 'Escribe lo que mejor describa mejor tu negocio' },
    ]

  }),

  methods: {

    GuardarTags(){

      if(this.$refs.formaTags.validate()){

        this.$alert.confirm('¿Estás seguro que deseas agregar estas tags?',
          'Agregar Tags').then(async () => {

          for (const etiqueta of this.etiquetas) {

            let params = {

              negocioId: this.negocio.id,
              tag: etiqueta.text

            }

            await this.$api.post("/tags/insert", params).then(data => {

              this.ObtenerTags()

            })

          }

          this.$alert.exito("Las tags han sido agregadas exitosamente", "Tags Agregadas")
          this.etiquetas = []
          this.lista_tags = [ { header: 'Escribe lo que mejor describa mejor tu negocio' } ]

        })

      }

    },

    async ObtenerTags(){

      await this.$api.post("/tags/negocio", { negocioId: this.negocio.id }).then( data => {
        this.$emit("update:tags", data)
        this.$forceUpdate()
      })

    },

    async EliminarTag(id){

      this.$alert.confirm('¿Estás seguro que deseas eliminar esta tag?',
        'Eliminar Tag').then(async () => {

        await this.$api.delete("/tags", { id: id }).then(data => {

          this.$alert.exito("La tag ha sido eliminada exitosamente", "Tag Eliminada")
          this.ObtenerTags()

        })

      })

    },

    filter (item, queryText, itemText) {
      if (item.header) return false

      const hasValue = val => val != null ? val : ''

      const text = hasValue(itemText)
      const query = hasValue(queryText)

      return text.toString()
        .toLowerCase()
        .indexOf(query.toString().toLowerCase()) > -1
    },

    CerrarDialogo(){

      this.$emit("update:negocio", {})
      this.$emit("update:tags", [])
      this.etiquetas = []
      this.lista_tags = [ { header: 'Escribe lo que mejor describa mejor tu negocio' } ]
      this.dialogo = false

    }

  }

}

</script>
