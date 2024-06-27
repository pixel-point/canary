import './App.css'
import { Button } from '@/components/ui/button'
import { RocketIcon, ReloadIcon, EnvelopeOpenIcon, ChevronRightIcon } from '@radix-ui/react-icons'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

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
        <Button variant="outline" size="icon">
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        <Button>
          <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Login with Email
        </Button>
        <Button disabled>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      </div>

      <div>
        <div>
          <Alert>
            <RocketIcon className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>You can add components to your app using the cli.</AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}

export default App
