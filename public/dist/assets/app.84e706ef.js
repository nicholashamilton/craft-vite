var p=Object.defineProperty;var _=(r,e,t)=>e in r?p(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var a=(r,e,t)=>(_(r,typeof e!="symbol"?e+"":e,t),t);function C(){import("data:text/javascript,")}const h="modulepreload",m={},g="/dist/",c=function(e,t){return!t||t.length===0?e():Promise.all(t.map(n=>{if(n=`${g}${n}`,n in m)return;m[n]=!0;const s=n.endsWith(".css"),o=s?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${o}`))return;const i=document.createElement("link");if(i.rel=s?"stylesheet":h,s||(i.as="script",i.crossOrigin=""),i.href=n,document.head.appendChild(i),s)return new Promise((u,d)=>{i.addEventListener("load",u),i.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${n}`)))})})).then(()=>e())};class f{constructor(){a(this,"_modules");a(this,"_webComponentTagNames");a(this,"_modulesDictionary")}initModules(){this._modules={"../../templates/_components/input-component/input-component.ts":()=>c(()=>import("./input-component.f8b0c311.js"),[])},this._modulesDictionary=this.getModulesDictionary(),this._webComponentTagNames=this.getActiveWebComponentTagNames(),this.mountWebComponents()}getModulesDictionary(){const e={};for(const t in this._modules){const n=t.split(".").slice(0,-1).join("."),s=n.split("/"),o=n.split("/")[s.length-1];e[o]={module:this._modules[t],path:t,tagName:o}}return e}getActiveWebComponentTagNames(){const e=Array.from(document.querySelectorAll("[web-component]"));return[...new Set(e.map(n=>n.localName))]}async mountWebComponents(){var e,t;for(let n=0;n<this._webComponentTagNames.length;n++){const s=this._modulesDictionary[this._webComponentTagNames[n]];if(!customElements.get(s.tagName)){let o=await s.module();if(!(o!=null&&o.default)){const i=(t=(e=Object.keys(o))==null?void 0:e[0])!=null?t:null;if(!i)throw"ES Module is exporting an empty object.";o=Object.assign({default:o[i]},o)}customElements.define(s.tagName,o.default)}}}}const l=new f,b=l.initModules.bind(l);document.documentElement.dataset.env==="dev"&&c(()=>Promise.resolve({}),["assets/styles.48057ffd.css"]);b();export{C as __vite_legacy_guard};