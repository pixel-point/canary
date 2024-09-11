import { useMemo } from 'react'
import {
  CommentItem,
  EnumPullReqReviewDecision,
  PRCommentFilterType,
  PullReqReviewDecision,
  TypesPullReqActivity,
  orderSortDate
} from './interfaces'

export const processReviewDecision = (
  review_decision: EnumPullReqReviewDecision,
  reviewedSHA?: string,
  sourceSHA?: string
) =>
  review_decision === PullReqReviewDecision.approved && reviewedSHA !== sourceSHA
    ? PullReqReviewDecision.outdated
    : review_decision

export function useActivityFilters() {
  return useMemo(
    () => [
      {
        label: 'Show everything',
        value: PRCommentFilterType.SHOW_EVERYTHING
      },
      {
        label: 'All comments',
        value: PRCommentFilterType.ALL_COMMENTS
      },
      {
        label: 'My comments/replies',
        value: PRCommentFilterType.MY_COMMENTS
      },
      {
        label: 'Unresolved comments',
        value: PRCommentFilterType.UNRESOLVED_COMMENTS
      },
      {
        label: 'Resolved comments',
        value: PRCommentFilterType.RESOLVED_COMMENTS
      }
    ],
    []
  )
}

export function useDateFilters() {
  return useMemo(
    () => [
      {
        label: 'First added',
        value: orderSortDate.ASC
      },
      {
        label: 'Last added',
        value: orderSortDate.DESC
      }
    ],
    []
  )
}

// check if activity item is a system comment
export function isSystemComment(commentItems: CommentItem<TypesPullReqActivity>[]) {
  return commentItems[0].payload?.kind === 'system'
}
