import { useParams } from 'react-router-dom'
import type { PathParams } from '../../RouteDefinitions'
import { useAppContext } from '../context/AppContext'

export function useGetSpaceURLParam(): string | undefined {
  const { selectedSpace } = useAppContext()
  const { spaceId } = useParams<PathParams>()
  return spaceId || selectedSpace
}
