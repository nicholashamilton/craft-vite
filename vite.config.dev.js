export default ({ command }) => ({
    base: command === "serve" ? "" : "/dist/",
    build: {
        manifest: true,
        outDir: "./public/dist/",
        rollupOptions: {
            input: {
                app: "./src/app/app.ts",
                main: "./src/styles/main.scss",
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
