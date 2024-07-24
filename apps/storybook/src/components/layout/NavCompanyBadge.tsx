import React from 'react'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@harnessio/canary'

interface CompanyProps {
  children: React.ReactNode
  name: string
  avatar: React.ReactElement<SVGSVGElement>
}

const NavCompanyBadge: React.FC<CompanyProps> = ({ children, avatar, name }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="select-none outline-none">
        <div className="grid grid-cols-[auto_1fr_auto] w-full items-center gap-2.5 justify-items-start">
          <div className="navbar-company-avatar">{avatar}</div>
          <p className="text-[15px] text-primary truncate" aria-label={name}>
            {name || 'No name'}
          </p>
          <ChevronDownIcon className="nav-company-badge-chevron -mt-1 h-3 w-3 shrink-0 text-primary" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px] p-0 mt-3">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NavCompanyBadge
