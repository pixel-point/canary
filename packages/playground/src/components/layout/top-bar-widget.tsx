import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Topbar,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  DropdownMenu,
  DropdownMenuTrigger,
  BreadcrumbLink,
  DropdownMenuContent,
  DropdownMenuItem,
  Icon,
  Avatar,
  AvatarFallback,
  BreadcrumbSeparator,
  cn
} from '@harnessio/canary'

// Project Dropdown Component
const AvatarDropdown = ({ isPrimary }: { isPrimary: boolean }) => (
  <DropdownMenu>
    <DropdownMenuTrigger className="group flex items-center gap-2 outline-none">
      <Avatar className="w-7 h-7">
        <AvatarFallback>P</AvatarFallback>
      </Avatar>
      {/* Conditionally apply text-primary if this is the only breadcrumb */}
      <BreadcrumbLink
        className={cn('font-medium', { 'text-primary': isPrimary, 'text-navbar-text-secondary': !isPrimary })}>
        Pixel Point
      </BreadcrumbLink>
      <Icon
        name="chevron-down"
        size={10}
        className={cn({ 'text-primary': isPrimary, 'text-navbar-text-secondary group-hover:text-primary': !isPrimary })}
      />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start" className="mt-1.5">
      <DropdownMenuItem>Pixel Point</DropdownMenuItem>
      <DropdownMenuItem>United Bank</DropdownMenuItem>
      <DropdownMenuItem>Code Wizards</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)

// Breadcrumb Item Component
interface BreadcrumbItemProps {
  label: string
  link?: string
  isLast: boolean
}

const BreadcrumbNavItem: React.FC<BreadcrumbItemProps> = ({ label, link, isLast }) => (
  <BreadcrumbItem>
    <BreadcrumbLink className={cn('font-normal text-navbar-text-secondary', { 'text-primary': isLast })} href={link}>
      {label}
    </BreadcrumbLink>
  </BreadcrumbItem>
)

// Breadcrumb Component
const Breadcrumbs: React.FC<{ items: BreadcrumbItemProps[] }> = ({ items }) => {
  const isOnlyPixelPoint = items.length === 0

  return (
    <Breadcrumb className="select-none">
      <BreadcrumbList>
        {/* Pixel Point item should be primary if it is the only breadcrumb item */}
        <BreadcrumbItem>
          <AvatarDropdown isPrimary={isOnlyPixelPoint} />
        </BreadcrumbItem>

        {items.map((item, index) => (
          <React.Fragment key={item.label}>
            <BreadcrumbSeparator className="font-thin">&nbsp;/&nbsp;</BreadcrumbSeparator>
            <BreadcrumbNavItem label={item.label} link={item.link} isLast={index === items.length - 1} />
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

// TopBar Widget Component
export const TopBarWidget = () => {
  const { repoId, executionId } = useParams<{ repoId: string; executionId: string }>()

  // Construct breadcrumb items dynamically based on the route parameters
  const breadcrumbItems = [
    repoId && { label: repoId, link: `/repos/${repoId}` },
    executionId && { label: 'Pipelines', link: `/repos/${repoId}/pipelines` }
  ].filter(Boolean) as BreadcrumbItemProps[] // Filter out undefined values and cast to BreadcrumbItemProps[]

  return (
    <Topbar.Root>
      <Topbar.Left>
        <Breadcrumbs items={breadcrumbItems} />
      </Topbar.Left>
      <Topbar.Right>
        <></>
      </Topbar.Right>
    </Topbar.Root>
  )
}
