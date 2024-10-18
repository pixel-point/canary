import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Input,
  Textarea,
  Button,
  ButtonGroup,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
  Spacer,
  Text
} from '@harnessio/canary'
import { MessageTheme } from '../form-field-set'
import { FormFieldSet } from '../..'

// Define the form schema with optional fields for gitignore and license
const formSchema = z.object({
  title: z.string().min(1, { message: 'Please provide a pull request title' }),
  description: z.string().min(1, { message: 'Please provide a description' })
})

export type FormFields = z.infer<typeof formSchema> // Automatically generate a type from the schema

interface PullRequestFormProps {
  apiError: string | null
  isLoading: boolean
  isSuccess: boolean
  onFormDraftSubmit: (data: FormFields) => void
  onFormSubmit: (data: FormFields) => void
  handleCancel: () => void
}

const PullRequestCompareForm: React.FC<PullRequestFormProps> = ({
  apiError,
  isLoading,
  isSuccess,
  onFormDraftSubmit,
  onFormSubmit,
  handleCancel
}) => {
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
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  useEffect(() => {
    if (isSuccess === true) {
      reset()
      setIsSubmitted(true)
    }
  }, [isSuccess])
  const onSubmit: SubmitHandler<FormFields> = data => {
    // Handle form submission logic here
    console.log('Form submitted:', data)
    onFormSubmit(data)
  }

  const handleDraftClick = (e: React.MouseEvent) => {
    e.preventDefault()
    handleSubmit(data => {
      onFormDraftSubmit(data) // Call the draft submit function
    })() // Immediately call the handleSubmit with the draft option
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Spacer size={1} />
      <FormFieldSet.Root>
        <FormFieldSet.ControlGroup>
          <FormFieldSet.Label htmlFor="title" required>
            Title
          </FormFieldSet.Label>
          <Input id="title" {...register('title')} placeholder="Enter pull request title" autoFocus />
          {errors.title && (
            <FormFieldSet.Message theme={MessageTheme.ERROR}>{errors.title.message?.toString()}</FormFieldSet.Message>
          )}
        </FormFieldSet.ControlGroup>
        <FormFieldSet.ControlGroup>
          <FormFieldSet.Label htmlFor="description" required>
            Description
          </FormFieldSet.Label>
          <Textarea
            id="description"
            {...register('description')}
            placeholder="Enter a description of this repository..."
          />
          {errors.description && (
            <FormFieldSet.Message theme={MessageTheme.ERROR}>
              {errors.description.message?.toString()}
            </FormFieldSet.Message>
          )}
        </FormFieldSet.ControlGroup>
      </FormFieldSet.Root>

      {apiError && (
        <>
          <Spacer size={2} />
          <Text size={1} className="text-destructive">
            {apiError?.toString()}
          </Text>
        </>
      )}

      <FormFieldSet.Root>
        <FormFieldSet.ControlGroup>
          <ButtonGroup.Root>
            {!isSubmitted ? (
              <>
                <Button
                  variant="split"
                  size="xs_split"
                  dropdown={
                    <DropdownMenu>
                      <DropdownMenuTrigger insideSplitButton>
                        <Icon name="chevron-down" size={11} className="chevron-down" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="mt-1">
                        <DropdownMenuGroup>
                          <DropdownMenuItem onClick={handleDraftClick} disabled={!isValid || isLoading}>
                            <div className="flex flex-col">
                              <Text color="primary">Create draft pull request</Text>
                              <Text color="tertiaryBackground">Does not request code reviews and cannot be merged</Text>
                            </div>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  }
                  type="submit"
                  disabled={!isValid || isLoading}>
                  {!isLoading ? 'Create pull request' : 'Creating pull request...'}
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={handleCancel}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant="ghost" type="button" size="sm" theme="success" className="pointer-events-none">
                Pull request created&nbsp;&nbsp;
                <Icon name="tick" size={14} />
              </Button>
            )}
          </ButtonGroup.Root>
        </FormFieldSet.ControlGroup>
      </FormFieldSet.Root>
    </form>
  )
}

export default PullRequestCompareForm
