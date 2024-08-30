import * as Yup from 'yup'
import { get, isArray, isEmpty, isUndefined, merge, set } from 'lodash-es'
import type { AnyFormikValue, IFormDefinition, IGlobalValidationConfig, IInputDefinition } from '../../types/types'

/**
 * Internal type used for preparing data model for creating schema
 */
type SchemaTreeNode = { [key: string]: SchemaTreeNode } & {
  _input?: IInputDefinition
  _isList?: boolean
  _isArrayItem?: boolean
  _schema?: Yup.ObjectSchema<any>
  _schemaObj?: { [key: string]: SchemaTreeNode }
  _requiredOnly?: boolean
}

interface IGetValidationSchemaOptions<T = any> {
  /**
   * Metadata is passed down to validation callbacks
   */
  metadata?: T
  /**
   * If formik model is nested, use prefix to extract data form matching.
   *
   * e.g. to get form data form {formData: {...}} use "formData." as prefix
   */
  prefix?: string
  /**
   * global validation configuration applies to all inputs
   */
  validationConfig?: IGlobalValidationConfig
  // TODO: check this
  utils?: {
    getValuesWithDependencies?: (values: AnyFormikValue, input: IInputDefinition) => AnyFormikValue
  }
}

export function getValidationSchema<T = any>(
  inputs: IFormDefinition,
  values: AnyFormikValue,
  options?: IGetValidationSchemaOptions<T>
): Yup.ObjectSchema<any> {
  let schemaTreeNode: SchemaTreeNode = {}

  // 1. Prepare three model
  populateSchemaTreeRec(schemaTreeNode, inputs.inputs, values, options)

  console.log('Internal model:')
  console.log(schemaTreeNode)

  if (options?.prefix) {
    const prefixWithoutDot = options?.prefix.replace(/.$/, '')
    schemaTreeNode = set({}, prefixWithoutDot, schemaTreeNode)
  }

  // 2. Generate schema from model
  const schema = Yup.object().shape(generateSchemaRec(schemaTreeNode, values, options))

  console.log('Schema:')
  console.log(schema)

  return schema
}

function generateSchemaRec(schemaObj: SchemaTreeNode, values: AnyFormikValue, options?: IGetValidationSchemaOptions) {
  const objectSchemas: { [key: string]: Yup.Schema<unknown> } = {}

  Object.keys(schemaObj).forEach(key => {
    const { _requiredOnly, _schemaObj, _input, _isList, _isArrayItem, _schema /*...nestedSchemaObj*/ } = schemaObj[key]
    if (_isList && _schemaObj && _input) {
      const arraySchema = Yup.array().of(Yup.object().shape(generateSchemaRec(_schemaObj, values, options)))

      const enhancedSchema = getSchemaForArray(_schema, _input, values, options, arraySchema)
      //const enhancedSchema = getSchemaForPrimitive(_chainSchema, _input, values, options, arraySchema)

      objectSchemas[key] = enhancedSchema!
    } else if (_isArrayItem && _input) {
      const innerSchema = _schemaObj?.___array
        ? generateSchemaRec({ ___array: _schemaObj.___array }, values, options)
        : { ___array: Yup.mixed() }

      const arraySchema = Yup.array().of(innerSchema.___array)

      const enhancedSchema = getSchemaForArray(_schema, _input, values, options, arraySchema)
      objectSchemas[key] = enhancedSchema!
    } else if (_schema && _input) {
      const enhancedSchema: Yup.Schema<unknown> = getSchemaForPrimitive(_schema, _input, options)
      objectSchemas[key] = enhancedSchema
      // TODO check this
      // objectSchemas[key] = !isEmpty(nestedSchemaObj)
      //   ? addNestedSchema(nestedSchemaObj, enhancedSchema, options)
      //   : enhancedSchema
    } else if (_requiredOnly && _input) {
      objectSchemas[key] = getRequiredSchema(_input, options)

      // TODO check this
      // if only required (no schema in place)
      // let requiredSchema = chainRequiredSchema(Yup.mixed(), _input!.inputType, options)
      // requiredSchema =
      //   options?.globalValidationConfig?.globalValidation?.(requiredSchema, _input!) ?? requiredSchema
      // requiredSchema.when(_input?.path!, {
      //   is: value => {
      //     return true
      //   },
      //   then: (schema2: Yup.MixedSchema) =>
      //     options?.globalValidationConfig?.globalValidation?.(schema2, _input!) ?? schema2
      // })
      //const requiredSchema = _input ? composeSchema(, _input, values, options) : Yup.mixed() //getRequiredSchema(_input?.inputType!, options)
      // ovo >>
      // objectSchemas[key] = !isEmpty(nestedSchemaObj)
      //   ? addNestedSchema(nestedSchemaObj, requiredSchema, options)
      //   : requiredSchema
    } else {
      objectSchemas[key] = Yup.object().shape(generateSchemaRec(schemaObj[key], options))
    }
  })

  return objectSchemas
}

function getSchemaForPrimitive(
  schema: Yup.MixedSchema<unknown> | Yup.NotRequiredArraySchema<unknown> | undefined,
  input: IInputDefinition,
  options?: IGetValidationSchemaOptions
) {
  console.log(input, 'input validation')
  return Yup.string().test({
    name: 'validator-custom-name',
    test: function (value) {
      //console.log('TEST:' + value)
      // 1. Required validation
      if (input.required && !getRequiredSchema(input, options).isValidSync(value)) {
        return this.createError({
          message: `Required field`
        })
      }

      // 2. Global validation
      if (options?.validationConfig?.globalValidation) {
        const validationRes = options?.validationConfig?.globalValidation(value, input!, options.metadata)

        if (validationRes.error) {
          return this.createError({
            message: validationRes.error
          })
        }

        if (!validationRes.continue) {
          return true
        }
      }

      //3. Input validation
      if (schema) {
        //console.log('validate sync', value)

        try {
          //console.log('validate sync', value)
          schema.validateSync(value)
          //console.log(schema)
        } catch (validationErrorsObj: any) {
          //console.log(validationErrorsObj)

          if (validationErrorsObj?.errors?.[0]) {
            return this.createError({
              message: validationErrorsObj.errors[0]
            })
          }
        }
      }

      // 4. If all validations pass return true
      return true
    }
  })
}

function getSchemaForArray(
  schema: Yup.MixedSchema<unknown> | Yup.NotRequiredArraySchema<unknown> | undefined,
  input: IInputDefinition,
  _values: AnyFormikValue, // TODO remove this
  options?: IGetValidationSchemaOptions,
  arraySchema?: Yup.NotRequiredArraySchema<unknown>
) {
  return Yup.lazy((value: any) => {
    // 1. Required validation
    if (input.required) {
      console.log('123')
      const requiredSchema = getRequiredSchema(input, options)
      if (!requiredSchema.isValidSync(value)) {
        console.log('456')
        console.log(requiredSchema)

        return requiredSchema
      }
    }

    // 2. Global validation
    if (options?.validationConfig?.globalValidation) {
      const validationRes = options?.validationConfig?.globalValidation(value, input, options.metadata)

      if (validationRes.error) {
        return Yup.mixed().test(validationRes.error, validationRes.error, () => false)
      } else if (!validationRes.continue) {
        return Yup.mixed()
      }
    }

    // 3. Prevent more validation if value is not an array
    if (!isArray(value)) {
      return Yup.mixed().test('Value is not array', 'Value is not array', () => false)
    }

    // 4. Input validation
    if (schema) {
      if (!schema.isValidSync(value)) {
        return schema
      }
    }

    // 5. Return dynamically created validation for nested inputs
    return arraySchema ?? Yup.mixed()
  })
}

function populateSchemaTreeRec<T = any>(
  schemaObj: SchemaTreeNode,
  inputsArr: IInputDefinition[],
  values: AnyFormikValue,
  options?: IGetValidationSchemaOptions<T>,
  utils?: {
    getValuesWithDependencies?: (values: AnyFormikValue, input: IInputDefinition) => AnyFormikValue
  }
): void {
  inputsArr.forEach(input => {
    const valuesWithDependencies = utils?.getValuesWithDependencies
      ? utils?.getValuesWithDependencies(values, input)
      : values

    if (!input.isVisible || input.isVisible?.(valuesWithDependencies, options?.metadata)) {
      const existingSchema = get(schemaObj, input.path)
      if (input.validation?.schema) {
        set(
          schemaObj,
          input.path,
          merge(existingSchema, {
            _schema: input.validation?.schema,
            _input: input
          })
        )
      } else if (input.required) {
        set(schemaObj, input.path, merge(existingSchema, { _requiredOnly: true, _input: input }))
      }
      if (input.inputs) {
        populateSchemaTreeRec(schemaObj, input.inputs, values, options, utils)
      }

      // handle list
      if (input.inputType === 'list') {
        const listSchemaObj: SchemaTreeNode = {}
        populateSchemaTreeRec(
          listSchemaObj,
          (input.inputConfig as any).inputs.map((item: any) => ({ ...item, path: item.relativePath })),
          values,
          options,
          utils
        )

        const existingSchema = get(schemaObj, input.path)
        set(schemaObj, input.path, merge(existingSchema, { _schemaObj: listSchemaObj, _isList: true, _input: input }))

        console.log('debug 1')

        console.log(get(schemaObj, input.path))
      }

      // handle array
      if (!input.validation?.schema && (input.inputType as string) === 'array') {
        let arraySchemaObj = {}
        populateSchemaTreeRec(
          arraySchemaObj,
          [{ ...(input.inputConfig as any).input, path: '___array' }],
          values,
          options,
          utils
        )

        set(
          schemaObj,
          input.path,
          merge(existingSchema, {
            _schemaObj: arraySchemaObj,
            _schema: input.validation?.schema,
            _isArrayItem: true,
            _input: input
          })
        )
      }
    }
  })
}

function getRequiredSchema(
  input: IInputDefinition,
  options?: IGetValidationSchemaOptions
): Yup.MixedSchema | Yup.NotRequiredArraySchema<unknown> {
  if (options?.validationConfig?.requiredSchemaPerInput?.[input.inputType]) {
    return options?.validationConfig?.requiredSchemaPerInput?.[input.inputType]
  } else if (options?.validationConfig?.requiredSchema) {
    return options?.validationConfig?.requiredSchema
  }

  const requiredMessage =
    options?.validationConfig?.requiredMessagePerInput?.[input.inputType] ??
    options?.validationConfig?.requiredMessage ??
    'Required fields'

  // Default "required value" validation
  return Yup.mixed().test({
    name: requiredMessage,
    message: requiredMessage,
    test: function (value) {
      if (typeof value === 'object' && isEmpty(value)) {
        return false
      }
      return !(isUndefined(value) || value === '')
    }
  })
}
