import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@harnessio/playground'
import { CodeServiceAPIClient } from '@harnessio/code-service-client'
import { queryClient } from './framework/queryClient'
import PipelineList from './pages/pipeline-list'

const BASE_URL_PREFIX = '/api/v1'

export default function App() {
  React.useEffect(() => {
    new CodeServiceAPIClient({
      urlInterceptor: (url: string) => `${BASE_URL_PREFIX}${url}`,
      requestInterceptor: (request: Request): Request => {
        // Retrieve the token from storage and add to headers if available
        const token = localStorage.getItem('token')
        if (token) {
          const newRequest = request.clone()
          newRequest.headers.set('Authorization', `Bearer ${token}`)
          return newRequest
        }
        return request
      }
    })
  }, [])

  const router = createBrowserRouter([
    {
      path: '/',
      element: <PipelineList />
    }
  ])

  return (
    <ThemeProvider defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
