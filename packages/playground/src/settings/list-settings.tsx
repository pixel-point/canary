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

interface PlaygroundListSettingsProps {
  loadState: string
  setLoadState: (state: string) => void
}

const PlaygroundListSettings: React.FC<PlaygroundListSettingsProps> = ({ loadState, setLoadState }) => {
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
              List states
            </Text>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setLoadState('data-loaded')}
            className={loadState === 'data-loaded' ? 'text-emerald-500' : ''}>
            Data loaded
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setLoadState('loading')}
            className={loadState === 'loading' ? 'text-emerald-500' : ''}>
            Loading
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setLoadState('no-data')}
            className={loadState === 'no-data' ? 'text-emerald-500' : ''}>
            No data
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setLoadState('no-search-matches')}
            className={loadState === 'no-search-matches' ? 'text-emerald-500' : ''}>
            No search results
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default PlaygroundListSettings
