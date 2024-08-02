import React, { useState, useMemo } from 'react'
import Container from '../../components/layout/container'
import { GitnessNavbar } from '../components/NavBar.stories'
import { GitnessTopBar } from '../components/TopBar.stories'
import View from '../../components/layout/View'
import Section from '../../components/layout/Section'
import EntityList from '../composites/EntityList'
import { EntityListPagination } from './widgets/EntityListPagination'
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead
} from '@harnessio/canary'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import {
  Star,
  Message,
  GitPullRequest,
  GitMerge,
  GitPullRequestClosed,
  TriangleFlag,
  Check,
  Xmark
} from 'iconoir-react'

export default {
  title: 'Screens/Repository',
  parameters: {
    layout: 'fullscreen'
  }
}
const pullRequests = [
  {
    number: 51,
    created: 1715284979958,
    edited: 1715284979958,
    state: 'open',
    is_draft: false,
    title: '[framework-fixtures]: bump the core group',
    description: '',
    source_repo_id: 3,
    source_branch: 'source_branch0',
    source_sha: 'c0879587b546fcbded6e39432249003f6c8742c0',
    target_repo_id: 3,
    target_branch: 'main',
    merged: null,
    merge_method: null,
    merge_check_status: 'mergeable',
    merge_target_sha: '7d8c356eac25a94501653b57a44120104b8e9bc6',
    merge_base_sha: '7d8c356eac25a94501653b57a44120104b8e9bc6',
    author: {
      id: 3,
      uid: 'admin',
      display_name: 'Administrator',
      email: 'admin@gitness.io',
      type: 'user',
      created: 1699863416002,
      updated: 1699863416002
    },
    merger: null,
    stats: { commits: 1, files_changed: 1, additions: 1, deletions: 0, conversations: 1, unresolved_count: 1 }
  },
  {
    number: 50,
    created: 1715284934359,
    edited: 1715284934359,
    state: 'open',
    is_draft: false,
    title: 'Test PPR RSC encoding fix',
    description: '',
    source_repo_id: 3,
    source_branch: 'source_branch',
    source_sha: '03059a43ca022debfdb6bb73d25dd87b7e501d09',
    target_repo_id: 3,
    target_branch: 'main',
    merged: null,
    merge_method: null,
    merge_check_status: 'mergeable',
    merge_target_sha: '7d8c356eac25a43221653b57a44120104b8e9bc6',
    merge_base_sha: '7d8c356eac25a43221653b57a44120104b8e9bc6',
    author: {
      id: 3,
      uid: 'admin',
      display_name: 'Administrator',
      email: 'admin@gitness.io',
      type: 'user',
      created: 1699863416002,
      updated: 1699863416002
    },
    merger: null,
    stats: { commits: 1, files_changed: 1, additions: 1, deletions: 0 }
  },
  {
    number: 51,
    created: 1715284934359,
    edited: 1715284934359,
    state: 'open',
    is_draft: false,
    title: '[ui] Test new ux ',
    description: '',
    source_repo_id: 3,
    source_branch: 'source_branch3',
    source_sha: '03059a43ca022debfdb6bb73d25dd87b7e501d09',
    target_repo_id: 3,
    target_branch: 'main',
    merged: null,
    merge_method: null,
    merge_check_status: 'mergeable',
    merge_target_sha: '7d8c356eac25a43221653b57a44120104b8e9bc6',
    merge_base_sha: '7d8c356eac25a43221653b57a44120104b8e9bc6',
    author: {
      id: 3,
      uid: 'admin',
      display_name: 'Administrator',
      email: 'admin@gitness.io',
      type: 'user',
      created: 1699863416002,
      updated: 1699863416002
    },
    merger: null,
    stats: { commits: 1, files_changed: 1, additions: 1, deletions: 0, conversations: 3 }
  },
  {
    number: 52,
    created: 1715284934359,
    edited: 1715284934359,
    state: 'open',
    is_draft: true,
    title: 'this is a draft pr ',
    description: '',
    source_repo_id: 3,
    source_branch: 'source_branch4',
    source_sha: '03059a43ca022debfdb6bb73d25dd87b7e501d09',
    target_repo_id: 3,
    target_branch: 'main',
    merged: null,
    merge_method: null,
    merge_check_status: 'mergeable',
    merge_target_sha: '7d8c356eac25a43221653b57a44120104b8e9bc6',
    merge_base_sha: '7d8c356eac25a43221653b57a44120104b8e9bc6',
    author: {
      id: 3,
      uid: 'admin',
      display_name: 'Administrator',
      email: 'admin@gitness.io',
      type: 'user',
      created: 1699863416002,
      updated: 1699863416002
    },
    merger: null,
    stats: { commits: 1, files_changed: 1, additions: 1, deletions: 0 }
  },
  {
    number: 53,
    created: 1715284934359,
    edited: 1715284934359,
    state: 'closed',
    is_draft: false,
    title: '[ui] closed pr ',
    description: '',
    source_repo_id: 3,
    source_branch: 'source_branch3',
    source_sha: '03059a43ca022debfdb6bb73d25dd87b7e501d09',
    target_repo_id: 3,
    target_branch: 'main',
    merged: null,
    merge_method: null,
    merge_check_status: 'mergeable',
    merge_target_sha: '7d8c356eac25a43221653b57a44120104b8e9bc6',
    merge_base_sha: '7d8c356eac25a43221653b57a44120104b8e9bc6',
    author: {
      id: 3,
      uid: 'admin',
      display_name: 'Administrator',
      email: 'admin@gitness.io',
      type: 'user',
      created: 1699863416002,
      updated: 1699863416002
    },
    merger: null,
    stats: { commits: 1, files_changed: 1, additions: 1, deletions: 0, conversations: 3 }
  },
  {
    number: 54,
    created: 1715284934359,
    edited: 1715284934359,
    state: 'merged',
    is_draft: false,
    title: 'this is a merged pr ',
    description: '',
    source_repo_id: 3,
    source_branch: 'source_branch4',
    source_sha: '03059a43ca022debfdb6bb73d25dd87b7e501d09',
    target_repo_id: 3,
    target_branch: 'main',
    merged: true,
    merge_method: null,
    merge_check_status: 'mergeable',
    merge_target_sha: '7d8c356eac25a43221653b57a44120104b8e9bc6',
    merge_base_sha: '7d8c356eac25a43221653b57a44120104b8e9bc6',
    author: {
      id: 3,
      uid: 'admin',
      display_name: 'Administrator',
      email: 'admin@gitness.io',
      type: 'user',
      created: 1699863416002,
      updated: 1699863416002
    },
    merger: null,
    stats: { commits: 1, files_changed: 1, additions: 1, deletions: 0 }
  }
]

export function PRList() {
  const [headerFilter, setHeaderFilter] = useState('open')
  const filteredData = useMemo(
    () =>
      pullRequests.filter(pr => {
        if (headerFilter === 'open') return (pr.state !== 'merged' || !pr.merged) && pr.state !== 'closed'
        if (headerFilter === 'closed') return pr.state !== 'open' || (!pr.is_draft && pr.state !== 'open')
        return true
      }),
    [headerFilter]
  )

  // console.log(filteredPRs)

  return (
    <Container.Root>
      <Container.Sidebar>
        <GitnessNavbar />
      </Container.Sidebar>
      <Container.Main>
        <Container.Topbar>
          <GitnessTopBar />
        </Container.Topbar>
        <Container.Content>
          <View.Root>
            <Section.Root firstSection>
              <Section.Header>
                <p className="section-title">Pull Requests</p>
              </Section.Header>
              <EntityList.Root>
                <EntityList.Header>
                  <EntityList.Actions>
                    <EntityList.ActionItem>
                      <Input
                        type="search"
                        placeholder="Search ..."
                        className="flex w-full mr-3 leading-4 rounded-lg bg-secondary-background placeholder:text-tertiary-background"
                      />
                    </EntityList.ActionItem>
                    <EntityList.ActionItem>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild className="group text-tertiary-background select-none">
                          <Button variant="ghost" size="default" padding="sm" className="entity-list-action">
                            Filter&nbsp;
                            <ChevronDownIcon className="entity-list-action-chevron" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="font-light text-xs">Filter option 1</DropdownMenuItem>
                          <DropdownMenuItem className="font-light text-xs">Filter option 2</DropdownMenuItem>
                          <DropdownMenuItem className="font-light text-xs">Filter option 3</DropdownMenuItem>
                          <DropdownMenuItem className="font-light text-xs">Filter option 4</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </EntityList.ActionItem>
                    <EntityList.ActionItem>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild className="group text-tertiary-background select-none">
                          <Button variant="ghost" size="default" padding="sm" className="entity-list-action">
                            Sort&nbsp;
                            <ChevronDownIcon className="entity-list-action-chevron" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="font-light text-xs">Sort option 1</DropdownMenuItem>
                          <DropdownMenuItem className="font-light text-xs">Sort option 2</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </EntityList.ActionItem>
                    <EntityList.ActionItem>
                      <Button variant="default" size="sm" className="ml-6">
                        New Pull Request
                      </Button>
                    </EntityList.ActionItem>
                  </EntityList.Actions>
                </EntityList.Header>
                <EntityList.Content>
                  <div className="border rounded-md mb-16 w-full">
                    <Table>
                      <TableHead className="bg-background border-b border">
                        <div className="flex p-3">
                          <div
                            className={`flex justify-center text-center ${headerFilter === 'open' ? 'text-white' : ''} `}
                            onClick={() => {
                              setHeaderFilter('open')
                            }}>
                            <GitPullRequest color={headerFilter === 'open' ? '#FFFFFF' : '#93939F'} className="mt-1" />
                            <span className="pl-2 pt-1 ">
                              {pullRequests.filter(pr => pr.state === 'open' || pr.is_draft).length}
                            </span>
                            <span className="pl-1 pt-1 ">Open</span>
                          </div>
                          <div
                            className={`pl-2 flex justify-center text-center ${headerFilter === 'closed' ? 'text-white' : ''} `}
                            onClick={() => {
                              setHeaderFilter('closed')
                            }}>
                            <Check color={headerFilter === 'closed' ? '#FFFFFF' : '#93939F'} className="mt-1" />
                            <span className="pl-2 pt-1">
                              {pullRequests.filter(pr => pr.state === 'closed' || pr.state === 'merged').length}
                            </span>
                            <span className="pl-1 pt-1">Closed</span>
                          </div>
                        </div>
                      </TableHead>
                      <TableBody>
                        {filteredData?.map(pullRequest => (
                          <TableRow className="text-gray-500 flex cursor-pointer px-2" key={pullRequest.title}>
                            <TableCell className="w-[14px] align-top pr-0">
                              {pullRequest.merged ? (
                                <GitMerge color="#800080" className="mt-1" />
                              ) : pullRequest.state?.toLowerCase() === 'closed' ? (
                                <GitPullRequestClosed color="#ED5E5E" className="mt-1" />
                              ) : (
                                <GitPullRequest color="#63E9A6" className="mt-1" />
                              )}
                            </TableCell>

                            <TableCell className="px-2 flex flex-col gap-1 w-full flex-start justify-end">
                              <div className="font-medium text-gray-50 flex flex-end justify-between">
                                <div className="flex pt-1 justify-center">
                                  <span className="px-3 text-primary">{pullRequest.title}</span>
                                  <Check color="#63E9A6" />
                                  <Xmark color="#ED5E5E" />
                                  <Badge
                                    className={`select-none bg-transparent rounded-2xl text-[12px] font-light ml-2.5 py-1 px-2 leading-none text-[#71dbd3] border-[#1d3333] bg-[#111c1d] hover:bg-inherit`}>
                                    {'test'}
                                  </Badge>
                                  <Badge
                                    className={`select-none bg-transparent rounded-2xl text-[12px] font-light ml-2.5 py-1 px-2 leading-none text-[#e69c35] border-[#9b7a4b] bg-[#82725b] hover:bg-inherit`}>
                                    {'medium priority'}
                                  </Badge>
                                </div>

                                {pullRequest.stats?.conversations && (
                                  <span className=" pl-2 flex justify-end pr-2">
                                    <Message color="#60606C" className="mt-1 pr-1" />
                                    <span className="pt-1 text-primary">{pullRequest.stats?.conversations}</span>
                                  </span>
                                )}
                              </div>
                              <div className="pl-3 font-normal whitespace-nowrap text-[13px] select-none flex">
                                <span className="mr-1 text-tertiary-background">{`#${pullRequest.number}`} </span>

                                <span className="mr-1 text-tertiary-background">opened </span>
                                <span className="mr-1 text-tertiary-background">2 hours ago</span>
                                <span className="mr-1 text-tertiary-background">
                                  by {pullRequest.author?.display_name}
                                </span>
                                <span className="mr-1 text-[#303036]">|</span>
                                <span className="mr-1 text-tertiary-background">Review required 1 of 3 tasks</span>
                                <div className="flex text-center">
                                  <span className="mr-1 pl-4 text-tertiary-background text-[12px] flex">
                                    <TriangleFlag className="align-middle" />
                                    {pullRequest.source_branch}
                                  </span>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </EntityList.Content>
                <EntityList.Footer>
                  <EntityListPagination />
                </EntityList.Footer>
              </EntityList.Root>
              {/* <div className="flex flex-row space-x-2">
                <div className="flex-1 flex flex-row space-x-1">
                  <Input
                    type="search"
                    placeholder="Search ..."
                    className="leading-4 border-[#242429] placeholder:text-[#93939F] w-64"
                  />
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="text-[#C9C9CF]">Filter</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <NavigationMenuLink>Link</NavigationMenuLink>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="text-[#C9C9CF]">Sort</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <NavigationMenuLink>Link</NavigationMenuLink>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>
                <div className="flex-none">
                  <Button className="rounded-[4px] px-6">New Repository</Button>
                </div>
              </div>
              <div className="border rounded-md mb-16">
                <Table>
                  <TableBody>
                    {repos.map(repo => (
                      <TableRow className="text-gray-500 flex">
                        <TableCell className="flex flex-col flex-1 gap-1 px-4 py-3.5">
                          <div className="font-medium text-gray-50">
                            {repo.name}
                            <Badge
                              className={`select-none bg-transparent border-white rounded-2xl text-[12px] font-medium ml-2.5 py-1 px-2 leading-none text-[#71dbd3] border-[#1d3333] bg-[#111c1d] ${
                                repo.private && 'border-[#242428] bg-[#151518] text-[#93939f]'
                              }`}>
                              {repo.private ? 'Private' : 'Public'}
                            </Badge>
                          </div>
                          <div className="flex gap-2 text-xs">
                            <span className="whitespace-nowrap overflow-hidden text-ellipsis max-w-96">
                              {repo.description || <i>No Description</i>}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="flex flex-col gap-1 px-4 py-3.5 justify-end">
                          <div className="font-normal whitespace-nowrap text-[13px] select-none">
                            <span className="mr-1">updated</span>
                            <span className="text-foreground">2 hours ago</span>
                          </div>
                          <div className="flex gap-2 text-xs justify-end">
                            <span className="flex gap-1 items-center">
                              <Star strokeWidth="1.5" />
                              <span className="text-white">{repo.stars}</span>
                            </span>
                            <span className="flex gap-1 items-center">
                              <GitFork strokeWidth="1.5" />
                              <span className="text-white">{repo.forks}</span>
                            </span>
                            <span className="flex gap-1 items-center">
                              <GitPullRequest strokeWidth="1.5" />
                              <span className="text-white">{repo.pulls}</span>
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div> */}
            </Section.Root>
          </View.Root>
        </Container.Content>
      </Container.Main>
    </Container.Root>
  )
}
