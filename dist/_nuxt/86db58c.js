(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{860:function(e,t,n){"use strict";n.r(t);n(21),n(62),n(36),n(6),n(63),n(74),n(38);var r=n(19),o=(n(7),n(29),n(54),n(33),n(82),n(509),n(37),n(60),n(753));function c(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return l(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var i=0,r=function(){};return{s:r,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,d=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return c=e.done,e},e:function(e){d=!0,o=e},f:function(){try{c||null==n.return||n.return()}finally{if(d)throw o}}}}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}var d={mounted:function(){this.$store.commit("setRutaActual","Galeria de Imágenes"),this.ObtenerNegociosAuth()},components:{VueGallerySlideshow:n.n(o).a},layout:"admin_negocio",data:function(){return{dialogos:{agregar_galeria:!1},folders:[],folder_seleccionado:{},imagen_seleccionada:{tipo:""},negocios:{listado:[],seleccionado:{},galeria:[],imagenes:[]}}},methods:{ObtenerGaleria:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$api.post("/galeria/negocio",{negocioId:e.folder_seleccionado.id});case 2:e.negocios.galeria=t.sent;case 3:case"end":return t.stop()}}),t)})))()},ObtenerNegociosAuth:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n,r,o,l;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!JSON.parse(sessionStorage.getItem("usuario"))){t.next=24;break}return e.folders=[],t.next=4,e.$api.post("/negocios/usuario",{usuarioId:JSON.parse(sessionStorage.getItem("usuario")).id});case 4:e.negocios.listado=t.sent,n=c(e.negocios.listado),t.prev=6,n.s();case 8:if((r=n.n()).done){t.next=16;break}return o=r.value,t.next=12,e.$fire.storage.ref("negocios/"+o.id).child("galeria").listAll();case 12:l=t.sent,e.folders.push({id:o.id,titulo:o.nombre,cantidadArchivos:l.items.length});case 14:t.next=8;break;case 16:t.next=21;break;case 18:t.prev=18,t.t0=t.catch(6),n.e(t.t0);case 21:return t.prev=21,n.f(),t.finish(21);case 24:case"end":return t.stop()}}),t,null,[[6,18,21,24]])})))()},AgregarImagenesGaleria:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.negocios.imagenes&&0===e.negocios.imagenes.length?e.$alert.warning("Debes de seleccionar una o más imágenes","Selecciona Imágenes"):(e.negocios.imagenes.forEach((function(t){e.$fire.storage.ref("negocios/"+e.folder_seleccionado.id+"/galeria/"+t.name.split(".")[0]).put(t).then((function(t){t.ref.getDownloadURL().then(function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(n){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.negocios.galeria.find((function(e){return e.img===n}))){t.next=5;break}return r={negocioId:e.folder_seleccionado.id,img:n},t.next=5,e.$api.post("/galeria",r).then((function(data){e.ObtenerGaleria()}));case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}))})),e.CerrarDialogoAgregarGaleria(),e.$alert.exito("Las imágenes fueron agregadas a la galería","Imágenes Agregadas"));case 1:case"end":return t.stop()}}),t)})))()},DescargarImagen:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:window.open(e.imagen_seleccionada.img,"_blank");case 1:case"end":return t.stop()}}),t)})))()},EliminarImagen:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.$alert.confirm("¿Estás seguro que deseas eliminar esta imagen de la galería?","Eliminar Imagen").then(Object(r.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={id:e.imagen_seleccionada.id},t.next=3,e.$api.delete("/galeria/img",n).then((function(data){e.$fire.storage.refFromURL(e.imagen_seleccionada.img).delete(),e.imagen_seleccionada={},e.ObtenerGaleria(),e.$alert.exito("La imagen fue eliminada exitosamente","Imagen Eliminada")}));case 3:case"end":return t.stop()}}),t)}))));case 1:case"end":return t.stop()}}),t)})))()},SeleccionarImagen:function(e){var t=this;e.tipo="",this.imagen_seleccionada=Object.assign({},e),this.$fire.storage.refFromURL(e.img).getMetadata().then((function(e){t.imagen_seleccionada&&(t.imagen_seleccionada.tipo=e.contentType,t.imagen_seleccionada.size=(e.size/1e6).toFixed(2),t.$forceUpdate())})).catch((function(e){console.error(e)}))},CerrarDialogoAgregarGaleria:function(){var e;this.dialogos.agregar_galeria=!1,this.negocios.imagenes=[],null===(e=this.$refs.frmGaleria)||void 0===e||e.resetValidation()},SeleccionarFolder:function(e){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:t.folder_seleccionado=e,t.ObtenerGaleria();case 2:case"end":return n.stop()}}),n)})))()},formatDate:function(e){return this.$moment.utc(e,"YYYY-MM-DD h:mm:ss").format("dddd, LL [a las ] h:mm:ss a").charAt(0).toUpperCase()+this.$moment.utc(e,"YYYY-MM-DD h:mm:ss").format("dddd, LL [a las ] h:mm:ss a").slice(1)},formatImageName:function(e){return e.img.split("negocios")[1].split("2F")[3].split("?")[0]},LimpiarBusqueda:function(){this.folder_seleccionado={},this.imagen_seleccionada={},this.ObtenerNegociosAuth()}}},m=d,v=n(24),f=n(50),_=n.n(f),h=n(768),x=n(158),k=n(267),w=n(53),y=n(269),I=n(731),C=n(752),A=n(739),V=n(260),S=n(801),R=n(740),$=n(198),O=n(204),L=n(261),D=n(159),j=n(262),G=n(263),N=n(23),E=n(736),F=n(737),T=n(268),Y=n(95),M=n(84),U=n(738),component=Object(v.a)(m,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{attrs:{fluid:""}},[e.folder_seleccionado.id>0?n("v-btn",{staticClass:"mb-n3",attrs:{color:"complementario",outlined:""},on:{click:e.LimpiarBusqueda}},[n("v-icon",{attrs:{left:"",color:"complementario"}},[e._v("\n      fa fa-arrow-left\n    ")]),e._v("\n    Regresar\n  ")],1):e._e(),e._v(" "),e.folder_seleccionado.id>0?n("v-btn",{staticClass:"mb-n3",attrs:{color:"black",outlined:""},on:{click:function(t){e.dialogos.agregar_galeria=!0}}},[n("v-icon",{attrs:{left:"",color:"black"}},[e._v("\n      fa fa-image\n    ")]),e._v("\n    Nueva imágen\n  ")],1):e._e(),e._v(" "),n("v-row",{staticClass:"my-6",attrs:{justify:"center"}},[n("v-col",{attrs:{cols:"12",xl:"7",lg:"8"}},[!e.folder_seleccionado.id>0?n("v-list",{staticStyle:{"border-radius":"15px"},attrs:{subheader:"","two-line":""}},[n("v-subheader",{staticClass:"black--text",attrs:{inset:""}},[e._v("Negocios")]),e._v(" "),e._l(e.folders,(function(t,r){return n("div",{key:r},[n("v-divider"),e._v(" "),n("v-list-item",[n("v-list-item-avatar",[n("v-icon",{staticClass:"grey lighten-1",attrs:{dark:""}},[e._v("\n                fa fa-folder\n              ")])],1),e._v(" "),n("v-list-item-content",[n("v-list-item-title",{domProps:{textContent:e._s(t.titulo)}}),e._v(" "),n("v-list-item-subtitle",{domProps:{textContent:e._s(t.cantidadArchivos+" imágenes agregadas")}})],1),e._v(" "),n("v-list-item-action",[n("v-btn",{attrs:{icon:""},on:{click:function(n){return e.SeleccionarFolder(t)}}},[n("v-icon",{attrs:{color:"grey lighten-1"}},[e._v("fa fa-info-circle")])],1)],1)],1)],1)})),e._v(" "),n("v-divider")],2):n("v-list",{staticStyle:{"border-radius":"15px"},attrs:{subheader:"","two-line":""}},[n("v-subheader",{staticClass:"black--text",attrs:{inset:""}},[e._v("\n          Archivos ("+e._s(e.folder_seleccionado.titulo)+")\n        ")]),e._v(" "),e._l(e.negocios.galeria,(function(t,i){return n("div",{key:i},[n("v-divider"),e._v(" "),n("v-list-item",[n("v-list-item-avatar",[n("v-icon",{staticClass:"secondary",attrs:{dark:""}},[e._v("\n                fas fa-image\n              ")])],1),e._v(" "),n("v-list-item-content",[n("v-list-item-title",{staticClass:"text-wrap",domProps:{textContent:e._s(e.formatImageName(t))}}),e._v(" "),n("v-list-item-subtitle",{staticClass:"text-wrap",domProps:{textContent:e._s(e.formatDate(t.createdAt))}})],1),e._v(" "),n("v-list-item-action",[n("v-btn",{attrs:{icon:""},on:{click:function(n){return e.SeleccionarImagen(t)}}},[n("v-icon",{attrs:{color:"complementario"}},[e._v("fa fa-eye")])],1)],1)],1)],1)})),e._v(" "),n("v-divider"),e._v(" "),0===e.negocios.galeria.length?n("v-list-item",[n("v-list-item-content",[n("v-alert",{attrs:{type:"info",prominent:"",color:"complementario"}},[e._v("\n              Aún no se han agregado imagenes a la galería de este negocio\n            ")])],1)],1):e._e()],2)],1),e._v(" "),n("v-col",{attrs:{cols:"12",xl:"5",lg:"4",md:"8"}},[e.imagen_seleccionada.id>0?n("v-card",{staticStyle:{"border-radius":"15px"},attrs:{elevation:"0",outlined:""}},[n("v-img",{attrs:{"max-height":"400",src:e.imagen_seleccionada.img,"lazy-src":e.imagen_seleccionada.img}},[n("v-container",[n("v-row",{attrs:{align:"center",justify:"end"}},[n("v-btn",{attrs:{icon:""},on:{click:function(t){e.imagen_seleccionada={}}}},[n("v-icon",{attrs:{color:"white"}},[e._v("fa fa-times")])],1)],1)],1)],1),e._v(" "),n("v-card-actions",{staticClass:"ml-7"},[n("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,o=t.attrs;return[n("v-btn",e._g(e._b({attrs:{color:"black",dark:"",icon:""},on:{click:e.DescargarImagen}},"v-btn",o,!1),r),[n("v-icon",{attrs:{color:"black"}},[e._v("\n                  fas fa-save\n                ")])],1)]}}],null,!1,314567005)},[e._v(" "),n("span",[e._v("Descargar Imagen")])]),e._v(" "),n("v-tooltip",{staticClass:"mx-4",attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,o=t.attrs;return[n("v-btn",e._g(e._b({attrs:{color:"error",dark:"",icon:""},on:{click:e.EliminarImagen}},"v-btn",o,!1),r),[n("v-icon",{attrs:{color:"error"}},[e._v("\n                  fas fa-trash\n                ")])],1)]}}],null,!1,1568141967)},[e._v(" "),n("span",[e._v("Eliminar Imagen")])])],1),e._v(" "),n("v-divider"),e._v(" "),n("v-card-text",[n("v-list",[n("v-list-item",[n("v-list-item-avatar",[n("v-icon",{attrs:{color:"green"}},[e._v(" fa fa-image ")])],1),e._v(" "),n("v-list-item-content",[n("v-list-item-title",[e._v(" "+e._s(e.formatImageName(e.imagen_seleccionada))+" ")]),e._v(" "),n("v-list-item-subtitle",[e._v(" "+e._s(e.imagen_seleccionada.size)+" MB — Tipo de imagen "+e._s(e.imagen_seleccionada.tipo)+" ")])],1)],1)],1)],1)],1):e._e()],1)],1),e._v(" "),n("v-dialog",{attrs:{"max-width":"800",transition:"fab-transition",persistent:""},model:{value:e.dialogos.agregar_galeria,callback:function(t){e.$set(e.dialogos,"agregar_galeria",t)},expression:"dialogos.agregar_galeria"}},[n("v-card",{staticClass:"pa-6",staticStyle:{"border-radius":"15px"},attrs:{elevation:"0",outlined:""}},[n("v-toolbar",{staticClass:"hidden-sm-and-down",attrs:{elevation:"0",dense:"",color:"transparent"}},[n("v-spacer"),e._v(" "),n("h2",[e._v("Agregar imágenes a galería")]),e._v(" "),n("v-spacer"),e._v(" "),n("v-btn",{attrs:{icon:""},on:{click:e.CerrarDialogoAgregarGaleria}},[n("v-icon",[e._v("fa fa-times")])],1)],1),e._v(" "),n("v-toolbar",{staticClass:"hidden-md-and-up",attrs:{elevation:"0",dense:"",color:"transparent"}},[n("v-spacer"),e._v(" "),n("h3",[e._v("Agregar imágenes a galería")]),e._v(" "),n("v-spacer"),e._v(" "),n("v-btn",{attrs:{icon:""},on:{click:e.CerrarDialogoAgregarGaleria}},[n("v-icon",[e._v("fa fa-times")])],1)],1),e._v(" "),n("v-card-text",{staticClass:"pa-4"},[n("v-form",{ref:"frmGaleria"},[n("v-text-field",{staticStyle:{"border-radius":"10px"},attrs:{outlined:"",label:"Negocio seleccionado","prepend-inner-icon":"fa fa-briefcase",color:"black",readonly:""},model:{value:e.folder_seleccionado.titulo,callback:function(t){e.$set(e.folder_seleccionado,"titulo",t)},expression:"folder_seleccionado.titulo"}}),e._v(" "),n("v-file-input",{staticStyle:{"border-radius":"10px"},attrs:{outlined:"",accept:"image/*",rules:[function(e){return!!e||"Por favor ingrese una o más imágenes"}],label:"Nuevas imágenes para galería","prepend-inner-icon":"fa fa-images","prepend-icon":null,color:"black",multiple:""},scopedSlots:e._u([{key:"selection",fn:function(t){var text=t.text;return[n("v-chip",{attrs:{small:"",label:"",color:"secondary"}},[e._v("\n                "+e._s(text)+"\n              ")])]}}]),model:{value:e.negocios.imagenes,callback:function(t){e.$set(e.negocios,"imagenes",t)},expression:"negocios.imagenes"}})],1)],1),e._v(" "),n("v-card-actions",[n("v-spacer"),e._v(" "),n("v-btn",{attrs:{color:"secondary",large:""},on:{click:e.AgregarImagenesGaleria}},[n("v-icon",{attrs:{left:""}},[e._v("fa fa-folder-plus")]),e._v("\n          Agregar imágenes\n        ")],1)],1)],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;_()(component,{VAlert:h.a,VBtn:x.a,VCard:k.a,VCardActions:w.a,VCardText:w.c,VChip:y.a,VCol:I.a,VContainer:C.a,VDialog:A.a,VDivider:V.a,VFileInput:S.a,VForm:R.a,VIcon:$.a,VImg:O.a,VList:L.a,VListItem:D.a,VListItemAction:j.a,VListItemAvatar:G.a,VListItemContent:N.a,VListItemSubtitle:N.b,VListItemTitle:N.c,VRow:E.a,VSpacer:F.a,VSubheader:T.a,VTextField:Y.a,VToolbar:M.a,VTooltip:U.a})}}]);