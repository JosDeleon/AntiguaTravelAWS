<template>
  <v-container fluid>

    <v-card-actions>
      <v-spacer class="hidden-sm-and-down" />
      <v-tooltip bottom v-if="productos.tabla.check">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            icon
            color="black"
            @click="LimpiarBusqueda"
            class="hidden-md-and-up"
          >
            <v-icon color="black">
              fa fa-arrow-left
            </v-icon>
          </v-btn>
        </template>
        <span>Regresar</span>
      </v-tooltip>
      <v-text-field
        outlined
        rounded
        dense
        hide-details
        label="Busqueda"
        class="animate__animated animate__jackInTheBox"
        prepend-inner-icon="fa fa-search"
        style="max-width: 300px"
        v-model="productos.tabla.busqueda"
        @keyup.enter.native="Busqueda"
        clearable
        clear-icon="fa fa-times-circle"
        @click:clear="LimpiarBusqueda"
        color="black"
      />
    </v-card-actions>

    <v-card outlined elevation="0" style="border-radius: 10px;"
            class="animate__animated animate__zoomIn"
    >

      <v-data-table
        :headers="productos.tabla.headers"
        :items="productos.listado"
        item-key="id"
        sort-by="id"
        sort-desc
        :expanded.sync="productos.tabla.expanded"
        :single-expand="false"
        show-expand
        class="elevation-1"
        style="border-radius: 10px;"
        :loading="productos.tabla.loading"
        loading-text="Cargando... Por favor espere un momento."
        no-data-text='Aún no hay productos para mostrar, por favor vuelva a intentarlo.'
        :header-props="{'sortByText': 'Ordenar por'}"
        :items-per-page="productos.tabla.productosPorPagina"
        hide-default-footer
        :page.sync="productos.tabla.pagina"
        @page-count="productos.tabla.conteoPaginas = $event"

      >

        <template v-slot:no-data>
          <v-alert
            type="info"
            prominent
            color="complementario"
          >
            <div v-if="productos.tabla.check">
              No se encontraron ocurrencias en la busqueda: "{{ productos.tabla.busqueda_texto }}"
            </div>
            <div v-else>
              Aún no hay productos o servicios para mostrar, por favor vuelva a intentarlo.
            </div>
          </v-alert>
        </template>

        <template v-slot:top>

          <v-toolbar
            flat
            style="border-radius: 10px;"
          >
            <v-tooltip bottom v-if="productos.tabla.check">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  icon
                  color="black"
                  @click="LimpiarBusqueda"
                  class="hidden-sm-and-down"
                >
                  <v-icon color="black">
                    fa fa-arrow-left
                  </v-icon>
                </v-btn>
              </template>
              <span>Regresar</span>
            </v-tooltip>
            <v-toolbar-title class="font-weight-bold text-wrap">
              <h4 style="font-family: Poppins, sans-serif;" class="hidden-sm-and-down">
                Administrar de Produtos y Servicios
              </h4>
              <h4 style="font-family: Poppins, sans-serif; font-size: 15px;" class="hidden-md-and-up">
                Administrar de Productos y Servicios
              </h4>
            </v-toolbar-title>

            <v-divider
              class="mx-4"
              inset
              vertical
            />

            <v-col cols="10" lg="3"
                   class="mt-7 hidden-md-and-down"
            >
              <v-select
                :items="negocios.listado"
                v-model="negocios.seleccionado"
                label="Negocio Actual"
                item-value="id"
                item-text="nombre"
                return-object
                @change="ObtenerProductos"
                outlined
                dense
                color="black"
                item-color="black"
              >
                <v-icon slot="prepend-inner" color="complementario" class="mx-2">
                  fa fa-briefcase
                </v-icon>
              </v-select>
            </v-col>


            <v-spacer />

            <v-btn
              color="tertiary"
              class="hidden-sm-and-down"
              outlined
              @click="MostrarDialogoNuevo"
            >
              <v-icon left>
                fa fa-cube
              </v-icon>
              Nuevo
            </v-btn>
            <v-btn
              color="tertiary"
              class="hidden-md-and-up my-2 mx-4"
              small
              outlined
              @click="MostrarDialogoNuevo"
            >
              <v-icon left>
                fa fa-cube
              </v-icon>
              Nuevo
            </v-btn>

          </v-toolbar>

          <v-col cols="7" sm="6" md="4"
                 class="mt-n2 hidden-lg-and-up"
          >
            <v-select
              :items="negocios.listado"
              v-model="negocios.seleccionado"
              label="Negocio Actual"
              item-value="negocioId"
              item-text="nombre"
              return-object
              @change="ObtenerProductos"
              outlined
              dense
              color="black"
              item-color="black"
            >
              <v-icon slot="prepend-inner" color="complementario" class="mx-2">
                fa fa-briefcase
              </v-icon>
            </v-select>
          </v-col>

        </template>

        <template v-slot:[`item.imagen`]="{ item }">
          <v-avatar
            class="ma-3 hidden-sm-and-down"
            size="80"
            tile
          >
            <v-img v-if="item.img" :lazy-src="item.img"
                   :src="item.img" style="border-radius:10px;" />
            <v-img v-else :src="'/imagen-no-disponible.png'"></v-img>
          </v-avatar>

          <v-avatar
            class="ma-3 hidden-md-and-up"
            size="100"
            tile
          >
            <v-img v-if="item.img" :src="item.img" style="border-radius:10px;" />
            <v-img v-else :src="'/imagen-no-disponible.png'"></v-img>
          </v-avatar>

        </template>

        <template v-slot:[`item.nombre`]="{ item }">
          <v-chip
            class="ma-2"
            color="warning darken-1"
            outlined
          >
            <v-icon left>
              fa fa-cube
            </v-icon>
            {{ item.nombre }}
          </v-chip>
        </template>

        <template v-slot:[`item.precio`]="{ item }">
          <v-chip
            class="ma-2"
            color="green"
            outlined
          >
            <v-icon left>
              fa fa-money-bill-wave
            </v-icon>
            Q. {{ item.valor }}
          </v-chip>
        </template>

        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <span class="font-weight-bold" style="font-size: 16px;"> Descripción del Producto o Servicio: </span> {{ item.descripcion }}
          </td>
        </template>

        <template v-slot:[`item.caracteristicas`]="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="grey"
                dark
                v-bind="attrs"
                v-on="on"
                icon
                @click="MostrarDialogoEditarCaracteristicas(item)"
              >
                <v-icon
                  color="grey"
                >
                  fa fa-code-branch
                </v-icon>
              </v-btn>
            </template>
            <span>Listado de Características</span>
          </v-tooltip>
        </template>

        <template v-slot:[`item.actions`]="{ item }">

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="tertiary"
                dark
                v-bind="attrs"
                v-on="on"
                icon
                @click="MostrarDialogoCambiarImagen(item)"
              >
                <v-icon
                  color="tertiary"
                >
                  fas fa-image
                </v-icon>
              </v-btn>
            </template>
            <span>Cambiar Imagen</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="black"
                dark
                v-bind="attrs"
                v-on="on"
                icon
                @click="MostrarDialogoEditar(item)"
              >
                <v-icon
                  color="black"
                >
                  fa fa-pencil
                </v-icon>
              </v-btn>
            </template>
            <span>Editar</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="error"
                     icon
                     v-bind="attrs"
                     v-on="on"
                     @click="EliminarProducto(item)"
              >
                <v-icon color="error">
                  fa fa-trash
                </v-icon>
              </v-btn>
            </template>
            <span>Eliminar</span>
          </v-tooltip>

        </template>

      </v-data-table>

      <div class="text-center py-2">
        <v-pagination
          v-model="productos.tabla.pagina"
          :length="productos.tabla.conteoPaginas"
          :total-visible="7"
          color="complementario"
          circle
        />
      </div>

    </v-card>

    <v-dialog v-model="dialogos.producto"
              transition="dialog-bottom-transition"
              scrollable
              persistent
              max-width="1000px"
    >

      <v-card>

        <v-toolbar elevation="0" dense color="transparent">
          <h3> {{ productos.seleccionado.id > 0 ? 'Editar' : 'Nuevo' }} Producto </h3>
          <v-spacer></v-spacer>
          <v-btn icon @click="CerrarDialogoProducto">
            <v-icon>fa fa-times</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text class="pa-4">

          <v-form ref="frmProducto">

            <div class="mb-6">
              <h3 class="mt-1 hidden-sm-and-down black--text">
                Información del Producto
              </h3>

              <h3 style="font-size: 18px; font-family: Poppins, sans-serif;"
                  class="mt-1 hidden-md-and-up black--text"
              >
                Información del Producto
              </h3>
            </div>

            <v-text-field
              outlined
              dense
              v-model="productos.seleccionado.nombre"
              :rules="[ v => v && v.length > 0 || 'El nombre es obligatorio' ]"
              label="Nombre del Producto"
              color="black"
              prepend-icon="fa fa-heading"
            />

            <v-text-field
              outlined
              dense
              v-model="productos.seleccionado.valor"
              type="number"
              prefix="Q. "
              :rules="[ v => v && v.length > 0 || 'El precio es obligatorio' ]"
              label="Precio del Producto"
              color="black"
              prepend-icon="fa fa-money-bill-wave-alt"
            />

            <v-file-input
              v-model="productos.seleccionado.imagen"
              color="black"
              label="Imagen del Producto"
              placeholder="Selecciona la imagen de tu producto"
              prepend-icon="fa fa-file-image"
              :rules="[ v => !!v || 'La imagen del producto es obligatoria' ]"
              outlined
              dense
              accept="image/*"
              truncate-length="50"
              v-if="!productos.seleccionado.id > 0"
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

              <template v-slot:counter>

              </template>

            </v-file-input>

            <v-textarea
              outlined
              dense
              no-resize
              clearable
              clear-icon="fa fa-times-circle"
              v-model="productos.seleccionado.descripcion"
              :rules="[ v => v && v.length > 0 || 'La descripción es obligatoria' ]"
              rows="3"
              label="Descripción del Producto"
              prepend-icon="fa fa-edit"
              color="black"
            />

            <div class="mb-6" v-if="!productos.seleccionado.id > 0">
              <h3 class="mt-1 hidden-sm-and-down black--text">
                Características del Producto
                <div class="subheading mt-2" style="font-family: Poppins, sans-serif;">
                  <h5 class="mt-1 text-wrap text--secondary" style="white-space: nowrap;">
                    Por favor añada las características que desea que tenga el producto
                  </h5>
                </div>
              </h3>

              <h1 style="font-size: 18px; font-family: Poppins, sans-serif;"
                  class="mt-1 hidden-md-and-up black--text"
              >
                Características del Producto
                <div class="subheading mt-2" style="font-family: Poppins, sans-serif; white-space: nowrap;">
                  <h6 class="mt-1 text-wrap text-justify text--secondary">
                    Por favor añada las características que desea que tenga el producto
                  </h6>
                </div>
              </h1>
            </div>

            <div
              v-for="(caracteristica, i) in productos.seleccionado.carac && productos.seleccionado.carac.length > 0
                      ? productos.seleccionado.carac : []"
              :key="i"
              v-if="!productos.seleccionado.id > 0"
            >



              <IconPicker v-model="caracteristica.icono" :dialogo.sync="caracteristica.dialogo"
                          @cerrar="CerrarIconPicker(caracteristica)"
              />

              <v-row>
                <v-col cols="12" xl="4" lg="4">
                  <v-text-field
                    outlined
                    dense
                    v-model="caracteristica.nombre"
                    :rules="[ v => v && v.length > 0 || 'El nombre es obligatorio' ]"
                    label="Nombre"
                    color="black"
                    prepend-icon="fa fa-heading"
                  />
                </v-col>
                <v-col cols="12" xl="4" lg="4">
                  <v-text-field
                    outlined
                    dense
                    v-model="caracteristica.valor"
                    :rules="[ v => v && v.length > 0 || 'El valor es obligatorio']"
                    label="Valor"
                    color="black"
                    prepend-icon="fa fa-code-branch"
                  />
                </v-col>
                <v-col cols="12" xl="3" lg="3">
                  <v-text-field
                    outlined
                    dense
                    v-model="caracteristica.icono"
                    :rules="[ v => v && v.length > 0 || 'El icono es obligatorio' ]"
                    label="Icono"
                    color="black"
                    prepend-icon="fa fa-icons"
                    @click="caracteristica.dialogo = true"
                  >

                    <template v-slot:append>

                      <v-icon>
                        {{ caracteristica.icono }}
                      </v-icon>

                    </template>

                  </v-text-field>
                </v-col>
                <v-col cols="12" lg="1" md="1" sm="1">

                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="error"
                             icon
                             v-bind="attrs"
                             v-on="on"
                             @click="RemoverCaracteristica(caracteristica, i)"
                      >
                        <v-icon color="error">
                          fa fa-trash
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>Eliminar</span>
                  </v-tooltip>

                </v-col>
              </v-row>

              <v-divider class="mb-5" />

            </div>

            <div v-if="!productos.seleccionado.id > 0">

              <v-btn outlined
                     class="hidden-sm-and-down"
                     @click="AddCaracteristica"
              >
                <v-icon color="secondary" left>
                  fa fa-plus
                </v-icon>
                Agregar Característica
              </v-btn>

              <v-btn
                small
                outlined
                class="hidden-md-and-up"
                @click="AddCaracteristica"
              >
                <v-icon color="secondary" left>
                  fa fa-plus
                </v-icon>
                Agregar Característica
              </v-btn>

            </div>

          </v-form>

        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="black"
            text
            @click="ActualizarProducto"
            v-if="productos.seleccionado.id > 0"
          >
            <v-icon left>fa fa-check</v-icon>
            Actualizar
          </v-btn>
          <v-btn
            color="black"
            text
            @click="GuardarProducto"
            v-else
          >
            <v-icon left>fa fa-check</v-icon>
            Guardar
          </v-btn>
        </v-card-actions>

      </v-card>

    </v-dialog>

    <v-dialog v-model="dialogos.imagen"
              transition="dialog-bottom-transition"
              scrollable
              persistent
              max-width="700"
    >

      <v-card>

        <v-toolbar elevation="0" dense color="transparent">
          <h3> Imagen del Producto {{ this.productos.seleccionado.nombre }} </h3>
          <v-spacer></v-spacer>
          <v-btn icon @click="CerrarDialogoImagenProducto">
            <v-icon>fa fa-times</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text class="pa-4">

          <v-img
            :lazy-src="productos.seleccionado.nuevaImagen ? productos.seleccionado.nuevaImagen : '/imagen-no-disponible.png'"
            :src="productos.seleccionado.nuevaImagen ? productos.seleccionado.nuevaImagen : '/imagen-no-disponible.png'"
            style="border-radius:10px;"
          >

            <v-container fill-height>
              <v-layout justify-center align-center>

                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      icon
                      @click="SeleccionarImagen"
                    >
                      <v-icon
                        color="primary"
                        size="100"
                      >
                        fa fa-pencil
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Editar Imagen</span>
                </v-tooltip>

                <input
                  ref="uploader"
                  class="d-none"
                  type="file"
                  accept="image/*"
                  @change="onFileChanged"
                />

              </v-layout>
            </v-container>

          </v-img>

        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="tertiary"
            text
            @click="CambiarImagen"
          >
            <v-icon left>fa fa-image</v-icon>
            Cambiar Imagen
          </v-btn>
        </v-card-actions>

      </v-card>

    </v-dialog>

    <v-dialog v-model="dialogos.caracteristicas"
              transition="dialog-bottom-transition"
              scrollable
              persistent
              max-width="1100"
    >

      <v-card :loading="loadCard">

        <v-toolbar elevation="0" dense color="transparent">
          <h3> Listado de Características </h3>
          <v-spacer></v-spacer>
          <v-btn icon @click="CerrarDialogoCaracteristicas">
            <v-icon>fa fa-times</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text class="pa-4">

          <div class="mb-4">

            <v-btn outlined
                   class="hidden-sm-and-down"
                   @click="AddCaracteristica"
            >
              <v-icon color="secondary" left>
                fa fa-plus
              </v-icon>
              Agregar Característica
            </v-btn>

            <v-btn
              small
              outlined
              class="hidden-md-and-up"
              @click="AddCaracteristica"
            >
              <v-icon color="secondary" left>
                fa fa-plus
              </v-icon>
              Agregar Característica
            </v-btn>

          </div>

          <v-divider class="mb-4" />

          <div v-if="productos.seleccionado.carac && productos.seleccionado.carac.length === 0">
            <v-alert
              type="info"
              prominent
              color="complementario"
            >
              Aún no se han agregado características a este producto o servicio
            </v-alert>
          </div>

          <v-form ref="frmCaracteristica">

            <div
              v-for="(caracteristica, i) in productos.seleccionado.carac && productos.seleccionado.carac.length > 0
                      ? productos.seleccionado.carac : []"
              :key="i"
            >
              <IconPicker v-model="caracteristica.icono" :dialogo.sync="caracteristica.dialogo"
                          @cerrar="CerrarIconPicker(caracteristica)"
              />

              <v-row>
                <v-col cols="12">
                  <v-btn color="error"
                         outlined
                         @click="RemoverCaracteristica(caracteristica, i)"
                  >
                    <v-icon color="error" left>
                      fa fa-trash
                    </v-icon>
                    Eliminar Característica
                  </v-btn>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" xl="4" lg="4">
                  <v-text-field
                    outlined
                    dense
                    v-model="caracteristica.nombre"
                    :rules="[ v => v && v.length > 0 || 'El nombre es obligatorio' ]"
                    label="Nombre"
                    color="black"
                    prepend-icon="fa fa-heading"
                    :disabled="caracteristica.id > 0"
                  />
                </v-col>
                <v-col cols="12" xl="4" lg="4">
                  <v-text-field
                    outlined
                    dense
                    v-model="caracteristica.valor"
                    :rules="[ v => v && v.length > 0 || 'El valor es obligatorio']"
                    label="Valor"
                    color="black"
                    prepend-icon="fa fa-code-branch"
                    :disabled="caracteristica.id > 0"
                  />
                </v-col>
                <v-col cols="12" xl="3" lg="3">
                  <v-text-field
                    outlined
                    dense
                    v-model="caracteristica.icono"
                    :rules="[ v => v && v.length > 0 || 'El icono es obligatorio' ]"
                    label="Icono"
                    color="black"
                    prepend-icon="fa fa-icons"
                    :disabled="caracteristica.id > 0"
                    @click="AbrirIconPicker(caracteristica)"
                  >

                    <template v-slot:append>

                      <v-icon>
                        {{ caracteristica.icono }}
                      </v-icon>

                    </template>

                  </v-text-field>
                </v-col>
                <v-col cols="12" lg="1" md="1" sm="1">

                  <v-tooltip bottom v-if="caracteristica.id > 0">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="black"
                             icon
                             v-bind="attrs"
                             v-on="on"
                             @click="MostrarDialogoEditarCaracteristica(caracteristica)"
                      >
                        <v-icon color="black">
                          fa fa-pencil
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>Editar</span>
                  </v-tooltip>

                  <v-tooltip bottom v-else>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="green"
                             icon
                             v-bind="attrs"
                             v-on="on"
                             @click="GuardarCaracteristica(caracteristica)"
                      >
                        <v-icon color="green">
                          fa fa-check
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>Guardar</span>
                  </v-tooltip>

                </v-col>
              </v-row>
              <v-divider class="mb-5" />
            </div>

          </v-form>

        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="black"
            text
            @click="ActualizarProducto"
            v-if="productos.seleccionado.productoID > 0"
          >
            <v-icon left>fa fa-check</v-icon>
            Guardar
          </v-btn>
        </v-card-actions>

      </v-card>

    </v-dialog>

    <v-dialog v-model="dialogos.editar_caracteristica"
              transition="fab-transition"
              scrollable
              persistent
              max-width="600"
    >

      <v-card>

        <v-toolbar elevation="0" dense color="transparent">
          <h3> Editar Característica </h3>
          <v-spacer></v-spacer>
          <v-btn icon @click="CerrarDialogoEditarCaracteristica">
            <v-icon>fa fa-times</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text class="pa-4">

          <IconPicker v-model="productos.caracteristica_seleccionada.icono" :dialogo.sync="productos.caracteristica_seleccionada.dialogo"
                      @cerrar="productos.caracteristica_seleccionada.dialogo = false"
          />

          <v-form ref="frmEditarCaracteristica">

            <v-text-field
              outlined
              dense
              v-model="productos.caracteristica_seleccionada.nombre"
              :rules="[ v => v && v.length > 0 || 'El nombre es obligatorio' ]"
              label="Nombre"
              color="black"
              prepend-icon="fa fa-heading"
            />

            <v-text-field
              outlined
              dense
              v-model="productos.caracteristica_seleccionada.valor"
              :rules="[ v => v && v.length > 0 || 'El valor es obligatorio']"
              label="Valor"
              color="black"
              prepend-icon="fa fa-code-branch"
            />

            <v-text-field
              outlined
              dense
              v-model="productos.caracteristica_seleccionada.icono"
              :rules="[ v => v && v.length > 0 || 'El icono es obligatorio' ]"
              label="Icono"
              color="black"
              prepend-icon="fa fa-icons"
              @click="productos.caracteristica_seleccionada.dialogo = true"
            >

              <template v-slot:append>

                <v-icon>
                  {{ productos.caracteristica_seleccionada.icono }}
                </v-icon>

              </template>

            </v-text-field>

          </v-form>

        </v-card-text>

        <v-card-actions>

          <v-spacer />

          <v-btn
            color="black"
            text
            @click="ActualizarCaracteristica"
          >
            <v-icon left>fa fa-check</v-icon>
            Actualizar
          </v-btn>

        </v-card-actions>

      </v-card>

    </v-dialog>

  </v-container>
</template>

<script>

export default {

  layout: 'admin_negocio',

  head(){
    return{
      titleTemplate: "Antigua Travel | Productos y Servicios"
    };
  },

  mounted(){
    this.ObtenerNegocios()
    this.$store.commit('setRutaActual', 'Productos y Servicios')
  },

  middleware: 'VerificarTieneNegocio',

  components: {  },

  data() {
    return {
      v:null,
      loadCard: false,
      dialogos: {
        producto: false,
        detalles: false,
        caracteristicas: false,
        editar_caracteristica: false,
        imagen: false,
        iconos: false
      },
      busqueda: {
        realizada: false,
        texto: null
      },
      negocios: {
        listado: [],
        seleccionado: {}
      },
      productos: {
        tabla: {
          headers: [
            { text: 'Imagen', value: 'imagen', align: 'center' },
            { text: 'Nombre', value: 'nombre', align: 'center' },
            { text: 'Precio', value: 'precio', align: 'center' },
            { text: 'Descripción', value: 'data-table-expand', sortable: false, align: 'center' },
            { text: 'Características', value: 'caracteristicas', sortable: false, align: 'center'},
            { text: 'Acciones', value: 'actions', sortable: false, align: 'center'},
          ],
          expanded: [],
          busqueda: null,
          busqueda_texto: null,
          check: false,
          loading: false,
          pagina: 1,
          conteoPaginas: 0,
          productosPorPagina: 10
        },
        listado: [],
        seleccionado: { carac: [] },
        caracteristica_seleccionada: {}
      },
    }
  },

  methods: {

    async ObtenerProductos(){

      let params = {
        id: this.negocios.seleccionado.id
      }

      this.productos.tabla.loading = true

      await this.$api.post("/productos", params).then(data => {

        this.productos.tabla.loading = false
        this.productos.listado = data
        this.productos.listado.forEach(producto => {

          producto.img = producto.img + '#' + new Date().getTime()

        })

      }).catch(data => {
        console.error(data)
        this.$alert.error('Ocurrió un error interno, vuelve a intentarlo', 'Error Interno')
        this.productos.tabla.loading = false
      })

    },

    async ObtenerNegocios(){

      let params = {
        usuarioId: JSON.parse(sessionStorage.getItem('usuario')).id
      }

      await this.$api.post("/negocios/usuario", params).then(data => {

        this.negocios.listado = data
        this.negocios.seleccionado = Object.assign({}, data[0])
        this.ObtenerProductos()

      })

    },

    async ObtenerCaracteristicas(){

      let params = {
        productoId: this.productos.seleccionado.id
      }

      await this.$api.post("/carte/producto", params).then(data => {

        this.productos.seleccionado.carac = data

        this.productos.seleccionado.carac.forEach(caracteristica => {
          caracteristica.dialogo = false
          caracteristica.editar = false
        })

        this.$forceUpdate()

      })

    },

    AbrirIconPicker(caracteristica){

      let ind = this.productos.seleccionado.carac.indexOf(caracteristica)
      this.productos.seleccionado.carac[ind].dialogo = true
      this.$forceUpdate()

    },

    CerrarIconPicker(caracteristica){

      let ind = this.productos.seleccionado.carac.indexOf(caracteristica)
      this.productos.seleccionado.carac[ind].dialogo = false
      this.$forceUpdate()

    },

    SeleccionarImagen() {
      window.addEventListener('focus', () => {
      }, { once: true })

      this.$refs.uploader.click()
    },

    onFileChanged(e) {
      this.productos.seleccionado.nuevaImagen = URL.createObjectURL(e.target.files[0])
      this.productos.seleccionado.archivo = e.target.files[0]
      this.$forceUpdate()
    },

    CambiarImagen(){

      if(this.productos.seleccionado.archivo){

        this.loadCard = true

        let params = {

          id: this.productos.seleccionado.id,
          nombre: this.productos.seleccionado.nombre,
          descripcion: this.productos.seleccionado.descripcion,
          valor: this.productos.seleccionado.valor,
          img: null

        }

        if(this.productos.seleccionado.img){

          let primeraParte = this.productos.seleccionado.img.split("productos")[1].split("%2F")[1]

          let ref = primeraParte.split("?")[0]

          const imagenRef = this.$fire.storage.ref('productos/'+ref)
          imagenRef.delete()

          let idGenerado = (Math.random() + 1).toString(36).substring(2);

          const nuevaRef = this.$fire.storage.ref('productos/'+idGenerado)

          nuevaRef.put(this.productos.seleccionado.archivo).then( response => {

            response.ref.getDownloadURL().then(async (downloadURL) => {

              params.img = downloadURL

              await this.$api.put("/producto", params).then(data => {

                this.ObtenerProductos()
                this.loadCard = false
                this.CerrarDialogoImagenProducto()
                this.$alert.exito('La imagen del producto fue actualizada exitosamente', 'Imagen Actualizada')

              }).catch(data => {
                console.error(data)
                this.$alert.error('Ocurrió un error interno, vuelve a intentarlo', 'Error Interno')
              })

            })

            this.ObtenerProductos()
            this.loadCard = false
            this.$alert.exito('La imagen fue actualizada exitosamente', 'Imagen Actualizada')
            this.CerrarDialogoImagenProducto()

          })

        }
        else {

          let idGenerado = (Math.random() + 1).toString(36).substring(2);

          const imagenRef = this.$fire.storage.ref('productos/'+idGenerado)

          imagenRef.put(this.productos.seleccionado.archivo).then( response => {

            response.ref.getDownloadURL().then(async (downloadURL) => {

              params.img = downloadURL

              await this.$api.put("/producto", params).then(data => {

                this.ObtenerProductos()
                this.loadCard = false
                this.CerrarDialogoImagenProducto()
                this.$alert.exito('La imagen del producto fue actualizada exitosamente', 'Imagen Actualizada')

              }).catch(data => {
                console.error(data)
                this.$alert.error('Ocurrió un error interno, vuelve a intentarlo', 'Error Interno')
              })

              this.window.location.reload()

            })

          })

        }

      }

    },

    async Busqueda(){

    },

    MostrarDialogoNuevo(){
      this.dialogos.producto = true
      this.$refs.frmProducto?.resetValidation()
    },

    MostrarDialogoEditar(producto){
      this.productos.seleccionado = Object.assign({}, producto)
      this.dialogos.producto = true
      this.$refs.frmProducto?.resetValidation()
    },

    MostrarDialogoEditarCaracteristica(caracteristica){

      this.productos.caracteristica_seleccionada = Object.assign({}, caracteristica)
      this.dialogos.editar_caracteristica = true
      this.$refs.frmEditarCaracteristica?.resetValidation()

    },

    MostrarDialogoCambiarImagen(producto){

      this.productos.seleccionado = Object.assign({}, producto)
      this.productos.seleccionado.nuevaImagen = producto.img ?? null
      this.dialogos.imagen = true

    },

    MostrarDialogoEditarCaracteristicas(producto){
      this.productos.seleccionado = Object.assign({}, producto)
      this.ObtenerCaracteristicas()
      this.dialogos.caracteristicas = true
      this.$refs.frmCaracteristica?.resetValidation()
    },

    CerrarDialogoCaracteristicas(){
      this.productos.seleccionado = { carac: [] }
      this.dialogos.caracteristicas = false
    },

    CerrarDialogoProducto(){
      this.productos.seleccionado = { carac: [] }
      this.dialogos.producto = false
    },

    CerrarDialogoImagenProducto(){

      this.productos.seleccionado = { carac: [] }
      this.dialogos.imagen = false

    },

    CerrarDialogoEditarCaracteristica(){

      this.dialogos.editar_caracteristica = false
      this.productos.caracteristica_seleccionada = {}

    },

    async GuardarProducto(){

      if(this.$refs.frmProducto.validate()){

        let idGenerado = (Math.random() + 1).toString(36).substring(2);

        const imagenRef = this.$fire.storage.ref('productos/'+idGenerado)

        imagenRef.put(this.productos.seleccionado.imagen).then( response => {

          response.ref.getDownloadURL().then(async (downloadURL) => {

            let params = {

              nombre: this.productos.seleccionado.nombre,
              descripcion: this.productos.seleccionado.descripcion,
              valor: this.productos.seleccionado.valor,
              img: downloadURL,
              negocioId: this.negocios.seleccionado.id,
              carac: this.productos.seleccionado.carac
            }

            await this.$api.post("/producto", params).then(data => {

              this.ObtenerProductos()
              this.CerrarDialogoProducto()
              this.$alert.exito('El producto fue ingresado exitosamente', 'Producto Ingresado')

            }).catch(data => {
              console.error(data)
              this.$alert.error('Ocurrió un error interno, vuelve a intentarlo', 'Error Interno')
            })

          })

        } )



      }

    },

    async ActualizarProducto(){

      if(this.$refs.frmProducto.validate()){

        let params = {

          id: this.productos.seleccionado.id,
          nombre: this.productos.seleccionado.nombre,
          descripcion: this.productos.seleccionado.descripcion,
          valor: this.productos.seleccionado.valor,
          img: this.productos.seleccionado.img

        }

        await this.$api.put("/producto", params).then(data => {

          this.ObtenerProductos()
          this.CerrarDialogoProducto()
          this.$alert.exito('El producto fue actualizado exitosamente', 'Producto Actualizado')

        }).catch(data => {
          console.error(data)
          this.$alert.error('Ocurrió un error interno, vuelve a intentarlo', 'Error Interno')
        })

      }

    },

    async ActualizarCaracteristica(){

      if(this.$refs.frmEditarCaracteristica.validate()){

        let params = {

          id: this.productos.caracteristica_seleccionada.id,
          nombre: this.productos.caracteristica_seleccionada.nombre,
          valor: this.productos.caracteristica_seleccionada.valor,
          icono: this.productos.caracteristica_seleccionada.icono

        }

        await this.$api.put("/carte", params).then(data => {

          this.ObtenerProductos()
          this.CerrarDialogoProducto()
          this.$alert.exito('El producto fue actualizado exitosamente', 'Producto Actualizado')

        }).catch(data => {
          console.error(data)
          this.$alert.error('Ocurrió un error interno, vuelve a intentarlo', 'Error Interno')
        })

      }

    },

    async EliminarProducto(producto){

      this.$alert.confirm('¿Estás seguro que deseas eliminar este producto o servicio?',
        'Eliminar Producto o Servicio').then(async () => {

        let params = {
          id: producto.id
        }

        await this.$api.delete("/producto", params).then(data => {

          this.ObtenerProductos()
          this.$alert.exito('El producto o servicio fue eliminado exitosamente', 'Producto o Servicio Eliminado')

        }).catch(data => {
          console.error(data)
          this.$alert.error('Ocurrió un error interno, vuelve a intentarlo', 'Error Interno')
        })

      });

    },

    async GuardarCaracteristica(caracteristica){

      if(this.$refs.frmCaracteristica.validate()){

        let params = {
          nombre : caracteristica.nombre,
          valor : caracteristica.valor,
          icono : caracteristica.icono,
          productoId : this.productos.seleccionado.id
        }

        await this.$api.post("/carte", params).then(data => {

          this.ObtenerCaracteristicas()
          this.$alert.exito('La característica fue creada exitosamente', 'Característica Creada')

        }).catch(data => {
          console.error(data)
          this.$alert.error('Ocurrió un error interno, vuelve a intentarlo', 'Error Interno')
        })

      }

    },

    AddCaracteristica(){
      this.productos.seleccionado.carac.push(
        {
          id: -1,
          nombre: '',
          valor: '',
          icono: '',
          dialogo: false,
          editar: false
        }
      )
      this.$forceUpdate()
    },

    RemoverCaracteristica(caracteristica, index){
      if(caracteristica.id > 0){
        this.$alert.confirm('¿Estás seguro que deseas eliminar esta característica?',
          'Eliminar Característica').then(async () => {

            let params = {
              id: caracteristica.id
            }

            await this.$api.delete("/carte", params).then(data => {

              this.ObtenerCaracteristicas()
              this.$alert.exito('La característica fue eliminada exitosamente', 'Característica Eliminada')

            }).catch(data => {
              console.error(data)
              this.$alert.error('Ocurrió un error interno, vuelve a intentarlo', 'Error Interno')
            })

        });
      }
      else{
        this.productos.seleccionado.carac.splice(index, 1)
      }
      this.$forceUpdate()
    },

    LimpiarBusqueda(){
      this.productos.tabla.busqueda = null
      this.productos.tabla.busqueda_texto = null
      this.productos.tabla.check = false
      this.productos.tabla.pagina = 1
      this.ObtenerProductos()
    }

  }

}

</script>
