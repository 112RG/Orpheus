import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
// boilerplate components
import { AppProvider } from './providers/App'

// for internationalization (translations)
import './i18n'
import { RouterProvider } from '@tanstack/react-router'

import { AppRouter } from './features/router/app-router'

const container = document.getElementById('root')! as HTMLElement
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <AppProvider>
      <AppRouter />
    </AppProvider>
  </React.StrictMode>,
)
