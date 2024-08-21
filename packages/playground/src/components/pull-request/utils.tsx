import { useMemo } from 'react'
import { EnumPullReqReviewDecision, PRCommentFilterType, PullReqReviewDecision } from './interfaces'

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
        label: 'Show Everything',
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
