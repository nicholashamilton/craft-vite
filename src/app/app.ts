if (document.documentElement.dataset.env === "dev") {
    await import("../styles/main.scss");
    document.documentElement.classList.add("dev-css-loaded");
}

import { initModules } from './web-component-loader';
initModules();