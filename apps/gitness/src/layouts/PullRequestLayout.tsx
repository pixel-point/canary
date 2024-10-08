import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import { Badge, Icon, Spacer, Tabs, TabsList, TabsTrigger } from '@harnessio/canary'
import { Floating1ColumnLayout, PullRequestHeader } from '@harnessio/playground'
import { TypesPullReq, useGetPullReqQuery } from '@harnessio/code-service-client'
import { useGetRepoRef } from '../framework/hooks/useGetRepoPath'
import { PathParams } from '../RouteDefinitions'
import useGetPullRequestTab, { PullRequestTab } from '../hooks/useGetPullRequestTab'

const PullRequestLayout: React.FC = () => {
  const [pullRequest, setPullRequest] = useState<TypesPullReq>()
  const { spaceId, repoId, pullRequestId } = useParams<PathParams>()
  const repoRef = useGetRepoRef()
  const prId = (pullRequestId && Number(pullRequestId)) || -1
  const { data: pullRequestData, isFetching } = useGetPullReqQuery({
    repo_ref: repoRef,
    pullreq_number: prId
  })
  const pullRequestTab = useGetPullRequestTab({ spaceId, repoId, pullRequestId })

  useEffect(() => {
    if (!isFetching && pullRequestData) {
      setPullRequest(pullRequestData)
    }
  }, [pullRequestData, isFetching])
  return (
    <>
      <Floating1ColumnLayout>
        <Spacer size={8} />
        {pullRequest && <PullRequestHeader data={pullRequest} />}
        <Tabs variant="tabnav" value={pullRequestTab?.valueOf()}>
          <TabsList>
            <NavLink to={`conversation`}>
              <TabsTrigger value={PullRequestTab.CONVERSATION}>
                <Icon size={16} name="comments" />
                Conversation
                <Badge variant="outline" size="xs">
                  1
                </Badge>
              </TabsTrigger>
            </NavLink>
            <NavLink to={`commits`}>
              <TabsTrigger value={PullRequestTab.COMMITS}>
                <Icon size={16} name="tube-sign" />
                Commits
                <Badge variant="outline" size="xs">
                  {pullRequest?.stats?.commits}
                </Badge>
              </TabsTrigger>
            </NavLink>
            <NavLink to={`changes`}>
              <TabsTrigger value={PullRequestTab.CHANGES}>
                <Icon size={14} name="changes" />
                Changes
                <Badge variant="outline" size="xs">
                  {pullRequest?.stats?.files_changed}
                </Badge>
              </TabsTrigger>
            </NavLink>
            <NavLink to={`checks`}>
              <TabsTrigger value={PullRequestTab.CHECKS}>
                <Icon size={14} name="checks" />
                Checks
                <Badge variant="outline" size="xs">
                  9
                </Badge>
              </TabsTrigger>
            </NavLink>
          </TabsList>
        </Tabs>
        <Spacer size={8} />
        <Outlet />
      </Floating1ColumnLayout>
    </>
  )
}

export default PullRequestLayout
