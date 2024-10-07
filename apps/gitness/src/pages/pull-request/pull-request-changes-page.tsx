import React, { useEffect, useMemo, useState } from 'react'

import {
  ListActions,
  Spacer,
  Text,
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  Icon,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  RadioGroupItem,
  RadioGroup
} from '@harnessio/canary'
import * as Diff2Html from 'diff2html'
import { useRawDiffQuery } from '@harnessio/code-service-client'
import { FileViewGauge, PullRequestChanges, SkeletonList } from '@harnessio/playground'
import { useGetRepoRef } from '../../framework/hooks/useGetRepoPath'
import { compact, isEqual } from 'lodash-es'
import { atom, useAtom } from 'jotai'
import { normalizeGitRef } from '../../utils/git-utils'
import { usePullRequestData } from './context/pull-request-data-provider'
import { changedFileId, DIFF2HTML_CONFIG, normalizeGitFilePath } from './utils'
import { DiffFileEntry, DiffViewerExchangeState } from './types/types'
import { parseSpecificDiff } from './diff-utils'

type ButtonEnum = 'success' | 'muted' | 'default' | 'error' | 'warning' | null | undefined
interface FilterViewProps {
  active?: string
}

const approvalItems = [
  {
    stateId: 0,
    state: 'success',
    title: 'Approve',
    items: [
      {
        id: 0,
        title: 'This is a title',
        description: 'This is a description'
      },
      {
        id: 1,
        title: 'This is title 2',
        description: 'This is description 2'
      },
      {
        id: 2,
        title: 'This is title 3',
        description: 'This is description 3'
      }
    ]
  }
]

const filesViewed = {
  total: 3,
  viewed: 1
}

// TODO: workon on filter and files viewed
const FilterSortViewDropdowns: React.FC<FilterViewProps> = () => {
  const filterOptions = [{ name: 'Filter option 1' }, { name: 'Filter option 2' }, { name: 'Filter option 3' }]
  const sortOptions = [{ name: 'Sort option 1' }, { name: 'Sort option 2' }, { name: 'Sort option 3' }]
  const viewOptions = [{ name: 'View option 1' }, { name: 'View option 2' }]

  return (
    <ListActions.Root>
      <ListActions.Left>
        <ListActions.Dropdown title="All commits" items={filterOptions} />
        <ListActions.Dropdown title="File filter" items={sortOptions} />
        <ListActions.Dropdown title="View" items={viewOptions} />
      </ListActions.Left>
      <ListActions.Right>
        <FileViewGauge.Root>
          <FileViewGauge.Content>
            {filesViewed.viewed}/{filesViewed.total} file{filesViewed.total === 1 ? '' : 's'} viewed
          </FileViewGauge.Content>
          <FileViewGauge.Bar total={filesViewed.total} filled={filesViewed.viewed} />
        </FileViewGauge.Root>
        <Button
          variant="split"
          size="xs_split"
          theme={approvalItems[0].state as ButtonEnum}
          dropdown={
            <DropdownMenu>
              <DropdownMenuTrigger insideSplitButton>
                <Icon name="chevron-down" size={11} className="chevron-down" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="mt-1">
                <DropdownMenuGroup>
                  {approvalItems &&
                    approvalItems[0].items.map(itm => (
                      <DropdownMenuItem key={itm.id}>
                        <RadioGroup className="flex items-start gap-2">
                          <RadioGroupItem value="false" className="w-3 h-3 text-tertiary-background mt-1" />
                          <div className="flex flex-col">
                            <Text truncate size={1} color="primary">
                              {itm.title}
                            </Text>
                            <Text size={1} color="tertiaryBackground">
                              {itm.description}
                            </Text>
                          </div>
                        </RadioGroup>
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          }>
          {approvalItems[0].title}
        </Button>
      </ListActions.Right>
    </ListActions.Root>
  )
}

export default function PullRequestChangesPage() {
  const { pullReqMetadata } = usePullRequestData()
  const repoRef = useGetRepoRef()
  const commitSHA = ''
  const defaultCommitRange = compact(commitSHA?.split(/~1\.\.\.|\.\.\./g))
  const [
    commitRange
    //  setCommitRange  TODO: add commit view filter dropdown to manage different commits
  ] = useState(defaultCommitRange)
  const targetRef = useMemo(() => pullReqMetadata?.merge_base_sha, [pullReqMetadata?.merge_base_sha])
  const sourceRef = useMemo(() => pullReqMetadata?.source_sha, [pullReqMetadata?.source_sha])
  const [diffs, setDiffs] = useState<DiffFileEntry[]>()

  const diffApiPath = useMemo(
    () =>
      // show range of commits and user selected subrange
      commitRange.length > 0
        ? `${commitRange[0]}~1...${commitRange[commitRange.length - 1]}`
        : // show range of commits and user did not select a subrange
          `${normalizeGitRef(targetRef)}...${normalizeGitRef(sourceRef)}`,
    [commitRange, targetRef, sourceRef]
  )
  const [cachedDiff, setCachedDiff] = useAtom(changesInfoAtom)
  const path = useMemo(() => `/api/v1/repos/${repoRef}/+/${diffApiPath}`, [repoRef, diffApiPath])

  const { data: rawDiff, isFetching: loadingRawDiff } = useRawDiffQuery(
    {
      repo_ref: repoRef,
      range: diffApiPath.replace('/diff', ''),
      queryParams: {},
      headers: { Accept: 'text/plain' }
    },
    {
      enabled: targetRef !== undefined && sourceRef !== undefined && cachedDiff.path !== path
    }
  )

  useEffect(
    function updateCacheWhenDiffDataArrives() {
      if (path && rawDiff && typeof rawDiff === 'string') {
        // const fileViews = readOnly
        //   ? new Map<string, string>()
        //   : fileViewsData
        //       ?.filter(({ path: _path, sha }) => _path && sha)
        //       .reduce((map, { path: _path, sha, obsolete }) => {
        //         map.set(_path as string, (obsolete ? FILE_VIEWED_OBSOLETE_SHA : sha) as string)
        //         return map
        //       }, new Map<string, string>())

        setCachedDiff({
          path,
          raw: rawDiff
          // fileViews
        })
      }
    },
    [
      rawDiff,
      path,
      setCachedDiff
      //  fileViewsData, readOnly
    ]
  )
  // Diffs are rendered in blocks that can be destroyed when they go off-screen. Hence their internal
  // states (such as collapse, view full diff) are reset when they are being re-rendered. To fix this,
  // we maintained a map from this component and pass to each diff to retain their latest states.
  // Map entry: <diff.filePath, DiffViewerExchangeState>
  const memorizedState = useMemo(() => new Map<string, DiffViewerExchangeState>(), [])

  //
  // Parsing diff and construct data structure to pass into DiffViewer component
  //
  useEffect(() => {
    if (
      loadingRawDiff ||
      cachedDiff.path !== path ||
      typeof cachedDiff.raw !== 'string'
      // || !cachedDiff.fileViews
    ) {
      return
    }
    if (cachedDiff.raw) {
      const _diffs = Diff2Html.parse(cachedDiff.raw, DIFF2HTML_CONFIG)
        .map(diff => {
          diff.oldName = normalizeGitFilePath(diff.oldName)
          diff.newName = normalizeGitFilePath(diff.newName)

          const fileId = changedFileId([diff.oldName, diff.newName])
          const containerId = `container-${fileId}`
          const contentId = `content-${fileId}`

          const filePath = diff.isDeleted ? diff.oldName : diff.newName
          const diffString = parseSpecificDiff(cachedDiff.raw ?? '', diff.oldName, diff.newName)
          return {
            ...diff,
            containerId,
            contentId,
            fileId,
            filePath,
            fileViews: cachedDiff.fileViews,
            raw: diffString
          }
        })
        .sort((a, b) => (a.newName || a.oldName).localeCompare(b.newName || b.oldName, undefined, { numeric: true }))

      setDiffs(oldDiffs => {
        if (isEqual(oldDiffs, _diffs)) return oldDiffs

        // Clear memorizedState when diffs are changed
        memorizedState.clear()
        return _diffs
      })
    } else {
      setDiffs([])
    }
  }, [
    // readOnly,
    path,
    cachedDiff,
    loadingRawDiff,
    memorizedState
  ])

  const renderContent = () => {
    if (loadingRawDiff) {
      return <SkeletonList />
    }
    return (
      <PullRequestChanges
        data={
          diffs?.map(item => ({
            text: item.filePath,
            numAdditions: item.addedLines,
            numDeletions: item.deletedLines,
            data: item.raw,
            title: item.filePath,
            lang: item.filePath.split('.')[1]
          })) || []
        }
      />
    )
  }

  return (
    <>
      <FilterSortViewDropdowns active={''} />
      <Spacer aria-setsize={5} />

      {renderContent()}
    </>
  )
}

const changesInfoAtom = atom<{ path?: string; raw?: string; fileViews?: Map<string, string> }>({})
