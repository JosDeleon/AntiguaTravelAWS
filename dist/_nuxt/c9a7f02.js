(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{809:function(e,t,r){"use strict";r.r(t);var o=r(20),n=(r(56),r(33),r(7),r(21),r(57),{mounted:function(){},head:function(){return{titleTemplate:"Registra tu negocio | Súmate a Antigua Travel"}},layout:"empty",data:function(){return{helpers:{step:1,colores:["green","purple","indigo","cyan","teal","orange"],nonce:1,mapSearch:null,busqueda:null},markers:[],places:[],currentPlace:null,lista_tags:[{header:"Selecciona o crea un tag"},{text:"Dólares",color:"green"},{text:"Quetzales",color:"orange"},{text:"Euros",color:"blue"},{text:"Libras",color:"blue"},{text:"Horario flexible",color:"blue"}],negocio:{},tags:[],marker:{position:{lat:14.55706946331603,lng:-90.73366553217345}},center:{lat:14.55706946331603,lng:-90.73366553217345},mapOptions:{disableDefaultUI:!0}}},watch:{tags:function(e,t){var r=this;e.length!==t.length&&(this.tags=e.map((function(e){return"string"==typeof e&&(e={text:e,color:r.helpers.colores[r.helpers.nonce-1]},r.lista_tags.push(e),r.helpers.nonce++,r.$forceUpdate()),e})))}},methods:{VerificarForma:function(){1===this.helpers.step&&this.$refs.formDatosNegocio.validate(),this.helpers.step++},RegistrarNegocio:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var r,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=[],e.tags.forEach((function(e){r.push(e.text)})),o={nombre:e.negocio.nombre,telefono:e.negocio.telefono,direccion:e.negocio.direccion,descripcion:e.negocio.descripcion,categoria:"C",tags:r,abre:e.negocio.abre,cierra:e.negocio.cierra,coordenadas:{latitud:e.marker.position.lat,longitud:e.marker.position.lng},usuarioId:JSON.parse(sessionStorage.getItem("usuario")).id},t.next=5,e.$api.post("/negocio",o).then((function(data){e.$alert.registro_exitoso(),e.$router.push({path:"/"})})).catch((function(data){console.error(data),e.$alert.error("Ocurrió un error en el registro, vuelve a intentarlo","Error Interno")}));case 5:case"end":return t.stop()}}),t)})))()},setPlace:function(e){if(this.currentPlace=e,this.currentPlace){var marker={lat:this.currentPlace.geometry.location.lat(),lng:this.currentPlace.geometry.location.lng()};this.markers.push({position:marker}),this.places.push(this.currentPlace),this.marker.position=marker,this.currentPlace=null,this.panToMarker()}},filter:function(e,t,r){if(e.header)return!1;var o=function(e){return null!=e?e:""},text=o(r),n=o(t);return text.toString().toLowerCase().indexOf(n.toString().toLowerCase())>-1},geolocate:function(){var e=this;navigator.geolocation.getCurrentPosition((function(t){e.marker.position={lat:t.coords.latitude,lng:t.coords.longitude},e.center.lat=t.coords.latitude,e.center.lng=t.coords.longitude,e.panToMarker()}))},handleMarkerDrag:function(e){this.marker.position={lat:e.latLng.lat(),lng:e.latLng.lng()}},panToMarker:function(){this.$refs.mapRef.panTo(this.marker.position);try{this.$refs.mapRef.setZoom(18)}catch(e){}},handleMapClick:function(e){this.marker.position={lat:e.latLng.lat(),lng:e.latLng.lng()},console.log(e)}}}),c=r(26),l=r(67),d=r.n(l),m=r(155),v=r(259),f=r(78),h=r(260),k=r(710),_=r(721),x=r(728),C=r(252),w=r(719),y=r(190),S=r(195),V=r(712),$=r(156),M=r(715),T=r(716),A=r(99),P=r(772),j=r(818),I=r(266),N=r(723),component=Object(c.a)(n,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-row",{attrs:{justify:"center",align:"center"}},[r("v-col",{attrs:{cols:"12",sm:"10",md:"10",lg:"9"}},[r("v-card",{staticStyle:{"border-radius":"10px"}},[r("v-img",{staticStyle:{"border-radius":"10px"},attrs:{"min-height":"900","max-height":"1100",src:"https://elcomercio.pe/resizer/EFi-q5JXzfA8p4uDIRbwXANtqHM=/1200x675/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/NE6ATAPMMFCBNG2WOCPZAXMTSA.jpg","lazy-src":"https://elcomercio.pe/resizer/EFi-q5JXzfA8p4uDIRbwXANtqHM=/1200x675/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/NE6ATAPMMFCBNG2WOCPZAXMTSA.jpg"}},[r("v-container",[r("v-layout",{attrs:{"justify-center":""}},[r("v-card",{staticStyle:{"border-radius":"10px"},attrs:{"min-width":"400",width:"700"}},[r("v-card-text",{staticClass:"pa-4"},[r("h2",{staticClass:"mb-5 black--text"},[e._v("\n                  Registro para Cambista\n                ")]),e._v(" "),r("v-window",{model:{value:e.helpers.step,callback:function(t){e.$set(e.helpers,"step",t)},expression:"helpers.step"}},[r("v-window-item",{attrs:{value:1}},[r("v-card-text",{staticClass:"pa-4"},[r("h3",{staticClass:"black--text mb-4"},[e._v("Información para que puedan contactarte")]),e._v(" "),r("v-form",{ref:"formDatosNegocio"},[r("v-text-field",{attrs:{label:"Nombre Completo",color:"black",autocomplete:"new-password",outlined:"",dense:"",rules:[function(e){return e&&e.length>0||"El nombre es obligatorio"}],"prepend-icon":"fa fa-city"},model:{value:e.negocio.nombre,callback:function(t){e.$set(e.negocio,"nombre",t)},expression:"negocio.nombre"}}),e._v(" "),r("v-text-field",{attrs:{label:"Número de Teléfono",color:"black",autocomplete:"new-password",outlined:"",dense:"",type:"number",prefix:"(+502)",rules:[function(e){return!!e||"El teléfono es obligatorio"}],"prepend-icon":"fa fa-phone"},model:{value:e.negocio.telefono,callback:function(t){e.$set(e.negocio,"telefono",t)},expression:"negocio.telefono"}}),e._v(" "),r("v-textarea",{attrs:{outlined:"",dense:"","no-resize":"",clearable:"","clear-icon":"fa fa-times-circle",rules:[function(e){return e&&e.length>0||"La dirección es obligatoria"}],rows:"3",label:"¿Dónde te ubican?","prepend-icon":"fa fa-map-marker-alt",color:"black"},model:{value:e.negocio.direccion,callback:function(t){e.$set(e.negocio,"direccion",t)},expression:"negocio.direccion"}}),e._v(" "),r("v-textarea",{attrs:{outlined:"",dense:"","no-resize":"",clearable:"","clear-icon":"fa fa-times-circle",rules:[function(e){return e&&e.length>0||"La descripción es obligatoria"}],rows:"3",label:"Descripción de tu trabajo","prepend-icon":"fa fa-edit",color:"black"},model:{value:e.negocio.descripcion,callback:function(t){e.$set(e.negocio,"descripcion",t)},expression:"negocio.descripcion"}}),e._v(" "),r("v-divider",{staticClass:"mb-4"}),e._v(" "),r("h3",{staticClass:"black--text mb-4"},[e._v("Selecciona lo que mejor describa tu trabajo")]),e._v(" "),r("v-combobox",{staticClass:"elevation-0",staticStyle:{"border-radius":"10px"},attrs:{filter:e.filter,"hide-no-data":!e.helpers.busqueda,items:e.lista_tags,"search-input":e.helpers.busqueda,"hide-selected":"",label:"Selecciona un tag o más",rules:[function(e){return e&&e.length>0||"Debes seleccionar al menos un tag"}],multiple:"","small-chips":"",solo:"",color:"black"},on:{"update:searchInput":function(t){return e.$set(e.helpers,"busqueda",t)},"update:search-input":function(t){return e.$set(e.helpers,"busqueda",t)}},scopedSlots:e._u([{key:"no-data",fn:function(){return[r("v-list-item",[r("span",{staticClass:"subheading mr-2"},[e._v("Crear el tag ")]),e._v(" "),r("v-chip",{attrs:{color:e.helpers.colores[e.helpers.nonce-1]+" lighten-3",label:"",small:""}},[e._v("\n                                "+e._s(e.helpers.busqueda)+"\n                              ")])],1)]},proxy:!0},{key:"selection",fn:function(t){var o=t.attrs,n=t.item,c=t.parent,l=t.selected;return[n===Object(n)?r("v-chip",e._b({attrs:{color:n.color+" lighten-3","input-value":l,label:"",small:""}},"v-chip",o,!1),[r("span",{staticClass:"pr-2"},[e._v("\n                                        "+e._s(n.text)+"\n                                      ")]),e._v(" "),r("v-icon",{attrs:{small:""},on:{click:function(e){return c.selectItem(n)}}},[e._v("\n                                $delete\n                              ")])],1):e._e()]}},{key:"item",fn:function(t){t.index;var o=t.item;return[r("v-chip",{attrs:{color:o.color+" lighten-3",dark:"",label:"",small:""}},[e._v("\n                              "+e._s(o.text)+"\n                            ")])]}}]),model:{value:e.tags,callback:function(t){e.tags=t},expression:"tags"}})],1)],1)],1),e._v(" "),r("v-window-item",{attrs:{value:2}},[r("v-card-text",{staticClass:"pa-4"},[r("div",[r("h3",{staticClass:"black--text mb-4"},[e._v("Selecciona el horario en el que operas")]),e._v(" "),r("v-row",{attrs:{justify:"space-around",align:"center"}},[r("v-col",[r("h3",{staticClass:"black--text mb-2"},[e._v("Hora que inicias")]),e._v(" "),r("v-time-picker",{attrs:{landscape:"",color:"secondary"},model:{value:e.negocio.abre,callback:function(t){e.$set(e.negocio,"abre",t)},expression:"negocio.abre"}})],1),e._v(" "),r("v-col",[r("h3",{staticClass:"black--text mb-2"},[e._v("Hora que terminas")]),e._v(" "),r("v-time-picker",{attrs:{landscape:"",color:"secondary"},model:{value:e.negocio.cierra,callback:function(t){e.$set(e.negocio,"cierra",t)},expression:"negocio.cierra"}})],1)],1)],1)])],1),e._v(" "),r("v-window-item",{attrs:{value:3}},[r("v-card-text",{staticClass:"pa-4"},[r("h3",{staticClass:"black--text my-4"},[e._v("Ubicación para que las personas te encuentren mejor")]),e._v(" "),r("v-row",{staticClass:"mt-4"},[r("v-col",{attrs:{cols:"1"}},[r("v-icon",{staticClass:"mt-n3"},[e._v("\n                            fa fa-search\n                          ")])],1),e._v(" "),r("v-col",{staticClass:"ml-n3 mt-n3",attrs:{cols:"11"}},[r("gmap-autocomplete",{staticClass:"w-50 pa-2",staticStyle:{width:"70%",border:"1px solid grey","font-size":"16px","border-radius":"3px"},attrs:{"select-first-on-enter":!0,options:{fields:["geometry","formatted_address","address_components"]}},on:{place_changed:e.setPlace}})],1)],1),e._v(" "),r("br"),e._v(" "),r("GmapMap",{ref:"mapRef",staticClass:"pa-2",staticStyle:{width:"100vmin",height:"40vmin"},attrs:{center:e.center,zoom:18,"map-style-id":"roadmap",options:e.mapOptions},on:{click:e.handleMapClick}},[r("GmapMarker",{attrs:{position:e.marker.position,clickable:!0,draggable:!0},on:{drag:e.handleMarkerDrag,click:e.panToMarker}})],1),e._v(" "),r("v-btn",{staticClass:"mt-2 pa-4",attrs:{small:"",color:"secondary"},on:{click:e.geolocate}},[r("v-icon",{attrs:{left:""}},[e._v("\n                          fa fa-map-marker-alt\n                        ")]),e._v("\n                        Ubicación actual\n                      ")],1)],1)],1)],1)],1),e._v(" "),r("v-divider"),e._v(" "),r("v-card-actions",[r("v-btn",{attrs:{disabled:1===e.helpers.step,text:""},on:{click:function(t){e.helpers.step--}}},[e._v("\n                  Atrás\n                ")]),e._v(" "),r("v-spacer"),e._v(" "),e.helpers.step<3?r("v-btn",{attrs:{color:"primary",depressed:""},on:{click:e.VerificarForma}},[r("div",{staticStyle:{color:"rgba(0,0,0,0.8)"}},[e._v("\n                    Siguiente\n                  ")])]):r("v-btn",{attrs:{color:"primary",depressed:""},on:{click:e.RegistrarNegocio}},[r("div",{staticStyle:{color:"rgba(0,0,0,0.8)"}},[e._v("\n                    Registrarse\n                  ")])])],1)],1)],1)],1)],1)],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;d()(component,{VBtn:m.a,VCard:v.a,VCardActions:f.a,VCardText:f.b,VChip:h.a,VCol:k.a,VCombobox:_.a,VContainer:x.a,VDivider:C.a,VForm:w.a,VIcon:y.a,VImg:S.a,VLayout:V.a,VListItem:$.a,VRow:M.a,VSpacer:T.a,VTextField:A.a,VTextarea:P.a,VTimePicker:j.a,VWindow:I.a,VWindowItem:N.a})}}]);