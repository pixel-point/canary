import React, { RefObject, useEffect } from "react";
import * as monaco from "monaco-editor";
import { useYamlEditorContext } from "../components/YamlProvider";

export type UseProblems = (arg: {
  monacoRef: RefObject<typeof monaco | undefined>;
}) => void;

export const useProblems: UseProblems = ({ monacoRef }): void => {
  const { setMarkers } = useYamlEditorContext();

  useEffect(() => {
    const editor = monacoRef.current?.editor;

    if (!editor) return;

    const handle = editor.onDidChangeMarkers(([resource]) => {
      const markers = editor.getModelMarkers({ resource });
      setMarkers(markers);
    });

    return () => {
      handle.dispose();
    };
  }, [monacoRef]);
};
