/// <reference types="vite/client" />

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            APP_NAME: string;
            DEV_MODE: boolean; // ou 'true' | 'false' se preferir string literal
            CLICKUP_URL: string;
            CLICKUP_USER: string;
            CLICKUP_PASS: string;
            CLICKUP_LIST_ID: string;
        }
    }
}

export {};