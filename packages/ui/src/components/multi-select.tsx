import { ComponentPropsWithoutRef, ElementRef, ForwardedRef, forwardRef } from 'react'

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

export interface MultiSelectProps<T = unknown> extends ComponentPropsWithoutRef<'div'> {
  selectedItems: MultiSelectOptionType<Partial<T>>[]
  options: MultiSelectOptionType<T>[]
  placeholder: string
  t: TFunction
  handleChange: (item: MultiSelectOptionType<Partial<T>>) => void
  searchValue?: string
  handleChangeSearchValue?: (value: string) => void
  customOptionElem?: (item: MultiSelectOptionType<T>) => React.ReactNode
  error?: string
  label?: string
}

function MultiSelectInner<T = unknown>(
  {
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
    label,
    ...rest
  }: MultiSelectProps<T>,
  ref: ForwardedRef<ElementRef<typeof ControlGroup>>
) {
  const { search, handleSearchChange } = useDebounceSearch({
    handleChangeSearchValue,
    searchValue
  })

  return (
    <ControlGroup ref={ref} className={className} {...rest}>
      {!!label && (
        <Label htmlFor="" className="mb-2">
          {label}
        </Label>
      )}

      <DropdownMenu.Root>
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

          {options.length ? (
            <ScrollArea viewportClassName="max-h-[300px]">
              {options.map(option => {
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
          {selectedItems.map(item => (
            <Button key={item.id} size="sm" type="button" variant="outline" onClick={() => handleChange(item)}>
              {item.label}
              <Icon name="close" size={10} />
            </Button>
          ))}
        </div>
      )}

      {error && (
        <Message theme={MessageTheme.ERROR} className="mt-0.5">
          {error}
        </Message>
      )}
    </ControlGroup>
  )
}

export const MultiSelect = forwardRef(MultiSelectInner) as <T = unknown>(
  props: MultiSelectProps<T> & {
    ref?: ForwardedRef<ElementRef<typeof ControlGroup>>
  }
) => JSX.Element
