import React from 'react'
import { ListActions, SearchBox } from '@harnessio/canary'
import { useCommonFilter } from '../hooks/useCommonFilter'
import { debounce, isEmpty } from 'lodash-es'
import { DropdownItemProps } from '@harnessio/canary/dist/components/list-actions'

interface FilterProps {
  sortOptions?: DropdownItemProps[]
  showSearch?: boolean
}

const Filter = <S,>({ sortOptions, showSearch = true }: FilterProps) => {
  const { sort, query, handleSearch, handleDropdownChange } = useCommonFilter<S>()
  return (
    <ListActions.Root>
      <ListActions.Left>
        {showSearch && (
          <SearchBox.Root
            width="full"
            className="max-w-96"
            defaultValue={query}
            handleChange={debounce((e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e), 300)}
            placeholder="Search"
          />
        )}
      </ListActions.Left>
      <ListActions.Right>
        {!isEmpty(sortOptions) && (
          <ListActions.Dropdown
            selectedValue={sort as string | null}
            onChange={handleDropdownChange('sort')}
            title="Sort"
            items={sortOptions!}
          />
        )}
      </ListActions.Right>
    </ListActions.Root>
  )
}

export { Filter }
