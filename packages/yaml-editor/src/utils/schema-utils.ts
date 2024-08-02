import { Uri } from 'monaco-editor'
import { configureMonacoYaml } from 'monaco-yaml'

export function configureSchema(monaco: any, schemaConfig: any) {
  return configureMonacoYaml(monaco as any, {
    hover: true,
    completion: true,
    enableSchemaRequest: false,
    validate: true,
    schemas: [schemaConfig]
  })
}

export const schemaIdToUrl = (id: string): string => {
  return Uri.parse(`file://${id}`).toString()
}

export const schemaIdToUri = (id: string): Uri => {
  return Uri.parse(schemaIdToUrl(id))
}
