import React, { useCallback } from 'react'
import { Button, ListActions, SearchBox } from '@harnessio/canary'
import { Link, useSearchParams } from 'react-router-dom'
import { DropdownItemProps } from '@harnessio/canary/dist/components/list-actions'

interface CommmonFilterProps<T> {
  sortOptions: T
}

function useCommonFilter<const T extends DropdownItemProps[]>({ sortOptions }: CommmonFilterProps<T>) {
  const [searchParams, setSearchParams] = useSearchParams()

  const sort = searchParams.get('sort')

  const handleChange = useCallback((property: string) => {
    return (selectedValue: string | null) => {
      setSearchParams(params => {
        const currentValue = params.get(property)

        if (selectedValue && currentValue !== selectedValue) {
          params.set(property, selectedValue)
        } else params.delete(property)

        return params
      })
    }
  }, [])

  const Filter = () => (
    <ListActions.Root>
      <ListActions.Left>
        <SearchBox.Root placeholder="Search" />
      </ListActions.Left>
      <ListActions.Right>
        {/* Add other filters here */}
        {/* <ListActions.Dropdown title="Filter" items={filterOptions} /> */}
        {/* <ListActions.Dropdown title="View" items={viewOptions} /> */}
        <ListActions.Dropdown selectedValue={sort} onChange={handleChange('sort')} title="Sort" items={sortOptions} />

        <Button variant="default" asChild>
          <Link to="create">Create Pipeline</Link>
        </Button>
      </ListActions.Right>
    </ListActions.Root>
  )

  return {
    Filter,
    sort: (sort as T[number]['value']) || undefined
  }
}

export { useCommonFilter }
