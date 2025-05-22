import { FC, useMemo, useState } from 'react'

import { DropdownMenu, Icon, SearchBox } from '@/components'
import { useTranslation } from '@/context'
import { cn } from '@utils/cn'
import { CommitSelectorListItem } from '@views/repo/pull-request'

import { CommitSelectorDropdownProps } from '../../pull-request/pull-request.types'

const filterItems = (items: CommitSelectorListItem[], query: string) => {
  if (!query.trim()) return items

  return items.filter(item => item.title.toLowerCase().includes(query.toLowerCase().trim()))
}
export const CommitSelectorDropdown: FC<CommitSelectorDropdownProps> = ({
  selectedCommit,
  onSelectCommit,
  commitList
}) => {
  const [searchQuery, setSearchQuery] = useState('')

  const { t } = useTranslation()

  // TODO: Leave until be filtering can be done
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }
  const filteredItems = useMemo(() => {
    return filterItems(commitList, searchQuery)
  }, [commitList, searchQuery])

  return (
    <DropdownMenu.Content className="p-0" align="start">
      <div className="px-3 pt-2">
        <SearchBox.Root
          className="w-full"
          placeholder={t('views:repos.search')}
          value={searchQuery}
          handleChange={handleSearchChange}
          showOnFocus
        />
      </div>

      <div className="mt-1">
        {filteredItems.length === 0 && (
          <div className="px-5 py-4 text-center">
            <span className="text-2 leading-tight text-cn-foreground-2">Nothing to show</span>
          </div>
        )}

        <div className="max-h-[360px] overflow-y-auto px-1">
          {filteredItems.map((item, idx) => {
            const isSelected = selectedCommit
              ? item.title === selectedCommit.title && item.sha === selectedCommit.sha
              : false

            return (
              <DropdownMenu.Item
                className={cn('hover:bg-cn-background-hover cursor-pointer py-2 leading-none', {
                  'bg-cn-background-hover': isSelected,
                  'pl-7': !isSelected
                })}
                onClick={() => {
                  onSelectCommit?.(item)
                }}
                key={item.title}
              >
                <div className="flex w-full min-w-0 items-center gap-x-2">
                  {isSelected && <Icon name="tick" size={12} className="min-w-[12px] text-cn-foreground-1" />}
                  <span
                    className={cn('text-cn-foreground-2 truncate', {
                      'text-cn-foreground-1': isSelected
                    })}
                  >
                    {item.title && idx === 0 ? `${item.title} (${commitList.length - 1})` : item.title}
                  </span>
                </div>
              </DropdownMenu.Item>
            )
          })}
        </div>
      </div>
    </DropdownMenu.Content>
  )
}
