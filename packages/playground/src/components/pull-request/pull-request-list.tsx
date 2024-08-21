import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import {
  Message,
  GitPullRequest,
  GitMerge,
  GitPullRequestClosed,
  TriangleFlag,
  Check,
  Xmark
} from '@harnessio/icons-noir'
import { Badge, StackedList } from '@harnessio/canary'

const mockPullRequests = [
  {
    number: 1,
    created: 1715284979958,
    edited: 1715284979958,
    state: 'open',
    is_draft: false,
    title: '[framework-fixtures]: bump the core group - pr 1',
    description: '',
    source_repo_id: 3,
    source_branch: 'source_branch0',
    source_sha: 'c0879587b546fcbded6e39432249003f6c8742c0',
    target_repo_id: 3,
    target_branch: 'main',
    merged: null,
    merge_method: null,
    merge_check_status: 'mergeable',
    merge_target_sha: '7d8c356eac25a94501653b57a44120104b8e9bc6',
    merge_base_sha: '7d8c356eac25a94501653b57a44120104b8e9bc6',
    author: {
      id: 3,
      uid: 'admin',
      display_name: 'Administrator',
      email: 'admin@gitness.io',
      type: 'user',
      created: 1699863416002,
      updated: 1699863416002
    },
    merger: null,
    stats: { commits: 1, files_changed: 1, additions: 1, deletions: 0, conversations: 1, unresolved_count: 1 }
  },
  {
    number: 2,
    created: 1715284934359,
    edited: 1715284934359,
    state: 'open',
    is_draft: false,
    title: 'Test PPR RSC encoding fix - pr 2',
    description: '',
    source_repo_id: 3,
    source_branch: 'source_branch',
    source_sha: '03059a43ca022debfdb6bb73d25dd87b7e501d09',
    target_repo_id: 3,
    target_branch: 'main',
    merged: null,
    merge_method: null,
    merge_check_status: 'mergeable',
    merge_target_sha: '7d8c356eac25a43221653b57a44120104b8e9bc6',
    merge_base_sha: '7d8c356eac25a43221653b57a44120104b8e9bc6',
    author: {
      id: 3,
      uid: 'admin',
      display_name: 'Administrator',
      email: 'admin@gitness.io',
      type: 'user',
      created: 1699863416002,
      updated: 1699863416002
    },
    merger: null,
    stats: { commits: 1, files_changed: 1, additions: 1, deletions: 0 }
  },
  {
    number: 3,
    created: 1715284934359,
    edited: 1715284934359,
    state: 'open',
    is_draft: false,
    title: '[ui] Test new ux - pr 3',
    description: '',
    source_repo_id: 3,
    source_branch: 'source_branch3',
    source_sha: '03059a43ca022debfdb6bb73d25dd87b7e501d09',
    target_repo_id: 3,
    target_branch: 'main',
    merged: null,
    merge_method: null,
    merge_check_status: 'mergeable',
    merge_target_sha: '7d8c356eac25a43221653b57a44120104b8e9bc6',
    merge_base_sha: '7d8c356eac25a43221653b57a44120104b8e9bc6',
    author: {
      id: 3,
      uid: 'admin',
      display_name: 'Administrator',
      email: 'admin@gitness.io',
      type: 'user',
      created: 1699863416002,
      updated: 1699863416002
    },
    merger: null,
    stats: { commits: 1, files_changed: 1, additions: 1, deletions: 0, conversations: 3 }
  },
  {
    number: 4,
    created: 1715284934359,
    edited: 1715284934359,
    state: 'open',
    is_draft: true,
    title: 'this is a draft pr - pr 4 ',
    description: '',
    source_repo_id: 3,
    source_branch: 'source_branch4',
    source_sha: '03059a43ca022debfdb6bb73d25dd87b7e501d09',
    target_repo_id: 3,
    target_branch: 'main',
    merged: null,
    merge_method: null,
    merge_check_status: 'mergeable',
    merge_target_sha: '7d8c356eac25a43221653b57a44120104b8e9bc6',
    merge_base_sha: '7d8c356eac25a43221653b57a44120104b8e9bc6',
    author: {
      id: 3,
      uid: 'admin',
      display_name: 'Administrator',
      email: 'admin@gitness.io',
      type: 'user',
      created: 1699863416002,
      updated: 1699863416002
    },
    merger: null,
    stats: { commits: 1, files_changed: 1, additions: 1, deletions: 0 }
  },
  {
    number: 5,
    created: 1715284934359,
    edited: 1715284934359,
    state: 'closed',
    is_draft: false,
    title: '[ui] closed pr ',
    description: '',
    source_repo_id: 3,
    source_branch: 'source_branch3',
    source_sha: '03059a43ca022debfdb6bb73d25dd87b7e501d09',
    target_repo_id: 3,
    target_branch: 'main',
    merged: null,
    merge_method: null,
    merge_check_status: 'mergeable',
    merge_target_sha: '7d8c356eac25a43221653b57a44120104b8e9bc6',
    merge_base_sha: '7d8c356eac25a43221653b57a44120104b8e9bc6',
    author: {
      id: 3,
      uid: 'admin',
      display_name: 'Administrator',
      email: 'admin@gitness.io',
      type: 'user',
      created: 1699863416002,
      updated: 1699863416002
    },
    merger: null,
    stats: { commits: 1, files_changed: 1, additions: 1, deletions: 0, conversations: 3 }
  },
  {
    number: 6,
    created: 1715284934359,
    edited: 1715284934359,
    state: 'merged',
    is_draft: false,
    title: 'this is a merged pr ',
    description: '',
    source_repo_id: 3,
    source_branch: 'source_branch4',
    source_sha: '03059a43ca022debfdb6bb73d25dd87b7e501d09',
    target_repo_id: 3,
    target_branch: 'main',
    merged: true,
    merge_method: null,
    merge_check_status: 'mergeable',
    merge_target_sha: '7d8c356eac25a43221653b57a44120104b8e9bc6',
    merge_base_sha: '7d8c356eac25a43221653b57a44120104b8e9bc6',
    author: {
      id: 3,
      uid: 'admin',
      display_name: 'Administrator',
      email: 'admin@gitness.io',
      type: 'user',
      created: 1699863416002,
      updated: 1699863416002
    },
    merger: null,
    stats: { commits: 1, files_changed: 1, additions: 1, deletions: 0 }
  }
]

export default function PullRequestList() {
  const [headerFilter, setHeaderFilter] = useState('open')
  const filteredData = useMemo(
    () =>
      mockPullRequests.filter(pr => {
        if (headerFilter === 'open') return (pr.state !== 'merged' || !pr.merged) && pr.state !== 'closed'
        if (headerFilter === 'closed') return pr.state !== 'open' || (!pr.is_draft && pr.state !== 'open')
        return true
      }),
    [headerFilter]
  )

  return (
    <div className="border rounded-md mb-16 w-full">
      <div className="bg-background border-b border">
        <div className="flex p-3">
          <div
            className={cx('flex justify-center text-center', {
              'text-white': headerFilter === 'open',
              'text-ring': headerFilter !== 'open'
            })}
            onClick={() => setHeaderFilter('open')}>
            <span className="pt-1.5">
              <GitPullRequest className={cx({ 'text-white': headerFilter === 'open' })} />
            </span>
            <span className="pl-2 pt-1">
              {mockPullRequests.filter(pr => pr.state === 'open' || pr.is_draft).length}
            </span>
            <span className="pl-1 pt-1">Open</span>
          </div>
          <div
            className={cx(
              'pl-2 flex justify-center text-center',
              { 'text-white': headerFilter === 'closed' },
              { 'text-ring': headerFilter !== 'closed' }
            )}
            onClick={() => setHeaderFilter('closed')}>
            <span className="pt-1.5">
              <Check className={cx({ 'text-white': headerFilter === 'closed' })} />
            </span>
            <span className={`pl-1 pt-1 `}>
              {mockPullRequests.filter(pr => pr.state === 'closed' || pr.state === 'merged').length}
            </span>
            <span className={`pl-1 pt-1 `}>Closed</span>
          </div>
        </div>
      </div>
      <StackedList.Root>
        {filteredData.map(pullRequest => (
          <Link to={pullRequest.number.toString()}>
            <StackedList.Item key={pullRequest.number} className="hover:bg-muted/50">
              <div className="flex items-center">
                <div className="w-[14px] align-top pr-0">
                  {pullRequest.merged ? (
                    <GitMerge className="mt-1.5 text-ai" />
                  ) : pullRequest.state?.toLowerCase() === 'closed' ? (
                    <GitPullRequestClosed className="mt-1.5 text-destructive" />
                  ) : (
                    <GitPullRequest className="mt-1.5 text-success" />
                  )}
                </div>
                <div className="px-2 flex flex-col gap-1 w-full flex-start justify-end">
                  <div className="font-medium text-tertiary-background flex flex-end justify-between">
                    <div className="flex pt-1 justify-center">
                      <span className="px-3 text-primary">{pullRequest.title}</span>
                      <span className="pt-0.5">
                        <Check className="text-success" />
                        <Xmark className="text-destructive" />
                      </span>
                      <Badge className="select-none bg-transparent rounded-2xl text-[12px] font-light ml-2.5 py-1 px-2 leading-none text-success border-border  hover:bg-inherit">
                        {'test'}
                      </Badge>
                      <Badge className="select-none  rounded-2xl text-[12px] font-light ml-2.5 py-1 px-2 leading-none text-ai border-ai/10 bg-muted hover:bg-inherit">
                        {'medium priority'}
                      </Badge>
                    </div>
                    {pullRequest.stats?.conversations && (
                      <span className="pl-2 flex justify-end pr-2">
                        <span className="pt-1.5 pr-1">
                          <Message />
                        </span>
                        <span className="pt-1 text-primary">{pullRequest.stats?.conversations}</span>
                      </span>
                    )}
                  </div>
                  <div className="pl-3 font-normal whitespace-nowrap text-sm select-none flex">
                    <span className="mr-1 text-tertiary-background">{`#${pullRequest.number}`}</span>
                    <span className="mr-1 text-tertiary-background">opened</span>
                    <span className="mr-1 text-tertiary-background">2 hours ago</span>
                    <span className="mr-1 text-tertiary-background">by {pullRequest.author?.display_name}</span>
                    <span className="mr-1 text-tertiary-background">|</span>
                    <span className="mr-1 text-tertiary-background">Review required 1 of 3 tasks</span>
                    <div className="flex text-center">
                      <span className="mr-1 pl-4 text-tertiary-background text-sm flex">
                        <TriangleFlag className="align-middle" />
                        {pullRequest.source_branch}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </StackedList.Item>
          </Link>
        ))}
      </StackedList.Root>
    </div>
  )
}
