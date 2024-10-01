import React from 'react'
import { Spacer, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Text } from '@harnessio/canary'
import { FormFieldSet, SandboxLayout } from '..'

function SandboxSettingsAccountKeysPage() {
  return (
    <SandboxLayout.Main hasLeftPanel hasHeader hasSubHeader>
      <SandboxLayout.Content maxWidth="2xl">
        <Spacer size={10} />
        <Text size={5} weight={'medium'}>
          Keys and tokens
        </Text>
        <Spacer size={6} />
        <form>
          <FormFieldSet.Root>
            {/* PERSONAL ACCESS TOKEN */}
            <FormFieldSet.Legend>Personal access token</FormFieldSet.Legend>
            <FormFieldSet.ControlGroup>
              <Table variant="asStackedList">
                <TableHeader>
                  <TableRow>
                    <TableHead>Token</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Expiration date</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Text as="p" size={2} align="center" color={'tertiaryBackground'} className="text-center w-full">
                        There are no personal access tokens associated with this account.
                      </Text>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </FormFieldSet.ControlGroup>
          </FormFieldSet.Root>
          <FormFieldSet.Root>
            <FormFieldSet.Separator />
          </FormFieldSet.Root>
          <FormFieldSet.Root>
            {/* PERSONAL ACCESS TOKEN */}
            <FormFieldSet.Legend>My SSH keys</FormFieldSet.Legend>
            <FormFieldSet.SubLegend>
              SSH keys allow you to establish a secure connection to your code repository.
            </FormFieldSet.SubLegend>
            <FormFieldSet.ControlGroup>
              <Table variant="asStackedList">
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Added</TableHead>
                    <TableHead>Last used date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Text as="p" size={2} align="center" color={'tertiaryBackground'} className="text-center w-full">
                        There are no SSH keys associated with this account.
                      </Text>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </FormFieldSet.ControlGroup>
          </FormFieldSet.Root>
        </form>
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}

export { SandboxSettingsAccountKeysPage }
