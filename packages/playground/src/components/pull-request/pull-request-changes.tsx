import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Button,
  Checkbox,
  Icon,
  StackedList,
  Text
} from '@harnessio/canary'

import PullRequestDiffViewer from './pull-request-diff-viewer'
import { useDiffConfig } from './hooks/useDiffConfig'
import { DiffModeEnum } from '@git-diff-view/react'

interface HeaderProps {
  text: string
  numAdditions?: number
  numDeletions?: number
}

interface DataProps {
  data: HeaderProps[]
  diffData:
    | {
        oldFile?: {
          fileName?: string | null
          fileLang?: string | null
          content?: string | null
        }
        newFile?: {
          fileName?: string | null
          fileLang?: string | null
          content?: string | null
        }
        hunks: string[]
      }
    | undefined
}

const LineTitle: React.FC<HeaderProps> = ({ text, numAdditions, numDeletions }) => (
  <div className="flex items-center gap-3 justify-between">
    <div className="inline-flex gap-2 items-center">
      <Text weight="medium">{text}</Text>
      <Button size="sm" variant="ghost">
        <Icon name="clone" size={14} className="text-tertiary-background" />
      </Button>
      {numAdditions != null && numAdditions > 0 && (
        <Badge variant="outline" size="sm" theme="success">
          +{numAdditions}
        </Badge>
      )}
      {numDeletions != null && numDeletions > 0 && (
        <Badge variant="outline" size="sm" theme="destructive">
          -{numDeletions}
        </Badge>
      )}
    </div>
    <div className="inline-flex gap-x-6 items-center">
      <div className="flex gap-2 items-center">
        <Checkbox checked className="w-4 h-4" />
        {/* This would need to be dynamic text value if/when viewing functionality is hooked up */}
        <Text size={2} className="text-primary/90">
          Viewed
        </Text>
      </div>
      <Button variant="ghost" size="sm">
        <Icon name="ellipsis" size={12} className="text-primary-muted/40" />
      </Button>
    </div>
  </div>
)

const PullRequestAccordion: React.FC<{
  header: HeaderProps
  data:
    | {
        oldFile?: {
          fileName?: string | null
          fileLang?: string | null
          content?: string | null
        }
        newFile?: {
          fileName?: string | null
          fileLang?: string | null
          content?: string | null
        }
        hunks: string[]
      }
    | undefined
}> = ({ header, data }) => {
  const { highlight, wrap, fontsize } = useDiffConfig()

  return (
    <StackedList.Root>
      <StackedList.Item disableHover isHeader className="p-0 hover:bg-transparent cursor-default">
        <Accordion type="multiple" className="w-full">
          <AccordionItem isLast value={header.text}>
            <AccordionTrigger leftChevron className="text-left p-4">
              <StackedList.Field
                title={
                  <LineTitle text={header.text} numAdditions={header.numAdditions} numDeletions={header.numDeletions} />
                }
              />
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex border-t w-full p-4">
                <div className="bg-transparent">
                  <PullRequestDiffViewer
                    data={data}
                    fontsize={fontsize}
                    highlight={highlight}
                    mode={DiffModeEnum.Split}
                    wrap={wrap}
                    addWidget
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </StackedList.Item>
    </StackedList.Root>
  )
}

export default function PullRequestChanges({ data, diffData }: DataProps) {
  return (
    <div className="flex flex-col gap-4">
      {data.map((item, index) => (
        <PullRequestAccordion key={index} header={item} data={diffData} />
      ))}
    </div>
  )
}
