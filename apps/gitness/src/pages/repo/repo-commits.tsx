import { ListActions, Spacer, Text } from '@harnessio/canary'
import { BranchSelector, NoData, PaddingListLayout, PullRequestCommits, SkeletonList } from '@harnessio/playground'
import { useGetRepoRef } from '../../framework/hooks/useGetRepoPath'
import { useListBranchesQuery, useListCommitsQuery } from '@harnessio/code-service-client'

const filterOptions = [{ name: 'Filter option 1' }, { name: 'Filter option 2' }, { name: 'Filter option 3' }]
const sortOptions = [{ name: 'Sort option 1' }, { name: 'Sort option 2' }, { name: 'Sort option 3' }]

export default function RepoCommitsPage() {
  const repoRef = useGetRepoRef()

  const { data: commitData, isFetching: isFetchingCommits } = useListCommitsQuery({
    repo_ref: repoRef,
    queryParams: { page: 0, limit: 10 }
  })
  const { data: branches, isFetching: isFetchingBranches } = useListBranchesQuery({
    repo_ref: repoRef,
    queryParams: { page: 0, limit: 10 }
  })

  const renderContent = () => {
    if (isFetchingCommits) {
      return <SkeletonList />
    }
    // @ts-expect-error remove "@ts-expect-error" once type issue for "content" is resolved
    if (commitData?.content?.commits?.length) {
      return (
        <PullRequestCommits
          // @ts-expect-error remove "@ts-expect-error" once type issue for "content" is resolved
          data={commitData?.content.commits.map((item: TypesCommit) => ({
            sha: item.sha,
            parent_shas: item.parent_shas,
            title: item.title,
            message: item.message,
            author: item.author,
            committer: item.committer
          }))}
        />
      )
    } else {
      return <NoData iconName="no-data-folder" title="No commits yet" description={['There are no commits yet.']} />
    }
  }
  return (
    <PaddingListLayout spaceTop={false}>
      <Spacer size={2} />
      <Text size={5} weight={'medium'}>
        Commits
      </Text>
      <Spacer size={6} />
      <ListActions.Root>
        <ListActions.Left>
          {!isFetchingBranches && (
            // TODO : branch change should fetch commits for new branch
            <BranchSelector
              //@ts-expect-error remove "@ts-expect-error" once type issue for "content" is resolved
              name={branches?.content?.[0].name}
              //@ts-expect-error remove "@ts-expect-error" once type issue for "content" is resolved
              branchList={branches?.content?.map(item => ({
                name: item.name
              }))}
            />
          )}
        </ListActions.Left>
        <ListActions.Right>
          <ListActions.Dropdown title="Filter" items={filterOptions} />
          <ListActions.Dropdown title="Sort" items={sortOptions} />
        </ListActions.Right>
      </ListActions.Root>
      <Spacer size={5} />
      {renderContent()}
      <Spacer size={8} />
    </PaddingListLayout>
  )
}