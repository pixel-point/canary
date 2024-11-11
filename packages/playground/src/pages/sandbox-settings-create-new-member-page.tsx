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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@harnessio/canary'
import { SandboxLayout, FormFieldSet } from '..'
import { MessageTheme } from '../components/form-field-set'
import { useNavigate } from 'react-router-dom'

// Define form schema for Project Settings
const newMemberSchema = z.object({
  memberName: z.string().min(1, { message: 'Please provide a project name' }),
  role: z.string().min(1, { message: 'Please select a role for the new member' })
})

// TypeScript types for forms
type NewMemberFields = z.infer<typeof newMemberSchema>

const roleSelector = [
  { label: 'Owner', value: 'Owner' },
  { label: 'Reader', value: 'Reader' },
  { label: 'Executor', value: 'Executor' },
  { label: 'Contributor', value: 'Contributor' }
]

function SandboxSettingsCreateNewMemberPage() {
  const navigate = useNavigate()
  // new member form handling
  const {
    register,
    handleSubmit,
    setValue,
    reset: resetNewMemberForm,
    formState: { errors, isValid },
    watch
  } = useForm<NewMemberFields>({
    resolver: zodResolver(newMemberSchema),
    mode: 'onChange',
    defaultValues: {
      memberName: '',
      role: ''
    }
  })

  const handleSelectChange = (fieldName: keyof NewMemberFields, value: string) => {
    setValue(fieldName, value, { shouldValidate: true })
  }

  const newMemberRoleValue = watch('role')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Form submit handler
  const onSubmit: SubmitHandler<NewMemberFields> = data => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      resetNewMemberForm(data) // Reset to the current values
      setTimeout(() => setSubmitted(false), 2000)
      navigate('..')
    }, 2000)
  }

  const handleCancel = () => {
    resetNewMemberForm()
    navigate('..')
  }

  return (
    <SandboxLayout.Main hasLeftPanel hasHeader hasSubHeader>
      <SandboxLayout.Content maxWidth="2xl">
        <Spacer size={10} />
        <Text size={5} weight={'medium'}>
          {/**
           * @TODO Add actual project name here
           */}
          Add a new member
        </Text>
        <Spacer size={6} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormFieldSet.Root>
            {/* NEW MEMBER NAME */}
            <FormFieldSet.ControlGroup>
              <FormFieldSet.Label htmlFor="memberName" required>
                New Member Name
              </FormFieldSet.Label>
              <Input id="memberName" {...register('memberName')} placeholder="Enter Member name" />
              {errors.memberName && (
                <FormFieldSet.Message theme={MessageTheme.ERROR}>
                  {errors.memberName.message?.toString()}
                </FormFieldSet.Message>
              )}
            </FormFieldSet.ControlGroup>

            {/* ROLE */}
            <FormFieldSet.ControlGroup>
              <FormFieldSet.Label htmlFor="role" required>
                Role
              </FormFieldSet.Label>
              <Select value={newMemberRoleValue} onValueChange={value => handleSelectChange('role', value)}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {roleSelector.map(roleOption => {
                    return (
                      <SelectItem key={roleOption.value} value={roleOption.value}>
                        {roleOption.label}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              {errors.role && (
                <FormFieldSet.Message theme={MessageTheme.ERROR}>
                  {errors.role.message?.toString()}
                </FormFieldSet.Message>
              )}
            </FormFieldSet.ControlGroup>

            {/* SAVE BUTTON */}
            <FormFieldSet.ControlGroup type="button">
              <ButtonGroup.Root>
                {!submitted ? (
                  <>
                    <Button size="sm" type="submit" disabled={!isValid || isSubmitting}>
                      {isSubmitting ? 'Inviting...' : 'Invite New Member'}
                    </Button>
                    <Button size="sm" variant="outline" type="button" onClick={handleCancel} disabled={isSubmitting}>
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
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}

export { SandboxSettingsCreateNewMemberPage }
