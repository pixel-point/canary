import { RepoTagsDialogAction, RepoTagsDialogActionTypes, RepoTagsDialogState } from '../interfaces'
import { upperFirst } from 'lodash-es'

export const initialRepoTagsDialogState: RepoTagsDialogState = {
  isDialogCreateTagOpen: false
}

export const dialogStateReducer = (state: RepoTagsDialogState, action: RepoTagsDialogAction) => {
  switch (action.type) {
    case (RepoTagsDialogActionTypes.OPEN_DIALOG):
      return {
        ...state,
        [`isDialog${upperFirst(action.dialogType)}Open`]: true,
      }

    case (RepoTagsDialogActionTypes.CLOSE_DIALOG):
      return {
        ...state,
        [`isDialog${upperFirst(action.dialogType)}Open`]: false,
      }

    default:
      return state
  }
}
