import PlaygroundSettingsMenu from './menu'

interface SettingsProps {
  loadState: string
  setLoadState: (state: string) => void
}

export const PlaygroundListSettings = ({ loadState, setLoadState }: SettingsProps) => {
  const settingsOptions = [
    { key: 'data-loaded', label: 'Data loaded' },
    { key: 'loading', label: 'Loading' },
    { key: 'no-data', label: 'No data' },
    { key: 'no-search-matches', label: 'No search matches' }
  ]

  return (
    <PlaygroundSettingsMenu
      title="List page states"
      options={settingsOptions}
      loadState={loadState}
      setLoadState={setLoadState}
    />
  )
}
