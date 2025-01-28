import { TranslationStore } from '@/views'

export interface HeaderProps {
  usersCount: number
  useTranslationStore: () => TranslationStore
}
