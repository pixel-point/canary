export enum PRCommentFilterType {
  SHOW_EVERYTHING = 'showEverything',
  ALL_COMMENTS = 'allComments',
  MY_COMMENTS = 'myComments',
  RESOLVED_COMMENTS = 'resolvedComments',
  UNRESOLVED_COMMENTS = 'unresolvedComments'
}
export type EnumPullReqReviewDecision = 'approved' | 'changereq' | 'pending' | 'reviewed'

export enum PullReqReviewDecision {
  approved = 'approved',
  changeReq = 'changereq',
  pending = 'pending',
  outdated = 'outdated'
}
export interface Reviewer {
  id: number
  uid: string
  display_name: string
  email: string
  type: string
  created: number
  updated: number
}

export interface AddedBy {
  id: number
  uid: string
  display_name: string
  email: string
  type: string
  created: number
  updated: number
}

export interface ReviewerData {
  created: number
  updated: number
  type: string
  latest_review_id: number
  review_decision: EnumPullReqReviewDecision
  sha: string
  reviewer: Reviewer
  added_by: AddedBy
}
