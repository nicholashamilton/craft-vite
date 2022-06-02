!function(){function t(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}System.register([],(function(e){"use strict";return{execute:function(){class i extends HTMLElement{constructor(){super(),t(this,"input",void 0),t(this,"textEl",void 0),t(this,"errorEl",void 0),t(this,"monthInput",void 0),t(this,"dayInput",void 0),t(this,"yearInput",void 0),t(this,"handleBlur",(()=>{if(this.monthInput.value&&this.dayInput.value&&this.yearInput.value){const t=Date.parse(`${this.monthInput.value}/${this.dayInput.value}/${this.yearInput.value}`);isNaN(t)?this.input.value="":this.input.value=new Date(t).toISOString()}else this.input.value="";this.validate()})),t(this,"handleInput",this.clearError.bind(this)),this.input=this.querySelector('input[type="hidden"]'),this.textEl=this.querySelector("p:not(.label)");const e=document.createElement("p");e.className="error",e.style.display="none";const i=this.querySelector("p:last-of-type");this.insertBefore(e,i),this.errorEl=e,this.monthInput=this.querySelector("input#month"),this.dayInput=this.querySelector("input#day"),this.yearInput=this.querySelector("input#year")}validate(){let t=!0;return this.input.required&&""===this.input.value?(t=!1,"invalid"!==this.getAttribute("state")&&this.reportError("This field is required.")):this.clearError(),t}reportError(t){this.errorEl.innerHTML=t,this.errorEl.style.display="block",this.textEl&&(this.textEl.style.display="none"),this.setAttribute("state","invalid")}clearError(){this.errorEl.style.display="none",this.textEl&&(this.textEl.style.display="block"),this.setAttribute("state","valid")}connectedCallback(){this.querySelectorAll("input").forEach((t=>{t.addEventListener("input",this.handleInput),t.addEventListener("blur",this.handleBlur)}))}}e("default",i)}}}))}();
