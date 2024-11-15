import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'
import type { UseFormProps } from 'react-hook-form'
import { useForm } from 'react-hook-form'

/**
 * useZodForm takes a Zod schema and returns a form hook configured with that schema.
 */
function useZodForm<T extends z.Schema>({
  schema,
  ...props
}: Exclude<UseFormProps<z.infer<T>>, 'resolver'> & { schema: T }) {
  return useForm({
    ...props,
    resolver: zodResolver(schema)
  })
}

export { useZodForm }
