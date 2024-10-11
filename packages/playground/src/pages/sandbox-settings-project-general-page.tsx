import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  ButtonGroup,
  Input,
  Spacer,
  Text,
  Icon,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel
} from '@harnessio/canary'
import { SandboxLayout, FormFieldSet } from '..'
import { MessageTheme } from '../components/form-field-set'

// Define form schema for Project Settings
const projectSettingsSchema = z.object({
  projectName: z.string().min(1, { message: 'Please provide a project name' }),
  identifier: z.string().min(1, { message: 'Please provide an identifier' }),
  projectURL: z.string().url({ message: 'Please provide a valid URL' })
})

// Define form schema for delete confirmation
const deleteConfirmationSchema = z.object({
  verification: z.string().min(1, { message: 'To double confirm, Please type "DELETE".' })
})

// TypeScript types for forms
type ProjectSettingsFields = z.infer<typeof projectSettingsSchema>
type DeleteConfirmationFields = z.infer<typeof deleteConfirmationSchema>

function SandboxSettingsProjectGeneralPage() {
  // Project Settings form handling
  const {
    register,
    handleSubmit,
    reset: resetProjectSettingsForm,
    formState: { errors, isValid, dirtyFields, isDirty }
  } = useForm<ProjectSettingsFields>({
    resolver: zodResolver(projectSettingsSchema),
    mode: 'onChange',
    defaultValues: {
      projectName: 'Acme Inc.',
      identifier: 'FOA',
      projectURL: 'https://acme.com'
    }
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Delete confirmation form handling
  const {
    register: registerDelete,
    handleSubmit: handleSubmitDelete,
    watch: watchDelete,
    formState: { errors: deleteErrors }
  } = useForm<DeleteConfirmationFields>({
    resolver: zodResolver(deleteConfirmationSchema),
    mode: 'onChange'
  })

  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteSuccess, setDeleteSuccess] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false) // Dialog state

  // Form submit handler for project settings
  const onSubmit: SubmitHandler<ProjectSettingsFields> = data => {
    setIsSubmitting(true)
    setTimeout(() => {
      console.log('Project settings updated:', data)
      setIsSubmitting(false)
      setSubmitted(true)
      resetProjectSettingsForm(data) // Reset to the current values
      setTimeout(() => setSubmitted(false), 2000)
    }, 2000)
  }

  // Watch the verification value
  const verificationCheck = watchDelete('verification')

  // Delete project handler
  const handleDelete = () => {
    setIsDeleting(true)
    setTimeout(() => {
      setIsDeleting(false)
      setDeleteSuccess(true) // Mark deletion as successful
      setTimeout(() => {
        setIsDialogOpen(false) // Close the dialog
        window.location.href = '/' // Redirect to home page
      }, 2000)
    }, 2000)
  }

  return (
    <SandboxLayout.Main hasLeftPanel hasHeader hasSubHeader>
      <SandboxLayout.Content maxWidth="2xl">
        <Spacer size={10} />
        <Text size={5} weight={'medium'}>
          Project Settings
        </Text>
        <Spacer size={6} />
        {/* PROJECT SETTINGS FORM */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormFieldSet.Root>
            {/* PROJECT NAME */}
            <FormFieldSet.ControlGroup>
              <FormFieldSet.Label htmlFor="projectName" required>
                Project Name
              </FormFieldSet.Label>
              <Input id="projectName" {...register('projectName')} placeholder="Enter project name" />
              {errors.projectName && (
                <FormFieldSet.Message theme={MessageTheme.ERROR}>
                  {errors.projectName.message?.toString()}
                </FormFieldSet.Message>
              )}
            </FormFieldSet.ControlGroup>

            {/* IDENTIFIER */}
            <FormFieldSet.ControlGroup>
              <FormFieldSet.Label htmlFor="identifier" required>
                Identifier
              </FormFieldSet.Label>
              <Input id="identifier" {...register('identifier')} placeholder="Enter unique identifier" />
              {errors.identifier && (
                <FormFieldSet.Message theme={MessageTheme.ERROR}>
                  {errors.identifier.message?.toString()}
                </FormFieldSet.Message>
              )}
            </FormFieldSet.ControlGroup>

            {/* PROJECT URL */}
            <FormFieldSet.ControlGroup>
              <FormFieldSet.Label htmlFor="projectURL" required>
                Project URL
              </FormFieldSet.Label>
              <Input id="projectURL" {...register('projectURL')} placeholder="https://your-project-url.com" />
              {errors.projectURL && (
                <FormFieldSet.Message theme={MessageTheme.ERROR}>
                  {errors.projectURL.message?.toString()}
                </FormFieldSet.Message>
              )}
            </FormFieldSet.ControlGroup>

            {/* SAVE BUTTON */}
            <FormFieldSet.ControlGroup type="button">
              <ButtonGroup.Root>
                {!submitted ? (
                  <>
                    <Button
                      size="sm"
                      type="submit"
                      disabled={!isValid || isSubmitting || !Object.keys(dirtyFields).length || !isDirty}>
                      {isSubmitting ? 'Saving...' : 'Save changes'}
                    </Button>
                    <Button size="sm" variant="outline" type="button" onClick={() => resetProjectSettingsForm()}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button variant="ghost" type="button" size="sm" theme="success" className="pointer-events-none">
                    Saved&nbsp;&nbsp;
                    <Icon name="tick" size={14} />
                  </Button>
                )}
              </ButtonGroup.Root>
            </FormFieldSet.ControlGroup>
          </FormFieldSet.Root>
        </form>

        <FormFieldSet.Root>
          <FormFieldSet.Separator />
        </FormFieldSet.Root>

        {/* DELETE PROJECT CONFIRMATION */}
        <form onSubmit={handleSubmitDelete(handleDelete)}>
          <FormFieldSet.Root box shaded>
            <FormFieldSet.Legend>Delete project</FormFieldSet.Legend>
            <FormFieldSet.SubLegend>
              This will permanently delete this project and all associated data. All repositories in it will also be
              deleted. This action cannot be undone.
            </FormFieldSet.SubLegend>
            <FormFieldSet.ControlGroup>
              <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogTrigger asChild>
                  <Button size="sm" theme="error" className="self-start" onClick={() => setIsDialogOpen(true)}>
                    Delete project
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete your project and remove all data. All repositories in this project
                      will also be deleted. This action cannot be undone.
                    </AlertDialogDescription>
                    {/* DELETE VERIFICATION */}
                    <FormFieldSet.Label htmlFor="verification" required>
                      To confirm this, type “DELETE”
                    </FormFieldSet.Label>
                    <Input id="verification" {...registerDelete('verification')} placeholder="" />
                    {deleteErrors.verification && (
                      <FormFieldSet.Message theme={MessageTheme.ERROR}>
                        {deleteErrors.verification.message?.toString()}
                      </FormFieldSet.Message>
                    )}
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    {!isDeleting && !deleteSuccess ? (
                      <>
                        <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>Cancel</AlertDialogCancel>
                        <Button
                          size="default"
                          theme="error"
                          type="submit"
                          disabled={verificationCheck !== 'DELETE' || isDeleting}>
                          {isDeleting ? 'Deleting...' : 'Yes, delete project'}
                        </Button>
                      </>
                    ) : (
                      <Button size="default" theme="success" className="self-start pointer-events-none">
                        Project deleted&nbsp;&nbsp;
                        <Icon name="tick" size={14} />
                      </Button>
                    )}
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </FormFieldSet.ControlGroup>
          </FormFieldSet.Root>
        </form>
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}

export { SandboxSettingsProjectGeneralPage }
