import { TypesPlugin } from '../types/api-types'

// TODO: use hook
const LIST_FETCHING_LIMIT = 100
export const fetchPlugins = async (page: number): Promise<TypesPlugin[]> => {
  const response = await fetch(`/api/v1/plugins?page=${page}&limit=${LIST_FETCHING_LIMIT}`)
  if (!response.ok) throw new Error('Failed to fetch plugins')
  return response.json()
}
