import React from 'react'
import { Card, Input, NodeGroup, Text } from '@harnessio/canary'
import cx from 'classnames'
interface TimelineItemProps {
  header: {
    avatar?: React.ReactNode
    name?: string
    description?: React.ReactNode
  }[]
  content?: React.ReactNode
  icon: React.ReactNode
  isLast: boolean
  hideIconBorder?: boolean
  hideReply?: boolean
  contentClassName?: string
}

interface ItemHeaderProps {
  avatar?: React.ReactNode
  name?: string
  description?: React.ReactNode
}

// Use React.memo for performance optimization if appropriate
const ItemHeader: React.FC<ItemHeaderProps> = React.memo(({ avatar, name, description }) => (
  <div className="inline-flex  gap-1.5 items-center">
    {avatar && <div>{avatar}</div>}
    {name && (
      <Text size={2} color="primary" weight="medium">
        {name}
      </Text>
    )}
    {description && (
      <Text size={2} color="tertiaryBackground">
        {description}
      </Text>
    )}
  </div>
))

const PullRequestTimelineItem: React.FC<TimelineItemProps> = ({
  header,
  content,
  icon,
  isLast,
  hideIconBorder,
  hideReply = false,
  contentClassName
}) => (
  <NodeGroup.Root>
    <NodeGroup.Icon className={cx({ 'border-transparent': hideIconBorder })}>{icon}</NodeGroup.Icon>
    <NodeGroup.Title>
      {/* Ensure that header has at least one item */}
      {header.length > 0 && <ItemHeader {...header[0]} />}
    </NodeGroup.Title>
    {content && (
      <NodeGroup.Content>
        {/* Remove h-32, only for show */}
        <Card className={cx('bg-transparent rounded-md', contentClassName)}>
          {content}
          {!hideReply && (
            <div className="flex items-center gap-3 border-t px-4 py-4">
              <div className='h-6 w-6 rounded-full bg-tertiary-background bg-[url("../images/user-avatar.svg")] bg-cover'></div>
              <Input placeholder={'Reply here'} />
            </div>
          )}
        </Card>
      </NodeGroup.Content>
    )}
    {!isLast && <NodeGroup.Connector />}
  </NodeGroup.Root>
)

export default PullRequestTimelineItem
