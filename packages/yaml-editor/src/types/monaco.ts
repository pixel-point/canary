import * as monaco from "monaco-editor";

/** Internal structure of OutlineModel */
export interface OutlineModelValueInternal {
  children: Map<string, OutlineModelValueInternal>;
  symbol: monaco.languages.DocumentSymbol;
}

/** Internal structure of OutlineModel */
export interface RootOutlineModelInternal {
  children: Map<string, OutlineModelValueInternal>;
}
