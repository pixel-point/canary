import { useMemo } from 'react'

import { Avatar, CommitCopyActions, MoreActionsTooltip, Table } from '@/components'
import { getInitials } from '@utils/stringUtils'
import { timeAgo } from '@utils/utils'
import { TranslationStore } from '@views/repo/repo-list/types'
import { CommitTagType, RepoTagsStore } from '@views/repo/repo-tags/types'

interface RepoTagsListProps {
  useTranslationStore: () => TranslationStore
  onDeleteTag: (tagName: string) => void
  useRepoTagsStore: () => RepoTagsStore
  toCommitDetails?: ({ sha }: { sha: string }) => string
  openCreateBranchDialog: () => void
}

export const RepoTagsList: React.FC<RepoTagsListProps> = ({
  useTranslationStore,
  onDeleteTag,
  useRepoTagsStore,
  toCommitDetails,
  openCreateBranchDialog
}) => {
  const { t } = useTranslationStore()
  const { tags: tagsList } = useRepoTagsStore()

  const getTableActions = useMemo(
    () => (tag: CommitTagType) => [
      {
        title: t('views:repos.createBranch', 'Create branch'),
        onClick: openCreateBranchDialog
      },
      {
        title: t('views:repos.viewFiles', 'View Files'),
        to: `../code/refs/tags/${tag.name}`
      },
      {
        isDanger: true,
        title: t('views:repos.deleteTag', 'Delete tag'),
        onClick: () => onDeleteTag(tag.name)
      }
    ],
    [t, openCreateBranchDialog, onDeleteTag]
  )

  const getCreationDate = (tag: CommitTagType) => {
    const date = new Date(tag.tagger?.when ?? 0)

    return timeAgo(date.getTime())
  }

  return (
    <Table.Root variant="asStackedList">
      <Table.Header>
        <Table.Row className="pointer-events-none select-none">
          <Table.Head className="w-1/6">{t('views:repos.tag', 'Tag')}</Table.Head>
          <Table.Head className="w-2/6">{t('views:repos.description', 'Description')}</Table.Head>
          <Table.Head className="w-1/6">{t('views:repos.commit', 'Commit')}</Table.Head>
          <Table.Head className="w-1/6">{t('views:repos.tagger', 'Tagger')}</Table.Head>
          <Table.Head className="w-1/6">{t('views:repos.creationDate', 'Creation date')}</Table.Head>
          <Table.Head className="w-12" />
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {tagsList.map(tag => (
          <Table.Row key={tag.sha}>
            <Table.Cell className="max-w-[180px] truncate !py-3 text-foreground-1">{tag.name}</Table.Cell>
            <Table.Cell className="max-w-[300px] !py-3">
              <div className="line-clamp-3 break-all">{tag.message}</div>
            </Table.Cell>
            <Table.Cell className="!py-2.5">
              <CommitCopyActions sha={tag.sha} toCommitDetails={toCommitDetails} rootClassName="h-7" />
            </Table.Cell>
            <Table.Cell className="!py-3 ">
              <div className="flex items-center gap-2">
                <Avatar.Root size="4.5" className="rounded-full text-white">
                  <Avatar.Fallback>{getInitials(tag.tagger?.identity.name || '')}</Avatar.Fallback>
                </Avatar.Root>
                <span>{tag.tagger?.identity.name}</span>
              </div>
            </Table.Cell>
            <Table.Cell className="!py-3 ">{getCreationDate(tag)}</Table.Cell>

            <Table.Cell className="w-[54px] !py-2 text-right">
              <MoreActionsTooltip
                isInTable
                actions={getTableActions(tag).map(action => ({
                  ...action,
                  to: action.to?.replace('${tag.name}', tag.name)
                }))}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}
