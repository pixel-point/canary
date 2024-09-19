import React, { createContext, useContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { isEqual } from 'lodash-es'
import { useAtom, atom } from 'jotai'
import {
  RepoRepositoryOutput,
  TypesListCommitResponse,
  TypesPullReq,
  TypesPullReqActivity,
  TypesPullReqStats,
  useFindRepositoryQuery,
  useGetPullReqQuery,
  useListCommitsQuery,
  useListPullReqActivitiesQuery
} from '@harnessio/code-service-client'
import { normalizeGitRef } from '../../../utils/git-utils'
import { useGetSpaceURLParam } from '../../../framework/hooks/useGetSpaceParam'
import { useGetRepoRef } from '../../../framework/hooks/useGetRepoPath'
import { useParams } from 'react-router-dom'
import { PathParams } from '../../../RouteDefinitions'
import useSpaceSSE, { SSEEvents } from '../../../framework/hooks/useSpaceSSE'
interface PullRequestDataContextProps {
  pullReqMetadata: TypesPullReq | undefined
  repoMetadata: RepoRepositoryOutput | undefined
  // Add other necessary properties here
  loading: boolean
}

const PullRequestDataContext = createContext<PullRequestDataContextProps | undefined>(undefined)

export const usePullRequestData = () => {
  const context = useContext(PullRequestDataContext)
  if (!context) {
    throw new Error('usePullRequestData must be used within a PullRequestDataProvider')
  }
  return context
}

interface PullRequestDataProviderProps {
  children: ReactNode
}

const PullRequestDataProvider: React.FC<PullRequestDataProviderProps> = ({ children }) => {
  const space = useGetSpaceURLParam() ?? ''
  const repoRef = useGetRepoRef()
  const { data: repoMetadata } = useFindRepositoryQuery({ repo_ref: repoRef })
  const { pullRequestId } = useParams<PathParams>()

  //   const {
  //     // repoMetadata,
  //     // error: repoError,
  //     // loading: repoLoading,
  //     // refetch: refetchRepo,
  //     // pullRequestId,
  //     pullRequestSection = PullRequestSection.CONVERSATION,
  //     commitSHA
  //   } = useGetRepositoryMetadata()

  const {
    data: pullReqData,
    error: pullReqError,
    isFetching: pullReqLoading,
    refetch: refetchPullReq
  } = useGetPullReqQuery({
    repo_ref: repoRef,
    pullreq_number: Number(pullRequestId)
  })

  const [showEditDescription, setShowEditDescription] = useState(false)

  useSpaceSSE({
    space,
    events: useMemo(() => [SSEEvents.PULLREQ_UPDATED], []),
    onEvent: useCallback(
      (data: TypesPullReq) => {
        if (data && String(data?.number) === pullRequestId) {
          refetchPullReq()
        }
      },
      [pullRequestId, refetchPullReq]
    )
  })

  const [pullReqMetadata, setPullReqMetadata] = useAtom(pullReqAtom)
  const [pullReqStats, setPullReqStats] = useAtom(pullReqStatsAtom)

  //   const pullReqChecksDecision = usePRChecksDecision({
  //     repoMetadata,
  //     pullReqMetadata
  //   })

  const {
    data: activities,
    isFetching: activitiesLoading,
    error: activitiesError,
    refetch: refetchActivities
  } = useListPullReqActivitiesQuery({
    // path: `/api/v1/repos/${repoMetadata?.path}/+/pullreq/${pullRequestId}/activities`,
    // lazy: true
    repo_ref: repoRef,
    pullreq_number: Number(pullRequestId),
    queryParams: {}
  })

  const [pullReqActivities, setPullReqActivities] = useAtom(pullReqActivitiesAtom)
  const [pullReqCommits, setPullReqCommits] = useAtom(pullReqCommitsAtom)

  const loading = useMemo(
    () =>
      // repoLoading ||
      (pullReqLoading && !pullReqMetadata) || (activitiesLoading && !pullReqActivities),
    [
      // repoLoading,
      pullReqLoading,
      pullReqMetadata,
      activitiesLoading,
      pullReqActivities
    ]
  )

  useEffect(() => {
    if (activities) {
      setPullReqActivities(oldActivities => (isEqual(oldActivities, activities) ? oldActivities : activities))
    }
  }, [activities, setPullReqActivities])

  useEffect(() => {
    return () => {
      setPullReqMetadata(undefined)
      setPullReqActivities(undefined)
      setPullReqCommits(undefined)
      setPullReqStats(undefined)
    }
  }, [setPullReqMetadata, setPullReqActivities, setPullReqCommits, setPullReqStats])

  const {
    data: commits,
    error: commitsError,
    refetch: refetchCommits
  } = useListCommitsQuery({
    queryParams: {
      limit: COMMITS_LIMIT,
      git_ref: normalizeGitRef(pullReqData?.source_sha),
      after: normalizeGitRef(pullReqData?.merge_base_sha)
    },
    repo_ref: repoRef
  })

  useEffect(() => {
    if (pullReqData && !isEqual(pullReqMetadata, pullReqData)) {
      if (
        !pullReqMetadata ||
        (pullReqMetadata &&
          (pullReqMetadata.merge_base_sha !== pullReqData.merge_base_sha ||
            pullReqMetadata.source_sha !== pullReqData.source_sha))
      ) {
        refetchCommits()
      }

      setPullReqMetadata(pullReqData)

      if (!isEqual(pullReqStats, pullReqData.stats)) {
        setPullReqStats(pullReqData.stats)
        refetchActivities()
      }
    }
  }, [
    pullReqData,
    pullReqMetadata,
    setPullReqMetadata,
    setPullReqStats,
    pullReqStats,
    refetchActivities,
    refetchCommits
  ])

  useEffect(() => {
    if (commits && !isEqual(commits, pullReqCommits)) {
      //   setPullReqCommits(commits)
    }
  }, [commits, pullReqCommits, setPullReqCommits])

  const retryOnErrorFunc = useMemo(() => {
    return () =>
      //   repoError
      //     ? refetchRepo()
      //     :
      pullReqError ? refetchPullReq() : commitsError ? refetchCommits() : refetchActivities()
  }, [
    // repoError, refetchRepo,
    pullReqError,
    refetchPullReq,
    refetchActivities,
    commitsError,
    refetchCommits
  ])

  const contextValue = {
    repoMetadata,
    // refetchRepo,
    loading,
    error:
      // repoError ||
      pullReqError || activitiesError || commitsError,
    // pullReqChecksDecision,
    showEditDescription,
    setShowEditDescription,
    pullReqMetadata,
    pullReqStats,
    pullReqCommits,
    // pullRequestId,
    // pullRequestSection,
    // commitSHA,
    refetchActivities,
    refetchCommits,
    refetchPullReq,
    retryOnErrorFunc
  }

  return <PullRequestDataContext.Provider value={contextValue}>{children}</PullRequestDataContext.Provider>
}

export const pullReqAtom = atom<TypesPullReq | undefined>(undefined)
const pullReqStatsAtom = atom<TypesPullReqStats | undefined>(undefined)
export const pullReqActivitiesAtom = atom<TypesPullReqActivity[] | undefined>(undefined)
const pullReqCommitsAtom = atom<TypesListCommitResponse | undefined>(undefined)

const COMMITS_LIMIT = 500

export default PullRequestDataProvider
