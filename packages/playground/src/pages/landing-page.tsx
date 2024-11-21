import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { noop } from 'lodash-es'

import { CreateProjectPage } from '../components/create-project-page'
import { ForgotPasswordPage } from '../components/forgot-password-page'
import { Home } from '../components/home'
import { NewPasswordPage } from '../components/new-password-page'
import { OTPPage } from '../components/otp-page'
import { SignInPage } from '../components/signin-page'
import { SignUpPage } from '../components/signup-page'
import { mockProjects } from '../data/mockProjects'
import PlaygroundLandingSettings from '../settings/landing-settings'

export default function LandingPage() {
  const [loadState, setLoadState] = useState('home-auth')
  const navigate = useNavigate()

  const handleSelectProject = () => {
    navigate('/repos')
  }

  const handleSignUp = () => {
    setLoadState('sign-up')
  }

  const handleSignIn = () => {
    setLoadState('sign-in')
  }

  const renderContent = () => {
    switch (loadState) {
      case 'home-auth':
        return <Home isAuthed onSelectProject={handleSelectProject} title="Canary Playground" projects={mockProjects} />
      case 'home-unauth':
        return (
          <Home isAuthed={false} handleSignUp={handleSignUp} handleSignIn={handleSignIn} title="Canary Playground" />
        )
      case 'create-project':
        return <CreateProjectPage onFormSubmit={noop} />
      case 'sign-in':
        return <SignInPage handleSignIn={handleSignIn} />
      case 'sign-up':
        return <SignUpPage handleSignUp={handleSignUp} />
      case 'password-forgot':
        return <ForgotPasswordPage handleSignUp={handleSignUp} />
      case 'password-new':
        return <NewPasswordPage handleSignIn={handleSignIn} />
      case 'password-otp':
        return <OTPPage handleResend={noop} />
      default:
        return null
    }
  }

  return (
    <>
      {renderContent()}
      <PlaygroundLandingSettings loadState={loadState} setLoadState={setLoadState} />
    </>
  )
}
