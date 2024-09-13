import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Label, Icon, Text, Spacer } from '@harnessio/canary'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Floating1ColumnLayout } from '../layouts/Floating1ColumnLayout'

interface PageProps {
  handleSignUp?: () => void
  handleSignIn: (data: DataProps) => void
  isLoading?: boolean
}

interface DataProps {
  email?: string
  password?: string
}

const createWorkspaceSchema = z.object({
  workspaceName: z.string().email({ message: 'Invalid workspace name' })
})

export function CreateWorkspacePage({ handleSignUp, handleSignIn, isLoading }: PageProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(createWorkspaceSchema)
  })

  const onSubmit = (data: DataProps) => {
    handleSignIn(data)
  }

  return (
    <Floating1ColumnLayout maxWidth="md" verticalCenter>
      <Card variant="plain" width="full">
        <CardHeader>
          <CardTitle className="flex flex-col place-items-center">
            <Icon name="create-workspace" size={112} />
            <Spacer size={4} />
            <Text size={6} weight="medium" color="primary">
              Create new workspace
            </Text>
            <Spacer size={2} />
            <Text size={2} color="tertiaryBackground">
              Organize your projects, pipelines, and more.
            </Text>
          </CardTitle>
        </CardHeader>
        <Spacer size={1} />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Label htmlFor="email" variant="sm">
              Workspace name
            </Label>
            <Spacer size={1} />
            <Input
              id="workspaceName"
              type="text"
              {...register('workspaceName')}
              placeholder="Enter your workspace name"
              autoFocus
            />
            {errors.workspaceName && (
              <>
                <Spacer size={2} />
                <Text size={1} className="text-destructive">
                  {errors.workspaceName.message?.toString()}
                </Text>
              </>
            )}
            <Spacer size={8} />
            <Button variant="default" borderRadius="full" type="submit" loading={isLoading} className="w-full">
              {isLoading ? 'Creating workspace...' : 'Create workspace'}
            </Button>
          </form>
          <Spacer size={4} />
          <Text size={1} color="tertiaryBackground" weight="normal" align="center" className="block">
            Want to use a different account?{' '}
            <a className="text-primary" onClick={handleSignUp}>
              Log out
            </a>
          </Text>
        </CardContent>
      </Card>
    </Floating1ColumnLayout>
  )
}
