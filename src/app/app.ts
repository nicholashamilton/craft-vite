import { initModules } from './web-component-loader';

document.body.classList.remove("preload");

initModules();

// console.log(import.meta.env.VITE_PRIMARY_SITE_URL);
