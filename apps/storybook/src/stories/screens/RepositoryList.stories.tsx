import React from 'react'
import Container from '../../components/layout/container'
import { GitnessNavbar } from '../components/NavBar.stories'
import { GitnessTopBar } from '../components/TopBar.stories'
import {
  Badge,
  Button,
  Input,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@harnessio/canary';

import { GitPullRequest, GitFork, Star } from '@harnessio/icons-noir'


export default {
  title: 'Screens/Repository List',
  parameters: {
    layout: 'fullscreen'
  }
}




const repos = [
  {
    id: '1',
    name: 'drone',
    description: 'Continuous Integration platform powered by Docker',
    private: false,
    stars: 0,
    forks: 0,
    pulls: 12,
  },
  {
    id: '1',
    name: 'drone-go',
    description: 'Go client for the Drone API',
    private: false,
    stars: 0,
    forks: 0,
    pulls: 5,
  },
  {
    id: '1',
    name: 'go-generate',
    description: 'Package generate provides tools for generating pipeline configuration files in the Drone format.',
    private: true,
    stars: 2,
    forks: 1,
    pulls: 22,
  },
  {
    id: '1',
    name: 'go-task',
    private: false,
    stars: 3,
    forks: 1,
    pulls: 7,
  },
  {
    id: '1',
    name: 'go-scm',
    description: 'Package scm provides a unified interface to multiple source code management systems.',
    private: true,
    stars: 123,
    forks: 16,
    pulls: 56,
  },
  {
    id: '1',
    name: 'go-convert',
    description: 'Package convert provides tools for converting pipeline configuration files to the Drone format.',
    private: true,
    stars: 0,
    forks: 0,
    pulls: 1,
  },
]

export function RepositoryList() {
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
          <h1 className="text-2xl font-medium">Repositories</h1>
          <div className="flex flex-row space-x-2">
            <div className="flex-1 flex flex-row space-x-1">
              <Input type="search" placeholder="Search ..." className="leading-4 border-[#242429] placeholder:text-[#93939F] w-64" />
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
                    <NavigationMenuTrigger  className="text-[#C9C9CF]">Sort</NavigationMenuTrigger>
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
                  <TableRow className='text-gray-500 flex'>
                   <TableCell className='flex flex-col flex-1 gap-1 px-4 py-3.5'>
                      <div className="font-medium text-gray-50">{repo.name}<Badge className={`select-none bg-transparent border-white rounded-2xl text-[12px] font-medium ml-2.5 py-1 px-2 leading-none text-[#71dbd3] border-[#1d3333] bg-[#111c1d] ${repo.private && "border-[#242428] bg-[#151518] text-[#93939f]" }`}>{repo.private ? "Private" : "Public"}</Badge></div>
                      <div className="flex gap-2 text-xs">
                        <span className="whitespace-nowrap overflow-hidden text-ellipsis max-w-96">{repo.description || <i>No Description</i>}</span>
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
          </div>
          <Pagination>
            <PaginationContent className="gap-2.5">
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" className="select-none rounded-full bg-[#131316]">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" className="select-none rounded-full bg-[#131316] border-[#131316]" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#"  className="select-none rounded-full bg-[#131316]">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis className="select-none rounded-full bg-[#131316]"/>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

        </div>
      </Container.Main>
    </Container.Root>
  )
}
