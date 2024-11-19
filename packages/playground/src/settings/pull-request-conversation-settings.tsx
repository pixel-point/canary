import PlaygroundSettingsMenu from './menu'

interface SettingsProps {
  loadState: string
  setLoadState: (state: string) => void
}

const PRCommitsSettings = ({ loadState, setLoadState }: SettingsProps) => {
  const settingsOptions = [
    { key: 'data-loaded', label: 'Data loaded' },
    { key: 'data-loaded-checksFailed', label: 'Data loaded - checks failed' },
    { key: 'data-loaded-unchecked', label: 'Data loaded - unchecked' },
    { key: 'data-loaded-conflict', label: 'Data loaded - conflict' },
    { key: 'loading', label: 'Loading' },
    { key: 'no-data', label: 'No data' }
  ]

  return (
    <PlaygroundSettingsMenu
      title="PR conversations page states"
      options={settingsOptions}
      loadState={loadState}
      setLoadState={setLoadState}
    />
  )
}

export default PRCommitsSettings
