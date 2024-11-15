import { createContext, useContext } from 'react'

export interface InteractionContextProps {
  handleAddClick: (data: any) => void
  setSelectedNodePath: (path: string) => void
  selectedNodePath: string | undefined
}

export const InteractionContext = createContext<InteractionContextProps>({
  handleAddClick: (_data: any) => undefined,
  setSelectedNodePath: (_path: string) => undefined,
  selectedNodePath: undefined
})

export function useInteractionContext(): InteractionContextProps {
  return useContext(InteractionContext)
}
