import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider, RootLayout } from '@harnessio/playground'
import { TooltipProvider } from '@harnessio/canary'
import { queryClient } from './framework/queryClient'
import PipelineListPage from './pages/pipeline-list'
import SignInPage from './pages/signin'
import PullRequestListPage from './pages/pull-request-list-page'
import ExecutionsListPage from './pages/execution-list'
import ReposListPage from './pages/repo/repo-list'
import PullRequestLayout from './layouts/PullRequestLayout'
import PullRequestCommitsPage from './pages/pull-request-commits-page'
import RepoLayout from './layouts/RepoLayout'
import PipelineEditPage from './pages/pipeline-edit/pipeline-edit'
import { LandingPage } from './pages/landing-page'
import { AppProvider } from './framework/context/AppContext'
import { RepoSummary } from './pages/repo/repo-summary'
import CreateProject from './pages/create-project'
import { PipelineCreate } from './pages/pipeline-create/pipeline-create'

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { index: true, element: <LandingPage /> },
        {
          path: ':spaceId/repos',
          element: <ReposListPage />
        },
        {
          path: ':spaceId/repos/:repoId',
          element: <RepoLayout />,
          children: [
            {
              index: true,
              element: <RepoSummary />
            },
            {
              path: 'summary',
              element: <RepoSummary />
            },
            {
              path: 'pull-requests',
              element: <PullRequestListPage />
            },
            {
              path: 'pipelines',
              children: [
                { index: true, element: <PipelineListPage /> },
                { path: ':pipelineId', element: <ExecutionsListPage /> },
                {
                  path: 'create',
                  element: <PipelineCreate />
                }
              ]
            },
            {
              path: 'pull-requests/:pullRequestId',
              element: <PullRequestLayout />,
              children: [
                {
                  index: true,
                  element: <Navigate to="commits" />
                },
                {
                  path: 'commits',
                  element: <PullRequestCommitsPage />
                }
              ]
            }
          ]
        },
        // Pipelines (OUTSIDE REPOS)
        //
        /**
         * 🚨 Root level pipelines will be disabled 🚨
         * Pipelines will only be part of repos for now
         */
        {
          path: 'pipelines',
          element: <PipelineListPage />
        },
        // Executions (OUTSIDE REPOS)
        {
          path: 'executions',
          element: <ExecutionsListPage />
        },
        {
          path: ':spaceId/:repoId',
          element: <RepoLayout />,
          children: [
            {
              index: true,
              element: <>Repos list</>
            },
            {
              path: 'pipelines',
              element: <PipelineListPage />
            },
            {
              path: 'pipelines/:pipelineId/edit',
              element: <PipelineEditPage />
            },
            {
              path: 'pipelines/create',
              element: <PipelineCreate />
            },
            {
              path: 'pipelines/:pipelineId/execution/:executionId',
              element: <div>Execution page</div>
            }
          ]
        },
        {
          path: 'create-project',
          element: <CreateProject />
        }
      ]
    },
    {
      path: '/signin',
      element: <SignInPage />
    }
  ])

  return (
    <AppProvider>
      <ThemeProvider defaultTheme="dark">
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <RouterProvider router={router} />
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </AppProvider>
  )
}
