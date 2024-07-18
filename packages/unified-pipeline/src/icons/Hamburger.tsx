import React, { SVGProps } from "react";

const Hamburger = (props: SVGProps<SVGSVGElement>): React.ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    fill={props.color}
    {...props}
  >
    <circle cx={1} cy={6} r={1} fill="#C9C9CF" transform="rotate(-90 1 6)" />
    <circle cx={6} cy={6} r={1} fill="#C9C9CF" transform="rotate(-90 6 6)" />
    <circle cx={11} cy={6} r={1} fill="#C9C9CF" transform="rotate(-90 11 6)" />
  </svg>
);
export default Hamburger;
