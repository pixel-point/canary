import { useEffect } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { Link } from 'react-router-dom'

import {
  Alert,
  Button,
  ButtonGroup,
  Checkbox,
  FormFieldSet,
  Input,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spacer,
  Text,
  Textarea,
  Toast
} from '@/components'
import { SandboxLayout } from '@/views'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Define the form schema with optional fields for gitignore and license
const formSchema = z.object({
  name: z.string().min(1, { message: 'Please provide a name' }),
  description: z.string(),
  gitignore: z.string().optional(),
  license: z.string().optional(),
  access: z.enum(['1', '2'], { errorMap: () => ({ message: 'Please select who has access' }) }),
  readme: z.boolean()
})

export type FormFields = z.infer<typeof formSchema> // Automatically generate a type from the schema

interface RepoCreatePageProps {
  onFormSubmit: (data: FormFields) => void
  onFormCancel: () => void
  apiError: string | null
  isLoading: boolean
  isSuccess: boolean
  gitIgnoreOptions?: string[]
  licenseOptions?: { value?: string; label?: string }[]
}

export function RepoCreatePage({
  onFormSubmit,
  apiError = null,
  onFormCancel,
  isLoading,
  isSuccess,
  gitIgnoreOptions,
  licenseOptions
}: RepoCreatePageProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid }
  } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      gitignore: '',
      license: '',
      access: '2',
      readme: false
    }
  })

  const accessValue = watch('access')
  const gitignoreValue = watch('gitignore')
  const licenseValue = watch('license')
  const readmeValue = watch('readme')

  const handleSelectChange = (fieldName: keyof FormFields, value: string) => {
    setValue(fieldName, value, { shouldValidate: true })
  }

  const handleAccessChange = (value: '1' | '2') => {
    setValue('access', value, { shouldValidate: true })
  }

  const handleReadmeChange = (value: boolean) => {
    console.log('readmeValue', value)
    setValue('readme', value, { shouldValidate: true })
  }

  useEffect(() => {
    if (isSuccess === true) {
      reset()
    }
  }, [isSuccess, reset])

  useEffect(() => {
    if (apiError) {
      Toast.toast({
        title: apiError,
        variant: 'destructive'
      })
    }
  }, [])

  const onSubmit: SubmitHandler<FormFields> = data => {
    onFormSubmit(data)
  }

  const handleCancel = () => {
    onFormCancel()
  }

  return (
    <>
      <SandboxLayout.Main hasLeftPanel>
        <SandboxLayout.Content paddingClassName="w-[570px] mx-auto py-11">
          <Spacer size={5} />
          <Text className="tracking-tight" size={5} weight="medium">
            Create a new repository
          </Text>
          <Spacer size={2.5} />
          <Text className="text-foreground-2 max-w-[476px] tracking-tight" size={2} as="p">
            A repository contains all project files, including the revision history. Already have a project repository
            elsewhere?{' '}
            <Link className="text-foreground-accent" to="../import" relative="path">
              Import a repository.
            </Link>
          </Text>
          <Spacer size={10} />
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* NAME */}
            <FormFieldSet.Root>
              <FormFieldSet.ControlGroup>
                <FormFieldSet.Label htmlFor="name">Name</FormFieldSet.Label>
                <Input
                  id="name"
                  {...register('name')}
                  theme={errors.name ? 'danger' : 'default'}
                  placeholder="Enter repository name"
                  size="md"
                  autoFocus
                />
                {errors.name && (
                  <FormFieldSet.Message theme={FormFieldSet.MessageTheme.ERROR}>
                    {errors.name.message?.toString()}
                  </FormFieldSet.Message>
                )}
              </FormFieldSet.ControlGroup>
              <Spacer size={7} />
              {/* DESCRIPTION */}
              <FormFieldSet.ControlGroup>
                <FormFieldSet.Label htmlFor="description" optional>
                  Description
                </FormFieldSet.Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  placeholder="Enter a description of this repository..."
                />
                {errors.description && (
                  <FormFieldSet.Message theme={FormFieldSet.MessageTheme.ERROR}>
                    {errors.description.message?.toString()}
                  </FormFieldSet.Message>
                )}
              </FormFieldSet.ControlGroup>
            </FormFieldSet.Root>
            <Spacer size={7} />

            {/* GITIGNORE */}
            <FormFieldSet.Root>
              <FormFieldSet.ControlGroup>
                <FormFieldSet.Label htmlFor="gitignore">Add a .gitignore</FormFieldSet.Label>
                <Select value={gitignoreValue} onValueChange={value => handleSelectChange('gitignore', value)}>
                  <SelectTrigger id="gitignore">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {gitIgnoreOptions &&
                      gitIgnoreOptions?.map(option => {
                        return (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        )
                      })}
                  </SelectContent>
                </Select>
                <FormFieldSet.Caption>Choose which files not to track from a list of templates.</FormFieldSet.Caption>
                {errors.gitignore && (
                  <FormFieldSet.Message theme={FormFieldSet.MessageTheme.ERROR}>
                    {errors.gitignore.message?.toString()}
                  </FormFieldSet.Message>
                )}
              </FormFieldSet.ControlGroup>
              <Spacer size={7} />

              {/* LICENSE */}
              <FormFieldSet.ControlGroup>
                <FormFieldSet.Label htmlFor="license">Choose a license</FormFieldSet.Label>
                <Select value={licenseValue} onValueChange={value => handleSelectChange('license', value)}>
                  <SelectTrigger id="license">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {licenseOptions &&
                      licenseOptions?.map(option => (
                        <SelectItem key={option.value} value={option.value ?? ''}>
                          {option.label}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormFieldSet.Caption>
                  A license tells others what they can and can&apos;t do with your code.
                </FormFieldSet.Caption>
                {errors.license && (
                  <FormFieldSet.Message theme={FormFieldSet.MessageTheme.ERROR}>
                    {errors.license.message?.toString()}
                  </FormFieldSet.Message>
                )}
              </FormFieldSet.ControlGroup>
            </FormFieldSet.Root>
            <Spacer size={11} />

            {/* ACCESS */}
            <FormFieldSet.Root>
              <FormFieldSet.ControlGroup>
                <FormFieldSet.Label htmlFor="access">Who has access</FormFieldSet.Label>
                <RadioGroup className="mt-3.5" value={accessValue} onValueChange={handleAccessChange} id="access">
                  <FormFieldSet.Option
                    control={<RadioGroupItem value="1" id="access-public" />}
                    id="access-public"
                    label="Public"
                    description="Anyone with access to the Gitness environment can clone this repo."
                  />
                  <FormFieldSet.Option
                    control={<RadioGroupItem value="2" id="access-private" />}
                    id="access-private"
                    label="Private"
                    description="You choose who can see and commit to this repository."
                  />
                </RadioGroup>
                {errors.access && (
                  <FormFieldSet.Message theme={FormFieldSet.MessageTheme.ERROR}>
                    {errors.access.message?.toString()}
                  </FormFieldSet.Message>
                )}
              </FormFieldSet.ControlGroup>
            </FormFieldSet.Root>
            <Spacer size={12} />

            {/* README */}
            <FormFieldSet.Root>
              <FormFieldSet.ControlGroup>
                <FormFieldSet.Label>Initialize this repository with</FormFieldSet.Label>
                <Checkbox
                  className="mt-3.5"
                  id="readme"
                  checked={readmeValue}
                  onCheckedChange={handleReadmeChange}
                  label="Add a README file"
                />
                <Text className="text-foreground-4 mt-1.5 pl-[26px] font-normal tracking-tight" as="p" size={2}>
                  This is where you can write a long description for your project.{' '}
                  <Link className="text-foreground-accent block" to="/">
                    Learn more about README
                  </Link>
                </Text>

                {errors.readme && (
                  <FormFieldSet.Message theme={FormFieldSet.MessageTheme.ERROR}>
                    {errors.readme.message?.toString()}
                  </FormFieldSet.Message>
                )}
              </FormFieldSet.ControlGroup>
            </FormFieldSet.Root>

            {apiError && (
              <Alert.Container variant="destructive" className="mb-8">
                <Alert.Description>{apiError?.toString()}</Alert.Description>
              </Alert.Container>
            )}

            {/* SUBMIT BUTTONS */}
            <FormFieldSet.Root className="mt-[50px]">
              <FormFieldSet.ControlGroup>
                <ButtonGroup.Root>
                  <>
                    <Button type="submit" disabled={!isValid || isLoading}>
                      {!isLoading ? 'Create repository' : 'Creating repository...'}
                    </Button>
                    <Button type="button" variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </>
                </ButtonGroup.Root>
              </FormFieldSet.ControlGroup>
            </FormFieldSet.Root>
          </form>

          <Toast.Toaster />
        </SandboxLayout.Content>
      </SandboxLayout.Main>
    </>
  )
}
