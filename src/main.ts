import { createSSRApp } from 'vue'
import pinia from './store'
import store from './store'

import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(pinia)
  app.use(store)
  return {
    app,
  }
}
