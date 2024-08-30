import React, { ReactElement, useEffect, useRef } from 'react'
import type { Attributes } from 'react'
import type { IGlobalValidationConfig } from '../../types/types'
import {
  useForm,
  FormProvider,
  Resolver,
  FieldValues,
  DefaultValues,
  DeepPartial,
  UseFormReturn
} from 'react-hook-form'

interface RootFormProps<TFieldValues extends FieldValues = FieldValues, TContext = any> {
  defaultValues?: DefaultValues<TFieldValues>
  resolver: Resolver<TFieldValues, TContext> | undefined
  onValuesChange?: (values: DeepPartial<TFieldValues>, formState: { isValid?: boolean }) => void
  onSubmit?: (values: FieldValues) => void
  shouldFocusError?: boolean
  mode: 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched' | 'all' | undefined
  //
  children:
    | JSX.Element
    | ((props: UseFormReturn<TFieldValues, any, undefined> & { submitForm: () => void }) => JSX.Element) //
  //
  validateAfterFirstSubmit?: boolean
  // validateDebounceInterval?: number
  // onValuesChange: (values: FormikValues) => void
  validationConfig?: IGlobalValidationConfig
  /**
   * This is passed to input handlers
   *
   * For visible function second argument is metadata.
   *
   * ```isVisible?: (values: AnyFormikValue, metadata: any) => boolean```
   */
  metadata?: any

  /**
   * Provide fixed value that are required for defined inputs
   */
  fixedValues?: { [path: string]: any }
  /**
   * Prefix to target nested structure
   */
  prefix?: string
  key?: Attributes['key']
}

export function RootForm<TFieldValues extends FieldValues = FieldValues, TContext = any>(
  props: RootFormProps<TFieldValues, TContext>
): ReactElement {
  const {
    mode = 'onSubmit',
    resolver,
    defaultValues,
    shouldFocusError,
    // validateAfterFirstSubmit,
    onValuesChange,
    onSubmit,
    // validate,
    // validateDebounceInterval,
    // validationConfig,
    // metadata,
    children
    // fixedValues
  } = props

  const methods = useForm<TFieldValues>({
    mode: mode ?? 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues,
    shouldFocusError,
    resolver
  })

  const submittedRef = useRef(false)

  useEffect(() => {
    methods.reset(defaultValues)
  }, [methods.reset, defaultValues])

  const { getValues } = methods
  const values = getValues()

  useEffect(() => {
    onValuesChange?.({ ...(values as any) }, { isValid: methods.formState.isValid })

    if (submittedRef.current === true) {
      methods.trigger()
    }
  }, [JSON.stringify(values)])

  return (
    <FormProvider {...methods}>
      {typeof children === 'function'
        ? children({
            ...methods,
            submitForm: () => {
              if (onSubmit) {
                submittedRef.current = true
                methods.handleSubmit(onSubmit)()
              }
            }
          })
        : children}
    </FormProvider>
  )
}
