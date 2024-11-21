import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  Button,
  Icon,
  Avatar,
  AvatarFallback,
  Text
} from '@harnessio/canary'
import cx from 'classnames'
import { EnumPullReqReviewDecision, PullReqReviewDecision } from './interfaces'
import { getInitials } from '../../utils/utils'

interface ReviewerItemProps {
  reviewer?: { display_name?: string; id?: number }
  reviewDecision?: EnumPullReqReviewDecision
  sha?: string
  sourceSHA?: string
  processReviewDecision: (
    review_decision: EnumPullReqReviewDecision,
    reviewedSHA?: string,
    sourceSHA?: string
  ) => EnumPullReqReviewDecision | PullReqReviewDecision.outdated
  handleDelete: (id: number) => void
}

const ReviewerItem = ({
  reviewer,
  reviewDecision,
  sha,
  sourceSHA,
  processReviewDecision,
  handleDelete
}: ReviewerItemProps) => {
  const updatedReviewDecision = reviewDecision && processReviewDecision(reviewDecision, sha, sourceSHA)
  const moreActionsTooltip = (
    reviewer:
      | {
          display_name?: string
          id?: number
        }
      | undefined
  ) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="xs">
            <Icon name="vertical-ellipsis" size={14} className="text-tertiary-background" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[180px] rounded-[10px]">
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer text-red-400 hover:text-red-400 focus:text-red-400"
              onSelect={() => {
                handleDelete?.(reviewer?.id ?? 0)
                // TODO: handle error if cant delete reviewers
              }}>
              <DropdownMenuShortcut className="ml-0">
                <Icon name="trash" className="mr-2 text-red-400" />
              </DropdownMenuShortcut>
              Delete Reviewer
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  return (
    <div key={reviewer?.id} className="mr-1 flex items-center space-x-2">
      <Avatar
        className={cx('h-7 w-7 rounded-full', {
          'p-0': updatedReviewDecision !== PullReqReviewDecision.changeReq
        })}>
        <AvatarFallback>
          <Text size={1} color="tertiaryBackground">
            {getInitials(reviewer?.display_name || '')}
          </Text>
        </AvatarFallback>
      </Avatar>
      <div className="truncate">{reviewer?.display_name}</div>
      <div className="grow"></div>

      {updatedReviewDecision === PullReqReviewDecision.outdated ? (
        <Icon name="comments" className="text-warning" />
      ) : updatedReviewDecision === PullReqReviewDecision.approved ? (
        <Icon name="success" className="text-success" />
      ) : updatedReviewDecision === PullReqReviewDecision.changeReq ? (
        <Icon name="triangle-warning" className="text-destructive" />
      ) : updatedReviewDecision === PullReqReviewDecision.pending ? (
        <Icon name="clock" />
      ) : null}
      {moreActionsTooltip(reviewer)}
    </div>
  )
}

export default ReviewerItem
