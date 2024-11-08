import React, { useEffect, useRef, useState } from 'react'
import { BranchSelector, Layout, NoData, PullRequestCommits, SandboxLayout } from '..'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  StackedList,
  Tabs,
  TabsContent,
  TabsList
} from '@harnessio/canary'
import { Icon, Spacer, Text } from '@harnessio/canary'
import { z } from 'zod'
import PullRequestCompareForm from '../components/pull-request/pull-request-compare-form'
import TabTriggerItem from '../components/TabsTriggerItem'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import PullRequestCompareButton from '../components/pull-request/pull-request-compare-button'
import { TypesCommit } from '../components/pull-request/interfaces'
import PullRequestDiffViewer from '../components/pull-request/pull-request-diff-viewer'
import { DiffModeEnum } from '@git-diff-view/react'
import { parseStartingLineIfOne } from '../components/pull-request/utils'
import { useDiffConfig } from '../components/pull-request/hooks/useDiffConfig'
import { TypesDiffStats } from './types'

export const formSchema = z.object({
  title: z.string().min(1, { message: 'Please provide a pull request title' }),
  description: z.string().optional()
})
export type CompareFormFields = z.infer<typeof formSchema> // Automatically generate a type from the schema

interface SandboxPullRequestCompareProps {
  onFormSubmit: (data: CompareFormFields) => void
  onFormDraftSubmit: (data: CompareFormFields) => void
  onFormCancel: () => void
  apiError: string | null
  isLoading: boolean
  isSuccess: boolean
  mergeability?: boolean
  branchList: { name: string }[]
  selectTargetBranch: (name: string) => void
  selectSourceBranch: (name: string) => void
  commitData?: TypesCommit[]
  targetBranch: string
  sourceBranch: string
  diffData: HeaderProps[]
  diffStats: TypesDiffStats
  isBranchSelected: boolean
  setIsBranchSelected: (val: boolean) => void
}

const SandboxPullRequestCompare: React.FC<SandboxPullRequestCompareProps> = ({
  onFormSubmit,
  apiError = null,
  isLoading,
  isSuccess,
  onFormDraftSubmit,
  mergeability = false,
  selectTargetBranch,
  selectSourceBranch,
  branchList,
  commitData,
  targetBranch,
  sourceBranch,
  diffData,
  diffStats,
  setIsBranchSelected,
  isBranchSelected
}) => {
  const formRef = useRef<HTMLFormElement>(null) // Create a ref for the form
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors, isValid }
  } = useForm<CompareFormFields>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: ''
    }
  })

  useEffect(() => {
    if (commitData && commitData.length > 0) {
      reset({
        title: commitData[commitData.length - 1]?.title,
        description: ''
      })
    }
  }, [commitData, reset])

  useEffect(() => {
    if (isSuccess === true) {
      reset()
      setIsSubmitted(true)
    }
  }, [isSuccess])

  const handleBranchSelection = () => {
    setIsBranchSelected(true) // Update state when a branch is selected
  }

  return (
    <SandboxLayout.Main fullWidth hasLeftPanel hasHeader>
      <SandboxLayout.Content maxWidth="3xl">
        <Spacer size={10} />
        <Text size={5} weight={'medium'}>
          Comparing changes
        </Text>
        <Spacer size={2} />
        <Layout.Vertical>
          <Text size={2} as="p" className="text-primary/80 ">
            Choose two branches to see what's changed or to start a new pull request. If you need to, you can also
            compare across forks or learn more about diff comparisons.
          </Text>
          <Layout.Horizontal className="items-center text-tertiary-background">
            <Icon name="pull" size={16} className="text-tertiary-background" />

            <BranchSelector
              prefix={'base'}
              size="default"
              name={targetBranch}
              branchList={branchList}
              selectBranch={name => {
                selectTargetBranch(name)
                handleBranchSelection() // Call when target branch is selected
              }}
            />
            <Icon name="arrow-long" size={14} className="rotate-180 text-tertiary-background" />
            <BranchSelector
              prefix="compare"
              size="default"
              name={sourceBranch}
              branchList={branchList}
              selectBranch={name => {
                selectSourceBranch(name)
                handleBranchSelection() // Call when source branch is selected
              }}
            />
            {isBranchSelected &&
              !isLoading && ( // Only render this block if isBranchSelected is true
                <Layout.Horizontal className="items-center gap-x-0">
                  {mergeability ? (
                    <>
                      <Icon name="success" size={12} />
                      <Text className="text-success">Able to merge.</Text>
                      <Text size={0} className="text-tertiary-background">
                        These branches can be automatically merged.
                      </Text>
                    </>
                  ) : (
                    <>
                      {apiError === "head branch doesn't contain any new commits." ? (
                        <>
                          <Icon name={'x-mark'} size={12} className="text-tertiary-background" />

                          <Text size={0} className="text-tertiary-background">
                            Head branch doesn't contain any new commits.
                          </Text>
                        </>
                      ) : (
                        <>
                          <Icon name="fail" size={12} />
                          <Text className="text-destructive">Can't be merged.</Text>
                          <Text size={0} className="text-tertiary-background">
                            You can still create the pull request.
                          </Text>
                        </>
                      )}
                    </>
                  )}
                </Layout.Horizontal>
              )}
          </Layout.Horizontal>
        </Layout.Vertical>
        <Spacer size={3} />
        <Layout.Horizontal className="items-center px-3 py-3 bg-background border-border border-2 rounded-md justify-between">
          <div>
            <Layout.Horizontal className="py-2">
              {isBranchSelected ? (
                <>
                  <Text size={1}>Discuss and review the changes in this comparison with others.</Text>
                  <Text size={1}>Learn about pull requests.</Text>
                </>
              ) : (
                <Text size={1}>Choose different branches or forks above to discuss and review changes.</Text>
              )}
            </Layout.Horizontal>
          </div>
          <PullRequestCompareButton
            isSubmitted={isSubmitted}
            isValid={isValid}
            isLoading={isLoading}
            formRef={formRef}
            onFormDraftSubmit={onFormDraftSubmit}
            onFormSubmit={onFormSubmit}
          />
        </Layout.Horizontal>
        <Spacer size={10} />
        {isBranchSelected ? (
          <Layout.Vertical>
            <Tabs variant="navigation" defaultValue="overview">
              <TabsList className="px-0">
                <TabTriggerItem value="overview" icon="comments" label="Overview" />
                <TabTriggerItem value="commits" icon="tube-sign" label="Commits" badgeCount={1} />
                <TabTriggerItem value="changes" icon="changes" label="Changes" badgeCount={1} />
              </TabsList>
              <TabsContent value="overview">
                <Spacer size={4} />
                <PullRequestCompareForm
                  register={register}
                  ref={formRef} // Pass the ref to the form
                  apiError={apiError}
                  isLoading={isLoading}
                  onFormDraftSubmit={onFormDraftSubmit}
                  onFormSubmit={onFormSubmit}
                  isValid={isValid}
                  errors={errors}
                  handleSubmit={handleSubmit}
                />
              </TabsContent>
              <TabsContent className="flex flex-col" value="commits">
                <Spacer size={10} />
                <PullRequestCommits data={commitData} />
              </TabsContent>
              <TabsContent value="changes">
                {/* Content for Changes */}
                <Spacer size={5} />
                <Text
                  size={
                    2
                  }>{`Showing ${diffStats.files_changed || 0} changed files with ${diffStats.additions || 0} additions and ${diffStats.deletions || 0} deletions `}</Text>
                <Spacer size={3} />
                {diffData?.map((item, index) => (
                  <>
                    <Spacer size={3} />
                    <PullRequestAccordion
                      key={`item?.title ? ${item?.title}-${index} : ${index}`}
                      header={item}
                      data={item?.data}
                    />
                  </>
                ))}
              </TabsContent>
            </Tabs>
            <Spacer size={3} />
          </Layout.Vertical>
        ) : (
          <NoData
            title={'Compare and review about anything'}
            description={['Branches, tags, commit ranges, and time ranges. In the same repository and across forks.']}
          />
        )}
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}
interface HeaderProps {
  text: string
  data?: string
  title: string
  lang: string
}

const LineTitle: React.FC<Omit<HeaderProps, 'title' | 'data' | 'lang'>> = ({ text }) => (
  <div className="flex items-center gap-3 justify-between">
    <div className="inline-flex gap-2 items-center">
      <Text weight="medium">{text}</Text>
      <Button size="sm" variant="ghost">
        <Icon name="clone" size={14} className="text-tertiary-background" />
      </Button>
    </div>
    <div className="inline-flex gap-x-6 items-center">
      <div className="flex gap-2 items-center">
        <Icon name="ellipsis" size={12} />
      </div>
    </div>
  </div>
)

const PullRequestAccordion: React.FC<{
  header?: HeaderProps
  data?: string
}> = ({ header }) => {
  const { highlight, wrap, fontsize } = useDiffConfig()

  const startingLine =
    parseStartingLineIfOne(header?.data ?? '') !== null ? parseStartingLineIfOne(header?.data ?? '') : null
  return (
    <StackedList.Root>
      <StackedList.Item disableHover isHeader className="p-0 hover:bg-transparent cursor-default">
        <Accordion type="multiple" className="w-full">
          <AccordionItem isLast value={header?.text ?? ''}>
            <AccordionTrigger leftChevron className="text-left p-4">
              <StackedList.Field title={<LineTitle text={header?.text ?? ''} />} />
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex border-t w-full">
                <div className="bg-transparent w-full">
                  {startingLine ? (
                    <div className="bg-[--diff-hunk-lineNumber--]">
                      <div className="w-full px-2 ml-16 py-1 font-mono ">{startingLine}</div>
                    </div>
                  ) : null}
                  <PullRequestDiffViewer
                    data={header?.data}
                    fontsize={fontsize}
                    highlight={highlight}
                    mode={DiffModeEnum.Unified}
                    wrap={wrap}
                    addWidget
                    fileName={header?.title ?? ''}
                    lang={header?.lang ?? ''}
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

export { SandboxPullRequestCompare }
