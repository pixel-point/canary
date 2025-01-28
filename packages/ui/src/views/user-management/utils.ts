import { UsersProps } from '@/views/user-management/types'

export const filterItems = (items: UsersProps[], query: string) => {
  if (!query.trim()) return items

  return items.filter(item => item.display_name?.toLowerCase().includes(query.toLowerCase().trim()))
}
