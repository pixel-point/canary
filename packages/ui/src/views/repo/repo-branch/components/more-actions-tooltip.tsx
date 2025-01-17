import { Link } from 'react-router-dom'

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Icon
} from '@/components'

import { MoreActionsTooltipProps } from '../types'

export const MoreActionsTooltip: React.FC<MoreActionsTooltipProps> = ({
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
        <Button variant="ghost" size="icon">
          <Icon name="vertical-ellipsis" size={14} className="text-tertiary-background" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[180px] rounded-[10px] border border-borders-1 bg-background-2 py-2 shadow-sm">
        <DropdownMenuGroup>
          <Link
            replace
            to={`${spaceId ? `/${spaceId}` : ''}/repos/${repoId}/pulls/compare/${defaultBranch}...${branchInfo.name}`}
          >
            <DropdownMenuItem className="cursor-pointer">
              <DropdownMenuShortcut className="ml-0">
                <Icon name="pr-open" className="mr-2 fill-none" />
              </DropdownMenuShortcut>
              {t('views:repos.newPullReq', 'New pull request')}
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="cursor-pointer">
            <DropdownMenuShortcut className="ml-0">
              <Icon name="cog-6" className="mr-2" />
            </DropdownMenuShortcut>
            {t('views:repos.viewRules', 'View Rules')}
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <DropdownMenuShortcut className="ml-0">
              <Icon name="edit-pen" className="mr-2" />
            </DropdownMenuShortcut>
            {t('views:repos.renameBranch', 'Rename Branch')}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
