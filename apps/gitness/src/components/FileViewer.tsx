import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  ButtonGroup,
  cn,
  Icon,
  ListActions,
  Spacer,
  Text
} from '@harnessio/canary'
import { SkeletonList, Summary, FileProps, SummaryItemType, NoData, SandboxLayout } from '@harnessio/playground'
import {
  useGetContentQuery,
  pathDetails,
  RepoPathsDetailsOutput,
  GitPathDetails,
  OpenapiGetContentOutput,
  OpenapiContentInfo
} from '@harnessio/code-service-client'
import { useGetRepoRef } from '../framework/hooks/useGetRepoPath'
import { getTrimmedSha, normalizeGitRef } from '../utils/git-utils'
import { PathParams } from '../RouteDefinitions'
import { timeAgoFromISOTime } from '../pages/pipeline-edit/utils/time-utils'
import FileContentViewer from './FileContentViewer'
import { PathParts, splitPathWithParents } from '../utils/path-utils'

export const FileViewer: React.FC = () => {
  const repoRef = useGetRepoRef()
  const { spaceId, repoId, gitRef, resourcePath } = useParams<PathParams>()
  const subResourcePath = useParams()['*'] || ''
  const repoPath = `/${spaceId}/repos/${repoId}/code/${gitRef}`
  const fullResourcePath = subResourcePath ? resourcePath + '/' + subResourcePath : resourcePath
  const pathParts = splitPathWithParents(fullResourcePath || '')
  const [files, setFiles] = useState<FileProps[]>([])
  const [loading, setLoading] = useState(false)

  const { data: repoDetails } = useGetContentQuery({
    path: fullResourcePath || '',
    repo_ref: repoRef,
    queryParams: { include_commit: true, git_ref: normalizeGitRef(gitRef || '') }
  })

  const repoEntryPathToFileTypeMap = useMemo((): Map<string, OpenapiGetContentOutput['type']> => {
    if (repoDetails?.content?.entries?.length === 0) return new Map()
    const nonEmtpyPathEntries = repoDetails?.content?.entries?.filter(entry => !!entry.path) || []
    return new Map(nonEmtpyPathEntries.map((entry: OpenapiContentInfo) => [entry?.path ? entry.path : '', entry.type]))
  }, [repoDetails])

  const getSummaryItemType = (type: OpenapiGetContentOutput['type']): SummaryItemType => {
    if (type === 'dir') {
      return SummaryItemType.Folder
    }
    return SummaryItemType.File
  }

  const getLastPathSegment = (path: string) => {
    if (!path || /^\/+$/.test(path)) {
      return ''
    }
    path = path.replace(/\/+$/, '')
    const segments = path.split('/')
    return segments[segments.length - 1]
  }

  useEffect(() => {
    setLoading(true)
    if (repoEntryPathToFileTypeMap.size > 0) {
      pathDetails({
        queryParams: { git_ref: normalizeGitRef(gitRef || '') },
        body: { paths: Array.from(repoEntryPathToFileTypeMap.keys()) },
        repo_ref: repoRef
      })
        .then((response: RepoPathsDetailsOutput) => {
          if (response?.details && response.details.length > 0) {
            setFiles(
              response.details.map(
                (item: GitPathDetails) =>
                  ({
                    id: item?.path || '',
                    type: item?.path
                      ? getSummaryItemType(repoEntryPathToFileTypeMap.get(item.path))
                      : SummaryItemType.File,
                    name: getLastPathSegment(item?.path || ''),
                    lastCommitMessage: item?.last_commit?.message || '',
                    timestamp: item?.last_commit?.author?.when ? timeAgoFromISOTime(item.last_commit.author.when) : '',
                    user: { name: item?.last_commit?.author?.identity?.name },
                    sha: item?.last_commit?.sha && getTrimmedSha(item.last_commit.sha)
                  }) as FileProps
              )
            )
          }
        })
        .catch()
        .finally(() => {
          setLoading(false)
        })
    }
  }, [repoEntryPathToFileTypeMap.size, repoRef])

  const renderListContent = () => {
    if (loading) return <SkeletonList />

    if (!loading && repoEntryPathToFileTypeMap.size > 0) {
      const { author, message, sha } = repoDetails?.latest_commit || {}
      return (
        <Summary
          latestFile={{
            user: {
              name: author?.identity?.name || ''
            },
            lastCommitMessage: message || '',
            timestamp: author?.when ? timeAgoFromISOTime(author.when) : '',
            sha: sha && getTrimmedSha(sha)
          }}
          files={files}
        />
      )
    } else
      return (
        <NoData
          insideTabView
          iconName="no-data-folder"
          title="No files yet"
          description={['There are no files in this repository yet.', 'Create new or import an existing file.']}
          primaryButton={{ label: 'Create file' }}
          secondaryButton={{ label: 'Import file' }}
        />
      )
  }

  return (
    <SandboxLayout.Main fullWidth hasLeftSubPanel>
      <SandboxLayout.Content>
        <ListActions.Root>
          <ListActions.Left>
            <ButtonGroup.Root spacing="2">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={repoPath}>
                    <Text size={2} color="tertiaryBackground" className="hover:text-foreground">
                      {repoId}
                    </Text>
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <Text size={2} color="tertiaryBackground">
                /
              </Text>
              {pathParts?.map((path: PathParts, index: number) => {
                return (
                  <>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to={repoPath + '/~/' + path.parentPath}>
                          <Text
                            size={2}
                            color="tertiaryBackground"
                            className={cn('hover:text-foreground', {
                              'text-primary': index === pathParts?.length - 1
                            })}>
                            {path.path}
                          </Text>
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {index < pathParts?.length - 1 && (
                      <Text size={2} color="tertiaryBackground">
                        /
                      </Text>
                    )}
                  </>
                )
              })}
            </ButtonGroup.Root>
          </ListActions.Left>
          <ListActions.Right>
            <Button variant="outline" size="sm">
              Add file&nbsp;&nbsp;
              <Icon name="chevron-down" size={11} className="chevron-down" />
            </Button>
          </ListActions.Right>
        </ListActions.Root>
        <Spacer size={5} />
        {repoDetails?.type === 'dir' ? (
          renderListContent()
        ) : repoDetails?.content?.data ? (
          <FileContentViewer repoContent={repoDetails} />
        ) : (
          <></>
        )}
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}