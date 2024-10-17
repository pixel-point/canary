import React, { createContext, useContext, ReactNode } from 'react'
import { noop } from 'lodash-es'
import { TypesSpace, TypesUser } from '@harnessio/code-service-client'
import useLocalStorage from '../hooks/useLocalStorage'

interface AppContextType {
  spaces: TypesSpace[]
  setSpaces: (value: TypesSpace[]) => void
  addSpaces: (newSpaces: TypesSpace[]) => void
  resetApp: () => void
  currentUser?: TypesUser
  setCurrentUser: (value: TypesUser) => void
}

const AppContext = createContext<AppContextType>({
  spaces: [],
  setSpaces: noop,
  addSpaces: noop,
  resetApp: noop,
  currentUser: undefined,
  setCurrentUser: noop
})

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [spaces, setSpaces] = useLocalStorage<TypesSpace[]>('spaces', [])
  const [currentUser, setCurrentUser] = useLocalStorage<TypesUser>('currentUser', {})

  const resetApp = (): void => {
    setSpaces([])
    setCurrentUser({})
  }

  const addSpaces = (newSpaces: TypesSpace[]): void => {
    setSpaces([...spaces, ...newSpaces])
  }

  return (
    <AppContext.Provider
      value={{
        spaces,
        setSpaces,
        addSpaces,
        resetApp,
        currentUser,
        setCurrentUser
      }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
