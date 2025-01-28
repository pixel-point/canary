import { TranslationStore } from '@/views'

export interface ActionsProps {
  searchQuery: string
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleDialogOpen: (user: null, dialogLabel: string) => void
  filterOptions: any[]
  sortOptions: any[]
  filterHandlers: any
  useTranslationStore: () => TranslationStore
}
