import { FC } from 'react'
import { Link } from 'react-router-dom'

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon
} from '@/components'

import { MoreActionsTooltipProps } from '../types'

export const MoreActionsTooltip: FC<MoreActionsTooltipProps> = ({
  branchInfo,
  defaultBranch,
  spaceId,
  repoId,
  useTranslationStore
}) => {
  const { t } = useTranslationStore()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="-mr-2" variant="ghost" size="sm_icon">
          <Icon className="text-icons-1" name="vertical-ellipsis" size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[12.5rem]" align="end">
        <DropdownMenuGroup>
          <Link
            replace
            to={`${spaceId ? `/${spaceId}` : ''}/repos/${repoId}/pulls/compare/${defaultBranch}...${branchInfo.name}`}
          >
            <DropdownMenuItem className="cursor-pointer px-3">
              {t('views:repos.newPullReq', 'New pull request')}
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="cursor-pointer px-3">
            {t('views:repos.viewRules', 'View Rules')}
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer px-3">
            {t('views:repos.renameBranch', 'Rename Branch')}
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer text-foreground-danger px-3 data-[highlighted]:text-foreground-danger">
            {t('views:repos.deleteBranch', 'Delete Branch')}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
