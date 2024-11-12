import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from '@harnessio/canary'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  name: z.string().min(1, { message: 'Please provide a tag name' }),
  commit: z.string().min(1, { message: '' }),
  description: z.string().min(0, { message: 'optional' })
})

interface CreateTagDialogProps {

}

export const CreateTagDialog = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid, isDirty }
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      commit: '',
      description: ''
    }
  })

  return (
    <AlertDialog open={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Create a tag
          </AlertDialogTitle>
        </AlertDialogHeader>

        {/*<form onSubmit={handleSubmit(onSubmit)}>*/}

        {/*</form>*/}
      </AlertDialogContent>
    </AlertDialog>
  )
}
