import { RefObject, useEffect, useRef } from 'react'
import { MonacoYaml } from 'monaco-yaml'
import * as monaco from 'monaco-editor'
import { configureSchema, schemaIdToUrl } from '../utils/schema-utils'

export type UseSchema = (arg: { schemaConfig?: { schema: any; uri: string }; instanceId: string }) => void

export const useSchema: UseSchema = (props): void => {
  const { schemaConfig, instanceId } = props

  useEffect(() => {
    if (schemaConfig?.schema) {
      configureSchema({
        // If YAML file is opened matching this glob
        fileMatch: [schemaIdToUrl(instanceId.toString())],
        ...schemaConfig
      })
    }
  }, [schemaConfig?.schema, instanceId])
}
