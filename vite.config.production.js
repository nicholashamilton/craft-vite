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
                css: "./src/styles/main.scss",
            },
            output: {
                sourcemap: true,
            },
        },
        minify: true,
        sourcemap: true,
    },
    plugins: [
        legacy({
            targets: ["defaults", "not IE 11"],
        }),
    ],
    server: {
        origin: "http://localhost:3000",
        host: "0.0.0.0",
    },
});
