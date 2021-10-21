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

      <v-col v-for="(imagen, i) in galeria" :key="i"
             cols="12" xl="2" lg="3" md="4" sm="6"
      >

        <v-img class="ma-1" :src="imagen" @click="index = i" min-height="300" min-width="300" max-width="500" max-height="300" style="border-radius:10px;" />

      </v-col>

    </v-row>

    <vue-gallery-slideshow :images="galeria" :index="index" @close="index = null" />

  </v-container>

</template>

<script>

import VueGallerySlideshow from 'vue-gallery-slideshow';

export default {

  mounted() {

    this.ObtenerGaleria()

  },

  components: { VueGallerySlideshow },

  data() {
    return {

      index: null,

      galeria: []

    }
  },

  methods: {

    async ObtenerGaleria(){

      await this.$api.post("/galeria/negocio",{ negocioId:  +this.$route.query.id }).then( data => {

        data.forEach(imagen => {

          this.galeria.push(imagen.img)

        })

      })

    },

    RegresarPaginaNegocio(){

      this.$router.push({ path: '/servicios/hoteles/' + this.$route.query.id })

    }

  }

}

</script>
