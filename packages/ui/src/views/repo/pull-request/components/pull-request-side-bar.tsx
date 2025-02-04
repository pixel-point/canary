import { FC } from 'react'

import {
  EnumPullReqReviewDecision,
  HandleAddLabelType,
  ILabelType,
  LabelAssignmentType,
  LabelValuesType,
  PRReviewer,
  PullReqReviewDecision,
  TranslationStore
} from '@/views'

import { LabelsHeader, LabelsList } from './labels'
import { ReviewersHeader, ReviewersList } from './reviewers'

interface PullRequestSideBarProps {
  reviewers?: PRReviewer[]
  processReviewDecision: (
    review_decision: EnumPullReqReviewDecision,
    reviewedSHA?: string,
    sourceSHA?: string
  ) => EnumPullReqReviewDecision | PullReqReviewDecision.outdated
  pullRequestMetadata?: { source_sha: string }
  refetchReviewers: () => void
  handleDelete: (id: number) => void
  addReviewers?: (id?: number) => void
  addReviewerError?: string
  removeReviewerError?: string
  usersList?: { display_name?: string; id?: number; uid?: string }[]
  currentUserId?: string
  searchQuery: string
  setSearchQuery: (query: string) => void
  labelsList?: ILabelType[]
  labelsValues?: LabelValuesType
  PRLabels?: LabelAssignmentType[]
  searchLabelQuery?: string
  setSearchLabelQuery?: (query: string) => void
  addLabel?: (data: HandleAddLabelType) => void
  removeLabel?: (id: number) => void
  useTranslationStore: () => TranslationStore
}

const PullRequestSideBar: FC<PullRequestSideBarProps> = ({
  usersList,
  reviewers = [],
  pullRequestMetadata,
  processReviewDecision,
  handleDelete,
  addReviewerError,
  removeReviewerError,
  addReviewers,
  currentUserId,
  searchQuery,
  setSearchQuery,
  labelsList = [],
  labelsValues = {},
  PRLabels = [],
  searchLabelQuery,
  setSearchLabelQuery,
  addLabel,
  removeLabel,
  useTranslationStore
}) => {
  return (
    <div>
      <div className="flex flex-col gap-3">
        <ReviewersHeader
          currentUserId={currentUserId}
          usersList={usersList}
          reviewers={reviewers}
          addReviewers={addReviewers}
          handleDelete={handleDelete}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          useTranslationStore={useTranslationStore}
        />
        <ReviewersList
          reviewers={reviewers}
          pullRequestMetadata={pullRequestMetadata}
          processReviewDecision={processReviewDecision}
          handleDelete={handleDelete}
          addReviewerError={addReviewerError}
          removeReviewerError={removeReviewerError}
        />
      </div>
      <div className="mt-8 flex flex-col gap-3">
        <LabelsHeader
          labelsList={labelsList}
          labelsValues={labelsValues}
          selectedLabels={PRLabels}
          addLabel={addLabel}
          removeLabel={removeLabel}
          searchQuery={searchLabelQuery}
          setSearchQuery={setSearchLabelQuery}
          useTranslationStore={useTranslationStore}
        />
        <LabelsList
          labels={PRLabels.map(label => ({
            color: label?.assigned_value?.color || label.color,
            key: label.key,
            value: label?.assigned_value?.value || undefined
          }))}
        />
      </div>
    </div>
  )
}

export { PullRequestSideBar }
