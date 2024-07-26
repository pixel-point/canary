import { RefObject, useEffect } from "react";
import * as monaco from "monaco-editor";

import { addSchema, schemaIdToUrl } from "../utils/schema-utils";

export type UseSchema = (arg: {
  monacoRef: RefObject<typeof monaco | undefined>;
  schemaConfig?: { schema: any; uri: string };
  instanceId: string;
}) => void;

export const useSchema: UseSchema = (props): void => {
  const { monacoRef, schemaConfig, instanceId } = props;

  useEffect(() => {
    if (!monacoRef.current || !schemaConfig?.schema) return;

    addSchema(
      {
        // If YAML file is opened matching this glob
        fileMatch: [schemaIdToUrl(instanceId.toString())],
        ...schemaConfig,
      },
      monacoRef.current
    );
  }, [monacoRef, schemaConfig, instanceId]);
};
