import React, { useEffect, useRef, useState } from 'react'
import { noop } from 'lodash-es'
import { BranchSelector, Layout, PullRequestCommits, SandboxLayout } from '..'
import { Tabs, TabsContent, TabsList } from '@harnessio/canary'
import { Icon, Spacer, Text } from '@harnessio/canary'
import { mockCommitData } from '../data/mockCommitData'
import { z } from 'zod'
import PullRequestCompareForm from '../components/pull-request/pull-request-compare-form'
import TabTriggerItem from '../components/TabsTriggerItem'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import PullRequestCompareButton from '../components/pull-request/pull-request-compare-button'

const mockBranchList = [{ name: 'main' }, { name: 'new-feature' }, { name: 'test-wip' }, { name: 'display-db' }]

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
  isLoading,
  isSuccess,
  onFormDraftSubmit
}) => {
  const mergeability = true
  const formRef = useRef<HTMLFormElement>(null) // Create a ref for the form
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: ''
    }
  })
  useEffect(() => {
    if (isSuccess === true) {
      reset()
      setIsSubmitted(true)
    }
  }, [isSuccess])

  return (
    <SandboxLayout.Main fullWidth hasLeftPanel hasHeader>
      <SandboxLayout.Content maxWidth="3xl">
        <Spacer size={10} />
        <Text size={5} weight={'medium'}>
          Comparing changes
        </Text>
        <Spacer size={2} />
        <Layout.Vertical className="max-w-[65%]">
          <Text size={2} as="p" className="text-primary/80 ">
            Choose two branches to see what's changed or to start a new pull request. If you need to, you can also
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
                <Text className="text-destructive">Can't be merged.</Text>
                <Text size={0} className="text-tertiary-background">
                  You can still create the pull request.
                </Text>
              </Layout.Horizontal>
            )}
          </Layout.Horizontal>
        </Layout.Vertical>
        <Spacer size={3} />
        <Layout.Horizontal className="items-center px-3 py-3 bg-background border-border border-2 rounded-md justify-between">
          <div>
            <Layout.Horizontal className="py-2">
              <Text size={1}> Discuss and review the changes in this comparison with others.</Text>
              <Text size={1}> Learn about pull requests.</Text>
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
              <PullRequestCommits data={mockCommitData} />
            </TabsContent>
            <TabsContent value="changes">
              {/* Content for Changes */}
              <Spacer size={10} />
              <Text size={2}>No changes to display.</Text>
            </TabsContent>
          </Tabs>
          <Spacer size={3} />
        </Layout.Vertical>
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}

export { SandboxPullRequestCompare }
