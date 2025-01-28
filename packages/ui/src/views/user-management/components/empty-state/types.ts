import { TFunction } from 'i18next'

export interface IEmptyStateProps {
  t: TFunction<'translation', undefined>
  onButtonClick: () => void
}
