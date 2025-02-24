import { SVGProps } from 'react'

export const NoisePattern = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="pointer-events-none absolute inset-0 size-full opacity-50 mix-blend-overlay"
    {...props}
  >
    <defs>
      <filter
        id="noise-filter"
        x="-20%"
        y="-20%"
        width="140%"
        height="140%"
        filterUnits="objectBoundingBox"
        primitiveUnits="userSpaceOnUse"
        colorInterpolationFilters="linearRGB"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.141"
          numOctaves="4"
          seed="15"
          stitchTiles="stitch"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          result="turbulence"
        />
        <feSpecularLighting
          surfaceScale="7"
          specularConstant="3"
          specularExponent="20"
          lightingColor="#4a90e2"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          in="turbulence"
          result="specularLighting"
        >
          <feDistantLight azimuth="3" elevation="106" />
        </feSpecularLighting>
        <feColorMatrix
          type="saturate"
          values="0"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          in="specularLighting"
          result="colormatrix"
        />
      </filter>
    </defs>
    <rect height="100%" fill="#4a90e2" filter="url(#noise-filter)" width="100%"></rect>
  </svg>
)
