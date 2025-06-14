import { FC, ReactElement, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Avatar, Button, Icon, Link, LinkProps, NoData, SkeletonList, Spacer, Tabs } from '@/components'
import { useRouterContext } from '@/context'
import { PrincipalType, TypesDiffStats } from '@/types'
import {
  CommitSelectorListItem,
  CommitsList,
  HandleUploadType,
  ILabelType,
  LabelValuesType,
  PullRequestSideBar,
  SandboxLayout,
  TranslationStore,
  TypesCommit
} from '@/views'
import { zodResolver } from '@hookform/resolvers/zod'
import { Layout } from '@views/layouts/layout'
import { ICommitSelectorStore } from '@views/repo/components/commit-selector/types'
import PullRequestCompareButton from '@views/repo/pull-request/compare/components/pull-request-compare-button'
import PullRequestCompareForm from '@views/repo/pull-request/compare/components/pull-request-compare-form'
import TabTriggerItem from '@views/repo/pull-request/compare/components/pull-request-compare-tab-trigger-item'
import { noop } from 'lodash-es'
import { z } from 'zod'

import {
  EnumPullReqReviewDecision,
  HandleAddLabelType,
  LabelAssignmentType,
  PRReviewer,
  PullReqReviewDecision
} from '../pull-request.types'
import PullRequestCompareDiffList from './components/pull-request-compare-diff-list'
import { HeaderProps } from './pull-request-compare.types'

export const pullRequestFormSchema = z.object({
  title: z.string().min(1, { message: 'Please provide a pull request title' }),
  description: z.string().optional()
})

export type CompareFormFields = z.infer<typeof pullRequestFormSchema>

export const DiffModeOptions = [
  { name: 'Split', value: 'Split' },
  { name: 'Unified', value: 'Unified' }
]
interface RoutingProps {
  toCommitDetails?: ({ sha }: { sha: string }) => string
  toCode?: ({ sha }: { sha: string }) => string
}
export interface PullRequestComparePageProps extends Partial<RoutingProps> {
  onFormSubmit: (data: CompareFormFields) => void
  onFormDraftSubmit: (data: CompareFormFields) => void
  onFormCancel: () => void
  apiError: string | null
  isLoading: boolean
  isSuccess: boolean
  mergeability?: boolean
  onSelectCommit: (commit: CommitSelectorListItem) => void

  diffData: HeaderProps[]
  diffStats: TypesDiffStats
  isBranchSelected: boolean
  setIsBranchSelected: (val: boolean) => void
  prBranchCombinationExists: { number: number; title: string; description: string } | null
  useTranslationStore: () => TranslationStore
  repoId?: string
  spaceId?: string
  useRepoCommitsStore: () => ICommitSelectorStore
  searchCommitQuery: string | null
  setSearchCommitQuery: (query: string | null) => void
  currentUser?: string

  searchReviewersQuery: string
  setSearchReviewersQuery: (query: string) => void
  usersList?: PrincipalType[]
  reviewers?: PRReviewer[]
  handleAddReviewer: (id?: number) => void
  handleDeleteReviewer: (id?: number) => void
  handleUpload?: HandleUploadType
  desc?: string
  setDesc: (desc: string) => void
  isFetchingCommits?: boolean
  jumpToDiff: string
  setJumpToDiff: (fileName: string) => void
  labelsList?: ILabelType[]
  labelsValues?: LabelValuesType
  PRLabels?: LabelAssignmentType[]
  searchLabelQuery?: string
  setSearchLabelQuery?: (query: string) => void
  addLabel?: (data: HandleAddLabelType) => void
  removeLabel?: (id: number) => void
  editLabelsProps: LinkProps
  branchSelectorRenderer: ReactElement
}

export const PullRequestComparePage: FC<PullRequestComparePageProps> = ({
  onFormSubmit,
  apiError = null,
  isLoading,
  isSuccess,
  onFormDraftSubmit,
  mergeability = false,

  diffData,
  diffStats,
  isBranchSelected,
  prBranchCombinationExists,
  useTranslationStore,
  useRepoCommitsStore,
  currentUser,

  searchReviewersQuery,
  setSearchReviewersQuery,
  usersList,
  reviewers,
  handleAddReviewer,
  handleDeleteReviewer,
  toCommitDetails,
  toCode,
  handleUpload,
  desc,
  setDesc,
  isFetchingCommits,
  jumpToDiff,
  setJumpToDiff,
  labelsList = [],
  labelsValues = {},
  PRLabels = [],
  searchLabelQuery,
  setSearchLabelQuery,
  addLabel,
  removeLabel,
  editLabelsProps,
  branchSelectorRenderer
}) => {
  const { commits: commitData } = useRepoCommitsStore()

  const formRef = useRef<HTMLFormElement>(null) // Create a ref for the form
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const { navigate } = useRouterContext()
  const { t } = useTranslationStore()

  const formMethods = useForm<CompareFormFields>({
    resolver: zodResolver(pullRequestFormSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: ''
    }
  })

  const {
    reset,
    getValues,
    formState: { isValid }
  } = formMethods

  useEffect(() => {
    if (commitData && commitData.length > 0) {
      reset({
        title: commitData[commitData.length - 1]?.title,
        description: ''
      })
    }
  }, [commitData, reset])

  useEffect(() => {
    if (isSuccess) {
      reset()
      setIsSubmitted(true)
    }
  }, [isSuccess, reset])

  const mockProcessReviewDecision = (
    review_decision: EnumPullReqReviewDecision,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    reviewedSHA?: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sourceSHA?: string
  ): EnumPullReqReviewDecision | PullReqReviewDecision.outdated => {
    // Return a default value
    return review_decision
  }
  return (
    <SandboxLayout.Main fullWidth>
      <SandboxLayout.Content className="px-20">
        <span className="mt-7 text-6 font-medium leading-snug tracking-tight text-cn-foreground-1">
          {t('views:pullRequests.compareChanges', 'Comparing changes')}
        </span>
        <Layout.Vertical className="mt-2.5">
          <p className="max-w-xl text-2 leading-snug text-cn-foreground-2">
            {t(
              'views:pullRequests.compareChangesDescription',
              'Choose two branches to see what’s changed or to start a new pull request.'
            )}
          </p>
          <Layout.Horizontal className="items-center" gap="gap-x-2.5">
            <Icon name="compare" size={14} className="text-icons-1" />

            {branchSelectorRenderer}

            {isBranchSelected &&
              !isLoading && ( // Only render this block if isBranchSelected is true
                <Layout.Horizontal gap="gap-x-1" className="items-center">
                  {mergeability ? (
                    <>
                      <Icon className="text-icons-success" name="tick" size={12} />
                      <p className="text-2 leading-none text-cn-foreground-success">
                        {t('views:pullRequests.compareChangesAbleToMerge', 'Able to merge.')}{' '}
                        <span className="text-cn-foreground-2">
                          {t(
                            'views:pullRequests.compareChangesAbleToMergeDescription',
                            'These branches can be automatically merged.'
                          )}
                        </span>
                      </p>
                    </>
                  ) : (
                    <>
                      {apiError === "head branch doesn't contain any new commits." ? (
                        <>
                          <Icon name={'x-mark'} size={12} className="text-icons-1" />
                          <p className="text-2 leading-none text-cn-foreground-2">
                            {t(
                              'views:pullRequests.compareChangesApiError',
                              'Head branch doesn’t contain any new commits.'
                            )}
                          </p>
                        </>
                      ) : (
                        <>
                          <Icon className="text-icons-danger" name="x-mark" size={12} />
                          <p className="text-2 leading-none text-cn-foreground-danger">
                            {t('views:pullRequests.compareChangesCantMerge', 'Can’t be merged.')}{' '}
                            <span className="text-cn-foreground-2">
                              {t(
                                'views:pullRequests.compareChangesCantMergeDescription',
                                'You can still create the pull request.'
                              )}
                            </span>
                          </p>
                        </>
                      )}
                    </>
                  )}
                </Layout.Horizontal>
              )}
          </Layout.Horizontal>
        </Layout.Vertical>
        {!prBranchCombinationExists && (
          <Layout.Horizontal className="mt-4 items-center justify-between rounded-md border border-cn-borders-2 bg-cn-background-2 p-4">
            <p className="text-2 leading-none">
              {isBranchSelected ? (
                <>
                  {t(
                    'views:pullRequests.compareChangesDiscussChanges',
                    'Discuss and review the changes in this comparison with others.'
                  )}{' '}
                  <Link
                    to="https://www.harness.io/harness-devops-academy/pull-request"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('views:pullRequests.compareChangesDiscussChangesLink', 'Learn about pull requests.')}
                  </Link>
                </>
              ) : (
                t(
                  'views:pullRequests.compareChangesChooseDifferent',
                  'Choose different branches above to discuss and review changes.'
                )
              )}
            </p>
            <PullRequestCompareButton
              isSubmitted={isSubmitted}
              isValid={isValid}
              isLoading={isLoading}
              formRef={formRef}
              getFormValues={getValues}
              onFormDraftSubmit={onFormDraftSubmit}
              onFormSubmit={onFormSubmit}
              useTranslationStore={useTranslationStore}
            />
          </Layout.Horizontal>
        )}
        {prBranchCombinationExists && (
          <Layout.Horizontal className="mt-4 items-center justify-between rounded-md border border-cn-borders-2 bg-cn-background-2 p-4">
            <div className="flex items-center gap-x-1.5">
              <div>
                <Layout.Horizontal className="items-center">
                  <Icon name="compare" size={14} className="text-icons-success" />
                  <div className="flex gap-x-1">
                    {/* TODO: add the name of the PR instead this placeholder */}
                    <p className="text-2 text-cn-foreground-1">{prBranchCombinationExists.title}</p>
                    <span className="text-cn-foreground-2">{`#${prBranchCombinationExists.number}`}</span>
                  </div>
                </Layout.Horizontal>

                <p className="text-2  text-cn-foreground-2">{prBranchCombinationExists.description}</p>
              </div>
            </div>
            <Button onClick={() => navigate(`../${prBranchCombinationExists.number}/conversation`)}>
              {t('views:pullRequests.compareChangesViewPRLink', 'View pull request')}
            </Button>
          </Layout.Horizontal>
        )}
        {isBranchSelected ? (
          <Layout.Vertical className="mt-10">
            <Tabs.Root defaultValue={prBranchCombinationExists ? 'commits' : 'overview'}>
              <Tabs.List className="relative left-1/2 w-[calc(100%+160px)] -translate-x-1/2 px-20 before:bg-cn-background-2">
                {!prBranchCombinationExists && (
                  <TabTriggerItem
                    value="overview"
                    icon="comments"
                    label={t('views:pullRequests.compareChangesTabOverview', 'Overview')}
                  />
                )}
                <TabTriggerItem
                  value="commits"
                  icon="tube-sign"
                  label={t('views:pullRequests.compareChangesTabCommits', 'Commits')}
                  badgeCount={diffStats.commits ? diffStats.commits : undefined}
                />
                <TabTriggerItem
                  value="changes"
                  icon="changes"
                  label={t('views:pullRequests.compareChangesTabChanges', 'Changes')}
                  badgeCount={diffStats.files_changed ? diffStats.files_changed : undefined}
                />
              </Tabs.List>
              {!prBranchCombinationExists && (
                <Tabs.Content className="pt-7" value="overview">
                  <div className="grid grid-cols-[1fr_288px] gap-x-8">
                    <div className="flex gap-x-3">
                      {currentUser && <Avatar name={currentUser} rounded />}
                      <div className="w-full">
                        <Spacer size={1} />
                        <PullRequestCompareForm
                          desc={desc}
                          setDesc={setDesc}
                          handleUpload={handleUpload}
                          ref={formRef}
                          apiError={apiError}
                          isLoading={isLoading}
                          onFormDraftSubmit={onFormDraftSubmit}
                          onFormSubmit={onFormSubmit}
                          useTranslationStore={useTranslationStore}
                          formMethods={formMethods}
                        />
                      </div>
                    </div>
                    <PullRequestSideBar
                      addReviewers={handleAddReviewer}
                      usersList={usersList ?? []}
                      currentUserId={currentUser}
                      pullRequestMetadata={{ source_sha: '' }}
                      processReviewDecision={mockProcessReviewDecision}
                      refetchReviewers={noop}
                      handleDelete={handleDeleteReviewer}
                      reviewers={reviewers ?? []}
                      searchQuery={searchReviewersQuery}
                      setSearchQuery={setSearchReviewersQuery}
                      useTranslationStore={useTranslationStore}
                      labelsList={labelsList}
                      labelsValues={labelsValues}
                      PRLabels={PRLabels}
                      addLabel={addLabel}
                      removeLabel={removeLabel}
                      editLabelsProps={editLabelsProps}
                      searchLabelQuery={searchLabelQuery}
                      setSearchLabelQuery={setSearchLabelQuery}
                      isCreatingPr
                    />
                  </div>
                </Tabs.Content>
              )}
              <Tabs.Content className="pt-7" value="commits">
                {/* TODO: add pagination to this */}
                {isFetchingCommits ? (
                  <SkeletonList />
                ) : (commitData ?? []).length > 0 ? (
                  <CommitsList
                    toCode={toCode}
                    toCommitDetails={toCommitDetails}
                    data={commitData?.map((item: TypesCommit) => ({
                      sha: item.sha,
                      parent_shas: item.parent_shas,
                      title: item.title,
                      message: item.message,
                      author: item.author,
                      committer: item.committer
                    }))}
                  />
                ) : (
                  <NoData
                    iconName={'no-data-commits'}
                    title={t('views:noData.noCommitsYet', 'No commits yet')}
                    description={[
                      t(
                        'views:noData.noCommitsYetDescription',
                        "Your commits will appear here once they're made. Start committing to see your changes reflected."
                      )
                    ]}
                  />
                )}
              </Tabs.Content>
              <Tabs.Content className="pt-7" value="changes">
                {/* Content for Changes */}
                {(diffData ?? []).length > 0 ? (
                  <PullRequestCompareDiffList
                    diffData={diffData}
                    currentUser={currentUser}
                    diffStats={diffStats}
                    useTranslationStore={useTranslationStore}
                    jumpToDiff={jumpToDiff}
                    setJumpToDiff={setJumpToDiff}
                  />
                ) : (
                  <NoData
                    iconName="no-data-folder"
                    title="No changes to display"
                    description={['There are no changes to display for the selected branches.']}
                  />
                )}
              </Tabs.Content>
            </Tabs.Root>
          </Layout.Vertical>
        ) : (
          <>
            <Spacer size={10} />
            <NoData
              iconName="no-data-pr"
              title={t('views:noData.compareChanges')}
              description={[t('views:noData.compareChangesDescription')]}
            />
          </>
        )}
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}
