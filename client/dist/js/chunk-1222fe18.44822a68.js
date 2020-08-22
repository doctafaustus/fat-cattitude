(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1222fe18"],{2923:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",{staticClass:"item wrapper"},[i("div",{staticClass:"pdp-grid"},[i("div",{staticClass:"image-container"},[i("div",{staticClass:"title-container mobile"},[i("h1",{staticClass:"item-title"},[t._v(t._s(t.item.title))]),i("div",{staticClass:"item-subtitle"},[t._v(t._s(t.item.subtitle))])]),i("zoom-on-hover",{staticClass:"item-image",attrs:{"img-normal":t.featuredImage||t.selected.image}})],1),i("div",{staticClass:"details-container"},[i("div",{staticClass:"title-container desktop"},[i("h1",{staticClass:"item-title"},[t._v(t._s(t.item.title))]),i("div",{staticClass:"item-subtitle"},[t._v(t._s(t.item.subtitle))])]),i("div",{staticClass:"sub-container"},[i("div",{staticClass:"row"},[i("label",[t._v("Style")]),i("div",{staticClass:"item-style"},[i("Icon",{attrs:{name:t.item.style}}),i("span",{staticClass:"item-style-text"},[t._v(t._s(t.style))])],1)]),i("div",{staticClass:"row"},[i("label",[t._v("Color "),i("span",{directives:[{name:"show",rawName:"v-show",value:t.item.colors.length>1,expression:"item.colors.length > 1"}]},[t._v("(Choose)")])]),i("ul",{staticClass:"item-colors"},t._l(t.item.colors,(function(e){return i("li",{key:e.colorName,class:{swatch:!0,selected:e.colorName===t.selected.color},on:{click:function(s){return t.selectColor({colorName:e.colorName,colorImage:e.colorImage})}}},[i("span",{staticClass:"swatch-icon",style:t.getSwatch(e.colorCode)}),i("span",{staticClass:"swatch-name"},[t._v(t._s(e.colorName))])])})),0)]),i("div",{staticClass:"row"},[i("label",[t._v("Size (Choose)")]),t._l(t.item.colors,(function(e){return i("ul",{directives:[{name:"show",rawName:"v-show",value:t.selected.color===e.colorName,expression:"selected.color === color.colorName"}],key:e.colorName,staticClass:"item-sizes"},t._l(e.sizes,(function(e){return i("li",{key:e.variantID,class:{selected:e.size===t.selected.size},attrs:{"data-variant-id":e.variantID},on:{click:function(s){return t.selectSize(e.size,e.variantID)}}},[t._v(t._s(e.size))])})),0)}))],2),i("div",{staticClass:"cta-and-price"},[i("button",{staticClass:"cta",on:{click:function(e){return t.addToCart()}}},[t._v("Add to Cart")]),i("div",{staticClass:"item-price"},[t._v("$"+t._s(t.item.price))])]),i("div",{ref:"successMessage",staticClass:"success-message",class:{show:t.showSuccess}},[i("span",[t._v("Added to cart")]),i("img",{staticClass:"emoji",attrs:{src:s("d06e")}})]),i("div",{ref:"errorMessage",staticClass:"error-message",class:{show:t.showError}},[i("span",[t._v("Please choose a size first")]),i("img",{staticClass:"emoji",attrs:{src:s("41b7")}})])]),i("ul",{staticClass:"product-images"},[t._l(t.item.modelImages.filter((function(t){return!1!==t.showOnPDP})),(function(e){return i("li",{key:e.image,class:{selected:t.featuredImage===e.image,"product-image-container":!0},on:{click:function(s){return t.selectColor({colorName:t.item.colors[e.variantIndex].colorName,colorImage:t.item.colors[e.variantIndex].colorImage,modelImage:e.image})}}},[i("img",{staticClass:"product-image",attrs:{src:e.image}})])})),t._l(t.item.colors,(function(e){return i("li",{key:e.colorImage,class:{selected:!t.featuredImage&&e.colorName===t.selected.color,"product-image-container":!0},on:{click:function(s){return t.selectColor({colorName:e.colorName,colorImage:e.colorImage})}}},[i("img",{staticClass:"product-image",attrs:{src:e.colorImage}})])}))],2)]),i("div",{directives:[{name:"show",rawName:"v-show",value:"tshirt"===t.item.style,expression:"item.style === 'tshirt'"}],staticClass:"size-guide-container"},[i("SizeGuide")],1),i("div",{staticClass:"desc-container"},[i("h3",{staticClass:"desc-title"},[t._v("Description")]),i("div",{staticClass:"desc-body"},[t._v(t._s(t.item.description))])])])])},a=[],o=(s("99af"),s("7db0"),s("ac1f"),s("5319"),s("d3e3")),c=s("48b2"),r=s("c5a6"),l=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},n=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"size-guide"},[s("h3",{staticClass:"size-guide-title"},[t._v("Size Guide")]),s("div",{staticClass:"size-style"},[s("span",{staticClass:"size-style"},[t._v("Unisex")]),s("span",{staticClass:"style-brand"},[t._v("(Bella + Canvas 3001 Style)")])]),s("div",{staticClass:"chart"},[s("div",{staticClass:"column size"},[s("div",{staticClass:"title"},[t._v("Size")]),s("div",{staticClass:"data"},[s("span",{staticClass:"size-abbrev"},[t._v("XS")]),s("span",{staticClass:"size-text"},[t._v(" - Extra Small")])]),s("div",{staticClass:"data"},[s("span",{staticClass:"size-abbrev"},[t._v("S")]),s("span",{staticClass:"size-text"},[t._v(" - Small")])]),s("div",{staticClass:"data"},[s("span",{staticClass:"size-abbrev"},[t._v("M")]),s("span",{staticClass:"size-text"},[t._v(" - Medium")])]),s("div",{staticClass:"data"},[s("span",{staticClass:"size-abbrev"},[t._v("L")]),s("span",{staticClass:"size-text"},[t._v(" - Large")])]),s("div",{staticClass:"data"},[s("span",{staticClass:"size-abbrev"},[t._v("XL")]),s("span",{staticClass:"size-text"},[t._v(" - Extra Large")])]),s("div",{staticClass:"data"},[s("span",{staticClass:"size-abbrev"},[t._v("2XL")]),s("span",{staticClass:"size-text"},[t._v(" - Double Extra Large")])])]),s("div",{staticClass:"column chest"},[s("div",{staticClass:"title"},[t._v("Chest To Fit")]),s("div",{staticClass:"data"},[t._v('31" - 34"')]),s("div",{staticClass:"data"},[t._v('34" - 37"')]),s("div",{staticClass:"data"},[t._v('38" - 41"')]),s("div",{staticClass:"data"},[t._v('42" - 45"')]),s("div",{staticClass:"data"},[t._v('46" - 49"')]),s("div",{staticClass:"data"},[t._v('50" - 53"')])]),s("div",{staticClass:"column length"},[s("div",{staticClass:"title"},[t._v("Length")]),s("div",{staticClass:"data"},[t._v('27"')]),s("div",{staticClass:"data"},[t._v('28"')]),s("div",{staticClass:"data"},[t._v('29"')]),s("div",{staticClass:"data"},[t._v('30"')]),s("div",{staticClass:"data"},[t._v('31"')]),s("div",{staticClass:"data"},[t._v('32"')])])])])}],d=(s("fa50"),s("2877")),m={},u=Object(d["a"])(m,l,n,!1,null,"45359a3d",null),v=u.exports;s("d81d"),s("d3b7"),s("3ca3"),s("ddb0");function h(t){var e=t.getBoundingClientRect(),s=window.pageXOffset||document.documentElement.scrollLeft,i=window.pageYOffset||document.documentElement.scrollTop;return{y:e.top+i,x:e.left+s}}var f={name:"ZoomOnHover",props:["imgNormal","imgZoom","scale","disabled"],template:'<div class="zoom-on-hover" v-bind:class="{zoomed}" @touchstart="touchzoom"\n    @mousemove="move" @mouseenter="zoom" @mouseleave="unzoom">\n    <img class="normal" ref="normal" :src="imgNormal"/>\n    <img class="zoom" ref="zoom" :src="imgZoom || imgNormal"/></div>',data:function(){return{scaleFactor:1,resizeCheckInterval:null,zoomed:!1,customZoom:0}},methods:{touchzoom:function(t){},zoom:function(){window.innerWidth<767||this.disabled||(this.zoomed=!0)},unzoom:function(){this.disabled||(this.zoomed=!1)},move:function(t){if(!this.disabled&&this.zoomed){var e=h(this.$el),s=this.$refs.zoom,i=this.$refs.normal,a=t.clientX-e.x+window.pageXOffset,o=t.clientY-e.y+window.pageYOffset,c=a/i.offsetWidth,r=o/i.offsetHeight,l=c*(s.offsetWidth*this.scaleFactor-i.offsetWidth),n=r*(s.offsetHeight*this.scaleFactor-i.offsetHeight);s.style.left=-l+"px",s.style.top=-n+"px"}},initEventLoaded:function(){var t=[this.$refs.zoom,this.$refs.normal].map((function(t){return new Promise((function(e,s){t.addEventListener("load",e),t.addEventListener("error",s)}))})),e=this;Promise.all(t).then((function(){e.$emit("loaded")}))},initEventResized:function(){var t=this.$refs.normal,e=t.offsetWidth,s=t.offsetHeight,i=this;this.resizeCheckInterval=setInterval((function(){e==t.offsetWidth&&s==t.offsetHeight||(e=t.offsetWidth,s=t.offsetHeight,i.$emit("resized",{width:t.width,height:t.height,fullWidth:t.naturalWidth,fullHeight:t.naturalHeight}))}),1e3)}},mounted:function(){this.$props.scale&&(this.scaleFactor=parseInt(this.$props.scale),this.$refs.zoom.style.transform="scale("+this.scaleFactor+")"),this.initEventLoaded(),this.initEventResized()},updated:function(){this.initEventLoaded()},beforeDestroy:function(){this.resizeCheckInterval&&clearInterval(this.resizeCheckInterval)}},g={name:"Product",components:{Icon:r["a"],SizeGuide:v,zoomOnHover:f},data:function(){return{item:{},featuredImage:null,selected:{productID:null,variantID:null,color:null,size:null,title:null,price:null,image:null,query:null},showSuccess:!1,showError:!1}},computed:{style:function(){return"tshirt"===this.item.style?"Unisex":"mug"===this.item.style?"Enamel Mug":"sticker"===this.item.style?"Bubble-free Sticker":"hat"===this.item.style?"Embroided Baseball Hat":void 0}},methods:{getItem:function(t,e){var s=this;this.item=c["a"].find((function(t){return t.id==s.$route.params.id}));var i=this.item.colors.find((function(e){return e.colorName===t})),a=Boolean(i),o=a?i.sizes.find((function(t){return t.size===e})):null;this.selected.productID=this.item.id,this.selected.color=a?t:this.item.colors[0].colorName,this.selected.size=o?e:null,this.selected.variantID=o?o.variantID:null,this.selected.image=a?i.colorImage:this.item.colors[0].colorImage,this.selected.title=this.item.title,this.selected.price=this.item.price},getSwatch:function(t){var e="#ffffff"===t?"#cac7c7":"transparent";return"background-color: ".concat(t,"; border: solid 1px ").concat(e)},selectColor:function(t){var e=t.colorName,s=t.colorImage,i=t.modelImage;this.featuredImage=i||null,this.selected.image=s,this.selected.color=e,this.selected.size=null,this.updateURL()},selectSize:function(t,e){this.selected.variantID=e,this.selected.size=t,this.updateURL()},updateURL:function(){this.$router.replace({path:this.$route.path,query:{color:this.selected.color,size:this.selected.size}}).catch((function(t){return t}))},resetAnimationATC:function(t){var e=this,s="show",i=this.$refs.successMessage,a=this.$refs.errorMessage,o=i.classList.contains(s)||a.classList.contains(s);this.showSuccess=!1,this.showError=!1,window.requestAnimationFrame((function(){i.classList.remove(s),a.classList.remove(s),o?setTimeout((function(){e.toggleMessage(t)}),510):e.toggleMessage(t)}))},toggleMessage:function(t){var e="show";t?(this.showError=!0,this.$refs.errorMessage.classList.add(e)):(this.showSuccess=!0,this.$refs.successMessage.classList.add(e))},addToCart:function(){if(this.selected.query={color:this.selected.color,size:this.selected.size},!this.selected.size)return this.resetAnimationATC(!0);this.resetAnimationATC(!1),o["a"].$emit("cart-add",this.selected)}},created:function(){var t=this.$route.query.color,e=this.$route.query.size;this.getItem(t,e)}},C=g,p=(s("b7df"),Object(d["a"])(C,i,a,!1,null,"74580d9c",null));e["default"]=p.exports},"3ca3":function(t,e,s){"use strict";var i=s("6547").charAt,a=s("69f3"),o=s("7dd0"),c="String Iterator",r=a.set,l=a.getterFor(c);o(String,"String",(function(t){r(this,{type:c,string:String(t),index:0})}),(function(){var t,e=l(this),s=e.string,a=e.index;return a>=s.length?{value:void 0,done:!0}:(t=i(s,a),e.index+=t.length,{value:t,done:!1})}))},"41b7":function(t,e,s){t.exports=s.p+"img/grin-emoji.71b4ced5.png"},"7db0":function(t,e,s){"use strict";var i=s("23e7"),a=s("b727").find,o=s("44d2"),c=s("ae40"),r="find",l=!0,n=c(r);r in[]&&Array(1)[r]((function(){l=!1})),i({target:"Array",proto:!0,forced:l||!n},{find:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),o(r)},"8e80":function(t,e,s){},b7df:function(t,e,s){"use strict";var i=s("8e80"),a=s.n(i);a.a},d06e:function(t,e,s){t.exports=s.p+"img/sunglasses-emoji.92b49763.png"},d81d:function(t,e,s){"use strict";var i=s("23e7"),a=s("b727").map,o=s("1dde"),c=s("ae40"),r=o("map"),l=c("map");i({target:"Array",proto:!0,forced:!r||!l},{map:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}})},ddb0:function(t,e,s){var i=s("da84"),a=s("fdbc"),o=s("e260"),c=s("9112"),r=s("b622"),l=r("iterator"),n=r("toStringTag"),d=o.values;for(var m in a){var u=i[m],v=u&&u.prototype;if(v){if(v[l]!==d)try{c(v,l,d)}catch(f){v[l]=d}if(v[n]||c(v,n,m),a[m])for(var h in o)if(v[h]!==o[h])try{c(v,h,o[h])}catch(f){v[h]=o[h]}}}},f85d:function(t,e,s){},fa50:function(t,e,s){"use strict";var i=s("f85d"),a=s.n(i);a.a}}]);
//# sourceMappingURL=chunk-1222fe18.44822a68.js.map