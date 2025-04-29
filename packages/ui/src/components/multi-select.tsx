import { ReactNode, useCallback, useMemo, useState } from 'react'

import {
  Button,
  ControlGroup,
  DropdownMenu,
  Icon,
  Label,
  Message,
  MessageTheme,
  ScrollArea,
  SearchBox
} from '@/components'
import { useDebounceSearch } from '@hooks/use-debounce-search'
import { cn } from '@utils/cn'
import { TFunction } from 'i18next'

export type MultiSelectOptionType<T = unknown> = T & {
  id: string | number
  label: string
}

export interface MultiSelectProps<T = unknown> {
  className?: string
  selectedItems: MultiSelectOptionType<Partial<T>>[]
  t: TFunction
  placeholder: string
  handleChange: (data: MultiSelectOptionType<Partial<T>>) => void
  options: MultiSelectOptionType<T>[]
  searchValue?: string
  handleChangeSearchValue?: (data: string) => void
  customOptionElem?: (data: MultiSelectOptionType<T>) => ReactNode
  error?: string
  label?: string
}

export const MultiSelect = <T = unknown,>({
  className,
  selectedItems,
  t,
  placeholder,
  handleChange,
  options,
  searchValue = '',
  handleChangeSearchValue,
  customOptionElem,
  error,
  label
}: MultiSelectProps<T>) => {
  const { search, handleSearchChange } = useDebounceSearch({
    handleChangeSearchValue,
    searchValue
  })

  const [selectedIdsAtOpen, setSelectedIdsAtOpen] = useState<Set<string | number>>(new Set())

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      setSelectedIdsAtOpen(isOpen ? new Set(selectedItems.map(i => i.id)) : new Set())
    },
    [selectedItems]
  )

  const displayOptions = useMemo(() => {
    if (selectedIdsAtOpen.size === 0) return options

    const selected: MultiSelectOptionType<T>[] = []
    const rest: MultiSelectOptionType<T>[] = []

    for (const option of options) {
      if (selectedIdsAtOpen.has(option.id)) {
        selected.push(option)
      } else {
        rest.push(option)
      }
    }

    return [...selected, ...rest]
  }, [options, selectedIdsAtOpen])

  return (
    <ControlGroup className={className}>
      {!!label && (
        <Label className="mb-2" htmlFor={''}>
          {label}
        </Label>
      )}
      <DropdownMenu.Root onOpenChange={handleOpenChange}>
        <DropdownMenu.Trigger className="data-[state=open]:border-cn-borders-8 border-cn-borders-2 bg-cn-background-2 flex h-9 w-full items-center justify-between rounded border px-3 transition-colors">
          {placeholder}
          <Icon name="chevron-down" className="chevron-down ml-auto" size={12} />
        </DropdownMenu.Trigger>

        <DropdownMenu.Content style={{ width: 'var(--radix-dropdown-menu-trigger-width)' }}>
          {!!handleChangeSearchValue && (
            <>
              <div className="px-2 py-1.5">
                <SearchBox.Root
                  className="w-full"
                  placeholder={t('views:repos.search', 'Search')}
                  value={search}
                  handleChange={handleSearchChange}
                  showOnFocus
                />
              </div>
              <DropdownMenu.Separator />
            </>
          )}
          {displayOptions.length ? (
            <ScrollArea viewportClassName="max-h-[300px]">
              {displayOptions.map(option => {
                const isSelected = selectedItems.some(it => it.id === option.id)

                return (
                  <DropdownMenu.Item
                    key={option.id}
                    className={cn('px-3', { 'pl-8': !isSelected })}
                    onSelect={e => {
                      e.preventDefault()
                      handleChange(option)
                    }}
                  >
                    <div className="flex items-center gap-x-2">
                      {isSelected && <Icon className="text-icons-2 min-w-3" name="tick" size={12} />}
                      {customOptionElem ? (
                        customOptionElem(option)
                      ) : (
                        <span className="font-medium">{option.label}</span>
                      )}
                    </div>
                  </DropdownMenu.Item>
                )
              })}
            </ScrollArea>
          ) : (
            <div className="px-5 py-4 text-center">
              <span className="text-cn-foreground-2 leading-tight">
                {t('views:noData.noResults', 'No search results')}
              </span>
            </div>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      {!!selectedItems.length && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {selectedItems.map(it => (
            <Button key={it.id} size="sm" type="button" variant="outline" onClick={() => handleChange(it)}>
              {it.label}
              <Icon name="close" size={10} />
            </Button>
          ))}
        </div>
      )}

      {!!error && (
        <Message className="mt-0.5" theme={MessageTheme.ERROR}>
          {error}
        </Message>
      )}
    </ControlGroup>
  )
}
