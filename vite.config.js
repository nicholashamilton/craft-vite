import ViteRestart from "vite-plugin-restart";
// import "vite/dynamic-import-polyfill";
import legacy from "@vitejs/plugin-legacy";

// https://vitejs.dev/config/
export default ({ command }) => ({
    base: command === "serve" ? "" : "/dist/",
    build: {
        manifest: true,
        outDir: "./public/dist/",
        rollupOptions: {
            input: {
                app: "./src/app/app.ts",
                styles: "./src/styles/main.scss",
            },
        },
    },
    plugins: [
        legacy({
            targets: ["defaults", "not IE 11"],
        }),
        ViteRestart({
            reload: ["./src/**/*", "./templates/**/*"],
        }),
    ],
    server: {
        origin: "http://localhost:3000",
        host: "0.0.0.0",
    },
});
