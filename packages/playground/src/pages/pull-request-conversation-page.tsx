import React, { useState } from 'react'
import { mockOverviewRealData } from '../data/mockOverviewRealData'
// import { mockOverviewData } from '../data/mockOverviewData'
import { mockReviewers } from '../data/mockReviewer'
import {
  mockPullReqMetadata,
  mockPullReqMetadataConflict,
  mockPullReqMetadataUnchecked
} from '../data/mockPullReqMetadata'
import { mockChangeReqData } from '../data/mockChangeReqData'
import { mockChecksFailedData, mockChecksSuccessData } from '../data/mockChecksData'
import { mockChangesData } from '../data/mockChangesData'
import { mockChecksSucceededInfo, mockChecksFailedInfo } from '../data/mockCheckInfo'
import { mockCommentResolvedInfo, mockCommentUnresolvedInfo } from '../data/mockCommentInfo'
import PlaygroundPullRequestConversationSettings from '../settings/pull-request-conversation-settings'
import SkeletonList from '../components/loaders/skeleton-list'
import NoData from '../components/no-data'
import PullRequestPanel from '../components/pull-request/pull-request-panel'
import { Spacer } from '@harnessio/canary'
import PullRequestFilters from '../components/pull-request/pull-request-filters'
import PullRequestOverview from '../components/pull-request/pull-request-overview'
import PullRequestCommentBox from '../components/pull-request/pull-request-comment-box'
import PullRequestSideBar from '../components/pull-request/pull-request-side-bar'
import { processReviewDecision, useActivityFilters, useDateFilters } from '../components/pull-request/utils'
import FullWidth2ColumnLayout from '../layouts/FullWidth2ColumnLayout'
import { mockCodeOwnerData } from '../data/mockCodeOwner'

export default function PullRequestConversationPage() {
  const [loadState, setLoadState] = useState('data-loaded')
  const dateFilters = useDateFilters()
  const [dateOrderSort, setDateOrderSort] = useState<{ label: string; value: string }>(dateFilters[0])
  const activityFilters = useActivityFilters()
  const [activityFilter, setActivityFilter] = useState<{ label: string; value: string }>(activityFilters[0])
  const ruleViolation = loadState !== 'data-loaded-checksFailed' ? false : true
  const checksInfo = loadState === 'data-loaded-checksFailed' ? mockChecksFailedInfo : mockChecksSucceededInfo
  const commentsInfo = loadState === 'data-loaded-checksFailed' ? mockCommentUnresolvedInfo : mockCommentResolvedInfo
  const checksData = loadState === 'data-loaded-checksFailed' ? mockChecksFailedData : mockChecksSuccessData
  const pullReqMetadata =
    loadState === 'data-loaded-unchecked'
      ? mockPullReqMetadataUnchecked
      : loadState === 'data-loaded-conflict'
        ? mockPullReqMetadataConflict
        : mockPullReqMetadata
  // will add appropiate mock data here in upcoming prs
  const mockMinApproval = 2
  const mockMinReqLatestApproval = undefined
  const mockApprovedEvaluations: never[] = [] // will put data here just in next pr
  const mockChangeReqEvaluations = mockChangeReqData
  const mockCodeOwners = mockCodeOwnerData
  const mockLatestApprovalArr: never[] = [] // will put data here just in next pr
  const mockReqNoChangeReq = false
  const mockChangeReqReviewer = 'Admin'
  const mockCodeOwnerChangeReqEntries = undefined
  const mockReqCodeOwnerApproval = true
  const mockReqCodeOwnerLatestApproval = false
  const mockCodeOwnerPendingEntries = undefined
  const mockCodeOwnerApprovalEntries = undefined
  const mockLatestCodeOwnerApprovalArr = undefined
  const mockConflictingFiles = loadState === 'data-loaded-conflict' ? ['test', 't'] : undefined
  if (loadState == 'loading') {
    return (
      <>
        <SkeletonList />
        <PlaygroundPullRequestConversationSettings loadState={loadState} setLoadState={setLoadState} />
      </>
    )
  }

  if (loadState == 'no-data') {
    return (
      <>
        <NoData
          iconName="no-data-folder"
          title="No activity yet"
          description={['There is no activity for this pull request yet.']}
        />
        <PlaygroundPullRequestConversationSettings loadState={loadState} setLoadState={setLoadState} />
      </>
    )
  }

  return (
    <>
      <FullWidth2ColumnLayout
        leftColumn={
          <>
            <PullRequestPanel
              changesInfo={mockChangesData}
              checksInfo={checksInfo}
              commentsInfo={commentsInfo}
              ruleViolation={ruleViolation}
              checks={checksData}
              pullReqMetadata={pullReqMetadata}
              PRStateLoading={false}
              conflictingFiles={mockConflictingFiles}
              approvedEvaluations={mockApprovedEvaluations}
              changeReqEvaluations={mockChangeReqEvaluations}
              codeOwners={mockCodeOwners}
              latestApprovalArr={mockLatestApprovalArr}
              reqNoChangeReq={mockReqNoChangeReq}
              changeReqReviewer={mockChangeReqReviewer}
              codeOwnerChangeReqEntries={mockCodeOwnerChangeReqEntries}
              reqCodeOwnerApproval={mockReqCodeOwnerApproval}
              reqCodeOwnerLatestApproval={mockReqCodeOwnerLatestApproval}
              codeOwnerPendingEntries={mockCodeOwnerPendingEntries}
              codeOwnerApprovalEntries={mockCodeOwnerApprovalEntries}
              latestCodeOwnerApprovalArr={mockLatestCodeOwnerApprovalArr}
              minApproval={mockMinApproval}
              minReqLatestApproval={mockMinReqLatestApproval}
            />
            <Spacer size={9} />
            <PullRequestFilters
              activityFilters={activityFilters}
              dateFilters={dateFilters}
              activityFilter={activityFilter}
              dateOrderSort={dateOrderSort}
              setActivityFilter={setActivityFilter}
              setDateOrderSort={setDateOrderSort}
            />
            <Spacer size={6} />
            <PullRequestOverview data={mockOverviewRealData} pullReqMetadata={pullReqMetadata} />
            <Spacer size={9} />
            <PullRequestCommentBox />
            <Spacer size={9} />
          </>
        }
        rightColumn={
          <PullRequestSideBar
            // repoMetadata={undefined}
            pullRequestMetadata={undefined}
            processReviewDecision={processReviewDecision}
            refetchReviewers={function (): void {
              throw new Error('Function not implemented.')
            }}
            reviewers={mockReviewers}
          />
        }
      />
      <PlaygroundPullRequestConversationSettings loadState={loadState} setLoadState={setLoadState} />
    </>
  )
}
