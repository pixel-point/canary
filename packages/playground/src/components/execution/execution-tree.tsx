<<<<<<< HEAD
import { Tree, TreeViewElement } from '@harnessio/canary'
=======
import React from 'react'
import type { TreeViewElement } from '@harnessio/canary'
import { Tree } from '@harnessio/canary'
>>>>>>> 45f591e1 (fix: updated common layout and navbar)
import { renderTree } from './utils'

export interface ExecutionTreeProps {
  defaultSelectedId: string
  elements: TreeViewElement[]
  onSelectNode: ({ parentId, childId }: { parentId: string; childId: string }) => void
}

export const ExecutionTree: React.FC<ExecutionTreeProps> = props => {
  const { defaultSelectedId, elements } = props
  return (
    <Tree className="bg-grey-6 overflow-hidden" initialSelectedId={defaultSelectedId} elements={elements}>
      {renderTree(elements, props.onSelectNode)}
    </Tree>
  )
}
