export type MutationFn<T> = (params: T, options: { onSuccess: () => void; onError: (error: any) => void }) => void

export const promisifyMutation = <T>(mutation: MutationFn<T>, params: T): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    mutation(params, {
      onSuccess: () => resolve(),
      onError: error => reject(error)
    })
  })
}
