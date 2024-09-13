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

interface PlaygroundSettingsOption {
  key: string
  label: string
}

interface PlaygroundSettingsMenuProps {
  loadState: string
  setLoadState: (state: string) => void
  options: PlaygroundSettingsOption[]
  title: string
}

const PlaygroundSettingsMenu: React.FC<PlaygroundSettingsMenuProps> = ({ loadState, setLoadState, options, title }) => {
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
              {title}
            </Text>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {options.map(option => (
            <DropdownMenuItem
              key={option.key}
              onClick={() => setLoadState(option.key)}
              className={loadState === option.key ? 'text-emerald-500' : ''}>
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default PlaygroundSettingsMenu
