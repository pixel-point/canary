import React from 'react'
import { AccordionItem, AccordionTrigger, Icon, StackedList, Text } from '@harnessio/canary'

import { WarningTriangleSolid } from '@harnessio/icons-noir'
import { LineDescription, LineTitle } from '../pull-request-line-title'
interface PullRequestMergeSectionProps {
  commentsInfo: { header: string; content?: string | undefined; status: string }
  handleAction?: () => void
}
const PullRequestCommentSection = ({ commentsInfo, handleAction }: PullRequestMergeSectionProps) => {
  return (
    <AccordionItem value="item-2">
      <AccordionTrigger className="text-left" hideChevron>
        <StackedList.Field
          title={
            <LineTitle
              text={commentsInfo.header}
              icon={
                commentsInfo.status === 'success' ? (
                  <Icon name="success" size={16} />
                ) : (
                  <WarningTriangleSolid className="text-destructive mt-1" />
                )
              }
            />
          }
          description={commentsInfo.content && <LineDescription text={commentsInfo.content} />}
        />
        {commentsInfo.status === 'failed' && (
          <Text
            onClick={() => {
              handleAction?.()
            }}
            className="pr-2"
            size={1}>
            View
          </Text>
        )}
      </AccordionTrigger>
    </AccordionItem>
  )
}

export default PullRequestCommentSection
