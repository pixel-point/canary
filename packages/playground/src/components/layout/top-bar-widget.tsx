import React, { useState } from 'react'
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
import { getInitials } from '../../utils/utils'

export interface Project {
  id: number
  name: string
}

interface WidgetProps {
  projects: Project[]
}

interface BreadcrumbItemProps {
  label: string
  link?: string
  isLast: boolean
}

const ProjectDropdown: React.FC<{ isPrimary: boolean; projects: Project[] }> = ({ isPrimary, projects }) => {
  const [selectedProject, setSelectedProject] = useState<string>(projects[0].name || 'Select a project') // For Playground only, let's display the first project always

  const handleOptionChange = (project: Project) => {
    setSelectedProject(project.name)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group flex items-center gap-2 outline-none">
        <Avatar className="w-7 h-7">
          <AvatarFallback>{getInitials(selectedProject, 1)}</AvatarFallback>
        </Avatar>
        <BreadcrumbLink
          className={cn('font-medium', { 'text-primary': isPrimary, 'text-navbar-text-secondary': !isPrimary })}>
          {selectedProject}
        </BreadcrumbLink>
        <Icon
          name="chevron-down"
          size={10}
          className={cn('chevron-down', {
            'text-primary': isPrimary,
            'text-navbar-text-secondary group-hover:text-primary': !isPrimary
          })}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="mt-1.5">
        {projects.length === 0
          ? 'No Projects Found'
          : projects.map(project => (
              <DropdownMenuItem key={project.id} onClick={() => handleOptionChange(project)}>
                {project.name}
              </DropdownMenuItem>
            ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const BreadcrumbNavItem: React.FC<BreadcrumbItemProps> = ({ label, link, isLast }) => (
  <BreadcrumbItem>
    <BreadcrumbLink className={cn('font-normal text-navbar-text-secondary', { 'text-primary': isLast })} href={link}>
      {label}
    </BreadcrumbLink>
  </BreadcrumbItem>
)

const Breadcrumbs: React.FC<{ items: BreadcrumbItemProps[]; projects: Project[] }> = ({ items, projects }) => {
  const level1Only = items.length === 0

  return (
    <Breadcrumb className="select-none">
      <BreadcrumbList>
        <BreadcrumbItem>
          <ProjectDropdown isPrimary={level1Only} projects={projects} />
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

export const TopBarWidget: React.FC<WidgetProps> = ({ projects }) => {
  const { repoId, executionId } = useParams<{ repoId: string; executionId: string }>()

  const breadcrumbItems: BreadcrumbItemProps[] = [
    repoId ? { label: repoId, link: `/repos/${repoId}`, isLast: !executionId } : null,
    executionId ? { label: 'Pipelines', link: `/repos/${repoId}/pipelines`, isLast: true } : null
  ].filter(Boolean) as BreadcrumbItemProps[]

  return (
    <Topbar.Root>
      <Topbar.Left>
        <Breadcrumbs items={breadcrumbItems} projects={projects} />
      </Topbar.Left>
    </Topbar.Root>
  )
}
