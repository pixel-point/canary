import React from 'react'
import { FormFieldSet } from '..'
import { RepoSettingsGeneralForm } from '../components/repo-settings/repo-settings-general/repo-settings-general-form'
import { RepoSettingsGeneralRules } from '../components/repo-settings/repo-settings-general/repo-settings-general-rules'
import { RepoSettingsSecurityForm } from '../components/repo-settings/repo-settings-general/repo-settings-general-security'
import { RepoSettingsGeneralDelete } from '../components/repo-settings/repo-settings-general/repo-settings-general-delete'
function RepoSettingsGeneralPage() {
  return (
    <>
      <FormFieldSet.Root>
        <RepoSettingsGeneralForm />
        <FormFieldSet.Separator />
        <RepoSettingsGeneralRules />
        <FormFieldSet.Separator />
        <RepoSettingsSecurityForm />
        <FormFieldSet.Separator />
        <RepoSettingsGeneralDelete />
      </FormFieldSet.Root>
    </>
  )
}

export { RepoSettingsGeneralPage }
