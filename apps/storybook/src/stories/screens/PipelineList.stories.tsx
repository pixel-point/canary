import React from 'react'
import Container from '../../components/layout/container'
import { GitnessNavbar } from '../components/NavBar.stories'
import { GitnessTopBar } from '../components/TopBar.stories'
import {
  Button,
  Input,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  TableBody,
  Table,
  TableRow,
  TableCell
} from '@harnessio/canary'
import { CheckCircleSolid, KeyframeAlignHorizontal, TriangleFlag, XmarkCircleSolid } from '@harnessio/icons-noir'
import View from '../../components/layout/View'
import Section from '../../components/layout/Section'
import EntityList from '../composites/EntityList'
import { EntityListPagination } from './widgets/EntityListPagination'
import { ChevronDownIcon } from '@radix-ui/react-icons'

export default {
  title: 'Screens/Pipeline List',
  parameters: {
    layout: 'fullscreen'
  }
}

const pipelines = [
  {
    id: '1',
    name: 'build scan push test - k8s',
    status: 'success',
    branch: 'master',
    timestamp: '2021-09-01T12:00:00Z',
    commit: {
      sha: 'ae58cf',
      message: 'Initial commit',
      tag: 'v1.0.0'
    }
  },
  {
    id: '1',
    name: 'zuul k8s',
    status: 'failed',
    branch: 'master',
    timestamp: '2021-09-01T12:00:00Z',
    commit: {
      sha: '123456',
      message: 'feat: [CI-1337]: Add new feature',
      tag: 'v1.0.0'
    }
  },
  {
    id: '1',
    name: 'sonarqube lint',
    status: 'success',
    branch: 'master',
    timestamp: '2021-09-01T12:00:00Z',
    commit: {
      sha: '123456',
      message: 'fix: [CD-1337]: Fix bug',
      tag: 'v1.0.0'
    }
  },
  {
    id: '1',
    name: 'Jest tests',
    status: 'success',
    branch: 'master',
    timestamp: '2021-09-01T12:00:00Z',
    commit: {
      sha: '123456',
      message: 'update go version',
      tag: 'v1.0.0'
    }
  },
  {
    id: '1',
    name: 'build scan push - Trivy',
    status: 'failed',
    branch: 'update-br',
    timestamp: '2021-09-01T12:00:00Z',
    commit: {
      sha: '123456',
      message: 'chore: [CD-1337]: Update dependencies',
      tag: 'v1.0.0'
    }
  },
  {
    id: '1',
    name: 'Pipeline 1',
    status: 'success',
    branch: 'master',
    timestamp: '2021-09-01T12:00:00Z',
    commit: {
      sha: '123456',
      message: 'Initial commit',
      tag: 'v1.0.0'
    }
  },
  {
    id: '1',
    name: 'Pipeline 1',
    status: 'success',
    branch: 'master',
    timestamp: '2021-09-01T12:00:00Z',
    commit: {
      sha: '123456',
      message: 'Initial commit',
      tag: 'v1.0.0'
    }
  }
]

export function PipeLineList() {
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
                <p className="section-title">Pipelines</p>
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
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild className="group text-tertiary-background select-none">
                          <Button variant="ghost" size="default" padding="sm" className="entity-list-action">
                            Customize view&nbsp;
                            <ChevronDownIcon className="entity-list-action-chevron" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="font-light text-xs">Customize option 1</DropdownMenuItem>
                          <DropdownMenuItem className="font-light text-xs">Customize option 2</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </EntityList.ActionItem>
                    <EntityList.ActionItem>
                      <Button variant="default" size="sm" className="ml-6">
                        New Pipeline
                      </Button>
                    </EntityList.ActionItem>
                  </EntityList.Actions>
                </EntityList.Header>
                <EntityList.Content>
                  <div className="border rounded-md w-full">
                    <Table>
                      <TableBody>
                        {pipelines.map(pipeline => (
                          <TableRow className="flex">
                            <TableCell className="flex flex-col flex-1 gap-2 px-4 py-3 items-start">
                              <div className="flex gap-2 items-center">
                                {pipeline.status === 'failed' ? (
                                  <XmarkCircleSolid color="#ed5e5e" size="16px" className="mt-0.5" />
                                ) : (
                                  <CheckCircleSolid color="#63E9A6" size="16px" className="mt-0.5" />
                                )}
                                <p className="font-normal text-primary">{pipeline.name}</p>
                              </div>
                              <div className="flex gap-2 text-xs text-tertiary-background">
                                <span className="bg-[#18181b] rounded-md px-2 text-gray-400 flex items-center gap-1 font-mono text-[11px]">
                                  <KeyframeAlignHorizontal /> {pipeline.commit.sha}
                                </span>
                                <span className="">{pipeline.commit.message}</span>
                                <span className="font-mono text-[11px]">
                                  <TriangleFlag className="align-middle" />
                                  {pipeline.commit.tag}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="flex flex-col gap-1 px-4 py-3.5 h-full justify-end items-start">
                              <div className="whitespace-nowrap text-[12px] select-none font-light">
                                <span className="text-tertiary-background">2 hours ago</span>
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
            </Section.Root>
          </View.Root>
        </Container.Content>
      </Container.Main>
    </Container.Root>
  )
}
