const View = {
  Root: function Root({ children }: { children: React.ReactNode }) {
    return <div className="mx-auto mb-16 min-h-full w-full max-w-[860px] px-5 py-5">{children}</div>
  }
}

export default View
