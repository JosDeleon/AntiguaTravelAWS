(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{848:function(t,e,n){"use strict";n.r(e);var o=n(20),r=(n(8),n(57),n(738)),l={mounted:function(){this.ObtenerHotel(),this.$refs.slideGroup.setWidths()},components:{VueGallerySlideshow:n.n(r).a},data:function(){return{dialogos:{caracteristicas:!1,valoracion:!1},valoracion:{},helpers:{nonce:1,mapSearch:null,busqueda:null},range:[1,1e3],markers:[],places:[],currentPlace:null,marker:{position:{lat:14.55706946331603,lng:-90.73366553217345}},center:{lat:14.55706946331603,lng:-90.73366553217345},mapOptions:{disableDefaultUI:!0},hotel:{},tags:"",productos:{listado:[],seleccionado:{}},index:null,images:["https://placekitten.com/801/800","https://placekitten.com/802/800","https://placekitten.com/803/800","https://placekitten.com/804/800","https://placekitten.com/805/800","https://placekitten.com/806/800","https://placekitten.com/807/800","https://placekitten.com/808/800","https://placekitten.com/809/800","https://placekitten.com/810/800"]}},methods:{ObtenerProductos:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={id:t.hotel.id},e.next=3,t.$api.post("/productos",n);case 3:t.productos.listado=e.sent;case 4:case"end":return e.stop()}}),e)})))()},ObtenerHotel:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$api.post("/negocios/categoria",{categoria:"H"}).then((function(data){data.forEach((function(e){e.id===+t.$route.params.id&&(t.hotel=e)})),t.marker.position.lat=+t.hotel.lat,t.marker.position.lng=+t.hotel.lng,t.center.lat=+t.hotel.lat,t.center.lng=+t.hotel.lng,t.$forceUpdate(),t.ObtenerProductos(),t.ObtenerTags()}));case 2:case"end":return e.stop()}}),e)})))()},ObtenerTags:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$api.post("/tags/negocio",{negocioId:t.hotel.id});case 2:t.hotel.tags=e.sent,t.hotel.tags.forEach((function(e){t.tags+=e.tag+", "})),t.tags=t.tags.substring(0,t.tags.length-2);case 5:case"end":return e.stop()}}),e)})))()},ObtenerCaracteristicas:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={productoId:t.productos.seleccionado.id},e.next=3,t.$api.post("/carte/producto",n);case 3:t.productos.seleccionado.carac=e.sent,t.$forceUpdate();case 5:case"end":return e.stop()}}),e)})))()},MostrarDialogoCaracteristicas:function(t){this.productos.seleccionado=Object.assign({},t),this.dialogos.caracteristicas=!0,this.ObtenerCaracteristicas()},MostrarDialogoValoracion:function(){this.dialogos.valoracion=!0},CerrarDialogoCaracteristicas:function(){this.productos.seleccionado={},this.dialogos.caracteristicas=!1},CerrarDialogoValoracion:function(){this.valoracion={},this.dialogos.valoracion=!1},GaleriaImagenes:function(){this.index=null,this.$router.push({path:"/servicios/hoteles/galeria?id="+this.hotel.id})},VerificarHora:function(){if(this.hotel&&this.hotel.abre&&this.hotel.cierra){var t="hh:mm:ss",time=this.$moment(this.$moment(),t),e=this.$moment(this.hotel.abre,t),n=this.$moment(this.hotel.cierra,t);return time.isBetween(e,n)?"Abierto":"Cerrado"}},FormatTelefono:function(){if(this.hotel.telefono)return this.hotel.telefono.substring(0,4)+" "+this.hotel.telefono.substring(4)},Regresar:function(){this.$router.push({path:"/servicios/hoteles"})}}},c=n(26),v=n(69),m=n.n(v),d=n(763),h=n(259),f=n(157),_=n(262),x=n(79),C=n(719),y=n(737),k=n(727),w=n(255),$=n(93),V=n(779),S=n(196),D=n(201),H=n(721),O=n(256),I=n(158),R=n(41),G=n(134),T=n(261),j=n(254),L=n(771),E=n(724),M=n(160),P=n(816),z=n(725),Q=n(84),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{attrs:{fluid:""}},[n("v-row",[n("v-col",{staticClass:"hidden-sm-and-down",attrs:{cols:"1","align-self":"center"}},[n("v-avatar",{class:"xl"===t.$vuetify.breakpoint.name||"lg"===t.$vuetify.breakpoint.name?"ml-10":"ml-5",attrs:{size:"100",tile:""}},[t.hotel.img?n("v-img",{staticStyle:{"border-radius":"10px"},attrs:{src:t.hotel.img}}):n("v-img",{attrs:{src:"/imagen-no-disponible.png"}})],1)],1),t._v(" "),n("v-col",{attrs:{cols:"12",xl:"11",lg:"11",md:"11",sm:"12"}},[n("v-list",{class:"sm"===t.$vuetify.breakpoint.name||"xs"===t.$vuetify.breakpoint.name?null:"px-10"},[n("v-list-item",[n("v-list-item-title",[n("h1",{staticClass:"black--text hidden-sm-and-down",staticStyle:{"font-size":"24px"}},[t._v("\n              "+t._s(t.hotel.nombre)+"\n            ")]),t._v(" "),n("h3",{staticClass:"black--text hidden-md-and-up",staticStyle:{"font-size":"20px"}},[t._v("\n              "+t._s(t.hotel.nombre)+"\n            ")])])],1),t._v(" "),n("v-list-item",{staticClass:"mt-n2"},[n("v-list-item-title",[n("v-row",{staticClass:"py-4 pl-2"},[n("v-rating",{attrs:{value:4.5,color:"secondary",dense:"","half-increments":"",hover:""}}),t._v(" "),n("div",{staticClass:"grey--text mt-1 ml-1"},[t._v("\n                413 valoraciones |\n                "),n("v-icon",{staticClass:"mx-1",attrs:{small:"",color:"black"}},[t._v(" fa fa-tags ")]),t._v(t._s(t.tags)+"\n\n              ")],1)],1)],1)],1),t._v(" "),n("v-list-item",{staticClass:"mt-n3"},[n("v-list-item-title",[n("v-row",{staticClass:"py-4 px-3"},[n("div",{staticClass:"grey--text mt-1 text-wrap"},[n("v-icon",{staticClass:"mx-1",attrs:{small:"",color:"black"}},[t._v(" fa fa-map-marker-alt ")]),t._v(t._s(t.hotel.direccion)+" |\n                "),n("v-icon",{staticClass:"mx-1",attrs:{small:"",color:"black"}},[t._v(" fa fa-phone ")]),t._v(" (+502) "+t._s(t.FormatTelefono())+" |\n                "),n("v-icon",{staticClass:"mx-1",attrs:{small:"",color:"black"}},[t._v(" fa fa-clock ")]),t._v(" "+t._s(t.$moment(t.hotel.abre,"HH:mm:ss").format("h:mm a"))+" -\n                "+t._s(t.$moment(t.hotel.cierra,"HH:mm:ss").format("h:mm a"))+" ("),n("span",{class:"Cerrado"===t.VerificarHora()?"red--text":"green--text"},[t._v("\n                  "+t._s("Cerrado"===t.VerificarHora()?"No disponible":"Disponible")+"\n                ")]),t._v(")\n\n              ")],1)])],1)],1)],1)],1)],1),t._v(" "),n("v-divider",{staticClass:"my-4"}),t._v(" "),n("v-btn",{class:"sm"===t.$vuetify.breakpoint.name||"xs"===t.$vuetify.breakpoint.name?"my-4 ml-2":"my-4 ml-12",attrs:{color:"secondary",outlined:""},on:{click:t.Regresar}},[n("v-icon",{attrs:{left:"",color:"secondary"}},[t._v("\n      fa fa-arrow-left\n    ")]),t._v("\n    Regresar\n  ")],1),t._v(" "),n("v-slide-group",{ref:"slideGroup",staticClass:"hidden-sm-and-down pa-9",attrs:{"show-arrows":""},scopedSlots:t._u([{key:"next",fn:function(){return[n("v-icon",{attrs:{color:"black"}},[t._v(" fa fa-arrow-right ")])]},proxy:!0},{key:"prev",fn:function(){return[n("v-icon",{attrs:{color:"black"}},[t._v(" fa fa-arrow-left ")])]},proxy:!0}])},[t._v(" "),t._v(" "),t._l(t.images,(function(image,i){return n("div",{key:i},[n("v-slide-item",[n("v-img",{staticClass:"ma-1",staticStyle:{"border-radius":"10px"},attrs:{src:image,"max-width":"400","max-height":"400"},on:{click:function(e){t.index=i}}},[0===i?n("v-container",{attrs:{"fill-height":""}},[n("v-layout",{attrs:{"justify-start":"","align-end":""}},[n("a",{staticStyle:{"text-decoration":"none"}},[n("span",{staticClass:"white--text",on:{click:t.GaleriaImagenes}},[n("v-icon",{attrs:{color:"white"}},[t._v(" fa fa-images")]),t._v("\n                  Ver todas las imágenes ("+t._s(t.images.length)+")\n                ")],1)])])],1):t._e()],1)],1)],1)}))],2),t._v(" "),n("v-img",{staticClass:"ma-1 hidden-md-and-up mx-2",staticStyle:{"border-radius":"10px"},attrs:{src:t.images[0],"max-height":"300"}},[n("v-container",{attrs:{"fill-height":""}},[n("v-layout",{attrs:{"justify-start":"","align-end":""}},[n("a",{staticStyle:{"text-decoration":"none"}},[n("span",{staticClass:"white--text",on:{click:t.GaleriaImagenes}},[n("v-icon",{attrs:{color:"white"}},[t._v(" fa fa-images")]),t._v("\n              Ver todas las imágenes ("+t._s(t.images.length)+")\n            ")],1)])])],1)],1),t._v(" "),n("vue-gallery-slideshow",{attrs:{images:t.images,index:t.index},on:{close:function(e){t.index=null}}}),t._v(" "),n("v-row",{class:"sm"===t.$vuetify.breakpoint.name||"xs"===t.$vuetify.breakpoint.name?"my-5":"px-16 my-5"},[n("v-col",{attrs:{cols:"12",xl:"4",lg:"4"}},[n("v-card",{staticClass:"pa-2",staticStyle:{"border-radius":"15px"},attrs:{elevation:"0",outlined:"","min-height":"md"===t.$vuetify.breakpoint.name||"sm"===t.$vuetify.breakpoint.name||"xs"===t.$vuetify.breakpoint.name?null:390}},[n("v-toolbar",{staticClass:"hidden-sm-and-down",attrs:{elevation:"0",dense:"",color:"transparent"}},[n("h4",[t._v("\n            Calificaciones y valoraciones\n          ")])]),t._v(" "),n("v-toolbar",{staticClass:"hidden-md-and-up",attrs:{elevation:"0",dense:"",color:"transparent"}},[n("h4",[t._v("\n            Calificaciones y valoraciones\n          ")])]),t._v(" "),n("v-card-text",{staticClass:"pa-3"},[n("v-row",{staticClass:"py-4 pl-3"},[n("h2",{staticClass:"black--text mt-1 mr-1"},[t._v("\n              4.5\n            ")]),t._v(" "),n("v-rating",{attrs:{value:4.5,color:"secondary",dense:"","half-increments":"",hover:""}}),t._v(" "),n("div",{staticClass:"grey--text mt-1 ml-1"},[t._v("\n              (413 valoraciones)\n            ")])],1),t._v(" "),n("v-divider",{staticClass:"my-4"}),t._v(" "),n("v-list-item",{staticClass:"ml-n4"},[n("v-list-item-content",[n("v-list-item-title",{staticClass:"font-weight-bold"},[t._v("Descripción")]),t._v(" "),n("v-list-item-subtitle",{staticClass:"mt-2 text-wrap"},[t._v(t._s(t.hotel.descripcion))])],1)],1),t._v(" "),n("v-divider",{staticClass:"my-4"}),t._v(" "),n("v-row",{staticClass:"pt-n6 mt-4"},[n("h3",{staticClass:"ml-3 black--text"},[t._v("\n              Horario\n            ")]),t._v(" "),n("v-col",{attrs:{cols:"12"}},[n("v-list",{staticClass:"ml-n4 mt-n2"},[n("v-list-item",[n("v-list-item-icon",[n("v-icon",{attrs:{color:"black"}},[t._v("\n                      fa fa-clock\n                    ")])],1),t._v(" "),n("v-list-item-content",[n("v-list-item-title",[t._v("\n                      "+t._s(t.$moment(t.hotel.abre,"HH:mm:ss").format("h:mm a"))+" -\n                      "+t._s(t.$moment(t.hotel.cierra,"HH:mm:ss").format("h:mm a"))+" ("),n("span",{class:"Cerrado"===t.VerificarHora()?"red--text":"green--text"},[t._v("\n                        "+t._s("Cerrado"===t.VerificarHora()?"No disponible":"Disponible"))]),t._v(")\n                    ")])],1)],1)],1)],1)],1)],1)],1)],1),t._v(" "),n("v-col",{attrs:{cols:"12",xl:"4",lg:"4"}},[n("v-card",{staticClass:"pa-2",staticStyle:{"border-radius":"15px"},attrs:{elevation:"0",outlined:"","min-height":"md"===t.$vuetify.breakpoint.name||"sm"===t.$vuetify.breakpoint.name||"xs"===t.$vuetify.breakpoint.name?null:390}},[n("v-toolbar",{staticClass:"hidden-sm-and-down",attrs:{elevation:"0",dense:"",color:"transparent"}},[n("h4",[t._v("\n            Detalles Generales\n          ")])]),t._v(" "),n("v-toolbar",{staticClass:"hidden-md-and-up",attrs:{elevation:"0",dense:"",color:"transparent"}},[n("h4",[t._v("\n            Detalles Generales\n          ")])]),t._v(" "),n("v-card-text",{staticClass:"pa-3"},[n("v-row",{staticClass:"pt-n6"},[n("v-list",{staticClass:"mt-n4"},[n("v-list-item",[n("v-list-item-content",[n("v-list-item-title",[t._v("Rango de precios")]),t._v(" "),n("v-list-item-subtitle",{staticClass:"mt-2"},[t._v("GTQ 23 - GTQ 77")])],1)],1),t._v(" "),n("v-list-item",[n("v-list-item-content",[n("v-list-item-title",[t._v("Servicios que ofrecen")]),t._v(" "),n("v-list-item-subtitle",{staticClass:"mt-2 text-wrap"},[t._v(t._s(t.tags))])],1)],1)],1)],1),t._v(" "),n("v-divider",{staticClass:"my-4"}),t._v(" "),n("v-row",{staticClass:"pt-n6 mt-4"},[n("h3",{staticClass:"ml-3 black--text"},[t._v("\n              Datos\n            ")]),t._v(" "),n("v-col",{attrs:{cols:"12"}},[n("v-list",{staticClass:"ml-n4 mt-n2"},[n("v-list-item",[n("v-list-item-icon",[n("v-icon",{attrs:{color:"black"}},[t._v("\n                      fa fa-phone\n                    ")])],1),t._v(" "),n("v-list-item-content",[n("v-list-item-title",[t._v("Teléfono: (+502) "+t._s(t.FormatTelefono())+" ")])],1)],1),t._v(" "),n("v-list-item",[n("v-list-item-icon",[n("v-icon",{attrs:{color:"black"}},[t._v("\n                      fa fa-map-marker-alt\n                    ")])],1),t._v(" "),n("v-list-item-content",[n("v-list-item-title",{staticClass:"text-wrap"},[t._v("Dirección: "+t._s(t.hotel.direccion))])],1)],1)],1)],1)],1)],1)],1)],1),t._v(" "),n("v-col",{attrs:{cols:"12",xl:"4",lg:"4"}},[n("v-card",{staticClass:"pa-2",staticStyle:{"border-radius":"15px"},attrs:{elevation:"0",outlined:"","min-height":"md"===t.$vuetify.breakpoint.name||"sm"===t.$vuetify.breakpoint.name||"xs"===t.$vuetify.breakpoint.name?null:390}},[n("v-toolbar",{staticClass:"hidden-sm-and-down",attrs:{elevation:"0",dense:"",color:"transparent"}},[n("h4",[t._v("\n            Ubicación\n          ")])]),t._v(" "),n("v-toolbar",{staticClass:"hidden-md-and-up",attrs:{elevation:"0",dense:"",color:"transparent"}},[n("h4",[t._v("\n            Ubicación\n          ")])]),t._v(" "),n("v-card-text",{staticClass:"pa-3"},[n("GmapMap",{ref:"mapRef",staticClass:"pa-2",staticStyle:{"max-height":"80vmin","min-height":"30vmin"},attrs:{center:t.center,zoom:18,"map-style-id":"roadmap",options:t.mapOptions}},[n("GmapMarker",{attrs:{position:t.marker.position,clickable:!1,draggable:!1}})],1)],1)],1)],1)],1),t._v(" "),n("v-row",{class:"sm"===t.$vuetify.breakpoint.name||"xs"===t.$vuetify.breakpoint.name?"mb-5":"px-16 mb-5"},[n("v-col",{attrs:{cols:"12"}},[n("v-card",{staticClass:"pa-2",staticStyle:{"border-radius":"15px"},attrs:{elevation:"0",outlined:""}},[n("v-toolbar",{staticClass:"hidden-sm-and-down",attrs:{elevation:"0",dense:"",color:"transparent","min-height":"60"}},[n("h2",[t._v("\n            Productos o servicios que brinda\n          ")])]),t._v(" "),n("v-toolbar",{staticClass:"hidden-md-and-up",attrs:{elevation:"0",dense:"",color:"transparent","min-height":"60"}},[n("h3",[t._v("\n            Productos o servicios que brinda\n          ")])]),t._v(" "),n("v-divider"),t._v(" "),n("v-card-text",{staticClass:"pa-4"},[t.productos.listado&&0===t.productos.listado.length?n("v-alert",{attrs:{border:"left","colored-border":"",type:"warning",elevation:"2"}},[t._v("\n            Lo sentimos, este guía turístico aún no cuenta con productos o servicios\n          ")]):t._e(),t._v(" "),n("v-row",t._l(t.productos.listado,(function(e,i){return n("v-col",{key:i,attrs:{cols:"12",xl:"4",lg:"4"}},[n("v-hover",{scopedSlots:t._u([{key:"default",fn:function(o){var r=o.hover;return[n("v-card",{staticClass:"mx-auto",staticStyle:{"border-radius":"15px"},attrs:{color:"grey lighten-4","min-width":"450",elevation:"0",outlined:"","max-width":"sm"===t.$vuetify.breakpoint.name||"xs"===t.$vuetify.breakpoint.name?null:400}},[n("v-img",{attrs:{"aspect-ratio":16/9,contain:!e.img,src:e.img?e.img:"/imagen-no-disponible.png"}},[n("v-expand-transition",[r?n("div",{staticClass:"d-flex transition-fast-in-fast-out tertiary darken-2 v-card--reveal text-h2 white--text",staticStyle:{height:"100%"}},[n("v-container",{attrs:{"fill-height":""}},[n("v-layout",{attrs:{"justify-center":"","align-center":""}},[t._v("\n                            Q. "+t._s(e.valor)+"\n                          ")])],1)],1):t._e()])],1),t._v(" "),n("v-card-text",{staticClass:"pa4"},[n("h2",{staticClass:"font-weight-light black--text mb-2"},[t._v("\n                      "+t._s(e.nombre)+"\n                    ")]),t._v(" "),n("div",{staticClass:"font-weight-light mb-2"},[t._v("\n                      "+t._s(e.descripcion)+"\n                    ")])]),t._v(" "),n("v-divider",{staticClass:"my-4"}),t._v(" "),n("v-card-actions",[n("v-btn",{attrs:{color:"black",outlined:""},on:{click:function(n){return t.MostrarDialogoCaracteristicas(e)}}},[n("v-icon",{attrs:{left:"",color:"primary darken-1"}},[t._v("\n                        fa fa-shopping-cart\n                      ")]),t._v("\n                      ¿Qué ofrece?\n                    ")],1)],1)],1)]}}],null,!0)})],1)})),1)],1)],1)],1)],1),t._v(" "),n("v-row",{class:"sm"===t.$vuetify.breakpoint.name||"xs"===t.$vuetify.breakpoint.name?"mb-5":"px-16 mb-5"},[n("v-col",{attrs:{cols:"12"}},[n("v-card",{staticClass:"pa-2",staticStyle:{"border-radius":"15px"},attrs:{elevation:"0",outlined:""}},[n("v-toolbar",{staticClass:"hidden-sm-and-down",attrs:{elevation:"0",dense:"",color:"transparent","min-height":"60"}},[n("h2",[t._v("\n            Valoraciones\n          ")]),t._v(" "),n("v-spacer"),t._v(" "),n("v-btn",{staticClass:"mt-1",staticStyle:{"border-radius":"5px"},attrs:{elevation:"0",color:"secondary",dark:""},on:{click:t.MostrarDialogoValoracion}},[n("v-icon",{attrs:{left:""}},[t._v("\n              fa fa-comment\n            ")]),t._v("\n            Escribe un reseña\n          ")],1)],1),t._v(" "),n("v-toolbar",{staticClass:"hidden-md-and-up",attrs:{elevation:"0",dense:"",color:"transparent","min-height":"60"}},[n("h3",[t._v("\n            Valoraciones\n          ")]),t._v(" "),n("v-spacer"),t._v(" "),n("v-btn",{staticClass:"mt-1",staticStyle:{"border-radius":"5px"},attrs:{elevation:"0",color:"secondary",dark:"",small:""},on:{click:t.MostrarDialogoValoracion}},[n("v-icon",{attrs:{left:""}},[t._v("\n              fa fa-comment\n            ")]),t._v("\n            Escribe un reseña\n          ")],1)],1),t._v(" "),n("v-divider"),t._v(" "),n("v-card-text",{staticClass:"pa-4"},[n("v-alert",{attrs:{border:"left","colored-border":"",type:"warning",elevation:"2"}},[t._v("\n            Lo sentimos, este guía turístico aún no cuenta con reseñas\n          ")])],1)],1)],1)],1),t._v(" "),n("v-dialog",{attrs:{transition:"fab-transition",scrollable:"",persistent:"","max-width":"550px"},model:{value:t.dialogos.caracteristicas,callback:function(e){t.$set(t.dialogos,"caracteristicas",e)},expression:"dialogos.caracteristicas"}},[n("v-card",[n("v-toolbar",{attrs:{elevation:"0",dense:"",color:"transparent"}},[n("v-btn",{attrs:{icon:""},on:{click:t.CerrarDialogoCaracteristicas}},[n("v-icon",[t._v("fa fa-times")])],1),t._v(" "),n("v-layout",{attrs:{"justify-center":""}},[n("h4",[t._v(" ¿Qué ofrece este producto? ")])])],1),t._v(" "),n("v-card-text",{staticClass:"pa-4"},[n("v-list",t._l(t.productos.seleccionado.carac,(function(e){return n("v-list-item",{key:e.id},[n("v-list-item",[n("v-list-item-icon",[n("v-icon",{attrs:{color:"black"}},[t._v("\n                  "+t._s(e.icono)+"\n                ")])],1),t._v(" "),n("v-list-item-content",[n("v-list-item-title",[t._v(t._s(e.nombre)+" ")]),t._v(" "),n("v-list-item-subtitle",[t._v(t._s(e.valor)+" ")])],1)],1)],1)})),1)],1)],1)],1),t._v(" "),n("v-dialog",{attrs:{transition:"fab-transition",scrollable:"",persistent:"","max-width":"550px"},model:{value:t.dialogos.valoracion,callback:function(e){t.$set(t.dialogos,"valoracion",e)},expression:"dialogos.valoracion"}},[n("v-card",[n("v-toolbar",{attrs:{elevation:"0",dense:"",color:"transparent"}},[n("v-btn",{attrs:{icon:""},on:{click:t.CerrarDialogoValoracion}},[n("v-icon",[t._v("fa fa-times")])],1),t._v(" "),n("v-layout",{attrs:{"justify-center":""}},[n("h4",[t._v(" Escribe una reseña acerca de este guía ")])])],1),t._v(" "),n("v-card-text",{staticClass:"pa-4"})],1)],1),t._v(" "),n("v-overlay",{attrs:{value:t.$store.state.loading}},[n("v-progress-circular",{attrs:{indeterminate:"",size:"64"}})],1)],1)}),[],!1,null,null,null);e.default=component.exports;m()(component,{VAlert:d.a,VAvatar:h.a,VBtn:f.a,VCard:_.a,VCardActions:x.a,VCardText:x.c,VCol:C.a,VContainer:y.a,VDialog:k.a,VDivider:w.a,VExpandTransition:$.a,VHover:V.a,VIcon:S.a,VImg:D.a,VLayout:H.a,VList:O.a,VListItem:I.a,VListItemContent:R.a,VListItemIcon:G.a,VListItemSubtitle:R.b,VListItemTitle:R.c,VOverlay:T.a,VProgressCircular:j.a,VRating:L.a,VRow:E.a,VSlideGroup:M.b,VSlideItem:P.a,VSpacer:z.a,VToolbar:Q.a})}}]);