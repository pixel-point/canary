import React from 'react'
import Container from '../../components/layout/container'
import { GitnessNavbar } from '../components/NavBar.stories'
import { GitnessTopBar } from '../components/TopBar.stories'
import {
  Button,
  Input,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@harnessio/canary'
import { ArrowLeft, ArrowRight, CheckCircleSolid, KeyframeAlignHorizontal, TriangleFlag, XmarkCircleSolid } from '@harnessio/icons-noir'

export default {
  title: 'Pages/Pipeline List',
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
        <div className="flex flex-col w-[770px] h-full mx-auto py-10 gap-5">
          <h1 className="text-2xl">Pipelines</h1>
          <div className="flex flex-row space-x-2">
            <Input type="search" placeholder="Search" />
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Filter</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink>Link</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Sort</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink>Link</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Customise View</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink>Link</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Button>Create New Pipeline</Button>
          </div>
          <div className="border rounded-md">
            <Table>
              <TableBody>
                {pipelines.map(pipeline => (
                  <TableRow className='text-gray-500'>
                    <TableCell className='w-[14px] align-top pr-0'>
                      {pipeline.status === 'failed' ? <XmarkCircleSolid color='#ed5e5e' size='16px' className='mt-1' /> :
                      <CheckCircleSolid color='#63E9A6' size='16px' className='mt-1' /> }
                      </TableCell>
                    <TableCell className='flex flex-col gap-1'>
                      <div className="font-medium text-gray-50">{pipeline.name}</div>
                      <div className="flex gap-2 text-xs">
                        <span className="bg-[#18181b] rounded-md px-2 text-gray-400 flex items-center gap-1 font-mono text-[12px]"><KeyframeAlignHorizontal /> {pipeline.commit.sha}</span>
                        <span className="">{pipeline.commit.message}</span>
                        <span className="font-mono"><TriangleFlag className='align-middle' />{pipeline.commit.tag}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right align-top">2 hours ago</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex">
            <Button variant={'ghost'} size={'sm'}><ArrowLeft className='mr-1' /> Previous</Button>
            <div className="flex flex-grow justify-center gap-2">
              {[1,2,3,4,5].map( page => <Button variant={'secondary'} size={'sm'} className='rounded-full' key={page}>{page}</Button>)}
            </div>
            <Button variant={'ghost'} size={'sm'}>Next <ArrowRight className='ml-1' /></Button>
          </div>
        </div>
      </Container.Main>
    </Container.Root>
  )
}
