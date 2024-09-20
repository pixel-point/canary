import { useEffect, useMemo, useState } from 'react'
import { Button, ButtonGroup, Icon, ListActions, SearchBox, Spacer, StackedList, Text } from '@harnessio/canary'
import {
  Floating1ColumnLayout,
  FullWidth2ColumnLayout,
  RepoSummaryPanel,
  BranchSelector,
  SkeletonList,
  Summary,
  FileProps,
  SummaryItemType,
  NoData,
  MarkdownViewer
} from '@harnessio/playground'
import {
  useListBranchesQuery,
  useSummaryQuery,
  useGetContentQuery,
  useFindRepositoryQuery,
  pathDetails,
  RepoPathsDetailsOutput,
  GitPathDetails,
  OpenapiGetContentOutput,
  OpenapiContentInfo
} from '@harnessio/code-service-client'
import { useGetRepoRef } from '../../framework/hooks/useGetRepoPath'
import { decodeGitContent, getTrimmedSha, normalizeGitRef } from '../../utils/git-utils'
import { timeAgo } from '../pipeline-edit/utils/time-utils'

export const RepoSummary: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState<FileProps[]>([])
  const repoRef = useGetRepoRef()

  const { data: repository } = useFindRepositoryQuery({ repo_ref: repoRef })
  const defaultBranch = repository?.default_branch
  const normalizedGitRef = normalizeGitRef(defaultBranch)

  const { data: branches } = useListBranchesQuery({
    repo_ref: repoRef,
    queryParams: { include_commit: false, sort: 'date', order: 'asc', limit: 20, page: 1, query: '' }
  })

  const branchList = branches?.map(item => ({
    name: item?.name
  }))

  const { data: repoSummary } = useSummaryQuery({
    repo_ref: repoRef,
    queryParams: { include_commit: false, sort: 'date', order: 'asc', limit: 20, page: 1, query: '' }
  })

  const { branch_count, default_branch_commit_count, pull_req_summary, tag_count } = repoSummary || {}

  const { data: readmeContent } = useGetContentQuery({
    path: 'README.md',
    repo_ref: repoRef,
    queryParams: { include_commit: false, git_ref: normalizedGitRef }
  })

  const decodedReadmeContent = useMemo(() => {
    return decodeGitContent(readmeContent?.content?.data)
  }, [readmeContent])

  const { data: repoDetails } = useGetContentQuery({
    path: '',
    repo_ref: repoRef,
    queryParams: { include_commit: true, git_ref: normalizedGitRef }
  })

  const repoEntryPathToFileTypeMap = useMemo((): Map<string, OpenapiGetContentOutput['type']> => {
    if (repoDetails?.content?.entries?.length === 0) return new Map()
    const nonEmtpyPathEntries = repoDetails?.content?.entries?.filter(entry => !!entry.path) || []
    return new Map(nonEmtpyPathEntries.map((entry: OpenapiContentInfo) => [entry?.path ? entry.path : '', entry.type]))
  }, [repoDetails?.content?.entries])

  const getSummaryItemType = (type: OpenapiGetContentOutput['type']): SummaryItemType => {
    if (type === 'dir') {
      return SummaryItemType.Folder
    }
    return SummaryItemType.File
  }

  useEffect(() => {
    setLoading(true)
    if (repoEntryPathToFileTypeMap.size > 0) {
      pathDetails({
        queryParams: { git_ref: normalizedGitRef },
        body: { paths: Array.from(repoEntryPathToFileTypeMap.keys()) },
        repo_ref: repoRef
      })
        .then((response: RepoPathsDetailsOutput) => {
          if (response?.details && response.details.length > 0) {
            setFiles(
              response.details.map(
                (item: GitPathDetails) =>
                  ({
                    id: item?.path || '',
                    type: item?.path
                      ? getSummaryItemType(repoEntryPathToFileTypeMap.get(item.path))
                      : SummaryItemType.File,
                    name: item?.path || '',
                    lastCommitMessage: item?.last_commit?.message || '',
                    timestamp: item?.last_commit?.author?.when ? timeAgo(item.last_commit.author.when) : '',
                    user: { name: item?.last_commit?.author?.identity?.name },
                    sha: item?.last_commit?.sha && getTrimmedSha(item.last_commit.sha)
                  }) as FileProps
              )
            )
          }
        })
        .catch()
        .finally(() => {
          setLoading(false)
        })
    }
  }, [repoEntryPathToFileTypeMap.size, repoRef])

  const renderListContent = () => {
    if (loading) return <SkeletonList />

    if (!loading && repoEntryPathToFileTypeMap.size > 0) {
      const { author, message, sha } = repoDetails?.latest_commit || {}
      return (
        <Summary
          latestFile={{
            user: {
              name: author?.identity?.name || ''
            },
            lastCommitMessage: message || '',
            timestamp: author?.when && timeAgo(author.when),
            sha: sha && getTrimmedSha(sha)
          }}
          files={files}
        />
      )
    } else
      return (
        <NoData
          insideTabView
          iconName="no-data-folder"
          title="No files yet"
          description={['There are no files in this repository yet.', 'Create new or import an existing file.']}
          primaryButton={{ label: 'Create file' }}
          secondaryButton={{ label: 'Import file' }}
        />
      )
  }
  return (
    <Floating1ColumnLayout>
      <FullWidth2ColumnLayout
        leftColumn={
          <>
            <Spacer size={6} />
            <ListActions.Root>
              <ListActions.Left>
                <ButtonGroup.Root>
                  <BranchSelector name={defaultBranch} branchList={branchList} />
                  <SearchBox.Root placeholder="Search" />
                </ButtonGroup.Root>
              </ListActions.Left>
              <ListActions.Right>
                <ButtonGroup.Root>
                  <Button variant="outline">
                    Add file&nbsp;&nbsp;
                    <Icon name="chevron-down" size={11} className="chevron-down" />
                  </Button>
                  <Button variant="default">Clone repository</Button>
                </ButtonGroup.Root>
              </ListActions.Right>
            </ListActions.Root>
            <Spacer size={5} />
            {renderListContent()}
            <Spacer size={12} />
            <StackedList.Root>
              <StackedList.Item isHeader disableHover>
                <StackedList.Field title={<Text color="tertiaryBackground">README.md</Text>} />
              </StackedList.Item>
              <StackedList.Item disableHover>
                <MarkdownViewer source={decodedReadmeContent || ''} />
              </StackedList.Item>
            </StackedList.Root>
          </>
        }
        rightColumn={
          <RepoSummaryPanel
            title="Summary"
            details={[
              {
                id: '0',
                name: 'Commits',
                count: default_branch_commit_count || 0,
                iconName: 'tube-sign'
              },
              {
                id: '1',
                name: 'Branches',
                count: branch_count || 0,
                iconName: 'branch'
              },
              {
                id: '2',
                name: 'Tags',
                count: tag_count || 0,
                iconName: 'tag'
              },
              {
                id: '3',
                name: 'Open pull requests',
                count: pull_req_summary?.open_count || 0,
                iconName: 'open-pr'
              }
            ]}
          />
        }
      />
    </Floating1ColumnLayout>
  )
}