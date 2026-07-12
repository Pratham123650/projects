import { createContext, useContext, useEffect, useMemo, useState } from 'react'

/**
 * Global system state:
 *  - ready:      boot sequence finished → hero reveal starts
 *  - systemView: blueprint/diagnostic mode
 *  - termOpen:   interactive terminal visibility
 *  - section:    currently active section id (drives backdrop environment)
 */
const SystemContext = createContext(null)

export function SystemProvider({ children }) {
  const [ready, setReady] = useState(false)
  const [systemView, setSystemView] = useState(false)
  const [termOpen, setTermOpen] = useState(false)
  const [section, setSection] = useState('top')

  /* Reflect state onto <html> so pure CSS can react (System View, env hues). */
  useEffect(() => {
    document.documentElement.classList.toggle('sysview', systemView)
  }, [systemView])

  useEffect(() => {
    document.documentElement.setAttribute('data-section', section)
  }, [section])

  /* Keyboard shortcut: Ctrl+` (or Cmd+`) toggles the terminal. */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '`' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        setTermOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const value = useMemo(
    () => ({ ready, setReady, systemView, setSystemView, termOpen, setTermOpen, section, setSection }),
    [ready, systemView, termOpen, section],
  )

  return <SystemContext.Provider value={value}>{children}</SystemContext.Provider>
}

export function useSystem() {
  return useContext(SystemContext)
}
