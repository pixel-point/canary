import React, { useState } from 'react'
import PullRequestSideBar from './pull-request-side-bar'
import { processReviewDecision, useActivityFilters } from './utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@harnessio/canary'
import { mockReviewers } from './mocks/mockReviewer'

export default function PullRequestConversation() {
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
        <div className={'mt-2 py-2 flex  space-x-2 pt-4 justify-between border-b border-b-border'}>
          <div className="">Overview</div>
          <Select defaultValue={activityFilter.value}>
            <SelectTrigger className="w-fit border-none px-1 text-white text-xs focus:ring-[0px]">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {activityFilters.map(filter => (
                <SelectItem key={filter.value} value={filter.value} onClick={() => setActivityFilter(filter)}>
                  {filter.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
