import React from 'react'
import { File, Folder, Status, Tree } from '@harnessio/canary'
import { elements } from '../assets/mock'

export const Execution: React.FC = () => {
  return (
    <div className="w-[395px] h-[660px]">
      <Tree className="rounded-md bg-background overflow-hidden p-2" initialSelectedId="1" elements={elements}>
        <Folder element="DAST" value="1" status={Status.SUCCESS} duration={15}>
          <File value="2" status={Status.SUCCESS} duration={5}>
            <p>Fortify</p>
          </File>
          <File value="3" status={Status.SUCCESS} duration={5}>
            <p>Veracode</p>
          </File>
          <File value="4" status={Status.SUCCESS} duration={5}>
            <p>Checkmarx</p>
          </File>
        </Folder>
        <Folder element="Deploy to Prod" value="5" status={Status.FAILED}>
          <Folder element="SBOM and SLSA Validation" value="6" status={Status.FAILED}>
            <File value="9" status={Status.FAILED} duration={15}>
              <p>SoftwareSupply Chain Validation</p>
            </File>
            <File value="10" status={Status.FAILED}>
              <p>SLSA Verification</p>
            </File>
          </Folder>
          <File value="7" status={Status.QUEUED}>
            <p>Risk Profile OPA - New Criticals</p>
          </File>
          <File value="8" status={Status.QUEUED}>
            <p>Canary Deployment</p>
          </File>
        </Folder>
      </Tree>
    </div>
  )
}
