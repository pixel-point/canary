import { Spacer, Text } from '@/components'
import { HeaderProps } from '@/views/user-management/components/page-components/header/types'

export const Header = ({ usersCount, useTranslationStore }: HeaderProps) => {
  const { t } = useTranslationStore()

  return (
    <>
      <Text size={5} weight={'medium'}>
        {t('views:userManagement.usersHeader', 'Users')}{' '}
        <Text size={5} weight={'medium'} color="foreground-4">
          ({usersCount || 0})
        </Text>
      </Text>
      <Spacer size={6} />
    </>
  )
}
