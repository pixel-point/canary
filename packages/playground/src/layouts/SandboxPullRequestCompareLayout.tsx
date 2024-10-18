import React from 'react'
import { noop } from 'lodash-es'
import { BranchSelector, Layout, PullRequestCommits, SandboxLayout } from '..'
import { Tabs, TabsContent, TabsList } from '@harnessio/canary'
import { Icon, Spacer, Text } from '@harnessio/canary'
import { mockCommitData } from '../data/mockCommitData'
import { z } from 'zod'
import PullRequestCompareForm from '../components/pull-request/pull-request-compare-form'
import TabTriggerItem from '../components/TabsTriggerItem'

const mockBranchList = [
  {
    name: 'main'
  },
  {
    name: 'new-feature'
  },
  {
    name: 'test-wip'
  },
  {
    name: 'display-db'
  }
]

// Define the form schema with optional fields for gitignore and license
export const formSchema = z.object({
  title: z.string().min(1, { message: 'Please provide a pull request title' }),
  description: z.string().min(1, { message: 'Please provide a description' })
})
export type FormFields = z.infer<typeof formSchema> // Automatically generate a type from the schema

interface SandboxPullRequestCompareProps {
  onFormSubmit: (data: FormFields) => void
  onFormDraftSubmit: (data: FormFields) => void
  onFormCancel: () => void
  apiError: string | null
  isLoading: boolean
  isSuccess: boolean
}

const SandboxPullRequestCompare: React.FC<SandboxPullRequestCompareProps> = ({
  onFormSubmit,
  apiError = null,
  onFormCancel,
  isLoading,
  isSuccess,
  onFormDraftSubmit
}) => {
  const mergeability = true
  const handleCancel = () => {
    onFormCancel()
  }

  return (
    <>
      <SandboxLayout.Main fullWidth hasLeftPanel hasHeader>
        <SandboxLayout.Content maxWidth="3xl">
          <Spacer size={10} />
          <Text size={5} weight={'medium'}>
            Comparing changes
          </Text>
          <Spacer size={3} />
          <Layout.Vertical className="max-w-[65%]">
            <Text size={2} as="p" className="text-primary/80 ">
              Choose two branches to see what’s changed or to start a new pull request. If you need to, you can also
              compare across forks or learn more about diff comparisons.
            </Text>
            <Layout.Horizontal className="items-center text-tertiary-background">
              <Icon name="pull" size={16} className="text-tertiary-background" />

              <BranchSelector
                prefix={'base'}
                size="default"
                name={'main'}
                branchList={mockBranchList}
                selectBranch={noop}
              />

              <Icon name="arrow-long" size={14} className="rotate-180 text-tertiary-background" />
              <BranchSelector
                prefix="compare"
                size="default"
                name={'main'}
                branchList={mockBranchList}
                selectBranch={noop}
              />
              {mergeability ? (
                <Layout.Horizontal className="items-center gap-x-0">
                  <Icon name="success" size={12} />
                  <Text className="text-success">Able to merge.</Text>
                  <Text size={0} className="text-tertiary-background">
                    These branches can be automatically merged.
                  </Text>
                </Layout.Horizontal>
              ) : (
                <Layout.Horizontal className="items-center gap-x-0">
                  <Icon name="fail" size={12} />
                  <Text className="text-destructive">Can’t be merged.</Text>
                  <Text size={0} className="text-tertiary-background">
                    You can still create the pull request.
                  </Text>
                </Layout.Horizontal>
              )}
            </Layout.Horizontal>
          </Layout.Vertical>
          <Spacer size={2} />
          <Layout.Horizontal className="items-center px-3 py-3 bg-background border-border border-2 rounded-md justify-between">
            <div>
              <Layout.Horizontal>
                <Text size={1}> Discuss and review the changes in this comparison with others.</Text>
                <Text size={1}> Learn about pull requests.</Text>
              </Layout.Horizontal>
            </div>
          </Layout.Horizontal>
          <Spacer size={10} />
          <Layout.Vertical>
            <Tabs variant="navigation" defaultValue="overview">
              <TabsList className="px-0">
                <TabTriggerItem value="overview" icon="comments" label="Overview" />
                <TabTriggerItem value="commits" icon="tube-sign" label="Commits" badgeCount={1} />
                <TabTriggerItem value="changes" icon="changes" label="Changes" badgeCount={1} />
              </TabsList>
              <TabsContent value="overview">
                <Spacer size={1} />
                <PullRequestCompareForm
                  apiError={apiError}
                  isLoading={isLoading}
                  isSuccess={isSuccess}
                  onFormDraftSubmit={onFormDraftSubmit}
                  onFormSubmit={onFormSubmit}
                  handleCancel={handleCancel}
                />
              </TabsContent>
              <TabsContent className="flex flex-col" value="commits">
                {/* Content for Changes */}
                <Spacer size={10} />
                <PullRequestCommits data={mockCommitData} />
              </TabsContent>
              <TabsContent value="changes">{/* Content for Changes */}</TabsContent>
            </Tabs>
          </Layout.Vertical>
        </SandboxLayout.Content>
      </SandboxLayout.Main>
    </>
  )
}

export { SandboxPullRequestCompare }
