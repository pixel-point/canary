import { useTranslationStore } from '@utils/viewUtils'

import { ProjectSettingsGeneralPage } from '@harnessio/ui/views'

export const ProjectSettingsView = () => {
  return (
    <ProjectSettingsGeneralPage
      onFormSubmit={() => {}}
      isUpdating={false}
      isUpdateSuccess={false}
      updateError={null}
      setOpenDeleteDialog={() => {}}
      useTranslationStore={useTranslationStore}
    />
  )
}
