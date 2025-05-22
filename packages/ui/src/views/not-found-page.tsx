import { FC } from 'react'

import { Button } from '@/components'
import { useTranslation } from '@/context'
import { SandboxLayout } from '@/views'

export interface NotFoundPageProps {
  pageTypeText?: string
}

export const NotFoundPage: FC<NotFoundPageProps> = ({ pageTypeText }) => {
  const { t } = useTranslation()

  const handleReload = () => {
    window.location.reload()
  }

  return (
    <SandboxLayout.Main className="peer flex" fullWidth>
      <div className="m-auto flex max-w-[332px] flex-col items-center pb-56 pt-28 text-center">
        <span className="mb-5 text-8xl font-bold text-cn-foreground-3">404</span>
        <span className="mb-2.5 text-2xl font-medium text-cn-foreground-1">
          {t('views:notFound.title', 'Something went wrong…')}
        </span>
        <span className="mb-7 text-sm text-cn-foreground-3">
          {pageTypeText
            ? t('views:notFound.descriptionWithType', {
                defaultValue: `The requested page is not found. You can go back to view all ${pageTypeText} and manage your settings.`,
                type: pageTypeText
              })
            : t('views:notFound.description', 'The requested page is not found.')}
        </span>
        <Button variant="outline" type="button" onClick={handleReload}>
          {t('views:notFound.button', 'Reload page')}
        </Button>
      </div>
    </SandboxLayout.Main>
  )
}
