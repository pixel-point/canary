import { Badge, Icon, StackedList } from '@harnessio/canary'
import React from 'react'

export interface Repo {
  id: string
  name: string
  private: boolean
  forks: number
  pulls: number
  timestamp: string
  description?: string
  stars?: number
}

export interface PageProps {
  repos?: Repo[]
  LinkComponent: React.ComponentType<{ to: string; children: React.ReactNode }>
}

const Stats = ({ stars, pulls }: { stars?: number; pulls: number }) => (
  <div className="flex select-none items-center justify-end gap-3 font-medium">
    <span className="flex items-center gap-1">
      <Icon width={16} name="star" className="text-tertiary-background" />
      <span className="text-primary text-xs font-normal">{stars || 0}</span>
    </span>
    <span className="flex items-center gap-1">
      <Icon size={16} name="pull" className="text-tertiary-background" />
      <span className="text-primary text-xs font-normal">{pulls || 0}</span>
    </span>
  </div>
)

const Title = ({ title, isPrivate }: { title: string; isPrivate: boolean }) => (
  <div className="inline-flex items-center gap-2.5">
    {title}
    <Badge size="sm" disableHover borderRadius="full" theme={isPrivate ? 'muted' : 'success'}>
      {isPrivate ? 'Private' : 'Public'}
    </Badge>
  </div>
)

export function RepoList({ repos, LinkComponent }: PageProps) {
  return (
    <>
      {repos && repos.length > 0 && (
        <StackedList.Root>
          {repos.map((repo, repo_idx) => (
            <LinkComponent key={repo_idx} to={repo.name}>
              <StackedList.Item key={repo.name} isLast={repos.length - 1 === repo_idx}>
                <StackedList.Field
                  primary
                  description={repo.description}
                  title={<Title title={repo.name} isPrivate={repo.private} />}
                  className="gap-1.5"
                />
                <StackedList.Field
                  title={
                    <>
                      Updated <em>{repo.timestamp}</em>
                    </>
                  }
                  description={<Stats stars={repo.stars} pulls={repo.pulls} />}
                  right
                  label
                  secondary
                />
              </StackedList.Item>
            </LinkComponent>
          ))}
        </StackedList.Root>
      )}
    </>
  )
}
