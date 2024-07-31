import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@harnessio/canary'

export default {
  title: 'Screens/Widgets/EntityListPagination',
  parameters: {
    layout: 'fullscreen'
  }
}

export function EntityListPagination() {
  return (
    <Pagination>
      <PaginationContent className="flex w-full justify-between">
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        {/* Pages */}
        <div className="flex items-center justify-center gap-2.5">
          <PaginationItem>
            <PaginationLink size="sm_icon" href="#">
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink size="sm_icon" href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink size="sm_icon" href="#">
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink size="sm_icon" href="#">
              7
            </PaginationLink>
          </PaginationItem>
        </div>
        {/* Next */}
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
