import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

// https://vite.dev/config/
export default defineConfig(({mode}) => {
    const env = loadEnv(mode, '.', '');

    return {
        plugins: [react(), tailwindcss()],
        define: {
            'process.env.APP_NAME': JSON.stringify(env.APP_NAME),
            'process.env.DEV_MODE': env.DEV_MODE.toString(),
            'process.env.CLICKUP_URL': JSON.stringify(env.CLICKUP_URL),
            'process.env.CLICKUP_USER': JSON.stringify(env.CLICKUP_USER),
            'process.env.CLICKUP_PASS': JSON.stringify(env.CLICKUP_PASS),
            'process.env.CLICKUP_LIST_ID': JSON.stringify(env.CLICKUP_LIST_ID),
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, '.'),
            },
        },
    }
})
