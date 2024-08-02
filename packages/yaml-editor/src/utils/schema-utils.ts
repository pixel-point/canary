import { Uri } from 'monaco-editor'
import * as monaco from 'monaco-editor'
import { configureMonacoYaml } from 'monaco-yaml'

let isYamlMonacoConfigured = false

export function configureSchema(schemaConfig: any) {
  if (isYamlMonacoConfigured) return

  const config = {
    hover: true,
    completion: true,
    enableSchemaRequest: false,
    validate: true,
    schemas: [schemaConfig]
  }

  isYamlMonacoConfigured = true

  return configureMonacoYaml(monaco, config)
}

export const schemaIdToUrl = (id: string): string => {
  return Uri.parse(`file://${id}`).toString()
}

export const schemaIdToUri = (id: string): Uri => {
  return Uri.parse(schemaIdToUrl(id))
}
