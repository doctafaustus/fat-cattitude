(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8b072f96"],{1522:function(t,e,r){},"6be2":function(t,e,r){"use strict";r.r(e);var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",{staticClass:"listing wrapper"},[r("h1",{staticClass:"listing-title"},[t._v(t._s(t.title))]),r("ul",{staticClass:"products"},t._l(t.products,(function(t){return r("ProductCard",{key:t.id,attrs:{product:t}})})),1)])},c=[],n=(r("4de4"),r("48b2")),i=r("e915"),a={name:"ProductListing",components:{ProductCard:i["a"]},data:function(){return{products:[]}},computed:{title:function(){var t={tshirt:"T-Shirts",sticker:"Stickers",accessories:"Accessories"};return t[this.$route.params.category]}},methods:{getProducts:function(){var t=this.$route.params.category;this.products="accessories"===t?n["a"].filter((function(t){return"hat"===t.style||"mug"===t.style})):n["a"].filter((function(e){return e.style===t})).reverse()}},created:function(){this.getProducts()},watch:{$route:{handler:function(){this.getProducts()}}}},u=a,o=(r("abdb"),r("2877")),d=Object(o["a"])(u,s,c,!1,null,"2d9bfaf0",null);e["default"]=d.exports},abdb:function(t,e,r){"use strict";var s=r("1522"),c=r.n(s);c.a}}]);
//# sourceMappingURL=chunk-8b072f96.cdfe0a94.js.map