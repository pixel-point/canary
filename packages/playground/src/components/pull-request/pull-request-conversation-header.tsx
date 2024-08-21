/*
 * Copyright 2023 Harness, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useMemo } from 'react'
import { Badge } from '@harnessio/canary'
import { GitFork } from '@harnessio/icons-noir'
import moment from 'moment'

interface PullRequestTitleProps {
  data: {
    title: string
    number: number
    merged: number | null | undefined
    author: { display_name: string; email: string }
    stats: { commits: number }
    target_branch: string
    source_branch: string
    created: number
  }
}

export const PullRequestHeader: React.FC<PullRequestTitleProps> = ({
  data: { title, number, merged, author, stats, target_branch, source_branch, created }
}) => {
  const [original] = useMemo(() => [title], [title])
  const parsedDate = moment(created)

  // Format the parsed date as relative time from now
  const formattedTime = parsedDate.fromNow()
  return (
    <div className="flex flex-col pb-8">
      <div className="flex pt-1 pb-1 items-center">
        <h1 className=" text-white text-xl font-[500] truncate" title={original}>
          {original} <span className="text-tertiary-background  text-g">#{number}</span>
        </h1>
      </div>
      <div className="">
        <div className="flex space-x-2 text-tertiary-background ">
          <div className="flex items-center align-middle text-center">
            {/* TODO:add status in badge or create a component to handle status */}
            {merged ? (
              <Badge
                className={`select-none bg-transparent rounded-2xl text-[12px] font-light mr-2 py-1 px-2 leading-none text-ai border-border  hover:bg-inherit`}>
                {'Merged'}
              </Badge>
            ) : (
              <Badge
                className={`select-none rounded-2xl text-[12px] font-light mr-2 py-1 px-2 leading-none text-success border-border bg-transparent hover:bg-inherit`}>
                {'Open'}
              </Badge>
            )}
            <strong className="text-white font-[500]">{author?.display_name || author?.email || ''} </strong>
            <span className=" pl-1 font-light">{merged ? 'merged' : ' wants to merge'}</span>
            <strong className="text-white font-semibold pl-1"> {stats?.commits}</strong>
            <span className=" pl-1 font-light">{stats?.commits === 1 ? 'commit' : 'commits'}</span>
            <span className=" pl-1  font-light">into</span>
            <strong className=" flex items-center font-light pl-1 ml-2 rounded-lg text-sm text-foreground bg-accent px-2 py-0.5 border border-primary-foreground">
              <GitFork className="pr-1" />
              {target_branch}
            </strong>
            <span className=" pl-1 font-light">from</span>
            <strong className=" flex items-center  pl-1 ml-2  rounded-lg font-light text-sm text-foreground bg-accent px-2 py-0.5 border border-primary-foreground ">
              <GitFork className="pr-1" /> {source_branch}
            </strong>
          </div>
          <div className="flex items-center">
            <div className="h-2.5 align-middle w-px bg-white mt-0.5 pt-2"></div>
            <div className={`pl-2 time text-xs`}>{formattedTime}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
