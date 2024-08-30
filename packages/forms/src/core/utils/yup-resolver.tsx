import { useCallback } from 'react'
import { ValidationError } from 'yup'
import type { FieldValues, Resolver } from 'react-hook-form'
import type { IFormDefinition } from '../../types/types'
import { getValidationSchema } from '../../core/validation/validation'

export function useYupValidationResolver(formDefinition: IFormDefinition): Resolver<any, any> | undefined {
  return useCallback(
    async (data: FieldValues) => {
      try {
        const validationSchema = getValidationSchema(formDefinition, data)

        const values = await validationSchema.validate(data, {
          abortEarly: false
        })

        return {
          values,
          errors: {}
        }
      } catch (errors) {
        if (errors instanceof ValidationError) {
          return {
            values: {},
            errors: errors.inner.reduce(
              (allErrors, currentError) => ({
                ...allErrors,
                [currentError.path]: {
                  type: currentError.type ?? 'validation',
                  message: currentError.message
                }
              }),
              {}
            )
          }
        }
      }

      return {
        values: {},
        errors: {}
      }
    },
    [formDefinition]
  )
}

// export function useYupValidationResolver(formDefinition: IFormDefinition): Resolver<any, any> | undefined {
//   // return useCallback(
//   return async (data: FieldValues) => {
//     try {
//       const validationSchema = getValidationSchema(formDefinition, data)

//       const values = await validationSchema.validate(data, {
//         abortEarly: false
//       })

//       console.log('NO ERRORS!')
//       return {
//         values: {},
//         errors: {}
//       }
//     } catch (errors) {
//       console.log('errors 2')
//       console.log(errors)
//       // TODO: check this condition
//       if (errors instanceof ValidationError) {
//         return {
//           values: {},
//           errors: errors.inner.reduce(
//             (allErrors, currentError) => ({
//               ...allErrors,
//               [currentError.path]: {
//                 type: currentError.type ?? 'validation',
//                 message: currentError.message
//               }
//             }),
//             {}
//           )
//         }
//       }

//       // TODO: check this
//       return {
//         values: {},
//         errors: {}
//       }
//     }
//   }
//   //   [formDefinition]
//   // )
// }
