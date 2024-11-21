import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icon,
  Text
} from '@harnessio/canary'

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
    <div className="group fixed bottom-0 right-0 z-50 px-4 py-3">
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="opacity-25 outline-none duration-100 ease-in-out group-hover:opacity-100"
        >
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
              className={loadState === option.key ? 'text-emerald-500' : ''}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default PlaygroundSettingsMenu
