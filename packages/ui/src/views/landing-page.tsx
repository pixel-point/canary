import { FC } from 'react'

import { Button, ButtonGroup, DropdownMenu, Icon } from '@/components'
import { useRouterContext, useTranslation } from '@/context'
import { SandboxLayout } from '@/views'

interface TypesSpace {
  created?: number
  created_by?: number
  deleted?: number | null
  description?: string
  id?: number
  identifier?: string
  parent_id?: number
  path?: string
  updated?: number
}

interface RoutingProps {
  toCreateProject: () => string
}

export interface LandingPageProps extends Partial<RoutingProps> {
  spaces: TypesSpace[]
  getProjectPath: (spaceId?: string) => string
}

export const LandingPageView: FC<LandingPageProps> = ({ spaces, getProjectPath, toCreateProject }) => {
  const { Link } = useRouterContext()
  const { t } = useTranslation()

  return (
    <SandboxLayout.Main className="min-h-[inherit]">
      <section className="grid min-h-[inherit] place-content-center place-items-center gap-2.5">
        <h2 className="text-2xl font-medium text-cn-foreground-1">
          {t('views:landingPage.selectProject', 'Select a project to get started')}
        </h2>

        <p className="text-center text-sm font-normal text-cn-foreground-3">
          {t(
            'views:landingPage.description',
            'Projects contain your repositories and pipelines. To start using Gitness, select a project or create a new one.'
          )}
        </p>

        <ButtonGroup>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button>
                <span>{t('views:landingPage.projectSelector', 'Select Project')}</span>
                <Icon name="chevron-down" size={15} className="chevron-down" />
              </Button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content style={{ width: 'var(--radix-dropdown-menu-trigger-width)' }}>
              {!!spaces?.length &&
                spaces.map(space => (
                  <Link key={space.id} to={getProjectPath(space?.path)}>
                    <DropdownMenu.Item>{space.identifier}</DropdownMenu.Item>
                  </Link>
                ))}

              {!spaces?.length && (
                <DropdownMenu.Item disabled>
                  {t('views:landingPage.noProjects', 'No projects available')}
                </DropdownMenu.Item>
              )}
            </DropdownMenu.Content>
          </DropdownMenu.Root>

          <Button variant="outline" asChild>
            <Link to={toCreateProject?.() || ''}>{t('views:landingPage.createProject', 'Create Project')}</Link>
          </Button>
        </ButtonGroup>
      </section>
    </SandboxLayout.Main>
  )
}
