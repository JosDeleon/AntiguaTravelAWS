<template>
    <v-app light>
        <v-main>
            <section>
                <v-parallax :src="imageLink.sub_main" height="800" class="welcomeImage">
                    <v-layout column align-center justify-center class="white--text">
                        <h1 class="white--text mb-2 display-1 text-xs-center" style="font-weight: 900; text-shadow: 3px 2px #000000">Bienvenido a la comunidad de
                            Antigua Travel, Comencemos...</h1>
                        <v-btn class="blue lighten-2 mt-5" dark large href="/">
                        Inicio
                        </v-btn>
                    </v-layout>
                </v-parallax>
            </section>
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: "App",
    data: function() {
        return {
            imageLink: {
                sub_main: "https://agn.gt/wp-content/uploads/2020/11/antigua-guatemala-inguat-e1605737679486.jpg"
            },
            subscribed: false
        };
    },
    layout : 'empty',
  
    methods: {
    },

    computed: {
        /*imgHeight: function() {
            var offset = 320;
            console.log("new image height is " + (this.pageHeight - offset));
            return this.pageHeight - offset;
        }*/
    },

    mounted: function() {
        /*this.$api.post('/verificacion', { tag : this.$route.query.tag }).then( response => {
            console.log(response);
        }).catch(err => console.log(err));*/
    }
};
</script>

<style scoped>

.welcomeImage{
    margin-top: 4%;
}
</style>
