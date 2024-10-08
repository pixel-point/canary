import { SandboxSettingsAccountKeysPage } from './profile-settings-keys-page'
import { useState, useEffect } from 'react'
import {
  useListPublicKeyQuery,
  ListPublicKeyQueryQueryParams,
  ListPublicKeyOkResponse
  // ListPublicKeyErrorResponse
} from '@harnessio/code-service-client'

import { TokensList } from '@harnessio/playground'

export const SettingsProfileKeysPage = () => {
  const TEMP_USER_TOKENS_API_PATH = '/api/v1/user/tokens'

  const [publicKeys, setPublicKeys] = useState<ListPublicKeyOkResponse[]>([])
  const [tokens, setTokens] = useState<TokensList[]>([])

  const queryParams: ListPublicKeyQueryQueryParams = {
    page: 1,
    limit: 30,
    sort: 'created',
    order: 'asc'
  }

  useListPublicKeyQuery(
    { queryParams },
    {
      onSuccess: (data: ListPublicKeyOkResponse[]) => {
        setPublicKeys(data)
      }
      // onError: (error: ListPublicKeyErrorResponse) => {
      //   const message = error.message || 'An unknown error occurred.'
      //   console.log(message)
      // }
    }
  )

  useEffect(() => {
    fetch(TEMP_USER_TOKENS_API_PATH)
      .then(resp => resp.json())
      .then(res => setTokens(res))
    // .catch(err => console.log(err))
  }, [])

  return <SandboxSettingsAccountKeysPage publicKeys={publicKeys} tokens={tokens} />
}
