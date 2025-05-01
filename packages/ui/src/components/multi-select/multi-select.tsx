import { ReactNode, useEffect } from 'react'

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

import { useSelectedFirstOptions } from './use-selected-first-options'

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
  loading?: boolean
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
  loading,
  error,
  label
}: MultiSelectProps<T>) => {
  const { showSelectedFirstOnOpen, optionsToDisplay, setOptionsToDisplay } = useSelectedFirstOptions(
    options,
    selectedItems
  )

  const { search, handleSearchChange } = useDebounceSearch({
    handleChangeSearchValue,
    searchValue
  })

  useEffect(() => {
    setOptionsToDisplay(options)
  }, [search, options, setOptionsToDisplay])

  const renderEmptyStateWithText = (stateText: string) => {
    return (
      <div className="px-5 py-4 text-center">
        <span className="text-cn-foreground-2 leading-tight">{stateText}</span>
      </div>
    )
  }

  const renderOptions = () => {
    return optionsToDisplay.length ? (
      <ScrollArea viewportClassName="max-h-[300px]">
        {optionsToDisplay.map(option => {
          const isSelected = selectedItems.findIndex(it => it.id === option.id) > -1

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
                {customOptionElem ? customOptionElem(option) : <span className="font-medium">{option.label}</span>}
              </div>
            </DropdownMenu.Item>
          )
        })}
      </ScrollArea>
    ) : (
      renderEmptyStateWithText(t('views:noData.noResults', 'No search results'))
    )
  }

  return (
    <ControlGroup className={className}>
      {!!label && (
        <Label className="mb-2" htmlFor={''}>
          {label}
        </Label>
      )}
      <DropdownMenu.Root onOpenChange={showSelectedFirstOnOpen}>
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
          {loading ? renderEmptyStateWithText('Loading...') : renderOptions()}
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
