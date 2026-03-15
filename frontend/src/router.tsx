import { createBrowserRouter } from "react-router-dom"
import { HomePage, NewVideoPage, VideoDetails } from "./pages"
import { Layout } from "./layout"

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: ":id",
        element: <VideoDetails />,
      },
      {
        path: "new",
        element: <NewVideoPage />,
      },
    ],
  },
])
