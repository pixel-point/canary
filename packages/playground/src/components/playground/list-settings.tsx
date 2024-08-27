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
  listState: string
  setListState: (state: string) => void
}

const PlaygroundListSettings: React.FC<PlaygroundListSettingsProps> = ({ listState, setListState }) => {
  return (
    <div className="group fixed right-0 bottom-0 z-50 py-3 px-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="opacity-50 group-hover:opacity-100 outline-none">
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
            onClick={() => setListState('data-loaded')}
            className={listState === 'data-loaded' ? 'text-emerald-500' : ''}>
            Data loaded
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setListState('loading')}
            className={listState === 'loading' ? 'text-emerald-500' : ''}>
            Loading
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setListState('no-data')}
            className={listState === 'no-data' ? 'text-emerald-500' : ''}>
            No data
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setListState('no-search-matches')}
            className={listState === 'no-search-matches' ? 'text-emerald-500' : ''}>
            No search results
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default PlaygroundListSettings
