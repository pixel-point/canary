import { DialogLabels, TranslationStore, UsersProps } from '@/views'

export interface ActionsProps {
  searchQuery: string
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleDialogOpen: (user: UsersProps | null, dialogLabel: DialogLabels) => void
  filterOptions: any[]
  sortOptions: any[]
  filterHandlers: any
  useTranslationStore: () => TranslationStore
}
