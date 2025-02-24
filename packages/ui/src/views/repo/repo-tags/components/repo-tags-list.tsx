import { useMemo } from 'react'

import { Avatar, CommitCopyActions, MoreActionsTooltip, NoData, SkeletonTable, Table } from '@/components'
import { cn } from '@utils/cn'
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
  isLoading: boolean
  isDirtyList: boolean
  handleResetFiltersAndPages: () => void
  openCreateTagDialog: () => void
}

export const RepoTagsList: React.FC<RepoTagsListProps> = ({
  useTranslationStore,
  onDeleteTag,
  useRepoTagsStore,
  toCommitDetails,
  openCreateBranchDialog,
  isLoading,
  isDirtyList,
  handleResetFiltersAndPages,
  openCreateTagDialog
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

  if (!isLoading && !tagsList?.length) {
    return (
      <div className={cn(!isDirtyList && 'flex items-center justify-center py-[232px]')}>
        <NoData
          iconName={isDirtyList ? 'no-search-magnifying-glass' : 'no-data-tags'}
          withBorder={isDirtyList}
          title={
            isDirtyList ? t('views:noData.noResults', 'No search results') : t('views:noData.noTags', 'No tags yet')
          }
          description={
            isDirtyList
              ? [
                  t('views:noData.checkSpelling', 'Check your spelling and filter options,'),
                  t('views:noData.changeSearch', 'or search for a different keyword.')
                ]
              : [
                  t(
                    'views:noData.noTagsDescription',
                    "Your tags will appear here once they're created. Start creating tags to see your work organized."
                  )
                ]
          }
          textWrapperClassName={isDirtyList ? '' : 'max-w-[360px]'}
          primaryButton={
            isDirtyList
              ? {
                  label: t('views:noData.clearSearch', 'Clear search'),
                  onClick: handleResetFiltersAndPages
                }
              : {
                  label: t('views:noData.createNewTag', 'Create new tag.'),
                  onClick: openCreateTagDialog
                }
          }
        />
      </div>
    )
  }

  return (
    <Table.Root variant="asStackedList">
      <Table.Header>
        <Table.Row className="pointer-events-none select-none">
          <Table.Head className="w-[124px]">{t('views:repos.tag', 'Tag')}</Table.Head>
          <Table.Head className="w-[330px]">{t('views:repos.description', 'Description')}</Table.Head>
          <Table.Head className="w-[150px]">{t('views:repos.commit', 'Commit')}</Table.Head>
          <Table.Head className="w-[178px]">{t('views:repos.tagger', 'Tagger')}</Table.Head>
          <Table.Head className="w-[130px]">{t('views:repos.creationDate', 'Creation date')}</Table.Head>
          <Table.Head className="w-[48px]" />
        </Table.Row>
      </Table.Header>

      {isLoading ? (
        <SkeletonTable countRows={12} countColumns={5} />
      ) : (
        <Table.Body hasHighlightOnHover>
          {tagsList.map(tag => (
            <Table.Row key={tag.sha}>
              <Table.Cell className="max-w-[124px] truncate !py-[13px] text-foreground-1">{tag.name}</Table.Cell>
              <Table.Cell className="max-w-[330px] !py-[13px] text-foreground-3">
                <div className="line-clamp-3 break-all">{tag.message}</div>
              </Table.Cell>
              <Table.Cell className="!py-2.5 text-foreground-3">
                <div className="flex">
                  <CommitCopyActions sha={tag.sha} toCommitDetails={toCommitDetails} rootClassName="h-7" />
                </div>
              </Table.Cell>
              <Table.Cell className="!py-[13px] text-foreground-3">
                <div className="flex items-center gap-2">
                  <Avatar.Root size="4.5" className="rounded-full text-white">
                    <Avatar.Fallback>{getInitials(tag.tagger?.identity.name || '')}</Avatar.Fallback>
                  </Avatar.Root>
                  <span>{tag.tagger?.identity.name}</span>
                </div>
              </Table.Cell>
              <Table.Cell className="!py-[13px] text-foreground-3">{getCreationDate(tag)}</Table.Cell>

              <Table.Cell className="w-[54px] !py-2.5 text-right">
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
      )}
    </Table.Root>
  )
}
