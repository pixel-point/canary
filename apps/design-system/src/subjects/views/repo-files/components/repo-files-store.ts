import { PathParts } from '@harnessio/ui/components'
import { BranchData, IBranchSelectorStore, LatestFileTypes, RepoFile } from '@harnessio/ui/views'
import { BlameItem } from '@harnessio/yaml-editor/dist/types/blame'

export interface RepoRepositoryOutput {
  created?: number
  created_by?: number
  default_branch?: string
  deleted?: number | null
  description?: string
  fork_id?: number
  git_ssh_url?: string
  git_url?: string
  id?: number
  identifier?: string
  importing?: boolean
  is_empty?: boolean
  is_public?: boolean
  num_closed_pulls?: number
  num_forks?: number
  num_merged_pulls?: number
  num_open_pulls?: number
  num_pulls?: number
  parent_id?: number
  path?: string
  size?: number
  size_updated?: number
  state?: unknown
  updated?: number
}

export interface OpenapiContentInfo {
  latest_commit?: unknown
  name?: string
  path?: string
  sha?: string
  type?: 'dir' | 'file'
}

export interface RepoFilesStoreType {
  loading: boolean
  branchSelectorStore: Pick<IBranchSelectorStore, 'selectedBranchTag' | 'tagList' | 'spaceId' | 'repoId'> & {
    branchList: Pick<BranchData, 'name' | 'sha' | 'default'>[]
  }
  filesList: string[]
  filesTreeData: OpenapiContentInfo[]
  files: RepoFile[]
  latestCommitInfo: LatestFileTypes
  repository: RepoRepositoryOutput
  jsonFileContent: string
  blameJsonFileContent: BlameItem[]
  markdownFileContent: string
  pathParts: PathParts[]
}

export const repoFilesStore: RepoFilesStoreType = {
  loading: false,
  branchSelectorStore: {
    selectedBranchTag: {
      name: 'test',
      sha: '1d0e5a9461b340ebb3d7e092a2d35ff6d0d5c952',
      default: true
    },
    branchList: [
      {
        name: 'toolings',
        sha: '79fd25b6a85d7efdd06e4cb24002e8bc76095a08',
        default: false
      },
      {
        name: 'docs',
        sha: '19d3baa2d931e4f5336bd3a3c952f3023b225d48',
        default: false
      },
      {
        name: 'PIPE-20464',
        sha: '92fc94c24dab2418372b610477c6013d4f2d31d3',
        default: false
      },
      {
        name: 'fix-commonjs--resolver',
        sha: 'd80110725857c3ac3af3c1f235a4c30eb0ccbc06',
        default: false
      },
      {
        name: 'pipeline-studio',
        sha: 'de9a6a7dd42f27c800c528db999542b8267a9db8',
        default: false
      },
      {
        name: 'stories-for-pipeline-studio',
        sha: '49c676c40848fac2dd2aa3f91ea5b0ac55854072',
        default: false
      },
      {
        name: 'add-readonly-mode',
        sha: '4b5b1fdec93dc2b1894476a9841bc92daa7db91b',
        default: false
      },
      {
        name: 'adding-storybook-control',
        sha: '3e9d5ff0fc7dbf4087064dec6ca0c0aed235899c',
        default: false
      },
      {
        name: 'fix-node-styling',
        sha: 'a38b0f0215889c7a3ad6d8c7c257bdf655944ee2',
        default: false
      },
      {
        name: 'build-storybook',
        sha: '0ccc0a5b17283ec6d3e35ee535fb02baf63f40d3',
        default: false
      },
      {
        name: 'add-node',
        sha: '96819a597c50ed8cae080b90c4efb1c58a133f99',
        default: false
      },
      {
        name: 'apps/storybook',
        sha: 'ac71f2b2389c2257733d6b18489a6888dd6b982f',
        default: false
      },
      {
        name: 'jsx-react',
        sha: '15d9ba04d60a97acfafbfe2c34971a8f33005d03',
        default: false
      },
      {
        name: 'revert-20-jsx-react',
        sha: '1f89f00c1e6fd4da41d0f5c72302dce3d43fe29c',
        default: false
      },
      {
        name: 'fix-pipeline-studio-storybook',
        sha: '5bb84dcab0765389ac99cdba31ed539bd2ef90bf',
        default: false
      },
      {
        name: 'componentized',
        sha: 'c427775c252c026380e09198b3c06b097647d568',
        default: false
      },
      {
        name: 'yaml-parser',
        sha: 'f64a371190bd7098df8f1aee92042b9b65858567',
        default: false
      },
      {
        name: 'cleanup-yaml-parser',
        sha: '017f53d1a31e4f2e00a54875250d61d56e427c91',
        default: false
      },
      {
        name: 'add-node-1',
        sha: '7c9bb09c93b27233d969fdd98a8711fa7cf3c428',
        default: false
      },
      {
        name: 'parsing-sequential-groups',
        sha: 'ee58482e188a5d2043ed62de288be29ae0188aac',
        default: false
      }
    ],
    tagList: [],
    spaceId: 'canary',
    repoId: 'canary'
  },
  filesList: [
    '.dockerignore',
    '.eslintignore',
    '.eslintrc.json',
    '.github/workflows/build-and-deploy-storybook.yml',
    '.gitignore',
    '.husky/pre-commit',
    '.prettierignore',
    '.prettierrc.yml',
    '.vscode/settings.json',
    'CODEOWNERS',
    'CONTRIBUTOR_LICENSE_AGREEMENT.md',
    'Dockerfile',
    'LICENSE',
    'README.md',
    'apps/gitness/.gitignore',
    'apps/gitness/.prettierignore',
    'apps/gitness/README.md',
    'apps/gitness/config/manifest.yaml',
    'apps/gitness/i18n.config.ts',
    'apps/gitness/index.html',
    'apps/gitness/package.json',
    'apps/gitness/public/fonts/InterVariable.ttf',
    'apps/gitness/public/harness-favicon.ico',
    'apps/gitness/public/harness-favicon.png',
    'apps/gitness/src/App.tsx',
    'apps/gitness/src/RouteDefinitions.ts',
    'apps/gitness/src/components/ExitConfirmDialog.tsx',
    'apps/gitness/src/components/FileContentViewer.tsx',
    'apps/gitness/src/components/FileEditor.tsx',
    'apps/gitness/src/components/FileExplorer.tsx',
    'apps/gitness/src/components/FileViewer.tsx',
    'apps/gitness/src/components/GitBlame.tsx',
    'apps/gitness/src/components/GitCommitDialog.tsx',
    'apps/gitness/src/components/GitCommitForm.tsx',
    'apps/gitness/src/components/RootLayoutWrapper.tsx',
    'apps/gitness/src/components/RootWrapper.tsx',
    'apps/gitness/src/components/breadcrumbs/breadcrumb-dropdown.tsx',
    'apps/gitness/src/components/breadcrumbs/breadcrumbs-utils.ts',
    'apps/gitness/src/components/breadcrumbs/breadcrumbs.tsx',
    'apps/gitness/src/framework/context/AppContext.tsx',
    'apps/gitness/src/framework/context/ExitConfirmContext.tsx',
    'apps/gitness/src/framework/context/ExplorerPathsContext.tsx',
    'apps/gitness/src/framework/context/ThemeContext.tsx',
    'apps/gitness/src/framework/hooks/useDownloadRawFile.ts',
    'apps/gitness/src/framework/hooks/useExitConfirm.ts',
    'apps/gitness/src/framework/hooks/useExitPrompt.ts',
    'apps/gitness/src/framework/hooks/useGetRepoId.ts',
    'apps/gitness/src/framework/hooks/useGetRepoPath.ts',
    'apps/gitness/src/framework/hooks/useGetSpaceParam.ts',
    'apps/gitness/src/framework/hooks/useLocalStorage.ts',
    'apps/gitness/src/framework/hooks/useLogs.ts',
    'apps/gitness/src/framework/hooks/usePagination.ts',
    'apps/gitness/src/framework/hooks/useRuleViolationCheck.ts',
    'apps/gitness/src/framework/hooks/useSpaceSSE.tsx',
    'apps/gitness/src/framework/hooks/useToken.ts',
    'apps/gitness/src/framework/queryClient.ts',
    'apps/gitness/src/global.d.ts',
    'apps/gitness/src/hooks/useDebouncedQueryState.ts',
    'apps/gitness/src/hooks/useGetPullRequestTab.ts',
    'apps/gitness/src/hooks/useThunkReducer.tsx',
    'apps/gitness/src/i18n/i18n.ts',
    'apps/gitness/src/i18n/stores/i18n-store.ts',
    'apps/gitness/src/layouts/PipelineStudioLayout.tsx',
    'apps/gitness/src/layouts/PullRequestLayout.tsx',
    'apps/gitness/src/layouts/RepoLayout.tsx',
    'apps/gitness/src/layouts/RepoSandboxLayout.tsx',
    'apps/gitness/src/main.tsx',
    'apps/gitness/src/pages-v2/pull-request/pull-request-list.tsx',
    'apps/gitness/src/pages-v2/pull-request/stores/pull-request-store.tsx',
    'apps/gitness/src/pages-v2/repo/repo-code.tsx',
    'apps/gitness/src/pages-v2/repo/repo-layout.tsx',
    'apps/gitness/src/pages-v2/repo/repo-list.tsx',
    'apps/gitness/src/pages-v2/repo/repo-sidebar.tsx',
    'apps/gitness/src/pages-v2/repo/repo-summary.tsx',
    'apps/gitness/src/pages-v2/repo/stores/repo-store.tsx',
    'apps/gitness/src/pages-v2/webhooks/stores/webhook-store.tsx',
    'apps/gitness/src/pages-v2/webhooks/webhook-list.tsx',
    'apps/gitness/src/pages/README.md',
    'apps/gitness/src/pages/create-project.tsx',
    'apps/gitness/src/pages/execution/execution-details-header-actions.tsx',
    'apps/gitness/src/pages/execution/execution-details.tsx',
    'apps/gitness/src/pages/execution/repo-execution-list.tsx',
    'apps/gitness/src/pages/landing-page.tsx',
    'apps/gitness/src/pages/logout.tsx',
    'apps/gitness/src/pages/pipeline-create/PipelineCreateDialog/PipelineCreateDialog.tsx',
    'apps/gitness/src/pages/pipeline-create/PipelineCreateDialog/PipelineCreateForm.tsx',
    'apps/gitness/src/pages/pipeline-create/pipeline-create.tsx',
    'apps/gitness/src/pages/pipeline-edit/components/pipeline-studio-graph-view.tsx',
    'apps/gitness/src/pages/pipeline-edit/components/pipeline-studio-header-actions.tsx',
    'apps/gitness/src/pages/pipeline-edit/components/pipeline-studio-header.tsx',
    'apps/gitness/src/pages/pipeline-edit/components/pipeline-studio-panel.tsx',
    'apps/gitness/src/pages/pipeline-edit/components/pipeline-studio-problems-panel.tsx',
    'apps/gitness/src/pages/pipeline-edit/components/pipeline-studio-step-form.tsx',
    'apps/gitness/src/pages/pipeline-edit/components/pipeline-studio-step-palette.tsx',
    'apps/gitness/src/pages/pipeline-edit/components/pipeline-studio-toolbar.tsx',
    'apps/gitness/src/pages/pipeline-edit/components/pipeline-studio-yaml-view.tsx',
    'apps/gitness/src/pages/pipeline-edit/components/pipeline-studio.tsx',
    'apps/gitness/src/pages/pipeline-edit/context/InteractionContextProvider.tsx',
    'apps/gitness/src/pages/pipeline-edit/context/PipelineStudioDataProvider.tsx',
    'apps/gitness/src/pages/pipeline-edit/context/PipelineStudioViewProvider.tsx',
    'apps/gitness/src/pages/pipeline-edit/context/data-store/actions.ts',
    'apps/gitness/src/pages/pipeline-edit/context/data-store/reducer.ts',
    'apps/gitness/src/pages/pipeline-edit/context/data-store/types.ts',
    'apps/gitness/src/pages/pipeline-edit/pipeline-edit.tsx',
    'apps/gitness/src/pages/pipeline-edit/schema/unifiedSchema.json',
    'apps/gitness/src/pages/pipeline-edit/theme/monaco-theme.ts',
    'apps/gitness/src/pages/pipeline-edit/types/api-types.ts',
    'apps/gitness/src/pages/pipeline-edit/types/types.ts',
    'apps/gitness/src/pages/pipeline-edit/utils/__tests__/yaml-mocks/pipeline1.ts',
    'apps/gitness/src/pages/pipeline-edit/utils/__tests__/yaml-mocks/pipeline2.ts',
    'apps/gitness/src/pages/pipeline-edit/utils/__tests__/yaml-mocks/pipeline3.ts',
    'apps/gitness/src/pages/pipeline-edit/utils/__tests__/yaml-mocks/pipeline4.ts',
    'apps/gitness/src/pages/pipeline-edit/utils/__tests__/yaml-mocks/pipeline5.ts',
    'apps/gitness/src/pages/pipeline-edit/utils/__tests__/yaml-utils.test.ts',
    'apps/gitness/src/pages/pipeline-edit/utils/common-utils.ts',
    'apps/gitness/src/pages/pipeline-edit/utils/inline-actions.ts',
    'apps/gitness/src/pages/pipeline-edit/utils/pipelines.ts',
    'apps/gitness/src/pages/pipeline-edit/utils/problems-utils.tsx',
    'apps/gitness/src/pages/pipeline-edit/utils/step-form-utils.ts',
    'apps/gitness/src/pages/pipeline-edit/utils/time-utils.ts',
    'apps/gitness/src/pages/pipeline-edit/utils/yaml-doc-utils.ts',
    'apps/gitness/src/pages/pipeline-edit/utils/yaml-utils.ts',
    'apps/gitness/src/pages/pipeline/project-pipeline-list.tsx',
    'apps/gitness/src/pages/pipeline/repo-pipeline-list.tsx',
    'apps/gitness/src/pages/profile-settings/profile-settings-general-container.tsx',
    'apps/gitness/src/pages/profile-settings/profile-settings-general-page.tsx',
    'apps/gitness/src/pages/profile-settings/profile-settings-keys-container.tsx',
    'apps/gitness/src/pages/profile-settings/profile-settings-keys-page.tsx',
    'apps/gitness/src/pages/profile-settings/profile-settings-theme-page.tsx',
    'apps/gitness/src/pages/profile-settings/ssh-key-create/ssh-key-create-dialog.tsx',
    'apps/gitness/src/pages/profile-settings/ssh-key-create/ssh-key-create-form.tsx',
    'apps/gitness/src/pages/profile-settings/token-create/token-create-dialog.tsx',
    'apps/gitness/src/pages/profile-settings/token-create/token-create-form.tsx',
    'apps/gitness/src/pages/profile-settings/token-create/token-success-dialog.tsx',
    'apps/gitness/src/pages/profile-settings/token-create/token-success-form.tsx',
    'apps/gitness/src/pages/profile-settings/types.ts',
    'apps/gitness/src/pages/project-settings/components/form-dialog-project-delete.tsx',
    'apps/gitness/src/pages/project-settings/project-settings-general-page.tsx',
    'apps/gitness/src/pages/project-settings/project-settings-members-page.tsx',
    'apps/gitness/src/pages/project-settings/project-settings-new-member-page.tsx',
    'apps/gitness/src/pages/project-settings/project-settings-page.tsx',
    'apps/gitness/src/pages/project-settings/types.ts',
    'apps/gitness/src/pages/pull-request-commits-page.tsx',
    'apps/gitness/src/pages/pull-request/context/pull-request-data-provider.tsx',
    'apps/gitness/src/pages/pull-request/diff-utils.ts',
    'apps/gitness/src/pages/pull-request/hooks/useActivityFilters.ts',
    'apps/gitness/src/pages/pull-request/hooks/useDataFilters.ts',
    'apps/gitness/src/pages/pull-request/hooks/usePRChecksDecision.ts',
    'apps/gitness/src/pages/pull-request/pull-request-changes-filter.tsx',
    'apps/gitness/src/pages/pull-request/pull-request-changes-page.tsx',
    'apps/gitness/src/pages/pull-request/pull-request-compare-page.tsx',
    'apps/gitness/src/pages/pull-request/pull-request-conversation-page.tsx',
    'apps/gitness/src/pages/pull-request/pull-request-list-page.tsx',
    'apps/gitness/src/pages/pull-request/stores/pull-request-store.tsx',
    'apps/gitness/src/pages/pull-request/types/types.ts',
    'apps/gitness/src/pages/pull-request/utils.ts',
    'apps/gitness/src/pages/repo/repo-branch-create.tsx',
    'apps/gitness/src/pages/repo/repo-branch-list.tsx',
    'apps/gitness/src/pages/repo/repo-branch-rules-container.tsx',
    'apps/gitness/src/pages/repo/repo-commits.tsx',
    'apps/gitness/src/pages/repo/repo-create-page.tsx',
    'apps/gitness/src/pages/repo/repo-files.tsx',
    'apps/gitness/src/pages/repo/repo-header.tsx',
    'apps/gitness/src/pages/repo/repo-import-container.tsx',
    'apps/gitness/src/pages/repo/repo-list.tsx',
    'apps/gitness/src/pages/repo/repo-settings-general-container.tsx',
    'apps/gitness/src/pages/repo/repo-summary.tsx',
    'apps/gitness/src/pages/run-pipeline-dialog/run-pipeline-dialog.tsx',
    'apps/gitness/src/pages/run-pipeline-dialog/run-pipeline-form.tsx',
    'apps/gitness/src/pages/run-pipeline-dialog/utils/utils.ts',
    'apps/gitness/src/pages/signin.tsx',
    'apps/gitness/src/pages/signup.tsx',
    'apps/gitness/src/pages/user-management/create-new-user-container.tsx',
    'apps/gitness/src/pages/user-management/user-management-container.tsx',
    'apps/gitness/src/pages/webhooks/create-webhook-container.tsx',
    'apps/gitness/src/pages/webhooks/repo-webhook-list.tsx',
    'apps/gitness/src/styles.css',
    'apps/gitness/src/types.ts',
    'apps/gitness/src/types/pipeline-schema.ts',
    'apps/gitness/src/types/pipeline.ts',
    'apps/gitness/src/utils/common-utils.ts',
    'apps/gitness/src/utils/error-utils.ts',
    'apps/gitness/src/utils/execution-utils.tsx',
    'apps/gitness/src/utils/git-utils.ts',
    'apps/gitness/src/utils/path-utils.ts',
    'apps/gitness/src/utils/repo-branch-rules-utils.ts',
    'apps/gitness/src/vite-env.d.ts',
    'apps/gitness/tailwind.config.js',
    'apps/gitness/tsconfig.json',
    'apps/gitness/vite.config.ts',
    'apps/gitness/vitest.config.ts',
    'charts/opensource-ui/.helmignore',
    'charts/opensource-ui/Chart.lock',
    'charts/opensource-ui/Chart.yaml',
    'charts/opensource-ui/charts/harness-common-1.3.61.tgz',
    'charts/opensource-ui/templates/NOTES.txt',
    'charts/opensource-ui/templates/_helpers.tpl',
    'charts/opensource-ui/templates/config.yaml',
    'charts/opensource-ui/templates/deployment.yaml',
    'charts/opensource-ui/templates/hpa.yaml',
    'charts/opensource-ui/templates/ingress.yaml',
    'charts/opensource-ui/templates/service.yaml',
    'charts/opensource-ui/templates/serviceaccount.yaml',
    'charts/opensource-ui/values.yaml',
    'package.json',
    'packages/canary/README.md',
    'packages/canary/components.json',
    'packages/canary/package.json',
    'packages/canary/postcss.config.js',
    'packages/canary/src/components/accordion.tsx',
    'packages/canary/src/components/ai-prompt.tsx',
    'packages/canary/src/components/alert-dialog.tsx',
    'packages/canary/src/components/aspect-ratio.tsx',
    'packages/canary/src/components/avatar.tsx',
    'packages/canary/src/components/badge.tsx',
    'packages/canary/src/components/breadcrumb.tsx',
    'packages/canary/src/components/button-group.tsx',
    'packages/canary/src/components/button.tsx',
    'packages/canary/src/components/calendar.tsx',
    'packages/canary/src/components/card.tsx',
    'packages/canary/src/components/carousel.tsx',
    'packages/canary/src/components/checkbox.tsx',
    'packages/canary/src/components/collapsible.tsx',
    'packages/canary/src/components/command.tsx',
    'packages/canary/src/components/context-menu.tsx',
    'packages/canary/src/components/dialog.tsx',
    'packages/canary/src/components/dock.tsx',
    'packages/canary/src/components/drawer.tsx',
    'packages/canary/src/components/dropdown-menu.tsx',
    'packages/canary/src/components/effects/spotlights-bg.tsx',
    'packages/canary/src/components/effects/spotlights-box.tsx',
    'packages/canary/src/components/form.tsx',
    'packages/canary/src/components/heading.tsx',
    'packages/canary/src/components/hover-card.tsx',
    'packages/canary/src/components/icon.tsx',
    'packages/canary/src/components/input-otp.tsx',
    'packages/canary/src/components/input.tsx',
    'packages/canary/src/components/label.tsx',
    'packages/canary/src/components/list-actions.tsx',
    'packages/canary/src/components/list-pagination.tsx',
    'packages/canary/src/components/menubar.tsx',
    'packages/canary/src/components/meter.tsx',
    'packages/canary/src/components/navbar-project-chooser.tsx',
    'packages/canary/src/components/navbar-user.tsx',
    'packages/canary/src/components/navbar.tsx',
    'packages/canary/src/components/navigation-menu.tsx',
    'packages/canary/src/components/node-group.tsx',
    'packages/canary/src/components/pagination.tsx',
    'packages/canary/src/components/popover.tsx',
    'packages/canary/src/components/progress.tsx',
    'packages/canary/src/components/radio-group.tsx',
    'packages/canary/src/components/resizable.tsx',
    'packages/canary/src/components/resource-box.tsx',
    'packages/canary/src/components/scroll-area.tsx',
    'packages/canary/src/components/search-box.tsx',
    'packages/canary/src/components/section.tsx',
    'packages/canary/src/components/select.tsx',
    'packages/canary/src/components/separator.tsx',
    'packages/canary/src/components/sheet.tsx',
    'packages/canary/src/components/skeleton.tsx',
    'packages/canary/src/components/slider.tsx',
    'packages/canary/src/components/sonner.tsx',
    'packages/canary/src/components/spacer.tsx',
    'packages/canary/src/components/split-button.tsx',
    'packages/canary/src/components/stacked-list.tsx',
    'packages/canary/src/components/switch.tsx',
    'packages/canary/src/components/table.tsx',
    'packages/canary/src/components/tabs.tsx',
    'packages/canary/src/components/text.tsx',
    'packages/canary/src/components/toast.tsx',
    'packages/canary/src/components/toaster.tsx',
    'packages/canary/src/components/toggle-group.tsx',
    'packages/canary/src/components/toggle.tsx',
    'packages/canary/src/components/tooltip.tsx',
    'packages/canary/src/components/top-bar.tsx',
    'packages/canary/src/components/treeview.tsx',
    'packages/canary/src/components/use-toast.ts',
    'packages/canary/src/hooks/useZodForm.tsx',
    'packages/canary/src/icons/account.svg',
    'packages/canary/src/icons/add-file.svg',
    'packages/canary/src/icons/add-folder.svg',
    'packages/canary/src/icons/ai-sparks.svg',
    'packages/canary/src/icons/apple-shortcut.svg',
    'packages/canary/src/icons/archive.svg',
    'packages/canary/src/icons/arrow-long.svg',
    'packages/canary/src/icons/bitrise-plugin.svg',
    'packages/canary/src/icons/bookmark.svg',
    'packages/canary/src/icons/box-cloning.svg',
    'packages/canary/src/icons/box-guide.svg',
    'packages/canary/src/icons/box-lightning.svg',
    'packages/canary/src/icons/box-pull-requests.svg',
    'packages/canary/src/icons/branch.svg',
    'packages/canary/src/icons/cancel-grey.svg',
    'packages/canary/src/icons/chain.svg',
    'packages/canary/src/icons/changes.svg',
    'packages/canary/src/icons/chaos-engineering-icon.svg',
    'packages/canary/src/icons/checks.svg',
    'packages/canary/src/icons/chevron-down.svg',
    'packages/canary/src/icons/chevron-right.svg',
    'packages/canary/src/icons/chevron-up.svg',
    'packages/canary/src/icons/circle-arrow-top-right.svg',
    'packages/canary/src/icons/circle.svg',
    'packages/canary/src/icons/clock.svg',
    'packages/canary/src/icons/clone.svg',
    'packages/canary/src/icons/cloud-mining.svg',
    'packages/canary/src/icons/cog-6.svg',
    'packages/canary/src/icons/comments.svg',
    'packages/canary/src/icons/computer.svg',
    'packages/canary/src/icons/connectors-icon.svg',
    'packages/canary/src/icons/create-workspace.svg',
    'packages/canary/src/icons/download.svg',
    'packages/canary/src/icons/edit.svg',
    'packages/canary/src/icons/environment-icon.svg',
    'packages/canary/src/icons/fail.svg',
    'packages/canary/src/icons/featured-flags-icon.svg',
    'packages/canary/src/icons/file.svg',
    'packages/canary/src/icons/filter-list.svg',
    'packages/canary/src/icons/filter-organization.svg',
    'packages/canary/src/icons/flag.svg',
    'packages/canary/src/icons/folder.svg',
    'packages/canary/src/icons/git-branch.svg',
    'packages/canary/src/icons/github-actions.svg',
    'packages/canary/src/icons/gitness-logo.svg',
    'packages/canary/src/icons/green-circle.svg',
    'packages/canary/src/icons/green-tick-nobg.svg',
    'packages/canary/src/icons/harness-logo-text.svg',
    'packages/canary/src/icons/harness-plugin.svg',
    'packages/canary/src/icons/harness.svg',
    'packages/canary/src/icons/info-circle.svg',
    'packages/canary/src/icons/lightning.svg',
    'packages/canary/src/icons/merged.svg',
    'packages/canary/src/icons/more-dots-icon.svg',
    'packages/canary/src/icons/more-folder.svg',
    'packages/canary/src/icons/no-data-branches.svg',
    'packages/canary/src/icons/no-data-cog.svg',
    'packages/canary/src/icons/no-data-folder.svg',
    'packages/canary/src/icons/no-data-members.svg',
    'packages/canary/src/icons/no-data-merge.svg',
    'packages/canary/src/icons/no-data-webhooks.svg',
    'packages/canary/src/icons/no-search-magnifying-glass.svg',
    'packages/canary/src/icons/node-logo.svg',
    'packages/canary/src/icons/open-pr.svg',
    'packages/canary/src/icons/pending-clock.svg',
    'packages/canary/src/icons/pin.svg',
    'packages/canary/src/icons/pipelines-icon.svg',
    'packages/canary/src/icons/play-solid.svg',
    'packages/canary/src/icons/plug.svg',
    'packages/canary/src/icons/plus.svg',
    'packages/canary/src/icons/pr-closed.svg',
    'packages/canary/src/icons/pr-comment.svg',
    'packages/canary/src/icons/pr-merge.svg',
    'packages/canary/src/icons/pr-merged.svg',
    'packages/canary/src/icons/pr-open.svg',
    'packages/canary/src/icons/pr-review.svg',
    'packages/canary/src/icons/pull-icon.svg',
    'packages/canary/src/icons/python-and-node-logo.svg',
    'packages/canary/src/icons/python-logo.svg',
    'packages/canary/src/icons/repositories-icon.svg',
    'packages/canary/src/icons/rocket.svg',
    'packages/canary/src/icons/run-test.svg',
    'packages/canary/src/icons/run.svg',
    'packages/canary/src/icons/running.svg',
    'packages/canary/src/icons/search-content.svg',
    'packages/canary/src/icons/search.svg',
    'packages/canary/src/icons/secrets-icon.svg',
    'packages/canary/src/icons/shield-lock.svg',
    'packages/canary/src/icons/shield-tick.svg',
    'packages/canary/src/icons/signpost.svg',
    'packages/canary/src/icons/ssh-key.svg',
    'packages/canary/src/icons/star-icon.svg',
    'packages/canary/src/icons/success.svg',
    'packages/canary/src/icons/tag.svg',
    'packages/canary/src/icons/tasks.svg',
    'packages/canary/src/icons/tick.svg',
    'packages/canary/src/icons/trash.svg',
    'packages/canary/src/icons/triangle-warning.svg',
    'packages/canary/src/icons/tube-sign.svg',
    'packages/canary/src/icons/unmerged.svg',
    'packages/canary/src/icons/unpin.svg',
    'packages/canary/src/icons/vertical-ellipsis.svg',
    'packages/canary/src/icons/x-mark.svg',
    'packages/canary/src/index.ts',
    'packages/canary/src/lib/CanaryOutletFactory.ts',
    'packages/canary/src/lib/utils.ts',
    'packages/canary/src/styles.css',
    'packages/canary/src/utils/StringSubstitute/StringSubstitute.tsx',
    'packages/canary/src/utils/StringSubstitute/__tests__/StringSubstitute.test.tsx',
    'packages/canary/src/utils/StringUtils.ts',
    'packages/canary/tailwind.config.js',
    'packages/canary/tsconfig.app.json',
    'packages/canary/tsconfig.json',
    'packages/canary/tsconfig.node.json',
    'packages/canary/vite-env.d.ts',
    'packages/canary/vite.config.ts',
    'packages/forms/.gitignore',
    'packages/forms/README.md',
    'packages/forms/jest.config.js',
    'packages/forms/package.json',
    'packages/forms/src/core/components/InputComponent.tsx',
    'packages/forms/src/core/components/InputComponentRenderer.tsx',
    'packages/forms/src/core/components/RootForm.tsx',
    'packages/forms/src/core/factory/InputFactory.spec.tsx',
    'packages/forms/src/core/factory/InputFactory.ts',
    'packages/forms/src/core/transformers/transformers.ts',
    'packages/forms/src/core/utils/transform-utils.tsx',
    'packages/forms/src/core/utils/utils.ts',
    'packages/forms/src/core/utils/zod-resolver-utils.tsx',
    'packages/forms/src/core/utils/zod-resolver.tsx',
    'packages/forms/src/core/validation/zod-validation.ts',
    'packages/forms/src/form/RenderForm/RenderForm.tsx',
    'packages/forms/src/form/RenderInputs/RenderInputs.tsx',
    'packages/forms/src/form/Row/Row.tsx',
    'packages/forms/src/index.ts',
    'packages/forms/src/types/types.ts',
    'packages/forms/src/utils/utils.ts',
    'packages/forms/tsconfig.json',
    'packages/forms/vite.config.ts',
    'packages/ui/.gitignore',
    'packages/ui/README.md',
    'packages/ui/config/vitest-setup.ts',
    'packages/ui/i18n.config.ts',
    'packages/ui/locales/en/component.json',
    'packages/ui/locales/en/views.json',
    'packages/ui/locales/es/component.json',
    'packages/ui/locales/es/views.json',
    'packages/ui/locales/fr/component.json',
    'packages/ui/locales/fr/views.json',
    'packages/ui/locales/index.ts',
    'packages/ui/package.json',
    'packages/ui/postcss.config.js',
    'packages/ui/src/components/accordion.tsx',
    'packages/ui/src/components/alert-dialog.tsx',
    'packages/ui/src/components/alert/Alert.test.tsx',
    'packages/ui/src/components/alert/AlertContainer.tsx',
    'packages/ui/src/components/alert/AlertDescription.tsx',
    'packages/ui/src/components/alert/AlertTitle.tsx',
    'packages/ui/src/components/alert/index.ts',
    'packages/ui/src/components/avatar.tsx',
    'packages/ui/src/components/badge.tsx',
    'packages/ui/src/components/breadcrumb.tsx',
    'packages/ui/src/components/button-group.tsx',
    'packages/ui/src/components/button.tsx',
    'packages/ui/src/components/calendar.tsx',
    'packages/ui/src/components/command.tsx',
    'packages/ui/src/components/commit-copy-actions.tsx',
    'packages/ui/src/components/dialog.tsx',
    'packages/ui/src/components/dropdown-menu.tsx',
    'packages/ui/src/components/file-explorer.tsx',
    'packages/ui/src/components/filters/filter-trigger.tsx',
    'packages/ui/src/components/filters/filters-bar/filter-variants/calendar.tsx',
    'packages/ui/src/components/filters/filters-bar/filter-variants/checkbox.tsx',
    'packages/ui/src/components/filters/filters-bar/filter-variants/number.tsx',
    'packages/ui/src/components/filters/filters-bar/filter-variants/text.tsx',
    'packages/ui/src/components/filters/filters-bar/filters-bar.tsx',
    'packages/ui/src/components/filters/filters-bar/filters.tsx',
    'packages/ui/src/components/filters/filters-bar/sorts.tsx',
    'packages/ui/src/components/filters/filters.tsx',
    'packages/ui/src/components/filters/index.ts',
    'packages/ui/src/components/filters/types.ts',
    'packages/ui/src/components/filters/use-filters.tsx',
    'packages/ui/src/components/filters/utils.ts',
    'packages/ui/src/components/icon.tsx',
    'packages/ui/src/components/index.ts',
    'packages/ui/src/components/input.tsx',
    'packages/ui/src/components/label.tsx',
    'packages/ui/src/components/list-actions.tsx',
    'packages/ui/src/components/list-pagination.tsx',
    'packages/ui/src/components/manage-navigation/draggable-item.tsx',
    'packages/ui/src/components/manage-navigation/index.tsx',
    'packages/ui/src/components/manage-navigation/manage-navigation-search.tsx',
    'packages/ui/src/components/more-submenu.tsx',
    'packages/ui/src/components/navbar-project-chooser.tsx',
    'packages/ui/src/components/navbar/data.ts',
    'packages/ui/src/components/navbar/index.tsx',
    'packages/ui/src/components/navbar/navbar-ai/index.tsx',
    'packages/ui/src/components/navbar/navbar-item/index.tsx',
    'packages/ui/src/components/navbar/navbar-skeleton/index.tsx',
    'packages/ui/src/components/navbar/navbar-skeleton/noise.png',
    'packages/ui/src/components/navbar/navbar-user/index.tsx',
    'packages/ui/src/components/navbar/types.ts',
    'packages/ui/src/components/no-data.tsx',
    'packages/ui/src/components/pagination-component.tsx',
    'packages/ui/src/components/pagination.tsx',
    'packages/ui/src/components/path-breadcrumbs.tsx',
    'packages/ui/src/components/popover.tsx',
    'packages/ui/src/components/scroll-area.tsx',
    'packages/ui/src/components/search-box.tsx',
    'packages/ui/src/components/search-files.tsx',
    'packages/ui/src/components/select.tsx',
    'packages/ui/src/components/settings-menu.tsx',
    'packages/ui/src/components/sha-badge.tsx',
    'packages/ui/src/components/sheet.tsx',
    'packages/ui/src/components/skeleton-list.tsx',
    'packages/ui/src/components/skeleton.tsx',
    'packages/ui/src/components/spacer.tsx',
    'packages/ui/src/components/stacked-list.tsx',
    'packages/ui/src/components/table.tsx',
    'packages/ui/src/components/tabs.tsx',
    'packages/ui/src/components/text.tsx',
    'packages/ui/src/components/textarea.tsx',
    'packages/ui/src/components/theme-selector/color-select.tsx',
    'packages/ui/src/components/theme-selector/contrast-select.tsx',
    'packages/ui/src/components/theme-selector/index.tsx',
    'packages/ui/src/components/theme-selector/mode-select.tsx',
    'packages/ui/src/components/theme-selector/types.ts',
    'packages/ui/src/components/theme-selector/utils.ts',
    'packages/ui/src/data/navbar-menu-data.ts',
    'packages/ui/src/data/pinned-menu-items-data.ts',
    'packages/ui/src/hooks/index.ts',
    'packages/ui/src/hooks/use-drag-and-drop.tsx',
    'packages/ui/src/hooks/useCommonFilter.tsx',
    'packages/ui/src/hooks/useLocationChange.tsx',
    'packages/ui/src/icons/account-icon.svg',
    'packages/ui/src/icons/account.svg',
    'packages/ui/src/icons/add-file-icon.svg',
    'packages/ui/src/icons/add-folder-icon.svg',
    'packages/ui/src/icons/ai-sparks.svg',
    'packages/ui/src/icons/apple-shortcut.svg',
    'packages/ui/src/icons/archive.svg',
    'packages/ui/src/icons/arrow-long.svg',
    'packages/ui/src/icons/artifacts-gradient.svg',
    'packages/ui/src/icons/artifacts-icon.svg',
    'packages/ui/src/icons/bitrise-plugin.svg',
    'packages/ui/src/icons/bookmark-icon.svg',
    'packages/ui/src/icons/bookmark.svg',
    'packages/ui/src/icons/box-cloning.svg',
    'packages/ui/src/icons/box-guide.svg',
    'packages/ui/src/icons/box-lightning.svg',
    'packages/ui/src/icons/box-pull-requests.svg',
    'packages/ui/src/icons/branch.svg',
    'packages/ui/src/icons/briefcase-icon.svg',
    'packages/ui/src/icons/cancel-grey.svg',
    'packages/ui/src/icons/chain.svg',
    'packages/ui/src/icons/changes.svg',
    'packages/ui/src/icons/chaos-engineering-gradient.svg',
    'packages/ui/src/icons/chaos-engineering-icon.svg',
    'packages/ui/src/icons/checkbox.svg',
    'packages/ui/src/icons/checks.svg',
    'packages/ui/src/icons/chevron-down.svg',
    'packages/ui/src/icons/chevron-fill-down.svg',
    'packages/ui/src/icons/chevron-right.svg',
    'packages/ui/src/icons/chevron-up.svg',
    'packages/ui/src/icons/circle-arrow-top-right.svg',
    'packages/ui/src/icons/circle-arrow-top.svg',
    'packages/ui/src/icons/circle-arrows-updown.svg',
    'packages/ui/src/icons/circle.svg',
    'packages/ui/src/icons/clock-icon.svg',
    'packages/ui/src/icons/clock.svg',
    'packages/ui/src/icons/clone.svg',
    'packages/ui/src/icons/close.svg',
    'packages/ui/src/icons/cloud-costs-gradient.svg',
    'packages/ui/src/icons/cloud-costs-icon.svg',
    'packages/ui/src/icons/cloud-mining.svg',
    'packages/ui/src/icons/cog-6.svg',
    'packages/ui/src/icons/comments.svg',
    'packages/ui/src/icons/computer.svg',
    'packages/ui/src/icons/connectors-icon.svg',
    'packages/ui/src/icons/create-workspace.svg',
    'packages/ui/src/icons/dashboards-gradient.svg',
    'packages/ui/src/icons/dashboards-icon.svg',
    'packages/ui/src/icons/database-gradient.svg',
    'packages/ui/src/icons/database-icon.svg',
    'packages/ui/src/icons/dev-envs-gradient.svg',
    'packages/ui/src/icons/dev-envs-icon.svg',
    'packages/ui/src/icons/dev-insights-gradient.svg',
    'packages/ui/src/icons/dev-insights-icon.svg',
    'packages/ui/src/icons/dev-portal-gradient.svg',
    'packages/ui/src/icons/dev-portal-icon.svg',
    'packages/ui/src/icons/download.svg',
    'packages/ui/src/icons/edit.svg',
    'packages/ui/src/icons/environment-icon.svg',
    'packages/ui/src/icons/execution-gradient.svg',
    'packages/ui/src/icons/execution-icon.svg',
    'packages/ui/src/icons/eye-icon.svg',
    'packages/ui/src/icons/fail.svg',
    'packages/ui/src/icons/featured-flags-icon.svg',
    'packages/ui/src/icons/file-icon.svg',
    'packages/ui/src/icons/file.svg',
    'packages/ui/src/icons/filter-list.svg',
    'packages/ui/src/icons/filter-organization.svg',
    'packages/ui/src/icons/flag-gradient.svg',
    'packages/ui/src/icons/flag-icon.svg',
    'packages/ui/src/icons/flag.svg',
    'packages/ui/src/icons/folder-icon.svg',
    'packages/ui/src/icons/folder.svg',
    'packages/ui/src/icons/git-branch.svg',
    'packages/ui/src/icons/github-actions.svg',
    'packages/ui/src/icons/gitness-logo.svg',
    'packages/ui/src/icons/green-circle.svg',
    'packages/ui/src/icons/green-tick-nobg.svg',
    'packages/ui/src/icons/grid-dots.svg',
    'packages/ui/src/icons/harness-logo-text.svg',
    'packages/ui/src/icons/harness-plugin.svg',
    'packages/ui/src/icons/harness.svg',
    'packages/ui/src/icons/hierarchy-icon.svg',
    'packages/ui/src/icons/incidents-gradient.svg',
    'packages/ui/src/icons/incidents-icon.svg',
    'packages/ui/src/icons/info-circle.svg',
    'packages/ui/src/icons/infrastructure-gradient.svg',
    'packages/ui/src/icons/infrastructure-icon.svg',
    'packages/ui/src/icons/key-icon.svg',
    'packages/ui/src/icons/lightning.svg',
    'packages/ui/src/icons/log-out-icon.svg',
    'packages/ui/src/icons/logo-gradient-ellipse.svg',
    'packages/ui/src/icons/logo-gradient.svg',
    'packages/ui/src/icons/menu-dots-icon.svg',
    'packages/ui/src/icons/merged.svg',
    'packages/ui/src/icons/more-dots-fill-icon.svg',
    'packages/ui/src/icons/more-dots-icon.svg',
    'packages/ui/src/icons/more-folder.svg',
    'packages/ui/src/icons/navigation-icon.svg',
    'packages/ui/src/icons/no-data-branches.svg',
    'packages/ui/src/icons/no-data-cog.svg',
    'packages/ui/src/icons/no-data-folder.svg',
    'packages/ui/src/icons/no-data-members.svg',
    'packages/ui/src/icons/no-data-merge.svg',
    'packages/ui/src/icons/no-data-webhooks.svg',
    'packages/ui/src/icons/no-repository.svg',
    'packages/ui/src/icons/no-search-magnifying-glass.svg',
    'packages/ui/src/icons/node-logo.svg',
    'packages/ui/src/icons/notification-icon.svg',
    'packages/ui/src/icons/open-pr.svg',
    'packages/ui/src/icons/paint-icon.svg',
    'packages/ui/src/icons/pending-clock.svg',
    'packages/ui/src/icons/pin.svg',
    'packages/ui/src/icons/pipelines-gradient.svg',
    'packages/ui/src/icons/pipelines-icon.svg',
    'packages/ui/src/icons/play-solid.svg',
    'packages/ui/src/icons/plug.svg',
    'packages/ui/src/icons/plus.svg',
    'packages/ui/src/icons/pr-closed.svg',
    'packages/ui/src/icons/pr-comment.svg',
    'packages/ui/src/icons/pr-merge.svg',
    'packages/ui/src/icons/pr-merged.svg',
    'packages/ui/src/icons/pr-open.svg',
    'packages/ui/src/icons/pr-review.svg',
    'packages/ui/src/icons/pull-icon.svg',
    'packages/ui/src/icons/python-and-node-logo.svg',
    'packages/ui/src/icons/python-logo.svg',
    'packages/ui/src/icons/repositories-gradient.svg',
    'packages/ui/src/icons/repositories-icon.svg',
    'packages/ui/src/icons/rocket.svg',
    'packages/ui/src/icons/run-test.svg',
    'packages/ui/src/icons/run.svg',
    'packages/ui/src/icons/running.svg',
    'packages/ui/src/icons/search-content.svg',
    'packages/ui/src/icons/search-icon.svg',
    'packages/ui/src/icons/search.svg',
    'packages/ui/src/icons/secrets-icon.svg',
    'packages/ui/src/icons/security-tests-gradient.svg',
    'packages/ui/src/icons/security-tests-icon.svg',
    'packages/ui/src/icons/setting-1.svg',
    'packages/ui/src/icons/setting-2.svg',
    'packages/ui/src/icons/shield-icon.svg',
    'packages/ui/src/icons/shield-lock.svg',
    'packages/ui/src/icons/shield-tick.svg',
    'packages/ui/src/icons/sidebar-icon.svg',
    'packages/ui/src/icons/signpost.svg',
    'packages/ui/src/icons/snow-icon.svg',
    'packages/ui/src/icons/sparks.svg',
    'packages/ui/src/icons/ssh-key.svg',
    'packages/ui/src/icons/stack-icon.svg',
    'packages/ui/src/icons/star-icon.svg',
    'packages/ui/src/icons/sub-menu-ellipse.svg',
    'packages/ui/src/icons/success.svg',
    'packages/ui/src/icons/supply-chain-gradient.svg',
    'packages/ui/src/icons/supply-chain-icon.svg',
    'packages/ui/src/icons/tag.svg',
    'packages/ui/src/icons/tasks.svg',
    'packages/ui/src/icons/tick-icon.svg',
    'packages/ui/src/icons/ticket-icon.svg',
    'packages/ui/src/icons/trash.svg',
    'packages/ui/src/icons/triangle-warning.svg',
    'packages/ui/src/icons/tube-sign.svg',
    'packages/ui/src/icons/unmerged.svg',
    'packages/ui/src/icons/unpin.svg',
    'packages/ui/src/icons/user-icon.svg',
    'packages/ui/src/icons/users-icon.svg',
    'packages/ui/src/icons/variable-icon.svg',
    'packages/ui/src/icons/vertical-ellipsis.svg',
    'packages/ui/src/icons/webhook-icon.svg',
    'packages/ui/src/icons/wrench-icon.svg',
    'packages/ui/src/icons/x-mark.svg',
    'packages/ui/src/index.ts',
    'packages/ui/src/styles.css',
    'packages/ui/src/types/index.ts',
    'packages/ui/src/utils/CanaryOutletFactory.ts',
    'packages/ui/src/utils/cn.ts',
    'packages/ui/src/utils/isSafari.ts',
    'packages/ui/src/utils/stringUtils.ts',
    'packages/ui/src/utils/utils.ts',
    'packages/ui/src/views/empty-page.tsx',
    'packages/ui/src/views/index.ts',
    'packages/ui/src/views/layouts/RepoLayout.tsx',
    'packages/ui/src/views/layouts/SandboxLayout.tsx',
    'packages/ui/src/views/layouts/SandboxRoot.tsx',
    'packages/ui/src/views/pull-request/index.ts',
    'packages/ui/src/views/pull-request/pull-request-list-description.tsx',
    'packages/ui/src/views/pull-request/pull-request-list-header-title.tsx',
    'packages/ui/src/views/pull-request/pull-request-list-page.tsx',
    'packages/ui/src/views/pull-request/pull-request-list-title.tsx',
    'packages/ui/src/views/pull-request/pull-request-list.tsx',
    'packages/ui/src/views/pull-request/types.ts',
    'packages/ui/src/views/pull-request/utils.ts',
    'packages/ui/src/views/repo/components/branch-selector/branch-selector-dropdown.tsx',
    'packages/ui/src/views/repo/components/branch-selector/branch-selector.tsx',
    'packages/ui/src/views/repo/components/index.ts',
    'packages/ui/src/views/repo/components/summary/summary.tsx',
    'packages/ui/src/views/repo/index.ts',
    'packages/ui/src/views/repo/repo-files/index.tsx',
    'packages/ui/src/views/repo/repo-layout/index.tsx',
    'packages/ui/src/views/repo/repo-list/filter-options.ts',
    'packages/ui/src/views/repo/repo-list/repo-list-page.tsx',
    'packages/ui/src/views/repo/repo-list/repo-list.tsx',
    'packages/ui/src/views/repo/repo-list/types.ts',
    'packages/ui/src/views/repo/repo-sidebar/index.tsx',
    'packages/ui/src/views/repo/repo-summary/components/summary-panel.tsx',
    'packages/ui/src/views/repo/repo-summary/repo-summary.tsx',
    'packages/ui/src/views/repo/repo.types.ts',
    'packages/ui/src/views/webhooks/index.ts',
    'packages/ui/src/views/webhooks/webhook-list/repo-webhook-list-page.tsx',
    'packages/ui/src/views/webhooks/webhook-list/repo-webhook-list.tsx',
    'packages/ui/src/views/webhooks/webhook-list/types.ts',
    'packages/ui/tailwind.config.js',
    'packages/ui/tailwind.ts',
    'packages/ui/tsconfig.json',
    'packages/ui/vite-env.d.ts',
    'packages/ui/vite.config.ts',
    'packages/unified-pipeline/.gitignore',
    'packages/unified-pipeline/README.md',
    'packages/unified-pipeline/global.d.ts',
    'packages/unified-pipeline/package.json',
    'packages/unified-pipeline/src/assets/images/card-glow.svg',
    'packages/unified-pipeline/src/assets/mockPipelines/yamls/demo_pipeline.yaml',
    'packages/unified-pipeline/src/assets/mockPipelines/yamls/pipeline_w_parallel_stage_group.yaml',
    'packages/unified-pipeline/src/assets/mockPipelines/yamls/pipeline_w_parallel_stage_group_and_stage.yaml',
    'packages/unified-pipeline/src/assets/mockPipelines/yamls/pipeline_w_sequential_stage_group.yaml',
    'packages/unified-pipeline/src/assets/mockPipelines/yamls/pipeline_w_single_stage.yaml',
    'packages/unified-pipeline/src/components/Canvas/Canvas.module.scss',
    'packages/unified-pipeline/src/components/Canvas/Canvas.tsx',
    'packages/unified-pipeline/src/components/Canvas/elements/Edges/PlusEdge/PlusEdge.tsx',
    'packages/unified-pipeline/src/components/Canvas/elements/Nodes/AtomicNode/AtomicNode.tsx',
    'packages/unified-pipeline/src/components/Canvas/elements/Nodes/GroupNode/GroupNode.tsx',
    'packages/unified-pipeline/src/components/Canvas/elements/Nodes/PlusNode/PlusNode.tsx',
    'packages/unified-pipeline/src/components/Canvas/elements/Nodes/RootNode/RootNode.tsx',
    'packages/unified-pipeline/src/components/Canvas/elements/Nodes/StageNode/StageNode.tsx',
    'packages/unified-pipeline/src/components/Canvas/nodes-edges-defaults.ts',
    'packages/unified-pipeline/src/components/Canvas/types.ts',
    'packages/unified-pipeline/src/components/Canvas/utils/EdgeUtils.ts',
    'packages/unified-pipeline/src/components/Canvas/utils/ElkLayout.ts',
    'packages/unified-pipeline/src/components/Canvas/utils/LROrientation/Constants.ts',
    'packages/unified-pipeline/src/components/Canvas/utils/LayoutUtils.ts',
    'packages/unified-pipeline/src/components/Canvas/utils/NodeUtils.ts',
    'packages/unified-pipeline/src/components/Canvas/utils/elk.ts',
    'packages/unified-pipeline/src/components/Canvas/utils/index.ts',
    'packages/unified-pipeline/src/components/CircleOverlay/CircleOverlay.tsx',
    'packages/unified-pipeline/src/components/PipelineConfigPanel/types.ts',
    'packages/unified-pipeline/src/components/PipelineStudio/PipelineStudio.tsx',
    'packages/unified-pipeline/src/framework/CanvasStore/CanvasStoreContext.tsx',
    'packages/unified-pipeline/src/framework/FlowStore/FlowStore.tsx',
    'packages/unified-pipeline/src/framework/InteractionContext/InteractionContext.tsx',
    'packages/unified-pipeline/src/hooks/useAutoLayout.ts',
    'packages/unified-pipeline/src/hooks/useWindowDimensions.ts',
    'packages/unified-pipeline/src/icons/Bitbucket.tsx',
    'packages/unified-pipeline/src/icons/Expand.tsx',
    'packages/unified-pipeline/src/icons/Jira.tsx',
    'packages/unified-pipeline/src/icons/Plus.tsx',
    'packages/unified-pipeline/src/icons/Slack.tsx',
    'packages/unified-pipeline/src/index.ts',
    'packages/unified-pipeline/src/pages/studio/Studio.tsx',
    'packages/unified-pipeline/src/styles.css',
    'packages/unified-pipeline/src/utils/Constants.ts',
    'packages/unified-pipeline/src/utils/ParserUtils.tsx',
    'packages/unified-pipeline/src/utils/PipelineYamlUtils.ts',
    'packages/unified-pipeline/src/utils/StringUtils.ts',
    'packages/unified-pipeline/src/utils/stepUtils/commonStepUtil.ts',
    'packages/unified-pipeline/src/utils/stepUtils/stepIconUtil.ts',
    'packages/unified-pipeline/src/utils/stepUtils/stepNameUtil.ts',
    'packages/unified-pipeline/tailwind.config.js',
    'packages/unified-pipeline/tsconfig.json',
    'packages/unified-pipeline/vite.config.ts',
    'packages/views/.gitignore',
    'packages/views/global.d.ts',
    'packages/views/package.json',
    'packages/views/src/components/TabsTriggerItem.tsx',
    'packages/views/src/components/alert-delete-dialog-form.tsx',
    'packages/views/src/components/alert-delete-dialog.tsx',
    'packages/views/src/components/branch-chooser.tsx',
    'packages/views/src/components/branches-list.tsx',
    'packages/views/src/components/commits-details.tsx',
    'packages/views/src/components/commits-list.tsx',
    'packages/views/src/components/contact-card.tsx',
    'packages/views/src/components/copy-button.tsx',
    'packages/views/src/components/create-branch-dialog.tsx',
    'packages/views/src/components/create-pipeline-page.tsx',
    'packages/views/src/components/create-project-page.tsx',
    'packages/views/src/components/divergence-gauge.tsx',
    'packages/views/src/components/error.tsx',
    'packages/views/src/components/execution-list.tsx',
    'packages/views/src/components/execution/console-logs.tsx',
    'packages/views/src/components/execution/execution-status.tsx',
    'packages/views/src/components/execution/execution-tree-utils.tsx',
    'packages/views/src/components/execution/execution-tree.tsx',
    'packages/views/src/components/execution/key-value-table.tsx',
    'packages/views/src/components/execution/stage-execution.tsx',
    'packages/views/src/components/execution/step-execution.tsx',
    'packages/views/src/components/execution/types.ts',
    'packages/views/src/components/execution/utils.tsx',
    'packages/views/src/components/file-explorer.tsx',
    'packages/views/src/components/file-view-gauge.tsx',
    'packages/views/src/components/filter.tsx',
    'packages/views/src/components/forgot-password-page.tsx',
    'packages/views/src/components/form-field-set.tsx',
    'packages/views/src/components/form-field.tsx',
    'packages/views/src/components/form-inputs/ArrayInput.tsx',
    'packages/views/src/components/form-inputs/BooleanInput.tsx',
    'packages/views/src/components/form-inputs/GroupInput.tsx',
    'packages/views/src/components/form-inputs/ListInput.tsx',
    'packages/views/src/components/form-inputs/NumberInput.tsx',
    'packages/views/src/components/form-inputs/SelectInput.tsx',
    'packages/views/src/components/form-inputs/Separator.tsx',
    'packages/views/src/components/form-inputs/TextAreaInput.tsx',
    'packages/views/src/components/form-inputs/TextInput.tsx',
    'packages/views/src/components/form-inputs/common/InputError.tsx',
    'packages/views/src/components/form-inputs/common/InputLabel.tsx',
    'packages/views/src/components/form-inputs/common/InputWrapper.tsx',
    'packages/views/src/components/form-inputs/factory/factory.ts',
    'packages/views/src/components/form-inputs/types.ts',
    'packages/views/src/components/home.tsx',
    'packages/views/src/components/image-carousel.tsx',
    'packages/views/src/components/layout/container.tsx',
    'packages/views/src/components/layout/executions-top-bar.tsx',
    'packages/views/src/components/layout/layout.tsx',
    'packages/views/src/components/layout/top-bar-widget.tsx',
    'packages/views/src/components/layout/topbar.tsx',
    'packages/views/src/components/markdown-viewer.tsx',
    'packages/views/src/components/mode-toggle.tsx',
    'packages/views/src/components/more-submenu.tsx',
    'packages/views/src/components/new-password-page.tsx',
    'packages/views/src/components/no-data.tsx',
    'packages/views/src/components/no-search-results.tsx',
    'packages/views/src/components/otp-page.tsx',
    'packages/views/src/components/pagination.tsx',
    'packages/views/src/components/pipeline-details.tsx',
    'packages/views/src/components/pipeline-list.tsx',
    'packages/views/src/components/pipeline-studio/pipeline-studio-footer-bar/pipeline-studio-footer-bar.tsx',
    'packages/views/src/components/pipeline-studio/pipeline-studio-toolbar-actions.tsx',
    'packages/views/src/components/pipeline-studio/popover-commit-info.tsx',
    'packages/views/src/components/pipeline-studio/problems.tsx',
    'packages/views/src/components/pipeline-studio/step-form/step-form-section.tsx',
    'packages/views/src/components/pipeline-studio/step-form/step-form.tsx',
    'packages/views/src/components/pipeline-studio/step-palette/step-palette-content.tsx',
    'packages/views/src/components/pipeline-studio/step-palette/step-palette-filters.tsx',
    'packages/views/src/components/pipeline-studio/step-palette/step-palette-item.tsx',
    'packages/views/src/components/pipeline-studio/step-palette/step-palette.tsx',
    'packages/views/src/components/pipeline-studio/visual-yaml-toggle.tsx',
    'packages/views/src/components/profile-settings/profile-settings-keys-list.tsx',
    'packages/views/src/components/profile-settings/profile-settings-tokens-list.tsx',
    'packages/views/src/components/profile-settings/ssh-key-create-dialog.tsx',
    'packages/views/src/components/profile-settings/ssh-key-create-form.tsx',
    'packages/views/src/components/profile-settings/token-create-dialog.tsx',
    'packages/views/src/components/profile-settings/token-create-form.tsx',
    'packages/views/src/components/profile-settings/types.ts',
    'packages/views/src/components/project-settings-nav.tsx',
    'packages/views/src/components/project-settings/form-member-delete-dialog.tsx',
    'packages/views/src/components/project-settings/form-member-edit-dialog.tsx',
    'packages/views/src/components/project-settings/interfaces.ts',
    'packages/views/src/components/project-settings/members-list.tsx',
    'packages/views/src/components/project-settings/members-reducers/dialog-state-reducers.ts',
    'packages/views/src/components/project-settings/moreActionsDropdown.tsx',
    'packages/views/src/components/project-settings/utils.ts',
    'packages/views/src/components/pull-request/constants.ts',
    'packages/views/src/components/pull-request/hooks/useDiffConfig.ts',
    'packages/views/src/components/pull-request/hooks/useEmitCodeCommentStatus.ts',
    'packages/views/src/components/pull-request/interfaces-store.ts',
    'packages/views/src/components/pull-request/interfaces.ts',
    'packages/views/src/components/pull-request/pull-request-changes.tsx',
    'packages/views/src/components/pull-request/pull-request-checks.tsx',
    'packages/views/src/components/pull-request/pull-request-comment-box.tsx',
    'packages/views/src/components/pull-request/pull-request-commits.tsx',
    'packages/views/src/components/pull-request/pull-request-compare-button.tsx',
    'packages/views/src/components/pull-request/pull-request-compare-form.tsx',
    'packages/views/src/components/pull-request/pull-request-conversation-header.tsx',
    'packages/views/src/components/pull-request/pull-request-description-box.tsx',
    'packages/views/src/components/pull-request/pull-request-diff-viewer.tsx',
    'packages/views/src/components/pull-request/pull-request-filters.tsx',
    'packages/views/src/components/pull-request/pull-request-line-title.tsx',
    'packages/views/src/components/pull-request/pull-request-list.tsx',
    'packages/views/src/components/pull-request/pull-request-overview.tsx',
    'packages/views/src/components/pull-request/pull-request-panel.tsx',
    'packages/views/src/components/pull-request/pull-request-reviewers-header.tsx',
    'packages/views/src/components/pull-request/pull-request-reviewers-item.tsx',
    'packages/views/src/components/pull-request/pull-request-reviewers-list.tsx',
    'packages/views/src/components/pull-request/pull-request-reviewers-tooltip.tsx',
    'packages/views/src/components/pull-request/pull-request-side-bar.tsx',
    'packages/views/src/components/pull-request/pull-request-status-select-button.tsx',
    'packages/views/src/components/pull-request/pull-request-system-comments.tsx',
    'packages/views/src/components/pull-request/pull-request-system-label-item.tsx',
    'packages/views/src/components/pull-request/pull-request-system-merge.tsx',
    'packages/views/src/components/pull-request/pull-request-system-reviewer-add.tsx',
    'packages/views/src/components/pull-request/pull-request-system-reviewer-delete.tsx',
    'packages/views/src/components/pull-request/pull-request-system-title.tsx',
    'packages/views/src/components/pull-request/pull-request-timeline-item.tsx',
    'packages/views/src/components/pull-request/sections/pull-request-changes-section.tsx',
    'packages/views/src/components/pull-request/sections/pull-request-check-section.tsx',
    'packages/views/src/components/pull-request/sections/pull-request-comment-section.tsx',
    'packages/views/src/components/pull-request/sections/pull-request-merge-section.tsx',
    'packages/views/src/components/pull-request/usePrevious.ts',
    'packages/views/src/components/pull-request/utils.tsx',
    'packages/views/src/components/pull-request/worker.ts',
    'packages/views/src/components/repo-branch-settings-rules-page.tsx',
    'packages/views/src/components/repo-clone/clone-repo-dialog.tsx',
    'packages/views/src/components/repo-clone/clone-repo-form.tsx',
    'packages/views/src/components/repo-create-form.tsx',
    'packages/views/src/components/repo-details.tsx',
    'packages/views/src/components/repo-import-form-component.tsx',
    'packages/views/src/components/repo-list.tsx',
    'packages/views/src/components/repo-settings/repo-branch-settings-rules/reducers/repo-branch-settings-reducer.ts',
    'packages/views/src/components/repo-settings/repo-branch-settings-rules/repo-branch-settings-rules-data.tsx',
    'packages/views/src/components/repo-settings/repo-branch-settings-rules/repo-branch-settings-rules-fields.tsx',
    'packages/views/src/components/repo-settings/repo-branch-settings-rules/repo-branch-settings-rules-schema.tsx',
    'packages/views/src/components/repo-settings/repo-branch-settings-rules/types.ts',
    'packages/views/src/components/repo-settings/repo-settings-general/repo-settings-general-delete.tsx',
    'packages/views/src/components/repo-settings/repo-settings-general/repo-settings-general-form.tsx',
    'packages/views/src/components/repo-settings/repo-settings-general/repo-settings-general-rules.tsx',
    'packages/views/src/components/repo-settings/repo-settings-general/repo-settings-general-security.tsx',
    'packages/views/src/components/repo-settings/repo-settings-general/repo-settings-general-tooltip.tsx',
    'packages/views/src/components/repo-settings/repo-settings-general/types.ts',
    'packages/views/src/components/repo-settings/repo-settings-page.tsx',
    'packages/views/src/components/repo-settings/repo-settings-placeholder.tsx',
    'packages/views/src/components/repo-summary-panel.tsx',
    'packages/views/src/components/repo-summary.tsx',
    'packages/views/src/components/repo-webhooks-create-page.tsx',
    'packages/views/src/components/search-files.tsx',
    'packages/views/src/components/settings-account-page.tsx',
    'packages/views/src/components/settings-create-new-user-form.tsx',
    'packages/views/src/components/settings-user-management-page.tsx',
    'packages/views/src/components/signin-page.tsx',
    'packages/views/src/components/signup-page.tsx',
    'packages/views/src/components/signup.tsx',
    'packages/views/src/components/steps/action-step.tsx',
    'packages/views/src/components/steps/approval-step.tsx',
    'packages/views/src/components/steps/background-step.tsx',
    'packages/views/src/components/steps/barrier-step.tsx',
    'packages/views/src/components/steps/group.ts',
    'packages/views/src/components/steps/harness-steps.ts',
    'packages/views/src/components/steps/parallel.ts',
    'packages/views/src/components/steps/partials/container-partial.ts',
    'packages/views/src/components/steps/queue-step.tsx',
    'packages/views/src/components/steps/run-step.tsx',
    'packages/views/src/components/steps/run-test-step.tsx',
    'packages/views/src/components/steps/types.ts',
    'packages/views/src/components/theme-provider.tsx',
    'packages/views/src/components/user-management/form-admin-add-dialog.tsx',
    'packages/views/src/components/user-management/form-admin-remove-dialog.tsx',
    'packages/views/src/components/user-management/form-user-delete-dialog.tsx',
    'packages/views/src/components/user-management/form-user-edit-dialog.tsx',
    'packages/views/src/components/user-management/form-user-reset-password.tsx',
    'packages/views/src/components/user-management/interfaces.ts',
    'packages/views/src/components/user-management/reset-password-dialog.tsx',
    'packages/views/src/components/user-management/user-reducers/dialog-state-reducers.ts',
    'packages/views/src/components/user-management/users-list.tsx',
    'packages/views/src/components/users-list.tsx',
    'packages/views/src/components/view.tsx',
    'packages/views/src/components/webhook-list.tsx',
    'packages/views/src/components/webhooks/create-webhook-form-data.ts',
    'packages/views/src/components/webhooks/create-webhooks-form-fields.tsx',
    'packages/views/src/components/webhooks/create-webhooks-form-schema.tsx',
    'packages/views/src/components/webhooks/types.ts',
    'packages/views/src/components/wip.tsx',
    'packages/views/src/configs/canary-outlets.tsx',
    'packages/views/src/constants/ExecutionConstants.ts',
    'packages/views/src/data/mockNavbarSubmenuData.ts',
    'packages/views/src/hooks/useCommonFilter.tsx',
    'packages/views/src/index.ts',
    'packages/views/src/layouts/Floating1ColumnLayout.tsx',
    'packages/views/src/layouts/FullWidth2ColumnLayout.tsx',
    'packages/views/src/layouts/FullscreenLayout.tsx',
    'packages/views/src/layouts/PaddingListLayout.tsx',
    'packages/views/src/layouts/PullRequestLayout.tsx',
    'packages/views/src/layouts/RepoExecutionLayout.tsx',
    'packages/views/src/layouts/RootLayout.tsx',
    'packages/views/src/layouts/SandboxExecutions.tsx',
    'packages/views/src/layouts/SandboxLayout.tsx',
    'packages/views/src/layouts/SandboxPullRequestCompareLayout.tsx',
    'packages/views/src/layouts/SandboxPullrequestLayout.tsx',
    'packages/views/src/layouts/SandboxRoot.tsx',
    'packages/views/src/layouts/SandboxSettings.tsx',
    'packages/views/src/layouts/types.ts',
    'packages/views/src/styles.css',
    'packages/views/src/utils/TimeUtils.ts',
    'packages/views/src/utils/utils.ts',
    'packages/views/tailwind.config.js',
    'packages/views/tsconfig.json',
    'packages/views/tsconfig.node.json',
    'packages/views/vite.config.ts',
    'packages/yaml-editor-playground/.gitignore',
    'packages/yaml-editor-playground/package.json',
    'packages/yaml-editor-playground/src/App.css',
    'packages/yaml-editor-playground/src/App.tsx',
    'packages/yaml-editor-playground/src/configurations/inline-actions/inline-actions-def.ts',
    'packages/yaml-editor-playground/src/configurations/pipeline/stage-approval.ts',
    'packages/yaml-editor-playground/src/configurations/schema/unified.json',
    'packages/yaml-editor-playground/src/configurations/theme/theme.ts',
    'packages/yaml-editor-playground/src/examples/data-flow/DataFlowExample.tsx',
    'packages/yaml-editor-playground/src/examples/data-flow/DataProvider.tsx',
    'packages/yaml-editor-playground/src/examples/data-flow/YamlEditorWrapper.tsx',
    'packages/yaml-editor-playground/src/global.d.ts',
    'packages/yaml-editor-playground/src/index.html',
    'packages/yaml-editor-playground/src/index.tsx',
    'packages/yaml-editor-playground/tsconfig.json',
    'packages/yaml-editor-playground/webpack.config.js',
    'packages/yaml-editor/.gitignore',
    'packages/yaml-editor/README.md',
    'packages/yaml-editor/package.json',
    'packages/yaml-editor/src/components/BlameEditor.tsx',
    'packages/yaml-editor/src/components/CodeEditor.tsx',
    'packages/yaml-editor/src/components/DiffEditor.tsx',
    'packages/yaml-editor/src/components/YamlEditor.tsx',
    'packages/yaml-editor/src/components/YamlProvider.tsx',
    'packages/yaml-editor/src/global.d.ts',
    'packages/yaml-editor/src/hooks/useCodeLens.tsx',
    'packages/yaml-editor/src/hooks/useDecoration.tsx',
    'packages/yaml-editor/src/hooks/useProblems.tsx',
    'packages/yaml-editor/src/hooks/useSchema.tsx',
    'packages/yaml-editor/src/hooks/useTheme.tsx',
    'packages/yaml-editor/src/index.ts',
    'packages/yaml-editor/src/types/blame.ts',
    'packages/yaml-editor/src/types/inline-actions.ts',
    'packages/yaml-editor/src/types/monaco.ts',
    'packages/yaml-editor/src/types/selectors.ts',
    'packages/yaml-editor/src/types/themes.ts',
    'packages/yaml-editor/src/utils/blame-editor-utils.ts',
    'packages/yaml-editor/src/utils/codelens-utils.ts',
    'packages/yaml-editor/src/utils/monaco-globals.ts',
    'packages/yaml-editor/src/utils/outline-model-to-path.ts',
    'packages/yaml-editor/src/utils/schema-utils.ts',
    'packages/yaml-editor/src/utils/utils.ts',
    'packages/yaml-editor/tsconfig.json',
    'packages/yaml-editor/vite.config.ts',
    'packages/yaml-editor/webpack.config.prod.js',
    'pnpm-lock.yaml',
    'pnpm-workspace.yaml'
  ],
  filesTreeData: [
    {
      type: 'dir',
      sha: '418b0f4ece2b9f6839c656a05f3719028844f6d2',
      name: '.github',
      path: '.github'
    },
    {
      type: 'dir',
      sha: '84f2a93f9872218e882609ce09bb41e57d23a537',
      name: '.husky',
      path: '.husky'
    },
    {
      type: 'dir',
      sha: '2a6ae60d91789ef9770dc972d6437b7a79d6d35f',
      name: '.vscode',
      path: '.vscode'
    },
    {
      type: 'dir',
      sha: '9f4e22f064ac9fb84236f691c10087208e3c1eeb',
      name: 'apps',
      path: 'apps'
    },
    {
      type: 'dir',
      sha: '46b8657005ba1e3d857d9a5d7e9b54e1286eb6ad',
      name: 'charts',
      path: 'charts'
    },
    {
      type: 'dir',
      sha: '8ed643311b028370e4d5a8ead36145cad161122c',
      name: 'packages',
      path: 'packages'
    },
    {
      type: 'file',
      sha: '958b26c9d6ea21bea38f9de590fc01075da016a9',
      name: '.dockerignore',
      path: '.dockerignore'
    },
    {
      type: 'file',
      sha: 'de4d1f007dd195ea685034cbda7209013105044b',
      name: '.eslintignore',
      path: '.eslintignore'
    },
    {
      type: 'file',
      sha: 'd149876d71ac5a0ca0f1cf15312911f4c9b96175',
      name: '.eslintrc.json',
      path: '.eslintrc.json'
    },
    {
      type: 'file',
      sha: '5ec7fcce4698725fd223a5b7360efabf530bc932',
      name: '.gitignore',
      path: '.gitignore'
    },
    {
      type: 'file',
      sha: '48912d244bbc262d8580451e1b3cacae7dcca11f',
      name: '.prettierignore',
      path: '.prettierignore'
    },
    {
      type: 'file',
      sha: '3df88e9075e6c3fcc7bd3c8177056bca42857a16',
      name: '.prettierrc.yml',
      path: '.prettierrc.yml'
    },
    {
      type: 'file',
      sha: '78ea4cb7cc94f5fabdb4271b9e80a0ed92794b18',
      name: 'CODEOWNERS',
      path: 'CODEOWNERS'
    },
    {
      type: 'file',
      sha: '8c1d9bb34d4e6080ea233251ef452a5d064a35d8',
      name: 'CONTRIBUTOR_LICENSE_AGREEMENT.md',
      path: 'CONTRIBUTOR_LICENSE_AGREEMENT.md'
    },
    {
      type: 'file',
      sha: '48ddf608aad31785a97ce5edc589096fee22eb55',
      name: 'Dockerfile',
      path: 'Dockerfile'
    },
    {
      type: 'file',
      sha: '8dada3edaf50dbc082c9a125058f25def75e625a',
      name: 'LICENSE',
      path: 'LICENSE'
    },
    {
      type: 'file',
      sha: '298732ba252ad92866928851d867091de288c498',
      name: 'README.md',
      path: 'README.md'
    },
    {
      type: 'file',
      sha: 'd0969014d475955136cdfd4677b2ea1241d0e4fa',
      name: 'package.json',
      path: 'package.json'
    },
    {
      type: 'file',
      sha: '2cdfd9e17d968dbd8587b5c4b9e1c62f16a1d6d8',
      name: 'pnpm-lock.yaml',
      path: 'pnpm-lock.yaml'
    },
    {
      type: 'file',
      sha: '286cf7f5643db97142c425abe7c8e5d5663f5d65',
      name: 'pnpm-workspace.yaml',
      path: 'pnpm-workspace.yaml'
    }
  ],
  files: [
    {
      id: '.dockerignore',
      type: 1,
      name: '.dockerignore',
      lastCommitMessage:
        'chore: [PIPE-22417]: adds dockerisation support (#290)\n\n* chore: [PIPE-22417]: adds dockerisation support\r\n\r\n* fix dynamic api urls\r\n\r\n* add docker readme\r\n\r\n* chore: onboard helm (#297)\r\n\r\n* chore: onboard helm\r\n\r\n* temporarily disable husky\r\n\r\n* Fix Helm chart source directory\r\n\r\n* Dummy commit to change tag\r\n\r\n* fix: css build order\r\n\r\n---------\r\n\r\nCo-authored-by: Arya Haldar <arya.haldar@harness.io>\r\n\r\n---------\r\n\r\nCo-authored-by: Arya Haldar <arya.haldar@harness.io>',
      timestamp: 'Oct 11, 2024',
      user: {
        name: 'Abhinav Rastogi'
      },
      sha: '5d6f2d7',
      path: '/canary/repos/canary/code//~/.dockerignore'
    },
    {
      id: '.eslintignore',
      type: 1,
      name: '.eslintignore',
      lastCommitMessage:
        'feat: [PIPE-23302]: Add eslint and prettier config to tailwindcss, react and typescript (#439)\n\n* fix: [PIPE-23302]: Add eslint and prettier config to tailwindcss, react and typescript\r\n\r\n* fix: [PIPE-23302]: Add import resolver eslint plugin\r\n\r\n* fix: [PIPE-23302]: disable unresolved rule for import plugin\r\n\r\n* fix: [PIPE-23302]: Disable few lint rules temporarily\r\n\r\n* fix: [PIPE-23302]: Update lock file\r\n\r\n* fix: [PIPE-23302]: fix canary lint issues\r\n\r\n* fix: [PIPE-23302]: Fix views lint issues\r\n\r\n* fix: [PIPE-23302]: Canary prettier fix\r\n\r\n* fix: [PIPE-23302]: Fix lint issue in pipeline studio\r\n\r\n* fix: [PIPE-23302]: Fix lint issue in playground and views\r\n\r\n* fix: [PIPE-23302]: temporarily remove pretty script from playground and views\r\n\r\n* fix: [PIPE-23302]: temporarily remove pretty script from gitness',
      timestamp: 'Nov 14, 2024',
      user: {
        name: 'praneshg239'
      },
      sha: '1e126e7',
      path: '/canary/repos/canary/code//~/.eslintignore'
    },
    {
      id: '.eslintrc.json',
      type: 1,
      name: '.eslintrc.json',
      lastCommitMessage:
        'fix: [PIPE-23375]: Fix Eslint issues  (#449)\n\n* fix: [PIPE-23375]: Initial eslint addition changes\r\n\r\n* fix: [PIPE-23375]: Eslint canary changes\r\n\r\n* fix: [PIPE-23375]: Eslint playground fixes\r\n\r\n* fix: [PIPE-23375]: Eslint yaml-editor fixes\r\n\r\n* fix: [PIPE-23302]: Fix Eslint issues in unified pipeline\r\n\r\n* fix: [PIPE-23375]: Prettier fix\r\n\r\n* fix: [PIPE-23375]: Fix types\r\n\r\n* fix: [PIPE-23375]: Fix lint issues in views\r\n\r\n* fix: [PIPE-23375]: Fix type issues\r\n\r\n* fix: [PIPE-23375]: Update custom classnames rule as warn',
      timestamp: 'Nov 15, 2024',
      user: {
        name: 'praneshg239'
      },
      sha: 'f915fed',
      path: '/canary/repos/canary/code//~/.eslintrc.json'
    },
    {
      id: '.github',
      type: 0,
      name: '.github',
      lastCommitMessage:
        'chore: fix issue on forked repos (#470)\n\n* chore: fix issue on forked repos\r\n\r\nSigned-off-by: Calvin Lee <cjlee@ualberta.ca>\r\n\r\n* chore: fix issue on forked repos\r\n\r\nSigned-off-by: Calvin Lee <cjlee@ualberta.ca>\r\n\r\n---------\r\n\r\nSigned-off-by: Calvin Lee <cjlee@ualberta.ca>\r\nCo-authored-by: Calvin Lee <cjlee@ualberta.ca>',
      timestamp: 'Nov 22, 2024',
      user: {
        name: 'Calvin Lee'
      },
      sha: '280c1cf',
      path: '/canary/repos/canary/code//~/.github'
    },
    {
      id: '.gitignore',
      type: 1,
      name: '.gitignore',
      lastCommitMessage: 'yaml-editor initial commit',
      timestamp: 'Jul 26, 2024',
      user: {
        name: 'Srdjan Arsic'
      },
      sha: '90bc4f6',
      path: '/canary/repos/canary/code//~/.gitignore'
    },
    {
      id: '.husky',
      type: 0,
      name: '.husky',
      lastCommitMessage: 'add global precommit hooks',
      timestamp: 'Aug 16, 2024',
      user: {
        name: 'Abhinav Rastogi'
      },
      sha: 'd049c42',
      path: '/canary/repos/canary/code//~/.husky'
    },
    {
      id: '.prettierignore',
      type: 1,
      name: '.prettierignore',
      lastCommitMessage:
        'feat: [PIPE-23302]: Add eslint and prettier config to tailwindcss, react and typescript (#439)\n\n* fix: [PIPE-23302]: Add eslint and prettier config to tailwindcss, react and typescript\r\n\r\n* fix: [PIPE-23302]: Add import resolver eslint plugin\r\n\r\n* fix: [PIPE-23302]: disable unresolved rule for import plugin\r\n\r\n* fix: [PIPE-23302]: Disable few lint rules temporarily\r\n\r\n* fix: [PIPE-23302]: Update lock file\r\n\r\n* fix: [PIPE-23302]: fix canary lint issues\r\n\r\n* fix: [PIPE-23302]: Fix views lint issues\r\n\r\n* fix: [PIPE-23302]: Canary prettier fix\r\n\r\n* fix: [PIPE-23302]: Fix lint issue in pipeline studio\r\n\r\n* fix: [PIPE-23302]: Fix lint issue in playground and views\r\n\r\n* fix: [PIPE-23302]: temporarily remove pretty script from playground and views\r\n\r\n* fix: [PIPE-23302]: temporarily remove pretty script from gitness',
      timestamp: 'Nov 14, 2024',
      user: {
        name: 'praneshg239'
      },
      sha: '1e126e7',
      path: '/canary/repos/canary/code//~/.prettierignore'
    },
    {
      id: '.prettierrc.yml',
      type: 1,
      name: '.prettierrc.yml',
      lastCommitMessage:
        'fix: [PIPE-23403]: Add import sort prettier plugin to sort the imports (#453)\n\n* fix: [PIPE-23403]: Add import sort prettier plugin to sort the imports\r\n\r\n* fix: [PIPE-23403]: Update imports in files to follow sort import prettier plugin format\r\n\r\n* fix: [PIPE-23403]: Resolve conflicts in pnpm lock file\r\n\r\n* fix: [PIPE-23403]: Add bracketSameLine prettier rule as false\r\n\r\n* fix: [PIPE-23403]: Fix prettier format in all latest files',
      timestamp: 'Nov 21, 2024',
      user: {
        name: 'praneshg239'
      },
      sha: 'b8ee588',
      path: '/canary/repos/canary/code//~/.prettierrc.yml'
    },
    {
      id: '.vscode',
      type: 0,
      name: '.vscode',
      lastCommitMessage:
        'feat: [PIPE-23302]: Add eslint and prettier config to tailwindcss, react and typescript (#439)\n\n* fix: [PIPE-23302]: Add eslint and prettier config to tailwindcss, react and typescript\r\n\r\n* fix: [PIPE-23302]: Add import resolver eslint plugin\r\n\r\n* fix: [PIPE-23302]: disable unresolved rule for import plugin\r\n\r\n* fix: [PIPE-23302]: Disable few lint rules temporarily\r\n\r\n* fix: [PIPE-23302]: Update lock file\r\n\r\n* fix: [PIPE-23302]: fix canary lint issues\r\n\r\n* fix: [PIPE-23302]: Fix views lint issues\r\n\r\n* fix: [PIPE-23302]: Canary prettier fix\r\n\r\n* fix: [PIPE-23302]: Fix lint issue in pipeline studio\r\n\r\n* fix: [PIPE-23302]: Fix lint issue in playground and views\r\n\r\n* fix: [PIPE-23302]: temporarily remove pretty script from playground and views\r\n\r\n* fix: [PIPE-23302]: temporarily remove pretty script from gitness',
      timestamp: 'Nov 14, 2024',
      user: {
        name: 'praneshg239'
      },
      sha: '1e126e7',
      path: '/canary/repos/canary/code//~/.vscode'
    },
    {
      id: 'CODEOWNERS',
      type: 1,
      name: 'CODEOWNERS',
      lastCommitMessage: 'chore: [XD-42]: Add CODEOWNERS file (#455)',
      timestamp: 'Nov 19, 2024',
      user: {
        name: 'Kevin Nagurski'
      },
      sha: 'af5ebaf',
      path: '/canary/repos/canary/code//~/CODEOWNERS'
    },
    {
      id: 'CONTRIBUTOR_LICENSE_AGREEMENT.md',
      type: 1,
      name: 'CONTRIBUTOR_LICENSE_AGREEMENT.md',
      lastCommitMessage:
        'Add data repo list (#468)\n\n* feat: add repo-list-v2\r\n\r\n* feat: add pagination, fix types etc\r\n\r\n* fix: prettier\r\n\r\n* fix: prettier again :/',
      timestamp: 'Nov 22, 2024',
      user: {
        name: 'Sanskar'
      },
      sha: 'cdcc2d9',
      path: '/canary/repos/canary/code//~/CONTRIBUTOR_LICENSE_AGREEMENT.md'
    },
    {
      id: 'Dockerfile',
      type: 1,
      name: 'Dockerfile',
      lastCommitMessage:
        'chore: build docker image with gitness as base (#352)\n\n* chore: build docker image with gitness as base\r\n\r\n* remove unused nginx.conf\r\n\r\n* remove unused entrypoint.sh',
      timestamp: 'Oct 28, 2024',
      user: {
        name: 'Abhinav Rastogi'
      },
      sha: 'c968bb4',
      path: '/canary/repos/canary/code//~/Dockerfile'
    },
    {
      id: 'LICENSE',
      type: 1,
      name: 'LICENSE',
      lastCommitMessage: 'Add cli tooling',
      timestamp: 'Aug 30, 2023',
      user: {
        name: 'Tan Nhu'
      },
      sha: 'e291274',
      path: '/canary/repos/canary/code//~/LICENSE'
    },
    {
      id: 'README.md',
      type: 1,
      name: 'README.md',
      lastCommitMessage: 'remove svg-icon (#437)',
      timestamp: 'Nov 14, 2024',
      user: {
        name: 'Abhinav Rastogi'
      },
      sha: '7f7ab0e',
      path: '/canary/repos/canary/code//~/README.md'
    },
    {
      id: 'apps',
      type: 0,
      name: 'apps',
      lastCommitMessage: 'fix: branch/gitRef normalization from routes (#505)',
      timestamp: '3 hours ago',
      user: {
        name: 'Shaurya Kalia'
      },
      sha: 'ec92d11',
      path: '/canary/repos/canary/code//~/apps'
    },
    {
      id: 'charts',
      type: 0,
      name: 'charts',
      lastCommitMessage:
        'Add data repo list (#468)\n\n* feat: add repo-list-v2\r\n\r\n* feat: add pagination, fix types etc\r\n\r\n* fix: prettier\r\n\r\n* fix: prettier again :/',
      timestamp: 'Nov 22, 2024',
      user: {
        name: 'Sanskar'
      },
      sha: 'cdcc2d9',
      path: '/canary/repos/canary/code//~/charts'
    },
    {
      id: 'package.json',
      type: 1,
      name: 'package.json',
      lastCommitMessage:
        'fix: [PIPE-23403]: Add import sort prettier plugin to sort the imports (#453)\n\n* fix: [PIPE-23403]: Add import sort prettier plugin to sort the imports\r\n\r\n* fix: [PIPE-23403]: Update imports in files to follow sort import prettier plugin format\r\n\r\n* fix: [PIPE-23403]: Resolve conflicts in pnpm lock file\r\n\r\n* fix: [PIPE-23403]: Add bracketSameLine prettier rule as false\r\n\r\n* fix: [PIPE-23403]: Fix prettier format in all latest files',
      timestamp: 'Nov 21, 2024',
      user: {
        name: 'praneshg239'
      },
      sha: 'b8ee588',
      path: '/canary/repos/canary/code//~/package.json'
    },
    {
      id: 'packages',
      type: 0,
      name: 'packages',
      lastCommitMessage: 'fix: branch/gitRef normalization from routes (#505)',
      timestamp: '3 hours ago',
      user: {
        name: 'Shaurya Kalia'
      },
      sha: 'ec92d11',
      path: '/canary/repos/canary/code//~/packages'
    },
    {
      id: 'pnpm-lock.yaml',
      type: 1,
      name: 'pnpm-lock.yaml',
      lastCommitMessage: 'chore: [XD-45]: Remove playground package (#501)',
      timestamp: 'Nov 30, 2024',
      user: {
        name: 'Kevin Nagurski'
      },
      sha: 'a13c02e',
      path: '/canary/repos/canary/code//~/pnpm-lock.yaml'
    },
    {
      id: 'pnpm-workspace.yaml',
      type: 1,
      name: 'pnpm-workspace.yaml',
      lastCommitMessage: 'Restructure all packages into packages/ folder',
      timestamp: 'Jul 3, 2024',
      user: {
        name: 'Tan Nhu'
      },
      sha: 'd47847c',
      path: '/canary/repos/canary/code//~/pnpm-workspace.yaml'
    }
  ],
  latestCommitInfo: {
    user: {
      name: 'Shaurya Kalia'
    },
    lastCommitMessage: 'fix: branch/gitRef normalization from routes (#505)',
    timestamp: '3 hours ago',
    sha: 'ec92d11'
  },
  repository: {
    id: 1,
    parent_id: 1,
    identifier: 'canary',
    path: 'canary/canary',
    description: 'canary repo',
    created_by: 4,
    created: 1733226941233,
    updated: 1733226944383,
    size: 0,
    size_updated: 0,
    default_branch: 'main',
    fork_id: 0,
    num_forks: 0,
    num_pulls: 0,
    num_closed_pulls: 0,
    num_open_pulls: 0,
    num_merged_pulls: 0,
    state: 0,
    git_url: 'http://localhost:3000/git/canary/canary.git',
    git_ssh_url: 'ssh://git@localhost:3022/canary/canary.git',
    is_public: true,
    importing: false,
    uid: 'canary'
  } as RepoRepositoryOutput,
  jsonFileContent:
    '{\n' +
    '  "name": "harness-canary",\n' +
    '  "scripts": {\n' +
    '    "clean": "pnpm clean:dist && pnpm clean:node_modules",\n' +
    '    "clean:dist": "pnpm -r --parallel exec -- rimraf dist",\n' +
    '    "clean:node_modules": "pnpm -r --parallel exec -- rimraf node_modules",\n' +
    '    "deps": "pnpm -r i",\n' +
    '    "deps:clean": "pnpm clean:node_modules && pnpm deps",\n' +
    '    "build": "pnpm -r build",\n' +
    '    "lint": "pnpm -r lint",\n' +
    '    "pretty": "pnpm -r pretty",\n' +
    '    "typecheck": "pnpm -r typecheck",\n' +
    '    "publish:all": "pnpm publish -r --access public",\n' +
    '    "preinstall": "npx only-allow pnpm",\n' +
    '    "pre-commit": "pnpm run -r --workspace-concurrency=1 pre-commit"\n' +
    '  },\n' +
    '  "engines": {\n' +
    '    "node": ">=18.20.4"\n' +
    '  },\n' +
    '  "license": "Apache-2.0",\n' +
    '  "resolutions": {\n' +
    '    "@types/react": "^17.0.3"\n' +
    '  },\n' +
    '  "packageManager": "pnpm@9.5.0+sha512.140036830124618d624a2187b50d04289d5a087f326c9edfc0ccd733d76c4f52c3a313d4fc148794a2a9d81553016004e6742e8cf850670268a7387fc220c903",\n' +
    '  "devDependencies": {\n' +
    '    "@ianvs/prettier-plugin-sort-imports": "^4.4.0",\n' +
    '    "@typescript-eslint/eslint-plugin": "^6.5.0",\n' +
    '    "@typescript-eslint/parser": "^6.5.0",\n' +
    '    "eslint": "^8.57.1",\n' +
    '    "eslint-config-prettier": "^9.1.0",\n' +
    '    "eslint-import-resolver-typescript": "^3.6.3",\n' +
    '    "eslint-plugin-import": "^2.31.0",\n' +
    '    "eslint-plugin-jsx-a11y": "^6.10.2",\n' +
    '    "eslint-plugin-prettier": "^5.2.1",\n' +
    '    "eslint-plugin-react": "^7.37.2",\n' +
    '    "eslint-plugin-react-hooks": "^5.0.0",\n' +
    '    "eslint-plugin-tailwindcss": "^3.17.5",\n' +
    '    "husky": "^9.1.4",\n' +
    '    "lint-staged": "^15.2.9",\n' +
    '    "prettier": "^3.3.3",\n' +
    '    "prettier-plugin-tailwindcss": "^0.6.8",\n' +
    '    "rimraf": "^6.0.1",\n' +
    '    "typescript-eslint": "^8.14.0"\n' +
    '  }\n' +
    '}\n',
  blameJsonFileContent: [
    {
      fromLineNumber: 1,
      toLineNumber: 1,
      commitInfo: {
        sha: '6552c1a1f42b57776358e965f60702e372ea2a71',
        title: 'Initial commit',
        author: {
          identity: {
            name: 'Tan Nhu',
            email: 'tnhu@users.noreply.github.com'
          },
          when: 'Aug 24, 2023',
          initials: 'TN'
        }
      }
    },
    {
      fromLineNumber: 2,
      toLineNumber: 2,
      commitInfo: {
        sha: '1012ebe831c0072fb14bd51149e119ef074d56fb',
        title: 'Update package name',
        author: {
          identity: {
            name: 'Tan Nhu',
            email: 'tnhu@users.noreply.github.com'
          },
          when: 'Jul 3, 2024',
          initials: 'TN'
        }
      }
    },
    {
      fromLineNumber: 3,
      toLineNumber: 3,
      commitInfo: {
        sha: '6552c1a1f42b57776358e965f60702e372ea2a71',
        title: 'Initial commit',
        author: {
          identity: {
            name: 'Tan Nhu',
            email: 'tnhu@users.noreply.github.com'
          },
          when: 'Aug 24, 2023',
          initials: 'TN'
        }
      }
    },
    {
      fromLineNumber: 4,
      toLineNumber: 6,
      commitInfo: {
        sha: '1e126e7708718005b38c3deea629b0a08fe29435',
        title: 'feat: [PIPE-23302]: Add eslint and prettier config to tailwindcss, react and typescript (#439)',
        author: {
          identity: {
            name: 'praneshg239',
            email: '95267551+praneshg239@users.noreply.github.com'
          },
          when: 'Nov 15, 2024',
          initials: 'P'
        }
      }
    },
    {
      fromLineNumber: 7,
      toLineNumber: 7,
      commitInfo: {
        sha: 'e291274f0782c9029625e13f70366928f5476350',
        title: 'Add cli tooling',
        author: {
          identity: {
            name: 'Tan Nhu',
            email: 'tnhu@users.noreply.github.com'
          },
          when: 'Aug 30, 2023',
          initials: 'TN'
        }
      }
    },
    {
      fromLineNumber: 8,
      toLineNumber: 8,
      commitInfo: {
        sha: '1e126e7708718005b38c3deea629b0a08fe29435',
        title: 'feat: [PIPE-23302]: Add eslint and prettier config to tailwindcss, react and typescript (#439)',
        author: {
          identity: {
            name: 'praneshg239',
            email: '95267551+praneshg239@users.noreply.github.com'
          },
          when: 'Nov 15, 2024',
          initials: 'P'
        }
      }
    },
    {
      fromLineNumber: 9,
      toLineNumber: 9,
      commitInfo: {
        sha: '6552c1a1f42b57776358e965f60702e372ea2a71',
        title: 'Initial commit',
        author: {
          identity: {
            name: 'Tan Nhu',
            email: 'tnhu@users.noreply.github.com'
          },
          when: 'Aug 24, 2023',
          initials: 'TN'
        }
      }
    },
    {
      fromLineNumber: 10,
      toLineNumber: 10,
      commitInfo: {
        sha: 'ee73c265f1883b87fea951d039ab09cb3b73b5d7',
        title: 'Reuse eslintrc and prettierrc across workspace',
        author: {
          identity: {
            name: 'Tan Nhu',
            email: 'tnhu@users.noreply.github.com'
          },
          when: 'Aug 24, 2023',
          initials: 'TN'
        }
      }
    },
    {
      fromLineNumber: 11,
      toLineNumber: 11,
      commitInfo: {
        sha: 'd049c4206ee31b82ec54d80a0928058ecf9c9403',
        title: 'add global precommit hooks',
        author: {
          identity: {
            name: 'Abhinav Rastogi',
            email: 'abhinav.rastogi@harness.io'
          },
          when: 'Aug 17, 2024',
          initials: 'AR'
        }
      }
    },
    {
      fromLineNumber: 12,
      toLineNumber: 12,
      commitInfo: {
        sha: '0ce8abdad37c1289749469dd0351aa7bc1d2f0fe',
        title: 'fix: pr checks. add ts (#361)',
        author: {
          identity: {
            name: 'Abhinav Rastogi',
            email: 'abhinav.rastogi@harness.io'
          },
          when: 'Nov 2, 2024',
          initials: 'AR'
        }
      }
    },
    {
      fromLineNumber: 13,
      toLineNumber: 13,
      commitInfo: {
        sha: 'ee01b4f031f17d3545895f684f498d53ca3cabbc',
        title: 'Update REAME',
        author: {
          identity: {
            name: 'Tan Nhu',
            email: 'tnhu@users.noreply.github.com'
          },
          when: 'Jul 11, 2024',
          initials: 'TN'
        }
      }
    },
    {
      fromLineNumber: 14,
      toLineNumber: 14,
      commitInfo: {
        sha: 'a47a95f6a6848fc12361d3a44dd4f379259be49c',
        title: 'Migrate unified-pipeline to vite (#40)',
        author: {
          identity: {
            name: 'Tan Nhu',
            email: 'tan@harness.io'
          },
          when: 'Jul 26, 2024',
          initials: 'TN'
        }
      }
    },
    {
      fromLineNumber: 15,
      toLineNumber: 15,
      commitInfo: {
        sha: '8cdbff8ccaea7cde5f89cecba33351f90ac1cc90',
        title: 'Add lint staged to all packages and make its concurrency as 1 (#460)',
        author: {
          identity: {
            name: 'praneshg239',
            email: '95267551+praneshg239@users.noreply.github.com'
          },
          when: 'Nov 20, 2024',
          initials: 'P'
        }
      }
    },
    {
      fromLineNumber: 16,
      toLineNumber: 17,
      commitInfo: {
        sha: 'e291274f0782c9029625e13f70366928f5476350',
        title: 'Add cli tooling',
        author: {
          identity: {
            name: 'Tan Nhu',
            email: 'tnhu@users.noreply.github.com'
          },
          when: 'Aug 30, 2023',
          initials: 'TN'
        }
      }
    },
    {
      fromLineNumber: 18,
      toLineNumber: 18,
      commitInfo: {
        sha: 'c8dc164e2f22c3f60acd4a3c62898f5770170fec',
        title: 'Require node 18.20.4 or newer',
        author: {
          identity: {
            name: 'Tan Nhu',
            email: 'tnhu@users.noreply.github.com'
          },
          when: 'Jul 20, 2024',
          initials: 'TN'
        }
      }
    },
    {
      fromLineNumber: 19,
      toLineNumber: 19,
      commitInfo: {
        sha: 'e291274f0782c9029625e13f70366928f5476350',
        title: 'Add cli tooling',
        author: {
          identity: {
            name: 'Tan Nhu',
            email: 'tnhu@users.noreply.github.com'
          },
          when: 'Aug 30, 2023',
          initials: 'TN'
        }
      }
    },
    {
      fromLineNumber: 20,
      toLineNumber: 22,
      commitInfo: {
        sha: '793719dc6ae27ccf4e5a51918a6260a367df120e',
        title: 'Fixing canary build',
        author: {
          identity: {
            name: 'Tan Nhu',
            email: 'tnhu@users.noreply.github.com'
          },
          when: 'Jul 10, 2024',
          initials: 'TN'
        }
      }
    },
    {
      fromLineNumber: 23,
      toLineNumber: 23,
      commitInfo: {
        sha: 'ff363638d010719a8b950a3752b42ff8b0da2286',
        title: 'add design system and pages to storybook',
        author: {
          identity: {
            name: 'joetaylorland',
            email: 'accounts+github@joetaylor.net'
          },
          when: 'Jul 17, 2024',
          initials: 'J'
        }
      }
    },
    {
      fromLineNumber: 24,
      toLineNumber: 25,
      commitInfo: {
        sha: 'd049c4206ee31b82ec54d80a0928058ecf9c9403',
        title: 'add global precommit hooks',
        author: {
          identity: {
            name: 'Abhinav Rastogi',
            email: 'abhinav.rastogi@harness.io'
          },
          when: 'Aug 17, 2024',
          initials: 'AR'
        }
      }
    },
    {
      fromLineNumber: 26,
      toLineNumber: 26,
      commitInfo: {
        sha: 'b8ee588c70aa8ff7ae8c7148239d7af494a91db8',
        title: 'fix: [PIPE-23403]: Add import sort prettier plugin to sort the imports (#453)',
        author: {
          identity: {
            name: 'praneshg239',
            email: '95267551+praneshg239@users.noreply.github.com'
          },
          when: 'Nov 21, 2024',
          initials: 'P'
        }
      }
    },
    {
      fromLineNumber: 27,
      toLineNumber: 37,
      commitInfo: {
        sha: '1e126e7708718005b38c3deea629b0a08fe29435',
        title: 'feat: [PIPE-23302]: Add eslint and prettier config to tailwindcss, react and typescript (#439)',
        author: {
          identity: {
            name: 'praneshg239',
            email: '95267551+praneshg239@users.noreply.github.com'
          },
          when: 'Nov 15, 2024',
          initials: 'P'
        }
      }
    },
    {
      fromLineNumber: 38,
      toLineNumber: 38,
      commitInfo: {
        sha: 'd049c4206ee31b82ec54d80a0928058ecf9c9403',
        title: 'add global precommit hooks',
        author: {
          identity: {
            name: 'Abhinav Rastogi',
            email: 'abhinav.rastogi@harness.io'
          },
          when: 'Aug 17, 2024',
          initials: 'AR'
        }
      }
    },
    {
      fromLineNumber: 39,
      toLineNumber: 43,
      commitInfo: {
        sha: '1e126e7708718005b38c3deea629b0a08fe29435',
        title: 'feat: [PIPE-23302]: Add eslint and prettier config to tailwindcss, react and typescript (#439)',
        author: {
          identity: {
            name: 'praneshg239',
            email: '95267551+praneshg239@users.noreply.github.com'
          },
          when: 'Nov 15, 2024',
          initials: 'P'
        }
      }
    },
    {
      fromLineNumber: 44,
      toLineNumber: 44,
      commitInfo: {
        sha: 'd049c4206ee31b82ec54d80a0928058ecf9c9403',
        title: 'add global precommit hooks',
        author: {
          identity: {
            name: 'Abhinav Rastogi',
            email: 'abhinav.rastogi@harness.io'
          },
          when: 'Aug 17, 2024',
          initials: 'AR'
        }
      }
    },
    {
      fromLineNumber: 45,
      toLineNumber: 45,
      commitInfo: {
        sha: '6552c1a1f42b57776358e965f60702e372ea2a71',
        title: 'Initial commit',
        author: {
          identity: {
            name: 'Tan Nhu',
            email: 'tnhu@users.noreply.github.com'
          },
          when: 'Aug 24, 2023',
          initials: 'TN'
        }
      }
    }
  ],
  markdownFileContent:
    '# Canary\n' +
    '\n' +
    "Welcome to the Harness Canary monorepo! This repository contains multiple projects for Harness' next generation Unified UI.\n" +
    '\n' +
    '# Repository Structure\n' +
    '\n' +
    '- [packages](./packages/): Contains projects for Harness next generation Unified UI projects. They are published as npm packages.\n' +
    '- [apps](./apps/): Contains deployable/executable standalone applications.\n' +
    '\n' +
    '# Projects\n' +
    '\n' +
    '- [@harnessio/canary](./packages/canary/) - Harness Canary UI components library built on top of [Radix UI](https://www.radix-ui.com/) and [ShadCN UI](https://ui.shadcn.com/).\n' +
    '- [@harnessio/unified-pipeline](./packages/unified-pipeline/) - Harness Unified Pipeline library.\n' +
    '- [@harnessio/views](./packages/views/) - Harness Unified UI View Fragments.\n' +
    '\n' +
    '# Getting Started\n' +
    '\n' +
    '![Placeholder 1](https://via.placeholder.com/150)\n' +
    '\n' +
    '![Placeholder 2](https://via.placeholder.com/350)\n' +
    '\n' +
    '![Placeholder 3](https://via.placeholder.com/750)\n' +
    '\n' +
    '## Prerequisites\n' +
    '\n' +
    'Before getting started with this repository, ensure you have the following prerequisites:\n' +
    '\n' +
    "**Node.js**: You'll need `Node` version `18.20.4` or newer.\n" +
    'We use `pnpm` to manage this monorepo. To install `pnpm`, visit the [pnpm installation page](https://pnpm.io/installation).\n' +
    '\n' +
    '## Installation\n' +
    '\n' +
    'To set up the necessary dependencies for this monorepo, follow these steps:\n' +
    '\n' +
    '1. Clone this repository to your local machine.\n' +
    '2. Open your terminal and navigate to the root folder of the cloned repository.\n' +
    '3. Run the following command to install dependencies:\n' +
    '\n' +
    '```sh\n' +
    'pnpm install\n' +
    'pnpm deps\n' +
    '```\n' +
    '\n' +
    '## Building\n' +
    '\n' +
    'To build all projects, execute the following command from the repository root folder:\n' +
    '\n' +
    '```sh\n' +
    'pnpm build\n' +
    '```\n' +
    '\n' +
    'Or you can build individual project by running `pnpm run build` from each project folder root folder.\n' +
    '\n' +
    '## Publishing\n' +
    '\n' +
    'To publish all packages, run:\n' +
    '\n' +
    '```sh\n' +
    'pnpm publish:all\n' +
    '```\n' +
    '\n' +
    "You can also publish individual packages by running `pnpm publish` from each project folder. Note that you'll need to authenticate youself with `npm` before publishing.\n" +
    '\n' +
    'DO NOT publish packages using `npm`. Use `pnpm` instead.\n' +
    '\n' +
    '## Note for Visual Studio Code Users\n' +
    '\n' +
    "If you're using Visual Studio Code (VSCode) and encounter issues with package recognition or type definitions after rebuilding the workspace, follow these steps to resolve them:\n" +
    '\n' +
    '1. Open VSCode.\n' +
    '2. Press `Cmd-Shift-P` to open the command palette.\n' +
    '3. Type `Reload Project` and select it from the list.\n' +
    '\n' +
    'This process helps to resolve any issues related to package recognition and type checking.\n' +
    '\n' +
    "If you have any questions or encounter any problems, please don't hesitate to reach out for assistance. Happy coding!\n" +
    '\n' +
    '## License\n' +
    '\n' +
    'Apache License 2.0, see [LICENSE](https://github.com/harness/gitness/blob/main/LICENSE).',
  pathParts: [
    {
      path: 'canary',
      parentPath: '/pixel-point-dev/repos/canary/code/main'
    },
    {
      path: 'README.md',
      parentPath: '/pixel-point-dev/repos/canary/code/main/~/README.md'
    }
  ]
}
