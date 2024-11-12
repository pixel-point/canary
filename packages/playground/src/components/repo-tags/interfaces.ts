export enum RepoTagsDialogActionTypes {
  OPEN_DIALOG = 'OPEN_DIALOG',
  CLOSE_DIALOG = 'CLOSE_DIALOG',
}

export enum RepoTagsDialogType {
  CREATE = 'create',
  DELETE = 'delete'
}

export interface RepoTagsDialogState {
  isDialogCreateTagOpen: boolean
}

export type Tag = {
  id: string
  name: string
  commit: string
  timestamp: string,
  description: string
}

export type RepoTagsDialogAction = {
  type: RepoTagsDialogActionTypes,
  dialogType: RepoTagsDialogType,
  tag?: Tag
}
