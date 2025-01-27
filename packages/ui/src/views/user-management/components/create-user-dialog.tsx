import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { AlertDialog, Button, ControlGroup, Fieldset, FormWrapper, Input } from '@/components'
import { TranslationStore } from '@/views'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const newUserSchema = z.object({
  uid: z.string().min(1, { message: 'Please provide a user ID' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  display_name: z.string().min(1, { message: 'Please provide a display name' })
})

export type NewUserFields = z.infer<typeof newUserSchema>

export function CreateUserDialog({
  handleCreateUser,
  isLoading,
  apiError,
  open,
  onClose,
  useTranslationStore
}: {
  handleCreateUser: (data: NewUserFields) => void
  isLoading: boolean
  apiError: string | null
  open: boolean
  onClose: () => void
  useTranslationStore: () => TranslationStore
}) {
  const { t } = useTranslationStore()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<NewUserFields>({
    resolver: zodResolver(newUserSchema),
    mode: 'onChange',
    defaultValues: {
      uid: '',
      email: '',
      display_name: ''
    }
  })
  const [formElement, setFormElement] = useState<HTMLFormElement | null>(null)

  const onSubmit: SubmitHandler<NewUserFields> = data => {
    handleCreateUser(data)
  }

  useEffect(() => {
    !open && reset()
  }, [open, reset])

  return (
    <AlertDialog.Root open={open} onOpenChange={onClose}>
      <AlertDialog.Content onOverlayClick={onClose}>
        <AlertDialog.Header>
          <AlertDialog.Title>{t('views:userManagement.addNewUser', 'Add a new user')}</AlertDialog.Title>
        </AlertDialog.Header>
        <FormWrapper className="pb-3 pt-2.5" formRef={setFormElement} onSubmit={handleSubmit(onSubmit)}>
          <Fieldset>
            <ControlGroup>
              <Input
                id="memberName"
                size="md"
                {...register('uid')}
                placeholder="Enter user name"
                label="User ID"
                error={errors.uid?.message?.toString()}
              />
            </ControlGroup>
            <ControlGroup>
              <Input
                id="email"
                size="md"
                {...register('email')}
                placeholder="Enter email address"
                label="Email"
                error={errors.email?.message?.toString()}
              />
            </ControlGroup>
            <ControlGroup>
              <Input
                id="displayName"
                size="md"
                {...register('display_name')}
                placeholder="Enter display name"
                label="Display Name"
                error={errors.display_name?.message?.toString()}
              />
            </ControlGroup>
            {apiError && <span className="mt-1.5 text-14 text-destructive">{apiError?.toString()}</span>}
          </Fieldset>
        </FormWrapper>
        <AlertDialog.Footer>
          <Button variant="outline" disabled={isLoading} onClick={onClose}>
            {t('views:userManagement.cancel', 'Cancel')}
          </Button>
          <Button disabled={isLoading} onClick={() => formElement?.requestSubmit()}>
            {t('views:userManagement.inviteNewUser', 'Invite New User')}
          </Button>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
