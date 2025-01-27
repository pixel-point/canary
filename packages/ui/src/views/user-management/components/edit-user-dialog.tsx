import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { AlertDialog, Button, ControlGroup, Fieldset, FormWrapper, Input } from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { IEditUserDialogProps } from '../types'

const newUserSchema = z.object({
  userID: z.string(),
  email: z.string().email({ message: 'Please provide a valid email, ex: example@yourcompany.com' }),
  displayName: z.string().min(1, { message: 'Please provide a display name' })
})

export const EditUserDialog: FC<IEditUserDialogProps> = ({
  useAdminListUsersStore,
  onClose,
  isSubmitting,
  handleUpdateUser,
  open,
  useTranslationStore
}) => {
  const { t } = useTranslationStore()
  const { user } = useAdminListUsersStore()
  const [formElement, setFormElement] = useState<HTMLFormElement | null>(null)

  type MemberFields = z.infer<typeof newUserSchema>

  const {
    handleSubmit,
    register,
    reset: resetNewMemberForm,
    formState: { errors }
  } = useForm<MemberFields>({
    resolver: zodResolver(newUserSchema),
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<MemberFields> = data => {
    handleUpdateUser(data)
    resetNewMemberForm(data)
  }

  useEffect(() => {
    !open && resetNewMemberForm()
  }, [open, resetNewMemberForm])

  useEffect(() => {
    resetNewMemberForm({
      userID: user?.uid,
      email: user?.email,
      displayName: user?.display_name
    })
  }, [user, resetNewMemberForm])

  return (
    <AlertDialog.Root open={open} onOpenChange={onClose}>
      <AlertDialog.Content onOverlayClick={onClose}>
        <AlertDialog.Header>
          <AlertDialog.Title>{t('views:userManagement.updateUser', 'Update user')}</AlertDialog.Title>
        </AlertDialog.Header>
        <AlertDialog.Description>
          {t('views:userManagement.updateInformationFor', 'Update information for ')}
          {user?.uid}
        </AlertDialog.Description>
        <FormWrapper className="pb-3 pt-2.5" formRef={setFormElement} onSubmit={handleSubmit(onSubmit)}>
          <Fieldset>
            <ControlGroup>
              <Input
                id="userID"
                size="md"
                {...register('userID')}
                placeholder="Enter User ID"
                value={user?.uid}
                readOnly
                className="cursor-not-allowed"
                label="User ID cannot be changed once created"
                error={errors.userID?.message?.toString()}
              />
            </ControlGroup>
            <ControlGroup>
              <Input
                id="email"
                size="md"
                {...register('email')}
                defaultValue={user?.email}
                label="Email"
                error={errors.email?.message?.toString()}
              />
            </ControlGroup>
            <ControlGroup>
              <Input
                id="displayName"
                size="md"
                {...register('displayName')}
                defaultValue={user?.display_name}
                placeholder="Enter a display name"
                label="Display Name"
                error={errors.displayName?.message?.toString()}
              />
            </ControlGroup>
          </Fieldset>
        </FormWrapper>
        <AlertDialog.Footer>
          <Button variant="outline" disabled={isSubmitting} onClick={onClose}>
            {t('views:userManagement.cancel', 'Cancel')}
          </Button>
          <Button disabled={isSubmitting} onClick={() => formElement?.requestSubmit()}>
            {t('views:userManagement.save', 'Save')}
          </Button>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
