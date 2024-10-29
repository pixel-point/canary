import { useCallback, useEffect, useMemo, useState } from 'react'
import { Spacer } from '@harnessio/canary'
import * as Diff2Html from 'diff2html'
import {
  EnumPullReqReviewDecision,
  reviewSubmitPullReq,
  useRawDiffQuery,
  useReviewerListPullReqQuery
} from '@harnessio/code-service-client'
import { PullRequestChanges, SkeletonList } from '@harnessio/playground'
import { useGetRepoRef } from '../../framework/hooks/useGetRepoPath'
import { compact, isEqual } from 'lodash-es'
import { useAtom } from 'jotai'
import { normalizeGitRef } from '../../utils/git-utils'
import { usePullRequestData } from './context/pull-request-data-provider'
import { changedFileId, DIFF2HTML_CONFIG, normalizeGitFilePath } from './utils'
import { changesInfoAtom, DiffFileEntry, DiffViewerExchangeState, PullReqReviewDecision } from './types/types'
import { parseSpecificDiff } from './diff-utils'
import { useAppContext } from '../../framework/context/AppContext'
import { useParams } from 'react-router-dom'
import { PathParams } from '../../RouteDefinitions'
import { PullRequestChangesFilter } from './pull-request-changes-filter'

export default function PullRequestChangesPage() {
  const { pullReqMetadata, refetchPullReq, refetchActivities } = usePullRequestData()
  const { currentUser } = useAppContext()
  const repoRef = useGetRepoRef()
  const commitSHA = '' // TODO: when you implement commit filter will need commitSHA
  const defaultCommitRange = compact(commitSHA?.split(/~1\.\.\.|\.\.\./g))
  const [
    commitRange
    //  setCommitRange  TODO: add commit view filter dropdown to manage different commits
  ] = useState(defaultCommitRange)
  const targetRef = useMemo(() => pullReqMetadata?.merge_base_sha, [pullReqMetadata?.merge_base_sha])
  const sourceRef = useMemo(() => pullReqMetadata?.source_sha, [pullReqMetadata?.source_sha])
  const [diffs, setDiffs] = useState<DiffFileEntry[]>()
  const { pullRequestId } = useParams<PathParams>()
  const prId = (pullRequestId && Number(pullRequestId)) || -1
  const {
    data: { body: reviewers } = {},
    refetch: refetchReviewers,
    isFetching: loadingReviewers
  } = useReviewerListPullReqQuery({
    repo_ref: repoRef,
    pullreq_number: prId
  })
  const submitReview = useCallback(
    (decision: PullReqReviewDecision) => {
      reviewSubmitPullReq({
        repo_ref: repoRef,
        pullreq_number: prId,
        body: { decision: decision as EnumPullReqReviewDecision, commit_sha: pullReqMetadata?.source_sha }
      })
        .then(() => {
          // showSuccess(getString(decision === 'approved' ? 'pr.reviewSubmitted' : 'pr.requestSubmitted'))
          refetchPullReq()
          refetchReviewers()
          refetchActivities()
        })
        .catch((exception: string) => {
          console.warn(exception)
          refetchReviewers()
        })
    },
    [refetchActivities, refetchPullReq, pullReqMetadata?.source_sha, refetchReviewers, repoRef, prId]
  )
  const diffApiPath = useMemo(
    () =>
      // show range of commits and user selected subrange
      commitRange.length > 0
        ? `${commitRange[0]}~1...${commitRange[commitRange.length - 1]}`
        : // show range of commits and user did not select a subrange
          `${normalizeGitRef(targetRef)}...${normalizeGitRef(sourceRef)}`,
    [commitRange, targetRef, sourceRef]
  )
  const [cachedDiff, setCachedDiff] = useAtom(changesInfoAtom)
  const path = useMemo(() => `/api/v1/repos/${repoRef}/+/${diffApiPath}`, [repoRef, diffApiPath])

  const { data: { body: rawDiff } = {}, isFetching: loadingRawDiff } = useRawDiffQuery(
    {
      repo_ref: repoRef,
      range: diffApiPath.replace('/diff', ''),
      queryParams: {},
      headers: { Accept: 'text/plain' }
    },
    {
      enabled: targetRef !== undefined && sourceRef !== undefined && cachedDiff.path !== path
    }
  )

  useEffect(
    function updateCacheWhenDiffDataArrives() {
      if (path && rawDiff && typeof rawDiff === 'string') {
        // const fileViews = readOnly
        //   ? new Map<string, string>()
        //   : fileViewsData
        //       ?.filter(({ path: _path, sha }) => _path && sha)
        //       .reduce((map, { path: _path, sha, obsolete }) => {
        //         map.set(_path as string, (obsolete ? FILE_VIEWED_OBSOLETE_SHA : sha) as string)
        //         return map
        //       }, new Map<string, string>())

        setCachedDiff({
          path,
          raw: rawDiff
          // fileViews
        })
      }
    },
    [
      rawDiff,
      path,
      setCachedDiff
      //  fileViewsData, readOnly
    ]
  )
  // Diffs are rendered in blocks that can be destroyed when they go off-screen. Hence their internal
  // states (such as collapse, view full diff) are reset when they are being re-rendered. To fix this,
  // we maintained a map from this component and pass to each diff to retain their latest states.
  // Map entry: <diff.filePath, DiffViewerExchangeState>
  const memorizedState = useMemo(() => new Map<string, DiffViewerExchangeState>(), [])

  //
  // Parsing diff and construct data structure to pass into DiffViewer component
  //
  useEffect(() => {
    if (
      loadingRawDiff ||
      cachedDiff.path !== path ||
      typeof cachedDiff.raw !== 'string'
      // || !cachedDiff.fileViews
    ) {
      return
    }
    if (cachedDiff.raw) {
      const _diffs = Diff2Html.parse(cachedDiff.raw, DIFF2HTML_CONFIG)
        .map(diff => {
          diff.oldName = normalizeGitFilePath(diff.oldName)
          diff.newName = normalizeGitFilePath(diff.newName)

          const fileId = changedFileId([diff.oldName, diff.newName])
          const containerId = `container-${fileId}`
          const contentId = `content-${fileId}`

          const filePath = diff.isDeleted ? diff.oldName : diff.newName
          const diffString = parseSpecificDiff(cachedDiff.raw ?? '', diff.oldName, diff.newName)
          return {
            ...diff,
            containerId,
            contentId,
            fileId,
            filePath,
            fileViews: cachedDiff.fileViews,
            raw: diffString
          }
        })
        .sort((a, b) => (a.newName || a.oldName).localeCompare(b.newName || b.oldName, undefined, { numeric: true }))

      setDiffs(oldDiffs => {
        if (isEqual(oldDiffs, _diffs)) return oldDiffs

        // Clear memorizedState when diffs are changed
        memorizedState.clear()
        return _diffs
      })
    } else {
      setDiffs([])
    }
  }, [
    // readOnly,
    path,
    cachedDiff,
    loadingRawDiff,
    memorizedState
  ])

  const renderContent = () => {
    if (loadingRawDiff) {
      return <SkeletonList />
    }
    return (
      <PullRequestChanges
        data={
          diffs?.map(item => ({
            text: item.filePath,
            numAdditions: item.addedLines,
            numDeletions: item.deletedLines,
            data: item.raw,
            title: item.filePath,
            lang: item.filePath.split('.')[1]
          })) || []
        }
      />
    )
  }

  return (
    <>
      <PullRequestChangesFilter
        active={''}
        loading={loadingReviewers}
        currentUser={currentUser ?? {}}
        pullRequestMetadata={pullReqMetadata}
        reviewers={reviewers}
        submitReview={submitReview}
        refetchReviewers={refetchReviewers}
      />
      <Spacer aria-setsize={5} />

      {renderContent()}
    </>
  )
}
