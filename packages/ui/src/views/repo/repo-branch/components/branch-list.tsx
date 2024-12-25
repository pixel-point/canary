import { Link } from 'react-router-dom'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  CopyButton,
  Icon,
  SkeletonTable,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text
} from '@/components'
import { cn } from '@utils/cn'
import { getInitials } from '@utils/stringUtils'
import { getPrState } from '@views/repo/pull-request/utils'

import { BranchListPageProps } from '../types'
import { DivergenceGauge } from './divergence-gauge'
import { MoreActionsTooltip } from './more-actions-tooltip'

export const BranchesList = ({
  isLoading,
  branches,
  spaceId,
  repoId,
  defaultBranch,
  useTranslationStore
}: BranchListPageProps) => {
  const { t } = useTranslationStore()
  console.log(branches[0]?.pullRequests?.[0])
  return (
    <Table
      className={isLoading ? '[mask-image:linear-gradient(to_bottom,black_30%,transparent_100%)]' : ''}
      variant="asStackedList"
    >
      <TableHeader>
        <TableRow>
          <TableHead>{t('views:repos.branch', 'Branch')}</TableHead>
          <TableHead>{t('views:repos.update', 'Updated')}</TableHead>
          {branches[0]?.checks?.done && branches[0]?.checks?.total && branches[0]?.checks?.status && (
            <TableHead>{t('views:repos.checkStatus', 'Check status')}</TableHead>
          )}
          <TableHead>
            <div className="mx-auto grid w-28 grid-flow-col grid-cols-[1fr_auto_1fr] items-center justify-items-end gap-x-1.5">
              <Text className="leading-none" size={2} truncate color="foreground-4" weight="medium">
                {t('views:repos.behind', 'Behind')}
              </Text>
              <div className="h-3 w-px bg-borders-2" aria-hidden />
              <Text className="place-self-start leading-none" size={2} truncate color="foreground-4" weight="medium">
                {t('views:repos.ahead', 'Ahead')}
              </Text>
            </div>
          </TableHead>
          <TableHead className="max-w-20">{t('views:repos.pullRequest', 'Pull Request')}</TableHead>
          <TableHead>
            <></>
          </TableHead>
        </TableRow>
      </TableHeader>
      {isLoading ? (
        <SkeletonTable countRows={12} countColumns={5} />
      ) : (
        <TableBody>
          {branches &&
            branches.map(branch => {
              return (
                <TableRow key={branch.id}>
                  {/* branch name */}
                  <TableCell className="content-center">
                    <div className="flex items-center h-6">
                      <Text wrap="nowrap" truncate>
                        <Button
                          className="text-foreground-8 text-sm px-2.5 max-w-80 truncate inline-block bg-background-8 hover:bg-background-9 hover:text-foreground-1"
                          variant="custom"
                          size="xs"
                        >
                          {defaultBranch === branch?.name && (
                            <Icon name="lock" size={14} className="text-icons-9 -mt-px inline-block mr-1" />
                          )}
                          {branch?.name}
                        </Button>
                      </Text>
                      <CopyButton color="icons-1" name={branch?.name} />
                    </div>
                  </TableCell>
                  {/* user avatar and timestamp */}
                  <TableCell className="content-center">
                    <div className="flex items-center gap-2">
                      <Avatar className="size-[1.125rem]">
                        {branch?.user?.avatarUrl && <AvatarImage src={branch?.user?.avatarUrl} />}
                        <AvatarFallback className="text-center text-[0.625rem]">
                          {getInitials(branch?.user?.name ?? '', 2)}
                        </AvatarFallback>
                      </Avatar>
                      <Text color="primary" wrap="nowrap" truncate size={2}>
                        {branch?.timestamp}
                      </Text>
                    </div>
                  </TableCell>
                  {/* checkstatus: show in the playground, hide the check status column if the checks are null in the gitness without data */}
                  {branch?.checks?.done && branch?.checks?.total && branch?.checks?.status && (
                    <TableCell className="content-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <Icon name="tick" size={11} className="text-success" />
                        <Text size={2} wrap="nowrap" truncate color="tertiaryBackground">
                          {branch?.checks?.done}
                          <span className="mx-px">/</span>
                          {branch?.checks?.total}
                        </Text>
                      </div>
                    </TableCell>
                  )}
                  {/* calculated divergence bar & default branch */}
                  <TableCell className="content-center">
                    <div className="flex items-center justify-center gap-1.5 align-middle">
                      {branch?.behindAhead?.default ? (
                        <Badge
                          className="m-auto rounded-full font-medium px-2 text-center text-foreground-3 bg-background-2"
                          variant="outline"
                          size="sm"
                        >
                          {t('views:repos.default', 'Default')}
                        </Badge>
                      ) : (
                        <DivergenceGauge
                          behindAhead={branch?.behindAhead || {}}
                          useTranslationStore={useTranslationStore}
                        />
                      )}
                    </div>
                  </TableCell>

                  {/* change commit data instead: SHA */}
                  <TableCell className="content-center max-w-20">
                    {branch.pullRequests && branch.pullRequests.length > 0 && (
                      <Button
                        className="text-foreground-8 text-sm px-2.5 w-fit flex items-center gap-1 bg-background-8 hover:bg-background-9 hover:text-foreground-1"
                        variant="custom"
                        size="xs"
                        asChild
                      >
                        <Link to={`/${spaceId}/repos/${repoId}/pulls/${branch.pullRequests[0].number}`}>
                          <Icon
                            name={
                              getPrState(
                                branch.pullRequests[0].is_draft,
                                branch.pullRequests[0].merged,
                                branch.pullRequests[0].state
                              ).icon
                            }
                            size={11}
                            className={cn({
                              'text-icons-success':
                                branch.pullRequests[0].state === 'open' && !branch.pullRequests[0].is_draft,
                              'text-icons-1':
                                branch.pullRequests[0].state === 'open' && branch.pullRequests[0].is_draft,
                              'text-icons-danger': branch.pullRequests[0].state === 'closed',
                              'text-icons-merged': branch.pullRequests[0].merged
                            })}
                          />
                          #{branch.pullRequests[0].number}
                        </Link>
                      </Button>
                    )}
                  </TableCell>
                  <TableCell className="content-center">
                    <div className="flex justify-end">
                      <MoreActionsTooltip
                        branchInfo={branch}
                        spaceId={spaceId}
                        repoId={repoId}
                        defaultBranch={defaultBranch}
                        useTranslationStore={useTranslationStore}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
        </TableBody>
      )}
    </Table>
  )
}
