import { Avatar, AvatarFallback, Button, CommitCopyActions, Icon, Layout, Text } from '@components/index'
import { getInitials } from '@utils/stringUtils'
import { TypesPullReq } from '@views/repo/pull-request/pull-request.types'

import {
  CommentItem,
  CommentType,
  GeneralPayload,
  PayloadAuthor,
  TypesPullReqActivity
} from '../../pull-request-details-types'
import PullRequestSystemLabelItem from './pull-request-system-label-item'
import PullRequestSystemMergeItem from './pull-request-system-merge'
import PullRequestSystemReviewerAddItem from './pull-request-system-reviewer-add'
import PullRequestSystemReviewerDeleteItem from './pull-request-system-reviewer-delete'
import PullRequestSystemTitleItem from './pull-request-system-title'
import PullRequestTimelineItem from './pull-request-timeline-item'

interface SystemCommentProps extends TypesPullReq {
  commentItems: CommentItem<TypesPullReqActivity>[]
  repoMetadataPath?: string
  isLast: boolean
  pullReqMetadata: TypesPullReq | undefined
  toCommitDetails?: ({ sha }: { sha: string }) => string
}
const PullRequestSystemComments: React.FC<SystemCommentProps> = ({
  commentItems,
  isLast,
  pullReqMetadata,
  toCommitDetails
}) => {
  const payload = commentItems[0].payload
  const type = payload?.payload?.type
  const openFromDraft =
    (payload?.payload?.payload as GeneralPayload)?.old_draft === true &&
    (payload?.payload?.payload as GeneralPayload)?.new_draft === false
  const changedToDraft =
    (payload?.payload?.payload as GeneralPayload)?.old_draft === false &&
    (payload?.payload?.payload as GeneralPayload)?.new_draft === true

  const getIcon = () => {
    if (openFromDraft || changedToDraft) {
      return changedToDraft ? <Icon name="pr-draft" size={12} /> : <Icon name="pr-review" size={12} />
    } else {
      if (
        (payload?.payload?.payload as GeneralPayload)?.old === 'closed' &&
        (payload?.payload?.payload as GeneralPayload)?.new === 'open'
      ) {
        return <Icon name="pr-open" size={12} />
      } else {
        return <Icon name="pr-closed" size={12} />
      }
    }
  }
  switch (type) {
    case CommentType.MERGE:
      return (
        <PullRequestSystemMergeItem payload={payload} isLast={isLast} avatarUrl="" pullReqMetadata={pullReqMetadata} />
      )
    case CommentType.REVIEW_SUBMIT:
      return (
        <PullRequestTimelineItem
          hideIconBorder
          key={payload?.id}
          header={[
            {
              avatar: (
                <Avatar className="size-6 rounded-full p-0">
                  <AvatarFallback>
                    <span className="text-12 text-foreground-1">
                      {/* TODO: fix fallback string */}
                      {getInitials((payload?.author as PayloadAuthor)?.display_name || '')}
                    </span>
                  </AvatarFallback>
                </Avatar>
              ),
              name: (payload?.payload?.author as PayloadAuthor)?.display_name,
              // TODO: fix timeline item to handle commit update as rn it doesnt work
              description:
                (payload?.payload?.payload as GeneralPayload)?.decision === 'approved'
                  ? 'approved these changes'
                  : 'requested changes to this pull request'
            }
          ]}
          icon={
            (payload?.payload?.payload as GeneralPayload)?.decision === 'approved' ? (
              <Icon name="success" size={18} />
            ) : (
              <Icon name="triangle-warning" size={18} className="text-destructive" />
            )
          }
          isLast={isLast}
        />
      )
    case CommentType.BRANCH_UPDATE: {
      const payloadData = payload?.payload?.payload as GeneralPayload
      const author = payload?.author as PayloadAuthor

      const authorAvatar = (
        <Avatar className="size-6 rounded-full p-0">
          <AvatarFallback>
            <span className="text-12 text-foreground-1">{getInitials(author?.display_name || '')}</span>
          </AvatarFallback>
        </Avatar>
      )

      return (
        <PullRequestTimelineItem
          key={payload?.id}
          header={[
            {
              avatar: authorAvatar,
              name: !payloadData?.forced
                ? (payloadData?.commit_title as string) || `${author?.display_name} pushed a new commit`
                : author?.display_name,
              description: !payloadData?.forced ? (
                <CommitCopyActions toCommitDetails={toCommitDetails} sha={payloadData?.new as string} />
              ) : (
                <Layout.Horizontal gap="gap-x-1.5" className="items-center">
                  <span>forced pushed</span>
                  <CommitCopyActions toCommitDetails={toCommitDetails} sha={payloadData?.old as string} />
                  <span>to</span>
                  <CommitCopyActions toCommitDetails={toCommitDetails} sha={payloadData?.new as string} />
                </Layout.Horizontal>
              )
            }
          ]}
          icon={<Icon name="tube-sign" size={14} />}
          isLast={isLast}
        />
      )
    }
    case CommentType.BRANCH_RESTORE:
    case CommentType.BRANCH_DELETE: {
      const isSourceBranchDeleted = type === CommentType.BRANCH_DELETE

      return (
        <PullRequestTimelineItem
          key={payload?.id}
          header={[
            {
              avatar: (
                <Avatar className="size-6 rounded-full p-0">
                  <AvatarFallback>
                    <span className="text-12 text-foreground-1">
                      {/* TODO: fix fallback string */}
                      {getInitials((payload?.author as PayloadAuthor)?.display_name || '')}
                    </span>
                  </AvatarFallback>
                </Avatar>
              ),
              name: (payload?.payload?.author as PayloadAuthor)?.display_name,
              description: (
                <>
                  {isSourceBranchDeleted ? (
                    <Text color="tertiaryBackground">
                      deleted the
                      <Button className="mx-1" variant="secondary" size="xs">
                        {pullReqMetadata?.source_branch}
                      </Button>
                      branch
                    </Text>
                  ) : (
                    <Text color="tertiaryBackground">
                      restored the
                      <Button className="mx-1" variant="secondary" size="xs">
                        {pullReqMetadata?.source_branch}
                      </Button>
                      branch
                    </Text>
                  )}
                </>
              )
            }
          ]}
          icon={<Icon name="git-branch" size={12} />}
          isLast={isLast}
        />
      )
    }
    case CommentType.STATE_CHANGE:
      return (
        <PullRequestTimelineItem
          key={payload?.id}
          header={[
            {
              avatar: (
                <Avatar className="size-6 rounded-full p-0">
                  <AvatarFallback>
                    <span className="text-12 text-foreground-1">
                      {/* TODO: fix fallback string */}
                      {getInitials((payload?.author as PayloadAuthor)?.display_name || '')}
                    </span>
                  </AvatarFallback>
                </Avatar>
              ),
              name: (payload?.payload?.author as PayloadAuthor)?.display_name,
              description: (
                <>
                  {openFromDraft || changedToDraft ? (
                    <Text color="tertiaryBackground">
                      {changedToDraft ? 'marked pull request as draft' : 'opened pull request for review'}
                    </Text>
                  ) : (
                    <Text color="tertiaryBackground">{`changed pull request state from ${(payload?.payload?.payload as GeneralPayload)?.old} to ${(payload?.payload?.payload as GeneralPayload)?.new}`}</Text>
                  )}
                </>
              )
            }
          ]}
          icon={getIcon()}
          isLast={isLast}
        />
      )
    case CommentType.TITLE_CHANGE:
      return <PullRequestSystemTitleItem payload={payload} isLast={isLast} />
    case CommentType.REVIEW_DELETE:
      return <PullRequestSystemReviewerDeleteItem payload={payload} isLast={isLast} />
    case CommentType.REVIEW_ADD:
      return <PullRequestSystemReviewerAddItem payload={payload} isLast={isLast} />
    case CommentType.LABEL_MODIFY:
      return <PullRequestSystemLabelItem payload={payload} isLast={isLast} />
    default:
      console.warn('Unable to render system type activity', commentItems)
      return <Text color="tertiaryBackground">{type}</Text>
  }
}

export default PullRequestSystemComments
