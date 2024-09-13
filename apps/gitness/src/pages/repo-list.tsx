import {
  Button,
  ListActions,
  ListPagination,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  SearchBox,
  Spacer,
  Text
} from '@harnessio/canary'
import { useListReposQuery } from '@harnessio/code-service-client'
import { PaddingListLayout, SkeletonList, RepoList, Repo } from '@harnessio/playground'
import { Link } from 'react-router-dom'
import { useGetSpaceURLParam } from '../framework/hooks/useGetSpaceParam'
import Header from '../components/Header'

const filterOptions = [{ name: 'Filter option 1' }, { name: 'Filter option 2' }, { name: 'Filter option 3' }]
const sortOptions = [{ name: 'Sort option 1' }, { name: 'Sort option 2' }, { name: 'Sort option 3' }]
const viewOptions = [{ name: 'View option 1' }, { name: 'View option 2' }]

const LinkComponent = ({ to, children }: { to: string; children: React.ReactNode }) => <Link to={to}>{children}</Link>

export default function ReposListPage() {
  const space = useGetSpaceURLParam()
  const { isFetching, data } = useListReposQuery({ queryParams: {}, space_ref: `${space}/+` })

  const renderListContent = () => {
    if (isFetching) {
      return <SkeletonList />
    }
    return (
      data && (
        <RepoList
          LinkComponent={LinkComponent}
          // @ts-expect-error remove "@ts-expect-error" once type issue for "content" is resolved
          repos={data?.content?.map(repo => {
            return {
              id: repo.id,
              name: repo.identifier,
              description: repo.description,
              private: repo.private,
              stars: repo.stars,
              forks: repo.forks,
              pulls: repo.pulls,
              timestamp: repo.timestamp
            } as Repo
          })}
        />
      )
    )
  }

  return (
    <>
      <Header />
      <PaddingListLayout>
        <Text size={5} weight={'medium'}>
          Repositories
        </Text>
        <Spacer size={6} />
        <ListActions.Root>
          <ListActions.Left>
            <SearchBox.Root placeholder="Search repositories" />
          </ListActions.Left>
          <ListActions.Right>
            <ListActions.Dropdown title="Filter" items={filterOptions} />
            <ListActions.Dropdown title="Sort" items={sortOptions} />
            <ListActions.Dropdown title="View" items={viewOptions} />
            <Button variant="default">Create Repo</Button>
          </ListActions.Right>
        </ListActions.Root>
        <Spacer size={5} />
        {renderListContent()}
        <Spacer size={8} />
        <ListPagination.Root>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious size="sm" href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink isActive size="sm_icon" href="#">
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink size="sm_icon" href="#">
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink size="sm_icon" href="#">
                  <PaginationEllipsis />
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink size="sm_icon" href="#">
                  4
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink size="sm_icon" href="#">
                  5
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext size="sm" href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </ListPagination.Root>
      </PaddingListLayout>
    </>
  )
}
