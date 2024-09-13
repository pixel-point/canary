import React, { useState } from 'react'
import { Home } from '../components/home'
import PlaygroundLandingSettings from '../settings/landing-settings'
import { SignInPage } from '../pages/signin-page'
import { useNavigate } from 'react-router-dom'
import SignUpPage from './signup-page'
import { mockProjects } from '../data/mockProjects'

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
      case 'sign-in':
        return <SignInPage handleSignUp={handleSignUp} handleSignIn={handleSignIn} />
      case 'sign-up':
        return <SignUpPage handleSignIn={handleSignIn} />
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
