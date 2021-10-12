<template>

  <v-container fluid>

  </v-container>

</template>

<script>

export default {

  mounted() {
    this.$store.commit('setRutaActual', 'Inicio')
  },

  layout: 'admin_negocio',

  middleware: 'VerificarTieneNegocio',

  head(){
    return{
      titleTemplate: "Antigua Travel | Inicio"
    };
  },


  data(){
    return{

    }
  },

  methods: {
  }

}

</script>
