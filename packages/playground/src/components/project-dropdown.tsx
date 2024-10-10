import {
  Avatar,
  AvatarFallback,
  BreadcrumbLink,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
  cn
} from '@harnessio/canary'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { getInitials } from '../utils/utils'

export interface Project {
  id?: number
  name?: string
}

export interface ProjectDropdownProps {
  projects: Project[]
  onSelectProject: (selected: Project) => void
  isPrimary: boolean
  selectedProject?: Project
  preselectedProject?: Project
}

export const ProjectDropdown: React.FC<ProjectDropdownProps> = ({
  isPrimary,
  projects,
  onSelectProject,
  selectedProject,
  preselectedProject
}) => {
  const [project, setProject] = useState<string>(projects[0].name || 'Select a project')

  useEffect(() => {
    if (preselectedProject?.name) {
      setProject(preselectedProject.name)
    }
  }, [preselectedProject])

  const handleOptionChange = (project: Project) => {
    if (project.name) {
      onSelectProject(project)
      setProject(project.name)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group flex items-center gap-2 outline-none">
        <Avatar className="w-7 h-7">
          <AvatarFallback>{getInitials(project, 1)}</AvatarFallback>
        </Avatar>
        <BreadcrumbLink
          className={cn('font-medium', { 'text-primary': isPrimary, 'text-navbar-text-secondary': !isPrimary })}>
          {project}
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
                <div className="w-4 mr-1">{project.id === selectedProject?.id && <Icon name="tick" size={12} />}</div>
                {project.name}
              </DropdownMenuItem>
            ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
