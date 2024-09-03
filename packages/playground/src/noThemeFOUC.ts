;(function () {
  const storageKey = 'canary-ui-theme'
  const defaultTheme = 'system'
  const root = document.documentElement

  const savedTheme = localStorage.getItem(storageKey) || defaultTheme

  if (savedTheme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    root.classList.add(systemTheme)
  } else {
    root.classList.add(savedTheme)
  }
})()
