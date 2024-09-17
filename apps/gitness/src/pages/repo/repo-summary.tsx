import { useMemo, useState } from 'react'
import { Button, ButtonGroup, Icon, ListActions, SearchBox, Spacer, StackedList, Text } from '@harnessio/canary'
import {
  Floating1ColumnLayout,
  FullWidth2ColumnLayout,
  RepoSummaryPanel,
  BranchChooser,
  SkeletonList,
  NoSearchResults,
  Summary,
  NoData
} from '@harnessio/playground'
import {
  useListBranchesQuery,
  useSummaryQuery,
  TypesRepositorySummary,
  useGetContentQuery
} from '@harnessio/code-service-client'
import { useGetRepoRef } from '../../framework/hooks/useGetRepoPath'
import { decodeGitContent, normalizeGitRef } from '../../utils/git-utils'

export const RepoSummary: React.FC = () => {
  const [loadState] = useState('data-loaded')
  const repoRef = useGetRepoRef()
  const { data: branches } = useListBranchesQuery({
    repo_ref: repoRef,
    queryParams: { include_commit: false, sort: 'date', order: 'asc', limit: 20, page: 1, query: '' }
  })

  const { data: repoSummary } = useSummaryQuery({
    repo_ref: repoRef,
    queryParams: { include_commit: false, sort: 'date', order: 'asc', limit: 20, page: 1, query: '' }
  })

  const { branch_count, default_branch_commit_count, pull_req_summary, tag_count } =
    // @ts-expect-error remove "@ts-expect-error" once type issue for "content" is resolved
    (repoSummary?.content || {}) as TypesRepositorySummary

  const { data: yamlContentRaw } = useGetContentQuery({
    path: 'README.md',
    repo_ref: repoRef,
    queryParams: { include_commit: false, git_ref: normalizeGitRef('master') ?? '' }
  })

  // @ts-expect-error remove "@ts-expect-error" once type issue for "content" is resolved
  const readmeContentRaw = yamlContentRaw?.content?.content?.data

  const decodedReadmeContent = useMemo(() => {
    return decodeGitContent(readmeContentRaw)
  }, [readmeContentRaw])

  const renderListContent = () => {
    switch (loadState) {
      case 'data-loaded':
        return <Summary files={[]} />
      case 'loading':
        return <SkeletonList />
      case 'no-search-matches':
        return (
          <NoSearchResults
            iconName="no-search-magnifying-glass"
            title="No search results"
            description={['Check your spelling and filter options,', 'or search for a different keyword.']}
            primaryButton={{ label: 'Clear search' }}
            secondaryButton={{ label: 'Clear filters' }}
          />
        )
      default:
        return null
    }
  }

  if (loadState == 'no-data') {
    return (
      <>
        <NoData
          insideTabView
          iconName="no-data-folder"
          title="No pipelines yet"
          description={['There are no files in this repository yet.', 'Create new or import an existing file.']}
          primaryButton={{ label: 'Create file' }}
          secondaryButton={{ label: 'Import file' }}
        />
      </>
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
                  <BranchChooser
                    name={'main'}
                    branchList={// @ts-expect-error remove "@ts-expect-error" once type issue for "content" is resolved
                    branches?.content?.map(item => ({
                      name: item?.name
                    }))}
                  />
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
              {/* Need to render this decoded content in a markdown viewer */}
              <StackedList.Item disableHover>{decodedReadmeContent}</StackedList.Item>
            </StackedList.Root>
          </>
        }
        rightColumn={
          <RepoSummaryPanel
            title="Summary"
            timestamp={'May 6, 2024'}
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
