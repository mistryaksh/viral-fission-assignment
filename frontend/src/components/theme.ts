import React from "react"
import type { ThemeProviderState } from "./theme-provider"

export function useTheme() {
  const context = React.useContext(ThemeProviderContext)

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }

  return context
}

export const ThemeProviderContext = React.createContext<
  ThemeProviderState | undefined
>(undefined)
