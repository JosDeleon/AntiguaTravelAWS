(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{696:function(t,e,o){"use strict";o.d(e,"a",(function(){return c}));var n=o(84),r=o(0),c=Object(r.i)("v-toolbar__title"),l=Object(r.i)("v-toolbar__items");n.a},727:function(t,e,o){"use strict";o(9),o(6),o(78),o(24),o(274),o(273);var n=o(275),r=o(36);e.a=Object(n.a)("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var o,n=e.props,data=e.data,c=e.children,l=data.attrs;return l&&(data.attrs={},o=Object.keys(l).filter((function(t){if("slot"===t)return!1;var e=l[t];return t.startsWith("data-")?(data.attrs[t]=e,!1):e||"string"==typeof e}))),n.id&&(data.domProps=data.domProps||{},data.domProps.id=n.id),t(n.tag,Object(r.a)(data,{staticClass:"container",class:Array({"container--fluid":n.fluid}).concat(o||[])}),c)}})},815:function(t,e,o){"use strict";o.r(e);var n=o(20),r=(o(56),o(31),o(7),o(6),{mounted:function(){this.idAuth=JSON.parse(sessionStorage.getItem("usuario"))?"id"+JSON.parse(sessionStorage.getItem("usuario")).id:"",this.ObtenerChats(),this.ObtenerNegocios(),this.ObtenerUsuarios()},middleware:"VerificarUsuarioAuth",head:function(){return{titleTemplate:"Antigua Travel | Bandeja de Entrada"}},data:function(){return{clipped:!1,drawer:!1,fixed:!1,chat_pool:[],chats:{},seleccionado:0,userChats:[],negocios:{},usuarios:{},idAuth:-1,mensajesRef:null,mensajes:[]}},layout:"chat",methods:{CambiarChat:function(){this.$store.commit("setUsuarioChatActual",this.chat_pool[this.seleccionado]),this.mensajesRef=this.$fire.database.ref("chatMessages").child(this.$store.state.usuarioChatActual.idChat),this.ObtenerMensajes()},ObtenerNombreChat:function(t){return console.log(this.usuarios),this.chat_pool[this.seleccionado].negocio===t?this.negocios[t][this.chat_pool[this.seleccionado].key_negocio].nombreNegocio:this.usuarios[t].nombre},ObtenerImagenChat:function(t){if(this.chat_pool[this.seleccionado].negocio===t){var e=this.negocios[t][this.chat_pool[this.seleccionado].key_negocio].image;return""!==e?e:"https://www.timandorra.com/wp-content/uploads/2016/11/Imagen-no-disponible-282x300.png"}var o=this.usuarios[t].image;return""!==o?o:"https://www.timandorra.com/wp-content/uploads/2016/11/Imagen-no-disponible-282x300.png"},ObtenerChats:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=t.$fire.database.ref("Chats"),e.next=3,o.on("value",(function(e){t.chats=e.val(),t.ObtenerChatsUsuario()}),(function(t){console.log("La lectura en la DB fallo: "+t.name)}));case 3:case"end":return e.stop()}}),e)})))()},ObtenerMensajes:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.mensajesRef.on("value",(function(e){t.mensajes=[],e.exists()&&(Object.keys(e.val()).forEach((function(o){t.mensajes.push(e.val()[o])})),t.$vuetify.goTo(document.body.scrollHeight))}),(function(t){console.log("La lectura en la DB fallo: "+t.name)}));case 2:case"end":return e.stop()}}),e)})))()},ObtenerNegocios:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=t.$fire.database.ref("Negocios"),e.next=3,o.on("value",(function(e){t.negocios=e.val()}),(function(t){console.log("La lectura en la DB fallo: "+t.name)}));case 3:case"end":return e.stop()}}),e)})))()},ObtenerUsuarios:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=t.$fire.database.ref("Users"),e.next=3,o.on("value",(function(e){t.usuarios=e.val()}),(function(t){console.log("La lectura en la DB fallo: "+t.name)}));case 3:case"end":return e.stop()}}),e)})))()},ObtenerChatsUsuario:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=t.$fire.database.ref("userChats/"+t.idAuth),e.next=3,o.on("value",(function(e){t.userChats=[],t.chat_pool=[],t.userChats=e.val()?Object.keys(e.val()):[];var o=t.chats?Object.keys(t.chats):[];t.userChats.forEach((function(e){var n={};o.forEach((function(o){o===e&&(n=Object.assign({},t.chats[o]),Object.keys(n).forEach((function(o){n[o].usuario===t.idAuth&&(n[o].idChat=o,n[o].chat=e,t.chat_pool.push(n[o]))})))}))})),t.chat_pool.length>0?(t.mensajesRef=t.$fire.database.ref("chatMessages").child(t.chat_pool[0].idChat),t.$store.commit("setUsuarioChatActual",t.chat_pool[0]),t.$store.commit("setHideMessageField",!1),t.ObtenerMensajes()):t.$store.commit("setHideMessageField",!0)}),(function(t){console.log("La lectura en la DB fallo: "+t.name)}));case 3:case"end":return e.stop()}}),e)})))()}}}),c=o(26),l=o(77),h=o.n(l),d=o(725),m=o(708),v=o(116),f=o(255),_=o(258),w=o(709),y=o(727),j=o(251),C=o(189),x=o(194),O=o(711),k=o(252),A=o(156),V=o(254),I=o(41),M=o(256),$=o(713),N=o(714),P=o(715),R=o(696),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-container",{attrs:{fluid:"","fill-height":0===t.chat_pool.length}},[t.chat_pool&&t.chat_pool.length>0?o("v-navigation-drawer",{attrs:{clipped:t.clipped,fixed:"",app:"",width:"sm"===t.$vuetify.breakpoint.name||"xs"===t.$vuetify.breakpoint.name?350:500,color:"primary"},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[o("v-layout",{attrs:{"justify-center":""}},[o("v-img",{attrs:{src:"/logo-no-texto.png",contain:"",width:"250",height:"250"}})],1),t._v(" "),o("v-list",[o("v-list-item",[o("v-list-item-content",[o("v-autocomplete",{attrs:{outlined:"",rounded:"",dense:"","hide-details":"",placeholder:"Busqueda",label:"Busqueda","prepend-inner-icon":"mdi-magnify",color:"black",items:[],"item-value":"tag","item-text":"tag",clearable:"","clear-icon":"fa fa-times-circle","background-color":"white","item-color":"black",chips:"","small-chips":"",multiple:"","no-data-text":"No hay nadie con el nombre especificado"}})],1)],1),t._v(" "),o("v-divider"),t._v(" "),o("v-list-item-group",{attrs:{mandatory:"",color:"secondary"},on:{change:t.CambiarChat},model:{value:t.seleccionado,callback:function(e){t.seleccionado=e},expression:"seleccionado"}},t._l(t.chat_pool,(function(e,n){return o("v-list-item",{key:n,staticClass:"ma-2",attrs:{exact:"",link:"",outlined:""}},[o("v-list-item-avatar",[o("v-img",{attrs:{src:t.negocios&&""!==t.negocios[e.negocio][e.key_negocio].image?t.negocios[e.negocio][e.key_negocio].image:"https://www.timandorra.com/wp-content/uploads/2016/11/Imagen-no-disponible-282x300.png"}})],1),t._v(" "),o("v-list-item-content",[o("v-list-item-title",[o("h4",[t._v("\n                "+t._s(t.negocios?t.negocios[e.negocio][e.key_negocio].nombreNegocio:"")+"\n              ")]),t._v(" "),o("v-spacer"),t._v(" "),o("span",[t._v("\n                "+t._s(e.fechaHora?t.$moment(e.fechaHora,"L h:mm:ss a").fromNow():null)+"\n              ")])],1),t._v(" "),o("v-list-item-subtitle",[e.ultimoEnviadoPor===t.idAuth?o("div",[o("v-icon",{attrs:{small:""}},[t._v("fa fa-check")]),t._v("\n                "+t._s(""!==e.ultimoMensaje?e.ultimoMensaje:"Aún no hay mensajes en esta conversación")+"\n              ")],1):o("div",[t._v("\n                "+t._s(""!==e.ultimoMensaje?e.ultimoMensaje:"Aún no hay mensajes en esta conversación")+"\n              ")])])],1)],1)})),1)],1)],1):t._e(),t._v(" "),o("v-app-bar",{attrs:{fixed:"",app:"",flat:"",color:"primary",outlined:""}},[t.chat_pool&&t.chat_pool.length>0?o("v-app-bar-nav-icon",{attrs:{color:"secondary"},on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}):t._e(),t._v(" "),t.chat_pool&&t.chat_pool.length>0?o("v-avatar",{attrs:{size:"50"}},[o("v-img",{staticClass:"mr-2",attrs:{src:t.negocios&&t.chat_pool[t.seleccionado]&&""!==t.negocios[t.chat_pool[t.seleccionado].negocio][t.chat_pool[t.seleccionado].key_negocio].image?t.negocios[t.chat_pool[t.seleccionado].negocio][t.chat_pool[t.seleccionado].key_negocio].image:"https://www.timandorra.com/wp-content/uploads/2016/11/Imagen-no-disponible-282x300.png",width:"100",height:"100",contain:""}})],1):o("v-avatar",{attrs:{size:"60"}},[o("v-img",{staticClass:"mr-2",attrs:{src:"/logo-no-texto.png",width:"100",height:"100",contain:""}})],1),t._v(" "),t.chat_pool&&t.chat_pool.length>0?o("v-toolbar-title",[t._v("\n      "+t._s(t.negocios&&t.chat_pool[t.seleccionado]?t.negocios[t.chat_pool[t.seleccionado].negocio][t.chat_pool[t.seleccionado].key_negocio].nombreNegocio:"")+"\n    ")]):o("v-toolbar-title",{domProps:{textContent:t._s("No hay mensajes para mostrar")}})],1),t._v(" "),o("v-list-item-group",t._l(t.mensajes,(function(e,i){return o("v-row",{key:i,attrs:{justify:e.enviadoPor!==t.idAuth?"end":"start"}},[o("v-col",{attrs:{cols:"12"}},[o("v-layout",{attrs:{"justify-center":""}},[o("div",{staticClass:"text-secondary"},[t._v("\n            "+t._s(t.$moment.utc(e.fecha,"DD/MM/YYYY").format("D [ de ] MMMM YYYY"))+" a las "+t._s(e.hora)+"\n          ")])])],1),t._v(" "),o("v-col",{attrs:{cols:"10",xl:"4",lg:"4",md:"6",sm:"8",xs:"8"}},[o("v-card",{staticClass:"mb-2",staticStyle:{"border-radius":"50px"},attrs:{elevation:"0",outlined:""}},[o("v-list-item",{staticClass:"ma-2",attrs:{exact:"",link:""}},[e.enviadoPor===t.idAuth?o("v-list-item-avatar",{staticClass:"align-center"},[o("v-img",{attrs:{src:t.ObtenerImagenChat(e.enviadoPor)}})],1):t._e(),t._v(" "),o("v-list-item-content",{class:e.enviadoPor!==t.idAuth?"text-right align-self-start":null,attrs:{color:"white"}},[o("v-list-item-title",{domProps:{textContent:t._s(t.ObtenerNombreChat(e.enviadoPor))}}),t._v(" "),o("v-list-item-subtitle",{staticClass:"text-wrap",domProps:{textContent:t._s(e.mensaje)}})],1),t._v(" "),e.enviadoPor!==t.idAuth?o("v-list-item-avatar",{staticClass:"align-center"},[o("v-img",{attrs:{src:t.ObtenerImagenChat(e.enviadoPor)}})],1):t._e()],1)],1)],1)],1)})),1),t._v(" "),0===t.chat_pool.length?o("v-layout",{attrs:{"justify-center":"","align-center":"",row:"",wrap:""}},[o("v-row",{attrs:{align:"center",justify:"center"}},[o("v-col",{attrs:{cols:"12"}},[o("v-layout",{attrs:{"justify-center":""}},[o("v-icon",{attrs:{size:"150",color:"secondary"}},[t._v("\n\n            fa fa-exclamation-triangle\n\n          ")])],1)],1),t._v(" "),o("v-col",{attrs:{cols:"12"}},[o("v-layout",{attrs:{"justify-center":""}},[o("div",{staticClass:"subtitle justify-text",staticStyle:{"font-size":"18px"}},[t._v("\n            Aún no has iniciado ninguna conversación\n          ")])])],1)],1)],1):t._e()],1)}),[],!1,null,null,null);e.default=component.exports;h()(component,{VAppBar:d.a,VAppBarNavIcon:m.a,VAutocomplete:v.a,VAvatar:f.a,VCard:_.a,VCol:w.a,VContainer:y.a,VDivider:j.a,VIcon:C.a,VImg:x.a,VLayout:O.a,VList:k.a,VListItem:A.a,VListItemAvatar:V.a,VListItemContent:I.a,VListItemGroup:M.a,VListItemSubtitle:I.b,VListItemTitle:I.c,VNavigationDrawer:$.a,VRow:N.a,VSpacer:P.a,VToolbarTitle:R.a})}}]);