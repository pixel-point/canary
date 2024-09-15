import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Topbar,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  cn
} from '@harnessio/canary'
import { ProjectDropdown, ProjectDropdownProps } from '../project-dropdown'

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

const Breadcrumbs: React.FC<{ items: BreadcrumbItemProps[] } & Omit<ProjectDropdownProps, 'isPrimary'>> = ({
  items,
  ...rest
}) => {
  const level1Only = items.length === 0

  return (
    <Breadcrumb className="select-none">
      <BreadcrumbList>
        <BreadcrumbItem>
          <ProjectDropdown isPrimary={level1Only} {...rest} />
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

export const TopBarWidget: React.FC<Omit<ProjectDropdownProps, 'isPrimary'>> = props => {
  const { repoId, executionId } = useParams<{ repoId: string; executionId: string }>()

  const breadcrumbItems: BreadcrumbItemProps[] = [
    repoId ? { label: repoId, link: `/repos/${repoId}`, isLast: !executionId } : null,
    executionId ? { label: 'Pipelines', link: `/repos/${repoId}/pipelines`, isLast: true } : null
  ].filter(Boolean) as BreadcrumbItemProps[]

  return (
    <Topbar.Root>
      <Topbar.Left>
        <Breadcrumbs items={breadcrumbItems} {...props} />
      </Topbar.Left>
    </Topbar.Root>
  )
}
