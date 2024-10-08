import React, { createContext, useContext, useState, ReactNode, useEffect, useLayoutEffect } from 'react'
import {
  CodeServiceAPIClient,
  TypesMembershipSpace,
  membershipSpaces,
  TypesSpace,
  TypesUser,
  getUser
} from '@harnessio/code-service-client'
import useToken from '../hooks/useToken'

interface AppContextType {
  spaces: TypesMembershipSpace[]
  setSpaces: (spaces: TypesMembershipSpace[]) => void
  addSpaces: (newSpaces: TypesSpace[]) => void
  currentUser?: TypesUser
}

const BASE_URL_PREFIX = '/api/v1'

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { token } = useToken()
  const [spaces, setSpaces] = useState<TypesMembershipSpace[]>([])
  const [currentUser, setCurrentUser] = useState<TypesUser>()

  useLayoutEffect(() => {
    new CodeServiceAPIClient({
      urlInterceptor: (url: string) => `${BASE_URL_PREFIX}${url}`,
      requestInterceptor: (request: Request): Request => {
        if (token) {
          const newRequest = request.clone()
          newRequest.headers.set('Authorization', `Bearer ${token}`)
          return newRequest
        }
        return request
      },
      responseInterceptor: (response: Response) => {
        switch (response.status) {
          case 401:
            window.location.href = '/logout'
        }
        return response
      }
    })
  }, [])

  useEffect(() => {
    if (token) {
      membershipSpaces({
        queryParams: { page: 1, limit: 10, sort: 'identifier', order: 'asc' }
      }).then(response => {
        setSpaces(response)
      })

      getUser({}).then(_currentUser => {
        setCurrentUser(_currentUser)
      })
    }
  }, [token])

  const addSpaces = (newSpaces: TypesSpace[]) => {
    setSpaces(prevSpaces => [...prevSpaces, ...newSpaces])
  }

  return <AppContext.Provider value={{ spaces, setSpaces, addSpaces, currentUser }}>{children}</AppContext.Provider>
}

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
