import { useEffect } from 'react'

import { useGetRepoId } from '../../../../framework/hooks/useGetRepoId'
import { useLabelsStore } from '../../../project/stores/labels-store'
import { useGetRepoLabelAndValuesData } from './use-get-repo-label-and-values-data'

export interface UseFullFillLabelStoreProps {
  queryPage?: number
  query?: string
  enabled?: boolean
}

export const useFullFillLabelStore = ({ queryPage, query, enabled = true }: UseFullFillLabelStoreProps) => {
  const repoId = useGetRepoId()

  const { setLabels, setValues, setRepoSpaceRef, resetLabelsAndValues, getParentScopeLabels } = useLabelsStore()

  const { isLoading, space_ref, repo_ref, labels, values } = useGetRepoLabelAndValuesData({
    queryPage,
    query,
    enabled,
    inherited: getParentScopeLabels
  })

  /**
   * Resetting the store state for labels and values
   * because the same data retrieval endpoint is used for both the edit form and the list.
   * TODO: Refactor the code once the API for fetching a single label with its values is available.
   */
  useEffect(() => {
    return () => {
      resetLabelsAndValues()
    }
  }, [resetLabelsAndValues])

  /**
   * Set space_ref & repo_ref to store
   */
  useEffect(() => {
    setRepoSpaceRef({
      repo_ref: repoId ?? '',
      space_ref: space_ref ?? ''
    })
  }, [space_ref, repoId, setRepoSpaceRef])

  /**
   * Set labels data from API to store
   */
  useEffect(() => {
    setLabels(labels)
  }, [labels, setLabels])

  /**
   * Set values data from API to store
   */
  useEffect(() => {
    setValues(values)
  }, [values, setValues])

  return {
    isLoading,
    space_ref,
    repo_ref
  }
}
