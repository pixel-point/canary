import { FC } from 'react'

import { Button, ListActions, PaginationComponent, SearchBox, Spacer, Text } from '@/components'
import { useDebounceSearch } from '@/hooks'

import { SandboxLayout } from '../../index'
import { PipelineList } from './pipeline-list'
import { IPipelineListPageProps } from './types'

const PipelineListPage: FC<IPipelineListPageProps> = ({
  usePipelineListStore,
  useTranslationStore,
  isLoading,
  isError,
  errorMessage,
  searchQuery,
  setSearchQuery,
  handleCreatePipeline,
  LinkComponent,
  toPipelineDetails
}) => {
  const { t } = useTranslationStore()
  const { pipelines, totalPages, page, setPage } = usePipelineListStore()

  const {
    search: searchInput,
    handleSearchChange: handleInputChange,
    handleResetSearch
  } = useDebounceSearch({
    handleChangeSearchValue: (val: string) => setSearchQuery(val.length ? val : null),
    searchValue: searchQuery || ''
  })

  if (isError)
    // TODO: improve error handling
    return (
      <>
        <SandboxLayout.Main>
          <SandboxLayout.Content>
            <Spacer size={2} />
            <Text size={1} className="text-destructive">
              {errorMessage || 'Something went wrong'}
            </Text>
          </SandboxLayout.Content>
        </SandboxLayout.Main>
      </>
    )

  return (
    <SandboxLayout.Main className="max-w-[1040px]">
      <SandboxLayout.Content>
        {pipelines && pipelines.length > 0 && (
          <>
            <h1 className="text-24 font-medium leading-snug tracking-tight text-foreground-1">Pipelines</h1>
            <Spacer size={6} />
            <ListActions.Root>
              <ListActions.Left>
                <SearchBox.Root
                  width="full"
                  className="max-w-96"
                  value={searchInput}
                  handleChange={handleInputChange}
                  placeholder={'Search'}
                />
              </ListActions.Left>
              <ListActions.Right>
                <Button variant="default" onClick={handleCreatePipeline}>
                  Create pipeline
                </Button>
              </ListActions.Right>
            </ListActions.Root>
            <Spacer size={5} />
          </>
        )}
        <PipelineList
          pipelines={pipelines}
          LinkComponent={LinkComponent}
          query={searchQuery ?? ''}
          handleResetQuery={handleResetSearch}
          useTranslationStore={useTranslationStore}
          isLoading={isLoading}
          handleCreatePipeline={handleCreatePipeline}
          toPipelineDetails={toPipelineDetails}
        />
        <Spacer size={8} />
        <PaginationComponent totalPages={totalPages} currentPage={page} goToPage={page => setPage(page)} t={t} />
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}

export { PipelineListPage }
