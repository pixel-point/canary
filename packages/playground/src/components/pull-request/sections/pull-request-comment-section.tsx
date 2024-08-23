import React from 'react'
import { Button, Text } from '@harnessio/canary'

import { CheckCircleSolid, WarningTriangleSolid } from '@harnessio/icons-noir'
interface PullRequestMergeSectionProps {
  commentsInfo: { header: string; content?: string | undefined; status: string }
  handleAction?: () => void
}
const PullRequestCommentSection = ({ commentsInfo, handleAction }: PullRequestMergeSectionProps) => {
  return (
    <div className="py-4 border-b">
      <div className="flex justify-between">
        <div className="flex">
          {commentsInfo.status === 'success' ? (
            <CheckCircleSolid className="text-success mt-1" />
          ) : (
            <WarningTriangleSolid className="text-destructive mt-1" />
          )}
          <div className="pl-4 flex flex-col">
            <Text size={2}>{commentsInfo.header}</Text>
            {commentsInfo?.content && (
              <Text className="text-tertiary-background" size={1}>
                {commentsInfo.content}
              </Text>
            )}
          </div>
        </div>
        {commentsInfo.status === 'failed' ? (
          <Button
            onClick={() => {
              handleAction?.()
            }}
            variant="link">
            View
          </Button>
        ) : null}
        {/* TODO: add expanded section and show more/less button */}
      </div>
    </div>
  )
}

export default PullRequestCommentSection
