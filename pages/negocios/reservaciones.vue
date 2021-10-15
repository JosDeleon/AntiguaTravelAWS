<template>

  <v-container fluid>

  </v-container>

</template>

<script>

  export default {

    mounted() {

      this.$store.commit('setRutaActual', 'Reservaciones')

    },

    layout: 'admin_negocio'

  }

</script>
