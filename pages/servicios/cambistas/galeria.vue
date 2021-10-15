<template>

  <v-container fluid>

    <v-btn
      color="secondary"
      @click="RegresarPaginaNegocio"
      outlined
      class="my-4 ml-1"
    >
      <v-icon left color="secondary">
        fa fa-arrow-left
      </v-icon>
      Regresar
    </v-btn>

    <v-row>

      <v-col v-for="(imagen, i) in imagenes" :key="i"
             cols="12" xl="2" lg="2" md="4" sm="4"
      >

        <v-img class="ma-1" :src="imagen" @click="index = i" max-width="400" max-height="400" style="border-radius:10px;" />

      </v-col>

    </v-row>

    <vue-gallery-slideshow :images="imagenes" :index="index" @close="index = null" />

  </v-container>

</template>

<script>

import VueGallerySlideshow from 'vue-gallery-slideshow';

export default {

  mounted() {
    //this.$route.query.id
  },

  components: { VueGallerySlideshow },

  data() {
    return {

      index: null,

      imagenes: [
        'https://placekitten.com/801/800',
        'https://placekitten.com/802/800',
        'https://placekitten.com/803/800',
        'https://placekitten.com/804/800',
        'https://placekitten.com/805/800',
        'https://placekitten.com/806/800',
        'https://placekitten.com/807/800',
        'https://placekitten.com/808/800',
        'https://placekitten.com/809/800',
        'https://placekitten.com/810/800'
      ]

    }
  },

  methods: {

    RegresarPaginaNegocio(){

      this.$router.push({ path: '/servicios/cambistas/' + this.$route.query.id })

    }

  }

}

</script>
