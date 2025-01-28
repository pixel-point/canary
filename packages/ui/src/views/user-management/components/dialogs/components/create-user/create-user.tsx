import { SubmitHandler, useForm } from 'react-hook-form'

import {
  AlertDialog,
  Button,
  ButtonGroup,
  ControlGroup,
  Fieldset,
  FormWrapper,
  Icon,
  Input,
  Label,
  Spacer,
  Text
} from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { newUserSchema } from '@views/user-management/components/dialogs/components/create-user/schemas'
import {
  ICreateUserDialogProps,
  NewUserFields
} from '@views/user-management/components/dialogs/components/create-user/types'

export function CreateUserDialog({ handleCreateUser, isLoading, apiError, open, onClose }: ICreateUserDialogProps) {
  const {
    register,
    handleSubmit,
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

  const onSubmit: SubmitHandler<NewUserFields> = data => {
    handleCreateUser(data)
  }

  return (
    <AlertDialog.Root open={open} onOpenChange={onClose}>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Add a new user</AlertDialog.Title>
        </AlertDialog.Header>
        <AlertDialog.Description asChild>
          <FormWrapper onSubmit={handleSubmit(onSubmit)}>
            <Fieldset>
              {/* USER ID */}
              <ControlGroup>
                <span className="flex items-center">
                  <Label htmlFor="memberName">User ID</Label>
                  <Icon name="info-circle" height={15} className="text-tertiary-background ml-3" />
                  <Text size={1} className="text-tertiary-background ml-1">
                    User ID cannot be changed once created
                  </Text>
                </span>
                <Spacer size={2} />

                <Input
                  id="memberName"
                  {...register('uid')}
                  placeholder="Enter user name"
                  // label="User ID"
                  error={errors.uid?.message?.toString()}
                />
              </ControlGroup>

              {/* EMAIL */}
              <ControlGroup>
                <Input
                  id="email"
                  {...register('email')}
                  placeholder="Enter email address"
                  label="Email"
                  error={errors.email?.message?.toString()}
                />
              </ControlGroup>

              {/* ROLE */}
              <ControlGroup>
                <Input
                  id="displayName"
                  {...register('display_name')}
                  placeholder="Enter display name"
                  label="Display Name"
                  error={errors.display_name?.message?.toString()}
                />
              </ControlGroup>

              {apiError && (
                <>
                  <Text size={1} className="text-destructive">
                    {apiError?.toString()}
                  </Text>
                </>
              )}
              {/* SAVE BUTTON */}
              <AlertDialog.Footer>
                <ControlGroup>
                  <ButtonGroup>
                    <>
                      <Button size="sm" type="submit" disabled={isLoading}>
                        {isLoading ? 'Inviting...' : 'Invite New User'}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        type="button"
                        onClick={() => {
                          onClose()
                        }}
                        disabled={isLoading}
                      >
                        Cancel
                      </Button>
                    </>
                  </ButtonGroup>
                </ControlGroup>
              </AlertDialog.Footer>
            </Fieldset>
          </FormWrapper>
        </AlertDialog.Description>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
