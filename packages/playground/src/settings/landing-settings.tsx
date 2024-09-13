import React from 'react'
import PlaygroundSettingsMenu from './menu'

interface SettingsProps {
  loadState: string
  setLoadState: (state: string) => void
}

const LandingSettings = ({ loadState, setLoadState }: SettingsProps) => {
  const settingsOptions = [
    { key: 'home-auth', label: 'Home page (authed)' },
    { key: 'home-unauth', label: 'Home page (unauthed)' },
    { key: 'create-workspace', label: 'Create workspace' },
    { key: 'sign-in', label: 'Sign in' },
    { key: 'sign-up', label: 'Sign up' }
  ]

  return (
    <PlaygroundSettingsMenu
      title="Landing page states"
      options={settingsOptions}
      loadState={loadState}
      setLoadState={setLoadState}
    />
  )
}

export default LandingSettings
