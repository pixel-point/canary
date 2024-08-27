import { CheckCircleSolid } from '@harnessio/icons-noir'
import React from 'react'
import { Text } from '@harnessio/canary'

interface PullRequestChangesSectionProps {
  changesInfo: { header: string; content: string }
}

const PullRequestChangesSection = ({ changesInfo }: PullRequestChangesSectionProps) => {
  return (
    <div className="py-4 border-b">
      <div className="flex justify-between">
        <div className="flex">
          <CheckCircleSolid className="text-success mt-1" />
          <div className="pl-4 flex flex-col">
            <Text size={2}>{changesInfo.header}</Text>
            <Text className="text-tertiary-background" size={1}>
              {changesInfo.content}
            </Text>
          </div>
        </div>
      </div>
      {/* TODO: add expanded section and show more/less button */}
    </div>
  )
}

export default PullRequestChangesSection
