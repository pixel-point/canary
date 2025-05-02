import { DelegateItem } from '@/views'

export const getMatchedDelegatesCount = (delegates: DelegateItem[] = [], tags: string[] = []): number => {
  if (!delegates.length || !tags.length) {
    return 0
  }

  const tagSet = new Set(tags)

  return delegates.reduce<number>((count, delegate) => {
    const implicit = delegate.groupImplicitSelectors ?? []
    const custom = delegate.groupCustomSelectors ?? []
    const delegateTags = [...implicit, ...custom]
    const matches = delegateTags.some(tag => tagSet.has(tag))
    return matches ? count + 1 : count
  }, 0)
}
