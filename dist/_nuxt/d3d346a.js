(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{776:function(t,e,o){var content=o(831);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(16).default)("1ca278a4",content,!0,{sourceMap:!1})},830:function(t,e,o){"use strict";o(776)},831:function(t,e,o){var n=o(15)(!1);n.push([t.i,".my-event[data-v-ab7e6c76]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;border-radius:2px;background-color:#1867c0;color:#fff;border:1px solid #1867c0;font-size:12px;padding:3px;cursor:pointer;margin-bottom:1px;left:4px;margin-right:8px;position:relative}.my-event.with-time[data-v-ab7e6c76]{position:absolute;right:4px;margin-right:0}",""]),t.exports=n},873:function(t,e,o){"use strict";o.r(e);var n={mounted:function(){this.$refs.calendar.scrollToTime("08:00")},layout:"empty",computed:{today:function(){this.$moment()}},data:function(){return{focus:"",tipos:{seleccionado:"month",listado:{month:"Mes",week:"Semana",day:"Día"},iconos:{month:"fa fa-calendar",week:"fa fa-calendar-week",day:"fa fa-calendar-day"}},names:["Meeting","Holiday","PTO","Travel","Event","Birthday","Conference","Party"],events:[{name:"Reserva en suite, Solei",start:"2021-10-07 07:30",end:"2021-10-08"},{name:"Reserva en taco bell",start:"2021-10-10"},{name:"Reserva en suite, Hotel Santo Domingo",start:"2021-10-14 07:30",end:"2021-10-15 08:30"}]}},methods:{hoy:function(){this.focus=""},previo:function(){this.$refs.calendar.prev()},siguiente:function(){this.$refs.calendar.next()},viewDay:function(t){var e=t.date;this.focus=e,this.tipos.seleccionado="day"},updateRange:function(t){for(var e=t.start,o=t.end,n=[],r=new Date("".concat(e.date,"T00:00:00")),c=new Date("".concat(o.date,"T23:59:59")),l=(c.getTime()-r.getTime())/864e5,v=this.rnd(l,l+20),i=0;i<v;i++){var d=0===this.rnd(0,3),f=this.rnd(r.getTime(),c.getTime()),m=new Date(f-f%9e5),h=9e5*this.rnd(2,d?288:8),_=new Date(m.getTime()+h);n.push({name:this.names[this.rnd(0,this.names.length-1)],start:m,end:_})}this.events=n},rnd:function(a,b){return Math.floor((b-a+1)*Math.random())+a}}},r=(o(830),o(24)),c=o(56),l=o.n(c),v=o(742),d=o(262),f=o(158),m=o(851),h=o(726),_=o(744),y=o(198),w=o(204),k=o(259),x=o(159),V=o(28),T=o(268),$=o(731),D=o(73),C=o(732),M=o(83),S=o(281),R=o(733),component=Object(r.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-container",{attrs:{fluid:""}},[o("v-app-bar",{attrs:{fixed:"",app:"",flat:"",color:"primary",outlined:""}},[o("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,r=e.attrs;return[o("v-btn",t._g(t._b({attrs:{color:"secondary",dark:"",icon:""},on:{click:function(e){t.$router.push({path:t.$nuxt.context.from.path?t.$nuxt.context.from.path:"/"})}}},"v-btn",r,!1),n),[o("v-icon",{attrs:{color:"secondary"}},[t._v(" fa fa-arrow-left ")])],1)]}}])},[t._v(" "),o("span",[t._v("Regresar")])]),t._v(" "),o("v-avatar",{attrs:{size:"60"}},[o("v-img",{staticClass:"mr-2",attrs:{src:"/logo-no-texto.png",width:"100",height:"100",contain:""}})],1),t._v(" "),o("v-toolbar-title",{domProps:{textContent:t._s("Historial de Reservaciones")}})],1),t._v(" "),o("v-row",[o("v-col",[o("v-sheet",{attrs:{height:"64"}},[o("v-toolbar",{attrs:{flat:""}},[o("v-btn",{staticClass:"mr-4",attrs:{outlined:"",color:"grey darken-2"},on:{click:t.hoy}},[o("v-icon",{attrs:{left:""}},[t._v("fa fa-calendar-day")]),t._v("\n            Hoy\n          ")],1),t._v(" "),o("v-btn",{attrs:{fab:"",text:"",small:"",color:"grey darken-2"},on:{click:t.previo}},[o("v-icon",{attrs:{small:""}},[t._v("\n              fa fa-chevron-left\n            ")])],1),t._v(" "),o("v-btn",{attrs:{fab:"",text:"",small:"",color:"grey darken-2"},on:{click:t.siguiente}},[o("v-icon",{attrs:{small:""}},[t._v("\n              fa fa-chevron-right\n            ")])],1),t._v(" "),t.$refs.calendar?o("v-toolbar-title",[t._v("\n            "+t._s(t.$refs.calendar.title.charAt(0).toUpperCase()+t.$refs.calendar.title.substring(1))+"\n          ")]):t._e(),t._v(" "),o("v-spacer"),t._v(" "),o("v-menu",{attrs:{bottom:"",right:""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,r=e.attrs;return[o("v-btn",t._g(t._b({attrs:{outlined:"",color:"grey darken-2"}},"v-btn",r,!1),n),[o("v-icon",{attrs:{left:""}},[t._v("\n                  "+t._s(t.tipos.iconos[t.tipos.seleccionado])+"\n                ")]),t._v(" "),o("span",[t._v(t._s(t.tipos.listado[t.tipos.seleccionado]))]),t._v(" "),o("v-icon",{attrs:{right:""}},[t._v("\n                  mdi-menu-down\n                ")])],1)]}}])},[t._v(" "),o("v-list",[o("v-list-item",{on:{click:function(e){t.tipos.seleccionado="day"}}},[o("v-list-item-content",[o("v-list-item-title",[t._v("Día")])],1)],1),t._v(" "),o("v-list-item",{on:{click:function(e){t.tipos.seleccionado="week"}}},[o("v-list-item-title",[t._v("Semana")])],1),t._v(" "),o("v-list-item",{on:{click:function(e){t.tipos.seleccionado="month"}}},[o("v-list-item-title",[t._v("Mes")])],1)],1)],1)],1)],1),t._v(" "),o("v-sheet",[o("v-calendar",{ref:"calendar",attrs:{type:t.tipos.seleccionado,now:t.today,events:t.events,color:"secondary","event-color":"secondary"},on:{"click:more":t.viewDay,"click:date":t.viewDay},model:{value:t.focus,callback:function(e){t.focus=e},expression:"focus"}})],1)],1)],1)],1)}),[],!1,null,"ab7e6c76",null);e.default=component.exports;l()(component,{VAppBar:v.a,VAvatar:d.a,VBtn:f.a,VCalendar:m.a,VCol:h.a,VContainer:_.a,VIcon:y.a,VImg:w.a,VList:k.a,VListItem:x.a,VListItemContent:V.a,VListItemTitle:V.c,VMenu:T.a,VRow:$.a,VSheet:D.a,VSpacer:C.a,VToolbar:M.a,VToolbarTitle:S.a,VTooltip:R.a})}}]);