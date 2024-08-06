export enum SelectorType {
  //AbsolutePath = 'AbsolutePath',
  ContainsPath = 'ContainsPath'
}

export interface ContainsPathSelector {
  type: SelectorType.ContainsPath
  /** Path have to starts with `basePath`*/
  basePath: string
  /** Path have to contains one of provided path. Base path is not included in match.*/
  paths: RegExp[]
}

// export interface AbsolutePathSelector {
//   type: SelectorType.AbsolutePath
//   /** Path have to be equal with `absolutePaths`*/
//   absolutePaths: string[]
// }

export type PathSelector = ContainsPathSelector // | AbsolutePathSelector
