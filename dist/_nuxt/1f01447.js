(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{836:function(e,t,r){"use strict";r.r(t);r(21),r(59),r(34),r(6),r(60),r(73),r(37);var n=r(19),o=(r(7),r(28),r(52),r(31),r(80),r(36),r(57),r(741));function c(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"==typeof e)return l(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return l(e,t)}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var i=0,n=function(){};return{s:n,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,d=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return c=e.done,e},e:function(e){d=!0,o=e},f:function(){try{c||null==r.return||r.return()}finally{if(d)throw o}}}}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,r=new Array(t);i<t;i++)r[i]=e[i];return r}var d={mounted:function(){this.$store.commit("setRutaActual","Galeria de Imágenes"),this.ObtenerNegociosAuth()},components:{VueGallerySlideshow:r.n(o).a},layout:"admin_negocio",data:function(){return{dialogos:{agregar_galeria:!1},folders:[],folder_seleccionado:{},imagen_seleccionada:{},negocios:{listado:[],seleccionado:{},galeria:[],imagenes:[]}}},methods:{ObtenerGaleria:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$api.post("/galeria/negocio",{negocioId:e.folder_seleccionado.id});case 2:e.negocios.galeria=t.sent;case 3:case"end":return t.stop()}}),t)})))()},ObtenerNegociosAuth:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r,n,o,l;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!JSON.parse(sessionStorage.getItem("usuario"))){t.next=24;break}return e.folders=[],t.next=4,e.$api.post("/negocios/usuario",{usuarioId:JSON.parse(sessionStorage.getItem("usuario")).id});case 4:e.negocios.listado=t.sent,r=c(e.negocios.listado),t.prev=6,r.s();case 8:if((n=r.n()).done){t.next=16;break}return o=n.value,t.next=12,e.$fire.storage.ref("negocios/"+o.id).child("galeria").listAll();case 12:l=t.sent,e.folders.push({id:o.id,titulo:o.nombre,cantidadArchivos:l.items.length});case 14:t.next=8;break;case 16:t.next=21;break;case 18:t.prev=18,t.t0=t.catch(6),r.e(t.t0);case 21:return t.prev=21,r.f(),t.finish(21);case 24:case"end":return t.stop()}}),t,null,[[6,18,21,24]])})))()},AgregarImagenesGaleria:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.negocios.imagenes&&0===e.negocios.imagenes.length?e.$alert.warning("Debes de seleccionar una o más imágenes","Selecciona Imágenes"):(e.negocios.imagenes.forEach((function(t){e.$fire.storage.ref("negocios/"+e.folder_seleccionado.id+"/galeria/"+t.name.split(".")[0]).put(t).then((function(t){t.ref.getDownloadURL().then(function(){var t=Object(n.a)(regeneratorRuntime.mark((function t(r){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.negocios.galeria.find((function(e){return e.img===r}))){t.next=5;break}return n={negocioId:e.folder_seleccionado.id,img:r},t.next=5,e.$api.post("/galeria",n).then((function(data){e.ObtenerGaleria()}));case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}))})),e.CerrarDialogoAgregarGaleria(),e.$alert.exito("Las imágenes fueron agregadas a la galería","Imágenes Agregadas"));case 1:case"end":return t.stop()}}),t)})))()},DescargarImagen:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:window.open(e.imagen_seleccionada.img,"_blank");case 1:case"end":return t.stop()}}),t)})))()},EliminarImagen:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.$alert.confirm("¿Estás seguro que deseas eliminar esta imagen de la galería?","Eliminar Imagen").then(Object(n.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r={id:e.imagen_seleccionada.id},t.next=3,e.$api.delete("/galeria/img",r).then((function(data){e.$fire.storage.refFromURL(e.imagen_seleccionada.img).delete(),e.imagen_seleccionada={},e.ObtenerGaleria(),e.$alert.exito("La imagen fue eliminada exitosamente","Imagen Eliminada")}));case 3:case"end":return t.stop()}}),t)}))));case 1:case"end":return t.stop()}}),t)})))()},CerrarDialogoAgregarGaleria:function(){var e;this.dialogos.agregar_galeria=!1,this.negocios.imagenes=[],null===(e=this.$refs.frmGaleria)||void 0===e||e.resetValidation()},SeleccionarFolder:function(e){var t=this;return Object(n.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:t.folder_seleccionado=e,t.ObtenerGaleria();case 2:case"end":return r.stop()}}),r)})))()},formatDate:function(e){return this.$moment.utc(e,"YYYY-MM-DD h:mm:ss").format("dddd, LL [a las ] h:mm:ss a").charAt(0).toUpperCase()+this.$moment.utc(e,"YYYY-MM-DD h:mm:ss").format("dddd, LL [a las ] h:mm:ss a").slice(1)},formatImageName:function(e){return e.img.split("negocios")[1].split("2F")[3].split("?")[0]},LimpiarBusqueda:function(){this.folder_seleccionado={},this.ObtenerNegociosAuth()}}},v=d,m=r(26),f=r(69),_=r.n(f),h=r(760),x=r(157),k=r(263),w=r(79),y=r(265),I=r(722),C=r(740),A=r(730),V=r(256),S=r(787),R=r(731),O=r(196),$=r(202),D=r(257),L=r(158),j=r(258),G=r(259),N=r(41),E=r(727),Y=r(728),F=r(264),T=r(94),M=r(84),P=r(729),component=Object(m.a)(v,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",{attrs:{fluid:""}},[e.folder_seleccionado.id>0?r("v-btn",{staticClass:"mb-n3",attrs:{color:"complementario",outlined:""},on:{click:e.LimpiarBusqueda}},[r("v-icon",{attrs:{left:"",color:"complementario"}},[e._v("\n      fa fa-arrow-left\n    ")]),e._v("\n    Regresar\n  ")],1):e._e(),e._v(" "),e.folder_seleccionado.id>0?r("v-btn",{staticClass:"mb-n3",attrs:{color:"black",outlined:""},on:{click:function(t){e.dialogos.agregar_galeria=!0}}},[r("v-icon",{attrs:{left:"",color:"black"}},[e._v("\n      fa fa-image\n    ")]),e._v("\n    Nueva imágen\n  ")],1):e._e(),e._v(" "),r("v-row",{staticClass:"my-6",attrs:{justify:"center"}},[r("v-col",{attrs:{cols:"12",xl:"7",lg:"8"}},[!e.folder_seleccionado.id>0?r("v-list",{staticStyle:{"border-radius":"15px"},attrs:{subheader:"","two-line":""}},[r("v-subheader",{staticClass:"black--text",attrs:{inset:""}},[e._v("Negocios")]),e._v(" "),e._l(e.folders,(function(t,n){return r("div",{key:n},[r("v-divider"),e._v(" "),r("v-list-item",[r("v-list-item-avatar",[r("v-icon",{staticClass:"grey lighten-1",attrs:{dark:""}},[e._v("\n                fa fa-folder\n              ")])],1),e._v(" "),r("v-list-item-content",[r("v-list-item-title",{domProps:{textContent:e._s(t.titulo)}}),e._v(" "),r("v-list-item-subtitle",{domProps:{textContent:e._s(t.cantidadArchivos+" imágenes agregadas")}})],1),e._v(" "),r("v-list-item-action",[r("v-btn",{attrs:{icon:""},on:{click:function(r){return e.SeleccionarFolder(t)}}},[r("v-icon",{attrs:{color:"grey lighten-1"}},[e._v("fa fa-info-circle")])],1)],1)],1)],1)})),e._v(" "),r("v-divider")],2):r("v-list",{staticStyle:{"border-radius":"15px"},attrs:{subheader:"","two-line":""}},[r("v-subheader",{staticClass:"black--text",attrs:{inset:""}},[e._v("\n          Archivos ("+e._s(e.folder_seleccionado.titulo)+")\n        ")]),e._v(" "),e._l(e.negocios.galeria,(function(t,i){return r("div",{key:i},[r("v-divider"),e._v(" "),r("v-list-item",[r("v-list-item-avatar",[r("v-icon",{staticClass:"secondary",attrs:{dark:""}},[e._v("\n                fas fa-image\n              ")])],1),e._v(" "),r("v-list-item-content",[r("v-list-item-title",{staticClass:"text-wrap",domProps:{textContent:e._s(e.formatImageName(t))}}),e._v(" "),r("v-list-item-subtitle",{staticClass:"text-wrap",domProps:{textContent:e._s(e.formatDate(t.createdAt))}})],1),e._v(" "),r("v-list-item-action",[r("v-btn",{attrs:{icon:""},on:{click:function(r){e.imagen_seleccionada=t}}},[r("v-icon",{attrs:{color:"complementario"}},[e._v("fa fa-eye")])],1)],1)],1)],1)})),e._v(" "),r("v-divider"),e._v(" "),0===e.negocios.galeria.length?r("v-list-item",[r("v-list-item-content",[r("v-alert",{attrs:{type:"info",prominent:"",color:"complementario"}},[e._v("\n              Aún no se han agregado imagenes a la galería de este negocio\n            ")])],1)],1):e._e()],2)],1),e._v(" "),r("v-col",{attrs:{cols:"12",xl:"5",lg:"4",md:"8"}},[e.imagen_seleccionada.id>0?r("v-card",{staticStyle:{"border-radius":"15px"},attrs:{elevation:"0",outlined:""}},[r("v-img",{attrs:{"max-height":"400",src:e.imagen_seleccionada.img,"lazy-src":e.imagen_seleccionada.img}},[r("v-container",[r("v-row",{attrs:{align:"center",justify:"end"}},[r("v-btn",{attrs:{icon:""},on:{click:function(t){e.imagen_seleccionada={}}}},[r("v-icon",{attrs:{color:"white"}},[e._v("fa fa-times")])],1)],1)],1)],1),e._v(" "),r("v-card-actions",{staticClass:"ml-7"},[r("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var n=t.on,o=t.attrs;return[r("v-btn",e._g(e._b({attrs:{color:"black",dark:"",icon:""},on:{click:e.DescargarImagen}},"v-btn",o,!1),n),[r("v-icon",{attrs:{color:"black"}},[e._v("\n                  fas fa-save\n                ")])],1)]}}],null,!1,314567005)},[e._v(" "),r("span",[e._v("Descargar Imagen")])]),e._v(" "),r("v-tooltip",{staticClass:"mx-4",attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var n=t.on,o=t.attrs;return[r("v-btn",e._g(e._b({attrs:{color:"error",dark:"",icon:""},on:{click:e.EliminarImagen}},"v-btn",o,!1),n),[r("v-icon",{attrs:{color:"error"}},[e._v("\n                  fas fa-trash\n                ")])],1)]}}],null,!1,1568141967)},[e._v(" "),r("span",[e._v("Eliminar Imagen")])])],1),e._v(" "),r("v-divider"),e._v(" "),r("v-card-text",[r("v-list",[r("v-list-item",[r("v-list-item-avatar",[r("v-icon",{attrs:{color:"green"}},[e._v(" fa fa-image ")])],1),e._v(" "),r("v-list-item-content",[r("v-list-item-title",[e._v(" "+e._s(e.formatImageName(e.imagen_seleccionada))+" ")]),e._v(" "),r("v-list-item-subtitle",[e._v(" 420KB — Tipo de imagen png ")])],1)],1)],1)],1)],1):e._e()],1)],1),e._v(" "),r("v-dialog",{attrs:{"max-width":"800",transition:"fab-transition",persistent:""},model:{value:e.dialogos.agregar_galeria,callback:function(t){e.$set(e.dialogos,"agregar_galeria",t)},expression:"dialogos.agregar_galeria"}},[r("v-card",{staticClass:"pa-6",staticStyle:{"border-radius":"15px"},attrs:{elevation:"0",outlined:""}},[r("v-toolbar",{staticClass:"hidden-sm-and-down",attrs:{elevation:"0",dense:"",color:"transparent"}},[r("v-spacer"),e._v(" "),r("h2",[e._v("Agregar imágenes a galería")]),e._v(" "),r("v-spacer"),e._v(" "),r("v-btn",{attrs:{icon:""},on:{click:e.CerrarDialogoAgregarGaleria}},[r("v-icon",[e._v("fa fa-times")])],1)],1),e._v(" "),r("v-toolbar",{staticClass:"hidden-md-and-up",attrs:{elevation:"0",dense:"",color:"transparent"}},[r("v-spacer"),e._v(" "),r("h3",[e._v("Agregar imágenes a galería")]),e._v(" "),r("v-spacer"),e._v(" "),r("v-btn",{attrs:{icon:""},on:{click:e.CerrarDialogoAgregarGaleria}},[r("v-icon",[e._v("fa fa-times")])],1)],1),e._v(" "),r("v-card-text",{staticClass:"pa-4"},[r("v-form",{ref:"frmGaleria"},[r("v-text-field",{staticStyle:{"border-radius":"10px"},attrs:{outlined:"",label:"Negocio seleccionado","prepend-inner-icon":"fa fa-briefcase",color:"black",readonly:""},model:{value:e.folder_seleccionado.titulo,callback:function(t){e.$set(e.folder_seleccionado,"titulo",t)},expression:"folder_seleccionado.titulo"}}),e._v(" "),r("v-file-input",{staticStyle:{"border-radius":"10px"},attrs:{outlined:"",accept:"image/*",rules:[function(e){return!!e||"Por favor ingrese una o más imágenes"}],label:"Nuevas imágenes para galería","prepend-inner-icon":"fa fa-images","prepend-icon":null,color:"black",multiple:""},scopedSlots:e._u([{key:"selection",fn:function(t){var text=t.text;return[r("v-chip",{attrs:{small:"",label:"",color:"secondary"}},[e._v("\n                "+e._s(text)+"\n              ")])]}}]),model:{value:e.negocios.imagenes,callback:function(t){e.$set(e.negocios,"imagenes",t)},expression:"negocios.imagenes"}})],1)],1),e._v(" "),r("v-card-actions",[r("v-spacer"),e._v(" "),r("v-btn",{attrs:{color:"secondary",large:""},on:{click:e.AgregarImagenesGaleria}},[r("v-icon",{attrs:{left:""}},[e._v("fa fa-folder-plus")]),e._v("\n          Agregar imágenes\n        ")],1)],1)],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;_()(component,{VAlert:h.a,VBtn:x.a,VCard:k.a,VCardActions:w.a,VCardText:w.c,VChip:y.a,VCol:I.a,VContainer:C.a,VDialog:A.a,VDivider:V.a,VFileInput:S.a,VForm:R.a,VIcon:O.a,VImg:$.a,VList:D.a,VListItem:L.a,VListItemAction:j.a,VListItemAvatar:G.a,VListItemContent:N.a,VListItemSubtitle:N.b,VListItemTitle:N.c,VRow:E.a,VSpacer:Y.a,VSubheader:F.a,VTextField:T.a,VToolbar:M.a,VTooltip:P.a})}}]);