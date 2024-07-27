import { Uri } from "monaco-editor";
import { configureMonacoYaml } from "monaco-yaml";

export function addSchema(schemaConfig: any, monaco: any) {
  applySchema(monaco, [schemaConfig]);
}

function applySchema(monaco: any, schemas: any) {
  configureMonacoYaml(monaco as any, {
    hover: true,
    completion: true,
    enableSchemaRequest: false,
    validate: true,
    schemas: schemas,
  });
}

export const schemaIdToUrl = (id: string): string => {
  return Uri.parse(`file://${id}`).toString();
};

export const schemaIdToUri = (id: string): Uri => {
  return Uri.parse(schemaIdToUrl(id));
};
