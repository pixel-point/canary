import { isEmpty } from 'lodash-es'

import { ReviewerListPullReqOkResponse, TypesUser } from '@harnessio/code-service-client'

import { ApprovalItem, ApprovalItems, PullReqReviewDecision } from './types/types'

export function parseSpecificDiff(rawDiff: string, sourceFileName: string, targetFileName: string) {
  // Split the raw diff into individual diffs
  const diffs = rawDiff.split(/(?=^diff --git)/gm)

  // Iterate over each diff
  for (const diff of diffs) {
    // Check if the diff contains the target file name
    if (
      diff.includes(`a/${sourceFileName === 'dev/null' ? targetFileName : sourceFileName}`) ||
      diff.includes(`b/${targetFileName}`)
    ) {
      return diff // Return the matched diff
    }
  }

  // Return undefined if no specific diff is found
  return undefined
}

export const determineOverallDecision = (data: ReviewerListPullReqOkResponse | undefined, currentUser: TypesUser) => {
  if (data === null || isEmpty(data)) {
    return PullReqReviewDecision.approve // Default case
  }
  // Check if the current user is among the reviewers
  const currentUserReviews = data?.filter(val => val?.reviewer?.uid === currentUser.uid)
  if (currentUserReviews?.length === 0) {
    // Current user not found among reviewers, return default approval state
    return PullReqReviewDecision.approve
  }

  // Directly return based on the review decision of the current user
  const decision = currentUserReviews && currentUserReviews[0]?.review_decision
  if (decision === PullReqReviewDecision.changeReq) {
    return PullReqReviewDecision.changeReq
  } else if (decision === PullReqReviewDecision.approved) {
    return PullReqReviewDecision.approved
  } else {
    return PullReqReviewDecision.approve // Default case or any other state not explicitly handled
  }
}

export const getApprovalStateTheme = (state: PullReqReviewDecision) => {
  switch (state) {
    case PullReqReviewDecision.approved:
      return 'success'
    case PullReqReviewDecision.approve:
      return 'primary'
    case PullReqReviewDecision.changeReq:
      return 'warning'
    default:
      return 'default'
  }
}

export function getApprovalItems(approveState: PullReqReviewDecision, approvalItems: ApprovalItems[]): ApprovalItem[] {
  if (approveState === 'approve' || approveState === 'approved') {
    return approvalItems[0].items
  } else if (approveState === 'changereq') {
    return approvalItems[1].items
  }
  return []
}

export const approvalItems = [
  {
    id: 0,
    state: 'success',
    method: 'approve',
    title: 'Approve',
    items: [
      {
        id: 0,
        title: 'Request changes',
        state: 'changereq',
        method: 'changereq'
      }
    ]
  },
  {
    id: 1,
    state: 'changereq',
    title: 'Changes requested',
    method: 'changereq',
    items: [
      {
        id: 0,
        title: 'Approve',
        state: 'approved',
        method: 'approved'
      }
    ]
  }
]
