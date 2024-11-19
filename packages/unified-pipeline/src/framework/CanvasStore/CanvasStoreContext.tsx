import { createContext, useContext, useState } from 'react'

export enum CanvasEntity {
  Node = 'Node',
  Edge = 'Edge'
}

type EnableDiagnostics = { [key in CanvasEntity]: boolean }

export interface CanvasStoreProps {
  enableDiagnostics?: EnableDiagnostics
  setEnableDiagnostics: React.Dispatch<React.SetStateAction<EnableDiagnostics>>
}

export const CanvasContext = createContext<CanvasStoreProps>({
  enableDiagnostics: { Edge: false, Node: false },
  setEnableDiagnostics: () => void 0
})

export function useCanvasStore(): CanvasStoreProps {
  return useContext(CanvasContext)
}

export const CanvasStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [enableDiagnostics, setEnableDiagnostics] = useState<EnableDiagnostics>({
    [CanvasEntity.Node]: false,
    [CanvasEntity.Edge]: false
  })
  return <CanvasContext.Provider value={{ enableDiagnostics, setEnableDiagnostics }}>{children}</CanvasContext.Provider>
}
