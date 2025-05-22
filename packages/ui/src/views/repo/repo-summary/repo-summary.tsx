import {
  Button,
  ButtonGroup,
  Icon,
  ListActions,
  MarkdownViewer,
  SearchFiles,
  SkeletonList,
  Spacer,
  StackedList,
  Text
} from '@/components'
import { useRouterContext, useTranslation } from '@/context'
import { formatDate } from '@/utils'
import { BranchSelectorListItem, CommitDivergenceType, RepoFile, SandboxLayout } from '@/views'
import { BranchInfoBar, BranchSelectorTab, Summary } from '@/views/repo/components'

import { CloneRepoDialog } from './components/clone-repo-dialog'
import SummaryPanel from './components/summary-panel'
import { RepoEmptyView } from './repo-empty-view'

interface RoutingProps {
  toRepoFiles: () => string
  toCommitDetails?: ({ sha }: { sha: string }) => string
  toRepoCommits: () => string
  toRepoBranches: () => string
  toRepoTags: () => string
  toRepoPullRequests: () => string
  navigateToProfileKeys: () => void
}

export interface RepoSummaryViewProps extends Partial<RoutingProps> {
  repoId: string
  spaceId: string
  selectedBranchOrTag: BranchSelectorListItem | null
  loading: boolean
  filesList: string[]
  navigateToFile: (path: string) => void
  repository:
    | {
        git_ssh_url?: string
        git_url?: string
        description?: string
        created?: number
        default_branch?: string
        is_public?: boolean
      }
    | undefined
  handleCreateToken: () => void
  // TODO: fix this
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  repoEntryPathToFileTypeMap: Map<string, any>
  files: RepoFile[]
  decodedReadmeContent: string
  summaryDetails: {
    default_branch_commit_count?: number
    branch_count?: number
    tag_count?: number
    pull_req_summary?: { open_count: number } | undefined
  }
  gitRef?: string
  latestCommitInfo?: {
    userName: string
    avatarUrl?: string
    message: string
    timestamp: string
    sha: string | null
  }
  saveDescription: (description: string) => void
  updateRepoError?: string
  isEditDialogOpen: boolean
  setEditDialogOpen: (value: boolean) => void
  currentBranchDivergence: CommitDivergenceType
  searchQuery: string
  setSearchQuery: (query: string) => void
  renderSidebarComponent?: React.ReactNode
  isRepoEmpty?: boolean
  branchSelectorRenderer: React.ReactElement
  toRepoFileDetails?: ({ path }: { path: string }) => string
  tokenGenerationError?: string | null
  refType?: BranchSelectorTab
}

export function RepoSummaryView({
  repoId,
  spaceId,
  selectedBranchOrTag,
  loading,
  filesList,
  navigateToFile,
  repository,
  files,
  decodedReadmeContent,
  summaryDetails: { default_branch_commit_count = 0, branch_count = 0, tag_count = 0, pull_req_summary },
  gitRef,
  latestCommitInfo,
  saveDescription,
  updateRepoError,
  isEditDialogOpen,
  setEditDialogOpen,
  currentBranchDivergence,
  handleCreateToken,
  toRepoFiles,
  toCommitDetails,
  navigateToProfileKeys,
  renderSidebarComponent,
  isRepoEmpty,
  branchSelectorRenderer,
  toRepoFileDetails,
  tokenGenerationError,
  refType = BranchSelectorTab.BRANCHES,
  ...props
}: RepoSummaryViewProps) {
  const { Link } = useRouterContext()
  const { t } = useTranslation()

  if (loading) {
    return (
      <SandboxLayout.Main fullWidth>
        <SandboxLayout.Content>
          <SkeletonList />
        </SandboxLayout.Content>
      </SandboxLayout.Main>
    )
  }

  if (isRepoEmpty) {
    return (
      <RepoEmptyView
        sshUrl={repository?.git_ssh_url ?? 'could not fetch url'}
        httpUrl={repository?.git_url ?? 'could not fetch url'}
        repoName={repoId}
        projName={spaceId}
        gitRef={gitRef || selectedBranchOrTag?.name || ''}
        handleCreateToken={handleCreateToken}
        navigateToProfileKeys={navigateToProfileKeys}
      />
    )
  }

  return (
    <SandboxLayout.Main fullWidth>
      <SandboxLayout.Columns columnWidths="1fr 256px">
        <SandboxLayout.Column className="w-full">
          <SandboxLayout.Content className="pl-6">
            {/*
              TODO: Implement proper recent push detection logic:
              1. Backend needs to:
                - Track and store information about recent pushes
                - Provide an API endpoint that returns array of recent pushes:
                  {
                    recentPushes: Array<{
                      branchName: string
                      pushedAt: string // ISO timestamp
                      userId: string // to show banner only to user who made the push
                    }>
                  }
                - Consider:
                  * Clearing push data after PR is created
                  * Clearing push data after 24h
                  * Limiting number of shown pushes (e.g. max 3 most recent)
                  * Sorting pushes by timestamp (newest first)

              2. Frontend needs to:
                - Fetch recent pushes data from the API
                - Filter pushes to show only where:
                  * Current user is the one who made the push
                  * Push was made less than 24h ago
                  * No PR has been created from this branch yet
                - Format timestamps using timeAgoFromISOTime
                - Remove mock data below

                Example:
                {selectedBranchTag.name !== repository?.default_branch && (
                  <>
                    <Spacer size={6} />
                  </>
                )}
            */}
            <ListActions.Root>
              <ListActions.Left>
                <ButtonGroup className="gap-2.5">
                  {branchSelectorRenderer}
                  <SearchFiles navigateToFile={navigateToFile} filesList={filesList} />
                </ButtonGroup>
              </ListActions.Left>
              <ListActions.Right>
                <ButtonGroup className="gap-2.5">
                  {refType === BranchSelectorTab.BRANCHES ? (
                    <Button variant="outline" asChild>
                      <Link
                        className="relative grid grid-cols-[auto_1fr] items-center gap-1.5"
                        to={`${spaceId ? `/${spaceId}` : ''}/repos/${repoId}/code/new/${gitRef || selectedBranchOrTag?.name || ''}/~/`}
                      >
                        <Icon name="plus" size={12} />
                        <span className="truncate">{t('views:repos.create-new-file-no-plus', 'Create new file')}</span>
                      </Link>
                    </Button>
                  ) : null}
                  <CloneRepoDialog
                    sshUrl={repository?.git_ssh_url}
                    httpsUrl={repository?.git_url ?? 'could not fetch url'}
                    handleCreateToken={handleCreateToken}
                    tokenGenerationError={tokenGenerationError}
                  />
                </ButtonGroup>
              </ListActions.Right>
            </ListActions.Root>
            {selectedBranchOrTag?.name !== repository?.default_branch && (
              <>
                <Spacer size={4} />
                <BranchInfoBar
                  // useRepoBranchesStore={useRepoBranchesStore}
                  defaultBranchName={repository?.default_branch}
                  repoId={repoId}
                  spaceId={spaceId}
                  selectedBranchTag={selectedBranchOrTag ?? { name: '', sha: '' }}
                  currentBranchDivergence={{
                    ahead: currentBranchDivergence?.ahead || 0,
                    behind: currentBranchDivergence?.behind || 0
                  }}
                  refType={refType}
                />
              </>
            )}
            <Spacer size={5} />
            <Summary
              toCommitDetails={toCommitDetails}
              latestFile={{
                user: { name: latestCommitInfo?.userName || '', avatarUrl: latestCommitInfo?.avatarUrl },
                lastCommitMessage: latestCommitInfo?.message || '',
                timestamp: latestCommitInfo?.timestamp || '',
                sha: latestCommitInfo?.sha || ''
              }}
              files={files}
              toRepoFileDetails={toRepoFileDetails}
              hideHeader
            />
            <Spacer size={5} />
            <StackedList.Root onlyTopRounded borderBackground>
              <StackedList.Item className="py-2" isHeader disableHover>
                <StackedList.Field
                  title={<Text color="tertiaryBackground">{t('views:repos.readme', 'README.md')}</Text>}
                />
                <StackedList.Field
                  right
                  title={
                    <Button variant="outline" iconOnly asChild>
                      <Link to={`${toRepoFiles?.()}/edit/${gitRef || selectedBranchOrTag?.name}/~/README.md`}>
                        <Icon name="edit-pen" size={16} className="text-icons-3" />
                        <span className="sr-only">{t('views:repos.editReadme', 'Edit README.md')}</span>
                      </Link>
                    </Button>
                  }
                />
              </StackedList.Item>
            </StackedList.Root>
            <MarkdownViewer source={decodedReadmeContent || ''} withBorderWrapper />
          </SandboxLayout.Content>
        </SandboxLayout.Column>
        <SandboxLayout.Column>
          <SandboxLayout.Content className="pl-0">
            <SummaryPanel
              title={t('views:repos.summary', 'Summary')}
              details={[
                {
                  id: '0',
                  name: t('views:repos.commits', 'Commits'),
                  count: default_branch_commit_count,
                  iconName: 'tube-sign',
                  to: props.toRepoCommits?.() ?? '#'
                },
                {
                  id: '1',
                  name: t('views:repos.branches', 'Branches'),
                  count: branch_count,
                  iconName: 'branch',
                  to: props.toRepoBranches?.() ?? '#'
                },
                {
                  id: '2',
                  name: t('views:repos.tags', 'Tags'),
                  count: tag_count,
                  iconName: 'tag',
                  to: props.toRepoTags?.() ?? '#'
                },
                {
                  id: '3',
                  name: t('views:repos.openPullReq', 'Open pull requests'),
                  count: pull_req_summary?.open_count || 0,
                  iconName: 'open-pr',
                  to: props.toRepoPullRequests?.() ?? '#'
                }
              ]}
              timestamp={formatDate(repository?.created || '')}
              description={repository?.description}
              saveDescription={saveDescription}
              updateRepoError={updateRepoError}
              isEditDialogOpen={isEditDialogOpen}
              setEditDialogOpen={setEditDialogOpen}
              is_public={repository?.is_public}
            />
            {renderSidebarComponent}
          </SandboxLayout.Content>
        </SandboxLayout.Column>
      </SandboxLayout.Columns>
    </SandboxLayout.Main>
  )
}
