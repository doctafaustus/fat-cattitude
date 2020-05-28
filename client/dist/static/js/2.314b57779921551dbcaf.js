webpackJsonp([2],{"5Z7Z":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("4DD9"),a=s("qRkf"),r=s("omKA"),l=s("mvHQ"),o=s.n(l),n=s("fZjL"),v=s.n(n),d={name:"Checkout",components:{Icon:r.a},mixins:[a.a],data:function(){return{step:"pre-estimate",stripe:null,card:null,cardCheckSending:!1,estimateOrderError:null,placeOrderError:null,sameAddress:!0,fields:{email:null,firstNameShipping:null,lastNameShipping:null,address1Shipping:null,address2Shipping:null,cityShipping:null,stateShipping:null,zipShipping:null,firstNameBilling:null,lastNameBilling:null,address1Billing:null,address2Billing:null,cityBilling:null,stateBilling:null,zipBilling:null},orderEstimate:{}}},methods:{initInputClasses:function(){var t=this;document.querySelectorAll('.checkout-form input[type="text"], select').forEach(function(e){e.addEventListener("focus",function(e){return t.toggleActiveClass(e,"add")}),e.addEventListener("blur",function(e){e.target.value||t.toggleActiveClass(e,"remove")})})},toggleActiveClass:function(t,e){t.target.closest(".input-wrapper").classList[e]("active"),"add"===e&&this.clearInlineError(t.target.closest(".field")),"SELECT"===t.target.nodeName&&(t.target.dataset.clean=!1)},initStripe:function(){a.a.loadScript("https://js.stripe.com/v3/",this.addStripeElements)},editInfo:function(){this.step="pre-estimate"},clearInlineError:function(t){t.classList.remove("has-error"),t.querySelector(".error").textContent=""},clearAllInlineErrors:function(){document.querySelectorAll(".field").forEach(this.clearInlineError)},validateFields:function(t){var e=this,s=t.isEstimate;if(this.placeOrderError=null,this.clearAllInlineErrors(),v()(this.fields).forEach(function(t){var s=e.$data.fields[t],i=document.querySelector("#"+a.a.slugify(t));if(!/address2/.test(i.id)){var r=i.closest(".field"),l=void 0;if(s){if("email"!==t||/^.+@.+\..+$/.test(s))return;l="Invalid email address"}else l=i.getAttribute("placeholder")+" required";r.querySelector(".error").textContent=l,r.classList.add("has-error")}}),this.hasInlineErrors())return console.log("has inline errors");s?(i.a.$emit("processing",{isProcessing:!0}),this.$refs.continue.disabled=!0,this.getOrderEstimate()):this.createToken()},hasInlineErrors:function(){return this.sameAddress?document.querySelectorAll(".contact-information .has-error, .shipping-address .has-error").length:document.querySelectorAll(".has-error").length},getItemsMap:function(){return a.a.getCartArray().map(function(t){return{sync_variant_id:t.variantID,quantity:1,retail_price:t.price}})},getOrderEstimate:function(){var t=this;this.estimateOrderError=!1,fetch("http://localhost:8081/api/estimate-costs",{method:"POST",headers:{"Content-Type":"application/json"},body:o()({fields:this.fields,items:this.getItemsMap()})}).then(function(t){return t.json()}).then(function(e){console.log("api/estimate-costs response: \n",e),t.$refs.continue.disabled=!1,i.a.$emit("processing",{isProcessing:!1}),e.error?t.estimateOrderError="Error - "+e.error:(console.log("SUCCESS!",e),t.orderEstimate=e.result.costs,i.a.$emit("order-estimate",t.orderEstimate),t.step="post-estimate")})},addStripeElements:function(){var t={base:{fontSize:"16px","::placeholder":{color:"#a9a9a9"}}};this.stripe=Stripe("pk_test_OKClfKEUHvsE9Bpb9hoptSGV");var e=this.stripe.elements(),s=e.create("cardNumber",{style:t,placeholder:"Credit Card Number"}),i=e.create("cardExpiry",{style:t}),a=e.create("cardCvc",{style:t});s.mount("#card-number"),i.mount("#card-expiry"),a.mount("#card-cvc"),s.ref="#card-number",i.ref="#card-expiry",a.ref="#card-cvc",this.card=s,[s,i,a].forEach(function(t){t.on("change",function(e){var s=document.querySelector(t.ref).closest(".field");s.classList.remove("has-error"),s.querySelector(".error").textContent=""})})},createToken:function(){var t=this;this.stripe.createToken(this.card).then(function(e){if(e.error){console.log("error!!!",e.error);var s={incomplete_number:"number-error",invalid_number:"number-error",incomplete_expiry:"expiry-error",invalid_expiry_year_past:"expiry-error",invalid_expiry_year:"expiry-error",incomplete_cvc:"cvc-error",invalid_cvc:"cvc-error"}[e.error.code];if(s){var i=t.$refs[s];i.closest(".field").classList.add("has-error"),i.textContent=e.error.message}else t.placeOrderError=e.error.message}else console.log("sending to server"),document.querySelector(".place-order-cta").disabled=!0,t.stripeTokenHandler(e.token)})},stripeTokenHandler:function(t){var e=this;fetch("http://localhost:8081/api/place-order",{method:"POST",headers:{"Content-Type":"application/json"},body:o()({token:t,fields:this.fields,sameAddress:this.sameAddress,items:this.getItemsMap()})}).then(function(t){return t.json()}).then(function(t){console.log("api/place-order response: \n",t),e.$refs["place-order"].disabled=!1,t.error?e.placeOrderError=t.error:(console.log("Successful order:",t),e.$router.push("/order-confirmation?orderID="+t.charge.metadata.orderID+"&chargeID="+t.charge.id))})},bindSubmitEvents:function(){var t=this;document.querySelector(".checkout-form").addEventListener("submit",function(e){e.preventDefault(),"post-estimate"===t.step&&t.validateFields({isEstimate:!1})})},reValidateAfterRemove:function(){"post-estimate"===this.step&&this.validateFields({isEstimate:!0})}},mounted:function(){this.initInputClasses(),this.bindSubmitEvents(),window.Stripe?this.addStripeElements():this.initStripe(),i.a.$on("cart-remove",this.reValidateAfterRemove)},beforeDestroy:function(){i.a.$off("cart-remove",this.reValidateAfterRemove)}},p={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"checkout"},[s("div",{directives:[{name:"show",rawName:"v-show",value:"post-estimate"===t.step,expression:"step === 'post-estimate'"}],staticClass:"saved-info"},[s("div",{staticClass:"saved-info-block"},[s("span",{staticClass:"edit-link",on:{click:function(e){return t.editInfo()}}},[t._v("Edit")]),t._v(" "),s("div",{staticClass:"block"},[s("h4",[t._v("Email Address")]),t._v(" "),s("div",[t._v(t._s(t.fields.email))])]),t._v(" "),s("div",{staticClass:"block"},[s("h4",[t._v("Shipping Address")]),t._v(" "),s("div",[t._v(t._s(t.fields.firstNameShipping)+" "+t._s(t.fields.lastNameShipping))]),t._v(" "),s("div",[t._v(t._s(t.fields.address1Shipping))]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.fields.address2Shipping,expression:"fields.address2Shipping"}]},[t._v(t._s(t.fields.address2Shipping))]),t._v(" "),s("div",[t._v(t._s(t.fields.cityShipping)+", "+t._s(t.fields.stateShipping)+" "+t._s(t.fields.zipShipping))])]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:!t.sameAddress,expression:"!sameAddress"}],staticClass:"block"},[s("h4",[t._v("Billing Address")]),t._v(" "),s("div",[t._v(t._s(t.fields.firstNameBilling)+" "+t._s(t.fields.lastNameBilling))]),t._v(" "),s("div",[t._v(t._s(t.fields.address1Billing))]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.fields.address2Billing,expression:"fields.address2Billing"}]},[t._v(t._s(t.fields.address2Billing))]),t._v(" "),s("div",[t._v(t._s(t.fields.cityBilling)+", "+t._s(t.fields.stateBilling)+" "+t._s(t.fields.zipBilling))])])])]),t._v(" "),s("form",{staticClass:"checkout-form",attrs:{action:"/api/place-order",method:"POST"}},[s("fieldset",{directives:[{name:"show",rawName:"v-show",value:"pre-estimate"===t.step,expression:"step === 'pre-estimate'"}],staticClass:"pre-estimate"},[s("div",{staticClass:"segment contact-information"},[s("h3",{staticClass:"segment-title"},[t._v("Contact Information")]),t._v(" "),s("div",{staticClass:"field"},[s("div",{staticClass:"input-wrapper"},[s("label",[t._v("Email")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.fields.email,expression:"fields.email"}],attrs:{id:"email",type:"text",placeholder:"Email"},domProps:{value:t.fields.email},on:{input:function(e){e.target.composing||t.$set(t.fields,"email",e.target.value)}}})]),t._v(" "),s("span",{staticClass:"error"})])]),t._v(" "),s("div",{staticClass:"segment shipping-address"},[s("h3",{staticClass:"segment-title"},[t._v("Shipping Address")]),t._v(" "),s("div",{staticClass:"input-group input-group-col-2"},[s("div",{staticClass:"field"},[s("div",{staticClass:"input-wrapper"},[s("label",[t._v("First Name")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.fields.firstNameShipping,expression:"fields.firstNameShipping"}],attrs:{id:"first-name-shipping",type:"text",placeholder:"First Name"},domProps:{value:t.fields.firstNameShipping},on:{input:function(e){e.target.composing||t.$set(t.fields,"firstNameShipping",e.target.value)}}})]),t._v(" "),s("span",{staticClass:"error"})]),t._v(" "),s("div",{staticClass:"field"},[s("div",{staticClass:"input-wrapper"},[s("label",[t._v("Last Name")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.fields.lastNameShipping,expression:"fields.lastNameShipping"}],attrs:{id:"last-name-shipping",type:"text",placeholder:"Last Name"},domProps:{value:t.fields.lastNameShipping},on:{input:function(e){e.target.composing||t.$set(t.fields,"lastNameShipping",e.target.value)}}})]),t._v(" "),s("span",{staticClass:"error"})])]),t._v(" "),s("div",{staticClass:"field"},[s("div",{staticClass:"input-wrapper"},[s("label",[t._v("Address")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.fields.address1Shipping,expression:"fields.address1Shipping"}],attrs:{id:"address1-shipping",type:"text",placeholder:"Address"},domProps:{value:t.fields.address1Shipping},on:{input:function(e){e.target.composing||t.$set(t.fields,"address1Shipping",e.target.value)}}})]),t._v(" "),s("span",{staticClass:"error"})]),t._v(" "),s("div",{staticClass:"field"},[s("div",{staticClass:"input-wrapper"},[s("label",[t._v("Address 2 (optional)")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.fields.address2Shipping,expression:"fields.address2Shipping"}],attrs:{id:"address2-shipping",type:"text",placeholder:"Address 2 (optional)"},domProps:{value:t.fields.address2Shipping},on:{input:function(e){e.target.composing||t.$set(t.fields,"address2Shipping",e.target.value)}}})]),t._v(" "),s("span",{staticClass:"error"})]),t._v(" "),s("div",{staticClass:"field"},[s("div",{staticClass:"input-wrapper"},[s("label",[t._v("City")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.fields.cityShipping,expression:"fields.cityShipping"}],attrs:{id:"city-shipping",type:"text",placeholder:"City"},domProps:{value:t.fields.cityShipping},on:{input:function(e){e.target.composing||t.$set(t.fields,"cityShipping",e.target.value)}}})]),t._v(" "),s("span",{staticClass:"error"})]),t._v(" "),s("div",{staticClass:"input-group input-group-col-2"},[s("div",{staticClass:"field"},[s("div",{staticClass:"input-wrapper dropdown"},[s("label",[t._v("State")]),t._v(" "),s("select",{directives:[{name:"model",rawName:"v-model",value:t.fields.stateShipping,expression:"fields.stateShipping"}],attrs:{id:"state-shipping",placeholder:"State","data-clean":"true"},on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.fields,"stateShipping",e.target.multiple?s:s[0])}}},[s("option",{attrs:{value:"null",disabled:""}},[t._v("State")]),t._v(" "),s("option",{attrs:{value:"AL"}},[t._v("Alabama")]),t._v(" "),s("option",{attrs:{value:"AK"}},[t._v("Alaska")]),t._v(" "),s("option",{attrs:{value:"AZ"}},[t._v("Arizona")]),t._v(" "),s("option",{attrs:{value:"AR"}},[t._v("Arkansas")]),t._v(" "),s("option",{attrs:{value:"CA"}},[t._v("California")]),t._v(" "),s("option",{attrs:{value:"CO"}},[t._v("Colorado")]),t._v(" "),s("option",{attrs:{value:"CT"}},[t._v("Connecticut")]),t._v(" "),s("option",{attrs:{value:"DE"}},[t._v("Delaware")]),t._v(" "),s("option",{attrs:{value:"DC"}},[t._v("District of Columbia")]),t._v(" "),s("option",{attrs:{value:"FL"}},[t._v("Florida")]),t._v(" "),s("option",{attrs:{value:"GA"}},[t._v("Georgia")]),t._v(" "),s("option",{attrs:{value:"HI"}},[t._v("Hawaii")]),t._v(" "),s("option",{attrs:{value:"ID"}},[t._v("Idaho")]),t._v(" "),s("option",{attrs:{value:"IL"}},[t._v("Illinois")]),t._v(" "),s("option",{attrs:{value:"IN"}},[t._v("Indiana")]),t._v(" "),s("option",{attrs:{value:"IA"}},[t._v("Iowa")]),t._v(" "),s("option",{attrs:{value:"KS"}},[t._v("Kansas")]),t._v(" "),s("option",{attrs:{value:"KY"}},[t._v("Kentucky")]),t._v(" "),s("option",{attrs:{value:"LA"}},[t._v("Louisiana")]),t._v(" "),s("option",{attrs:{value:"ME"}},[t._v("Maine")]),t._v(" "),s("option",{attrs:{value:"MD"}},[t._v("Maryland")]),t._v(" "),s("option",{attrs:{value:"MA"}},[t._v("Massachusetts")]),t._v(" "),s("option",{attrs:{value:"MI"}},[t._v("Michigan")]),t._v(" "),s("option",{attrs:{value:"MN"}},[t._v("Minnesota")]),t._v(" "),s("option",{attrs:{value:"MS"}},[t._v("Mississippi")]),t._v(" "),s("option",{attrs:{value:"MO"}},[t._v("Missouri")]),t._v(" "),s("option",{attrs:{value:"MT"}},[t._v("Montana")]),t._v(" "),s("option",{attrs:{value:"NE"}},[t._v("Nebraska")]),t._v(" "),s("option",{attrs:{value:"NV"}},[t._v("Nevada")]),t._v(" "),s("option",{attrs:{value:"NH"}},[t._v("New Hampshire")]),t._v(" "),s("option",{attrs:{value:"NJ"}},[t._v("New Jersey")]),t._v(" "),s("option",{attrs:{value:"NM"}},[t._v("New Mexico")]),t._v(" "),s("option",{attrs:{value:"NY"}},[t._v("New York")]),t._v(" "),s("option",{attrs:{value:"NC"}},[t._v("North Carolina")]),t._v(" "),s("option",{attrs:{value:"ND"}},[t._v("North Dakota")]),t._v(" "),s("option",{attrs:{value:"OH"}},[t._v("Ohio")]),t._v(" "),s("option",{attrs:{value:"OK"}},[t._v("Oklahoma")]),t._v(" "),s("option",{attrs:{value:"OR"}},[t._v("Oregon")]),t._v(" "),s("option",{attrs:{value:"PA"}},[t._v("Pennsylvania")]),t._v(" "),s("option",{attrs:{value:"RI"}},[t._v("Rhode Island")]),t._v(" "),s("option",{attrs:{value:"SC"}},[t._v("South Carolina")]),t._v(" "),s("option",{attrs:{value:"SD"}},[t._v("South Dakota")]),t._v(" "),s("option",{attrs:{value:"TN"}},[t._v("Tennessee")]),t._v(" "),s("option",{attrs:{value:"TX"}},[t._v("Texas")]),t._v(" "),s("option",{attrs:{value:"UT"}},[t._v("Utah")]),t._v(" "),s("option",{attrs:{value:"VT"}},[t._v("Vermont")]),t._v(" "),s("option",{attrs:{value:"VA"}},[t._v("Virginia")]),t._v(" "),s("option",{attrs:{value:"WA"}},[t._v("Washington")]),t._v(" "),s("option",{attrs:{value:"WV"}},[t._v("West Virginia")]),t._v(" "),s("option",{attrs:{value:"WI"}},[t._v("Wisconsin")]),t._v(" "),s("option",{attrs:{value:"WY"}},[t._v("Wyoming")])])]),t._v(" "),s("span",{staticClass:"error"})]),t._v(" "),s("div",{staticClass:"field"},[s("div",{staticClass:"input-wrapper"},[s("label",[t._v("ZIP code")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.fields.zipShipping,expression:"fields.zipShipping"}],attrs:{id:"zip-shipping",type:"text",placeholder:"ZIP code"},domProps:{value:t.fields.zipShipping},on:{input:function(e){e.target.composing||t.$set(t.fields,"zipShipping",e.target.value)}}})]),t._v(" "),s("span",{staticClass:"error"})])])]),t._v(" "),s("div",{staticClass:"same-shipping-billing"},[s("label",{staticClass:"same-shipping-billing-label",attrs:{for:"same-address"}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.sameAddress,expression:"sameAddress"}],attrs:{type:"checkbox",id:"same-address",checked:""},domProps:{checked:Array.isArray(t.sameAddress)?t._i(t.sameAddress,null)>-1:t.sameAddress},on:{change:function(e){var s=t.sameAddress,i=e.target,a=!!i.checked;if(Array.isArray(s)){var r=t._i(s,null);i.checked?r<0&&(t.sameAddress=s.concat([null])):r>-1&&(t.sameAddress=s.slice(0,r).concat(s.slice(r+1)))}else t.sameAddress=a}}}),t._v(" "),s("div",{staticClass:"checkbox-container"},[s("Icon",{attrs:{name:"checkmark"}})],1),t._v(" "),s("span",[t._v("Same billing & shipping address")])])]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:!t.sameAddress,expression:"!sameAddress"}],staticClass:"segment billing-address"},[s("h3",{staticClass:"segment-title"},[t._v("Billing Address")]),t._v(" "),s("div",{staticClass:"input-group input-group-col-2"},[s("div",{staticClass:"field"},[s("div",{staticClass:"input-wrapper"},[s("label",[t._v("First Name")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.fields.firstNameBilling,expression:"fields.firstNameBilling"}],attrs:{id:"first-name-billing",type:"text",placeholder:"First Name"},domProps:{value:t.fields.firstNameBilling},on:{input:function(e){e.target.composing||t.$set(t.fields,"firstNameBilling",e.target.value)}}})]),t._v(" "),s("span",{staticClass:"error"})]),t._v(" "),s("div",{staticClass:"field"},[s("div",{staticClass:"input-wrapper"},[s("label",[t._v("Last Name")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.fields.lastNameBilling,expression:"fields.lastNameBilling"}],attrs:{id:"last-name-billing",type:"text",placeholder:"Last Name"},domProps:{value:t.fields.lastNameBilling},on:{input:function(e){e.target.composing||t.$set(t.fields,"lastNameBilling",e.target.value)}}})]),t._v(" "),s("span",{staticClass:"error"})])]),t._v(" "),s("div",{staticClass:"field"},[s("div",{staticClass:"input-wrapper"},[s("label",[t._v("Address")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.fields.address1Billing,expression:"fields.address1Billing"}],attrs:{id:"address1-billing",type:"text",placeholder:"Address"},domProps:{value:t.fields.address1Billing},on:{input:function(e){e.target.composing||t.$set(t.fields,"address1Billing",e.target.value)}}})]),t._v(" "),s("span",{staticClass:"error"})]),t._v(" "),s("div",{staticClass:"field"},[s("div",{staticClass:"input-wrapper"},[s("label",[t._v("Address 2 (optional)")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.fields.address2Billing,expression:"fields.address2Billing"}],attrs:{id:"address2-billing",type:"text",placeholder:"Address 2 (optional)"},domProps:{value:t.fields.address2Billing},on:{input:function(e){e.target.composing||t.$set(t.fields,"address2Billing",e.target.value)}}})]),t._v(" "),s("span",{staticClass:"error"})]),t._v(" "),s("div",{staticClass:"field"},[s("div",{staticClass:"input-wrapper"},[s("label",[t._v("City")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.fields.cityBilling,expression:"fields.cityBilling"}],attrs:{id:"city-billing",type:"text",placeholder:"City"},domProps:{value:t.fields.cityBilling},on:{input:function(e){e.target.composing||t.$set(t.fields,"cityBilling",e.target.value)}}})]),t._v(" "),s("span",{staticClass:"error"})]),t._v(" "),s("div",{staticClass:"input-group input-group-col-2"},[s("div",{staticClass:"field"},[s("div",{staticClass:"input-wrapper dropdown"},[s("label",[t._v("State")]),t._v(" "),s("select",{directives:[{name:"model",rawName:"v-model",value:t.fields.stateBilling,expression:"fields.stateBilling"}],attrs:{id:"state-billing",placeholder:"State","data-clean":"true"},on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.fields,"stateBilling",e.target.multiple?s:s[0])}}},[s("option",{attrs:{value:"null",disabled:""}},[t._v("State")]),t._v(" "),s("option",{attrs:{value:"AL"}},[t._v("Alabama")]),t._v(" "),s("option",{attrs:{value:"AK"}},[t._v("Alaska")]),t._v(" "),s("option",{attrs:{value:"AZ"}},[t._v("Arizona")]),t._v(" "),s("option",{attrs:{value:"AR"}},[t._v("Arkansas")]),t._v(" "),s("option",{attrs:{value:"CA"}},[t._v("California")]),t._v(" "),s("option",{attrs:{value:"CO"}},[t._v("Colorado")]),t._v(" "),s("option",{attrs:{value:"CT"}},[t._v("Connecticut")]),t._v(" "),s("option",{attrs:{value:"DE"}},[t._v("Delaware")]),t._v(" "),s("option",{attrs:{value:"DC"}},[t._v("District of Columbia")]),t._v(" "),s("option",{attrs:{value:"FL"}},[t._v("Florida")]),t._v(" "),s("option",{attrs:{value:"GA"}},[t._v("Georgia")]),t._v(" "),s("option",{attrs:{value:"HI"}},[t._v("Hawaii")]),t._v(" "),s("option",{attrs:{value:"ID"}},[t._v("Idaho")]),t._v(" "),s("option",{attrs:{value:"IL"}},[t._v("Illinois")]),t._v(" "),s("option",{attrs:{value:"IN"}},[t._v("Indiana")]),t._v(" "),s("option",{attrs:{value:"IA"}},[t._v("Iowa")]),t._v(" "),s("option",{attrs:{value:"KS"}},[t._v("Kansas")]),t._v(" "),s("option",{attrs:{value:"KY"}},[t._v("Kentucky")]),t._v(" "),s("option",{attrs:{value:"LA"}},[t._v("Louisiana")]),t._v(" "),s("option",{attrs:{value:"ME"}},[t._v("Maine")]),t._v(" "),s("option",{attrs:{value:"MD"}},[t._v("Maryland")]),t._v(" "),s("option",{attrs:{value:"MA"}},[t._v("Massachusetts")]),t._v(" "),s("option",{attrs:{value:"MI"}},[t._v("Michigan")]),t._v(" "),s("option",{attrs:{value:"MN"}},[t._v("Minnesota")]),t._v(" "),s("option",{attrs:{value:"MS"}},[t._v("Mississippi")]),t._v(" "),s("option",{attrs:{value:"MO"}},[t._v("Missouri")]),t._v(" "),s("option",{attrs:{value:"MT"}},[t._v("Montana")]),t._v(" "),s("option",{attrs:{value:"NE"}},[t._v("Nebraska")]),t._v(" "),s("option",{attrs:{value:"NV"}},[t._v("Nevada")]),t._v(" "),s("option",{attrs:{value:"NH"}},[t._v("New Hampshire")]),t._v(" "),s("option",{attrs:{value:"NJ"}},[t._v("New Jersey")]),t._v(" "),s("option",{attrs:{value:"NM"}},[t._v("New Mexico")]),t._v(" "),s("option",{attrs:{value:"NY"}},[t._v("New York")]),t._v(" "),s("option",{attrs:{value:"NC"}},[t._v("North Carolina")]),t._v(" "),s("option",{attrs:{value:"ND"}},[t._v("North Dakota")]),t._v(" "),s("option",{attrs:{value:"OH"}},[t._v("Ohio")]),t._v(" "),s("option",{attrs:{value:"OK"}},[t._v("Oklahoma")]),t._v(" "),s("option",{attrs:{value:"OR"}},[t._v("Oregon")]),t._v(" "),s("option",{attrs:{value:"PA"}},[t._v("Pennsylvania")]),t._v(" "),s("option",{attrs:{value:"RI"}},[t._v("Rhode Island")]),t._v(" "),s("option",{attrs:{value:"SC"}},[t._v("South Carolina")]),t._v(" "),s("option",{attrs:{value:"SD"}},[t._v("South Dakota")]),t._v(" "),s("option",{attrs:{value:"TN"}},[t._v("Tennessee")]),t._v(" "),s("option",{attrs:{value:"TX"}},[t._v("Texas")]),t._v(" "),s("option",{attrs:{value:"UT"}},[t._v("Utah")]),t._v(" "),s("option",{attrs:{value:"VT"}},[t._v("Vermont")]),t._v(" "),s("option",{attrs:{value:"VA"}},[t._v("Virginia")]),t._v(" "),s("option",{attrs:{value:"WA"}},[t._v("Washington")]),t._v(" "),s("option",{attrs:{value:"WV"}},[t._v("West Virginia")]),t._v(" "),s("option",{attrs:{value:"WI"}},[t._v("Wisconsin")]),t._v(" "),s("option",{attrs:{value:"WY"}},[t._v("Wyoming")])])]),t._v(" "),s("span",{staticClass:"error"})]),t._v(" "),s("div",{staticClass:"field"},[s("div",{staticClass:"input-wrapper"},[s("label",[t._v("ZIP code")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.fields.zipBilling,expression:"fields.zipBilling"}],attrs:{id:"zip-billing",type:"text",placeholder:"ZIP code"},domProps:{value:t.fields.zipBilling},on:{input:function(e){e.target.composing||t.$set(t.fields,"zipBilling",e.target.value)}}})]),t._v(" "),s("span",{staticClass:"error"})])])]),t._v(" "),s("div",{staticClass:"continue-container"},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.estimateOrderError,expression:"estimateOrderError"}],staticClass:"estimate-order-error error"},[t._v(t._s(t.estimateOrderError))]),t._v(" "),s("button",{ref:"continue",staticClass:"continue-btn cta",on:{click:function(e){return e.preventDefault(),t.validateFields({isEstimate:!0})}}},[t._v("Continue")])])]),t._v(" "),s("fieldset",{directives:[{name:"show",rawName:"v-show",value:"post-estimate"===t.step,expression:"step === 'post-estimate'"}],staticClass:"post-estimate"},[s("div",{directives:[{name:"show",rawName:"v-show",value:Object.keys(t.orderEstimate).length,expression:"Object.keys(orderEstimate).length"}],staticClass:"shipping-rate-container"},[s("div",{staticClass:"shipping-rate-title"},[t._v("Shipping Option")]),t._v(" "),s("ul",{staticClass:"shipping-rate-options"},[s("li",{staticClass:"shipping-rate-option"},[s("label",{attrs:{for:"shipping-option-0"}},[s("input",{attrs:{type:"radio",id:"shipping-option-0",name:"shipping-option",checked:""}}),t._v(" "),s("div",{staticClass:"circle"}),t._v(" "),t._m(0),t._v(" "),s("div",{staticClass:"shipping-rate-value"},[t._v("$"+t._s(t.orderEstimate.shipping))])])])])]),t._v(" "),s("div",{staticClass:"segment payment-information"},[s("h3",{staticClass:"segment-title"},[t._v("Payment Information")]),t._v(" "),s("div",{staticClass:"field"},[s("div",{staticClass:"input-wrapper stripe-wrapper"},[s("div",{attrs:{id:"card-number"}}),t._v(" "),s("label",[t._v("Credit Card Number")]),t._v(" "),s("Icon",{attrs:{name:"creditCard"}})],1),t._v(" "),s("span",{ref:"number-error",staticClass:"error"})]),t._v(" "),s("div",{staticClass:"input-group input-group-col-2"},[s("div",{staticClass:"field"},[t._m(1),t._v(" "),s("span",{ref:"expiry-error",staticClass:"error"})]),t._v(" "),s("div",{staticClass:"field"},[t._m(2),t._v(" "),s("span",{ref:"cvc-error",staticClass:"error"})])])]),t._v(" "),s("div",{staticClass:"segment place-order"},[s("div",{staticClass:"place-order-error"},[t._v(t._s(t.placeOrderError))]),t._v(" "),s("button",{ref:"place-order",staticClass:"cta place-order-cta",on:{click:function(e){return e.preventDefault(),t.validateFields({isEstimate:!1})}}},[s("span",{staticClass:"place-order-text"},[t._v("Place Order")])])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"shipping-rate-name"},[e("span",{staticClass:"shipping-rate-id"},[this._v("Standard")]),this._v(" - "),e("span",[this._v("Flat Rate (3-4 business days after fulfillment)")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"input-wrapper stripe-wrapper"},[e("div",{attrs:{id:"card-expiry"}}),this._v(" "),e("label",[this._v("MM / YY")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"input-wrapper stripe-wrapper"},[e("div",{attrs:{id:"card-cvc"}}),this._v(" "),e("label",[this._v("CVC")])])}]};var c=s("VU/8")(d,p,!1,function(t){s("JK9p")},"data-v-41c567a8",null).exports,u=(s("7A6K"),{name:"Cart",components:{Icon:r.a,Checkout:c},mixins:[a.a],data:function(){return{cart:[],subtotal:0,shipping:"TBD",tax:"TBD",total:0,processing:!1}},methods:{getCart:function(){this.cart=a.a.getCartArray(),console.log(this.cart),this.subtotal=this.cart.reduce(function(t,e){return t+e.price},0)},remove:function(t){i.a.$emit("cart-remove",t),this.getCart()},setProcessingState:function(t){var e=t.isProcessing;this.processing=e},estimateOrder:function(t){this.shipping=t.shipping,this.tax=t.tax,this.total=this.subtotal+this.shipping+this.tax}},mounted:function(){this.getCart(),i.a.$on("processing",this.setProcessingState),i.a.$on("order-estimate",this.estimateOrder)},beforeDestroy:function(){i.a.$off("processing",this.setProcessingState),i.a.$off("order-estimate",this.estimateOrder)}}),_={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"cart"},[s("a",{staticClass:"back-top-shopping",on:{click:function(e){return t.$router.go(-1)}}},[s("Icon",{attrs:{name:"backArrowLeft"}}),t._v(" "),s("span",[t._v("Back to Shopping")])],1),t._v(" "),s("div",{staticClass:"cart-main"},[s("div",{staticClass:"cart-products"},[s("h1",{staticClass:"cart-title"},[t._v("Your Stuff ("+t._s(t.cart.length)+")")]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:!t.cart.length,expression:"!cart.length"}],staticClass:"cart-empty"},[t._v("There are no products in your cart.")]),t._v(" "),s("ul",{staticClass:"order-list"},t._l(t.cart.slice().reverse(),function(e,i){return s("li",{key:"size-"+i,staticClass:"order-product"},[s("router-link",{staticClass:"order-product-image-link-col",attrs:{to:{name:"Product",params:{id:e.productID},query:{color:e.query.color,size:e.query.size}}}},[s("img",{staticClass:"order-product-image",attrs:{src:e.image}})]),t._v(" "),s("div",{staticClass:"order-product-details-col"},[s("router-link",{staticClass:"order-product-link",attrs:{to:{name:"Product",params:{id:e.productID},query:{color:e.query.color,size:e.query.size}}}},[s("div",{staticClass:"order-product-title"},[t._v(t._s(e.title))])]),t._v(" "),s("div",{staticClass:"order-product-detail"},[s("label",[t._v("Size:")]),t._v(" "),s("span",{staticClass:"order-product-detail-val"},[t._v(t._s(e.size))])]),t._v(" "),s("div",{staticClass:"order-product-detail"},[s("label",[t._v("Color:")]),t._v(" "),s("span",{staticClass:"order-product-detail-val"},[t._v(t._s(e.color))])]),t._v(" "),s("div",{staticClass:"order-product-price"},[t._v("$"+t._s(e.price))])],1),t._v(" "),s("div",{staticClass:"cart-product-delete-col"},[s("div",{staticClass:"cart-product-delete-close",on:{click:function(s){return t.remove(e.variantID)}}},[s("Icon",{attrs:{name:"close"}})],1)])],1)}),0)]),t._v(" "),s("div",{staticClass:"cart-summary"},[s("div",{class:{"total-shown":0!==t.total,processing:t.processing,"cart-os":!0}},[s("div",{staticClass:"cart-os-title"},[t._v("Order Summary")]),t._v(" "),s("div",{staticClass:"nyan-loading"}),t._v(" "),s("div",{staticClass:"cart-os-details fade-slide"},[s("div",{staticClass:"cart-os-details-row"},[s("div",{staticClass:"cart-os-subtotal-label"},[t._v("Subtotal")]),t._v(" "),s("div",{staticClass:"cart-os-subtotal-value"},[t._v(t._s(t._f("toCurrency")(t.subtotal)))])]),t._v(" "),s("div",{staticClass:"cart-os-details-row"},[s("div",{staticClass:"cart-os-subtotal-label"},[t._v("Shipping")]),t._v(" "),s("div",{staticClass:"cart-os-subtotal-value"},[t._v(t._s(t._f("toCurrency")(t.shipping)))])]),t._v(" "),s("div",{staticClass:"cart-os-details-row"},[s("div",{staticClass:"cart-os-subtotal-label"},[t._v("Tax")]),t._v(" "),s("div",{staticClass:"cart-os-subtotal-value"},[t._v(t._s(t._f("toCurrency")(t.tax)))])]),t._v(" "),s("div",{staticClass:"cart-os-details-row total"},[s("div",{staticClass:"cart-os-subtotal-label"},[t._v("Total")]),t._v(" "),s("div",{staticClass:"cart-os-subtotal-value"},[t._v(t._s(t._f("toCurrency")(t.total)))])])])])])]),t._v(" "),s("Checkout",{directives:[{name:"show",rawName:"v-show",value:t.cart.length,expression:"cart.length"}]})],1)},staticRenderFns:[]};var m=s("VU/8")(u,_,!1,function(t){s("k9gV")},"data-v-1519735a",null);e.default=m.exports},JK9p:function(t,e){},k9gV:function(t,e){}});
//# sourceMappingURL=2.314b57779921551dbcaf.js.map