!function(){function t(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}System.register([],(function(e,o){"use strict";return{execute:function(){const e=function(t,e){return t()};const n=new class{constructor(){t(this,"_modules",void 0),t(this,"_webComponentTagNames",void 0),t(this,"_modulesDictionary",void 0)}initModules(){this._modules={"../../templates/_components/input-component/input-component.ts":()=>o.import("./input-component-legacy.737a0e2a.js"),"../../templates/component-collection/card-carousel/card-carousel.ts":()=>o.import("./card-carousel-legacy.f04ad5f9.js"),"../../templates/component-collection/content-carousel/content-carousel.ts":()=>o.import("./content-carousel-legacy.0858619a.js"),"../../templates/component-collection/date-time-picker/date-time-picker.ts":()=>o.import("./date-time-picker-legacy.11ff2c14.js"),"../../templates/component-collection/image-slider/image-slider.ts":()=>o.import("./image-slider-legacy.90c45c7b.js"),"../../templates/component-collection/input-component/input-component.ts":()=>o.import("./input-component-legacy.b3975e71.js"),"../../templates/component-collection/input-date/input-date.ts":()=>o.import("./input-date-legacy.48a8a090.js"),"../../templates/component-collection/input-email/input-email.ts":()=>o.import("./input-email-legacy.2c8462f8.js"),"../../templates/component-collection/input-password/input-password.ts":()=>o.import("./input-password-legacy.15c43552.js"),"../../templates/component-collection/input-phone/input-phone.ts":()=>o.import("./input-phone-legacy.ab1e39fa.js"),"../../templates/component-collection/input-pin/input-pin.ts":()=>o.import("./input-pin-legacy.47fb685b.js"),"../../templates/component-collection/input-range/input-range.ts":()=>o.import("./input-range-legacy.c67c3720.js"),"../../templates/component-collection/input-url/input-url.ts":()=>o.import("./input-url-legacy.549db3bd.js"),"../../templates/component-collection/select/select-component.ts":()=>o.import("./select-component-legacy.91097678.js"),"../../templates/component-collection/swiper-card-slider/swiper-card-slider.ts":()=>o.import("./swiper-card-slider-legacy.25ec7cd1.js"),"../../templates/component-collection/textarea/textarea-component.ts":()=>o.import("./textarea-component-legacy.ee088be5.js"),"../../templates/component-collection/touch-slider/touch-slider.ts":()=>o.import("./touch-slider-legacy.94a95af1.js")},this._modulesDictionary=this.getModulesDictionary(),this._webComponentTagNames=this.getActiveWebComponentTagNames(),this.mountWebComponents()}getModulesDictionary(){const t={};for(const e in this._modules){const o=e.split(".").slice(0,-1).join("."),n=o.split("/"),i=o.split("/")[n.length-1];t[i]={module:this._modules[e],path:e,tagName:i}}return t}getActiveWebComponentTagNames(){const t=Array.from(document.querySelectorAll("[web-component]"));return[...new Set(t.map((t=>t.localName)))]}async mountWebComponents(){for(let n=0;n<this._webComponentTagNames.length;n++){const i=this._modulesDictionary[this._webComponentTagNames[n]];if(!customElements.get(i.tagName)){var t;let n=await i.module();if(null===(t=n)||void 0===t||!t.default){var e,o;const t=null!==(e=null===(o=Object.keys(n))||void 0===o?void 0:o[0])&&void 0!==e?e:null;if(!t)throw"ES Module is exporting an empty object.";n=Object.assign({default:n[t]},n)}customElements.define(i.tagName,n.default)}}}},i=n.initModules.bind(n);"dev"===document.documentElement.dataset.env&&e((()=>o.import("./styles-legacy.81646420.js"))),i()}}}))}();
