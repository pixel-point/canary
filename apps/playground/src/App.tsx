import { ModeToggle } from './components/mode-toggle'
import { ThemeProvider } from './components/theme-provider'
import { LoginForm } from './pages/Login'

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <main>
        <LoginForm />
        <ModeToggle />
      </main>
    </ThemeProvider>
  )
}
