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
  data?: string
  title: string
  lang: string
}

interface DataProps {
  data: HeaderProps[]
}

const LineTitle: React.FC<Omit<HeaderProps, 'title' | 'data' | 'lang'>> = ({ text, numAdditions, numDeletions }) => (
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
  data?: string
}> = ({ header }) => {
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
                    data={header.data}
                    fontsize={fontsize}
                    highlight={highlight}
                    mode={DiffModeEnum.Split}
                    wrap={wrap}
                    addWidget
                    fileName={header.title}
                    lang={header.lang}
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

export function PullRequestChanges({ data }: DataProps) {
  return (
    <div className="flex flex-col gap-4">
      {data.map((item, index) => (
        <PullRequestAccordion key={index} header={item} data={item?.data} />
      ))}
    </div>
  )
}
