import React, { createContext, useContext, useState, ReactNode } from 'react'
import { TypesSpace } from '@harnessio/code-service-client'

interface AppContextType {
  selectedSpace: string
  setSelectedSpace: (space: string) => void
  spaces: TypesSpace[]
  setSpaces: (spaces: TypesSpace[]) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedSpace, setSelectedSpace] = useState<string>('')
  const [spaces, setSpaces] = useState<TypesSpace[]>([])

  return (
    <AppContext.Provider value={{ selectedSpace, setSelectedSpace, spaces, setSpaces }}>{children}</AppContext.Provider>
  )
}

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
