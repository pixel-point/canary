import { FC, useState } from 'react'

import { Button, NoData, Pagination, Spacer } from '@/components'
import { useRouterContext, useTranslation } from '@/context'
import { useDebounceSearch } from '@/hooks'
import { SandboxLayout } from '@/views'
import { cn } from '@utils/cn'
import FilterGroup from '@views/components/FilterGroup'

import { ConnectorsList } from './connectors-list'
import { getConnectorListFilterOptions } from './filter-options'
import { ConnectorListFilters, ConnectorListPageProps } from './types'

type ConnectorListFiltersKeys = keyof ConnectorListFilters

const ConnectorsListPage: FC<ConnectorListPageProps> = ({
  searchQuery,
  setSearchQuery,
  isError,
  errorMessage,
  currentPage,
  totalItems,
  pageSize,
  goToPage,
  isLoading,
  connectors,
  onSortChange,
  onFilterChange,
  onCreate,
  ...props
}) => {
  const { t } = useTranslation()
  const { navigate } = useRouterContext()
  const [_selectedFiltersCnt, setSelectedFiltersCnt] = useState(0)

  const CONNECTOR_FILTER_OPTIONS = getConnectorListFilterOptions(t)

  const { search: searchInput, handleSearchChange: handleInputChange } = useDebounceSearch({
    handleChangeSearchValue: (val: string) => setSearchQuery(val.length ? val : undefined),
    searchValue: searchQuery || ''
  })

  const onFilterSelectionChange = (filterValues: ConnectorListFiltersKeys[]) => {
    setSelectedFiltersCnt(filterValues.length)
  }

  const onFilterValueChange = (filterValues: ConnectorListFilters) => {
    // Pass filter values to parent component if onFilterChange is provided
    onFilterChange?.(filterValues)
  }

  if (isError) {
    return (
      <NoData
        textWrapperClassName="max-w-[350px]"
        iconName="no-data-error"
        title={t('views:noData.errorApiTitle', 'Failed to load', {
          type: 'connectors'
        })}
        description={[
          errorMessage ||
            t(
              'views:noData.errorApiDescription',
              'An error occurred while loading the data. Please try again and reload the page.'
            )
        ]}
        primaryButton={{
          label: t('views:notFound.button', 'Reload page'),
          onClick: () => {
            navigate(0) // Reload the page
          }
        }}
      />
    )
  }

  return (
    <SandboxLayout.Main>
      <SandboxLayout.Content className={cn({ 'h-full': !isLoading && !connectors.length && !searchQuery })}>
        <h1 className="text-6 font-medium leading-snug tracking-tight text-cn-foreground-1">Connectors</h1>
        <Spacer size={7} />
        <FilterGroup<ConnectorListFilters, keyof ConnectorListFilters>
          sortConfig={{
            sortOptions: [
              { label: t('views:connectors.sort.lastModifiedAt', 'Last modified'), value: 'lastModifiedAt' },
              { label: t('views:connectors.sort.createdAt', 'Created'), value: 'createdAt' },
              { label: t('views:connectors.sort.name', 'Name'), value: 'name' }
            ],
            onSortChange
          }}
          onFilterSelectionChange={onFilterSelectionChange}
          onFilterValueChange={onFilterValueChange}
          searchInput={searchInput}
          handleInputChange={handleInputChange}
          headerAction={<Button onClick={onCreate}>{t('views:connectors.createNew', 'New connector')}</Button>}
          filterOptions={CONNECTOR_FILTER_OPTIONS}
        />
        <Spacer size={4.5} />
        <ConnectorsList connectors={connectors} isLoading={isLoading} {...props} />
        <Pagination totalItems={totalItems} pageSize={pageSize} currentPage={currentPage} goToPage={goToPage} />
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}

export { ConnectorsListPage }
