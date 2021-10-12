<template>

  <v-container fluid>

    <v-file-input
      v-model="imagen"
      color="black"
      label="Imagen del Producto"
      placeholder="Selecciona la imagen de tu producto"
      prepend-icon="fa fa-file-image"
      persistent-hint
      hint="Opcional"
      outlined
      dense
      accept="image/*"
      truncate-length="50"
      show-size
      counter
    >
      <template v-slot:selection="{ index, text }">
        <v-chip
          v-if="index < 2"
          color="secondary"
          dark
          label
          small
        >
          {{ text }}
        </v-chip>

        <span
          v-else-if="index === 2"
          class="text-overline grey--text text--darken-3 mx-2"
        >
                  +{{ productos.seleccionado.imagen.length - 2 }} Archivo(s)
                </span>
      </template>

    </v-file-input>

    <v-btn
      color="black"
      text
      @click="Guardar"
    >
      <v-icon left>fa fa-check</v-icon>
      Guardar
    </v-btn>

  </v-container>

</template>

<script>

export default {

  mounted() {



  },

  data(){

    return {

      imagen: null

    }

  },

  layout: 'empty',

  methods: {

    Guardar(){

      const imagenRef = this.$fire.storage.ref('usuario/id1').child("foto_perfil")

      imagenRef.put(this.imagen).then( response => {

        response.ref.getDownloadURL().then((downloadURL) => {

          console.log(downloadURL)

        })

      } )

    }

  }

}

</script>
