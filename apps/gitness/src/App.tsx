import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { NuqsAdapter } from 'nuqs/adapters/react-router'
import { CodeServiceAPIClient } from '@harnessio/code-service-client'
import { QueryClientProvider } from '@tanstack/react-query'
import {
  ThemeProvider,
  SandboxSettings,
  SettingsAccountPage,
  SettingsProjectNav,
  ForgotPasswordPage,
  NewPasswordPage,
  OTPPage,
  RepoSettingsPage,
  RepoSettingsPlaceholderPage
} from '@harnessio/views'
import RootWrapper from './components/RootWrapper'
import { TooltipProvider } from '@harnessio/canary'
import { queryClient } from './framework/queryClient'
import RepoPipelinesPage from './pages/pipeline/repo-pipeline-list'
import ProjectPipelinesPage from './pages/pipeline/project-pipeline-list'
import { SignIn } from './pages/signin'
import { SignUp } from './pages/signup'
import PullRequestListPage from './pages/pull-request/pull-request-list-page'
import RepoExecutionListPage from './pages/execution/repo-execution-list'
import PullRequestLayout from './layouts/PullRequestLayout'
import PullRequestCommitsPage from './pages/pull-request-commits-page'
import PipelineEditPage from './pages/pipeline-edit/pipeline-edit'
import { LandingPage } from './pages/landing-page'
import { AppProvider } from './framework/context/AppContext'
import { RepoSummaryList } from './pages/repo/repo-summary'
import CreateProject from './pages/create-project'
import { CreateRepo } from './pages/repo/repo-create-page'
import RepoCommitsPage from './pages/repo/repo-commits'
import { Execution } from './pages/execution/execution-details'
import RepoWebhooksListPage from './pages/webhooks/repo-webhook-list'
import { RepoBranchesListPage } from './pages/repo/repo-branch-list'
import PullRequestDataProvider from './pages/pull-request/context/pull-request-data-provider'
import PullRequestConversationPage from './pages/pull-request/pull-request-conversation-page'
import { RepoFiles } from './pages/repo/repo-files'
import { RepoHeader } from './pages/repo/repo-header'
import ReposListPage from './pages/repo/repo-list'
import RepoLayout from './layouts/RepoLayout'
import { SettingsProfileGeneralPage } from './pages/profile-settings/profile-settings-general-container'
import { SettingsProfileKeysPage } from './pages/profile-settings/profile-settings-keys-container'
import { FileViewer } from './components/FileViewer'
import PullRequestChangesPage from './pages/pull-request/pull-request-changes-page'
import { ProjectSettingsGeneralPage } from './pages/project-settings/project-settings-general-page'
import { FileEditor } from './components/FileEditor'
import { RepoSettingsGeneralPageContainer } from './pages/repo/repo-settings-general-container'
import { CreatePullRequest } from './pages/pull-request/pull-request-compare-page'
import { ExitConfirmProvider } from './framework/context/ExitConfirmContext'
import { ProjectSettingsMemebersPage } from './pages/project-settings/project-settings-members-page'
import { EmptyPage } from './pages/empty-page'
import { CreateWebhookContainer } from './pages/webhooks/create-webhook-container'
import { RepoBranchSettingsRulesPageContainer } from './pages/repo/repo-branch-rules-container'
import { ExplorerPathsProvider } from './framework/context/ExplorerPathsContext'
import { Logout } from './pages/logout'
import { UserManagementPageContainer } from './pages/user-management/user-management-container'
import PipelineLayout from './layouts/PipelineStudioLayout'
import { CreateNewUserContainer } from './pages/user-management/create-new-user-container'
import { CreateNewMemberPage } from './pages/project-settings/project-settings-new-member-page'
import { PipelineCreate } from './pages/pipeline-create/pipeline-create'
import { RepoImportContainer } from './pages/repo/repo-import-container'

const BASE_URL_PREFIX = `${window.apiUrl || ''}/api/v1`

export default function App() {
  new CodeServiceAPIClient({
    urlInterceptor: (url: string) => `${BASE_URL_PREFIX}${url}`,
    responseInterceptor: (response: Response) => {
      switch (response.status) {
        case 401:
          window.location.href = '/signin'
          break
      }
      return response
    }
  })

  const router = createBrowserRouter([
    {
      path: '/signin',
      element: <SignIn />
    },
    {
      path: '/signup',
      element: <SignUp />
    },
    {
      path: '/forgot',
      element: <ForgotPasswordPage />
    },
    {
      path: '/otp',
      element: <OTPPage />
    },
    {
      path: '/new-password',
      element: <NewPasswordPage />
    },
    {
      path: '/',
      element: <RootWrapper />,
      children: [
        {
          index: true,
          element: <LandingPage />
        },
        {
          path: 'spaces/:spaceId/repos/:repoId/pipelines',
          element: <PipelineLayout />,
          children: [
            {
              path: 'create',
              element: <PipelineCreate />
            },
            {
              path: ':pipelineId',
              children: [
                { index: true, element: <RepoExecutionListPage /> },
                {
                  path: 'edit',
                  element: <PipelineEditPage />
                },
                { path: 'executions/:executionId', element: <Execution /> }
              ]
            }
          ]
        },
        {
          path: 'spaces',
          element: <RepoHeader />,
          children: [
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
                  element: <Navigate to="summary" replace />
                },
                {
                  path: 'summary',
                  element: <RepoSummaryList />
                },
                {
                  path: 'code',
                  element: (
                    <ExplorerPathsProvider>
                      <RepoFiles />
                    </ExplorerPathsProvider>
                  ),
                  children: [
                    {
                      index: true,
                      element: <FileViewer />
                    },
                    {
                      path: 'edit/:gitRef/~/:resourcePath*',
                      element: <FileEditor />
                    },
                    {
                      path: 'new/:gitRef/~/*',
                      element: <FileEditor />,
                      children: [
                        {
                          path: ':resourcePath*',
                          element: <FileViewer />
                        }
                      ]
                    },
                    {
                      path: ':gitRef',
                      element: <FileViewer />,
                      children: [
                        {
                          index: true,
                          element: <FileViewer />
                        },
                        {
                          path: '~/:resourcePath*',
                          element: <FileViewer />
                        }
                      ]
                    }
                  ]
                },
                {
                  path: 'pipelines',
                  children: [
                    {
                      index: true,
                      element: <RepoPipelinesPage />
                    }
                  ]
                },
                {
                  path: 'commits',
                  element: <RepoCommitsPage />
                },
                {
                  path: 'pull-requests',
                  children: [
                    { index: true, element: <PullRequestListPage /> },
                    {
                      path: 'compare/:diffRefs*?',
                      element: <CreatePullRequest />
                    }
                  ]
                },
                {
                  path: 'pull-requests/:pullRequestId',
                  element: <PullRequestLayout />,
                  children: [
                    {
                      index: true,
                      element: <Navigate to="conversation" replace />
                    },
                    {
                      path: 'conversation',
                      element: (
                        <PullRequestDataProvider>
                          <PullRequestConversationPage />
                        </PullRequestDataProvider>
                      )
                    },
                    {
                      path: 'commits',
                      element: <PullRequestCommitsPage />
                    },
                    {
                      path: 'changes',
                      element: (
                        <PullRequestDataProvider>
                          <PullRequestChangesPage />
                        </PullRequestDataProvider>
                      )
                    },
                    {
                      path: 'checks',
                      element: <>Checks</>
                    }
                  ]
                },

                {
                  path: 'webhooks',
                  element: <RepoWebhooksListPage />
                },
                {
                  path: 'webhooks/create',
                  element: <CreateWebhookContainer />,
                  children: [
                    {
                      path: ':webhookId',
                      element: <CreateWebhookContainer />
                    }
                  ]
                },
                {
                  path: 'branches',
                  element: <RepoBranchesListPage />
                },
                {
                  path: 'settings',
                  element: <RepoSettingsPage />,
                  children: [
                    {
                      index: true,
                      element: <Navigate to="general" replace />
                    },
                    {
                      path: 'general',
                      element: <RepoSettingsGeneralPageContainer />
                    },
                    {
                      path: 'rules',
                      element: <RepoSettingsGeneralPageContainer />
                    },
                    {
                      path: 'rules/create',
                      element: <RepoBranchSettingsRulesPageContainer />,
                      children: [
                        {
                          path: ':identifier',
                          element: <RepoBranchSettingsRulesPageContainer />
                        }
                      ]
                    },
                    {
                      path: '*',
                      element: <RepoSettingsPlaceholderPage />
                    }
                  ]
                }
              ]
            },
            // Pipelines (OUTSIDE REPOS)
            {
              path: ':spaceId/pipelines',
              children: [
                {
                  index: true,
                  element: <ProjectPipelinesPage />
                },
                {
                  path: 'create',
                  element: <PipelineCreate />
                },
                {
                  path: ':pipelineId',
                  element: <RepoExecutionListPage />
                }
              ]
            },
            // Executions (OUTSIDE REPOS)
            {
              path: ':spaceId/executions',
              element: <RepoExecutionListPage />
            },
            {
              path: 'create',
              element: <CreateProject />
            },
            {
              path: ':spaceId/settings',
              element: <RootWrapper />,
              children: [
                {
                  element: <SettingsProjectNav />,
                  children: [
                    {
                      index: true,
                      element: <Navigate to="general" replace />
                    },
                    {
                      path: 'general',
                      element: <ProjectSettingsGeneralPage />
                    },
                    {
                      path: 'members',
                      children: [
                        { index: true, element: <ProjectSettingsMemebersPage /> },
                        {
                          path: 'create',
                          element: <CreateNewMemberPage />
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              path: ':spaceId/repos/create',
              element: <CreateRepo />
            },
            {
              path: ':spaceId/repos/import',
              element: <RepoImportContainer />
            }
          ]
        },
        {
          path: 'settings',
          element: <SandboxSettings />,
          children: [
            {
              element: <SettingsAccountPage />,
              children: [
                {
                  index: true,
                  element: <Navigate to="general" replace />
                },
                {
                  path: 'general',
                  element: <SettingsProfileGeneralPage />
                },
                {
                  path: 'keys',
                  element: <SettingsProfileKeysPage />
                }
              ]
            }
          ]
        },
        {
          path: 'users',
          element: <UserManagementPageContainer />
        },
        {
          path: 'users/create',
          element: <CreateNewUserContainer />
        }
      ]
    },
    {
      path: 'logout',
      element: <Logout />
    },
    {
      path: 'chaos-engineering',
      element: <EmptyPage pathName="Chaos Engineering" />
    },
    {
      path: 'environments',
      element: <EmptyPage pathName="Environments" />
    },
    {
      path: 'secrets',
      element: <EmptyPage pathName="Secrets" />
    },
    {
      path: 'connectors',
      element: <EmptyPage pathName="Connectors" />
    },
    {
      path: 'continuous-delivery-gitops',
      element: <EmptyPage pathName="Continuous Delivery Gitops" />
    },
    {
      path: 'continuous-integration',
      element: <EmptyPage pathName="Continuous Integration" />
    },
    {
      path: 'feature-flags',
      element: <EmptyPage pathName="Feature Flags" />
    },
    {
      path: 'infrastructure-as-code',
      element: <EmptyPage pathName="Infrastructure as Code" />
    },
    {
      path: 'service-reliability',
      element: <EmptyPage pathName="Service Reliability" />
    },
    {
      path: 'internal-developer-portal',
      element: <EmptyPage pathName="Internal Developer Portal" />
    },
    {
      path: 'infrastructure-as-code',
      element: <EmptyPage pathName="Infrastructure as Code" />
    },
    {
      path: 'code-repository',
      element: <EmptyPage pathName="Code Repository" />
    },
    {
      path: 'software-engineering-insights',
      element: <EmptyPage pathName="Software Engineering Insights" />
    },
    {
      path: 'software-supply-chain-assurance',
      element: <EmptyPage pathName="Software Supply Chain Assurance" />
    },
    {
      path: 'security-testing-orchestration',
      element: <EmptyPage pathName="Security Testing Orchestration" />
    },
    {
      path: 'cloud-cost-management',
      element: <EmptyPage pathName="Cloud Cost Management" />
    }
  ])

  return (
    <AppProvider>
      <ThemeProvider defaultTheme="dark">
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <ExitConfirmProvider>
              <NuqsAdapter>
                <RouterProvider router={router} />
              </NuqsAdapter>
            </ExitConfirmProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </AppProvider>
  )
}
