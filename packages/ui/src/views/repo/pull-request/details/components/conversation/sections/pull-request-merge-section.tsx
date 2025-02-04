import { useState } from 'react'

import { Accordion, CopyButton, Icon, Layout, StackedList } from '@/components'
import { cn } from '@utils/cn'
import { isEmpty } from 'lodash-es'

import { LineDescription, LineTitle } from './pull-request-line-title'

interface PullRequestMergeSectionProps {
  unchecked: boolean
  mergeable: boolean
  pullReqMetadata: { target_branch?: string | undefined; source_branch?: string | undefined } | undefined
  conflictingFiles?: string[]
}
const PullRequestMergeSection = ({
  unchecked,
  mergeable,
  pullReqMetadata,
  conflictingFiles
}: PullRequestMergeSectionProps) => {
  const [showCommandLineInfo, setShowCommandLineInfo] = useState(false)
  const [value, setValue] = useState('')

  const stepMap = [
    {
      step: 'Step 1',
      description: 'Clone the repository or update your local repository with the latest changes',
      code: `git pull origin ${pullReqMetadata?.target_branch}`
    },
    {
      step: 'Step 2',
      description: 'Switch to the head branch of the pull request',
      code: `git checkout ${pullReqMetadata?.source_branch}`
    },
    {
      step: 'Step 3',
      description: 'Merge the base branch into the head branch',
      code: `git merge ${pullReqMetadata?.target_branch}`
    },
    {
      step: 'Step 4',
      description: ' Fix the conflicts and commit the result',
      comment:
        'See Resolving a merge conflict using the command line for step-by-step instruction on resolving merge conflicts'
    },
    {
      step: 'Step 5',
      description: 'Push the changes',
      code: `git push origin ${pullReqMetadata?.source_branch}`
    }
  ]
  const stepInfo = (item: { step: string; description: string; code?: string; comment?: string }, index: number) => {
    return (
      <div key={index}>
        <Layout.Horizontal className="gap-x-1">
          <h3 className="text-14 font-medium text-foreground-1">{item.step}</h3>
          <Layout.Vertical className="w-[90%] max-w-full">
            <p className="text-14 text-foreground-4">{item.description}</p>
            <p
              className={cn('text-14 text-foreground-4 ', {
                'border border-border rounded-md px-2 py-1 !my-2': item.code,
                '!my-1': item.comment
              })}
            >
              <Layout.Horizontal className="items-center justify-between">
                <p>{item.code ? item.code : item.comment}</p>
                {item.code && <CopyButton name={item.code} />}
              </Layout.Horizontal>
            </p>
          </Layout.Vertical>
        </Layout.Horizontal>
      </div>
    )
  }

  const onValueChange = (value: string | string[]) => {
    if (typeof value === 'string') {
      setValue(value)
    }
  }

  return (
    <Accordion.Root type="single" collapsible value={value} onValueChange={onValueChange}>
      <Accordion.Item value="item-4" isLast>
        <Accordion.Trigger className="text-left" hideChevron={mergeable || unchecked}>
          <StackedList.Field
            title={
              <LineTitle
                text={
                  unchecked
                    ? 'Merge check in progress...'
                    : !mergeable
                      ? 'Conflicts found in this branch'
                      : `This branch has no conflicts with ${pullReqMetadata?.target_branch} branch`
                }
                icon={
                  unchecked ? (
                    // TODO: update icon for unchecked status
                    <Icon name="clock" className="text-warning" />
                  ) : (
                    <>
                      {mergeable ? (
                        <Icon name="success" className="text-success" />
                      ) : (
                        <Icon name="triangle-warning" className="text-destructive" />
                      )}
                    </>
                  )
                }
              />
            }
            description={
              unchecked ? (
                <LineDescription text={'Checking for ability to merge automatically...'} />
              ) : !mergeable ? (
                <div className="ml-6 inline-flex items-center gap-2">
                  <Layout.Vertical>
                    <p className="text-14 font-normal text-foreground-4">
                      Use the
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={event => {
                          setShowCommandLineInfo(!showCommandLineInfo)
                          event?.stopPropagation()
                        }}
                        onKeyDown={e => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            e.stopPropagation()
                          }
                        }}
                        className="px-1 text-foreground-accent underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:decoration-foreground-accent"
                      >
                        {/* {getString('commandLine')} */}
                        command line
                      </span>
                      to resolve conflicts
                      {/* {getString('pr.useCmdLineToResolveConflicts')} */}
                    </p>
                  </Layout.Vertical>
                </div>
              ) : (
                ''
              )
            }
          />
          {!mergeable && !unchecked && <span className="px-2 py-1.5 text-14 text-foreground-2">Show more</span>}
        </Accordion.Trigger>
        {!mergeable && !unchecked && (
          <Accordion.Content>
            <div className="ml-6">
              {showCommandLineInfo && (
                <div className="mb-2 rounded-md border border-border p-1 px-4 py-2">
                  <h3 className="text-14 text-foreground-1">Resolve conflicts via command line</h3>
                  <p className="pb-3 pt-1 text-14 text-foreground-4">
                    If the conflicts on this branch are too complex to resolve in the web editor, you can check it out
                    via command line to resolve the conflicts
                  </p>
                  <ol>
                    {stepMap.map((item, index) => {
                      return stepInfo(item, index)
                    })}
                  </ol>
                </div>
              )}
              <span className="text-14 text-foreground-2">
                Conflicting files <span className="text-foreground-4">{`(${conflictingFiles?.length || 0})`}</span>
              </span>

              {!isEmpty(conflictingFiles) && (
                <div className="mt-2">
                  {conflictingFiles?.map((file, idx) => (
                    <div className="flex items-center gap-x-2 py-1.5" key={`${file}-${idx}`}>
                      <Icon className="text-icons-1" size={16} name="file" />
                      <span className="text-14 text-foreground-1">{file}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Accordion.Content>
        )}
      </Accordion.Item>
    </Accordion.Root>
  )
}

export default PullRequestMergeSection
