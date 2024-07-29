import * as monaco from "monaco-editor";
import { PathSelector, SelectorType } from "../types/selectors";
import { InlineAction } from "../types/inline-actions";

interface CommandArg extends Pick<InlineAction, "onClick" | "args"> {
  range: monaco.IRange;
  symbols: monaco.languages.DocumentSymbol[];
}

export interface GetCodeLensProps {
  pathSymbolMap: Map<string, monaco.languages.DocumentSymbol>;
  inlineActions?: { selectors: PathSelector[]; actions: InlineAction[] }[];
  commandId: string | any; // TODO
}
export function getCodeLens(props: GetCodeLensProps) {
  const { pathSymbolMap, inlineActions = [], commandId } = props;

  const pathSymbolMapObj = Object.fromEntries(pathSymbolMap.entries());

  const lenses: monaco.languages.CodeLens[] = [];

  inlineActions?.forEach((inlineAction) => {
    const actions = inlineAction.actions;
    const selectors = inlineAction.selectors;

    selectors.forEach((selector) => {
      switch (selector.type) {
        case SelectorType.AbsolutePath: {
          selector.absolutePaths.forEach((absolutePath) => {
            if (pathSymbolMapObj[absolutePath]) {
              const range = pathSymbolMapObj[absolutePath].range;
              const symbol = pathSymbolMapObj[absolutePath];

              const commandArg: CommandArg = {
                range,
                symbols: [symbol],
                onClick: actions[0].onClick, //todo: only first
                args: actions[0].args, // todo: only first
              };

              lenses.push({
                range,
                command: {
                  id: commandId,
                  title: actions[0].title, //// todo: only first
                  arguments: [commandArg],
                },
              });
            }
          });
          break;
        }
      }
    });
  });

  return lenses;
}
