import { NodeGroup, StackedList, Text } from '@harnessio/canary'
import React from 'react'

interface Repo {
  id: string
  name: string
  description?: string
  private: boolean
  stars: number
  forks: number
  pulls: number
  timestamp: string
}

interface PageProps {
  repos?: Repo[]
  LinkComponent: React.ComponentType<{ to: string; children: React.ReactNode }>
}

const Title = ({ title }: { title: string }) => <>{title}</>

export default function RepoList({ repos, LinkComponent }: PageProps) {
  return (
    <>
      {repos && repos.length > 0 && (
        <NodeGroup.Root>
          <NodeGroup.Icon simpleNodeIcon />
          <NodeGroup.Title>
            <Text color="tertiaryBackground">Commits on Jun 27, 2024</Text>
          </NodeGroup.Title>
          <NodeGroup.Content>
            <StackedList.Root>
              {repos.map((repo, repo_idx) => (
                <LinkComponent to={repo.name}>
                  <StackedList.Item key={repo.name} isLast={repos.length - 1 === repo_idx}>
                    <StackedList.Field description={repo.description} title={<Title title={repo.name} />} />
                    <StackedList.Field
                      title={
                        <>
                          Updated <em>{repo.timestamp}</em>
                        </>
                      }
                      right
                      label
                      secondary
                    />
                  </StackedList.Item>
                </LinkComponent>
              ))}
            </StackedList.Root>
          </NodeGroup.Content>
          <NodeGroup.Connector first />
        </NodeGroup.Root>
      )}
      {repos && repos.length > 0 && (
        <NodeGroup.Root>
          <NodeGroup.Icon simpleNodeIcon />

          <NodeGroup.Title>
            <Text color="tertiaryBackground">Commits on Jun 27, 2024</Text>
          </NodeGroup.Title>
          <NodeGroup.Content>
            <StackedList.Root>
              {repos.map((repo, repo_idx) => (
                <LinkComponent to={repo.name}>
                  <StackedList.Item key={repo.name} isLast={repos.length - 1 === repo_idx}>
                    <StackedList.Field description={repo.description} title={<Title title={repo.name} />} />
                    <StackedList.Field
                      title={
                        <>
                          Updated <em>{repo.timestamp}</em>
                        </>
                      }
                      right
                      label
                      secondary
                    />
                  </StackedList.Item>
                </LinkComponent>
              ))}
            </StackedList.Root>
          </NodeGroup.Content>
          <NodeGroup.Connector />
        </NodeGroup.Root>
      )}
      {repos && repos.length > 0 && (
        <NodeGroup.Root>
          <NodeGroup.Icon simpleNodeIcon />

          <NodeGroup.Title>
            <Text color="tertiaryBackground">Commits on Jun 27, 2024</Text>
          </NodeGroup.Title>
          <NodeGroup.Content>
            <StackedList.Root>
              {repos.map((repo, repo_idx) => (
                <LinkComponent to={repo.name}>
                  <StackedList.Item key={repo.name} isLast={repos.length - 1 === repo_idx}>
                    <StackedList.Field description={repo.description} title={<Title title={repo.name} />} />
                    <StackedList.Field
                      title={
                        <>
                          Updated <em>{repo.timestamp}</em>
                        </>
                      }
                      right
                      label
                      secondary
                    />
                  </StackedList.Item>
                </LinkComponent>
              ))}
            </StackedList.Root>
          </NodeGroup.Content>
          <NodeGroup.Connector />
        </NodeGroup.Root>
      )}
    </>
  )
}
