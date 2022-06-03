if (document.documentElement.dataset.env === "dev") {
    import("../styles/main.scss");
}

import { initModules } from './web-component-loader';
initModules();