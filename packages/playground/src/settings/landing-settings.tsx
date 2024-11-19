import PlaygroundSettingsMenu from './menu'

interface SettingsProps {
  loadState: string
  setLoadState: (state: string) => void
}

const LandingSettings = ({ loadState, setLoadState }: SettingsProps) => {
  const settingsOptions = [
    { key: 'home-auth', label: 'Home page (authed)' },
    { key: 'home-unauth', label: 'Home page (unauthed)' },
    { key: 'create-project', label: 'Create project' },
    { key: 'sign-in', label: 'Sign in' },
    { key: 'sign-up', label: 'Sign up' },
    { key: 'password-forgot', label: 'Forgot password' },
    { key: 'password-new', label: 'New password' },
    { key: 'password-otp', label: 'Password OTP' }
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
