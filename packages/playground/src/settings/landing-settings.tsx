import {
  Text,
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  Icon,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@harnessio/canary'
import React from 'react'

interface PlaygroundLandingSettingsProps {
  loadState: string
  setLoadState: (state: string) => void
}

const PlaygroundLandingSettings: React.FC<PlaygroundLandingSettingsProps> = ({ loadState, setLoadState }) => {
  return (
    <div className="group fixed right-0 bottom-0 z-50 py-3 px-4">
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="opacity-25 group-hover:opacity-100 outline-none ease-in-out duration-100">
          <Button variant="ghost" size="icon">
            <Icon name="ellipsis" className="text-primary" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Text weight="bold" size={2}>
              Landing page states
            </Text>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setLoadState('home-auth')}
            className={loadState === 'home-auth' ? 'text-emerald-500' : ''}>
            Home page (authed)
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setLoadState('home-unauth')}
            className={loadState === 'home-unauth' ? 'text-emerald-500' : ''}>
            Home page (unauthed)
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setLoadState('sign-in')}
            className={loadState === 'sign-in' ? 'text-emerald-500' : ''}>
            Sign in
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setLoadState('sign-up')}
            className={loadState === 'sign-up' ? 'text-emerald-500' : ''}>
            Sign up
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default PlaygroundLandingSettings
