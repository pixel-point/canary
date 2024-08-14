declare module '*.svg' {
  const value: string
  export default value
}

declare module '*.yaml' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value: Record<string, any>
  export default value
}
