import { initModules } from './web-component-loader';

if (document.documentElement.dataset.env === "dev") {
    import("../styles/main.scss").then(() => {
        document.documentElement.classList.add("dev-css-loaded");
        initModules();
    });
} else {
    initModules();
}