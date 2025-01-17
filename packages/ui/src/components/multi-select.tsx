import { ChangeEvent, ReactNode, useEffect, useRef, useState } from 'react'

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Fieldset,
  Icon,
  ScrollArea,
  SearchBox
} from '@/components'
import { cn } from '@utils/cn'
import { TFunction } from 'i18next'
import { debounce } from 'lodash-es'

export type MultiSelectOptionType<T = unknown> = T & {
  id: string | number
  label: string
}

export interface MultiSelectProps<T = unknown> {
  selectedItems: MultiSelectOptionType<Partial<T>>[]
  t: TFunction
  placeholder: string
  handleChange: (data: MultiSelectOptionType<Partial<T>>) => void
  options: MultiSelectOptionType<T>[]
  searchValue?: string
  handleChangeSearchValue?: (data: string) => void
  customOptionElem?: (data: MultiSelectOptionType<T>) => ReactNode
}

export const MultiSelect = <T = unknown,>({
  selectedItems,
  t,
  placeholder,
  handleChange,
  options,
  searchValue = '',
  handleChangeSearchValue,
  customOptionElem
}: MultiSelectProps<T>) => {
  const [search, setSearch] = useState('')

  const debouncedChangeSearchRef = useRef(debounce((value: string) => handleChangeSearchValue?.(value), 300))

  useEffect(() => setSearch(searchValue ?? ''), [searchValue])

  useEffect(() => {
    const debouncedChangeSearch = debouncedChangeSearchRef.current

    return () => {
      debouncedChangeSearch.cancel()
    }
  }, [])

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    debouncedChangeSearchRef.current(value)
  }

  return (
    <Fieldset className="gap-y-2">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-9 w-full items-center justify-between rounded border border-borders-2 px-3 transition-colors data-[state=open]:border-borders-8">
          {placeholder}
          <Icon name="chevron-down" className="chevron-down ml-auto" size={12} />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          style={{ width: 'var(--radix-dropdown-menu-trigger-width)' }}
          onCloseAutoFocus={event => event.preventDefault()} // Prevent focus on hidden content
        >
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
              <DropdownMenuSeparator />
            </>
          )}
          {options.length ? (
            <ScrollArea viewportClassName="max-h-[300px]">
              {options.map(option => {
                const isSelected = selectedItems.findIndex(it => it.id === option.id) > -1

                return (
                  <DropdownMenuItem
                    key={option.id}
                    className={cn('px-3', { 'pl-8': !isSelected })}
                    onSelect={e => {
                      e.preventDefault()
                      handleChange(option)
                    }}
                  >
                    <div className="flex items-center gap-x-2">
                      {isSelected && <Icon className="min-w-3 text-icons-2" name="tick" size={12} />}
                      {customOptionElem ? (
                        customOptionElem(option)
                      ) : (
                        <span className="font-medium">{option.label}</span>
                      )}
                    </div>
                  </DropdownMenuItem>
                )
              })}
            </ScrollArea>
          ) : (
            <div className="px-5 py-4 text-center">
              <span className="leading-tight text-foreground-2">
                {t('views:noData.noResults', 'No search results')}
              </span>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {!!selectedItems.length && (
        <div className="flex flex-wrap gap-1.5">
          {selectedItems.map(it => (
            <Button
              key={it.id}
              className="group flex h-6 items-center gap-x-1.5 bg-background-8 px-2.5 text-foreground-8"
              type="button"
              variant="custom"
              onClick={() => handleChange(it)}
            >
              {it.label}
              <span className="text-icons-1 transition-colors group-hover:text-foreground-1">
                <Icon className="rotate-45" name="plus" size={10} />
              </span>
            </Button>
          ))}
        </div>
      )}
    </Fieldset>
  )
}
