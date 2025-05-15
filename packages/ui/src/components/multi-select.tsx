import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'

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

const REMOTE_SEARCH = false
const REMOTE_SEARCH_WITH_EMPTY_DATA = false

function fakeApiFetch<T>(
  tags: MultiSelectOptionType<T>[],
  search: string,
  delay = 400
): Promise<MultiSelectOptionType<T>[]> {
  return new Promise(res =>
    setTimeout(
      () =>
        res(
          search
            ? tags.filter(o => o.label.toLowerCase().includes(search.trim().toLowerCase()))
            : REMOTE_SEARCH_WITH_EMPTY_DATA
              ? []
              : tags
        ),
      delay
    )
  )
}

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

const fitsSearch = <T = unknown,>(option: MultiSelectOptionType<T>, seachString: string) =>
  seachString ? option.label.toLowerCase().includes(seachString) : true

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
  const [remoteOptions, setRemoteOptions] = useState(options)
  const [loading, setLoading] = useState(false)
  const allTags = useRef(options)
  const rawOptions = REMOTE_SEARCH ? remoteOptions : options

  const orderedOptions = useMemo(() => {
    const searchString = search.trim().toLowerCase()

    const selected: MultiSelectOptionType<T>[] = []
    const rest: MultiSelectOptionType<T>[] = []

    for (const option of rawOptions) {
      if (!REMOTE_SEARCH && !fitsSearch(option, searchString)) continue

      if (selectedIdsAtOpen.has(option.id)) {
        selected.push(option)
      } else {
        rest.push(option)
      }
    }

    return [...selected, ...rest]
  }, [rawOptions, search, selectedIdsAtOpen])

  const visibleOptions = useMemo(() => {
    if (orderedOptions.length) return orderedOptions

    const noSearch = search.trim() === ''

    if (noSearch && selectedItems.length) {
      return selectedItems as MultiSelectOptionType<T>[]
    }

    return []
  }, [orderedOptions, search, selectedItems])

  const showEmptyState = !loading && visibleOptions.length === 0

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      if (isOpen) {
        setSelectedIdsAtOpen(new Set(selectedItems.map(i => i.id)))
      }
    },
    [selectedItems]
  )

  useEffect(() => {
    if (!REMOTE_SEARCH) return

    let cancelled = false
    setLoading(true)

    fakeApiFetch(allTags.current, search).then(data => {
      if (!cancelled) {
        setRemoteOptions(data)
        setLoading(false)
      }
    })

    return () => {
      cancelled = true // cancel if search was changed
    }
  }, [search])

  return (
    <ControlGroup className={className}>
      {label && (
        <Label htmlFor="" className="mb-2">
          {label}
        </Label>
      )}

      <DropdownMenu.Root onOpenChange={handleOpenChange}>
        <DropdownMenu.Trigger className="data-[state=open]:border-cn-borders-8 border-cn-borders-2 bg-cn-background-2 flex h-9 w-full items-center justify-between rounded border px-3 transition-colors">
          {placeholder}
          <Icon name="chevron-down" size={12} className="chevron-down ml-auto" />
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

          {showEmptyState ? (
            <div className="px-5 py-4 text-center">
              <span className="text-cn-foreground-2 leading-tight">
                {t('views:noData.noResults', 'No search results')}
              </span>
            </div>
          ) : (
            <>
              {loading && REMOTE_SEARCH && (
                <div className="text-cn-foreground-3 py-2 text-center text-xs">Loading…</div>
              )}
              <ScrollArea viewportClassName="max-h-[300px]">
                {visibleOptions.map(option => {
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
                        {isSelected && <Icon name="tick" size={12} className="text-icons-2 min-w-3" />}
                        {customOptionElem ? customOptionElem(option) : <span>{option.label}</span>}
                      </div>
                    </DropdownMenu.Item>
                  )
                })}
              </ScrollArea>
            </>
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

      {Boolean(error) && (
        <Message className="mt-0.5" theme={MessageTheme.ERROR}>
          {error}
        </Message>
      )}
    </ControlGroup>
  )
}
