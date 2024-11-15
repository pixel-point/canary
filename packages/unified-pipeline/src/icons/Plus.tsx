import React, { SVGProps } from 'react'

const Plus = (props: SVGProps<SVGSVGElement>): React.ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" width={10} height={10} fill={props.color} {...props}>
    <path stroke="#E4E4E7" strokeLinecap="round" strokeLinejoin="round" d="M1 5h4m4 0H5m0 0V1m0 4v4" opacity={0.6} />
  </svg>
)
export default Plus
