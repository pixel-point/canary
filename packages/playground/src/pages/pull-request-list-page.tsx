import React from 'react'
import PullRequestList from '../components/pull-request-list'
import EntityList from '../components/entity-list'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Icon
} from '@harnessio/canary'

function PullRequestListPage() {
  return (
    <div className="w-full max-w-[860px] min-h-full mx-auto px-5 py-5 mb-16">
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
                    <Icon name="chevron-down" />
                    {/* <ChevronDownIcon className="entity-list-action-chevron" /> */}
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
                    <Icon name="chevron-down" />
                    {/* <ChevronDownIcon className="entity-list-action-chevron" /> */}
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
          <PullRequestList />
        </EntityList.Content>
        {/* <EntityList.Footer> */}
        {/* <EntityListPagination /> */}
        {/* </EntityList.Footer> */}
      </EntityList.Root>
    </div>
  )
}

export default PullRequestListPage
