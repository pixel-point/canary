import { useState, useCallback, DialogHTMLAttributes } from 'react'
import { debounce } from 'lodash-es'
import { IconType } from '@harnessio/svg-icon-react'

export const ButtonRoleProps = {
  onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || e.key === 'Spacebar') {
      const { target } = e as unknown as { target: { click: () => void } }
      e.preventDefault()
      e.stopPropagation()
      target?.click?.()
    }
  },
  tabIndex: 0,
  role: 'button',
  style: { cursor: 'pointer ' }
}

export function useDebouncedState<T>(initialValue: T, time = 250): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, _setState] = useState<T>(initialValue)

  // eslint-disable-next-line
  const setState = useCallback(
    debounce((_state: T) => {
      _setState(_state)
    }, time),
    []
  ) as React.Dispatch<React.SetStateAction<T>>

  return [state, setState]
}

export function promptCustomValue() {
  return parseInt(prompt('Enter a custom value:') || '0', 10)
}

export interface IconMetadata {
  name: string
  fqn: string // Fully Qualified Name
  Component: IconType
  ComponentName: string
}

export function getIconSetMetadata(IconSetImport: unknown): IconMetadata[] {
  return Object.keys(IconSetImport as Record<string, IconType>).map(ComponentName => {
    const Component = (IconSetImport as Record<string, IconType>)[ComponentName]
    const fqn = Component.prototype.name
    return { name: fqn.split('/')[0], fqn, Component, ComponentName }
  })
}

export const CloseDialogButtonProps = {
  onClick: (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const dialog = (e.target as Element).closest('dialog') as HTMLDialogElement
    dialog?.close()
  },
  title: 'Close'
}

export const DialogProps: DialogHTMLAttributes<HTMLDialogElement> = {
  onCancel: e => {
    if ((e.target as HTMLElement).dataset.noEsc) {
      e.preventDefault()
    }
  },
  onClick: e => {
    const dialog = (e.target as HTMLElement).closest('dialog')

    if (e.target === dialog && dialog.dataset.noEsc !== 'true') {
      dialog?.close()
    }
  }
}

export interface DialogConfigAttributes extends DialogHTMLAttributes<HTMLDialogElement> {
  escToClose?: boolean
  backdrop?: boolean
  autoFocus?: boolean
}

export const dialogConfig = ({ escToClose = true, ...others }: DialogConfigAttributes) => {
  return {
    open: false,
    ...DialogProps,
    ...(!escToClose ? { 'data-no-esc': !escToClose } : undefined),
    ...others
  }
}
