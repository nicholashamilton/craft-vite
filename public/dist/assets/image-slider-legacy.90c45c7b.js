!function(){function t(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}System.register([],(function(e){"use strict";return{execute:function(){class i extends HTMLElement{constructor(){super(),t(this,"_slider",void 0),t(this,"_slides",void 0),t(this,"_isDragging",!1),t(this,"_startPos",0),t(this,"_currentTranslate",0),t(this,"_prevTranslate",0),t(this,"_animationId",void 0),t(this,"_currentIndex",0),t(this,"addEventListeners",(()=>{this._slides.forEach(((t,e)=>{t.querySelector("img").addEventListener("dragstart",(t=>t.preventDefault())),t.addEventListener("touchstart",this.touchStart(e)),t.addEventListener("touchend",this.touchEnd),t.addEventListener("touchmove",this.touchMove),t.addEventListener("mousedown",this.touchStart(e)),t.addEventListener("mouseup",this.touchEnd),t.addEventListener("mousemove",this.touchMove),t.addEventListener("mouseleave",this.touchEnd),this.calculateSlideWidth(t)})),window.addEventListener("resize",this.handleResize),this.classList.remove("loading")})),t(this,"handleResize",(()=>{this._slides.forEach((t=>{this.calculateSlideWidth(t)}))})),t(this,"calculateSlideWidth",(t=>{t.style.minWidth=`${this.clientWidth}px`})),t(this,"getPositionX",(t=>t.type.includes("mouse")?t.pageX:t.touches[0].clientX)),t(this,"touchStart",(t=>e=>{this._currentIndex=t,this._startPos=this.getPositionX(e),this._isDragging=!0,this._animationId=requestAnimationFrame(this.animation),this._slider.classList.add("grabbing")})),t(this,"touchMove",(t=>{if(this._isDragging){const e=this.getPositionX(t);this._currentTranslate=this._prevTranslate+e-this._startPos}})),t(this,"touchEnd",(()=>{cancelAnimationFrame(this._animationId),this._isDragging=!1;const t=this._currentTranslate-this._prevTranslate,e=.25*this._slides[0].offsetWidth;t<-e&&this._currentIndex<this._slides.length-1&&this._currentIndex++,t>e&&this._currentIndex>0&&this._currentIndex--,this.setPositionByIndex(),this._slider.classList.remove("grabbing")})),t(this,"animation",(()=>{this.setSliderPosition(),this._isDragging&&requestAnimationFrame(this.animation)})),t(this,"setPositionByIndex",(()=>{this._currentTranslate=this._currentIndex*-this._slides[0].offsetWidth,this._prevTranslate=this._currentTranslate,this.setSliderPosition()})),t(this,"setSliderPosition",(()=>{this._slider.style.transform=`translateX(${this._currentTranslate}px)`})),this._slider=this,this._slides=Array.from(this.querySelectorAll(".image-slide"))}connectedCallback(){this.addEventListeners(),window.addEventListener("resize",this.setPositionByIndex),window.oncontextmenu=t=>(t.preventDefault(),t.stopPropagation(),!1)}}e("default",i)}}}))}();
