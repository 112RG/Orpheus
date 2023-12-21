import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
// boilerplate components
import { AppProvider } from './providers/App'
// for internationalization (translations)
import './i18n'

const container = document.getElementById('root')! as HTMLElement
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
)
