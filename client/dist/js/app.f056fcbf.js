(function(t){function e(e){for(var n,i,o=e[0],c=e[1],l=e[2],d=0,v=[];d<o.length;d++)i=o[d],r[i]&&v.push(r[i][0]),r[i]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);u&&u(e);while(v.length)v.shift()();return s.push.apply(s,l||[]),a()}function a(){for(var t,e=0;e<s.length;e++){for(var a=s[e],n=!0,o=1;o<a.length;o++){var c=a[o];0!==r[c]&&(n=!1)}n&&(s.splice(e--,1),t=i(i.s=a[0]))}return t}var n={},r={app:0},s=[];function i(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=t,i.c=n,i.d=function(t,e,a){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(a,n,function(e){return t[e]}.bind(null,n));return a},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var u=c;s.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"034f":function(t,e,a){"use strict";var n=a("1356"),r=a.n(n);r.a},"08be":function(t,e,a){"use strict";var n=a("b205"),r=a.n(n);r.a},1356:function(t,e,a){},"28f2":function(t,e,a){"use strict";var n=a("d8bc"),r=a.n(n);r.a},4342:function(t,e,a){},"56d7":function(t,e,a){"use strict";a.r(e);a("cadf"),a("551c"),a("f751"),a("097d");var n=a("2b0e"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",{staticClass:"application"},[a("router-view"),t.isLogged?a("Navbar"):t._e()],1)},s=[],i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-bottom-nav",{attrs:{active:t.bottomNav,color:t.color,value:!0,fixed:"",dark:"",shift:""},on:{"update:active":function(e){t.bottomNav=e}}},[a("router-link",{attrs:{to:"/profile"}},[a("v-btn",{attrs:{dark:""}},[a("span",[t._v("Профиль")]),a("v-icon",[t._v("person")])],1)],1),a("router-link",{attrs:{to:"/"}},[a("v-btn",{attrs:{dark:""}},[a("span",[t._v("Квесты")]),a("v-icon",[t._v("location_on")])],1)],1),a("router-link",{attrs:{to:"/teams"}},[a("v-btn",{attrs:{dark:""}},[a("span",[t._v("Команда")]),a("v-icon",[t._v("people")])],1)],1)],1)},o=[],c=(a("7f7f"),{name:"Navbar",props:{msg:String},data:function(){return{}},computed:{color:function(){switch(this.$route.name){case"profile":return"#353941";case"events":return"#4ab8e1";case"teams":return"#ffab2d";case"Riddle":return"black";default:return"#4ab8e1"}},bottomNav:function(){switch(this.$route.name){case"profile":return 0;case"events":return 1;case"teams":return 2;case"Riddle":return 1;default:return 1}}}}),l=c,u=a("2877"),d=a("6544"),v=a.n(d),p=a("887a"),f=a("8336"),g=a("132d"),m=Object(u["a"])(l,i,o,!1,null,"62609678",null),h=m.exports;v()(m,{VBottomNav:p["a"],VBtn:f["a"],VIcon:g["a"]});var b={name:"App",components:{Navbar:h},data:function(){return{}},computed:{isLogged:function(){return this.$store.state.authentication.status.loggedIn},isLoading:function(){return this.$store.state.quest.isLoading}}},y=b,_=(a("034f"),a("7496")),x=Object(u["a"])(y,r,s,!1,null,null,null),w=x.exports;v()(x,{VApp:_["a"]});a("6762");var O=a("8c4f"),k=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"login"},[a("v-container",{staticStyle:{height:"100%"},attrs:{dark:""}},[a("v-layout",{staticStyle:{height:"100%"},attrs:{"align-center":"","align-content-center":"","justify-center":"",dark:""}},[a("v-flex",{staticClass:"mx-3 col-xs-12 col-md-6"},[a("h2",{staticStyle:{"font-size":"40px","text-align":"center",color:"white","font-family":"Montserrat"}},[t._v("NetQuest")]),a("transition",{attrs:{appear:""}},[a("v-tabs",{staticStyle:{width:"100%"},attrs:{dark:"",grow:"",centered:"",color:"transparent","slider-color":"orange"}},[a("v-tab",{attrs:{ripple:""}},[t._v("Вход")]),a("v-tab",{attrs:{ripple:""}},[t._v("Я играю впервые")]),a("v-tab-item",[a("v-form",{attrs:{dark:""},on:{submit:function(e){return e.preventDefault(),t.handleAuth(e)}}},[a("v-text-field",{attrs:{dark:"",label:"E-mail",required:""},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),a("v-text-field",{attrs:{dark:"",type:"password",label:"Пароль",required:""},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),a("v-layout",{attrs:{"justify-left":"","align-center":""}},[a("span",{staticStyle:{"font-size":"30px","font-weight":"600",color:"white"}},[t._v("Войти")]),a("v-btn",{staticStyle:{"background-color":"white",color:"black"},attrs:{loading:t.loading,fab:"",type:"submit"}},[a("v-icon",[t._v("send")])],1)],1)],1)],1),a("v-tab-item",[a("v-form",{attrs:{dark:""},on:{submit:function(e){return e.preventDefault(),t.handleReg(e)}}},[a("v-text-field",{attrs:{dark:"",label:"Фамилия и Имя",required:""},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),a("v-text-field",{attrs:{dark:"",label:"E-mail",required:""},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),a("v-text-field",{attrs:{dark:"",type:"password",label:"Пароль",required:""},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),a("v-layout",{attrs:{"align-center":""}},[a("span",{staticStyle:{"font-size":"30px","font-weight":"600",color:"white"}},[t._v("В игру")]),a("v-btn",{staticClass:"mx-2",staticStyle:{"background-color":"white",color:"black"},attrs:{fab:"",loading:t.loading,type:"submit"}},[a("v-icon",{attrs:{loading:t.loading}},[t._v("lock")])],1)],1)],1)],1)],1)],1)],1)],1)],1)],1)},j=[],C=(a("8e6e"),a("ac6a"),a("456d"),a("bd86")),S=a("2f62");function V(t,e){var a=Object.keys(t);return Object.getOwnPropertySymbols&&a.push.apply(a,Object.getOwnPropertySymbols(t)),e&&(a=a.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),a}function P(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?V(a,!0).forEach(function(e){Object(C["a"])(t,e,a[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):V(a).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))})}return t}var E={name:"Login",components:{},data:function(){return{name:"",email:"",password:"",date:"",menu:!1}},computed:P({},Object(S["c"])("authentication",{loading:function(t){return t.loading}})),methods:{handleAuth:function(){var t=this.email,e=this.password,a=this.$store.dispatch;t&&e&&a("authentication/login",{email:t,password:e})},handleReg:function(){var t=this.name,e=this.email,a=this.password,n=this.$store.dispatch;e&&a&&t&&n("authentication/register",{name:t,email:e,password:a})}}},I=E,q=(a("9cee"),a("a523")),T=a("0e8f"),D=a("4bd4"),$=a("a722"),R=a("71a3"),L=a("c671"),A=a("fe57"),B=a("2677"),N=Object(u["a"])(I,k,j,!1,null,"51883858",null),F=N.exports;v()(N,{VBtn:f["a"],VContainer:q["a"],VFlex:T["a"],VForm:D["a"],VIcon:g["a"],VLayout:$["a"],VTab:R["a"],VTabItem:L["a"],VTabs:A["a"],VTextField:B["a"]});var Q=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("section",{staticClass:"events"},[a("div",{staticClass:"header"},[a("div",{staticClass:"header__name"},[t._v("События")]),a("div",{staticClass:"header__sub"},[t._v("Актуальное")]),a("v-flex",{staticStyle:{"z-index":"999","margin-top":"5px"},attrs:{xs12:""}},[a("router-link",{attrs:{to:"/event/"+t.actualEvent[0]._id}},[t.actualEvent[0]?a("v-card",{staticClass:"blue--text",staticStyle:{"border-radius":"5px"},attrs:{ripple:"",elevation:"24",color:"white darken-2"}},[a("v-layout",[a("v-flex",{attrs:{xs5:""}},[a("v-img",{staticStyle:{"border-radius":"5px"},attrs:{src:t.actualEvent[0].image,height:"100%",cover:""}})],1),a("v-flex",{attrs:{xs7:""}},[a("v-card-title",[a("div",[a("div",{staticClass:"headline"},[t._v(t._s(t.actualEvent[0].title))]),a("div",[t._v(t._s(t.actualEvent[0].dateStart))]),t.loading?a("v-progress-circular",{attrs:{indeterminate:"",color:"primary"}}):t._e()],1)])],1)],1)],1):t._e()],1)],1)],1),t.events?a("v-container",{staticClass:"contents"},[a("v-layout",[a("h2",{staticClass:"content__subheader"},[t._v("Предстоящие игры")])]),t._l(t.events,function(e){return a("v-layout",{key:e.id,staticClass:"mt-2 mb-2",staticStyle:{"z-index":"1"}},[a("v-flex",{attrs:{xs12:""}},[a("router-link",{attrs:{to:"/event/"+e._id}},[a("v-card",{staticClass:"blue--text",staticStyle:{"border-radius":"5px"},attrs:{ripple:"",color:"white darken-2"}},[a("v-layout",[a("v-flex",{attrs:{xs5:""}},[a("v-img",{staticStyle:{"border-radius":"5px"},attrs:{src:e.image,height:"100px",cover:""}})],1),a("v-flex",{attrs:{xs7:""}},[a("v-card-title",[a("div",[a("div",{staticClass:"headline"},[t._v(t._s(e.title))]),a("div",[t._v(t._s(e.dateStart))])])])],1)],1)],1)],1)],1)],1)})],2):t._e()],1)])},J=[];function z(t,e){var a=Object.keys(t);return Object.getOwnPropertySymbols&&a.push.apply(a,Object.getOwnPropertySymbols(t)),e&&(a=a.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),a}function M(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?z(a,!0).forEach(function(e){Object(C["a"])(t,e,a[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):z(a).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))})}return t}var U={name:"Events",components:{},data:function(){return{}},computed:M({},Object(S["b"])({events:"quest/events",actualEvent:"quest/actualEvent"}),{},Object(S["c"])("quest",{loading:function(t){return t.loading}})),methods:{},beforeCreate:function(){this.$store.dispatch("quest/getEvents")},updated:function(){}},H=U,G=(a("6f07"),a("b0af")),K=a("12b2"),W=a("adda"),X=a("490a"),Y=Object(u["a"])(H,Q,J,!1,null,"68220579",null),Z=Y.exports;v()(Y,{VCard:G["a"],VCardTitle:K["a"],VContainer:q["a"],VFlex:T["a"],VImg:W["a"],VLayout:$["a"],VProgressCircular:X["a"]});var tt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"events"},[a("div",{staticClass:"header"},[a("div",{staticClass:"header__name"},[t._v("Команда")]),a("div",{staticClass:"search-box"},[a("div",{staticClass:"search-box__title"},[t._v("Найти команду")]),a("v-text-field",{attrs:{solo:"",label:"Введите название","append-icon":"search"}})],1)]),a("v-container",{staticClass:"content"},[a("v-layout",[a("div",{staticStyle:{"margin-top":"-20px"},attrs:{width:"80%"}},[a("h2",{staticClass:"content__subheader"},[t._v("Ведутся ремонтные работы")]),a("img",{attrs:{src:"https://cdn.dribbble.com/users/758377/screenshots/6193921/ezgif.com-crop__2_.gif",width:"100%"}})])])],1)],1)},et=[],at={name:"Events",components:{},data:function(){return{}},created:function(){}},nt=at,rt=(a("08be"),Object(u["a"])(nt,tt,et,!1,null,"5790c678",null)),st=rt.exports;v()(rt,{VContainer:q["a"],VLayout:$["a"],VTextField:B["a"]});var it=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"events"},[a("div",{staticClass:"header"},[a("v-layout",{attrs:{"justify-space-between":"","align-center":""}},[a("div",{staticClass:"header__name"},[t._v("Профиль")]),a("v-btn",{attrs:{fab:"",small:"",flat:""}},[a("v-icon",{attrs:{color:"white",text:"edit"}},[t._v("edit")])],1)],1),a("v-card",{staticStyle:{"border-radius":"5px"},attrs:{ripple:"",elevation:"24",color:"white darken-2"}},[a("v-layout",[a("v-flex",{attrs:{xs5:""}},[a("v-img",{staticStyle:{"border-radius":"5px"},attrs:{src:"http://www.myiconfinder.com/uploads/iconsets/256-256-2ee3cdfef28432d77968ad64885c3d26-detective.png",height:"150px",cover:""}})],1),a("v-flex",{attrs:{xs7:""}},[a("v-card-title",[a("div",[a("div",{staticClass:"headline",staticStyle:{"font-weight":"600"}},[t._v(t._s(t.name))]),a("div",{staticStyle:{opacity:"0.8"}},[t._v(t._s(t.email))]),a("div",{staticStyle:{opacity:"0.8"}},[t._v("Детектив с: "+t._s(t.registeredSince))])])])],1)],1)],1)],1),a("v-container",{staticClass:"content"},[a("v-layout",[a("h2",{staticClass:"content__subheader"},[t._v("Прошедшие игры")])])],1)],1)},ot=[],ct=(a("28a5"),{name:"Events",components:{},data:function(){return{name:"",email:"",registered:""}},computed:{registeredSince:function(){var t=this.registered.split("T")[0].split("-"),e="";switch(console.log(t[1]),t[1]){case"01":e="января";break;case"02":e="февраля";break;case"03":e="марта";break;case"04":e="апреля";break;case"05":e="мая";break;case"06":e="июня";break;case"07":e="июля";break;case"08":e="августа";break;case"09":e="сентября";break;case"10":e="октября";break;case"11":e="ноября";break;case"12":e="декабря";break;default:e=""}return t[2]+" "+e+" "+t[0]}},methods:{getUserInfo:function(){var t=JSON.parse(localStorage.getItem("user")),e=t.user,a=e.date,n=e.name,r=e.email;this.name=n,this.email=r,this.registered=a}},created:function(){this.getUserInfo()}}),lt=ct,ut=(a("28f2"),Object(u["a"])(lt,it,ot,!1,null,"2d9e2138",null)),dt=ut.exports;v()(ut,{VBtn:f["a"],VCard:G["a"],VCardTitle:K["a"],VContainer:q["a"],VFlex:T["a"],VIcon:g["a"],VImg:W["a"],VLayout:$["a"]});var vt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"event"},[a("v-toolbar",{staticStyle:{"background-size":"cover","background-color":"rgba(0,0,145,0.7)"},style:{backgroundImage:"url("+t.event.image+")"},attrs:{fixed:"","scroll-off-screen":"",dark:"",extended:""},scopedSlots:t._u([{key:"extension",fn:function(){return[a("router-link",{attrs:{to:"/events"}},[a("v-toolbar-side-icon",[a("v-icon",[t._v("arrow_back")])],1)],1),a("v-toolbar-title",{staticClass:"white--text",staticStyle:{"margin-left":"-8px"}},[t._v(t._s(t.event.title))]),a("v-spacer"),a("v-btn",{staticStyle:{"margin-top":"60px"},attrs:{fab:"",dark:"",color:"pink"},on:{click:t.getLink}},[a("v-icon",{attrs:{dark:""}},[t._v("gamepad")])],1)]},proxy:!0}])},[a("v-spacer")],1),t.event?a("v-flex",{staticClass:"content",attrs:{xs12:""}},[a("v-layout",[a("v-flex",{staticClass:"d-flex flex-column justify-center align-center align-content-center",attrs:{column:""}},[a("v-icon",{attrs:{large:"",dark:"",color:"green"}},[t._v("group")]),a("h5",[t._v(t._s(t.event.tags.typeTeam))])],1),a("v-flex",{staticClass:"d-flex flex-column justify-center align-center align-content-center"},[a("v-icon",{attrs:{large:"",dark:"",color:"red"}},[t._v("book")]),a("h5",[t._v(t._s(t.event.tags.typeGenre))])],1)],1),a("v-layout",[a("v-flex",{staticClass:"d-flex flex-column justify-center align-center align-content-center",attrs:{xs6:""}},[a("v-icon",{attrs:{large:"",dark:"",color:"blue"}},[t._v("access_time")]),a("h5",[t._v(t._s(t.event.tags.typeTime))])],1),a("v-flex",{staticClass:"d-flex flex-column justify-center align-center align-content-center",attrs:{xs6:""}},[a("v-icon",{attrs:{large:"",dark:"",color:"orange"}},[t._v("pin_drop")]),a("h5",[t._v(t._s(t.event.tags.location))])],1)],1),a("v-layout",{staticClass:"mt-3 mb-3"},[a("h2",{staticClass:"content__subheader ml-1"},[t._v("Описание")])]),a("v-card",{attrs:{flat:""}},[a("v-card-text",{staticClass:"px-0 pl-2 pr-2"},[t._v(t._s(t.event.description))])],1),a("v-layout",{staticClass:"mt-3 mb-3"},[a("h2",{staticClass:"content__subheader ml-1"},[t._v("Правила")])]),a("v-card",{attrs:{flat:""}},[a("v-card-text",{staticClass:"pl-2 pr-2"},[t._v(t._s(t.event.rules))])],1)],1):t._e(),a("v-dialog",{attrs:{"max-width":"290"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",{staticClass:"d-flex fluid justify-content-center"},[t.loading?t._e():a("div",[a("v-card-title",{staticClass:"headline"},[t._v("Подтвердите участие")]),a("v-card-text",[t._v("Стоимость участия: "+t._s(t.event.price))]),a("v-card-text",[t._v("Для подтверждения регистрации в игре нажмите ОК")]),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"grey",flat:"",dark:"",text:""},on:{click:function(e){t.dialog=!1}}},[t._v("Отмена")]),a("v-btn",{attrs:{color:"green darken-2",dark:"",text:""},on:{click:t.gameRegister}},[t._v("ОК")])],1)],1)])],1)],1)},pt=[];function ft(t,e){var a=Object.keys(t);return Object.getOwnPropertySymbols&&a.push.apply(a,Object.getOwnPropertySymbols(t)),e&&(a=a.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),a}function gt(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?ft(a,!0).forEach(function(e){Object(C["a"])(t,e,a[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):ft(a).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))})}return t}var mt={name:"Event",components:{},data:function(){return{link:"",dialog:!1,loading:!1}},methods:{getLink:function(){var t=this;this.dialog=!0,this.loading=!0;var e=this.userQuests.filter(function(e){return e.id==t.$route.params.id});if(0!==e.length){var a=e[0].riddles[e[0].riddles.length-1].id;this.$router.push("/quest/"+this.$route.params.id+"/riddle/"+a)}else this.loading=!1},gameRegister:function(){this.$store.dispatch("users/gameRegister",this.$route.params.id),this.dialog=!1,this.$router.push("/quest/"+this.$route.params.id+"/riddle/1")}},computed:gt({},Object(S["b"])({event:"quest/event",userQuests:"users/quests"})),beforeCreate:function(){this.$store.dispatch("quest/getEventByID",this.$route.params.id),this.$store.dispatch("users/getUserQuestsByID")}},ht=mt,bt=(a("b6cc"),a("99d9")),yt=a("169a"),_t=a("9910"),xt=a("71d9"),wt=a("706c"),Ot=a("2a7f"),kt=Object(u["a"])(ht,vt,pt,!1,null,"0118ee52",null),jt=kt.exports;v()(kt,{VBtn:f["a"],VCard:G["a"],VCardActions:bt["a"],VCardText:bt["b"],VCardTitle:K["a"],VDialog:yt["a"],VFlex:T["a"],VIcon:g["a"],VLayout:$["a"],VSpacer:_t["a"],VToolbar:xt["a"],VToolbarSideIcon:wt["a"],VToolbarTitle:Ot["a"]});var Ct=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"quest"},[a("v-toolbar",{staticStyle:{"background-size":"cover","background-color":"rgba(0,0,145,0.7)"},style:{backgroundImage:"url("+t.event.image+")"},attrs:{fixed:"",dark:""}},[a("a",{on:{click:function(e){return t.$router.go(-1)}}},[a("v-toolbar-side-icon",[a("v-icon",[t._v("arrow_back")])],1)],1),a("v-toolbar-title",{staticClass:"white--text"},[t._v(t._s(t.event.title))]),a("v-spacer")],1),a("section",{staticClass:"content"},[a("v-list",t._l(t.items,function(e){return a("v-list-tile",{key:e.title,attrs:{avatar:""}},[a("v-list-tile-avatar",[a("img",{attrs:{src:e.avatar}})]),a("v-list-tile-content",[a("v-list-tile-title",{domProps:{innerHTML:t._s(e.title)}})],1),a("v-list-tile-action",[a("v-icon",{attrs:{color:e.active?"teal":"grey"}},[t._v("chat_bubble")])],1)],1)}),1)],1)],1)},St=[];function Vt(t,e){var a=Object.keys(t);return Object.getOwnPropertySymbols&&a.push.apply(a,Object.getOwnPropertySymbols(t)),e&&(a=a.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),a}function Pt(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?Vt(a,!0).forEach(function(e){Object(C["a"])(t,e,a[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):Vt(a).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))})}return t}var Et={name:"Quest",components:{},data:function(){return{}},computed:Pt({},Object(S["b"])({riddles:"quest/riddles"})),beforeCreate:function(){this.$store.dispatch("quest/getEventByIDAndRiddles",this.$route.params.id)}},It=Et,qt=(a("edb2"),a("8860")),Tt=a("ba95"),Dt=a("40fe"),$t=a("c954"),Rt=a("5d23"),Lt=Object(u["a"])(It,Ct,St,!1,null,"d20069a4",null),At=Lt.exports;v()(Lt,{VIcon:g["a"],VList:qt["a"],VListTile:Tt["a"],VListTileAction:Dt["a"],VListTileAvatar:$t["a"],VListTileContent:Rt["a"],VListTileTitle:Rt["b"],VSpacer:_t["a"],VToolbar:xt["a"],VToolbarSideIcon:wt["a"],VToolbarTitle:Ot["a"]});var Bt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"riddle"},[a("v-toolbar",{staticStyle:{"background-size":"cover","background-color":"rgba(0,0,0,1)"},attrs:{fixed:"",dark:""}},[a("router-link",{attrs:{to:"/events"}},[a("v-toolbar-side-icon",[a("v-icon",[t._v("arrow_back")])],1)],1),a("v-toolbar-title",{staticClass:"white--text"},[t._v(t._s(t.riddle.title))])],1),a("section",{staticClass:"content"},[a("v-card",{staticClass:"mx-auto task-card grey darken-3",attrs:{dark:"","max-width":"90%"}},[a("v-card-title",[a("v-icon",{attrs:{medium:"",left:""}},[t._v("extension")]),a("span",{staticClass:"title font-weight-light"},[t._v("Задание #"+t._s(t.riddle.num))])],1),a("v-card-text",{staticClass:"title text-xs-left task-text",staticStyle:{"line-height":"1.2em"},domProps:{innerHTML:t._s(t.riddle.text)}}),t.riddle.last?t._e():a("v-card-actions",{staticClass:"align-content-center"},[a("v-form",{on:{submit:function(e){return e.preventDefault(),t.geoInfo(e)}}},[a("v-layout",{attrs:{"align-center":"","justify-space-between":""}},[t.riddle.required?a("v-text-field",{staticClass:"ml-2 mt-3",attrs:{light:"",solo:"",placeholder:"Ответ"},model:{value:t.answer,callback:function(e){t.answer=e},expression:"answer"}}):t._e(),t.riddle.required?t._e():a("v-card-text",{staticClass:"headline mb-3 align-right text-xs-right font-weight-bold"},[t._v("Далее")]),a("v-btn",{staticClass:"ml-2 mb-3",attrs:{loading:t.loading,fab:"",dark:"",color:"green darken-1"}},[a("v-icon",{attrs:{dark:""}},[t._v("arrow_right")])],1)],1)],1)],1),t.success?t._e():a("p",[t._v("Неправильный ответ")])],1)],1)],1)},Nt=[];function Ft(t,e){var a=Object.keys(t);return Object.getOwnPropertySymbols&&a.push.apply(a,Object.getOwnPropertySymbols(t)),e&&(a=a.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),a}function Qt(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?Ft(a,!0).forEach(function(e){Object(C["a"])(t,e,a[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):Ft(a).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))})}return t}var Jt={name:"Riddle",components:{},data:function(){return{answer:"",isLoading:!1}},methods:{geoInfo:function(){this.$getLocation({enableHighAccuracy:!0}).then(function(t){console.log(t)})},postAnswer:function(){this.isLoading=!0,this.$store.dispatch("quest/postAnswer",{answer:this.answer,questID:this.$route.params.id,riddleID:this.$route.params.riddle_id}),this.isLoading=!1}},computed:Qt({},Object(S["b"])({riddle:"quest/riddle"}),{},Object(S["c"])("quest",{loading:function(t){return t.loading}}),{success:function(){return this.$store.state.quest.success}}),beforeCreate:function(){this.$store.dispatch("quest/getRiddle",this.$route.params),this.geoInfo},watch:{$route:function(){this.$store.dispatch("quest/getRiddle",this.$route.params),this.answer=""}}},zt=Jt,Mt=(a("ddc9"),Object(u["a"])(zt,Bt,Nt,!1,null,"d72afcc4",null)),Ut=Mt.exports;v()(Mt,{VBtn:f["a"],VCard:G["a"],VCardActions:bt["a"],VCardText:bt["b"],VCardTitle:K["a"],VForm:D["a"],VIcon:g["a"],VLayout:$["a"],VTextField:B["a"],VToolbar:xt["a"],VToolbarSideIcon:wt["a"],VToolbarTitle:Ot["a"]}),n["a"].use(O["a"]);var Ht=new O["a"]({mode:"history",routes:[{path:"/profile",name:"profile",component:dt},{path:"/teams",name:"teams",component:st},{path:"/login",name:"login",component:F},{path:"/",name:"events",component:Z},{path:"/event/:id",name:"event",component:jt},{path:"/quest/:id",name:"quest",component:At},{path:"/quest/:id/riddle/:riddle_id",name:"Riddle",component:Ut},{path:"*",redirect:"/"}]});Ht.beforeEach(function(t,e,a){var n=["/login"],r=!n.includes(t.path),s=localStorage.getItem("user");if(r&&!s)return a("/login");a()});var Gt=Ht,Kt={namespaced:!0,state:{type:null,message:null},actions:{success:function(t,e){var a=t.commit;a("success",e)},error:function(t,e){var a=t.commit;a("error",e)},clear:function(t,e){var a=t.commit;a("success",e)}},mutations:{success:function(t,e){t.type="alert-success",t.message=e},error:function(t,e){t.type="alert-danger",t.message=e},clear:function(t){t.type=null,t.message=null}}},Wt=(a("96cf"),a("3b8d"));function Xt(){var t=JSON.parse(localStorage.getItem("user"));return t&&t.token?{"x-auth-token":t.token,"Content-Type":"application/json"}:{}}var Yt=a("bc3a"),Zt=a.n(Yt),te="https://netquest-server.herokuapp.com";function ee(t,e){var a={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,password:e})};return fetch("".concat(te,"/api/auth"),a).then(oe).then(function(t){return localStorage.setItem("user",JSON.stringify(t)),t})}function ae(){localStorage.removeItem("user")}function ne(){return re.apply(this,arguments)}function re(){return re=Object(Wt["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Zt.a.get("".concat(te,"/api/users/quests"),{headers:Xt()});case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}},t)})),re.apply(this,arguments)}function se(t){var e={method:"POST",headers:Xt()};return fetch("".concat(te,"/api/quest/")+t,e)}function ie(t,e,a){var n={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,email:e,password:a})};return fetch("".concat(te,"/api/users"),n).then(oe).then(function(t){return t.token&&localStorage.setItem("user",JSON.stringify(t)),t})}function oe(t){return t.json().then(function(e){if(!t.ok){401===t.status&&(ae(),location.reload(!0));var a=e&&e.message||t.statusText;return Promise.reject(a)}return e})}var ce={login:ee,logout:ae,register:ie,getUserQuestsByID:ne,gameRegister:se},le=JSON.parse(localStorage.getItem("user")),ue=le?{status:{loggedIn:!0},user:le,loading:!1}:{status:{loggedIn:!1},user:null,loading:!1},de={namespaced:!0,state:ue,actions:{login:function(t,e){var a=t.dispatch,n=t.commit,r=e.email,s=e.password;n("loginRequest",{email:r}),ce.login(r,s).then(function(t){n("loginSuccess",t),Gt.push("/")},function(t){n("loginFailure",t),a("alert/error",t,{root:!0})})},register:function(t,e){var a=t.dispatch,n=t.commit,r=e.name,s=e.email,i=e.password;n("loginRequest",{email:s}),ce.register(r,s,i).then(function(t){n("loginSuccess",t),Gt.push("/")},function(t){n("loginFailure",t),a("alert/error",t,{root:!0})})},logout:function(t){var e=t.commit;ce.logout(),e("logout")}},mutations:{loginRequest:function(t,e){t.status={loggingIn:!0},t.user=e,t.loading=!0},loginSuccess:function(t,e){t.status={loggedIn:!0},t.user=e,t.loading=!1},loginFailure:function(t){t.status={},t.user=null,t.loading=!1},logout:function(t){t.status={},t.user=null}}},ve={namespaced:!0,state:{all:{},quests:{}},actions:{getUserQuestsByID:function(t){var e=t.commit;ce.getUserQuestsByID().then(function(t){return e("getQuests",t.data)},function(t){return""})},gameRegister:function(t,e){var a=t.commit;ce.gameRegister(e).then(function(t){return a("getQuests",t.data)},function(t){return""})}},getters:{quests:function(t){return t.quests}},mutations:{getQuests:function(t,e){t.quests=e}}},pe="https://netquest-server.herokuapp.com";function fe(){return ge.apply(this,arguments)}function ge(){return ge=Object(Wt["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Zt.a.get("".concat(pe,"/api/quest"));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}},t)})),ge.apply(this,arguments)}function me(t){return he.apply(this,arguments)}function he(){return he=Object(Wt["a"])(regeneratorRuntime.mark(function t(e){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Zt.a.get("".concat(pe,"/api/quest/")+e,{headers:Xt()});case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}},t)})),he.apply(this,arguments)}function be(t){return ye.apply(this,arguments)}function ye(){return ye=Object(Wt["a"])(regeneratorRuntime.mark(function t(e){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Zt.a.get("".concat(pe,"/api/quest/")+e+"?riddles");case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}},t)})),ye.apply(this,arguments)}function _e(t,e){return xe.apply(this,arguments)}function xe(){return xe=Object(Wt["a"])(regeneratorRuntime.mark(function t(e,a){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Zt.a.get("".concat(pe,"/api/quest/")+e+"/"+a,{headers:Xt()});case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}},t)})),xe.apply(this,arguments)}function we(t,e,a){var n={method:"POST",headers:Xt(),body:JSON.stringify({answer:a})};return fetch("".concat(pe,"/api/quest/")+t+"/"+e,n)}var Oe={getEvents:fe,getEventByID:me,getEventByIDAndRiddles:be,getRiddle:_e,postAnswer:we},ke={namespaced:!0,state:{events:[{image:"",_id:"",isActual:!0}],event:[{image:"",_id:"",title:"Загрузка",tags:{typeTeam:"",location:"",typeGenre:"",typeTime:""}}],riddle:[{title:"Загрузка..."}],loading:!1,success:!0},actions:{getEvents:function(t){t.commit("setLoading");try{Oe.getEvents().then(function(e){t.commit("setEvents",e.data)})}catch(e){this.state.isLoading=!1}},getEventByID:function(t,e){t.commit("setLoading");try{Oe.getEventByID(e).then(function(e){t.commit("setEvent",e.data)})}catch(a){this.state.isLoading=!1}},getEventByIDAndRiddles:function(t,e){t.commit("setLoading");try{Oe.getEventByIDAndRiddles(e).then(function(e){t.commit("setEvent",e.data)})}catch(a){this.state.isLoading=!1}},getRiddle:function(t,e){t.commit("setLoading");var a=e.id,n=e.riddle_id;try{Oe.getRiddle(a,n).then(function(e){t.commit("setRiddle",e.data)})}catch(r){this.state.isLoading=!1}},postAnswer:function(t,e){t.commit("setLoading");var a=e.questID,n=e.riddleID,r=e.answer;try{Oe.postAnswer(a,n,r).then(function(e){e.json().then(function(e){t.commit("setIsSucceed",e)})})}catch(s){this.state.isLoading=!1}}},mutations:{setLoading:function(t){t.loading=!0},setEvents:function(t,e){t.loading=!1,t.events=e},setEvent:function(t,e){t.event=e,t.loading=!1},setRiddle:function(t,e){t.riddle=e,t.loading=!1},setIsSucceed:function(t,e){e.success?(this.state.success=!0,Gt.push("/quest/"+Gt.currentRoute.params.id+"/riddle/"+(parseInt(Gt.currentRoute.params.riddle_id)+1))):this.state.success=!1,t.loading=!1}},getters:{event:function(t){return t.event},events:function(t){return t.events.filter(function(t){return!t.isActual})},actualEvent:function(t){return t.events.filter(function(t){return t.isActual})},riddle:function(t){return t.riddle[0]}}};n["a"].use(S["a"]);var je=new S["a"].Store({state:{},mutations:{},actions:{},modules:{alert:Kt,authentication:de,users:ve,quest:ke}}),Ce=a("bb71"),Se=(a("bf40"),a("ebfd")),Ve=a.n(Se);n["a"].use(Ve.a),Zt.a.defaults.headers.common["Content-Type"]="application/json",n["a"].use(Ce["a"]),n["a"].config.productionTip=!1,new n["a"]({router:Gt,store:je,Vuetify:Ce["a"],render:function(t){return t(w)}}).$mount("#app")},"6f07":function(t,e,a){"use strict";var n=a("4342"),r=a.n(n);r.a},"7e8b":function(t,e,a){},"8ebf":function(t,e,a){},"9cee":function(t,e,a){"use strict";var n=a("ea3d"),r=a.n(n);r.a},b205:function(t,e,a){},b6cc:function(t,e,a){"use strict";var n=a("7e8b"),r=a.n(n);r.a},bd4b:function(t,e,a){},d8bc:function(t,e,a){},ddc9:function(t,e,a){"use strict";var n=a("bd4b"),r=a.n(n);r.a},ea3d:function(t,e,a){},edb2:function(t,e,a){"use strict";var n=a("8ebf"),r=a.n(n);r.a}});
//# sourceMappingURL=app.f056fcbf.js.map