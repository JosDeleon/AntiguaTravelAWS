(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{751:function(e,t,n){"use strict";n(9),n(8),n(83),n(27),n(287),n(286);var r=n(288),o=n(38);t.a=Object(r.a)("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(e,t){var n,r=t.props,data=t.data,l=t.children,c=data.attrs;return c&&(data.attrs={},n=Object.keys(c).filter((function(e){if("slot"===e)return!1;var t=c[e];return e.startsWith("data-")?(data.attrs[e]=t,!1):t||"string"==typeof t}))),r.id&&(data.domProps=data.domProps||{},data.domProps.id=r.id),e(r.tag,Object(o.a)(data,{staticClass:"container",class:Array({"container--fluid":r.fluid}).concat(n||[])}),l)}})},752:function(e,t,n){var content=n(753);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(17).default)("5c8fbe94",content,!0,{sourceMap:!1})},753:function(e,t,n){var r=n(16)(!1);r.push([e.i,".v-textarea textarea{align-self:stretch;flex:1 1 auto;line-height:1.75rem;max-width:100%;min-height:32px;outline:none;padding:0;width:100%}.v-textarea .v-text-field__prefix,.v-textarea .v-text-field__suffix{padding-top:2px;align-self:start}.v-textarea.v-text-field--box .v-text-field__prefix,.v-textarea.v-text-field--box textarea,.v-textarea.v-text-field--enclosed .v-text-field__prefix,.v-textarea.v-text-field--enclosed textarea{margin-top:24px}.v-textarea.v-text-field--box.v-text-field--outlined:not(.v-input--dense) .v-text-field__prefix,.v-textarea.v-text-field--box.v-text-field--outlined:not(.v-input--dense) .v-text-field__suffix,.v-textarea.v-text-field--box.v-text-field--outlined:not(.v-input--dense) textarea,.v-textarea.v-text-field--box.v-text-field--single-line:not(.v-input--dense) .v-text-field__prefix,.v-textarea.v-text-field--box.v-text-field--single-line:not(.v-input--dense) .v-text-field__suffix,.v-textarea.v-text-field--box.v-text-field--single-line:not(.v-input--dense) textarea,.v-textarea.v-text-field--enclosed.v-text-field--outlined:not(.v-input--dense) .v-text-field__prefix,.v-textarea.v-text-field--enclosed.v-text-field--outlined:not(.v-input--dense) .v-text-field__suffix,.v-textarea.v-text-field--enclosed.v-text-field--outlined:not(.v-input--dense) textarea,.v-textarea.v-text-field--enclosed.v-text-field--single-line:not(.v-input--dense) .v-text-field__prefix,.v-textarea.v-text-field--enclosed.v-text-field--single-line:not(.v-input--dense) .v-text-field__suffix,.v-textarea.v-text-field--enclosed.v-text-field--single-line:not(.v-input--dense) textarea{margin-top:10px}.v-textarea.v-text-field--box.v-text-field--outlined:not(.v-input--dense) .v-label,.v-textarea.v-text-field--box.v-text-field--single-line:not(.v-input--dense) .v-label,.v-textarea.v-text-field--enclosed.v-text-field--outlined:not(.v-input--dense) .v-label,.v-textarea.v-text-field--enclosed.v-text-field--single-line:not(.v-input--dense) .v-label{top:18px}.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-text-field__prefix,.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-text-field__suffix,.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense textarea,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-text-field__prefix,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-text-field__suffix,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense textarea,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-text-field__prefix,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-text-field__suffix,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense textarea,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-text-field__prefix,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-text-field__suffix,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense textarea{margin-top:6px}.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-input__append-inner,.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-input__append-outer,.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-input__prepend-inner,.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-input__prepend-outer,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-input__append-inner,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-input__append-outer,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-input__prepend-inner,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-input__prepend-outer,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-input__append-inner,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-input__append-outer,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-input__prepend-inner,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-input__prepend-outer,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-input__append-inner,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-input__append-outer,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-input__prepend-inner,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-input__prepend-outer{align-self:flex-start;margin-top:8px}.v-textarea.v-text-field--solo{align-items:flex-start}.v-textarea.v-text-field--solo .v-input__append-inner,.v-textarea.v-text-field--solo .v-input__append-outer,.v-textarea.v-text-field--solo .v-input__prepend-inner,.v-textarea.v-text-field--solo .v-input__prepend-outer{align-self:flex-start;margin-top:12px}.v-application--is-ltr .v-textarea.v-text-field--solo .v-input__append-inner{padding-left:12px}.v-application--is-rtl .v-textarea.v-text-field--solo .v-input__append-inner{padding-right:12px}.v-textarea--auto-grow textarea{overflow:hidden}.v-textarea--no-resize textarea{resize:none}.v-textarea.v-text-field--enclosed .v-text-field__slot{align-self:stretch}.v-application--is-ltr .v-textarea.v-text-field--enclosed .v-text-field__slot{margin-right:-12px}.v-application--is-rtl .v-textarea.v-text-field--enclosed .v-text-field__slot{margin-left:-12px}.v-application--is-ltr .v-textarea.v-text-field--enclosed .v-text-field__slot textarea{padding-right:12px}.v-application--is-rtl .v-textarea.v-text-field--enclosed .v-text-field__slot textarea{padding-left:12px}",""]),e.exports=r},764:function(e,t,n){"use strict";n(8),n(6),n(9),n(10),n(7),n(11);var r=n(1),o=(n(18),n(43),n(752),n(95)),l=n(4);function c(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}var d=Object(l.a)(o.a);t.a=d.extend({name:"v-textarea",props:{autoGrow:Boolean,noResize:Boolean,rowHeight:{type:[Number,String],default:24,validator:function(e){return!isNaN(parseFloat(e))}},rows:{type:[Number,String],default:5,validator:function(e){return!isNaN(parseInt(e,10))}}},computed:{classes:function(){return function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle},o.a.options.computed.classes.call(this))},noResizeHandle:function(){return this.noResize||this.autoGrow}},watch:{lazyValue:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)},rowHeight:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted:function(){var e=this;setTimeout((function(){e.autoGrow&&e.calculateInputHeight()}),0)},methods:{calculateInputHeight:function(){var input=this.$refs.input;if(input){input.style.height="0";var e=input.scrollHeight,t=parseInt(this.rows,10)*parseFloat(this.rowHeight);input.style.height=Math.max(t,e)+"px"}},genInput:function(){var input=o.a.options.methods.genInput.call(this);return input.tag="textarea",delete input.data.attrs.type,input.data.attrs.rows=this.rows,input},onInput:function(e){o.a.options.methods.onInput.call(this,e),this.autoGrow&&this.calculateInputHeight()},onKeyDown:function(e){this.isFocused&&13===e.keyCode&&e.stopPropagation(),this.$emit("keydown",e)}}})},886:function(e,t,n){"use strict";n.r(t);var r=n(19),o=(n(60),n(35),n(7),n(21),n(61),{mounted:function(){},head:function(){return{titleTemplate:"Registra tu negocio | Súmate a Antigua Travel"}},layout:"empty",data:function(){return{helpers:{step:1,colores:["green","purple","indigo","cyan","teal","orange"],nonce:1,mapSearch:null,busqueda:null},markers:[],places:[],currentPlace:null,lista_tags:[{header:"Selecciona o crea un tag"},{text:"Dólares",color:"green"},{text:"Quetzales",color:"orange"},{text:"Euros",color:"blue"},{text:"Libras",color:"blue"},{text:"Horario flexible",color:"blue"}],negocio:{},tags:[],marker:{position:{lat:14.55706946331603,lng:-90.73366553217345}},center:{lat:14.55706946331603,lng:-90.73366553217345},mapOptions:{disableDefaultUI:!0}}},watch:{tags:function(e,t){var n=this;e.length!==t.length&&(this.tags=e.map((function(e){return"string"==typeof e&&(e={text:e,color:n.helpers.colores[n.helpers.nonce-1]},n.lista_tags.push(e),n.helpers.nonce++,n.$forceUpdate()),e})))}},methods:{VerificarForma:function(){1===this.helpers.step&&this.$refs.formDatosNegocio.validate()&&this.helpers.step++},RegistrarNegocio:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=[],e.tags.forEach((function(e){n.push(e.text)})),r={nombre:e.negocio.nombre,telefono:e.negocio.telefono,direccion:e.negocio.direccion,descripcion:e.negocio.descripcion,categoria:"C",tags:n,destino:e.$store.state.destinos.antigua,coordenadas:{latitud:e.marker.position.lat,longitud:e.marker.position.lng},usuarioId:JSON.parse(localStorage.getItem("usuario")).id},t.next=5,e.$api.post("/negocio",r).then((function(data){e.$alert.registro_exitoso(),e.$router.push({path:"/"})})).catch((function(data){console.error(data),e.$alert.error("Ocurrió un error en el registro, vuelve a intentarlo","Error Interno")}));case 5:case"end":return t.stop()}}),t)})))()},setPlace:function(e){if(this.currentPlace=e,this.currentPlace){var marker={lat:this.currentPlace.geometry.location.lat(),lng:this.currentPlace.geometry.location.lng()};this.markers.push({position:marker}),this.places.push(this.currentPlace),this.marker.position=marker,this.currentPlace=null,this.panToMarker()}},filter:function(e,t,n){if(e.header)return!1;var r=function(e){return null!=e?e:""},text=r(n),o=r(t);return text.toString().toLowerCase().indexOf(o.toString().toLowerCase())>-1},geolocate:function(){var e=this;navigator.geolocation.getCurrentPosition((function(t){e.marker.position={lat:t.coords.latitude,lng:t.coords.longitude},e.center.lat=t.coords.latitude,e.center.lng=t.coords.longitude,e.panToMarker()}))},handleMarkerDrag:function(e){this.marker.position={lat:e.latLng.lat(),lng:e.latLng.lng()}},panToMarker:function(){this.$refs.mapRef.panTo(this.marker.position);try{this.$refs.mapRef.setZoom(18)}catch(e){}},handleMapClick:function(e){this.marker.position={lat:e.latLng.lat(),lng:e.latLng.lng()},console.log(e)}}}),l=n(24),c=n(50),d=n.n(c),v=n(159),x=n(267),f=n(53),h=n(269),m=n(733),_=n(745),w=n(751),y=n(260),k=n(742),C=n(198),O=n(204),j=n(735),S=n(160),P=n(738),$=n(739),I=n(95),V=n(764),M=n(740),z=n(271),N=n(724),component=Object(l.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-row",{attrs:{justify:"center",align:"center"}},[n("v-col",{attrs:{cols:"12",sm:"10",md:"10",lg:"9"}},[n("v-card",{staticStyle:{"border-radius":"10px"}},[n("v-img",{staticStyle:{"border-radius":"10px"},attrs:{"min-height":"900","max-height":"1100",src:"https://elcomercio.pe/resizer/EFi-q5JXzfA8p4uDIRbwXANtqHM=/1200x675/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/NE6ATAPMMFCBNG2WOCPZAXMTSA.jpg","lazy-src":"https://elcomercio.pe/resizer/EFi-q5JXzfA8p4uDIRbwXANtqHM=/1200x675/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/NE6ATAPMMFCBNG2WOCPZAXMTSA.jpg"}},[n("v-container",[n("v-row",{attrs:{align:"center",justify:"start"}},[n("v-col",[n("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,o=t.attrs;return[n("v-btn",e._g(e._b({attrs:{color:"white",dark:"","x-large":"",icon:""},on:{click:function(t){e.$router.push({path:e.$nuxt.context.from.path?e.$nuxt.context.from.path:"/"})}}},"v-btn",o,!1),r),[n("v-icon",[e._v(" fa fa-arrow-left ")])],1)]}}])},[e._v(" "),n("span",[e._v("Regresar")])])],1)],1),e._v(" "),n("v-layout",{attrs:{"justify-center":""}},[n("v-card",{staticStyle:{"border-radius":"10px"},attrs:{"min-width":"400",width:"700"}},[n("v-card-text",{staticClass:"pa-4"},[n("h2",{staticClass:"mb-5 black--text"},[e._v("\n                  Registro para Cambista\n                ")]),e._v(" "),n("v-window",{model:{value:e.helpers.step,callback:function(t){e.$set(e.helpers,"step",t)},expression:"helpers.step"}},[n("v-window-item",{attrs:{value:1}},[n("v-card-text",{staticClass:"pa-4"},[n("h3",{staticClass:"black--text mb-4"},[e._v("Información para que puedan contactarte")]),e._v(" "),n("v-form",{ref:"formDatosNegocio"},[n("v-text-field",{attrs:{label:"Nombre Completo",color:"black",autocomplete:"new-password",outlined:"",dense:"",rules:[function(e){return e&&e.length>0||"El nombre es obligatorio"}],"prepend-icon":"fa fa-city"},model:{value:e.negocio.nombre,callback:function(t){e.$set(e.negocio,"nombre",t)},expression:"negocio.nombre"}}),e._v(" "),n("v-text-field",{attrs:{label:"Número de Teléfono",color:"black",autocomplete:"new-password",outlined:"",dense:"",type:"number",prefix:"(+502)",rules:[function(e){return!!e||"El teléfono es obligatorio"}],"prepend-icon":"fa fa-phone"},model:{value:e.negocio.telefono,callback:function(t){e.$set(e.negocio,"telefono",t)},expression:"negocio.telefono"}}),e._v(" "),n("v-textarea",{attrs:{outlined:"",dense:"","no-resize":"",clearable:"","clear-icon":"fa fa-times-circle",rules:[function(e){return e&&e.length>0||"La dirección es obligatoria"}],rows:"3",label:"¿Dónde te ubican?","prepend-icon":"fa fa-map-marker-alt",color:"black"},model:{value:e.negocio.direccion,callback:function(t){e.$set(e.negocio,"direccion",t)},expression:"negocio.direccion"}}),e._v(" "),n("v-textarea",{attrs:{outlined:"",dense:"","no-resize":"",clearable:"","clear-icon":"fa fa-times-circle",rules:[function(e){return e&&e.length>0||"La descripción es obligatoria"}],rows:"3",label:"Descripción de tu trabajo","prepend-icon":"fa fa-edit",color:"black"},model:{value:e.negocio.descripcion,callback:function(t){e.$set(e.negocio,"descripcion",t)},expression:"negocio.descripcion"}}),e._v(" "),n("v-divider",{staticClass:"mb-4"}),e._v(" "),n("h3",{staticClass:"black--text mb-4"},[e._v("Selecciona lo que mejor describa tu trabajo")]),e._v(" "),n("v-combobox",{staticClass:"elevation-0",staticStyle:{"border-radius":"10px"},attrs:{filter:e.filter,"hide-no-data":!e.helpers.busqueda,items:e.lista_tags,"search-input":e.helpers.busqueda,"hide-selected":"",label:"Selecciona un tag o más",rules:[function(e){return e&&e.length>0||"Debes seleccionar al menos un tag"}],multiple:"","small-chips":"",solo:"",color:"black"},on:{"update:searchInput":function(t){return e.$set(e.helpers,"busqueda",t)},"update:search-input":function(t){return e.$set(e.helpers,"busqueda",t)}},scopedSlots:e._u([{key:"no-data",fn:function(){return[n("v-list-item",[n("span",{staticClass:"subheading mr-2"},[e._v("Crear el tag ")]),e._v(" "),n("v-chip",{attrs:{color:e.helpers.colores[e.helpers.nonce-1]+" lighten-3",label:"",small:""}},[e._v("\n                                "+e._s(e.helpers.busqueda)+"\n                              ")])],1)]},proxy:!0},{key:"selection",fn:function(t){var r=t.attrs,o=t.item,l=t.parent,c=t.selected;return[o===Object(o)?n("v-chip",e._b({attrs:{color:o.color+" lighten-3","input-value":c,label:"",small:""}},"v-chip",r,!1),[n("span",{staticClass:"pr-2"},[e._v("\n                                        "+e._s(o.text)+"\n                                      ")]),e._v(" "),n("v-icon",{attrs:{small:""},on:{click:function(e){return l.selectItem(o)}}},[e._v("\n                                $delete\n                              ")])],1):e._e()]}},{key:"item",fn:function(t){t.index;var r=t.item;return[n("v-chip",{attrs:{color:r.color+" lighten-3",dark:"",label:"",small:""}},[e._v("\n                              "+e._s(r.text)+"\n                            ")])]}}]),model:{value:e.tags,callback:function(t){e.tags=t},expression:"tags"}})],1)],1)],1),e._v(" "),n("v-window-item",{attrs:{value:2}},[n("v-card-text",{staticClass:"pa-4"},[n("h3",{staticClass:"black--text my-4"},[e._v("Ubicación para que las personas te encuentren mejor")]),e._v(" "),n("v-row",{staticClass:"mt-4"},[n("v-col",{attrs:{cols:"1"}},[n("v-icon",{staticClass:"mt-n3"},[e._v("\n                            fa fa-search\n                          ")])],1),e._v(" "),n("v-col",{staticClass:"ml-n3 mt-n3",attrs:{cols:"11"}},[n("gmap-autocomplete",{staticClass:"w-50 pa-2",staticStyle:{width:"70%",border:"1px solid grey","font-size":"16px","border-radius":"3px"},attrs:{"select-first-on-enter":!0,options:{fields:["geometry","formatted_address","address_components"]}},on:{place_changed:e.setPlace}})],1)],1),e._v(" "),n("br"),e._v(" "),n("GmapMap",{ref:"mapRef",staticClass:"pa-2",staticStyle:{width:"100vmin",height:"40vmin"},attrs:{center:e.center,zoom:18,"map-style-id":"roadmap",options:e.mapOptions},on:{click:e.handleMapClick}},[n("GmapMarker",{attrs:{position:e.marker.position,clickable:!0,draggable:!0},on:{drag:e.handleMarkerDrag,click:e.panToMarker}})],1),e._v(" "),n("v-btn",{staticClass:"mt-2 pa-4",attrs:{small:"",color:"secondary"},on:{click:e.geolocate}},[n("v-icon",{attrs:{left:""}},[e._v("\n                          fa fa-map-marker-alt\n                        ")]),e._v("\n                        Ubicación actual\n                      ")],1)],1)],1)],1)],1),e._v(" "),n("v-divider"),e._v(" "),n("v-card-actions",[n("v-btn",{attrs:{disabled:1===e.helpers.step,text:""},on:{click:function(t){e.helpers.step--}}},[e._v("\n                  Atrás\n                ")]),e._v(" "),n("v-spacer"),e._v(" "),e.helpers.step<2?n("v-btn",{attrs:{color:"primary",depressed:""},on:{click:e.VerificarForma}},[n("div",{staticStyle:{color:"rgba(0,0,0,0.8)"}},[e._v("\n                    Siguiente\n                  ")])]):n("v-btn",{attrs:{color:"primary",depressed:""},on:{click:e.RegistrarNegocio}},[n("div",{staticStyle:{color:"rgba(0,0,0,0.8)"}},[e._v("\n                    Registrarse\n                  ")])])],1)],1)],1)],1)],1)],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;d()(component,{VBtn:v.a,VCard:x.a,VCardActions:f.a,VCardText:f.c,VChip:h.a,VCol:m.a,VCombobox:_.a,VContainer:w.a,VDivider:y.a,VForm:k.a,VIcon:C.a,VImg:O.a,VLayout:j.a,VListItem:S.a,VRow:P.a,VSpacer:$.a,VTextField:I.a,VTextarea:V.a,VTooltip:M.a,VWindow:z.a,VWindowItem:N.a})}}]);