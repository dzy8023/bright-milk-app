/// <reference types="vite/client" />

declare module '*.vue' {
  import type DefineComponent from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // 更多环境变量...
  VITE_APP_API_URL: string
  VITE_SIMPLE_PHONE: string
  VITE_APP_API_TIMEOUT: number
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
