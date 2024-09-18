import React, { useEffect, useMemo, useState } from 'react'
import { TypesCommit } from './interfaces'
import { formatDate, getInitials } from '../../utils/utils'
import { StackedList, Text, NodeGroup, Avatar, AvatarFallback, Icon, cn } from '@harnessio/canary'
import copy from 'clipboard-copy'
import { ShaBadge } from '../..'
import { Link } from 'react-router-dom'

interface CommitProps {
  data?: TypesCommit[]
}

interface CommitActionButtonProps {
  sha: string
}

function CommitActions({ sha }: CommitActionButtonProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let timeoutId: number
    if (copied) {
      copy(sha)
      timeoutId = window.setTimeout(() => setCopied(false), 2500)
    }
    return () => {
      clearTimeout(timeoutId)
    }
  }, [copied])

  return (
    <ShaBadge.Root>
      <ShaBadge.Content>
        <Link to="#">
          <Text size={1} className="text-tertiary-background">
            {sha.substring(0, 6)}
          </Text>
        </Link>
      </ShaBadge.Content>
      <ShaBadge.Icon handleClick={() => setCopied(true)}>
        <Icon size={12} name={copied ? 'tick' : 'clone'} className={cn({ 'text-success': copied })} />
      </ShaBadge.Icon>
    </ShaBadge.Root>
  )
}

export const PullRequestCommits = ({ ...props }: CommitProps) => {
  const data = props.data
  const commitsGroupedByDate: Record<string, TypesCommit[]> = useMemo(
    () =>
      data?.reduce(
        (group, commit) => {
          const date = formatDate(commit.committer?.when as string)
          group[date] = (group[date] || []).concat(commit)
          return group
        },
        {} as Record<string, TypesCommit[]>
      ) || {},
    [data]
  )

  const entries = Object.entries(commitsGroupedByDate)
  const totalNodes = entries.length

  return (
    <>
      {entries.map(([date, commitData], node_idx) => (
        <NodeGroup.Root>
          <NodeGroup.Icon simpleNodeIcon />
          <NodeGroup.Title>{date && <Text color="tertiaryBackground">Commits on {date}</Text>}</NodeGroup.Title>
          <NodeGroup.Content>
            {commitData && commitData.length > 0 && (
              <StackedList.Root>
                {commitData.map((commit, repo_idx) => (
                  <StackedList.Item
                    className="hover:bg-transparent"
                    key={commit.title}
                    isLast={commitData.length - 1 === repo_idx}>
                    <StackedList.Field
                      title={
                        <div className="flex flex-col">
                          <div className="truncate max-w-[500px]">{commit.title}</div>
                          <div className="flex items-center pt-1">
                            <div className="h-5 w-5 rounded-full bg-tertiary-background bg-cover">
                              <Avatar className="w-5 h-5 rounded-full p-0">
                                <AvatarFallback>
                                  <Text size={1} color="tertiaryBackground">
                                    {/* TODO: fix fallback string */}
                                    {getInitials(commit.author?.identity?.name || 'Gitness')}
                                  </Text>
                                </AvatarFallback>
                              </Avatar>
                            </div>
                            <Text className="pl-2 text-xs text-tertiary-background">{`${commit.author?.identity?.name} commited on ${date}`}</Text>
                          </div>
                        </div>
                      }
                    />
                    {commit?.sha && (
                      <StackedList.Field title={<CommitActions sha={commit.sha} />} right label secondary />
                    )}
                  </StackedList.Item>
                ))}
              </StackedList.Root>
            )}
          </NodeGroup.Content>
          <NodeGroup.Connector first={node_idx === 0} last={node_idx === totalNodes - 1} />
        </NodeGroup.Root>
      ))}
    </>
  )
}
