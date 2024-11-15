import PlaygroundSettingsMenu from './menu'

interface SettingsProps {
  loadState: string
  setLoadState: (state: string) => void
}

export const PlaygroundSandboxLayoutSettings = ({ loadState, setLoadState }: SettingsProps) => {
  const settingsOptions = [
    { key: 'float', label: 'Floating content' },
    { key: 'full', label: 'Full width content' },
    { key: 'float-sub', label: 'Floating + nested panel' },
    { key: 'full-sub', label: 'Full width + nested panel' }
  ]

  return (
    <PlaygroundSettingsMenu
      title="Sandbox layout settings"
      options={settingsOptions}
      loadState={loadState}
      setLoadState={setLoadState}
    />
  )
}
