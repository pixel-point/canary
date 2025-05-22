import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useGetPullReqQuery, useUpdatePullReqMutation } from '@harnessio/code-service-client'
import { PullRequestLayout as PullRequestLayoutView } from '@harnessio/ui/views'

import { useGetRepoRef } from '../../framework/hooks/useGetRepoPath'
import { PathParams } from '../../RouteDefinitions'
import { usePullRequestStore } from './stores/pull-request-store'

const PullRequestLayout = () => {
  const { setPullRequest, setRefetchPullReq, setPullReqError, setPullReqLoading } = usePullRequestStore()

  const { pullRequestId, spaceId, repoId } = useParams<PathParams>()

  const repoRef = useGetRepoRef()

  const {
    data: { body: pullReqData } = {},
    error: pullReqError,
    isFetching: pullReqLoading,
    refetch: refetchPullReq
  } = useGetPullReqQuery({
    repo_ref: repoRef,
    pullreq_number: Number(pullRequestId),
    queryParams: {}
  })
  const { mutateAsync: updateTitle } = useUpdatePullReqMutation(
    {
      repo_ref: repoRef,
      pullreq_number: Number(pullRequestId)
    },
    {
      onSuccess: () => {
        refetchPullReq()
      }
    }
  )
  useEffect(() => {
    if (pullReqData) {
      setPullRequest(pullReqData)
      setRefetchPullReq(refetchPullReq)
      setPullReqLoading(pullReqLoading)
      setPullReqError(pullReqError)
    }
  }, [
    pullReqData,
    setPullRequest,
    setRefetchPullReq,
    refetchPullReq,
    pullReqLoading,
    pullReqError,
    setPullReqError,
    setPullReqLoading
  ])

  const handleUpdateTitle = (title: string, description: string) => {
    updateTitle({ body: { title, description } })
  }

  return (
    <PullRequestLayoutView
      usePullRequestStore={usePullRequestStore}
      spaceId={spaceId || ''}
      repoId={repoId}
      updateTitle={handleUpdateTitle}
    />
  )
}

export default PullRequestLayout
