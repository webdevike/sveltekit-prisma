/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEB_URL: string
  readonly VITE_STRIPE_SECRET_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}