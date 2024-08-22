import React, { SVGProps } from 'react'

const Expand = (props: SVGProps<SVGSVGElement>): React.ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={props.color} {...props}>
    <rect width={24} height={24} className="fill-studio-2" fillOpacity={0.1} rx={4} />
    <path
      stroke="#93939F"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.448 10.742h-4.19v-4.19M18.286 5.714l-5.028 5.028M10.744 17.448v-4.19h-4.19M5.715 18.285l5.028-5.028"
    />
  </svg>
)
export default Expand
