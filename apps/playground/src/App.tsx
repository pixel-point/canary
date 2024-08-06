import React from 'react'
import { ModeToggle } from './components/mode-toggle'
import { ThemeProvider } from './components/theme-provider'
import { Execution } from './pages/Execution'
import { LoginForm } from './pages/Login'
import '@harnessio/canary/styles'

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <main>
        {/* <LoginForm />
        <ModeToggle /> */}
        <Execution />
      </main>
    </ThemeProvider>
  )
}
