import * as React from "react"
import { ThemeProviderContext } from "./theme"

type Theme = "dark" | "light" | "system"
type ResolvedTheme = "dark" | "light"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  disableTransitionOnChange?: boolean
}

export type ThemeProviderState = {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)"

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia(COLOR_SCHEME_QUERY).matches ? "dark" : "light"
}

function disableTransitionsTemporarily() {
  const style = document.createElement("style")
  style.appendChild(
    document.createTextNode(
      "*{transition:none!important} *::before,*::after{transition:none!important}"
    )
  )

  document.head.appendChild(style)

  return () => {
    window.getComputedStyle(document.body)
    requestAnimationFrame(() => {
      style.remove()
    })
  }
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "theme",
  disableTransitionOnChange = true,
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme)
  const [resolvedTheme, setResolvedTheme] =
    React.useState<ResolvedTheme>("dark")

  const applyTheme = React.useCallback(
    (currentTheme: Theme) => {
      const root = document.documentElement
      const finalTheme =
        currentTheme === "system" ? getSystemTheme() : currentTheme

      const restore = disableTransitionOnChange
        ? disableTransitionsTemporarily()
        : null

      root.classList.remove("light", "dark")
      root.classList.add(finalTheme)

      setResolvedTheme(finalTheme)

      if (restore) restore()
    },
    [disableTransitionOnChange]
  )

  React.useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey) as Theme | null

    const initialTheme =
      savedTheme === "light" || savedTheme === "dark" || savedTheme === "system"
        ? savedTheme
        : defaultTheme

    setThemeState(initialTheme)
    applyTheme(initialTheme)
  }, [storageKey, defaultTheme, applyTheme])

  React.useEffect(() => {
    applyTheme(theme)
    localStorage.setItem(storageKey, theme)

    if (theme !== "system") return

    const mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY)

    const handler = () => {
      applyTheme("system")
    }

    mediaQuery.addEventListener("change", handler)

    return () => {
      mediaQuery.removeEventListener("change", handler)
    }
  }, [theme, applyTheme, storageKey])

  const setTheme = React.useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
  }, [])

  const value = React.useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
    }),
    [theme, resolvedTheme, setTheme]
  )

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}
