(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{858:function(e,o,n){"use strict";n.r(o);var t=n(19),r=(n(21),n(36),n(38),n(768),n(509),n(58),{mounted:function(){this.$store.commit("setRutaActual","Listado de Negocios"),this.ObtenerNegocios()},head:function(){return{titleTemplate:"Antigua Travel | Listado de Negocios"}},layout:"admin_negocio",data:function(){return{dialogos:{negocio:!1,pickerHoraAbre:!1,pickerHoraCierra:!1},negocios:{listado:[],seleccionado:{},tabla:{headers:[{text:"Nombre",value:"nombre",align:"center"},{text:"Tipo de Negocio",value:"categoria",align:"center"},{text:"Horarios",value:"horarios",align:"center"},{text:"Estado",value:"aut",align:"center"},{text:"Acciones",value:"actions",sortable:!1,align:"center"}],busqueda:null,busqueda_texto:null,check:!1,cargando:!1,pagina:1,conteoPaginas:0,negociosPorPagina:10}}}},methods:{ObtenerNegocios:function(){var e=this;return Object(t.a)(regeneratorRuntime.mark((function o(){var n;return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return n={usuarioId:JSON.parse(sessionStorage.getItem("usuario")).id},e.negocios.tabla.cargando=!0,o.next=4,e.$api.post("/negocios/usuario",n).then((function(data){e.negocios.tabla.cargando=!1,e.negocios.listado=data}));case 4:case"end":return o.stop()}}),o)})))()},Busqueda:function(){return Object(t.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})))()},SeleccionarImagen:function(){window.addEventListener("focus",(function(){}),{once:!0}),this.$refs.uploader.click()},onFileChanged:function(e){this.negocios.seleccionado.nuevaImagen=URL.createObjectURL(e.target.files[0]),this.negocios.seleccionado.archivo=e.target.files[0],this.$forceUpdate()},ActualizarNegocio:function(){var e=this;return Object(t.a)(regeneratorRuntime.mark((function o(){var n;return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:e.$refs.frmNegocio.validate()&&(n={id:e.negocios.seleccionado.id,nombre:e.negocios.seleccionado.nombre,categoria:e.negocios.seleccionado.categoria,direccion:e.negocios.seleccionado.direccion,abre:e.negocios.seleccionado.abre,cierra:e.negocios.seleccionado.cierra,telefono:e.negocios.seleccionado.telefono,descripcion:e.negocios.seleccionado.descripcion,coordenadas:{latitud:e.negocios.seleccionado.lat,longitud:e.negocios.seleccionado.lng}},e.negocios.seleccionado.nuevaImagen?e.$fire.storage.ref("negocios/"+e.negocios.seleccionado.id+"/foto-perfil").put(e.negocios.seleccionado.archivo).then((function(o){o.ref.getDownloadURL().then(function(){var o=Object(t.a)(regeneratorRuntime.mark((function o(t){return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:n.img=t,e.$api.put("/negocio",n).then((function(data){var o=e.$fire.database.ref("Negocios").child("id"+JSON.parse(sessionStorage.getItem("usuario")).id).child("idNegocio"+e.negocios.seleccionado.id),n={adminId:JSON.parse(sessionStorage.getItem("usuario")).id,image:t,negocioId:e.negocios.seleccionado.id,nombreNegocio:e.negocios.seleccionado.nombre};o.set(n),e.ObtenerNegocios(),e.$alert.exito("El negocio fue actualizado exitosamente","Negocio Actualizado"),e.CerrarDialogoNegocio()})).catch((function(data){console.error(data),e.$alert.error("Ocurrió un error en el registro, vuelve a intentarlo","Error Interno")}));case 2:case"end":return o.stop()}}),o)})));return function(e){return o.apply(this,arguments)}}())})):(n.img=e.negocios.seleccionado.img,e.$api.put("/negocio",n).then((function(data){var o,n=e.$fire.database.ref("Negocios").child("id"+JSON.parse(sessionStorage.getItem("usuario")).id).child("idNegocio"+e.negocios.seleccionado.id),t={adminId:JSON.parse(sessionStorage.getItem("usuario")).id,image:null!==(o=e.negocios.seleccionado.img)&&void 0!==o?o:"",negocioId:e.negocios.seleccionado.id,nombreNegocio:e.negocios.seleccionado.nombre};n.set(t),e.ObtenerNegocios(),e.$alert.exito("El negocio fue actualizado exitosamente","Negocio Actualizado"),e.CerrarDialogoNegocio()})).catch((function(data){console.error(data),e.$alert.error("Ocurrió un error en el registro, vuelve a intentarlo","Error Interno")}))));case 1:case"end":return o.stop()}}),o)})))()},MostrarDialogoEditar:function(e){var o;this.negocios.seleccionado=Object.assign({},e),this.dialogos.negocio=!0,null===(o=this.$refs.frmNegocio)||void 0===o||o.resetValidation()},CerrarDialogoNegocio:function(){this.negocios.seleccionado={},this.dialogos.negocio=!1},LimpiarBusqueda:function(){}}}),c=n(24),l=n(56),d=n.n(l),v=n(764),f=n(262),m=n(158),_=n(265),k=n(70),h=n(267),x=n(726),y=n(744),C=n(852),$=n(734),N=n(258),w=n(735),A=n(198),I=n(204),V=n(844),S=n(731),H=n(732),O=n(95),R=n(756),z=n(885),T=n(83),D=n(281),P=n(733),component=Object(c.a)(r,(function(){var e=this,o=e.$createElement,n=e._self._c||o;return n("v-container",{attrs:{fluid:""}},[n("v-card-actions",[n("v-spacer",{staticClass:"hidden-sm-and-down"}),e._v(" "),e.negocios.tabla.check?n("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(o){var t=o.on,r=o.attrs;return[n("v-btn",e._g(e._b({staticClass:"hidden-md-and-up",attrs:{icon:"",color:"black"},on:{click:e.LimpiarBusqueda}},"v-btn",r,!1),t),[n("v-icon",{attrs:{color:"black"}},[e._v("\n            fa fa-arrow-left\n          ")])],1)]}}],null,!1,2506830455)},[e._v(" "),n("span",[e._v("Regresar")])]):e._e(),e._v(" "),n("v-text-field",{staticClass:"animate__animated animate__jackInTheBox",staticStyle:{"max-width":"300px"},attrs:{outlined:"",rounded:"",dense:"","hide-details":"",label:"Busqueda","prepend-inner-icon":"fa fa-search",clearable:"","clear-icon":"fa fa-times-circle",color:"black"},on:{"click:clear":e.LimpiarBusqueda},nativeOn:{keyup:function(o){return!o.type.indexOf("key")&&e._k(o.keyCode,"enter",13,o.key,"Enter")?null:e.Busqueda.apply(null,arguments)}},model:{value:e.negocios.tabla.busqueda,callback:function(o){e.$set(e.negocios.tabla,"busqueda",o)},expression:"negocios.tabla.busqueda"}})],1),e._v(" "),n("v-card",{staticClass:"animate__animated animate__zoomIn",staticStyle:{"border-radius":"10px"},attrs:{outlined:"",elevation:"0"}},[n("v-data-table",{staticClass:"elevation-1",staticStyle:{"border-radius":"10px"},attrs:{headers:e.negocios.tabla.headers,items:e.negocios.listado,"item-key":"id","sort-by":"id","sort-desc":"",loading:e.negocios.tabla.cargando,"loading-text":"Cargando... Por favor espere un momento.","no-data-text":"Aún no hay negocios para mostrar, por favor vuelva a intentarlo.","header-props":{sortByText:"Ordenar por"},"items-per-page":e.negocios.tabla.negociosPorPagina,"hide-default-footer":"",page:e.negocios.tabla.pagina},on:{"update:page":function(o){return e.$set(e.negocios.tabla,"pagina",o)},"page-count":function(o){e.negocios.tabla.conteoPaginas=o}},scopedSlots:e._u([{key:"no-data",fn:function(){return[n("v-alert",{attrs:{type:"info",prominent:"",color:"complementario"}},[e.negocios.tabla.check?n("div",[e._v('\n            No se encontraron ocurrencias en la busqueda: "'+e._s(e.negocios.tabla.busqueda_texto)+'"\n          ')]):n("div",[e._v("\n            Aún no hay negocios para mostrar, por favor vuelva a intentarlo.\n          ")])])]},proxy:!0},{key:"top",fn:function(){return[n("v-toolbar",{staticStyle:{"border-radius":"10px"},attrs:{flat:""}},[e.negocios.tabla.check?n("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(o){var t=o.on,r=o.attrs;return[n("v-btn",e._g(e._b({staticClass:"hidden-sm-and-down",attrs:{icon:"",color:"black"},on:{click:e.LimpiarBusqueda}},"v-btn",r,!1),t),[n("v-icon",{attrs:{color:"black"}},[e._v("\n                  fa fa-arrow-left\n                ")])],1)]}}],null,!1,3828301591)},[e._v(" "),n("span",[e._v("Regresar")])]):e._e(),e._v(" "),n("v-toolbar-title",{staticClass:"font-weight-bold text-wrap"},[n("h4",{staticClass:"hidden-sm-and-down",staticStyle:{"font-family":"Poppins, sans-serif"}},[e._v("\n              Administrar de Negocios\n            ")]),e._v(" "),n("h4",{staticClass:"hidden-md-and-up",staticStyle:{"font-family":"Poppins, sans-serif","font-size":"15px"}},[e._v("\n              Administrar de Negocios\n            ")])]),e._v(" "),n("v-divider",{staticClass:"mx-4 hidden-sm-and-down",attrs:{inset:"",vertical:""}})],1)]},proxy:!0},{key:"item.nombre",fn:function(o){var t=o.item;return[n("v-chip",{staticClass:"ma-2",attrs:{color:"black",outlined:""}},[n("v-icon",{attrs:{left:""}},[e._v("\n            fa fa-pen-square\n          ")]),e._v("\n          "+e._s(t.nombre)+"\n        ")],1)]}},{key:"item.categoria",fn:function(o){var t=o.item;return[n("v-chip",{staticClass:"ma-2",attrs:{color:"secondary",outlined:""}},["R"===t.categoria?n("div",[n("v-icon",{attrs:{left:""}},[e._v("\n              fa fa-briefcase\n            ")]),e._v("\n            Restaurante\n          ")],1):"H"===t.categoria?n("div",[n("v-icon",{attrs:{left:""}},[e._v("\n              fa fa-briefcase\n            ")]),e._v("\n            Hotel\n          ")],1):"D"===t.categoria?n("div",[n("v-icon",{attrs:{left:""}},[e._v("\n              fa fa-briefcase\n            ")]),e._v("\n            Destino Turístico\n          ")],1):"RC"===t.categoria?n("div",[n("v-icon",{attrs:{left:""}},[e._v("\n              fa fa-briefcase\n            ")]),e._v("\n            Renta de Autos\n          ")],1):"C"===t.categoria?n("div",[n("v-icon",{attrs:{left:""}},[e._v("\n              fa fa-briefcase\n            ")]),e._v("\n            Cambista\n          ")],1):e._e()])]}},{key:"item.horarios",fn:function(o){var t=o.item;return[n("v-chip",{staticClass:"ma-2",attrs:{color:"complementario",outlined:""}},[n("v-icon",{attrs:{left:""}},[e._v("\n            fa fa-business-time\n          ")]),e._v("\n          "+e._s(e.$moment(t.abre,"HH:mm:ss").format("h:mm a"))+" -\n          "+e._s(e.$moment(t.cierra,"HH:mm:ss").format("h:mm a"))+"\n        ")],1)]}},{key:"item.aut",fn:function(o){var t=o.item;return[n("v-chip",{staticClass:"ma-2",attrs:{color:"f"===t.aut?"amber darken-2":"green",outlined:""}},["f"===t.aut?n("div",[n("v-icon",{attrs:{left:""}},[e._v("\n              fa fa-clock\n            ")]),e._v("\n            Pendiente de Autorización\n          ")],1):n("div",[n("v-icon",{attrs:{left:""}},[e._v("\n              fa fa-check\n            ")]),e._v("\n            Autorizado\n          ")],1)])]}},{key:"item.actions",fn:function(o){var t=o.item;return[n("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(o){var r=o.on,c=o.attrs;return[n("v-btn",e._g(e._b({attrs:{color:"black",dark:"",icon:""},on:{click:function(o){return e.MostrarDialogoEditar(t)}}},"v-btn",c,!1),r),[n("v-icon",{attrs:{color:"black"}},[e._v("\n                fa fa-pencil\n              ")])],1)]}}],null,!0)},[e._v(" "),n("span",[e._v("Editar")])])]}}],null,!0)}),e._v(" "),n("div",{staticClass:"text-center py-2"},[n("v-pagination",{attrs:{length:e.negocios.tabla.conteoPaginas,"total-visible":7,color:"complementario",circle:""},model:{value:e.negocios.tabla.pagina,callback:function(o){e.$set(e.negocios.tabla,"pagina",o)},expression:"negocios.tabla.pagina"}})],1),e._v(" "),n("v-dialog",{attrs:{transition:"dialog-bottom-transition",scrollable:"",persistent:"","max-width":"600px"},model:{value:e.dialogos.negocio,callback:function(o){e.$set(e.dialogos,"negocio",o)},expression:"dialogos.negocio"}},[n("v-card",[n("v-toolbar",{attrs:{elevation:"0",dense:"",color:"black",dark:""}},[n("h3",[e._v(" Editar Negocio ")]),e._v(" "),n("v-spacer"),e._v(" "),n("v-btn",{attrs:{icon:""},on:{click:e.CerrarDialogoNegocio}},[n("v-icon",[e._v("fa fa-times")])],1)],1),e._v(" "),n("v-card-text",{staticClass:"pa-4"},[n("v-form",{ref:"frmNegocio"},[n("div",{staticClass:"mb-6"},[n("h3",{staticClass:"mt-1 hidden-sm-and-down black--text"},[e._v("\n                Información del Negocio\n              ")]),e._v(" "),n("h3",{staticClass:"mt-1 hidden-md-and-up black--text",staticStyle:{"font-size":"18px","font-family":"Poppins, sans-serif"}},[e._v("\n                Información del Negocio\n              ")])]),e._v(" "),n("v-row",{staticClass:"my-5",attrs:{justify:"center",align:"center"}},[n("v-col",{attrs:{cols:"12",align:"center"}},[n("v-avatar",{attrs:{color:"grey",size:"sm"===e.$vuetify.breakpoint.name||"xs"===e.$vuetify.breakpoint.name?150:250}},[e.negocios.seleccionado.img?n("v-img",{attrs:{src:e.negocios.seleccionado.nuevaImagen?e.negocios.seleccionado.nuevaImagen:e.negocios.seleccionado.img}}):n("v-img",{attrs:{src:e.negocios.seleccionado.nuevaImagen?e.negocios.seleccionado.nuevaImagen:"/imagen-no-disponible.png"}})],1)],1),e._v(" "),n("v-btn",{attrs:{color:"tertiary"},on:{click:e.SeleccionarImagen}},[n("v-icon",{attrs:{left:"",color:"white"}},[e._v("fas fa-image")]),e._v(" "),n("div",{staticClass:"white--text"},[e._v("Cambiar Imagen")])],1),e._v(" "),n("input",{ref:"uploader",staticClass:"d-none",attrs:{type:"file",accept:"image/*"},on:{change:e.onFileChanged}})],1),e._v(" "),n("v-text-field",{attrs:{outlined:"",dense:"",rules:[function(e){return e&&e.length>0||"El nombre es obligatorio"}],label:"Nombre del Negocio",color:"black","prepend-icon":"fa fa-heading"},model:{value:e.negocios.seleccionado.nombre,callback:function(o){e.$set(e.negocios.seleccionado,"nombre",o)},expression:"negocios.seleccionado.nombre"}}),e._v(" "),n("v-dialog",{ref:"dialogoHoraAbre",attrs:{"return-value":e.negocios.seleccionado.abre,persistent:"",width:"300px"},on:{"update:returnValue":function(o){return e.$set(e.negocios.seleccionado,"abre",o)},"update:return-value":function(o){return e.$set(e.negocios.seleccionado,"abre",o)}},scopedSlots:e._u([{key:"activator",fn:function(o){var t=o.on,r=o.attrs;return[n("v-text-field",e._g(e._b({attrs:{label:"Hora de Abrir","prepend-icon":"fa fa-lock-open",readonly:"",outlined:"",dense:"",color:"black"},model:{value:e.negocios.seleccionado.abre,callback:function(o){e.$set(e.negocios.seleccionado,"abre",o)},expression:"negocios.seleccionado.abre"}},"v-text-field",r,!1),t))]}}]),model:{value:e.dialogos.pickerHoraAbre,callback:function(o){e.$set(e.dialogos,"pickerHoraAbre",o)},expression:"dialogos.pickerHoraAbre"}},[e._v(" "),n("v-time-picker",{attrs:{format:"ampm",color:"secondary"},model:{value:e.negocios.seleccionado.abre,callback:function(o){e.$set(e.negocios.seleccionado,"abre",o)},expression:"negocios.seleccionado.abre"}},[n("v-spacer"),e._v(" "),n("v-btn",{attrs:{text:"",color:"secondary"},on:{click:function(o){e.dialogos.pickerHoraAbre=!1}}},[e._v("\n                  Cancelar\n                ")]),e._v(" "),n("v-btn",{attrs:{text:"",color:"secondary"},on:{click:function(o){return e.$refs.dialogoHoraAbre.save(e.negocios.seleccionado.abre)}}},[e._v("\n                  Aceptar\n                ")])],1)],1),e._v(" "),n("v-dialog",{ref:"dialogoHoraCierra",attrs:{"return-value":e.negocios.seleccionado.cierra,persistent:"",width:"300px"},on:{"update:returnValue":function(o){return e.$set(e.negocios.seleccionado,"cierra",o)},"update:return-value":function(o){return e.$set(e.negocios.seleccionado,"cierra",o)}},scopedSlots:e._u([{key:"activator",fn:function(o){var t=o.on,r=o.attrs;return[n("v-text-field",e._g(e._b({attrs:{label:"Hora de Cerrar","prepend-icon":"fa fa-lock",readonly:"",outlined:"",dense:"",color:"black"},model:{value:e.negocios.seleccionado.cierra,callback:function(o){e.$set(e.negocios.seleccionado,"cierra",o)},expression:"negocios.seleccionado.cierra"}},"v-text-field",r,!1),t))]}}]),model:{value:e.dialogos.pickerHoraCierra,callback:function(o){e.$set(e.dialogos,"pickerHoraCierra",o)},expression:"dialogos.pickerHoraCierra"}},[e._v(" "),n("v-time-picker",{attrs:{format:"ampm",color:"secondary"},model:{value:e.negocios.seleccionado.cierra,callback:function(o){e.$set(e.negocios.seleccionado,"cierra",o)},expression:"negocios.seleccionado.cierra"}},[n("v-spacer"),e._v(" "),n("v-btn",{attrs:{text:"",color:"secondary"},on:{click:function(o){e.dialogos.pickerHoraCierra=!1}}},[e._v("\n                  Cancelar\n                ")]),e._v(" "),n("v-btn",{attrs:{text:"",color:"secondary"},on:{click:function(o){return e.$refs.dialogoHoraCierra.save(e.negocios.seleccionado.cierra)}}},[e._v("\n                  Aceptar\n                ")])],1)],1),e._v(" "),n("v-textarea",{attrs:{outlined:"",dense:"","no-resize":"",clearable:"","clear-icon":"fa fa-times-circle",rules:[function(e){return e&&e.length>0||"La dirección es obligatoria"}],rows:"3",label:"Dirección del negocio","prepend-icon":"fa fa-map-marker-alt",color:"black"},model:{value:e.negocios.seleccionado.direccion,callback:function(o){e.$set(e.negocios.seleccionado,"direccion",o)},expression:"negocios.seleccionado.direccion"}}),e._v(" "),n("v-textarea",{attrs:{outlined:"",dense:"","no-resize":"",clearable:"","clear-icon":"fa fa-times-circle",rules:[function(e){return e&&e.length>0||"La descripción es obligatoria"}],rows:"3",label:"Descripción del negocio","prepend-icon":"fa fa-edit",color:"black"},model:{value:e.negocios.seleccionado.descripcion,callback:function(o){e.$set(e.negocios.seleccionado,"descripcion",o)},expression:"negocios.seleccionado.descripcion"}})],1)],1),e._v(" "),n("v-card-actions",[n("v-spacer"),e._v(" "),n("v-btn",{attrs:{color:"black",text:""},on:{click:e.ActualizarNegocio}},[n("v-icon",{attrs:{left:""}},[e._v("fa fa-check")]),e._v("\n            Actualizar\n          ")],1)],1)],1)],1)],1)],1)}),[],!1,null,null,null);o.default=component.exports;d()(component,{VAlert:v.a,VAvatar:f.a,VBtn:m.a,VCard:_.a,VCardActions:k.a,VCardText:k.c,VChip:h.a,VCol:x.a,VContainer:y.a,VDataTable:C.a,VDialog:$.a,VDivider:N.a,VForm:w.a,VIcon:A.a,VImg:I.a,VPagination:V.a,VRow:S.a,VSpacer:H.a,VTextField:O.a,VTextarea:R.a,VTimePicker:z.a,VToolbar:T.a,VToolbarTitle:D.a,VTooltip:P.a})}}]);