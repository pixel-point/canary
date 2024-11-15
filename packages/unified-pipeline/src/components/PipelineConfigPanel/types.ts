export enum StageCategory {
  UNIT = 'UNIT',
  PARALLEL = 'PARALLEL',
  GROUP = 'GROUP'
}

export enum PipelineEntity {
  STEP = 'STEP',
  STAGE = 'STAGE'
}

export enum Action {
  ADD = 'ADD',
  EDIT = 'EDIT'
}

export interface CodeLensClickMetaData {
  entity: PipelineEntity
  action: Action
  highlightSelection?: boolean
}

export interface EntityFormDataInterface {
  [key: string]: string | boolean | object
}
