<<<<<<< HEAD
import { ReactNode } from 'react'
=======
import type { ReactNode } from 'react'
import React from 'react'
>>>>>>> 45f591e1 (fix: updated common layout and navbar)
import { File, Folder, type TreeViewElement } from '@harnessio/canary'
import type { ExecutionTreeProps } from './execution-tree'

interface RenderTreeElementProps {
  element: TreeViewElement
  handleClick: ExecutionTreeProps['onSelectNode']
  parentElement?: TreeViewElement | null
}

export const renderTree = (
  elements: TreeViewElement[],
  handleClick: ExecutionTreeProps['onSelectNode']
): React.ReactNode => {
  if (elements.length === 0) return []
  return elements.map(element => (
    <div key={element.id}>{renderTreeElement({ element, handleClick, parentElement: null })}</div>
  ))
}

const renderTreeFolder = ({ element: folderElement, handleClick }: RenderTreeElementProps): ReactNode => {
  return (
    <Folder
      element={folderElement.name}
      value={folderElement.id}
      status={folderElement.status}
      duration={folderElement.duration}>
      {folderElement.children?.map(childElement => (
        <div key={childElement.id}>
          {renderTreeElement({ parentElement: folderElement, element: childElement, handleClick })}
        </div>
      ))}
    </Folder>
  )
}

const renderTreeFile = ({ element: fileElement, handleClick, parentElement }: RenderTreeElementProps): ReactNode => {
  return (
    <File
      value={fileElement.id}
      status={fileElement.status}
      duration={fileElement.duration}
      handleSelect={(stepId: string) => handleClick({ parentId: parentElement?.id || '', childId: stepId })}>
      <p>{fileElement.name}</p>
    </File>
  )
}

const renderTreeElement = ({ element, handleClick, parentElement }: RenderTreeElementProps): React.ReactNode => {
  if (element.children && element.children.length > 0) {
    return renderTreeFolder({ element, handleClick, parentElement })
  }
  return renderTreeFile({ element, handleClick, parentElement })
}

export const getElementById = (elements: TreeViewElement[], id: string): TreeViewElement | null => {
  const findElementById = (elementList: TreeViewElement[], searchId: string): TreeViewElement | null => {
    for (const element of elementList) {
      if (element.id === searchId) {
        return element
      }
      if (element.children) {
        const result = findElementById(element.children, searchId)
        if (result) {
          return result
        }
      }
    }
    return null // Return null if the element is not found
  }

  return findElementById(elements, id)
}
