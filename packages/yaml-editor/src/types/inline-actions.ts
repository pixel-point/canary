import * as monaco from "monaco-editor";

export interface InlineAction {
  title: string;
  onClick: (
    arg: { path: string[]; range: monaco.IRange },
    ...args: unknown[]
  ) => void;
  args?: unknown[];
}
