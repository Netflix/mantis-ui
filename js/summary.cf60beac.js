(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["summary"],{"0f6c":function(t,e){t.exports=function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/dist/",r(r.s=132)}({132:function(t,e,r){"use strict";r.r(e);var n={name:"ElRow",componentName:"ElRow",props:{tag:{type:String,default:"div"},gutter:Number,type:String,justify:{type:String,default:"start"},align:{type:String,default:"top"}},computed:{style:function(){var t={};return this.gutter&&(t.marginLeft="-"+this.gutter/2+"px",t.marginRight=t.marginLeft),t}},render:function(t){return t(this.tag,{class:["el-row","start"!==this.justify?"is-justify-"+this.justify:"","top"!==this.align?"is-align-"+this.align:"",{"el-row--flex":"flex"===this.type}],style:this.style},this.$slots.default)},install:function(t){t.component(n.name,n)}};e["default"]=n}})},"23ad":function(t,e,r){t.exports={"resource-bar-container":"ResourceBar_resource-bar-container_1xahd","resource-bar-container-innerbar":"ResourceBar_resource-bar-container-innerbar_2ToQX","info-bar":"ResourceBar_info-bar_1EA2-"}},"4fb6":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"full-height vertical layout flex"},[n("el-card",{class:t.$style["summary-card"]},[n("div",{staticClass:"text-center",attrs:{slot:"header"},slot:"header"},[n("el-row",{attrs:{type:"flex"}},[n("el-col",[n("img",{class:t.$style["mantis-logo"],attrs:{alt:"Mantis Logo",src:r("c8d7")}})]),n("el-col",[n("div",[t._v(t._s(t.summary.totalJobs))]),t._v("\n          Job Clusters\n        ")]),n("el-col",[n("div",[t._v(t._s(t.summary.workers))]),t._v("\n          Workers\n        ")]),n("el-col",[n("div",[t._v(t._s(t.summary.activeJobs))]),n("a",{staticClass:"active",attrs:{href:"/summary?sortby=JOB_COUNT"}},[t._v("Active Jobs")])]),n("el-col",[n("div",[t._v(t._s(t.summary.totalCPUs))]),n("a",{staticClass:"active",attrs:{href:"/summary?sortby=JOB_COUNT"}},[t._v("CPUs")])]),n("el-col",[n("div",[t._v(t._s(t.summary.totalMemory))]),n("a",{staticClass:"active",attrs:{href:"/summary?sortby=JOB_COUNT"}},[t._v("RAM")])])],1)],1),n("div",{class:t.$style["job-list"]},[n("ResourceBar",{class:t.$style["job-item"],attrs:{width:"20%"}}),n("ResourceBar",{class:t.$style["job-item"],attrs:{width:"80%"}}),n("ResourceBar",{class:t.$style["job-item"],attrs:{width:"50%"}})],1)])],1)},o=[],a=r("c2cc"),s=r.n(a),i=r("0f6c"),u=r.n(i),l=r("a4c4"),c=r.n(l),f=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{class:t.$style["resource-bar-container"]},[r("div",{class:t.$style["resource-bar-container-innerbar"],style:{width:t.width}}),r("div",{class:t.$style["info-bar"]},[t._m(0),t._v("\n    Job Count: "),t._m(1),t._v(" Total CPUs:\n    "),r("strong",[t._v("2640")]),t._v(" Total Memory: "),r("strong",[t._v("8.24 TB")])])])},d=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("strong",[r("a",{attrs:{href:""}},[t._v("RavenConnectorJob")])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("strong",[r("a",{attrs:{href:"blah"}},[t._v("443")])])}],p={name:"ResourceBar",props:{width:{type:String,required:!0}}},m=p,y=r("8c2b"),b=r("2877");function v(t){this["$style"]=y["default"].locals||y["default"]}var _=Object(b["a"])(m,f,d,!1,v,null,null),h=_.exports;function g(t){const e=["Bytes","KB","MB","GB","TB"],r=1024;if(0===t)return"0 Bytes";const n=parseInt(Math.floor(Math.log(t)/Math.log(r)));return(t/Math.pow(r,n)).toFixed(2)+" "+e[n]}var j={name:"SummaryPage",components:{[c.a.name]:c.a,[u.a.name]:u.a,[s.a.name]:s.a,ResourceBar:h},data(){return{jobClusterList:[],isLoadingList:!1,summary:{totalCPUs:5,totalMemory:g(52372122312213),activeJobs:19,workers:9,totalJobs:25}}},created(){}},x=j,S=r("79d5");function O(t){this["$style"]=S["default"].locals||S["default"]}var w=Object(b["a"])(x,n,o,!1,O,null,null);e["default"]=w.exports},"79d5":function(t,e,r){"use strict";var n=r("d1f2"),o=r.n(n);r.d(e,"default",(function(){return o.a}))},"8c2b":function(t,e,r){"use strict";var n=r("23ad"),o=r.n(n);r.d(e,"default",(function(){return o.a}))},a4c4:function(t,e,r){t.exports=function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/dist/",r(r.s=103)}({0:function(t,e,r){"use strict";function n(t,e,r,n,o,a,s,i){var u,l="function"===typeof t?t.options:t;if(e&&(l.render=e,l.staticRenderFns=r,l._compiled=!0),n&&(l.functional=!0),a&&(l._scopeId="data-v-"+a),s?(u=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"===typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(s)},l._ssrRegister=u):o&&(u=i?function(){o.call(this,this.$root.$options.shadowRoot)}:o),u)if(l.functional){l._injectStyles=u;var c=l.render;l.render=function(t,e){return u.call(e),c(t,e)}}else{var f=l.beforeCreate;l.beforeCreate=f?[].concat(f,u):[u]}return{exports:t,options:l}}r.d(e,"a",(function(){return n}))},103:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"el-card",class:t.shadow?"is-"+t.shadow+"-shadow":"is-always-shadow"},[t.$slots.header||t.header?r("div",{staticClass:"el-card__header"},[t._t("header",[t._v(t._s(t.header))])],2):t._e(),r("div",{staticClass:"el-card__body",style:t.bodyStyle},[t._t("default")],2)])},o=[];n._withStripped=!0;var a={name:"ElCard",props:{header:{},bodyStyle:{},shadow:{type:String}}},s=a,i=r(0),u=Object(i["a"])(s,n,o,!1,null,null,null);u.options.__file="packages/card/src/main.vue";var l=u.exports;l.install=function(t){t.component(l.name,l)};e["default"]=l}})},c2cc:function(t,e){t.exports=function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/dist/",r(r.s=134)}({134:function(t,e,r){"use strict";r.r(e);var n="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o={name:"ElCol",props:{span:{type:Number,default:24},tag:{type:String,default:"div"},offset:Number,pull:Number,push:Number,xs:[Number,Object],sm:[Number,Object],md:[Number,Object],lg:[Number,Object],xl:[Number,Object]},computed:{gutter:function(){var t=this.$parent;while(t&&"ElRow"!==t.$options.componentName)t=t.$parent;return t?t.gutter:0}},render:function(t){var e=this,r=[],o={};return this.gutter&&(o.paddingLeft=this.gutter/2+"px",o.paddingRight=o.paddingLeft),["span","offset","pull","push"].forEach((function(t){(e[t]||0===e[t])&&r.push("span"!==t?"el-col-"+t+"-"+e[t]:"el-col-"+e[t])})),["xs","sm","md","lg","xl"].forEach((function(t){if("number"===typeof e[t])r.push("el-col-"+t+"-"+e[t]);else if("object"===n(e[t])){var o=e[t];Object.keys(o).forEach((function(e){r.push("span"!==e?"el-col-"+t+"-"+e+"-"+o[e]:"el-col-"+t+"-"+o[e])}))}})),t(this.tag,{class:["el-col",r],style:o},this.$slots.default)},install:function(t){t.component(o.name,o)}};e["default"]=o}})},c8d7:function(t,e,r){t.exports=r.p+"img/mantis-logo-full-transparent.1cbd8937.png"},d1f2:function(t,e,r){t.exports={"job-list":"SummaryPage_job-list_tvGyL","job-item":"SummaryPage_job-item_3vyZR","mantis-logo":"SummaryPage_mantis-logo_gHxw0"}}}]);
//# sourceMappingURL=summary.cf60beac.js.map