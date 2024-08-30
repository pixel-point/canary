import React from 'react'

function InputWrapper({ children }: React.PropsWithChildren): JSX.Element {
  return <div className="mt-4 mb-0.5">{children}</div>
}

export default InputWrapper
