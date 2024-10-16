import React, { createContext, useContext, useState, ReactNode, useEffect, useLayoutEffect } from 'react'
import { CodeServiceAPIClient, membershipSpaces, TypesSpace, TypesUser, getUser } from '@harnessio/code-service-client'

interface AppContextType {
  spaces: TypesSpace[]
  setSpaces: React.Dispatch<React.SetStateAction<TypesSpace[]>>
  addSpaces: (newSpaces: TypesSpace[]) => void
  isUserAuthorized: boolean
  setIsUserAuthorized: React.Dispatch<React.SetStateAction<boolean>>
  resetApp: () => void
  currentUser?: TypesUser
}

const BASE_URL_PREFIX = `${window.apiUrl || ''}/api/v1`

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [spaces, setSpaces] = useState<TypesSpace[]>([])
  const [currentUser, setCurrentUser] = useState<TypesUser>()
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false)

  useLayoutEffect(() => {
    new CodeServiceAPIClient({
      urlInterceptor: (url: string) => `${BASE_URL_PREFIX}${url}`,
      responseInterceptor: (response: Response) => {
        switch (response.status) {
          case 401:
            resetApp()
            window.location.href = '/signin'
            break
        }
        return response
      }
    })
  }, [])

  useEffect(() => {
    if (isAuthorized) {
      const fetchData = async () => {
        try {
          const [memberships, user] = await Promise.all([
            membershipSpaces({
              queryParams: { page: 1, limit: 10, sort: 'identifier', order: 'asc' }
            }),
            getUser({})
          ])
          setCurrentUser(user)
          if (memberships.length > 0) {
            const spaceList = memberships.filter(item => item?.space).map(item => item.space as TypesSpace)
            setSpaces(spaceList)
          }
        } catch (_e) {
          /* Ignore/toast error */
        }
      }
      fetchData()
    }
  }, [isAuthorized])

  const resetApp = (): void => {
    setSpaces([])
    setCurrentUser({})
    setIsAuthorized(false)
  }

  const addSpaces = (newSpaces: TypesSpace[]) => {
    setSpaces(prevSpaces => [...prevSpaces, ...newSpaces])
  }

  return (
    <AppContext.Provider
      value={{
        spaces,
        setSpaces,
        addSpaces,
        currentUser,
        isUserAuthorized: isAuthorized,
        setIsUserAuthorized: setIsAuthorized,
        resetApp
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
