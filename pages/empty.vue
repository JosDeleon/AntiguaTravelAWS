<template>

  <v-container fluid>

    <v-btn icon @click="dialogo = true">
      <v-icon>
        {{ icono && icono !== '' ? icono : 'fa fa-info' }}
      </v-icon>
    </v-btn>

    <v-text-field
      outlined
      dense
      v-model="icono"
      :rules="[ v => v && v.length > 0 || 'El icono es obligatorio' ]"
      label="Icono"
      color="black"
      prepend-icon="fa fa-icons"
      @click="dialogo = true"
    >

      <template v-slot:append>

        <v-icon>
          {{ icono }}
        </v-icon>

      </template>

    </v-text-field>

  </v-container>

</template>

<script>

export default {

  mounted() {



  },

  data(){

    return {

      icono: '',
      dialogo: false

    }

  },

  layout: 'empty',

  methods: {

  }

}

</script>
