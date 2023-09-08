import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ command, mode }) => {

    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
    const env = loadEnv(mode, process.cwd(), ''); // https://main.vitejs.dev/config/#using-environment-variables-in-config

    return {
        define: {
            __APP_ENV__: JSON.stringify(env.APP_ENV),
        },
        base: command === 'serve' ? '' : '/dist/',
        build: {
            manifest: true,
            outDir: './public/dist/',
            rollupOptions: {
                input: {
                    app: './src/app/app.ts',
                    css: './src/styles/main.scss',
                },
            },
        },
        server: {
            fs: {
                strict: false,
            },
            origin: env.PRIMARY_SITE_URL || 'http://localhost:3000',
            port: 3000,
            strictPort: true,
        },
    };
});
