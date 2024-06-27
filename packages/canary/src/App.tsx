import './App.css'
import { Button } from '@/components/ui/button'

function App() {
  return (
    <div style={{ display: 'flex', gap: '20px', flexDirection: 'column', padding: '100px' }}>
      <div style={{ display: 'flex', gap: '20px', flexDirection: 'row' }}>
        <Button>Button</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="outline">Outline</Button>
      </div>
    </div>
  )
}

export default App
