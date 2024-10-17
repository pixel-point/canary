import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Icon,
  Input,
  RadioGroup,
  RadioGroupItem,
  Textarea,
  useZodForm
} from '@harnessio/canary'
import { z } from 'zod'
import { GitCommitFormType } from '../types'
import { FormFieldSet } from '@harnessio/playground'

interface GitCommitFormProps {
  onCancel: () => void
  onSubmit: (formValues: GitCommitFormType) => Promise<void>
  commitTitlePlaceHolder: string
}

export enum CommitToGitRefOption {
  DIRECTLY = 'directly',
  NEW_BRANCH = 'new-branch'
}

const gitCommitSchema = z
  .object({
    message: z.string().optional(),
    description: z.string().optional(),
    commitToGitRef: z.string(),
    newBranchName: z.string().optional()
  })
  .superRefine((data, ctx) => {
    if (data.commitToGitRef === CommitToGitRefOption.NEW_BRANCH) {
      if (!data.newBranchName || data.newBranchName.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Branch Name is required ',
          path: ['newBranchName']
        })
      }
    }
  })

export function GitCommitForm({ onCancel, onSubmit, commitTitlePlaceHolder }: GitCommitFormProps) {
  const form = useZodForm({
    schema: gitCommitSchema,
    defaultValues: {
      message: '',
      commitToGitRef: CommitToGitRefOption.DIRECTLY
    }
  })

  return (
    <Form className="space-y-6" form={form} onSubmit={onSubmit}>
      <div className="grid gap-2">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Commit Message</FormLabel>
              <FormControl>
                <Input className="text-primary" {...field} placeholder={commitTitlePlaceHolder} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea className="text-primary" {...field} placeholder="Optional extended description" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="commitToGitRef"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <RadioGroup value={field.value} id="commitToGitRef" onValueChange={field.onChange}>
                <FormFieldSet.Option
                  control={<RadioGroupItem value={CommitToGitRefOption.DIRECTLY} id="directly" />}
                  id="directly"
                  label="Commit to Master directly"
                  description=""
                />
                <FormFieldSet.Option
                  control={<RadioGroupItem value={CommitToGitRefOption.NEW_BRANCH} id="new-branch" />}
                  id="new-branch"
                  label="Create a new branch for this commit and start a pull request"
                  description=""
                />
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {form.getValues().commitToGitRef === CommitToGitRefOption.NEW_BRANCH && (
        <div className="pl-5">
          <FormField
            control={form.control}
            name="newBranchName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div>
                    <Input
                      className="text-primary"
                      {...field}
                      placeholder="New Branch Name"
                      left={<Icon name="branch" size={24} className="min-w-[12px] text-tertiary-background pr-2" />}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}

      <div className="flex gap-3 justify-end">
        <Button onClick={onCancel} className="text-primary" variant="outline">
          Cancel
        </Button>
        <Button type="submit">Commit</Button>
      </div>
    </Form>
  )
}
