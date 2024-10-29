import { Spacer } from '@harnessio/canary'
import { NoData, PullRequestCommits, SkeletonList } from '@harnessio/playground'
import { useListPullReqCommitsQuery, TypesCommit } from '@harnessio/code-service-client'
import { useGetRepoRef } from '../framework/hooks/useGetRepoPath'
import { useParams } from 'react-router-dom'
import { PathParams } from '../RouteDefinitions'

export default function PullRequestCommitsPage() {
  const repoRef = useGetRepoRef()
  const { pullRequestId } = useParams<PathParams>()
  const prId = (pullRequestId && Number(pullRequestId)) || -1

  const { data: { body: commitData } = {}, isFetching } = useListPullReqCommitsQuery({
    repo_ref: repoRef,
    pullreq_number: prId,
    queryParams: { page: 0, limit: 10 }
  })
  const renderContent = () => {
    if (isFetching) {
      return <SkeletonList />
    }
    if (commitData?.length) {
      return (
        <PullRequestCommits
          data={commitData?.map((item: TypesCommit) => ({
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
      return (
        <NoData
          iconName="no-data-folder"
          title="No commits yet"
          description={['There are no commits for this pull request yet.']}
        />
      )
    }
  }

  return (
    <>
      {renderContent()}
      <Spacer size={8} />
      {/* TODO: actually add pagination when apis are implemented */}
    </>
  )
}
