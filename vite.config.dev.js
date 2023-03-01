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
        minify: false,
        sourcemap: true,
        watch: true,
    },
    server: {
        origin: "http://localhost:3000",
        host: "0.0.0.0",
    },
});
