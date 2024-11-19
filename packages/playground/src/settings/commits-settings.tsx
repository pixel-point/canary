import PlaygroundSettingsMenu from './menu'

interface SettingsProps {
  loadState: string
  setLoadState: (state: string) => void
}

const CommitsSettings = ({ loadState, setLoadState }: SettingsProps) => {
  const settingsOptions = [
    { key: 'data-loaded', label: 'Data loaded' },
    { key: 'loading', label: 'Loading' },
    { key: 'no-data', label: 'No data' }
  ]

  return (
    <PlaygroundSettingsMenu
      title="Commits page states"
      options={settingsOptions}
      loadState={loadState}
      setLoadState={setLoadState}
    />
  )
}

export default CommitsSettings
