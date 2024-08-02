import { RefObject, useEffect, useRef } from 'react'
import { MonacoYaml } from 'monaco-yaml'
import * as monaco from 'monaco-editor'
import { configureSchema, schemaIdToUrl } from '../utils/schema-utils'

export type UseSchema = (arg: {
  monacoRef: RefObject<typeof monaco | undefined>
  schemaConfig?: { schema: any; uri: string }
  instanceId: string
}) => void

export const useSchema: UseSchema = (props): void => {
  const { monacoRef, schemaConfig, instanceId } = props
  const handleRef = useRef<MonacoYaml | null>(null)

  useEffect(() => {
    if (monacoRef.current && schemaConfig?.schema) {
      handleRef.current = configureSchema(monacoRef.current, {
        // If YAML file is opened matching this glob
        fileMatch: [schemaIdToUrl(instanceId.toString())],
        ...schemaConfig
      })
    }
  }, [monacoRef, schemaConfig?.schema, instanceId])

  useEffect(() => {
    return () => {
      handleRef.current?.dispose()
      handleRef.current = null
    }
  }, [])
}
