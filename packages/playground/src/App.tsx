import React from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { TooltipProvider } from '@harnessio/canary'
import { ThemeProvider } from './components/theme-provider'
import { RootLayout } from './layouts/RootLayout'
import RepoLayout from './layouts/RepoLayout'
import PipelineLayout from './layouts/PipelineLayout'
import PullRequestLayout from './layouts/PullRequestLayout'
import ErrorPage from './pages/error-page'
import LandingPage from './pages/landing-page'
import RepoListPage from './pages/repo-list-page'
import PipelineListPage from './pages/pipeline-list-page'
import RepoSummaryPage from './pages/repo-summary-page'
import ExecutionListPage from './pages/execution-list-page'
import ExecutionDetailsPage from './pages/execution-details-page'
import PullRequestListPage from './pages/pull-request-list-page'
import CommitsListPage from './pages/commits-list-page'
import BranchesListPage from './pages/branches-list-page'
import CommitsDetailsPage from './pages/commits-details-page'
import PullRequestConversationPage from './pages/pull-request-conversation-page'
import PullRequestChangesPage from './pages/pull-request-changes-page'
import PullRequestChecksPage from './pages/pull-request-checks-page'
import PipelineEdit from './pages/pipeline-edit-page'
import PullRequestCommitsPage from './pages/pull-request-commits-page'
import RepoPipelineListPage from './pages/repo-pipeline-list-page'
import RepoExecutionListPage from './pages/repo-execution-list-page'
import RepoWebhooksListPage from './pages/repo-webhooks-page'
import { CreatePipelinePage } from './pages/create-pipeline-page'
import { SandboxRoot } from './layouts/SandboxRoot'
import { SandboxRepo } from './layouts/SandboxRepo'
import { SandboxRepoListPage } from './pages/sandbox-repo-list-page'
import { SandboxRepoSummaryPage } from './pages/sandbox-repo-summary-page'
import { SandboxRepoSinglePage } from './pages/sandbox-repo-single-page'
import { SandboxRepoCodePage } from './pages/sandbox-repo-code-page'
import { SandboxLandingPage } from './pages/sandbox-landing-page'
import { SandboxSettings } from './layouts/SandboxSettings'
import { SandboxSettingsPage } from './pages/sandbox-settings-page'
import { SandboxSettingsAccountPage } from './pages/sandbox-settings-account-page'
import { SandboxSettingsAccountGeneralPage } from './pages/sandbox-settings-account-general-page'
import { SandboxSettingsAccountKeysPage } from './pages/sandbox-settings-account-keys-page'
import { SandboxSettingsProjectPage } from './pages/sandbox-settings-project-page'
import { SandboxSettingsProjectGeneralPage } from './pages/sandbox-settings-project-general-page'
import { SandboxSettingsProjectMembersPage } from './pages/sandbox-settings-project-members-page'

const router = createBrowserRouter([
  // TEMPORARY LAYOUT SANDBOX
  {
    path: '/sandbox',
    element: <SandboxRoot />,
    children: [
      {
        path: 'repos',
        element: <SandboxRepo />, // Contains the breadcrumbs header
        children: [
          {
            index: true,
            element: <SandboxRepoListPage />
          },
          {
            path: ':repoId',
            element: <SandboxRepoSinglePage />, // Contains the nav tabs header AND inherits the breadcrumbs header
            children: [
              {
                path: 'summary',
                element: <SandboxRepoSummaryPage />
              },
              {
                path: 'code',
                element: <SandboxRepoCodePage />
              }
            ]
          }
        ]
      },
      {
        path: 'settings',
        element: <SandboxSettings />,
        children: [
          {
            path: 'account',
            element: <SandboxSettingsAccountPage />,
            children: [
              {
                index: true,
                element: <Navigate to="general" />
              },
              {
                path: 'general',
                element: <SandboxSettingsAccountGeneralPage />
              },
              {
                path: 'keys',
                element: <SandboxSettingsAccountKeysPage />
              }
            ]
          },
          {
            path: 'project',
            element: <SandboxSettingsProjectPage />,
            children: [
              {
                index: true,
                element: <Navigate to="general" />
              },
              {
                path: 'general',
                element: <SandboxSettingsProjectGeneralPage />
              },
              {
                path: 'members',
                element: <SandboxSettingsProjectMembersPage />
              }
            ]
          }
        ]
      },
      {
        path: 'settings',
        index: true,
        element: <SandboxSettingsPage />
      },
      {
        path: 'landing',
        element: <SandboxLandingPage />
      }
    ]
  },
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      // LANDING
      {
        path: '/',
        element: <LandingPage />
      },
      // REPOS
      {
        path: 'repos',
        element: <RepoListPage />
      },
      {
        path: 'repos/:repoId',
        element: <RepoLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="summary" />
          },
          {
            path: 'summary',
            element: <RepoSummaryPage />
          },
          {
            path: 'pipelines',
            element: <RepoPipelineListPage />
          },
          {
            path: 'pipelines/create',
            element: <CreatePipelinePage />
          },
          {
            path: 'pipelines/:pipelineId',
            children: [
              {
                index: true,
                element: <RepoExecutionListPage />
              },
              {
                path: 'edit',
                element: <PipelineEdit />
              },
              {
                path: 'executions',
                element: <RepoExecutionListPage />
              },
              {
                path: 'executions/:executionId',
                element: <ExecutionDetailsPage />
              }
            ]
          },
          {
            path: 'pull-requests',
            element: <PullRequestListPage />
          },
          {
            path: 'pull-requests/:pullRequestId',
            element: <PullRequestLayout />,
            children: [
              {
                index: true,
                element: <Navigate to="conversation" />
              },
              {
                path: 'conversation',
                element: <PullRequestConversationPage />
              },
              {
                path: 'changes',
                element: <PullRequestChangesPage />
              },
              {
                path: 'commits',
                element: <PullRequestCommitsPage />
              },
              {
                path: 'checks',
                element: <PullRequestChecksPage />
              }
            ]
          },
          {
            path: 'branches',
            element: <BranchesListPage />
          },
          {
            path: 'webhooks',
            element: <RepoWebhooksListPage />
          },
          {
            path: 'commits',
            element: <CommitsListPage />
          },
          {
            path: 'commits/:commitId',
            element: <CommitsDetailsPage />
          }
        ]
      },
      // PIPELINES (OUTSIDE REPOS)
      {
        path: 'pipelines',
        element: <PipelineLayout />,
        children: [
          {
            index: true,
            element: <PipelineListPage />
          },
          {
            path: 'create',
            element: <CreatePipelinePage />
          }
        ]
      },
      // EXECUTIONS (OUTSIDE REPOS)
      {
        path: 'executions',
        element: <ExecutionListPage />
      }
    ]
  }
])

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </ThemeProvider>
  )
}
