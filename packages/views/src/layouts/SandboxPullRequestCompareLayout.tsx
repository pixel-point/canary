import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { DiffModeEnum } from '@git-diff-view/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Icon,
  Spacer,
  StackedList,
  Tabs,
  TabsContent,
  TabsList,
  Text
} from '@harnessio/canary'

import { BranchSelector, Layout, NoData, PullRequestCommits, SandboxLayout } from '..'
import { useDiffConfig } from '../components/pull-request/hooks/useDiffConfig'
import { TypesCommit } from '../components/pull-request/interfaces'
import PullRequestCompareButton from '../components/pull-request/pull-request-compare-button'
import PullRequestCompareForm from '../components/pull-request/pull-request-compare-form'
import PullRequestDiffViewer from '../components/pull-request/pull-request-diff-viewer'
import { parseStartingLineIfOne } from '../components/pull-request/utils'
import TabTriggerItem from '../components/TabsTriggerItem'
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
  prBranchCombinationExists: number | null
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
  isBranchSelected,
  prBranchCombinationExists
}) => {
  const formRef = useRef<HTMLFormElement>(null) // Create a ref for the form
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const navigate = useNavigate()
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
          <Text size={2} as="p" className="text-primary/80">
            Choose two branches to see what&apos;s changed or to start a new pull request. If you need to, you can also
            compare across forks or learn more about diff comparisons.
          </Text>
          <Layout.Horizontal className="text-tertiary-background items-center">
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
            <Icon name="arrow-long" size={14} className="text-tertiary-background rotate-180" />
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
                            Head branch doesn&apos;t contain any new commits.
                          </Text>
                        </>
                      ) : (
                        <>
                          <Icon name="fail" size={12} />
                          <Text className="text-destructive">can&apos;t be merged.</Text>
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
        <Layout.Horizontal className="bg-background border-border items-center justify-between rounded-md border-2 px-3 py-3">
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
        {prBranchCombinationExists && (
          <>
            <Spacer size={3} />
            <Layout.Horizontal className="bg-background border-border items-center justify-between rounded-md border-2 px-3 py-3">
              <div>
                <Layout.Horizontal className="py-2">
                  <>
                    <Text size={1}>PR for this combination of branches already exists.</Text>
                  </>
                </Layout.Horizontal>
              </div>
              {/* <ButtonGroup.Root> */}
              <Button onClick={() => navigate(`../${prBranchCombinationExists}/conversation`)}>
                View Pull Request
              </Button>
              {/* </ButtonGroup.Root> */}
            </Layout.Horizontal>
          </>
        )}
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
                  size={2}
                >{`Showing ${diffStats.files_changed || 0} changed files with ${diffStats.additions || 0} additions and ${diffStats.deletions || 0} deletions `}</Text>
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
            title={'Compare and review just about anything'}
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
  addedLines?: number
  removedLines?: number
  isBinary?: boolean
  deleted?: boolean
  unchangedPercentage?: number
}

const LineTitle: React.FC<Omit<HeaderProps, 'title' | 'data' | 'lang'>> = ({ text }) => (
  <div className="flex items-center justify-between gap-3">
    <div className="inline-flex items-center gap-2">
      <Text weight="medium">{text}</Text>
      <Button size="sm" variant="ghost">
        <Icon name="clone" size={14} className="text-tertiary-background" />
      </Button>
    </div>
    <div className="inline-flex items-center gap-x-6">
      <div className="flex items-center gap-2">
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
      <StackedList.Item disableHover isHeader className="cursor-default p-0 hover:bg-transparent">
        <Accordion type="multiple" className="w-full">
          <AccordionItem isLast value={header?.text ?? ''}>
            <AccordionTrigger leftChevron className="p-4 text-left">
              <StackedList.Field title={<LineTitle text={header?.text ?? ''} />} />
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex w-full border-t">
                <div className="w-full bg-transparent">
                  {startingLine ? (
                    <div className="bg-[--diff-hunk-lineNumber--]">
                      <div className="ml-16 w-full px-2 py-1 font-mono">{startingLine}</div>
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
                    isBinary={header?.isBinary}
                    addedLines={header?.addedLines}
                    removedLines={header?.removedLines}
                    deleted={header?.deleted}
                    unchangedPercentage={header?.unchangedPercentage}
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
