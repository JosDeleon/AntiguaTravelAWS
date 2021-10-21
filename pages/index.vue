<template>

  <v-container fluid class="pa-10">

    <v-row justify="center" align="center" class="mt-5">

      <v-col cols="12" sm="10" md="10" lg="8">

        <v-card style="border-radius:10px;">

          <v-img
            height="250"
            src="/banner-principal.jpg"
            style="border-radius:10px;"
          >

            <v-container fill-height>
              <v-layout justify-center align-center>

                <v-autocomplete
                  outlined
                  rounded
                  dense
                  hide-details
                  placeholder="¿Qué deseas saber?"
                  prepend-inner-icon="fa fa-search"
                  style="max-width: 700px"
                  color="black"
                  class="elevation-5"
                  v-model="tags.seleccionadas"
                  :items="tags.lista"
                  item-value="tag"
                  item-text="tag"
                  clearable
                  clear-icon="fa fa-times-circle"
                  background-color="white"
                  item-color="black"
                  chips
                  small-chips
                  multiple
                  no-data-text="No hay datos relacionados a la busqueda o negocios registrados"
                  @keyup.enter.native="BusquedaxTag"
                  @click:clear="LimpiarBusqueda"
                >

                  <template v-slot:selection="data">
                    <v-chip
                      v-bind="data.attrs"
                      :input-value="data.selected"
                      close
                      small
                      @click="data.select"
                      @click:close="RemoverTag(data.item.tag)"
                    >
                      {{ data.item.tag }}
                    </v-chip>
                  </template>

                </v-autocomplete>
                <v-btn
                  color="secondary"
                  class="ml-1"
                  dark
                  depressed
                  rounded
                  @click="BusquedaxTag"
                >
                  Buscar
                </v-btn>
              </v-layout>
            </v-container>

          </v-img>

        </v-card>

      </v-col>

    </v-row>

    <div v-if="!tags.buscadas.check">

      <v-row class="mt-5" v-if="negocios.listado.sitios && negocios.listado.sitios.length > 0">

        <v-col cols="12" sm="10" md="8">

          <h2 class="mb-5 black--text">
            Descubre los mejores guías de turismo para obtener experiencias inolvidables
          </h2>

        </v-col>

      </v-row>

      <v-row class="mt-5">

        <v-col cols="12"
               lg="4"
               md="6"
               v-for="(sitio, i) in negocios.listado.sitios"
               :key="i"
               v-if="i < 4"
        >

          <v-card
            style="border-radius:10px;"
            class="mx-auto my-4"
            max-width="400"
            min-width="400"
            elevation="0"
            outlined
          >
            <v-img
              max-height="300"
              :src="sitio.img ? sitio.img : '/imagen-no-disponible.png'"
            />

            <v-card-title>
              <h4>
                {{ sitio.nombre }}
              </h4>
              <v-spacer/>
              <h6>
              <span :class="VerificarHora(sitio.abre, sitio.cierra) === 'Cerrado' ?
              'red--text' : 'green--text'">
                {{ VerificarHora(sitio.abre, sitio.cierra) === 'Cerrado' ? 'No disponible' : 'Disponible' }}
              </span> -
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-chip outlined color="black" small v-bind="attrs" v-on="on">
                      <v-icon color="black" class="mr-1">fa fa-clock</v-icon>
                      Horarios
                    </v-chip>
                  </template>
                  <span> Todos los días de {{ $moment(sitio.abre, "HH:mm:ss").format('h:mm a') }} -
                  {{ $moment(sitio.cierra, "HH:mm:ss").format('h:mm a')  }}</span>
                </v-tooltip>

              </h6>
            </v-card-title>

            <v-card-text>
              <v-row
                align="center"
                class="mx-0"
              >
                <v-rating
                  :value="sitio.puntuacionAvg"
                  color="secondary"
                  dense
                  readonly
                />

                <div class="grey--text ms-4">
                  {{ sitio.puntuacionAvg }} ({{ sitio.totalValoraciones }} valoraciones)
                </div>
              </v-row>

              <div class="mt-5">
                <v-icon color="black" class="mr-1">
                  fa fa-map-marker-alt
                </v-icon>
                Se encuentra a <span class="font-weight-bold">
              {{ CalcularDistancia(sitio.lng, sitio.lat) }} km
            </span> de ti
              </div>

              <div class="mt-2">
                {{ sitio.descripcion }}
              </div>
            </v-card-text>

            <v-divider class="my-4"/>

            <v-card-actions>

              <v-btn
                color="black"
                outlined
                @click="IrInformacionNegocio('T', sitio.id)"
              >
                <v-icon left color="secondary">
                  fa fa-compass
                </v-icon>
                Explorar
              </v-btn>

            </v-card-actions>

          </v-card>

        </v-col>

      </v-row>

      <v-row class="mt-5">

        <v-col cols="12" v-if="negocios.listado.cambistas && negocios.listado.cambistas.length > 0">

          <h2 class="mb-5 black--text">
            Cambia tu dinero con los mejores cambistas de la Antigua
          </h2>

        </v-col>

        <v-col cols="12"
               lg="4"
               md="6"
               v-for="(cambista, i) in negocios.listado.cambistas"
               :key="i"
               v-if="i < 4"
        >

          <v-card
            style="border-radius:10px;"
            class="mx-auto my-4"
            max-width="400"
            min-width="400"
            elevation="0"
            outlined
          >
            <v-img
              height="200"
              :src="cambista.img ? cambista.img : '/imagen-no-disponible.png'"
            >

              <template v-slot:placeholder>
                <v-sheet>
                  <v-skeleton-loader type="card" />
                </v-sheet>
              </template>

            </v-img>

            <v-card-title>
              <h4>
                {{ cambista.nombre }}
              </h4>
              <v-spacer/>
              <h6>
              <span :class="VerificarHora(cambista.abre, cambista.cierra) === 'Cerrado' ?
              'red--text' : 'green--text'">
                {{ VerificarHora(cambista.abre, cambista.cierra) }}
              </span> -
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-chip outlined color="black" small v-bind="attrs" v-on="on">
                      <v-icon color="black" class="mr-1">fa fa-clock</v-icon>
                      Horarios
                    </v-chip>
                  </template>
                  <span> Todos los días de {{ $moment(cambista.abre, "HH:mm:ss").format('h:mm a') }} -
                  {{ $moment(cambista.cierra, "HH:mm:ss").format('h:mm a')  }}</span>
                </v-tooltip>

              </h6>
            </v-card-title>

            <v-card-text>

              <div v-if="!loading.restaurantes">

                <v-row
                  align="center"
                  class="mx-0"
                >
                  <v-rating
                    :value="cambista.puntuacionAvg"
                    color="secondary"
                    dense
                    readonly
                  />

                  <div class="grey--text ms-4">
                    {{ cambista.puntuacionAvg }} ({{ cambista.totalValoraciones }} valoraciones)
                  </div>
                </v-row>

                <div class="mt-5">
                  <v-icon color="black" class="mr-1">
                    fa fa-map-marker-alt
                  </v-icon>
                  Se encuentra a <span class="font-weight-bold">
                  {{ CalcularDistancia(cambista.lng, cambista.lat) }} km
            </span> de ti
                </div>

                <div class="mt-2">
                  {{ cambista.descripcion }}
                </div>

              </div>

              <v-sheet
                :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
                class="pa-3"
                v-else
              >
                <v-skeleton-loader
                  class="mx-auto"
                  type="card"
                />
              </v-sheet>

            </v-card-text>

            <v-divider class="my-4"/>

            <v-card-actions>

              <v-btn
                color="black"
                outlined
                @click="IrInformacionNegocio('C', cambista.id)"
              >
                <v-icon left color="secondary">
                  fa fa-compass
                </v-icon>
                Explorar
              </v-btn>

            </v-card-actions>

          </v-card>

        </v-col>

      </v-row>

      <v-row justify="center" align="center" class="mt-5">

        <v-col cols="12">

          <v-card style="border-radius:10px;" height="500">

            <v-carousel
              cycle
              interval="3000"
              height="500"
              hide-delimiter-background
              show-arrows-on-hover
            >
              <v-carousel-item
                v-for="(slide, i) in slides"
                :key="i"
              >

                <v-img
                  height="500"
                  :src="slide.src"
                  style="border-radius:10px;"
                  gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
                >

                  <v-container fill-height class="pl-10">
                    <v-layout justify-start align-center>
                      <v-row>
                        <v-col cols="12">
                          <h1 class="white--text">
                            {{ slide.titulo }}
                          </h1>
                        </v-col>
                        <v-col cols="12">
                          <h3 class="white--text mt-n4">
                            {{ slide.subtitulo }}
                          </h3>
                        </v-col>
                        <v-col cols="12">
                          <v-btn
                            color="white"
                            dark
                            depressed
                            @click="IrRegistro(slide.tipo)"
                          >
                            <div class="black--text font-weight-bold">
                              Obtener Información
                            </div>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-layout>
                  </v-container>

                </v-img>

              </v-carousel-item>

            </v-carousel>

          </v-card>

        </v-col>

      </v-row>

      <v-row class="mt-5" v-if="negocios.listado.hoteles && negocios.listado.hoteles.length > 0">

        <v-col cols="12" sm="10" md="8">

          <h2 class="mb-5 black--text">
            Encuentra hoteles que se acomoden a tu gusto
          </h2>

        </v-col>

      </v-row>

      <v-row class="mt-5">

        <v-col cols="12"
               lg="4"
               md="6"
               v-for="(hotel, i) in negocios.listado.hoteles"
               :key="i"
               v-if="i < 4"
        >

          <v-card
            style="border-radius:10px;"
            class="mx-auto my-4"
            max-width="400"
            min-width="400"
            elevation="0"
            outlined
          >
            <v-img
              height="200"
              contain
              :src="hotel.img ? hotel.img : '/imagen-no-disponible.png'"
            />

            <v-card-title>
              <h4>
                {{ hotel.nombre }}
              </h4>
              <v-spacer/>
              <h6>
              <span :class="VerificarHora(hotel.abre, hotel.cierra) === 'Cerrado' ?
              'red--text' : 'green--text'">
                {{ VerificarHora(hotel.abre, hotel.cierra) }}
              </span> -
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-chip outlined color="black" small v-bind="attrs" v-on="on">
                      <v-icon color="black" class="mr-1">fa fa-clock</v-icon>
                      Horarios
                    </v-chip>
                  </template>
                  <span> Todos los días de {{ $moment(hotel.abre, "HH:mm:ss").format('h:mm a') }} -
                  {{ $moment(hotel.cierra, "HH:mm:ss").format('h:mm a')  }}</span>
                </v-tooltip>

              </h6>
            </v-card-title>

            <v-card-text>
              <v-row
                align="center"
                class="mx-0"
              >
                <v-rating
                  :value="hotel.puntuacionAvg"
                  color="secondary"
                  dense
                  readonly
                />

                <div class="grey--text ms-4">
                  {{ hotel.puntuacionAvg }} ({{ hotel.totalValoraciones }} valoraciones)
                </div>
              </v-row>

              <div class="mt-5">
                <v-icon color="black" class="mr-1">
                  fa fa-map-marker-alt
                </v-icon>
                Se encuentra a <span class="font-weight-bold">
              {{ CalcularDistancia(hotel.lng, hotel.lat) }} km
            </span> de ti
              </div>

              <div class="mt-2">
                {{ hotel.descripcion }}
              </div>
            </v-card-text>

            <v-divider class="my-4"/>

            <v-card-actions>

              <v-btn
                color="black"
                outlined
                @click="IrInformacionNegocio('H', hotel.id)"
              >
                <v-icon left color="secondary">
                  fa fa-compass
                </v-icon>
                Explorar
              </v-btn>

            </v-card-actions>

          </v-card>

        </v-col>

      </v-row>

      <v-row class="mt-5">

        <v-col cols="12" v-if="negocios.listado.restaurantes && negocios.listado.restaurantes.length > 0">

          <h2 class="mb-5 black--text">
            Restaurantes que tal vez te gusten
          </h2>

        </v-col>

        <v-col cols="12"
               lg="4"
               md="6"
               v-for="(restaurante, i) in negocios.listado.restaurantes"
               :key="i"
               v-if="i < 4"
        >

          <v-card
            style="border-radius:10px;"
            class="mx-auto my-4"
            max-width="400"
            min-width="400"
            elevation="0"
            outlined
          >
            <v-img
              height="200"
              contain
              :src="restaurante.img ? restaurante.img : '/imagen-no-disponible.png'"
            >

              <template v-slot:placeholder>
                <v-sheet>
                  <v-skeleton-loader type="card" />
                </v-sheet>
              </template>

            </v-img>

            <v-card-title>
              <h4>
                {{ restaurante.nombre }}
              </h4>
              <v-spacer/>
              <h6>
              <span :class="VerificarHora(restaurante.abre, restaurante.cierra) === 'Cerrado' ?
              'red--text' : 'green--text'">
                {{ VerificarHora(restaurante.abre, restaurante.cierra) }}
              </span> -
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-chip outlined color="black" small v-bind="attrs" v-on="on">
                      <v-icon color="black" class="mr-1">fa fa-clock</v-icon>
                      Horarios
                    </v-chip>
                  </template>
                  <span> Todos los días de {{ $moment(restaurante.abre, "HH:mm:ss").format('h:mm a') }} -
                  {{ $moment(restaurante.cierra, "HH:mm:ss").format('h:mm a')  }}</span>
                </v-tooltip>

              </h6>
            </v-card-title>

            <v-card-text>

              <div v-if="!loading.restaurantes">

                <v-row
                  align="center"
                  class="mx-0"
                >
                  <v-rating
                    :value="restaurante.puntuacionAvg"
                    color="secondary"
                    dense
                    readonly
                  />

                  <div class="grey--text ms-4">
                    {{ restaurante.puntuacionAvg }} ({{ restaurante.totalValoraciones }} valoraciones)
                  </div>
                </v-row>

                <div class="mt-5">
                  <v-icon color="black" class="mr-1">
                    fa fa-map-marker-alt
                  </v-icon>
                  Se encuentra a <span class="font-weight-bold">
              {{ CalcularDistancia(restaurante.lng, restaurante.lat) }} km
            </span> de ti
                </div>

                <div class="mt-2">
                  {{ restaurante.descripcion }}
                </div>

              </div>

              <v-sheet
                :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
                class="pa-3"
                v-else
              >
                <v-skeleton-loader
                  class="mx-auto"
                  type="card"
                />
              </v-sheet>

            </v-card-text>

            <v-divider class="my-4"/>

            <v-card-actions>

              <v-btn
                color="black"
                outlined
                @click="IrInformacionNegocio('R', restaurante.id)"
              >
                <v-icon left color="secondary">
                  fa fa-compass
                </v-icon>
                Explorar
              </v-btn>

            </v-card-actions>

          </v-card>

        </v-col>

      </v-row>

      <v-row class="mt-5" v-if="negocios.listado.rentas && negocios.listado.rentas.length > 0">

        <v-col cols="12">

          <h2 class="mb-5 black--text">
            Renta de autos para una experiencia rápida y cómoda
          </h2>

        </v-col>

        <v-col cols="12"
               lg="4"
               md="6"
               v-for="(renta, i) in negocios.listado.rentas"
               :key="i"
               v-if="i < 4"
        >

          <v-card
            style="border-radius:10px;"
            class="mx-auto my-4"
            max-width="400"
            min-width="400"
            elevation="0"
            outlined
          >
            <v-img
              height="200"
              contain
              :src="renta.img ? renta.img : '/imagen-no-disponible.png'"
            >

              <template v-slot:placeholder>
                <v-sheet>
                  <v-skeleton-loader type="card" />
                </v-sheet>
              </template>

            </v-img>

            <v-card-title>
              <h4>
                {{ renta.nombre }}
              </h4>
              <v-spacer/>
              <h6>
              <span :class="VerificarHora(renta.abre, renta.cierra) === 'Cerrado' ?
              'red--text' : 'green--text'">
                {{ VerificarHora(renta.abre, renta.cierra) }}
              </span> -
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-chip outlined color="black" small v-bind="attrs" v-on="on">
                      <v-icon color="black" class="mr-1">fa fa-clock</v-icon>
                      Horarios
                    </v-chip>
                  </template>
                  <span> Todos los días de {{ $moment(renta.abre, "HH:mm:ss").format('h:mm a') }} -
                  {{ $moment(renta.cierra, "HH:mm:ss").format('h:mm a')  }}</span>
                </v-tooltip>

              </h6>
            </v-card-title>

            <v-card-text>

              <div v-if="!loading.restaurantes">

                <v-row
                  align="center"
                  class="mx-0"
                >
                  <v-rating
                    :value="renta.puntuacionAvg"
                    color="secondary"
                    dense
                    readonly
                  />

                  <div class="grey--text ms-4">
                    {{ renta.puntuacionAvg }} ({{ renta.totalValoraciones }} valoraciones)
                  </div>
                </v-row>

                <div class="mt-5">
                  <v-icon color="black" class="mr-1">
                    fa fa-map-marker-alt
                  </v-icon>
                  Se encuentra a <span class="font-weight-bold">
                {{ CalcularDistancia(renta.lng, renta.lat) }} km
            </span> de ti
                </div>

                <div class="mt-2">
                  {{ renta.descripcion }}
                </div>

              </div>

              <v-sheet
                :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
                class="pa-3"
                v-else
              >
                <v-skeleton-loader
                  class="mx-auto"
                  type="card"
                />
              </v-sheet>

            </v-card-text>

            <v-divider class="my-4"/>

            <v-card-actions>

              <v-btn
                color="black"
                outlined
                @click="IrInformacionNegocio('RC', renta.id)"
              >
                <v-icon left color="secondary">
                  fa fa-compass
                </v-icon>
                Explorar
              </v-btn>

            </v-card-actions>

          </v-card>

        </v-col>

      </v-row>

    </div>

    <div v-else class="mt-2">

      <v-btn
        color="secondary"
        @click="LimpiarBusqueda"
        outlined
      >
        <v-icon left color="secondary">
          fa fa-arrow-left
        </v-icon>
        Regresar
      </v-btn>

      <div v-if="tags.buscadas.resultados && tags.buscadas.resultados.length > 0">

        <v-row class="mt-5" v-if="tags.buscadas.negocios.destinosTuristicos &&
                                  tags.buscadas.negocios.destinosTuristicos.length > 0"
        >

          <v-col cols="12">

            <h2 class="mb-5 black--text">
              Encontramos los siguientes guías turísticos con tu busqueda
            </h2>

          </v-col>

          <v-col cols="12"
                 lg="4"
                 md="6"
                 v-for="(sitio, i) in tags.buscadas.negocios.destinosTuristicos"
                 :key="i"
                 v-if="i < 4"
          >

            <v-card
              style="border-radius:10px;"
              class="mx-auto my-4"
              max-width="400"
              min-width="400"
              elevation="0"
              outlined
            >
              <v-img
                height="200"
                contain
                :src="sitio && sitio.img ? sitio.img : '/imagen-no-disponible.png'"
              />

              <v-card-title>
                <h4>
                  {{ sitio.nombre }}
                </h4>
                <v-spacer/>
                <h6>
                  <span :class="VerificarHora(sitio.abre, sitio.cierra) === 'Cerrado' ?
                  'red--text' : 'green--text'">
                    {{ VerificarHora(sitio.abre, sitio.cierra) === 'Cerrado' ? 'No disponible' : 'Disponible' }}
                  </span> -
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-chip outlined color="black" small v-bind="attrs" v-on="on">
                        <v-icon color="black" class="mr-1">fa fa-clock</v-icon>
                        Horarios
                      </v-chip>
                    </template>
                    <span> Todos los días de {{ $moment(sitio.abre, "HH:mm:ss").format('h:mm a') }} -
                  {{ $moment(sitio.cierra, "HH:mm:ss").format('h:mm a')  }}</span>
                  </v-tooltip>

                </h6>
              </v-card-title>

              <v-card-text>
                <v-row
                  align="center"
                  class="mx-0"
                >
                  <v-rating
                    :value="sitio.puntuacionAvg"
                    color="secondary"
                    dense
                    readonly
                  />

                  <div class="grey--text ms-4">
                    {{ sitio.puntuacionAvg }} ({{ sitio.totalValoraciones }} valoraciones)
                  </div>
                </v-row>

                <div class="mt-5">
                  <v-icon color="black" class="mr-1">
                    fa fa-map-marker-alt
                  </v-icon>
                  Se encuentra a <span class="font-weight-bold">
              {{ CalcularDistancia(sitio.lng, sitio.lat) }} km
            </span> de ti
                </div>

                <div class="mt-2">
                  {{ sitio.descripcion }}
                </div>
              </v-card-text>

              <v-divider class="my-4"/>

              <v-card-actions>

                <v-btn
                  color="black"
                  outlined
                  @click="IrInformacionNegocio('T', sitio.id)"
                >
                  <v-icon left color="secondary">
                    fa fa-compass
                  </v-icon>
                  Explorar
                </v-btn>

              </v-card-actions>

            </v-card>

          </v-col>

        </v-row>

        <v-row class="mt-5" v-if="tags.buscadas.negocios.cambistas &&
                                  tags.buscadas.negocios.cambistas.length > 0"
        >

          <v-col cols="12">

            <h2 class="mb-5 black--text">
              Encontramos los siguientes cambistas con tu busqueda
            </h2>

          </v-col>

          <v-col cols="12"
                 lg="4"
                 md="6"
                 v-for="(cambista, i) in tags.buscadas.negocios.cambistas"
                 :key="i"
                 v-if="i < 4"
          >

            <v-card
              style="border-radius:10px;"
              class="mx-auto my-4"
              max-width="400"
              min-width="400"
              elevation="0"
              outlined
            >
              <v-img
                height="200"
                contain
                :src="cambista.img ? cambista.img : '/imagen-no-disponible.png'"
              />

              <v-card-title>
                <h4>
                  {{ cambista.nombre }}
                </h4>
                <v-spacer/>
                <h6>
                  <span :class="VerificarHora(cambista.abre, cambista.cierra) === 'Cerrado' ?
                  'red--text' : 'green--text'">
                    {{ VerificarHora(cambista.abre, cambista.cierra) === 'Cerrado' ? 'No disponible' : 'Disponible' }}
                  </span> -
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-chip outlined color="black" small v-bind="attrs" v-on="on">
                        <v-icon color="black" class="mr-1">fa fa-clock</v-icon>
                        Horarios
                      </v-chip>
                    </template>
                    <span> Todos los días de {{ $moment(cambista.abre, "HH:mm:ss").format('h:mm a') }} -
                  {{ $moment(cambista.cierra, "HH:mm:ss").format('h:mm a')  }}</span>
                  </v-tooltip>

                </h6>
              </v-card-title>

              <v-card-text>
                <v-row
                  align="center"
                  class="mx-0"
                >
                  <v-rating
                    :value="cambista.puntuacionAvg"
                    color="secondary"
                    dense
                    readonly
                  />

                  <div class="grey--text ms-4">
                    {{ cambista.puntuacionAvg }} ({{ cambista.totalValoraciones }} valoraciones)
                  </div>
                </v-row>

                <div class="mt-5">
                  <v-icon color="black" class="mr-1">
                    fa fa-map-marker-alt
                  </v-icon>
                  Se encuentra a <span class="font-weight-bold">
                  {{ CalcularDistancia(cambista.lng, cambista.lat) }} km
            </span> de ti
                </div>

                <div class="mt-2">
                  {{ cambista.descripcion }}
                </div>
              </v-card-text>

              <v-divider class="my-4"/>

              <v-card-actions>

                <v-btn
                  color="black"
                  outlined
                  @click="IrInformacionNegocio('C', cambista.id)"
                >
                  <v-icon left color="secondary">
                    fa fa-compass
                  </v-icon>
                  Explorar
                </v-btn>

              </v-card-actions>

            </v-card>

          </v-col>

        </v-row>

        <v-row class="mt-5" v-if="tags.buscadas.negocios.hoteles &&
                                  tags.buscadas.negocios.hoteles.length > 0"
        >

          <v-col cols="12">

            <h2 class="mb-5 black--text">
              Encontramos los siguientes hoteles con tu busqueda
            </h2>

          </v-col>

          <v-col cols="12"
                 lg="4"
                 md="6"
                 v-for="(hotel, i) in tags.buscadas.negocios.hoteles"
                 :key="i"
                 v-if="i < 4"
          >

            <v-card
              style="border-radius:10px;"
              class="mx-auto my-4"
              max-width="400"
              min-width="400"
              elevation="0"
              outlined
            >
              <v-img
                height="200"
                contain
                :src="hotel.img ? hotel.img : '/imagen-no-disponible.png'"
              />

              <v-card-title>
                <h4>
                  {{ hotel.nombre }}
                </h4>
                <v-spacer/>
                <h6>
              <span :class="VerificarHora(hotel.abre, hotel.cierra) === 'Cerrado' ?
              'red--text' : 'green--text'">
                {{ VerificarHora(hotel.abre, hotel.cierra) }}
              </span> -
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-chip outlined color="black" small v-bind="attrs" v-on="on">
                        <v-icon color="black" class="mr-1">fa fa-clock</v-icon>
                        Horarios
                      </v-chip>
                    </template>
                    <span> Todos los días de {{ $moment(hotel.abre, "HH:mm:ss").format('h:mm a') }} -
                  {{ $moment(hotel.cierra, "HH:mm:ss").format('h:mm a')  }}</span>
                  </v-tooltip>

                </h6>
              </v-card-title>

              <v-card-text>
                <v-row
                  align="center"
                  class="mx-0"
                >
                  <v-rating
                    :value="hotel.puntuacionAvg"
                    color="secondary"
                    dense
                    readonly
                  />

                  <div class="grey--text ms-4">
                    {{ hotel.puntuacionAvg }} ({{ hotel.totalValoraciones }} valoraciones)
                  </div>
                </v-row>

                <div class="mt-5">
                  <v-icon color="black" class="mr-1">
                    fa fa-map-marker-alt
                  </v-icon>
                  Se encuentra a <span class="font-weight-bold">
              {{ CalcularDistancia(hotel.lng, hotel.lat) }} km
            </span> de ti
                </div>

                <div class="mt-2">
                  {{ hotel.descripcion }}
                </div>
              </v-card-text>

              <v-divider class="my-4"/>

              <v-card-actions>

                <v-btn
                  color="black"
                  outlined
                  @click="IrInformacionNegocio('H', hotel.id)"
                >
                  <v-icon left color="secondary">
                    fa fa-compass
                  </v-icon>
                  Explorar
                </v-btn>

              </v-card-actions>

            </v-card>

          </v-col>

        </v-row>

        <v-row class="mt-5" v-if="tags.buscadas.negocios.restaurantes &&
                                  tags.buscadas.negocios.restaurantes.length > 0"
        >

          <v-col cols="12">

            <h2 class="mb-5 black--text">
              Encontramos los siguientes restaurantes con tu busqueda
            </h2>

          </v-col>

          <v-col cols="12"
                 lg="4"
                 md="6"
                 v-for="(restaurante, i) in tags.buscadas.negocios.restaurantes"
                 :key="i"
                 v-if="i < 4"
          >

            <v-card
              style="border-radius:10px;"
              class="mx-auto my-4"
              max-width="400"
              min-width="400"
              elevation="0"
              outlined
            >
              <v-img
                height="200"
                contain
                :src="restaurante.img ? restaurante.img : '/imagen-no-disponible.png'"
              >

                <template v-slot:placeholder>
                  <v-sheet>
                    <v-skeleton-loader type="card" />
                  </v-sheet>
                </template>

              </v-img>

              <v-card-title>
                <h4>
                  {{ restaurante.nombre }}
                </h4>
                <v-spacer/>
                <h6>
              <span :class="VerificarHora(restaurante.abre, restaurante.cierra) === 'Cerrado' ?
              'red--text' : 'green--text'">
                {{ VerificarHora(restaurante.abre, restaurante.cierra) }}
              </span> -
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-chip outlined color="black" small v-bind="attrs" v-on="on">
                        <v-icon color="black" class="mr-1">fa fa-clock</v-icon>
                        Horarios
                      </v-chip>
                    </template>
                    <span> Todos los días de {{ $moment(restaurante.abre, "HH:mm:ss").format('h:mm a') }} -
                  {{ $moment(restaurante.cierra, "HH:mm:ss").format('h:mm a')  }}</span>
                  </v-tooltip>

                </h6>
              </v-card-title>

              <v-card-text>

                <div v-if="!loading.restaurantes">

                  <v-row
                    align="center"
                    class="mx-0"
                  >
                    <v-rating
                      :value="restaurante.puntuacionAvg"
                      color="secondary"
                      dense
                      readonly
                    />

                    <div class="grey--text ms-4">
                      {{ restaurante.puntuacionAvg }} ({{ restaurante.totalValoraciones }} valoraciones)
                    </div>
                  </v-row>

                  <div class="mt-5">
                    <v-icon color="black" class="mr-1">
                      fa fa-map-marker-alt
                    </v-icon>
                    Se encuentra a <span class="font-weight-bold">
              {{ CalcularDistancia(restaurante.lng, restaurante.lat) }} km
            </span> de ti
                  </div>

                  <div class="mt-2">
                    {{ restaurante.descripcion }}
                  </div>

                </div>

                <v-sheet
                  :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
                  class="pa-3"
                  v-else
                >
                  <v-skeleton-loader
                    class="mx-auto"
                    type="card"
                  />
                </v-sheet>

              </v-card-text>

              <v-divider class="my-4"/>

              <v-card-actions>

                <v-btn
                  color="black"
                  outlined
                  @click="IrInformacionNegocio('R', restaurante.id)"
                >
                  <v-icon left color="secondary">
                    fa fa-compass
                  </v-icon>
                  Explorar
                </v-btn>

              </v-card-actions>

            </v-card>

          </v-col>

        </v-row>

        <v-row class="mt-5" v-if="tags.buscadas.negocios.alquilerAutos &&
                                  tags.buscadas.negocios.alquilerAutos.length > 0"
        >

          <v-col cols="12">

            <h2 class="mb-5 black--text">
              Encontramos las siguientes rentas de autos con tu busqueda
            </h2>

          </v-col>

          <v-col cols="12"
                 lg="4"
                 md="6"
                 v-for="(alquiler, i) in tags.buscadas.negocios.alquilerAutos"
                 :key="i"
                 v-if="i < 4"
          >

            <v-card
              style="border-radius:10px;"
              class="mx-auto my-4"
              max-width="400"
              min-width="400"
              elevation="0"
              outlined
            >
              <v-img
                height="200"
                contain
                :src="alquiler.img ? alquiler.img : '/imagen-no-disponible.png'"
              />

              <v-card-title>
                <h4>
                  {{ alquiler.nombre }}
                </h4>
                <v-spacer/>
                <h6>
              <span :class="VerificarHora(alquiler.abre, alquiler.cierra) === 'Cerrado' ?
              'red--text' : 'green--text'">
                {{ VerificarHora(alquiler.abre, alquiler.cierra) }}
              </span> -
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-chip outlined color="black" small v-bind="attrs" v-on="on">
                        <v-icon color="black" class="mr-1">fa fa-clock</v-icon>
                        Horarios
                      </v-chip>
                    </template>
                    <span> Todos los días de {{ $moment(alquiler.abre, "HH:mm:ss").format('h:mm a') }} -
                  {{ $moment(alquiler.cierra, "HH:mm:ss").format('h:mm a')  }}</span>
                  </v-tooltip>

                </h6>
              </v-card-title>

              <v-card-text>
                <v-row
                  align="center"
                  class="mx-0"
                >
                  <v-rating
                    :value="alquiler.puntuacionAvg"
                    color="secondary"
                    dense
                    readonly
                  />

                  <div class="grey--text ms-4">
                    {{ alquiler.puntuacionAvg }} ({{ alquiler.totalValoraciones }} valoraciones)
                  </div>
                </v-row>

                <div class="mt-5">
                  <v-icon color="black" class="mr-1">
                    fa fa-map-marker-alt
                  </v-icon>
                  Se encuentra a <span class="font-weight-bold">
              {{ CalcularDistancia(alquiler.lng, alquiler.lat) }} km
            </span> de ti
                </div>

                <div class="mt-2">
                  {{ alquiler.descripcion }}
                </div>
              </v-card-text>

              <v-divider class="my-4"/>

              <v-card-actions>

                <v-btn
                  color="black"
                  outlined
                  @click="IrInformacionNegocio('RC', alquiler.id)"
                >
                  <v-icon left color="secondary">
                    fa fa-compass
                  </v-icon>
                  Explorar
                </v-btn>

              </v-card-actions>

            </v-card>

          </v-col>

        </v-row>

      </div>

      <div v-else>

        <v-alert
          border="left"
          colored-border
          type="warning"
          elevation="2"
          class="mt-5"
        >
          Lo sentimos, no encontramos ningún resultado con tus tags.
        </v-alert>

      </div>

    </div>

    <v-overlay :value="$store.state.loading">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>

  </v-container>

</template>

<script>

export default {

  mounted(){
    this.geolocate()
    this.ObtenerTags()
    this.ObtenerNegocios()
  },

  data(){
    return {
      model: null,

      tabs: null,

      loading:{
        restaurantes: false,
        hoteles: false
      },

      coords: { lat: 0, lng: 0 },

      tags: {
        lista: [],
        seleccionadas: [],
        buscadas: {
          check: false,
          loading: false,
          resultados: [],
          negocios: {
            restaurantes: [],
            hoteles: [],
            alquilerAutos: [],
            destinosTuristicos: [],
            cambistas: [],
            seleccionado: {}
          }
        }
      },

      negocios: {
        listado: []
      },

      busqueda: null,

      botones: {
        seleccionado: null
      },

      slides:[
        {
          src: "/banner-negocios.jpg", titulo: "Atrevete a ser parte de algo grande",
          subtitulo: "Dale la oportunidad a tu negocio de despegar de la mejor manera",
          tipo: 'N'
        },
        {
          src: "https://pix10.agoda.net/geo/city/18181/1_18181_02.jpg?s=1920x822", titulo: "Brinda experiencias inolvidables",
          subtitulo: "Muestra a las personas los mejores destinos que tiene Guatemala",
          tipo: 'G'
        },
        {
          src: "https://thumbs.dreamstime.com/b/dollar-euro-banner-background-banknotes-hundred-bills-american-us-european-eu-cash-closeup-218060291.jpg", titulo: "Conviertete en un cambista confiable",
          subtitulo: "Gana reputación como cambista y crece con nosotros",
          tipo: 'C'
        },
      ]
    }
  },

  methods: {

    async ObtenerTags(){
      this.tags.lista = await this.$api.get('/tags', {})
    },

    async BusquedaxTag(){

      if(this.tags.seleccionadas && this.tags.seleccionadas.length > 0){

        let params = {
          tags: this.tags.seleccionadas
        }

        await this.$api.post("/tags", params).then(data => {

          this.tags.buscadas.resultados = []
          this.tags.buscadas.resultados = data

          try{

            this.tags.buscadas.negocios.restaurantes = []
            this.tags.buscadas.negocios.hoteles = []
            this.tags.buscadas.negocios.alquilerAutos = []
            this.tags.buscadas.negocios.destinosTuristicos = []
            this.tags.buscadas.negocios.cambistas = []

            data.forEach(item=>{

              switch(item.categoria) {
                case 'R' :
                  if(this.tags.buscadas.negocios.restaurantes.indexOf(item) < 0)
                    this.tags.buscadas.negocios.restaurantes.push(item);
                  break;
                case 'H' :
                  if(this.tags.buscadas.negocios.hoteles.indexOf(item) < 0)
                    this.tags.buscadas.negocios.hoteles.push(item);
                  break;
                case 'D' :
                  if(this.tags.buscadas.negocios.destinosTuristicos.indexOf(item) < 0)
                    this.tags.buscadas.negocios.destinosTuristicos.push(item);
                  break;
                case 'C' :
                  if(this.tags.buscadas.negocios.cambistas.indexOf(item) < 0)
                    this.tags.buscadas.negocios.cambistas.push(item);
                  break;
                case 'RC' :
                  if(this.tags.buscadas.negocios.alquilerAutos.indexOf(item) < 0)
                    this.tags.buscadas.negocios.alquilerAutos.push(item);
                  break;
              }

            })

            this.ObtenerValoracionesBusquedaRestaurantes()
            this.ObtenerValoracionesBusquedaHoteles()
            this.ObtenerValoracionesBusquedaGuias()
            this.ObtenerValoracionesBusquedaAlquiler()
            this.ObtenerValoracionesBusquedaCambistas()

          }
          catch (e) {

            console.error(e)

          }

          this.tags.buscadas.check = true
          this.$forceUpdate()
        }).catch(({ data }) => {
          console.error(data)
          this.$alert.error('Ocurrió un error interno, vuelva a intentarlo', 'Error Interno')
        })
      }


    },

    async ObtenerNegocios(){
      this.loading.negocios = true
      this.negocios.listado =  await this.$api.get('/negocios', {})
      await this.ObtenerValoracionesRestaurantes()
      await this.ObtenerValoracionesHoteles()
      await this.ObtenerValoracionesRentas()
      await this.ObtenerValoracionesCambistas()
      await this.ObtenerValoracionesGuias()
    },

    async ObtenerValoracionesRestaurantes(){

      for (const negocio of this.negocios.listado.restaurantes) {

        let params = {
          negocioId: negocio.id
        }

        negocio.totalValoraciones = 0
        negocio.puntuacionAvg = 0

        await this.$api.post("/valoraciones", params).then(data => {

          let valoracionesAvg = 0

          data.forEach(valoracion => {

            valoracionesAvg += valoracion.puntuacion;

          })

          negocio.totalValoraciones = data.length

          negocio.puntuacionAvg = (data.length > 0) ? valoracionesAvg / data.length : 0

          this.$forceUpdate()

        })

      }

    },

    async ObtenerValoracionesHoteles(){

      for (const negocio of this.negocios.listado.hoteles) {

        let params = {
          negocioId: negocio.id
        }

        negocio.totalValoraciones = 0
        negocio.puntuacionAvg = 0

        await this.$api.post("/valoraciones", params).then(data => {

          let valoracionesAvg = 0

          data.forEach(valoracion => {

            valoracionesAvg += valoracion.puntuacion;

          })

          negocio.totalValoraciones = data.length

          negocio.puntuacionAvg = (data.length > 0) ? valoracionesAvg / data.length : 0

          this.$forceUpdate()

        })

      }

    },

    async ObtenerValoracionesRentas(){

      for (const negocio of this.negocios.listado.rentas) {

        let params = {
          negocioId: negocio.id
        }

        negocio.totalValoraciones = 0
        negocio.puntuacionAvg = 0

        await this.$api.post("/valoraciones", params).then(data => {

          let valoracionesAvg = 0

          data.forEach(valoracion => {

            valoracionesAvg += valoracion.puntuacion;

          })

          negocio.totalValoraciones = data.length

          negocio.puntuacionAvg = (data.length > 0) ? valoracionesAvg / data.length : 0

          this.$forceUpdate()

        })

      }

    },

    async ObtenerValoracionesCambistas(){

      for (const negocio of this.negocios.listado.cambistas) {

        let params = {
          negocioId: negocio.id
        }

        negocio.totalValoraciones = 0
        negocio.puntuacionAvg = 0

        await this.$api.post("/valoraciones", params).then(data => {

          let valoracionesAvg = 0

          data.forEach(valoracion => {

            valoracionesAvg += valoracion.puntuacion;

          })

          negocio.totalValoraciones = data.length

          negocio.puntuacionAvg = (data.length > 0) ? valoracionesAvg / data.length : 0

          this.$forceUpdate()

        })

      }

    },

    async ObtenerValoracionesGuias(){

      for (const negocio of this.negocios.listado.sitios) {

        let params = {
          negocioId: negocio.id
        }

        negocio.totalValoraciones = 0
        negocio.puntuacionAvg = 0

        await this.$api.post("/valoraciones", params).then(data => {

          let valoracionesAvg = 0

          data.forEach(valoracion => {

            valoracionesAvg += valoracion.puntuacion;

          })

          negocio.totalValoraciones = data.length

          negocio.puntuacionAvg = (data.length > 0) ? valoracionesAvg / data.length : 0

          this.$forceUpdate()

        })

      }

    },

    async ObtenerValoracionesBusquedaRestaurantes(){

      for (const negocio of this.tags.buscadas.negocios.restaurantes) {

        let params = {
          negocioId: negocio.id
        }

        negocio.totalValoraciones = 0
        negocio.puntuacionAvg = 0

        await this.$api.post("/valoraciones", params).then(data => {

          let valoracionesAvg = 0

          data.forEach(valoracion => {

            valoracionesAvg += valoracion.puntuacion;

          })

          negocio.totalValoraciones = data.length

          negocio.puntuacionAvg = (data.length > 0) ? valoracionesAvg / data.length : 0

          this.$forceUpdate()

        })

      }

    },

    async ObtenerValoracionesBusquedaHoteles(){

      for (const negocio of this.tags.buscadas.negocios.hoteles) {

        let params = {
          negocioId: negocio.id
        }

        negocio.totalValoraciones = 0
        negocio.puntuacionAvg = 0

        await this.$api.post("/valoraciones", params).then(data => {

          let valoracionesAvg = 0

          data.forEach(valoracion => {

            valoracionesAvg += valoracion.puntuacion;

          })

          negocio.totalValoraciones = data.length

          negocio.puntuacionAvg = (data.length > 0) ? valoracionesAvg / data.length : 0

          this.$forceUpdate()

        })

      }

    },

    async ObtenerValoracionesBusquedaGuias(){

      for (const negocio of this.tags.buscadas.negocios.destinosTuristicos) {

        let params = {
          negocioId: negocio.id
        }

        negocio.totalValoraciones = 0
        negocio.puntuacionAvg = 0

        await this.$api.post("/valoraciones", params).then(data => {

          let valoracionesAvg = 0

          data.forEach(valoracion => {

            valoracionesAvg += valoracion.puntuacion;

          })

          negocio.totalValoraciones = data.length

          negocio.puntuacionAvg = (data.length > 0) ? valoracionesAvg / data.length : 0

          this.$forceUpdate()

        })

      }

    },

    async ObtenerValoracionesBusquedaAlquiler(){

      for (const negocio of this.tags.buscadas.negocios.alquilerAutos) {

        let params = {
          negocioId: negocio.id
        }

        negocio.totalValoraciones = 0
        negocio.puntuacionAvg = 0

        await this.$api.post("/valoraciones", params).then(data => {

          let valoracionesAvg = 0

          data.forEach(valoracion => {

            valoracionesAvg += valoracion.puntuacion;

          })

          negocio.totalValoraciones = data.length

          negocio.puntuacionAvg = (data.length > 0) ? valoracionesAvg / data.length : 0

          this.$forceUpdate()

        })

      }

    },

    async ObtenerValoracionesBusquedaCambistas(){

      for (const negocio of this.tags.buscadas.negocios.cambistas) {

        let params = {
          negocioId: negocio.id
        }

        negocio.totalValoraciones = 0
        negocio.puntuacionAvg = 0

        await this.$api.post("/valoraciones", params).then(data => {

          let valoracionesAvg = 0

          data.forEach(valoracion => {

            valoracionesAvg += valoracion.puntuacion;

          })

          negocio.totalValoraciones = data.length

          negocio.puntuacionAvg = (data.length > 0) ? valoracionesAvg / data.length : 0

          this.$forceUpdate()

        })

      }

    },

    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.coords.lat = position.coords.latitude
        this.coords.lng = position.coords.longitude
      });
    },

    CalcularDistancia(lng, lat){

      lng = parseFloat(lng)
      lat = parseFloat(lat)

      var R = 6371; // Radius of the earth in km
      var dLat = this.deg2rad(lat-this.coords.lat);  // deg2rad below
      var dLon = this.deg2rad(lng-this.coords.lng);
      var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.deg2rad(this.coords.lat)) * Math.cos(this.deg2rad(lat)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
       // Distance in km
      return (R * c).toFixed(0);

    },

    deg2rad(deg) {
      return deg * (Math.PI/180)
    },

    VerificarHora(abre, cierra){

      var format = 'hh:mm:ss'
      var time = this.$moment(this.$moment(),format),
        beforeTime = this.$moment(abre, format),
        afterTime = this.$moment(cierra, format);

      if (time.isBetween(beforeTime, afterTime)) {

        return "Abierto"

      } else {

        return "Cerrado"

      }

    },

    RemoverTag (item) {
      const index = this.tags.seleccionadas.indexOf(item)
      if (index >= 0) this.tags.seleccionadas.splice(index, 1)
    },

    IrRegistro(tipo){

      if(tipo === 'N')
        this.$router.push({ path: '/negocios/registro' })
      else if(tipo === 'G')
        this.$router.push({ path: '/negocios/registro_guia' })
      else
        this.$router.push({ path: '/negocios/registro_cambista' })
    },

    IrInformacionNegocio(categoria, id){

      if(categoria === 'T'){
        this.$router.push({ path: '/servicios/guias/'+id })
      }
      else if(categoria === 'R'){
        this.$router.push({ path: '/servicios/restaurantes/'+id })
      }
      else if(categoria === 'H'){
        this.$router.push({ path: '/servicios/hoteles/'+id })
      }
      else if(categoria === 'C'){
        this.$router.push({ path: '/servicios/cambistas/'+id })
      }
      else{
        this.$router.push({ path: '/servicios/renta_autos/'+id })
      }

    },

    LimpiarBusqueda(){

      if(this.tags.buscadas.check){
        this.tags.seleccionadas = []
        this.tags.buscadas.check = false
        this.tags.buscadas.resultados = []
        this.tags.buscadas.negocios.restaurantes = []
        this.tags.buscadas.negocios.hoteles = []
        this.tags.buscadas.negocios.alquilerAutos = []
        this.tags.buscadas.negocios.cambistas = []
        this.tags.buscadas.negocios.destinosTuristicos = []
        this.ObtenerTags()
        this.ObtenerNegocios()
      }

    }

  }

}

</script>
