import PlaygroundSettingsMenu from './menu'

interface SettingsProps {
  loadState: string
  setLoadState: (state: string) => void
}

const PRChangesSettings = ({ loadState, setLoadState }: SettingsProps) => {
  const settingsOptions = [
    { key: 'data-loaded-success', label: 'Data loaded - approved' },
    { key: 'data-loaded-warning', label: 'Data loaded - warning' },
    { key: 'data-loaded-error', label: 'Data loaded - error' },
    { key: 'loading', label: 'Loading' },
    { key: 'no-data', label: 'No data' }
  ]

  return (
    <PlaygroundSettingsMenu
      title="PR changes page states"
      options={settingsOptions}
      loadState={loadState}
      setLoadState={setLoadState}
    />
  )
}

export default PRChangesSettings
