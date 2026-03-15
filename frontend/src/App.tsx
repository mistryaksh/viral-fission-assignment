import { RouterProvider } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import { router } from "./router"
import { Provider } from "react-redux"
import { store } from "./store"
import { Toaster } from "sonner"

export function App() {
  return (
    <Provider store={store}>
      <ThemeProvider storageKey="viral_fission">
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </Provider>
  )
}

export default App
