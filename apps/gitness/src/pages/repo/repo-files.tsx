import { useEffect, useState } from 'react'
import { useParams, useNavigate, Outlet } from 'react-router-dom'
import { Button, ButtonGroup, Icon, ListActions, SearchBox, Spacer, Text } from '@harnessio/canary'
import { BranchSelector, SandboxLayout } from '@harnessio/playground'
import { useListBranchesQuery, useFindRepositoryQuery } from '@harnessio/code-service-client'
import { useGetRepoRef } from '../../framework/hooks/useGetRepoPath'
import { PathParams } from '../../RouteDefinitions'
import Explorer from '../../components/FileExplorer'

export const RepoFiles: React.FC = () => {
  const repoRef = useGetRepoRef()
  const { spaceId, repoId, gitRef } = useParams<PathParams>()
  const navigate = useNavigate()

  const { data: repository } = useFindRepositoryQuery({ repo_ref: repoRef })

  const { data: branches } = useListBranchesQuery({
    repo_ref: repoRef,
    queryParams: { include_commit: false, sort: 'date', order: 'asc', limit: 20, page: 1, query: '' }
  })

  const [selectedBranch, setSelectedBranch] = useState<string>(gitRef || '')

  const branchList = branches?.map(item => ({
    name: item?.name
  }))

  useEffect(() => {
    if (repository && !gitRef) {
      setSelectedBranch(repository?.default_branch || '')
    }
  }, [repository])

  const selectBranch = (branch: string) => {
    setSelectedBranch(branch)
    navigate(`/${spaceId}/repos/${repoId}/code/${branch}`)
  }

  function Sidebar() {
    return (
      <div className="flex flex-col gap-5">
        <div className="w-full grid grid-cols-[1fr] auto-cols-auto grid-flow-col gap-3 items-center">
          <BranchSelector size="sm" name={selectedBranch} branchList={branchList} selectBranch={selectBranch} />
          <ButtonGroup.Root
            spacing="0"
            className="shadow-border shadow-[inset_0_0_0_1px] rounded-md h-full overflow-hidden">
            <Button size="sm" variant="ghost" className="rounded-none p-0 w-8">
              <Icon size={15} name="add-folder" className="text-primary/80" />
            </Button>
            <Button size="sm" variant="ghost" borderRadius="0" className="border-l rounded-none p-0 w-8">
              <Icon size={15} name="add-file" className="text-primary/80" />
            </Button>
          </ButtonGroup.Root>
        </div>
        <SearchBox.Root width="full" placeholder="Search" />
        <Explorer selectedBranch={selectedBranch} />
      </div>
    )
  }

  return (
    <>
      <SandboxLayout.LeftSubPanel hasHeader hasSubHeader>
        <SandboxLayout.Content>
          <Sidebar />
        </SandboxLayout.Content>
      </SandboxLayout.LeftSubPanel>
      <SandboxLayout.Main fullWidth hasLeftSubPanel>
        <SandboxLayout.Content>
          <ListActions.Root>
            <ListActions.Left>
              <ButtonGroup.Root spacing="2">
                <Text size={2} color="tertiaryBackground">
                  {repository?.identifier}
                </Text>
                <Text size={2} color="tertiaryBackground">
                  /
                </Text>
              </ButtonGroup.Root>
            </ListActions.Left>
            <ListActions.Right>
              <Button variant="outline" size="sm">
                Add file&nbsp;&nbsp;
                <Icon name="chevron-down" size={11} className="chevron-down" />
              </Button>
            </ListActions.Right>
          </ListActions.Root>
          <Spacer size={5} />
          <Outlet />
        </SandboxLayout.Content>
      </SandboxLayout.Main>
    </>
  )
}
