<template>
    <v-row justify="center" align="center">
        <v-col cols="12" sm="10" md="10" lg="9" class="hidden-sm-and-down">
            <v-card style="border-radius:10px;">
                <v-img
                    min-height="800"
                    src="https://www.prensalibre.com/wp-content/uploads/2020/10/antigua-2.jpg"
                    lazy-src="https://www.prensalibre.com/wp-content/uploads/2020/10/antigua-2.jpg"
                    style="border-radius:10px;"
                >
                    <v-container>
                        <v-layout justify-center>
                            <v-card min-width="400" width="600" style="border-radius:10px;">
                                <v-card-text class="pa-4">
                                    <h2 class="mb-5 black--text"> Solicitud de Reservación </h2>

                                    <v-window>
                                        <v-window-item :value="1">
                                            <v-card-text class="pa-4">
                                                <h3 class="black--text mb-4">Indica la información general para tu reservación</h3>
                                                <v-form ref="formReservacion">
                                                    <v-text-field
                                                        label="Cantidad de personas"
                                                        color="black"
                                                        autocomplete="new-password"
                                                        outlined
                                                        type="number"
                                                        dense
                                                        v-model="reservacion.cantidad"
                                                        :rules="[ v => v && v.length > 0 || 'La cantidad de personas es obligatoria' ]"
                                                        prepend-icon="fa fa-users"
                                                    />

                                                    <v-textarea
                                                        outlined
                                                        dense
                                                        no-resize
                                                        clearable
                                                        clear-icon="fa fa-times-circle"
                                                        v-model="reservacion.observacion"
                                                        :rules="[ v => v && v.length > 0 || 'La descripción es obligatoria' ]"
                                                        rows="3"
                                                        label="Indicaciones para tu solicitud"
                                                        prepend-icon="fa fa-edit"
                                                        color="black"
                                                    />

                                                    <v-divider class="mb-4"/>
                                                    <div>
                                                        <h3 class="black--text mb-4">Selecciona la fecha de tu visita</h3>
                                                        <v-row
                                                            justify="space-around"
                                                            align="center"
                                                        >
                                                            <v-col>
                                                                <v-text-field
                                                                    v-model="fecha"
                                                                    label="Fecha de visita"
                                                                    prepend-icon="fa fa-calendar"
                                                                    readonly
                                                                    outlined
                                                                    dense
                                                                ></v-text-field>
                                                            </v-col>
                                                            <v-col>
                                                                <v-date-picker
                                                                    v-model="fecha"
                                                                    range
                                                                    color="secondary"
                                                                ></v-date-picker>
                                                            </v-col>
                                                        </v-row>
                                                    </div>
                                                    <div>
                                                        <h3 class="black--text mb-4">Selecciona la hora de tu visita</h3>
                                                        <v-row
                                                            justify="space-around"
                                                            align="center"
                                                        >
                                                            <v-col>
                                                                <!-- <h3 class="black--text mb-2">Hora que abres</h3> -->
                                                                <v-time-picker
                                                                    v-model="reservacion.hora"
                                                                    locale="cs"
                                                                    landscape
                                                                    color="secondary"
                                                                />
                                                            </v-col>
                                                        </v-row>
                                                    </div>
                                                </v-form>
                                            </v-card-text>
                                        </v-window-item>
                                    </v-window>
                                </v-card-text>

                                <v-divider/>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="primary"
                                        depressed
                                        @click="registrarReservacion"
                                    >
                                        <div style="color: rgba(0,0,0,0.8);">
                                            Solicitar
                                        </div>
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-layout>
                    </v-container>
                </v-img>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>

export default {
    mounted() {
        //this.geolocate()
    },

    middleware: 'VerificarUsuarioAuth',

    head(){
        return{
            titleTemplate: "Reservaciones | Antigua Travel"
        };
    },

    layout: 'empty',

    data(){
        return{
            reservacion: { },
            fecha : [ ]
        }
    },
    methods: {
        async registrarReservacion(){
            if(sessionStorage.getItem('usuario')){
                let params = {
                    cantidad : this.reservacion.cantidad,
                    observacion : this.reservacion.observacion,
                    hora : this.reservacion.hora,
                    fecha : this.fecha,
                    usuarioId : JSON.parse(sessionStorage.getItem('usuario')).id,
                    negocioId : parseInt(this.$route.query.in) 
                }
                
                console.log(params);
                
                await this.$api.post("/solicitar", params).then( data => {
                    console.log(data);
                    //Agregar alert de solicitud enviada
                    //this.$alert.registro_exitoso()
                    this.$router.push({ path: '/' })
                }).catch( data => {
                    console.error(data)
                    this.$alert.error('Ocurrió un error en la solicitud, vuelve a intentarlo', 'Error Interno')
                })
            } else {
                this.$alert.error('Registrate o inicia sesión en la plataforma', 'Inicio de sesión requerido')
            }
        },
    }
}
</script>
