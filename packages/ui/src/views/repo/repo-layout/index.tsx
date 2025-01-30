import { useCallback, useMemo } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { Tabs } from '@/components'
import { SandboxLayout, TranslationStore } from '@/views'

export enum RepoTabsKeys {
  SUMMARY = 'summary',
  CODE = 'code',
  PIPELINES = 'pipelines',
  COMMITS = 'commits',
  PULLS = 'pulls',
  BRANCHES = 'branches',
  SETTINGS = 'settings'
}

export const repoTabsKeysArr = Object.values(RepoTabsKeys)

export const RepoLayout = ({ useTranslationStore }: { useTranslationStore: () => TranslationStore }) => {
  const location = useLocation()
  const { t } = useTranslationStore()

  const navigate = useNavigate()

  const makeHandleTabChange = useCallback((tab: string) => () => navigate(tab), [navigate])

  const activeTab = useMemo(() => {
    // Prioritize 'pulls' over 'commits' if both are present in the pathname
    if (location.pathname.includes(RepoTabsKeys.PULLS)) {
      return RepoTabsKeys.PULLS
    }
    const tab = repoTabsKeysArr.find(key => location.pathname.includes(key))
    return tab ?? RepoTabsKeys.SUMMARY
  }, [location.pathname])

  return (
    <>
      <SandboxLayout.SubHeader className="h-11 overflow-hidden">
        <Tabs.Root variant="navigation" value={activeTab}>
          <Tabs.List>
            <Tabs.Trigger role="link" value="summary" onClick={makeHandleTabChange(RepoTabsKeys.SUMMARY)}>
              {t('views:repos.summary', 'Summary')}
            </Tabs.Trigger>
            <Tabs.Trigger role="link" value="code" onClick={makeHandleTabChange(RepoTabsKeys.CODE)}>
              {t('views:repos.files', 'Files')}
            </Tabs.Trigger>
            <Tabs.Trigger role="link" value="pipelines" onClick={makeHandleTabChange(RepoTabsKeys.PIPELINES)}>
              {t('views:repos.pipelines', 'Pipelines')}
            </Tabs.Trigger>
            <Tabs.Trigger role="link" value="commits" onClick={makeHandleTabChange(RepoTabsKeys.COMMITS)}>
              {t('views:repos.commits', 'Commits')}
            </Tabs.Trigger>
            <Tabs.Trigger role="link" value="pulls" onClick={makeHandleTabChange(RepoTabsKeys.PULLS)}>
              {t('views:repos.pull-requests', 'Pull Requests')}
            </Tabs.Trigger>
            <Tabs.Trigger role="link" value="branches" onClick={makeHandleTabChange(RepoTabsKeys.BRANCHES)}>
              {t('views:repos.branches', 'Branches')}
            </Tabs.Trigger>
            <Tabs.Trigger role="link" value="settings" onClick={makeHandleTabChange(RepoTabsKeys.SETTINGS)}>
              {t('views:repos.settings', 'Settings')}
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>
      </SandboxLayout.SubHeader>
      <Outlet />
    </>
  )
}
