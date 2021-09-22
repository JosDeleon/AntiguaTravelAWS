(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{797:function(e,t,o){"use strict";o.r(t);var r=o(25);o(70),o(31),o(5),o(21),o(63);var n={mounted:function(){},head:function(){return{titleTemplate:"Registra tu negocio | Súmate a Antigua Travel"}},layout:"empty",data:function(){return{helpers:{step:1,colores:["green","purple","indigo","cyan","teal","orange"],nonce:1,mapSearch:null,busqueda:null},markers:[],places:[],currentPlace:null,lista_tags:[{header:"Selecciona o crea un tag"},{text:"Comida italiana",color:"green"},{text:"Comida rápida",color:"orange"},{text:"Comida argentina",color:"blue"},{text:"Comida típica",color:"red"},{text:"Autos deportivos",color:"indigo"},{text:"Sedan",color:"green"},{text:"Hatchbacks",color:"teal"},{text:"SUV",color:"cyan"},{text:"Al aire libre",color:"blue"},{text:"Montaña",color:"green"},{text:"Entretenimiento",color:"orange"}],categorias:[{titulo:"Hotel",valor:"H",imagen:"https://exp.cdn-hotels.com/hotels/21000000/20040000/20038200/20038172/e65bae19_z.jpg?impolicy=fcrop&w=500&h=333&q=medium"},{titulo:"Restaurante",valor:"R",imagen:"https://media-cdn.tripadvisor.com/media/photo-s/19/49/3d/2a/restaurante-el-arco.jpg"},{titulo:"Renta de Carros",valor:"RC",imagen:"https://www.motoryracing.com/images/noticias/24000/24823/3.jpg"},{titulo:"Destino Turístico",valor:"D",imagen:"https://laantigua.files.wordpress.com/2019/03/foto-40sfdogstar-cerro-de-la-cruz.jpg"}],negocio:{},tags:[],marker:{position:{lat:14.55706946331603,lng:-90.73366553217345}},center:{lat:14.55706946331603,lng:-90.73366553217345},mapOptions:{disableDefaultUI:!0}}},watch:{tags:function(e,t){var o=this;e.length!==t.length&&(this.tags=e.map((function(e){return"string"==typeof e&&(e={text:e,color:o.helpers.colores[o.helpers.nonce-1]},o.lista_tags.push(e),o.helpers.nonce++,o.$forceUpdate()),e})))}},methods:{VerificarForma:function(){1===this.helpers.step&&this.$refs.formDatosNegocio.validate()&&this.helpers.step++},RegistrarNegocio:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var o,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(2!==e.helpers.step||!e.$refs.formaTags.validate()){t.next=6;break}return o=[],e.tags.forEach((function(e){o.push(e.text)})),r={nombre:e.negocio.nombre,telefono:e.negocio.telefono,direccion:e.negocio.direccion,descripcion:e.negocio.descripcion,categoria:e.categorias[e.negocio.categoria].valor,tags:o,abre:e.negocio.abre,cierra:e.negocio.cierra,coordenadas:{latitud:e.marker.position.lat,longitud:e.marker.position.lng},usuarioId:JSON.parse(sessionStorage.getItem("usuario")).id},t.next=6,e.$api.post("/negocio",r,{headers:(n=void 0,n=JSON.parse(sessionStorage.getItem("usuario")),n.accesToken?{"x-access-token":n.accesToken}:{})}).then((function(data){e.$alert.registro_exitoso(),e.$router.push({path:"/"})})).catch((function(data){e.$alert.error("Ocurrió un error en el registro, vuelve a intentarlo","Error Interno")}));case 6:case"end":return t.stop()}var n}),t)})))()},setPlace:function(e){if(this.currentPlace=e,this.currentPlace){var marker={lat:this.currentPlace.geometry.location.lat(),lng:this.currentPlace.geometry.location.lng()};this.markers.push({position:marker}),this.places.push(this.currentPlace),this.marker.position=marker,this.currentPlace=null,this.panToMarker()}},filter:function(e,t,o){if(e.header)return!1;var r=function(e){return null!=e?e:""},text=r(o),n=r(t);return text.toString().toLowerCase().indexOf(n.toString().toLowerCase())>-1},geolocate:function(){var e=this;navigator.geolocation.getCurrentPosition((function(t){e.marker.position={lat:t.coords.latitude,lng:t.coords.longitude},e.center.lat=t.coords.latitude,e.center.lng=t.coords.longitude,e.panToMarker()}))},handleMarkerDrag:function(e){this.marker.position={lat:e.latLng.lat(),lng:e.latLng.lng()}},panToMarker:function(){this.$refs.mapRef.panTo(this.marker.position);try{this.$refs.mapRef.setZoom(18)}catch(e){}},handleMapClick:function(e){this.marker.position={lat:e.latLng.lat(),lng:e.latLng.lng()},console.log(e)}}},c=o(27),l=o(102),d=o.n(l),m=o(152),v=o(242),h=o(109),f=o(243),_=o(724),k=o(707),x=o(726),w=o(235),y=o(709),C=o(187),V=o(192),S=o(790),$=o(53),I=o(701),T=o(153),R=o(238),j=o(37),L=o(725),M=o(92),D=o(704),P=o(97),z=o(791),O=o(807),A=o(250),N=o(711),component=Object(c.a)(n,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("v-row",{attrs:{justify:"center",align:"center"}},[o("v-col",{staticClass:"hidden-sm-and-down",attrs:{cols:"12",sm:"10",md:"10",lg:"9"}},[o("v-card",{staticStyle:{"border-radius":"10px"}},[o("v-img",{staticStyle:{"border-radius":"10px"},attrs:{"min-height":"800",src:"https://www.wanderherway.com/wp-content/uploads/2021/01/IMG_3248-scaled.jpeg","lazy-src":"https://www.wanderherway.com/wp-content/uploads/2021/01/IMG_3248-scaled.jpeg"}},[o("v-container",[o("v-layout",{attrs:{"justify-center":""}},[o("v-card",{staticStyle:{"border-radius":"10px"},attrs:{"min-width":"400",width:"600"}},[o("v-card-text",{staticClass:"pa-4"},[o("h2",{staticClass:"mb-5 black--text"},[e._v("\n                  Registro de tu negocio\n                ")]),e._v(" "),o("v-window",{model:{value:e.helpers.step,callback:function(t){e.$set(e.helpers,"step",t)},expression:"helpers.step"}},[o("v-window-item",{attrs:{value:1}},[o("v-card-text",{staticClass:"pa-4"},[o("h3",{staticClass:"black--text mb-4"},[e._v("Indica la información general de tu negocio")]),e._v(" "),o("v-form",{ref:"formDatosNegocio"},[o("v-text-field",{attrs:{label:"Nombre del negocio",color:"black",autocomplete:"new-password",outlined:"",dense:"",rules:[function(e){return e&&e.length>0||"El nombre es obligatorio"}],"prepend-icon":"fa fa-city"},model:{value:e.negocio.nombre,callback:function(t){e.$set(e.negocio,"nombre",t)},expression:"negocio.nombre"}}),e._v(" "),o("v-text-field",{attrs:{label:"Teléfono del negocio",color:"black",autocomplete:"new-password",outlined:"",dense:"",type:"number",prefix:"(+502)",rules:[function(e){return!!e||"El teléfono es obligatorio"}],"prepend-icon":"fa fa-phone"},model:{value:e.negocio.telefono,callback:function(t){e.$set(e.negocio,"telefono",t)},expression:"negocio.telefono"}}),e._v(" "),o("v-textarea",{attrs:{outlined:"",dense:"","no-resize":"",clearable:"","clear-icon":"fa fa-times-circle",rules:[function(e){return e&&e.length>0||"La dirección es obligatoria"}],rows:"3",label:"Dirección del negocio","prepend-icon":"fa fa-map-marker-alt",color:"black"},model:{value:e.negocio.direccion,callback:function(t){e.$set(e.negocio,"direccion",t)},expression:"negocio.direccion"}}),e._v(" "),o("v-textarea",{attrs:{outlined:"",dense:"","no-resize":"",clearable:"","clear-icon":"fa fa-times-circle",rules:[function(e){return e&&e.length>0||"La descripción es obligatoria"}],rows:"3",label:"Descripción del negocio","prepend-icon":"fa fa-edit",color:"black"},model:{value:e.negocio.descripcion,callback:function(t){e.$set(e.negocio,"descripcion",t)},expression:"negocio.descripcion"}}),e._v(" "),o("v-divider",{staticClass:"mb-4"}),e._v(" "),o("div",[o("h3",{staticClass:"black--text mb-4"},[e._v("Selecciona el horario en el que operas")]),e._v(" "),o("v-row",{attrs:{justify:"space-around",align:"center"}},[o("v-col",[o("h3",{staticClass:"black--text mb-2"},[e._v("Hora que abres")]),e._v(" "),o("v-time-picker",{attrs:{landscape:"",color:"secondary"},model:{value:e.negocio.abre,callback:function(t){e.$set(e.negocio,"abre",t)},expression:"negocio.abre"}})],1),e._v(" "),o("v-col",[o("h3",{staticClass:"black--text mb-2"},[e._v("Hora que cierras")]),e._v(" "),o("v-time-picker",{attrs:{landscape:"",color:"secondary"},model:{value:e.negocio.cierra,callback:function(t){e.$set(e.negocio,"cierra",t)},expression:"negocio.cierra"}})],1)],1)],1)],1),e._v(" "),o("v-divider",{staticClass:"my-6"}),e._v(" "),o("h3",{staticClass:"black--text my-4"},[e._v("Selecciona la ubicación de tu negocio")]),e._v(" "),o("v-row",{staticClass:"mt-4"},[o("v-col",{attrs:{cols:"1"}},[o("v-icon",{staticClass:"mt-n3"},[e._v("\n                            fa fa-search\n                          ")])],1),e._v(" "),o("v-col",{staticClass:"ml-n3 mt-n3",attrs:{cols:"11"}},[o("gmap-autocomplete",{staticClass:"w-50 pa-2",staticStyle:{width:"70%",border:"1px solid grey","font-size":"16px","border-radius":"3px"},attrs:{"select-first-on-enter":!0,options:{fields:["geometry","formatted_address","address_components"]}},on:{place_changed:e.setPlace}})],1)],1),e._v(" "),o("br"),e._v(" "),o("GmapMap",{ref:"mapRef",staticClass:"pa-2",staticStyle:{width:"100vmin",height:"40vmin"},attrs:{center:e.center,zoom:18,"map-style-id":"roadmap",options:e.mapOptions},on:{click:e.handleMapClick}},[o("GmapMarker",{attrs:{position:e.marker.position,clickable:!0,draggable:!0},on:{drag:e.handleMarkerDrag,click:e.panToMarker}})],1),e._v(" "),o("v-btn",{staticClass:"mt-2 pa-4",attrs:{small:"",color:"secondary"},on:{click:e.geolocate}},[o("v-icon",{attrs:{left:""}},[e._v("\n                          fa fa-map-marker-alt\n                        ")]),e._v("\n                        Ubicación actual\n                      ")],1)],1)],1),e._v(" "),o("v-window-item",{attrs:{value:2}},[o("v-card-text",{staticClass:"pa-4"},[o("v-item-group",{attrs:{mandatory:""},model:{value:e.negocio.categoria,callback:function(t){e.$set(e.negocio,"categoria",t)},expression:"negocio.categoria"}},[o("v-container",[o("v-row",[e._l(e.categorias,(function(t){return o("v-col",{key:t.valor,attrs:{cols:"12"}},[o("v-item",{scopedSlots:e._u([{key:"default",fn:function(r){var n=r.active,c=r.toggle;return[o("v-card",{staticClass:"d-flex align-center",staticStyle:{"border-radius":"10px"},attrs:{outlined:n,height:"120",elevation:"1",color:n?"grey lighten-2":""},on:{click:c}},[o("v-scroll-y-transition",[o("v-list-item",[o("v-list-item-content",[o("v-list-item-title",{staticClass:"text-h6 mb-1"},[e._v("\n                                          "+e._s(t.titulo)+"\n                                        ")])],1),e._v(" "),o("v-list-item-avatar",{attrs:{tile:"",size:"80"}},[o("v-img",{staticStyle:{"border-radius":"10px"},attrs:{src:t.imagen,"lazy-src":t.imagen}})],1)],1)],1)],1)]}}],null,!0)})],1)})),e._v(" "),o("v-col",{attrs:{cols:"12"}},[o("v-form",{ref:"formaTags"},[o("v-combobox",{staticStyle:{"border-radius":"10px"},attrs:{filter:e.filter,"hide-no-data":!e.helpers.busqueda,items:e.lista_tags,"search-input":e.helpers.busqueda,"hide-selected":"",label:"Selecciona lo que describe mejor tu negocio",rules:[function(e){return e&&e.length>0||"Debes seleccionar al menos un tag"}],multiple:"","small-chips":"",solo:"",color:"black"},on:{"update:searchInput":function(t){return e.$set(e.helpers,"busqueda",t)},"update:search-input":function(t){return e.$set(e.helpers,"busqueda",t)}},scopedSlots:e._u([{key:"no-data",fn:function(){return[o("v-list-item",[o("span",{staticClass:"subheading mr-2"},[e._v("Crear el tag ")]),e._v(" "),o("v-chip",{attrs:{color:e.helpers.colores[e.helpers.nonce-1]+" lighten-3",label:"",small:""}},[e._v("\n                                        "+e._s(e.helpers.busqueda)+"\n                                      ")])],1)]},proxy:!0},{key:"selection",fn:function(t){var r=t.attrs,n=t.item,c=t.parent,l=t.selected;return[n===Object(n)?o("v-chip",e._b({attrs:{color:n.color+" lighten-3","input-value":l,label:"",small:""}},"v-chip",r,!1),[o("span",{staticClass:"pr-2"},[e._v("\n                                        "+e._s(n.text)+"\n                                      ")]),e._v(" "),o("v-icon",{attrs:{small:""},on:{click:function(e){return c.selectItem(n)}}},[e._v("\n                                        $delete\n                                      ")])],1):e._e()]}},{key:"item",fn:function(t){t.index;var r=t.item;return[o("v-chip",{attrs:{color:r.color+" lighten-3",dark:"",label:"",small:""}},[e._v("\n                                      "+e._s(r.text)+"\n                                    ")])]}}]),model:{value:e.tags,callback:function(t){e.tags=t},expression:"tags"}})],1)],1)],2)],1)],1)],1)],1)],1)],1),e._v(" "),o("v-divider"),e._v(" "),o("v-card-actions",[o("v-btn",{attrs:{disabled:1===e.helpers.step,text:""},on:{click:function(t){e.helpers.step--}}},[e._v("\n                  Atrás\n                ")]),e._v(" "),o("v-spacer"),e._v(" "),e.helpers.step<2?o("v-btn",{attrs:{color:"primary",depressed:""},on:{click:e.VerificarForma}},[o("div",{staticStyle:{color:"rgba(0,0,0,0.8)"}},[e._v("\n                    Siguiente\n                  ")])]):o("v-btn",{attrs:{color:"primary",depressed:""},on:{click:e.RegistrarNegocio}},[o("div",{staticStyle:{color:"rgba(0,0,0,0.8)"}},[e._v("\n                    Registrarse\n                  ")])])],1)],1)],1)],1)],1)],1)],1),e._v(" "),o("v-col",{staticClass:"hidden-md-and-up",attrs:{cols:"12"}},[o("div",{staticClass:"pa-4"},[o("h2",{staticClass:"black--text font-weight-bold"},[e._v("\n        Atrevete a ser parte de algo grande\n      ")]),e._v(" "),o("h5",[e._v("\n        Dale la oportunidad a tu negocio de despegar de la mejor manera\n      ")])]),e._v(" "),o("v-card",[o("v-card-text",{staticClass:"pa-4"},[o("h2",{staticClass:"mb-5 black--text"},[e._v("\n          Registro de tu negocio\n        ")])])],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;d()(component,{VBtn:m.a,VCard:v.a,VCardActions:h.a,VCardText:h.b,VChip:f.a,VCol:_.a,VCombobox:k.a,VContainer:x.a,VDivider:w.a,VForm:y.a,VIcon:C.a,VImg:V.a,VItem:S.a,VItemGroup:$.b,VLayout:I.a,VListItem:T.a,VListItemAvatar:R.a,VListItemContent:j.a,VListItemTitle:j.c,VRow:L.a,VScrollYTransition:M.f,VSpacer:D.a,VTextField:P.a,VTextarea:z.a,VTimePicker:O.a,VWindow:A.a,VWindowItem:N.a})}}]);