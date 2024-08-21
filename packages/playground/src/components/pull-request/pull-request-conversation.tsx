import React, { useState } from 'react'
import PullRequestSideBar from './pull-request-side-bar'
import { processReviewDecision, useActivityFilters, useDateFilters } from './utils'
import { mockReviewers } from './mocks/mockReviewer'
import PullRequestFilters from './pull-request-filters'

export default function PullRequestConversation() {
  const dateFilters = useDateFilters()
  const [dateOrderSort, setDateOrderSort] = useState<{ label: string; value: string }>(dateFilters[0])
  const activityFilters = useActivityFilters()
  const [activityFilter, setActivityFilter] = useState<{ label: string; value: string }>(activityFilters[0])
  return (
    <div>
      <div className="grid grid-cols-[70%_30%]">
        <div className=" border mt-1 border-border rounded-md">test</div>
        <PullRequestSideBar
          // repoMetadata={undefined}
          pullRequestMetadata={undefined}
          processReviewDecision={processReviewDecision}
          refetchReviewers={function (): void {
            throw new Error('Function not implemented.')
          }}
          reviewers={mockReviewers}
        />
      </div>
      <div className="grid grid-cols-[70%_30%]">
        <PullRequestFilters
          activityFilters={activityFilters}
          dateFilters={dateFilters}
          activityFilter={activityFilter}
          dateOrderSort={dateOrderSort}
          setActivityFilter={setActivityFilter}
          setDateOrderSort={setDateOrderSort}
        />
      </div>
    </div>
  )
}
