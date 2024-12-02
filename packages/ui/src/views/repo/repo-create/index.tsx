import { useEffect } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'

import {
  Button,
  ButtonGroup,
  Checkbox,
  ControlGroup,
  ErrorMessageTheme,
  Fieldset,
  FormErrorMessage,
  Input,
  RadioButton,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  Spacer,
  StyledLink,
  Text,
  Textarea
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
  isLoading: boolean
  isSuccess: boolean
  gitIgnoreOptions?: string[]
  licenseOptions?: { value?: string; label?: string }[]
}

export function RepoCreatePage({
  onFormSubmit,
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
    setValue('readme', value, { shouldValidate: true })
  }

  useEffect(() => {
    if (isSuccess) {
      reset()
    }
  }, [isSuccess, reset])

  const onSubmit: SubmitHandler<FormFields> = data => {
    onFormSubmit(data)
  }

  const handleCancel = () => {
    onFormCancel()
  }

  return (
    <>
      <SandboxLayout.Main hasLeftPanel>
        <SandboxLayout.Content paddingClassName="w-[570px] mx-auto pt-11 pb-20">
          <Spacer size={5} />
          <Text className="tracking-tight" size={5} weight="medium">
            Create a new repository
          </Text>
          <Spacer size={2.5} />
          <Text className="text-foreground-2 max-w-[476px]" size={2} as="p">
            A repository contains all project files, including the revision history. Already have a project repository
            elsewhere?{' '}
            <StyledLink to="../import" relative="path">
              Import a repository.
            </StyledLink>
          </Text>
          <Spacer size={10} />
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* NAME */}
            <Fieldset>
              <ControlGroup>
                <Input
                  id="name"
                  label="Name"
                  {...register('name')}
                  placeholder="Enter repository name"
                  size="md"
                  error={errors.name && { theme: ErrorMessageTheme.ERROR, message: errors.name.message?.toString() }}
                  autoFocus
                />
              </ControlGroup>
              <Spacer size={7} />
              {/* DESCRIPTION */}
              <ControlGroup>
                <Textarea
                  id="description"
                  {...register('description')}
                  placeholder="Enter a description of this repository..."
                  label="Description"
                  error={
                    errors.description && {
                      theme: ErrorMessageTheme.ERROR,
                      message: errors.description.message?.toString()
                    }
                  }
                  optional
                />
              </ControlGroup>
            </Fieldset>
            <Spacer size={7} />

            {/* GITIGNORE */}
            <Fieldset>
              <ControlGroup>
                <Select
                  name="gitignore"
                  value={gitignoreValue}
                  onValueChange={value => handleSelectChange('gitignore', value)}
                  placeholder="Select"
                  label="Add a .gitignore"
                  error={
                    errors.gitignore && {
                      theme: ErrorMessageTheme.ERROR,
                      message: errors.gitignore.message?.toString()
                    }
                  }
                  caption="Choose which files not to track from a list of templates."
                >
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
              </ControlGroup>
              <Spacer size={6} />

              {/* LICENSE */}
              <ControlGroup>
                <Select
                  name="license"
                  value={licenseValue}
                  onValueChange={value => handleSelectChange('license', value)}
                  placeholder="Select"
                  label="Choose a license"
                  error={
                    errors.license && {
                      theme: ErrorMessageTheme.ERROR,
                      message: errors.license.message?.toString()
                    }
                  }
                  caption="A license tells others what they can and can't do with your code."
                >
                  <SelectContent>
                    {licenseOptions &&
                      licenseOptions?.map(option => (
                        <SelectItem key={option.value} value={option.value ?? ''}>
                          {option.label}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </ControlGroup>
            </Fieldset>
            <Spacer size={11} />

            {/* ACCESS */}
            <Fieldset>
              <ControlGroup>
                <Text className="text-foreground-2 leading-none" size={2}>
                  Who has access
                </Text>
                <RadioGroup className="mt-6" value={accessValue} onValueChange={handleAccessChange} id="access">
                  <RadioGroupItem
                    control={<RadioButton className="mt-px" value="1" id="access-public" />}
                    id="access-public"
                    label="Public"
                    ariaSelected={accessValue === '1'}
                    description="Anyone with access to the Gitness environment can clone this repo."
                  />
                  <RadioGroupItem
                    control={<RadioButton className="mt-px" value="2" id="access-private" />}
                    id="access-private"
                    label="Private"
                    ariaSelected={accessValue === '2'}
                    description="You choose who can see and commit to this repository."
                  />
                </RadioGroup>
                {errors.access && (
                  <FormErrorMessage className="mt-1" theme={ErrorMessageTheme.ERROR}>
                    {errors.access.message?.toString()}
                  </FormErrorMessage>
                )}
              </ControlGroup>
            </Fieldset>
            <Spacer size={11} />

            {/* README */}
            <Fieldset>
              <ControlGroup>
                <Text className="text-foreground-2 leading-none" size={2}>
                  Initialize this repository with
                </Text>
                <RadioGroupItem
                  className="mt-6"
                  control={<Checkbox id="readme" checked={readmeValue} onCheckedChange={handleReadmeChange} />}
                  id="readme"
                  label="Add a README file"
                  ariaSelected={accessValue === '1'}
                  description={
                    <>
                      This is where you can write a long description for your project.{' '}
                      <StyledLink className="inline-block" to="/">
                        Learn more about README
                      </StyledLink>
                    </>
                  }
                />

                {errors.readme && (
                  <FormErrorMessage theme={ErrorMessageTheme.ERROR}>
                    {errors.readme.message?.toString()}
                  </FormErrorMessage>
                )}
              </ControlGroup>
            </Fieldset>

            {/* SUBMIT BUTTONS */}
            <Fieldset className="mt-[50px]">
              <ControlGroup>
                <ButtonGroup.Root>
                  <>
                    {/* TODO: Improve loading state to avoid flickering */}
                    <Button type="submit" disabled={!isValid || isLoading}>
                      {!isLoading ? 'Create repository' : 'Creating repository...'}
                    </Button>
                    <Button type="button" variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </>
                </ButtonGroup.Root>
              </ControlGroup>
            </Fieldset>
          </form>
        </SandboxLayout.Content>
      </SandboxLayout.Main>
    </>
  )
}
